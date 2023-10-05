'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

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
        className='rounded-full border border-white w-10 h-10 flex justify-center items-center bg-gradient-to-bl from-inherit via-transparent to-white/30 shadow-md shadow-gray'
        onClick={handleSlideOver}
      >
        <EllipsisVerticalIcon className='h-6 w-6 text-white' aria-hidden='true' />
      </button>
    </div>
  );
}
