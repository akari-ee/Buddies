import Image from 'next/image';
import React from 'react';
import prevBtn from '/public/prev_btn.svg';
type Props = {};
import { useRouter } from 'next/navigation';

export default function ChatHeader({}: Props) {
  const router = useRouter();
  return (
    <div className='w-screen flex h-[calc(100vh*0.1)] rounded-b-xl shadow-[#6d6d6d1a]/10 shadow-md px-5'>
      <div className='w-full flex justify-between items-center'>
        <div className='flex justify-center items-center'>
          <button onClick={() => router.back()}>
            <Image src={prevBtn} alt='go to prev' width={21} height={17} />
          </button>
        </div>
        <div className='flex justify-between items-center space-x-3'>
          <div>BGM | ON</div>
          <div>아바타</div>
        </div>
      </div>
    </div>
  );
}
