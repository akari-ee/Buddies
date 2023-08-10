'use client';

import React, { useEffect } from 'react';

type Props = {};

declare global {
  interface Window {
    Kakao: any;
  }
}

const redirectUri = `${window.location.origin}/kakaotalk`;
const scope = [
  'profile_nickname',
  'profile_image',
  'account_email',
  'gender',
  'age_range',
  'birthday',
  'friends',
  'openid',
].join(',');

export default function Login({}: Props) {
  function kakaoLogin() {
    window.Kakao.Auth.authorize({
      redirectUri,
      scope,
    });
    console.log('login중');
  }
  
  useEffect(() => {
    function kakaoInit() {
      if (!window.Kakao?.isInitialized()) {
        window.Kakao?.init(process.env.NEXT_PUBLIC_KAKAO_REST_KEY);
        console.log(window.Kakao?.isInitialized());
      }
    }
    
    kakaoInit();
  }, [])
  return (
    <div className='border border-gray-800'>
      <div>
        <button onClick={kakaoLogin}>카카오 로그인</button>
      </div>
    </div>
  );
}
