'use server';

import { signIn, signOut } from '@/auth';
import { SupabaseService } from '@/app/services/supabase';
import bcrypt from 'bcrypt';
import { UserData } from '../services/dbtypes';

export async function signInWithGithub() {
  await signIn('github', { redirectTo: '/' });
}

export async function signInWithCredentials(email: string, password: string) {
  await signIn('credentials', { email, password, redirectTo: '/' });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}


export async function signUp(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('user') as string;

  const number = process.env.SCRIPT_NUMBER;

  if (!email || !password || !name) {
    throw new Error('Missing fields');
  }

  if (!number) {
    throw new Error('SCRIPT_NUMBER is not set');
  }

  const hashedPassword = await bcrypt.hash(password, Number(number));
  const hashedPasswordSlice = hashedPassword.slice(7);
  const userData: UserData = {
    name: name,
    email: email,
    password: hashedPasswordSlice,
  };

  const { error } = await SupabaseService.createUser(email, userData);

  if (error) {
    console.error('Signup error:', error);
    throw new Error('Failed to create user');
  }
}
