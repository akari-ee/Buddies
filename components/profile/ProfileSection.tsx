'use client';

import React from 'react'
import ProfileHeader from './ProfileHeader';
import ProfileInfo from './ProfileInfo';

type Props = {}

export default function ProfileSection({}: Props) {
  return (
    <div className='w-full h-full flex flex-col gap-10'>
      <ProfileHeader />
      <ProfileInfo />
    </div>
  )
}