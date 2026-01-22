import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';

import { type NextRequest, NextResponse } from 'next/server';

import { GAME_PROMPTS } from '@/lib/prompts';
import { GenerateImageRequest } from '@/lib/types';
import { auth } from '@/auth';
import { SupabaseService } from '@/app/services/supabase';
import { decrypt } from '@/lib/crypto';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 400 });
    }

    const userData = await SupabaseService.getUserByEmail(session.user.email);
    const apiKey = userData?.ai_api_key ? decrypt(userData.ai_api_key) : process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'API Key not found. Please set it in API Options' }, { status: 400 });
    }

    const google = createGoogleGenerativeAI({
      apiKey: apiKey,
    });

    const { imagePrompt }: GenerateImageRequest = await req.json();

    const prompt = GAME_PROMPTS.GENERATE_IMAGE(imagePrompt);

    const { files } = await generateText({
      model: google('gemini-2.5-flash-image'),
      prompt,
      providerOptions: {
        google: {
          responseModalities: ['IMAGE'],
        },
      },
    });

    console.log('Generated image files 🖌️: ', files);

    const imageFile = files?.[0];
    const imageBase64 = typeof imageFile === 'string' ? imageFile : imageFile?.base64;

    return NextResponse.json({ image: imageBase64 || null });

  } catch (error) {
    console.error('Error generating image:', error);
    
    // Extract status code from various error formats
    let statusCode = 500;
    if (error && typeof error === 'object') {
      if ('statusCode' in error) {
        statusCode = (error as { statusCode: number }).statusCode;
      } else if ('status' in error) {
        statusCode = (error as { status: number }).status;
      } else if ('code' in error && typeof (error as { code: unknown }).code === 'number') {
        statusCode = (error as { code: number }).code;
      }
    }

    const errorMessage = error instanceof Error ? error.message : 'Failed to generate image';

    console.log('STATUS CODE:', statusCode);
    console.log('ERROR MESSAGE:', errorMessage);

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}