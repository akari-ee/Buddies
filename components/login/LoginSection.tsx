'use client';

import React, { useEffect, useState } from 'react';
import Login from './Login';
import service_title from '/public/service_title_black.svg';
import BackgroundCircles from './BackgroundCircles';
import Logo from '../UI/Logo';
import CharacterSwiper from './CharacterSwiper';
import { useSession } from 'next-auth/react';
import {
  GoogleAuthProvider,
  OAuthProvider,
  getAuth,
  getRedirectResult,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth';
import { auth } from '@/config/firebase';
import { setCookie } from '@/utils/handleCookie';
import {
  handleUserInfo,
  saveUserInfoInToFirebaseDatabase,
} from '@/utils/handleUserInfo';
import { useRouter } from 'next/navigation';

type Props = {};

export default function LoginSection({}: Props) {
  const router = useRouter();

  return (
    <div className='w-screen h-screen relative flex flex-col justify-between overflow-hidden'>
      <div className='flex flex-col items-start'>
        <div className='flex flex-col items-start justify-between gap-8 pt-5 pl-6 md:gap-12'>
          <Logo serviceTitle={service_title} isHome={false} />
          <div className='flex flex-col items-start gap-6 md:gap-8'>
            <div className='font-PyeongChangPeace text-3xl md:text-6xl'>
              <p className='font-light'>Find your</p>
              <p className='font-bold'>
                own secret
                <br />
                planet
              </p>
            </div>
            <div className='text-[#444444] text-sm md:text-lg'>
              나의 친구, 버디와 함께{' '}
              <span className='font-bold'>
                차곡차곡 쌓이는 <br />
                이야기로 나만의 행성
              </span>
              을 만들어보세요!
            </div>
          </div>
        </div>
      </div>
      <CharacterSwiper />
      <Login />
      <BackgroundCircles />
    </div>
  );
}
