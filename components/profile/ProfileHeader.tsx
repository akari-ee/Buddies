import React from 'react';
import { useRouter } from 'next/navigation';
import { BiArrowBack } from '@react-icons/all-files/bi/BiArrowBack';
import { ArrowSmallLeftIcon } from '@heroicons/react/24/outline';
export default function ProfileHeader({ setOpen }: ProfileHeaderProps) {
  const router = useRouter();
  return (
    <div>
      <button onClick={setOpen}>
        <ArrowSmallLeftIcon className='h-6 w-6' aria-hidden='true' />
      </button>
    </div>
  );
}
