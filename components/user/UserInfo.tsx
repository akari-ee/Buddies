'use client';

import React, { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

import Calendar from 'react-calendar';
import './Calendar.css';

import { FcNext } from '@react-icons/all-files/fc/FcNext';
import CharacterCarousel from './CharacterCarousel';

type Props = {};

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];


export default function UserInfo({}: Props) {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className='flex flex-col justify-between'>
      <div className='mb-4'>
        <Calendar onChange={onChange} value={value} />
      </div>
      <div className='h-[56px] flex justify-between items-center px-6 border border-white rounded-md shadow-lg mb-20'>
        <button className=''>나의 핫토픽 모아보기</button>
        <div>
          <ChevronRightIcon className='w-6 h-6 stroke-2'/>
        </div>
      </div>
      <div className='flex flex-col gap-1 mb-24 text-[#171717]'>
        <div className='font-PyeongChangPeace text-lg'>
          <p>Buddy talk</p>
        </div>
        <div className='text-xs'>
          <p>이번주는 어떤 버디와 가장 대화를 많이 했을까요?</p>
        </div>
      </div>

      <div id='carousel' className='flex justify-center items-center h-[600px]'>
        <CharacterCarousel />
      </div>
    </div>
  );
}
