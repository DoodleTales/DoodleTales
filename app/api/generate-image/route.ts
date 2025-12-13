import { google } from '@ai-sdk/google';
import {generateText} from 'ai';

import { type NextRequest, NextResponse } from 'next/server';

import { GAME_PROMPTS } from '@/lib/prompts';
import { GenerateImageRequest } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const {imagePrompt}: GenerateImageRequest = await req.json();

    const prompt = GAME_PROMPTS.GENERATE_IMAGE(imagePrompt);

    const { files } = await generateText({
      model: google('gemini-2.5-flash-image-preview'),
      prompt,
      providerOptions: {
        google: {
          responseModalities: ['IMAGE'],
        },
      },
    });

    console.log('Generated image 🖌️: ', files);

    const imageFile = files?.[0];
    //* Check if the image file has a base64 property or is the base64 string itself
    const imageBase64 = typeof imageFile === 'string' ? imageFile : imageFile?.base64;

    return NextResponse.json({ image: imageBase64 || null });

  } catch (error) {
    console.error('Error generating image: ', error);
    return NextResponse.json({error: 'Failed to generate image'}, {status: 500});
  }
}