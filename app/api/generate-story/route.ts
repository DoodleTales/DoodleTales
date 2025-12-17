import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';
import { type NextRequest, NextResponse } from 'next/server';
import { GAME_PROMPTS } from '@/lib/prompts';
import { GenerateStoryRequest } from '@/lib/types';
import { auth } from '@/auth';
import { SupabaseService } from '@/app/services/supabase';
import { decrypt } from '@/lib/crypto';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userData = await SupabaseService.getUserByEmail(session.user.email);
    const apiKey = userData?.ai_api_key ? decrypt(userData.ai_api_key) : process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'API Key not found. Please set it in API Options' }, { status: 400 });
    }

    const google = createGoogleGenerativeAI({
      apiKey: apiKey,
    });

    const { playerAction, conversationHistory, isStarting, theme }: GenerateStoryRequest = await req.json();

    let prompt: string = '';

    if (isStarting) {
      if (!theme) {
        return NextResponse.json({ error: 'Theme is required to start the game' }, { status: 400 });
      }
      prompt = GAME_PROMPTS.INITIAL_PROMPT(theme);
    } else {
      const historyText = conversationHistory.map(
        (message) => `message.role: ${message.role}: message.content: ${message.content}`).join('\n');

      prompt = GAME_PROMPTS.CONTINUE_STORY(historyText, playerAction);
    }

    const { text } = await generateText({
      model: google('gemini-2.5-flash'),
      prompt,
    });

    // const [narrative, imagePrompt] = text.split(GAME_CONFIG.IMAGE.SEPARATOR);

    console.log('Incoming JSON:', text);

    const jsonString = text
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    const {title, player, narrative, imagePrompt } = JSON.parse(jsonString);
    return NextResponse.json({ title, player, narrative, imagePrompt });

  } catch (error) {
    console.error('Error generating story:', error);
    return NextResponse.json({error: 'Failed to generate story'}, {status: 500});
  }
}