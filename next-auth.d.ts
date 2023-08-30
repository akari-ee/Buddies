//types/next-auth.d.ts

import NextAuth from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
    user?: {
      id?: string;
    } & DefaultSession['user'];
    accessToken: string;
    provider: string;
  }
  interface DefaultJWT {
    name?: string | null;
    email?: string | null;
    picture?: string | null;
    sub?: string;
    accessToken?: string;
    provider?: string | null;
  }
}
