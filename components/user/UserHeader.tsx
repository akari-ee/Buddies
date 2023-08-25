'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import menuBtn from '/public/menu_btn.svg';
import { ArrowSmallLeftIcon } from '@heroicons/react/24/solid';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
type Props = {  
  handleSlideOver: () => void;
};

export default function UserHeader({ handleSlideOver }: Props) {
  const router = useRouter();
  return (
    <div className='flex justify-between items-center'>
      <button onClick={() => router.back()}>
        <ArrowSmallLeftIcon className='h-8 w-8 text-white' aria-hidden='true' />
      </button>
      <button
        className='rounded-full border border-white w-10 h-10 flex justify-center items-center bg-gradient-to-bl from-inherit via-transparent to-white shadow-md shadow-gray'
        onClick={handleSlideOver}
      >
        {/* <Image src={menuBtn} alt='go to menu' width={21} height={17} /> */}
        <EllipsisVerticalIcon className='h-6 w-6 text-white' aria-hidden='true' />
        {/* <EllipsisVerticalIcon className='h-6 w-6 text-white' aria-hidden='true' /> */}
      </button>
    </div>
  );
}
