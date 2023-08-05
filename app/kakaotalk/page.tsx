'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { auth } from '../config/firebase';
import { signInWithPopup, OAuthProvider } from 'firebase/auth';
import axios from 'axios';

export default function KakaoTalk() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const authCode = searchParams.get('code');

  const firebaseLogin = () => {
    const provider = new OAuthProvider('oidc.kakao');
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        const credential = OAuthProvider.credentialFromResult(result);
        const accessToken = credential?.accessToken;
        const idToken = credential?.idToken;
        console.log('Firebase AccessToken', accessToken);
        console.log('Firebase IdToken', idToken);
      })
      .catch((error) => {
        // Handle error.
        console.log(error);
      });
  };

  const loginHandler = async (code: string | string[]) => {
    // api route로 post 요청 시 안됨
    // api route 사용하지 않으면 잘됨
    try {
      await axios('https://kauth.kakao.com/oauth/token', {
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: `grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_KEY}&redirect_uri=${window.location.origin}/kakaotalk&code=${code}`,
      }).then((res: any) => {
        const data = res.data;
        console.log('getKakaoToken data', data);
        console.log('Kakao IdToken', data.id_token);
        console.log('Kakao AccessToken', data.access_token);
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (authCode) {
      loginHandler(authCode);
    }
  }, [authCode]);

  return <div>page</div>;
}
