'use server';

import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import APIOptions from '@/components/APIOptions';
import { encrypt } from '@/lib/crypto';
import { SupabaseService } from '@/app/services/supabase';
import { userValidated } from '@/app/api/auth/userValidation';

export default async function APIOptionsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/');
  }

  // Check if user exists in database
  const isValid = await userValidated();
  if (!isValid) {
    redirect('/');
  }

  return <APIOptions user={session.user} />;
}

export async function saveAPIKey(apiKey: string) {
  const session = await auth();
  if (!session?.user?.email) throw new Error('Unauthorized');

  const encryptedKey = encrypt(apiKey);
  const userData = await SupabaseService.getUserByEmail(session.user.email);
  if (!userData) throw new Error('User not found');
  userData.ai_api_key = encryptedKey;
  await SupabaseService.saveUser(session.user.email, userData);
}

export async function deleteAPIKey() {
  const session = await auth();
  if (!session?.user?.email) throw new Error('Unauthorized');

  const userData = await SupabaseService.getUserByEmail(session.user.email);
  if (!userData) throw new Error('User not found');
  userData.ai_api_key = null;
  await SupabaseService.saveUser(session.user.email, userData);
}

export async function getUserData() {
  const session = await auth();
  if (!session?.user?.email) return null;

  const userData = await SupabaseService.getUserByEmail(session.user.email);
  if (!userData) return null;
  return userData.ai_api_key;
}

export async function deleteUser() {
  const session = await auth();
  if (!session?.user?.email) throw new Error('Unauthorized');

  await SupabaseService.deleteUser(session.user.email);
}

export async function hasUserKey() {
  const session = await auth();
  if (!session?.user?.email) return false;

  const userData = await SupabaseService.getUserByEmail(session.user.email);
  if (!userData) return false;
  return !!userData.ai_api_key;
}
