'use client';
import { GameMessage } from '@/lib/types';
import Image from 'next/image';

interface ZombieGameProps {
  messages: GameMessage[];
  isLoading: boolean;
}

export default function ZombieGame({ messages, isLoading }: ZombieGameProps) {
  return (
    <div className='flex flex-col h-full bg-background'>
      <div className='p-4 border-b bg-muted/20'>
        <h2 className='text-lg font-semibold'>Zombie Apocalypse</h2>
      </div>

      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex flex-col max-w-[80%] rounded-lg p-3 ${
              message.type === 'user'
                ? 'ml-auto bg-primary text-primary-foreground'
                : 'mr-auto bg-muted'
            }`}
          >
            <p className='whitespace-pre-wrap'>{message.content}</p>
            {message.image && (
              <div className='mt-2 rounded-md overflow-hidden'>
                <Image
                  src={`data:image/png;base64,${message.image}`}
                  alt='Scene'
                  className='w-full h-auto object-cover'
                  width={500}
                  height={500}
                  loading='eager'
                />
              </div>
            )}
            {message.imageLoading && (
              <div className='mt-2 text-xs opacity-70 animate-pulse'>
                Generating image...
              </div>
            )}
          </div>
        ))}
        {isLoading && !messages.length && (
          <div className='p-4 text-center text-muted-foreground animate-pulse'>
            Starting game...
          </div>
        )}
      </div>
    </div>
  );
}
