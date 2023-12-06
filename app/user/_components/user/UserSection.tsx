'use client';

import React, { useState } from 'react';
import UserTitle from './UserTitle';
import UserHeader from './UserHeader';
import UserInfo from './UserInfo';
import ProfileSlideOver from '../profile/ProfileSlideOver';
import { cn } from '@/utils/extendClass';
import { useRecoilValue } from 'recoil';
import { promptState } from '@/store/atoms';
import { bg_colors, gradientsFromVia } from '@/app/_constant/constant';

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
        'w-screen h-screen flex flex-col items-start shrink-0 min-w-full bg-gradient-to-b to-white',
        bg_colors[value],
        gradientsFromVia[value]
      )}
    >
      <section id='user_section'>
        <div className='w-screen h-screen relative overflow-y-scroll px-6 pt-4 overflow-x-clip'>
          <div className='w-full max-w-5xl mx-auto flex flex-col gap-8 lg:overflow-hidden'>
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
