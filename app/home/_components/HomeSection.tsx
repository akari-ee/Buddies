'use client';

import React, { useState } from 'react';
import service_title from '/public/service_title_white.svg';
import Logo from '@/app/_components/Logo';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useRouter } from 'next/navigation';
import { UserIcon } from '@heroicons/react/24/solid';
import { BellIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import arrow from '/public/btn_right_arrow.svg';
import { cn } from '@/utils/extendClass';
import CharacterSwiper from './CharacterSwiper';
import { useRecoilState } from 'recoil';
import { promptState } from '@/store/atoms';

const bg_colors = ['bg-bomi', 'bg-yermi', 'bg-gauri', 'bg-gyeouri'];
const gradients = ['from-bomi', 'from-yermi', 'from-gauri', 'from-gyeouri'];

type Props = {};

export default function HomeSection({}: Props) {
  const router = useRouter();
  const [currentCharacter, setCurrentIdx] = useState<number>(0);
  const [prompt, setPrompt] = useRecoilState(promptState);

  const indexHandler = (idx: number) => {
    setCurrentIdx(idx);
    setPrompt(idx);
  };

  return (
    <div
      className={cn(
        'w-screen h-screen flex flex-col gap-8 relative overflow-hidden pt-5 bg-gradient-to-b via-transparent to-white',
        bg_colors[currentCharacter],
        gradients[currentCharacter]
      )}
    >
      <div id='header' className='flex justify-between items-center px-6'>
        <Logo serviceTitle={service_title} isHome={true} />
        <div
          id='icon-wrapper'
          className='flex justify-center items-center gap-5 text-white'
        >
          <button
            className='border border-white rounded-full flex justify-center items-center w-10 h-10 bg-inherit bg-gradient-to-bl from-inherit via-transparent to-white/30 shadow-md shadow-gray'
            onClick={() => router.push('/user')}
          >
            <UserIcon className='w-6 h-6' />
          </button>
          <button className='border border-white rounded-full flex justify-center items-center w-10 h-10 bg-inherit  bg-gradient-to-bl from-inherit via-transparent to-white/30 shadow-md shadow-gray'>
            <BellIcon className='w-6 h-6' />
          </button>
        </div>
      </div>
      <div className='text-white pl-6 flex flex-col justify-center gap-4'>
        <div className='font-PyeongChangPeace text-3xl'>Hello!</div>
        <div className='text-sm'>
          <p>대화하고 싶은 감정요정,</p>
          <p className='font-bold'>버디를 선택해보세요.</p>
        </div>
      </div>
      <div className='grow flex flex-col justify-center flex-1'>
        <CharacterSwiper onChange={indexHandler} />
      </div>

      <div className='fixed bottom-12 left-1/2 translate-x-[-50%] bg-[#171717] text-white text-base font-medium rounded-full w-72 py-3 flex justify-center items-center cursor-pointer z-10'>
        <div className='flex justify-center items-center gap-4'>
          <button
            className='flex justify-center items-center'
            onClick={() => router.push(`/chat/${currentCharacter}`)}
          >
            대화 시작하기
          </button>
          <div className='flex justify-center items-center'>
            <Image src={arrow} alt='화살표' />
          </div>
        </div>
      </div>
    </div>
  );
}
