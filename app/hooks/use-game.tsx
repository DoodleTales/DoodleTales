import { useCallback, useState, useEffect, useRef } from 'react';
import type { GameMessage } from '@/lib/types';
import { useTheme } from '@/app/context/themeContext';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { serverOverloadToast } from '@/app/hooks/toasts';

export function useGame() {
  const [messages, setMessages] = useState<GameMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingImage, setIsSendingImage] = useState(false);
  const [title, setTitle] = useState('');
  const theme = useTheme();
  const hasStarted = useRef(false);
  const router = useRouter();

  const startGame = useCallback(async () => {
    setIsLoading(true);
    if (!theme.theme) {
      router.replace('/theme-provider');
      return;
    }

    try {
      const response = await fetch('/api/generate-story', {
        method: 'POST',
        body: JSON.stringify({
          isStarting: true,
          theme: theme.theme,
        }),
      });

      if (!response.ok) {
        if (response.status === 500) {
          serverOverloadToast(() => startGame());
        }
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

      const messageId = uuidv4();

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
        if (response.status === 500) {
          serverOverloadToast(() => generateImage(messageId, imagePrompt));
        }
        throw new Error('Failed to generate image 🚨');
      }

      const imageData = await response.json();
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
    //* 1. Update response messages
    //* 2. Generate image
    console.log(messages[messages.length - 1].content);
    try {
      const response = await fetch('/api/describe-image', {
        method: 'POST',
        body: JSON.stringify({
          image: base64Image,
          message: messages[messages.length - 1].content,
        }),
      });

      if (!response.ok) {
        if (response.status === 500) {
          serverOverloadToast(() => submitImage(base64Image));
        }
        throw new Error('Failed to describe image 👀');
      }

      const dataPlayer = await response.json();

      const playerMessage: GameMessage = {
        id: uuidv4(),
        type: 'user',
        content: dataPlayer.text,
        imageLoading: false,
      };

      setMessages(prevMessages => [...prevMessages,playerMessage]);

      continueStory(dataPlayer.text);
    } catch (error) {
      console.error('Error describing image 👀: ', error);
    } finally {
      setIsSendingImage(false);

    }
  };

  const continueStory = async (playerAction: string) => {

    try {
      const response = await fetch('/api/generate-story', {
        method: 'POST',
        body: JSON.stringify({
          playerAction: playerAction,
          conversationHistory: messages,
        }),
      });

      if (!response.ok) {
        if (response.status === 500) {
          serverOverloadToast(() => continueStory(playerAction));
        }
        throw new Error('Failed to continue story 🚨');
      }

      const data = await response.json();
      const assistantMessage: GameMessage = {
        id: uuidv4(),
        type: 'assistant',
        content: data.narrative,
        imageLoading: true,
      };

      setMessages(prevMessages => [...prevMessages,assistantMessage]);
      generateImage(assistantMessage.id, data.imagePrompt);
    } catch (error) {
      console.error('Error continuing story 🚨: ', error);
    } finally {
      setIsLoading(false);
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