'use client';

import React, { useState } from 'react';

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
    <div className='flex flex-col justify-center'>
      <div className='mb-4'>
        <Calendar onChange={onChange} value={value} />
      </div>
      <div className='h-[56px] flex justify-between items-center px-6 border border-white rounded-md shadow-lg mb-10'>
        <button className=''>나의 핫토픽 모아보기</button>
        <div>
          <FcNext color='black' />
        </div>
      </div>
      <div id='carousel' className='flex justify-center items-center h-[600px]'>
        <CharacterCarousel />
      </div>
    </div>
  );
}
