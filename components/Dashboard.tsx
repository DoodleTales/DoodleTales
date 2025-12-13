'use client';

import DashboardClient from './DashboardClient';
import ZombieGame from './ZombieGame';
import SketchCanvas from '@/components/SketchCanvas';

import { DashboardClientProps } from '@/lib/types';

export default function Dashboard({ user }: DashboardClientProps) {

  return (
    <div className='p-8'>
      <main className='mx-auto'>
        <section className='m-8'>
          <DashboardClient user={user} />
        </section>
        <section className='m-8 flex justify-between'>
          <div className='min-w-[600px]'>
            <ZombieGame />
          </div>
          <div className='min-w-[600px] h-[300px]'>
            <h1>Draw here!</h1>
            <SketchCanvas
              width='100%'
              height='150px'
              canvasColor='transparent'
              strokeColor='#a855f7'
            />
          </div>
        </section>
      </main>
    </div>
  );
}
