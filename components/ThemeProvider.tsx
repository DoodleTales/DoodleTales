'use client';

import { useState } from 'react';
import Navbar from './Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DashboardClientProps } from '@/lib/types';
import BlurText from './BlurText';

import Lottie from 'lottie-react';
import animationData from '@/public/animations/Learning Drawing.json';
import GamePage from '@/app/game/page';


export default function ThemeProvider({ user }: DashboardClientProps) {
  const [theme, setTheme] = useState('');
  const [submitFailed, setSubmitFailed] = useState(false);

  const handleSubmitTheme = (e: React.FormEvent) => {
    e.preventDefault();
    if (!theme.trim()) {
      setSubmitFailed(true);
      setTimeout(() => setSubmitFailed(false), 500);
      return;
    }
    //! send theme to GamePage
    console.log('Theme submitted:', theme);
    return GamePage(theme);
  };

  return (
    <div className='fixed inset-0 flex flex-col overflow-hidden bg-background text-foreground'>
      <Navbar isAuthenticated={true} user={user} />
      <div className='p-8 flex flex-col flex-1 min-h-0 items-center justify-center'>
        {/* Element 1: BlurText (Top Section) */}
        {/* Fixed height container to prevent layout shift during animation */}
        <div className='text-center h-32 flex items-center justify-center w-full max-w-4xl px-4'>
          <BlurText
            text='Every great journey begins with a question: what kind of adventure awaits us?'
            className='text-4xl font-bold text-center leading-tight justify-center'
            delay={75}
            animateBy='words'
            direction='top'
          />
        </div>
        {/* Element 2: Theme Form (Bottom Section) */}
        <div className='w-full max-w-md mt-12 z-10'>
          <form onSubmit={handleSubmitTheme} className='flex flex-col gap-6'>
            <Input
              placeholder='Enter your story theme...'
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className='text-lg p-6 h-14'
            />
            <Button
              key={submitFailed ? 'failed' : 'normal'}
              type='submit'
              className={`w-full h-12 text-lg font-medium transition-all ${
                submitFailed
                  ? 'animate-shake bg-red-600 hover:bg-red-600 text-white'
                  : ''
              }`}
            >
              Start Adventure
            </Button>
          </form>
        </div>
        {/* Amnimation */}
        <div className='w-50 h-50 z-0 mt-12 dark:invert'>
          <Lottie
            animationData={animationData}
            loop
            autoplay
          />
        </div>
      </div>
    </div>
  );
}
