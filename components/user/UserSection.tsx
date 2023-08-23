'use client';
import React, { useState } from 'react';
import UserTitle from './UserTitle';
import UserHeader from './UserHeader';
import UserInfo from './UserInfo';
import ProfileSlideOver from '../profile/ProfileSlideOver';

type Props = {};

export default function UserSection({}: Props) {
  const [isOpen, setIsOpen] = useState(false); // 세팅 모달 state

  // 세팅 모달 핸들러
  const handleSlideOver = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className='w-screen h-screen relative flex flex-col justify-between overflow-y-scroll px-6 pt-4 gap-8'>
      <UserHeader handleSlideOver={handleSlideOver}/>
      <UserTitle />
      <UserInfo />
      <ProfileSlideOver open={isOpen} setOpen={handleSlideOver}/>
    </div>
  );
}
