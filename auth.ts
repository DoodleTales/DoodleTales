import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { SupabaseService } from '@/app/services/supabase';
import bcrypt from 'bcrypt';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        const { email, password } = credentials;

        const user = await SupabaseService.getUserByEmail(email as string)

        if (!user) {
           console.log('User not found');
           return null;
        }

        const passwordsMatch = await bcrypt.compare(password as string, user.user_password);

        if (!passwordsMatch) {
          console.log('Invalid password');
          return null;
        }

        return {
          id: user.user_id,
          name: user.user_name,
          email: user.user_email,
        };
      },
    }),
  ],
});
