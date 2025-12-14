import { useCallback, useState, useEffect } from 'react';
import type { GameMessage, conversationMessage } from '@/lib/types';

export function useZombieGame() {
  const [messages, setMessages] = useState<GameMessage[]>([]);
  const [input , setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const startGame = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/generate-story', {
        method: 'POST',
        body: JSON.stringify({
          isStarting: true,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to start game 🚨');
      }

      const data = await response.json();

      const messageId = crypto.randomUUID();

      const newMessage: GameMessage = {
        id: messageId,
        type: 'assistant',
        content: data.narrative,
        imageLoading: true,
      };

      setMessages([newMessage]);
      generateImage(messageId, data.imagePrompt);

    } catch (error) {
      console.error('Error starting game 🚨: ', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    startGame();
  }, [startGame]);

  const generateImage = async (messageId:string, imagePrompt:string) => {
    try {
      const response = await fetch('api/generate-image', {
        method: 'POST',
        body: JSON.stringify({
          imagePrompt:imagePrompt,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate image 🚨');
      }

      const imageData = await response.json();
      console.log(imageData);
      setMessages(prevMessages => prevMessages.map(message => {
        if (message.id === messageId) {
          return {
            ...message,
            imageLoading: false,
            image: imageData.image,
          };
        }
        return message;
      }));
    } catch (error) {
      setMessages(prevMessages => prevMessages.map(message => {
        if (message.id === messageId) {
          return {
            ...message,
            imageLoading: false,
          };
        }
        return message;
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!input.trim() || isLoading) return;

    const userMessage: GameMessage = {
      id: crypto.randomUUID(),
      type: 'user',
      content: input,
    };

    setIsLoading(true);
    setInput('');
    setMessages(prevMessages => [...prevMessages, userMessage]);

    try {
      const response = await fetch('/api/generate-story', {
        method: 'POST',
        body: JSON.stringify({
          userMessage: input,
          conversationHistory: messages,
          isStarting: false,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate story 🚨');
      }

      const data = await response.json();
      const messageId = crypto.randomUUID();

      const assistantMessage: GameMessage = {
        id: messageId,
        type: 'assistant',
        content: data.narrative,
        imageLoading: true,
      };

      setMessages(prevMessages => [...prevMessages, assistantMessage]);
      generateImage(messageId, data.imagePrompt);
    } catch (error) {
      console.error('Error generating story 🚨: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return {
    messages,
    input,
    isLoading,
    startGame,
    handleSubmit,
    handleInputChange,
  };
}