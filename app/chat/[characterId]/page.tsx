import ChatSection from '@/components/chat/ChatSection';
import React from 'react';

export default function Chat({ params }: { params: { characterId: string } }) {
  return (
    <div className='w-screen h-screen flex flex-col items-start shrink-0 min-w-full'>
      <section id='chat_section'>
        <ChatSection characterId={params.characterId}/>
      </section>
    </div>
  );
}
