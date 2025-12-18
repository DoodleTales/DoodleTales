import { useCallback, useState, useEffect, useRef } from 'react';
import type { GameMessage } from '@/lib/types';
import { useTheme } from '@/app/context/themeContext';
import { toast } from 'sonner';

export function useGame() {
  const [messages, setMessages] = useState<GameMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingImage, setIsSendingImage] = useState(false);
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
        toast.custom((t) => (
          <div className='bg-linear-to-r from-gradient-pink to-gradient-gold text-white p-4 rounded-lg shadow-lg'>
            <div className='flex items-center gap-2'>
              <div>
                <div className='font-semibold'>Failed to start game 🚨</div>
                <div className='text-sm opacity-90'>Please reload the page.</div>
              </div>
            </div>
          </div>
        ));
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
      //TODO Remove this console.log after testing
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
    if (isLoading || isSendingImage) return;

    setIsSendingImage(true);

    //* Lets do it step by step
    //* 1. Send image to backend to get it described
    //* 2. Get response
    //* 3. Update messages
    //* 4. Generate image

    try {
      const response = await fetch('/api/describe-image', {
        method: 'POST',
        body: JSON.stringify({
          image: base64Image,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to describe image 👀');
      }

      const data = await response.json();
      //TODO Remove this console.log after testing
      console.log(data);
      const messageId = crypto.randomUUID();

      // const assistantMessage: GameMessage = {
      //   id: messageId,
      //   type: 'assistant',
      //   content: data.narrative,
      //   imageLoading: true,
      // };
      // const playerMessage: GameMessage = {
      //   id: crypto.randomUUID(),
      //   type: 'user',
      //   content: data.player,
      //   imageLoading: false,
      // };

      // setMessages(prevMessages => [...prevMessages,playerMessage, assistantMessage]);
      // generateImage(messageId, data.imagePrompt);
    } catch (error) {
      console.error('Error describing image 👀: ', error);
    } finally {
      setIsSendingImage(false);
    }
  };

  return {
    title,
    messages,
    isLoading,
    isSendingImage,
    startGame,
    submitImage,
  };
}