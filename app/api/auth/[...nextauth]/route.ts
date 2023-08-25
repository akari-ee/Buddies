import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';

const authOptions = NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.NEXT_PUBLIC_KAKAO_REST_KEY!,
      clientSecret: process.env.NEXT_PUBLIC_KAKAO_SECRET_KEY!,
    }),
  ],
});

export { authOptions as GET, authOptions as POST, authOptions };
