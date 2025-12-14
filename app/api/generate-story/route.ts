import { google } from '@ai-sdk/google';
import {generateText} from 'ai';

import { type NextRequest, NextResponse } from 'next/server';

import { GAME_PROMPTS } from '@/lib/prompts';
import { GenerateStoryRequest } from '@/lib/types';
import { GAME_CONFIG } from '@/lib/const';

export async function POST(req: NextRequest) {
  try {
    const {userMessage, conversationHistory, isStarting}: GenerateStoryRequest = await req.json();

    let prompt:string = GAME_PROMPTS.INITIAL_STORY;

    if(!isStarting) {
      const historyText = conversationHistory.map(
        (message) => `message.role: ${message.role}: message.content: ${message.content}`).join('\n');

      prompt = GAME_PROMPTS.CONTINUE_STORY(historyText, userMessage);
    }

    const { text } = await generateText({
      model: google('gemini-2.5-flash'),
      prompt,
    });

    const [narrative, imagePrompt] = text.split(GAME_CONFIG.IMAGE.SEPARATOR);

    console.log('Generated story:', narrative);
    console.log('Generated image prompt:', imagePrompt);

    return NextResponse.json({ narrative, imagePrompt });

  } catch (error) {
    console.error('Error generating story:', error);
    return NextResponse.json({error: 'Failed to generate story'}, {status: 500});
  }
}