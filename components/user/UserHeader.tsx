'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import prevBtn from '/public/prev_btn.svg';
import menuBtn from '/public/menu_btn.svg';
import { BiArrowBack } from '@react-icons/all-files/bi/BiArrowBack';

type Props = {};

export default function UserHeader({}: Props) {
  const router = useRouter();
  return (
    <div className='flex justify-between items-center'>
      <button onClick={() => router.back()}>
        <BiArrowBack size={30} color="white" />
        {/* <Image src={prevBtn} alt='go to prev' width={21} height={17}/> */}
      </button>
      <button className='rounded-full border border-white w-10 h-10 flex justify-center items-center bg-gradient-to-bl from-inherit via-transparent to-white shadow-md shadow-gray'>
        <Image src={menuBtn} alt='go to menu' width={21} height={17} />
      </button>
    </div>
  );
}
