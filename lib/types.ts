export interface GameMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  image?: string;
  imageLoading?: string;
}

export interface GeneratedImage {
  base64Data: string;
  mediaType: string;
}

export interface conversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface GenerateStoryRequest {
  userMessage: string;
  conversationHistory: conversationMessage[];
  isStarting: boolean;
}

export interface GenerateStoryResponse {
  narrative: string;
  imagePrompt: string;
}
