'use client';

import React, { useState } from 'react';
import Login from './Login';
import service_title from '/public/service_title_black.svg';
import BackgroundCircles from './BackgroundCircles';
import Logo from '@/app/_components/Logo';
import CharacterSwiper from './CharacterSwiper';
import CarouselTitle from './CarouselTitle';

type Props = {};

export default function LoginSection({}: Props) {
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  return (
    <div className='w-screen h-screen relative flex flex-col justify-between overflow-hidden'>
      <div className='flex flex-col items-start'>
        <div className='flex flex-col items-start justify-between gap-8 pt-5 pl-6 md:gap-12'>
          <Logo serviceTitle={service_title} isHome={false} />
          <CarouselTitle carouselIndex={currentIdx} />
        </div>
      </div>
      <CharacterSwiper onChange={setCurrentIdx} />
      <Login />
      <BackgroundCircles />
    </div>
  );
}
