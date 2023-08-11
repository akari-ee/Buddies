'use client';

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '@/app/config/firebase';
import { RiKakaoTalkFill } from '@react-icons/all-files/ri/RiKakaoTalkFill';
import { FcGoogle } from '@react-icons/all-files/fc/FcGoogle';

import Image from 'next/image';
import LoginDialog from './Dialog';
// import kakaoTalkLogo from '/public/kakaotalk_logo.svg';
// import googleLogo from '/public/google_logo.svg';

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
  // 카카로 로그인 Handler
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(prev => !prev);
  }
  const closeDialog = () => {
    setIsOpen(prev => !prev);
  }

  const kakaoLoginHandler = () => {
    window.Kakao.Auth.authorize({
      redirectUri,
      scope,
    });
    console.log('Kakao Logining');
  };
  // 구글 로그인 Handler
  const googleLoginHandler = async () => {
    console.log('Google Logining');
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    function kakaoInit() {
      if (!window.Kakao?.isInitialized()) {
        window.Kakao?.init(process.env.NEXT_PUBLIC_KAKAO_REST_KEY);
        console.log(window.Kakao?.isInitialized());
      }
    }

    kakaoInit();
  }, []);

  return (
    <div className='w-full flex flex-col justify-center items-center space-y-6 mb-20'>
      <div className='w-full flex justify-center items-center space-x-3'>
        <button
          onClick={kakaoLoginHandler}
          className='rounded-full overflow-hidden h-10 w-10 bg-[#F9E000] flex items-center justify-center text-2xl shadow-md'
        >
          <RiKakaoTalkFill />
          {/* <Image src={kakaoTalkLogo} alt='kakaoLogin' width={30} height={30}/> */}
        </button>

        <button
          onClick={googleLoginHandler}
          className='rounded-full overflow-hidden h-10 w-10 flex items-center justify-center text-2xl shadow-md'
        >
          <FcGoogle />
        </button>
      </div>
      <div className='text-xs text-[#868686]'>
        <button className='underline' onClick={openDialog}>비회원으로 서비스 이용하기</button>
        <LoginDialog isOpen={isOpen} onClose={closeDialog} />
      </div>
    </div>
  );
}

// color: var(--grey-grey-87, #868686);
// text-align: center;
// font-family: Apple SD Gothic Neo;
// font-size: 13px;
// font-style: normal;
// font-weight: 400;
// line-height: 18px; /* 138.462% */
// text-decoration-line: underline;
