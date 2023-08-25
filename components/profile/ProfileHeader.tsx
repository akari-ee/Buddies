import React from 'react';
import { useRouter } from 'next/navigation';
import { BiArrowBack } from '@react-icons/all-files/bi/BiArrowBack';
import { ArrowSmallLeftIcon } from '@heroicons/react/24/outline';
export default function ProfileHeader({ setOpen }: ProfileHeaderProps) {
  const router = useRouter();
  return (
    <div>
      <button onClick={setOpen}>
        {/* <BiArrowBack size={30} color='black' /> */}
        <ArrowSmallLeftIcon className='h-6 w-6' aria-hidden='true' />
        {/* <Image src={prevBtn} alt='go to prev' width={21} height={17}/> */}
      </button>
    </div>
  );
}
