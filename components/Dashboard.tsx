'use client';

import { useRef } from 'react';
import { ReactSketchCanvasRef } from 'react-sketch-canvas';
import DashboardClient from './DashboardClient';
import Navbar from './Navbar';
import ZombieGame from './ZombieGame';
import SketchCanvas from '@/components/SketchCanvas';
import { Button } from '@/components/ui/button';

import { DashboardClientProps } from '@/lib/types';
import { useZombieGame } from '@/app/hooks/use-zombie-game';

import { FaPaperPlane } from 'react-icons/fa';

export default function Dashboard({ user }: DashboardClientProps) {
  const { messages, isLoading, submitImage } = useZombieGame();
  const canvasRef = useRef<ReactSketchCanvasRef>(null);

  const handleSend = async () => {
    if (canvasRef.current) {
      try {
        const image = await canvasRef.current.exportImage('png');

        const base64Data = image.replace(/^data:image\/png;base64,/, '');
        await submitImage(base64Data);
        canvasRef.current.clearCanvas();
      } catch (error) {
        console.error('Error exporting image 🖼️ ❌:', error);
      }
    }
  };

  return (
    <div className='fixed inset-0 flex flex-col overflow-hidden bg-background text-foreground'>
      <Navbar isAuthenticated={true} user={user}/>
      <div className='p-8 flex flex-col flex-1 min-h-0'>
        <div className='shrink-0'>
          <DashboardClient user={user} />
        </div>
        <div className='flex-1 min-h-0 mt-4 flex flex-col-reverse xl:flex-row gap-4'>
          {/* ZombieGame Section */}
          <section className='flex-1 min-w-[600px] border rounded-xl overflow-hidden shadow-sm bg-card relative'>
            <ZombieGame messages={messages} isLoading={isLoading} />
          </section>
          {/* SketchCanvas Section */}
          <section className='flex-1 min-w-[600px] border rounded-xl overflow-hidden shadow-sm bg-card relative flex flex-col'>
            <div className='p-4 border-b bg-muted/20 flex justify-between items-center'>
              <h2 className='text-lg font-semibold'>Draw here!</h2>
              <Button onClick={handleSend} disabled={isLoading}>
                Send <FaPaperPlane />
              </Button>
            </div>
            <div className='flex-1 relative'>
              <SketchCanvas
                ref={canvasRef}
                width='100%'
                height='100%'
                canvasColor='transparent'
                strokeColor='#a855f7'
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
