//! this is the user auth configuration
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { SupabaseService } from '@/app/services/supabase';
import { SupabaseAdapter } from '@auth/supabase-adapter';
import { decrypt } from './lib/crypto';

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

        const user = await SupabaseService.getUserByEmail(email as string);

        if (!user) {
          console.log('User not found');
          return null;
        }
        const scriptKey = process.env.SCRIPT_KEY;
        if (!scriptKey) {
          console.log('SCRIPT_KEY is not set');
          return null;
        }
        const securePassword = decrypt(user.password as string);
        
        if (securePassword !== password) {
          console.log('Invalid password');
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_KEY!,
  }),
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours (in seconds).
  },
});
