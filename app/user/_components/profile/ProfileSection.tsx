'use client';

import React from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileInfo from './ProfileInfo';

export default function ProfileSection({ setOpen }: ProfileSectionProps) {
  return (
    <div className='w-full h-full flex flex-col gap-10'>
      <ProfileHeader setOpen={setOpen} />
      <ProfileInfo />
    </div>
  );
}
