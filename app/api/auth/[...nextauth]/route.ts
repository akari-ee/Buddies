import { firestore } from '@/config/firebase';
import { FirestoreAdapter } from '@auth/firebase-adapter';
import NextAuth from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import KakaoProvider from 'next-auth/providers/kakao';
import GoogleProvider from 'next-auth/providers/google';

const authOptions = NextAuth({
  adapter: FirestoreAdapter(firestore) as Adapter,
  providers: [
    KakaoProvider({
      clientId: process.env.NEXT_PUBLIC_KAKAO_REST_KEY!,
      clientSecret: process.env.NEXT_PUBLIC_KAKAO_SECRET_KEY!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken;
      session.user.id = token.id || token.sub;
      session.provider = token.provider;
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
  },
});

export { authOptions as GET, authOptions as POST, authOptions };
