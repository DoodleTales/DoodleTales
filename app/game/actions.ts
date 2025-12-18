'use server';

import { signOut } from '@/auth';
import { redirect } from 'next/navigation';

export async function handleSignOut() {
  await signOut({ redirectTo: '/' });
}

export async function handleGame() {
  await redirect('/theme-provider');
}