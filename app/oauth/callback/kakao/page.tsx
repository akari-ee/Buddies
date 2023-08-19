'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { auth } from '@/config/firebase';
import {
  signInWithPopup,
  OAuthProvider,
  signInWithRedirect,
} from 'firebase/auth';
import axios from 'axios';

export default function KakaoTalk() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const authCode = searchParams.get('code');
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);

  const firebaseLogin = () => {
    const provider = new OAuthProvider('oidc.kakao');
    // signInWithRedirect(auth, provider);
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        const credential = OAuthProvider.credentialFromResult(result);
        const accessToken = credential?.accessToken;
        const idToken = credential?.idToken;
        console.log('Firebase AccessToken', accessToken);
        console.log('Firebase IdToken', idToken);
        getKakaoUserInfo(accessToken ? accessToken : '');
      })
      .catch((error) => {
        console.log(error);
      });
    router.push('/home');
  };

  const getKakaoUserInfo = async (token: string) => {
    if (token === '') {
      console.log('token is empty');
      return;
    }
    await axios('https://kapi.kakao.com/v2/user/me', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      console.log(res.data);
    });
  };

  const loginHandler = async (code: string | string[]) => {
    // api route로 post 요청 시 안됨
    // api route 사용하지 않으면 잘됨

    // Route Handler 테스트용
    // const res = await fetch(`/api/oauth/callback/kakao`, {
    //   method: 'POST',
    // });

    // const data = await res.json();
    // console.log('data returned from api: ', data);


    const res = await axios.post(`/api/oauth/callback/kakao?code=${code}`);

    const data = res.data;
    console.log("data returned from api: ", data);
    // setAccessToken(data.access_token);
    // setIdToken(data.id_token);

    // try {
    //   await axios('https://kauth.kakao.com/oauth/token', {
    //     method: 'post',
    //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //     data: `grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_KEY}&redirect_uri=${window.location.origin}/kakaotalk&code=${code}`,
    //   }).then((res: any) => {
    //     const data = res.data;
    //     console.log('getKakaoToken data', data);
    //     console.log('Kakao IdToken', data.id_token);
    //     console.log('Kakao AccessToken', data.access_token);
    //     setAccessToken(data.access_token);
    //     setIdToken(data.id_token);
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
  };

  useEffect(() => {
    if (authCode) {
      loginHandler(authCode);
    }
  }, [authCode]);

  // useEffect(() => {
  //   firebaseLogin();
  // }, [idToken]);

  useEffect(() => {}, [accessToken]);
  return <div>page</div>;
}
