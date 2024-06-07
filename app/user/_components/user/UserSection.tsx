'use client';

import React, { useState } from 'react';
import UserTitle from './UserTitle';
import UserHeader from './UserHeader';
import UserInfo from './UserInfo';
import ProfileSlideOver from '../profile/ProfileSlideOver';
import { cn } from '@/utils/extendClass';
import { useRecoilValue } from 'recoil';
import { promptState } from '@/store/atoms';
import { bg_colors, gradientsFromVia } from '@/constant/constant';

type Props = {
  chatUsageData: any;
};

export default function UserSection({ chatUsageData }: Props) {
  const [isOpen, setIsOpen] = useState(false); // 세팅 모달 state
  // 세팅 모달 핸들러
  const handleSlideOver = () => {
    setIsOpen((prev) => !prev);
  };
  const value = useRecoilValue(promptState);

  return (
    <div
      className={cn(
        'flex flex-col items-start w-screen min-w-full h-screen bg-gradient-to-b to-white shrink-0',
        bg_colors[value],
        gradientsFromVia[value]
      )}
    >
      <section id='user_section'>
        <div className='overflow-y-scroll relative px-6 pt-4 w-screen h-screen overflow-x-clip'>
          <div className='flex flex-col gap-8 mx-auto w-full max-w-5xl lg:overflow-hidden'>
            <UserHeader handleSlideOver={handleSlideOver} />
            <UserTitle />
            <UserInfo chatUsageData={chatUsageData} />
            <ProfileSlideOver open={isOpen} setOpen={handleSlideOver} />
          </div>
        </div>
      </section>
    </div>
  );
}
