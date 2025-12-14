'use server';

import { signIn, signOut } from '@/auth';
import { SupabaseService } from '@/app/services/supabase';
import bcrypt from 'bcrypt';
import { UserData } from '../services/dbtypes';

export async function signInWithGithub() {
  await signIn('github', { redirectTo: '/dashboard' });
}

export async function signInWithCredentials(email: string, password: string) {
  await signIn('credentials', { email, password, redirectTo: '/dashboard' });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}


export async function signUp(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('user') as string;

  if (!email || !password || !name) {
    throw new Error('Missing fields');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const userData: UserData = {
    user_name: name,
    user_email: email,
    user_password: hashedPassword,
  };

  const { error } = await SupabaseService.createUser(email, userData);

  if (error) {
    console.error('Signup error:', error);
    throw new Error('Failed to create user');
  }
}
