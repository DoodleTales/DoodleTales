'use client';

import { useState } from 'react';
import { handleSignOut } from '@/app/dashboard/actions';
import DarkModeToggle from './DarkModeToggle';

import { DashboardClientProps } from '@/lib/types';

export default function DashboardClient({ user }: DashboardClientProps) {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className='mx-auto'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-3xl font-bold'>Dashboard</h1>
        <DarkModeToggle isDark={isDark} setIsDark={setIsDark} scale={0.5} />
      </div>
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
    </div>
  );
}
