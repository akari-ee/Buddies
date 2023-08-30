import { firestore } from '@/config/firebase';
import { FirestoreAdapter } from '@auth/firebase-adapter';
import NextAuth from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import KakaoProvider from 'next-auth/providers/kakao';

const authOptions = NextAuth({
  adapter: FirestoreAdapter(firestore) as Adapter,
  providers: [
    KakaoProvider({
      clientId: process.env.NEXT_PUBLIC_KAKAO_REST_KEY!,
      clientSecret: process.env.NEXT_PUBLIC_KAKAO_SECRET_KEY!,
    }),
  ],
  callbacks: {},
});

export { authOptions as GET, authOptions as POST, authOptions };
