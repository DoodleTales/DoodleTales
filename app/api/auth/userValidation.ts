'use server';

import { auth } from '@/auth';
import { SupabaseService } from '@/app/services/supabase';

export async function userValidated() {
  const session = await auth();
  if (!session?.user?.email) return false;

  //* Check if user actually exists in database
  const userData = await SupabaseService.getUserByEmail(session.user.email);
  return !!userData;
}