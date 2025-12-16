'use server';

import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import APIOptions from '@/components/APIOptions';
import bcrypt from 'bcrypt';
import { SupabaseService } from '@/app/services/supabase';

export default async function APIOptionsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/');
  }

  return <APIOptions user={session.user} />;
}

export async function saveAPIKey(apiKey: string) {
  const session = await auth();
  if (!session?.user?.email) throw new Error('Unauthorized');

  const encryptedKey = await bcrypt.hash(apiKey, Number(process.env.SCRIPT_NUMBER));
  const userData = await SupabaseService.getUserByEmail(session.user.email);
  userData.ai_api_key = encryptedKey.slice(7);
  await SupabaseService.saveUser(session.user.email, userData);
}

export async function deleteAPIKey() {
  const session = await auth();
  if (!session?.user?.email) throw new Error('Unauthorized');

  const userData = await SupabaseService.getUserByEmail(session.user.email);
  userData.ai_api_key = null;
  await SupabaseService.saveUser(session.user.email, userData);
}

export async function getUserData() {
  const session = await auth();
  if (!session?.user?.email) return null;

  const userData = await SupabaseService.getUserByEmail(session.user.email);
  return userData.ai_api_key;
}
