'use server';

//! this is the auth service where the calls are used
import { signIn, signOut } from '@/auth';
import { SupabaseService } from '@/app/services/supabase';
import { UserData } from './dbtypes';
import { encrypt } from '@/lib/crypto';
import { SignUpSchema } from '@/lib/schemas';

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
  const rawData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    user: formData.get('user') as string,
  };

  const validation = SignUpSchema.safeParse(rawData);

  if (!validation.success) {
    throw new Error(validation.error.message);
  }

  const { email, password, user: name } = validation.data;

  const encryptedPassword = encrypt(password);
  const userData: UserData = {
    name: name,
    email: email,
    password: encryptedPassword,
  };

  const { error } = await SupabaseService.createUser(email, userData);

  if (error) {
    console.error('Signup error:', error);
    throw new Error('Failed to create user');
  }
}
