import React from 'react';
import { ArrowSmallLeftIcon } from '@heroicons/react/24/outline';

export default function ProfileHeader({ setOpen }: ProfileHeaderProps) {
  return (
    <div>
      <button onClick={setOpen}>
        <ArrowSmallLeftIcon className='w-6 h-6' aria-hidden='true' />
      </button>
    </div>
  );
}
