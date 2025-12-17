'use server';

import { signOut } from '@/auth';

export async function handleSignOut() {
  await signOut({ redirectTo: '/' });
}

export function setTheme(theme: string) {
  localStorage.setItem('theme', theme);
}
