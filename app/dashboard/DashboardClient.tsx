'use client';

import { useEffect } from 'react';
import SketchCanvas from '@/components/SketchCanvas';
import { handleSignOut } from './actions';

interface DashboardClientProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export default function DashboardClient({ user }: DashboardClientProps) {
  useEffect(() => {
    fetch('/api/generate-story', {
      method: 'POST',
      body: JSON.stringify({
        userMessage: 'Hello',
        conversationHistory: [],
        isStarting: true,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        fetch('/api/generate-image', {
          method: 'POST',
          body: JSON.stringify({
            imagePrompt: data.imagePrompt,
          }),
        })
          .then((res) => res.json())
          .then((imageData) => {
            console.log('Generated image 🖼️: ', imageData);
          }).catch((error) => {
            console.error('Error generating image 🚨: ', error);
          });
      }).catch((error) => {
        console.error('Error generating story 🚨: ', error);
      });
  }, []);

  return (
    <div className='min-h-screen p-8'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold mb-4'>Dashboard</h1>
        <div className='bg-white dark:bg-zinc-900 p-6 rounded-lg shadow'>
          <p className='mb-2'>Welcome, {user.name}!</p>
          <p className='text-sm text-zinc-600 dark:text-zinc-400 mb-4'>
            Email: {user.email}
          </p>
          <form action={handleSignOut}>
            <button
              type='submit'
              className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'
            >
              Sign Out
            </button>
          </form>
        </div>
        <div className='font-sans min-h-screen p-8'>
          <h1>Zombie apocalypse game</h1>
        </div>
        <div>
          <h1>Draw here!</h1>
          <SketchCanvas
            width='100%'
            height='150px'
            canvasColor='transparent'
            strokeColor='#a855f7'
          />
        </div>
      </div>
    </div>
  );
}
