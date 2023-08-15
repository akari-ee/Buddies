import UserSection from '@/components/user/UserSection'
import React from 'react'

type Props = {}

export default function User({}: Props) {
  return (
    <div className='w-screen h-screen flex flex-col items-start shrink-0 min-w-full bg-gauri'>
      <section id='login_section'>
        <UserSection />
      </section>
    </div>
  )
}