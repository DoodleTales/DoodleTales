'use client';

import { handleSignOut } from '@/app/dashboard/actions';

import { DashboardClientProps } from '@/lib/types';

export default function DashboardClient({ user }: DashboardClientProps) {
  return (
    <div className='mx-auto'>
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
    </div>
  );
}
