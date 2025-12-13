'use client';

import DashboardClient from './DashboardClient';
import ZombieGame from './ZombieGame';
import SketchCanvas from '@/components/SketchCanvas';

import { DashboardClientProps } from '@/lib/types';

export default function Dashboard({ user }: DashboardClientProps) {

  return (
    <div className='fixed inset-0 p-8 flex flex-col overflow-hidden bg-background text-foreground'>
      <div className='shrink-0'>
        <DashboardClient user={user} />
      </div>

      <div className='flex-1 min-h-0 mt-4 flex flex-col-reverse xl:flex-row gap-4'>
        {/* ZombieGame Section */}
        <section className='flex-1 min-w-[600px] border rounded-xl overflow-hidden shadow-sm bg-card relative'>
          <ZombieGame />
        </section>

        {/* SketchCanvas Section */}
        <section className='flex-1 min-w-[600px] border rounded-xl overflow-hidden shadow-sm bg-card relative flex flex-col'>
          <div className='p-4 border-b bg-muted/20'>
            <h2 className='text-lg font-semibold'>Draw here!</h2>
          </div>
          <div className='flex-1 relative'>
            <SketchCanvas
              width='100%'
              height='100%'
              canvasColor='transparent'
              strokeColor='#a855f7'
            />
          </div>
        </section>
      </div>
    </div>
  );
}
