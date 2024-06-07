'use client';

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';
import CharacterSwiper from './CharacterSwiper';
import Image from 'next/image';
import dayjs from 'dayjs';
import yermi from '@/public/yermi_option.png';
import { bg_colors } from '@/constant/constant';
import { cn } from '@/utils/extendClass';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
type Props = { chatUsageData: any };

export default function UserInfo({ chatUsageData }: Props) {
  const [value, onChange] = useState<Value>(new Date());
  const [mark, setMark] = useState(['2023-11-28', '2023-11-26', '2023-11-23']); // 프롬프트 사용 날짜 표시 위함

  return (
    <div className='flex flex-col justify-between mx-auto w-full max-w-md'>
      <div className='mb-16 font-roboto'>
        <Calendar
          onChange={onChange}
          value={value}
          className='mx-auto w-full text-sm border-b'
          tileContent={({ date, view }) => {
            if (mark.find((x) => x === dayjs(date).format('YYYY-MM-DD'))) {
              return (
                <div className='flex absolute top-1/2 left-1/2 justify-center items-center w-full h-full -translate-x-1/2 -translate-y-1/2 absoluteDiv'>
                  <div className='dot w-[30px] h-[30px] relative overflow-hidden rounded-full'>
                    <Image
                      src={yermi}
                      alt='dd'
                      layout='fill'
                      objectFit='cover'
                      className={cn(
                        'absolute rounded-full scale-[2.2] -translate-y-1',
                        bg_colors[1]
                      )}
                    />
                  </div>
                </div>
              );
            }
          }}
        />
      </div>
      <div className='flex flex-col gap-1 mb-24 text-[#171717]'>
        <div className=''>
          <p className='text-lg font-bold font-PyeongChangPeace'>Buddy talk</p>
        </div>
        <div className='text-sm'>
          <p>이번 달은 어떤 버디와 가장 대화를 많이 했을까요?</p>
        </div>
      </div>
      <div className='flex justify-center mb-20'>
        <CharacterSwiper chatUsageData={chatUsageData} />
      </div>
    </div>
  );
}
