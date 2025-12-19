//* Game Types
export interface GameMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  image?: string;
  imageLoading?: boolean;
  title?: string;
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
  playerAction: string;
  conversationHistory: conversationMessage[];
  isStarting: boolean;
  theme?: string;
}

export interface GenerateImageRequest {
  imagePrompt: string;
}

export interface GenerateStoryResponse {
  narrative: string;
  imagePrompt: string;
}

export interface DescribeImageRequest {
  image?: string;
  base64?: string;
  mimeType?: string;
  message?: string;
}

//* GameClient Types added theme
export interface GameClientProps {
  theme?: string;
  user: {
    name?: string | null;
    email?: string | null;
    ai_api_key?: string | null;
  };
}