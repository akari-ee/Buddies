'use client';

import React from 'react';
import Login from './Login';
import service_title from '/public/service_title_black.svg';
import BackgroundCircles from './BackgroundCircles';
import Logo from '@/app/_components/Logo';
import CharacterSwiper from './CharacterSwiper';

type Props = {};

export default function LoginSection({}: Props) {
  return (
    <div className='w-screen h-screen relative flex flex-col justify-between overflow-hidden'>
      <div className='flex flex-col items-start'>
        <div className='flex flex-col items-start justify-between gap-8 pt-5 pl-6 md:gap-12'>
          <Logo serviceTitle={service_title} isHome={false} />
          <div className='flex flex-col items-start gap-6 md:gap-8'>
            <div className='font-PyeongChangPeace text-[32px] md:text-6xl'>
              <p className='font-light'>Find your</p>
              <p>
                <span className='font-light'>own secret</span>
                <br />
                <span className='font-bold'>planet</span>
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
