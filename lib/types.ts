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