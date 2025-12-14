'use client';

import { handleSignOut } from '@/app/dashboard/actions';

import { DashboardClientProps } from '@/lib/types';

export default function DashboardClient({ user }: DashboardClientProps) {
  return (
    <div className='mx-auto'>
      <div className='bg-white dark:bg-zinc-900 p-6 rounded-lg shadow'>
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
