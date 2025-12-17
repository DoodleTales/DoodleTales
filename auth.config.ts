import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnSignup = nextUrl.pathname.startsWith('/signup');
      const isOnGame = nextUrl.pathname.startsWith('/');

      if (isOnSignup) return true;

      if (isOnGame) {
        if (isLoggedIn) return true;
        return false; //* Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        //* Redirect to Game if already logged in and on home page
        if (nextUrl.pathname === '/') {
          return Response.redirect(new URL('/', nextUrl));
        }
      }
      return true;
    },
  },
  providers: [], //* Add providers with an empty array for now
} satisfies NextAuthConfig;
