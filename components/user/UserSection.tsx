import React from 'react'
import UserTitle from './UserTitle'
import UserHeader from './UserHeader'
import UserInfo from './UserInfo'

type Props = {}

export default function UserSection({}: Props) {
  return (
    <div className='w-screen h-screen relative flex flex-col justify-between overflow-y-scroll px-6 pt-4'>
      <UserHeader />
      <UserTitle />
      <UserInfo />
    </div>
  )
}