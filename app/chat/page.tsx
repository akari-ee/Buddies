import ChatSection from '@/components/chat/ChatSection'
import React from 'react'

type Props = {}

export default function Chat({}: Props) {
  return (
    <div className='w-screen h-screen flex flex-col items-start shrink-0 min-w-full'>
      <section id="chat_section">
        <ChatSection />
      </section>
    </div>
    
  )
}