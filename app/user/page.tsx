import UserSection from '@/components/user/UserSection'
import React from 'react'

type Props = {}

export default function User({}: Props) {
  // bg-gauri bg-gradient-to-b  from-gauri via-gauri/20 to-white
  return (
    <div className='w-screen h-screen flex flex-col items-start shrink-0 min-w-full bg-gray-400'>
      <section id='login_section' className=''>
        <UserSection />
      </section>
    </div>
  )
}