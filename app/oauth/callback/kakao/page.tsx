'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { auth } from '@/config/firebase';
import { signInWithPopup, OAuthProvider } from 'firebase/auth';
import axios from 'axios';
import { setCookie } from '@/utils/handleCookie';
import {
  handleUserInfo,
  saveUserInfoInToFirebaseDatabase,
} from '@/utils/handleUserInfo';

export default function KakaoTalk() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const authCode = searchParams.get('code');
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const firebaseLogin = async () => {
    const provider = new OAuthProvider('oidc.kakao');
    const firebaseAuth = auth;

    try {
      await signInWithPopup(firebaseAuth, provider)
        .then(async (result) => {
          const credential = OAuthProvider.credentialFromResult(result);
          const accessToken = credential?.accessToken;
          const idToken = credential?.idToken;
          const uid = result.user.uid;
          const providerId = result.providerId;

          setCookie('uid', uid, 365); // 로그인 시 쿠키에 uid 저장
          // Firebase에 유저정보 저장
          saveUserInfoInToFirebaseDatabase(
            handleUserInfo(result.user, providerId)
          );
          await getKakaoUserInfo(accessToken ? accessToken : '');
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
      router.replace('/login');
      router.refresh();
    }
    router.replace('/home');
    router.refresh();
  };

  const getKakaoUserInfo = async (token: string) => {
    if (token === '') {
      console.log('token is empty');
      return;
    }
    const res = await axios.get(
      `/api/oauth/callback/kakaoUserInfo?token=${token}`
    );
    const data = res.data;
    console.log('userInfo returned from api: ', data);
  };

  const loginHandler = async (code: string | string[]) => {
    const res = await axios.post(`/api/oauth/callback/kakao?code=${code}`);

    const data = res.data;
    setAccessToken(data.access_token);
    console.log('data returned from api: ', data);
  };

  useEffect(() => {
    if (authCode) {
      loginHandler(authCode);
    }
  }, [authCode]);

  useEffect(() => {
    firebaseLogin();
  }, [accessToken]);

  return <div>page</div>;
}
