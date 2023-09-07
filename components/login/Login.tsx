'use client';

import {
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '@/config/firebase';
import { RiKakaoTalkFill } from '@react-icons/all-files/ri/RiKakaoTalkFill';
import { FcGoogle } from '@react-icons/all-files/fc/FcGoogle';
import LoginDialog from './Dialog';
import { useRouter } from 'next/navigation';
import { setCookie } from '@/utils/handleCookie';
import {
  handleUserInfo,
  saveUserInfoInToFirebaseDatabase,
} from '@/utils/handleUserInfo';
import { signIn } from 'next-auth/react';

type Props = {};

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function Login({}: Props) {
  const router = useRouter();
  // 카카로 로그인 Handler
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen((prev) => !prev);
  };
  const closeDialog = () => {
    setIsOpen((prev) => !prev);
  };

  const kakaoLoginHandler = async () => {
    await signIn('kakao');
  };

  // 구글 로그인 Handler
  const googleLoginHandler = async () => {
    await signIn('google');
  };

  return (
    <div className='w-full flex flex-col justify-center items-center space-y-6 mb-20'>
      <div className='w-full flex justify-center items-center space-x-3 md:space-x-5'>
        <button
          onClick={kakaoLoginHandler}
          className='rounded-full overflow-hidden h-10 w-10 bg-[#F9E000] flex items-center justify-center text-2xl shadow-md md:w-16 md:h-16 md:text-4xl'
        >
          <RiKakaoTalkFill />
          {/* <Image src={kakaoTalkLogo} alt='kakaoLogin' width={30} height={30}/> */}
        </button>

        <button
          onClick={googleLoginHandler}
          className='rounded-full overflow-hidden h-10 w-10 flex items-center justify-center text-2xl shadow-md md:w-16 md:h-16 md:text-4xl'
        >
          <FcGoogle />
        </button>
      </div>
      <div className='text-xs text-[#868686] md:text-lg'>
        <button className='underline' onClick={openDialog}>
          비회원으로 서비스 이용하기
        </button>
        <LoginDialog isOpen={isOpen} onClose={closeDialog} />
      </div>
    </div>
  );
}
