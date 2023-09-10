'use client';

import React, { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

import Calendar from 'react-calendar';
import './Calendar.css';

import CharacterSwiper from './CharacterSwiper';
import Image from 'next/image';

import hotTopicIcon from '/public/hotTopicIcon.svg';

type Props = {};

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function UserInfo() {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className='w-full flex flex-col justify-between'>
      <div className='mb-4 font-roboto'>
        <Calendar onChange={onChange} value={value} locale='en-GB' />
      </div>
      <div className='h-[56px] flex justify-between items-center px-6 border border-white rounded-md shadow-lg mb-20'>
        <button className='flex gap-1'>
          <Image src={hotTopicIcon} alt='hotTopicIcon' width={24} height={24} />
          나의 핫토픽 모아보기
        </button>
        <div>
          <ChevronRightIcon className='w-4 h-4 stroke-2' />
        </div>
      </div>
      <div className='flex flex-col gap-1 mb-24 text-[#171717]'>
        <div className=''>
          <p className='font-PyeongChangPeace text-lg font-bold'>Buddy talk</p>
        </div>
        <div className='text-sm'>
          <p>이번주는 어떤 버디와 가장 대화를 많이 했을까요?</p>
        </div>
      </div>
      <div className='flex justify-center'>
        <CharacterSwiper />
      </div>
    </div>
  );
}
