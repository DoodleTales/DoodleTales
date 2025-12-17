import { useCallback, useState, useEffect, useRef } from 'react';
import type { GameMessage } from '@/lib/types';
import { useTheme } from '@/app/context/themeContext';

export function useGame() {
  const [messages, setMessages] = useState<GameMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const theme = useTheme();
  const hasStarted = useRef(false);

  const startGame = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/generate-story', {
        method: 'POST',
        body: JSON.stringify({
          isStarting: true,
          theme: theme.theme,
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

      setTitle(data.title);
      setMessages([newMessage]);
      generateImage(messageId, data.imagePrompt);

    } catch (error) {
      console.error('Error starting game 🚨: ', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!hasStarted.current) {
      startGame();
      hasStarted.current = true;
    }
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

  const submitImage = async (base64Image: string) => {
    if (isLoading) return;

    const playerAction: GameMessage = {
      id: crypto.randomUUID(),
      type: 'user',
      content: 'Sent a drawing',
      image: base64Image,
    };

    setIsLoading(true);
    setMessages(prevMessages => [...prevMessages, playerAction]);

    try {
      const response = await fetch('/api/generate-story', {
        method: 'POST',
        body: JSON.stringify({
          //! Send image to backend, constrain size
          playerAction: playerAction,
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
      const playerMessage: GameMessage = {
        id: crypto.randomUUID(),
        type: 'user',
        content: data.player,
        imageLoading: false,
      };

      setMessages(prevMessages => [...prevMessages,playerMessage, assistantMessage]);
      generateImage(messageId, data.imagePrompt);
    } catch (error) {
      console.error('Error generating story 🚨: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    title,
    messages,
    isLoading,
    startGame,
    submitImage,
  };
}