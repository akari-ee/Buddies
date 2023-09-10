'use client';

import React, { useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader';
import Chats from './Chats';
import { cn } from '@/utils/extendClass';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { useChat } from 'ai/react';
import { useSession } from 'next-auth/react';
import { Message } from 'ai';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

type msgType = {
  type: string;
  text: string;
};

const bg_colors = ['bg-bomi', 'bg-yermi', 'bg-gauri', 'bg-gyeouri'];

// any 타입 고쳐야 함.
const AlwaysScrollToBottom = () => {
  const elementRef: any = useRef();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};

export default function ChatSection({
  characterId,
  loadedChatList,
}: {
  characterId: string;
  loadedChatList: Message[];
}) {
  const { data: session, status } = useSession();
  const email = session?.user.email;
  const { messages, input, isLoading, handleInputChange, handleSubmit } =
    useChat({
      body: {
        email: email,
        id: Number(characterId),
      },
      initialMessages: loadedChatList,
      api: '/api/chat',
    });
    dayjs.extend(utc);
    dayjs.extend(timezone);
  return (
    <div className='w-full min-h-screen justify-center items-center text-black relative'>
      <div className='w-full h-full flex flex-col bg-[#FAFAFA]'>
        {/* Chat Header */}
        <ChatHeader characterId={characterId} />
        {/* Chat Section */}
        <Chats messages={messages} characterId={Number(characterId)} />
        {/* Chat Footer */}
        <div className='w-full h-[calc(100vh*0.1)] px-6 py-4 rounded-t-2xl bg-white shadow-2xl shadow-[#6d6d6dd9]'>
          <form
            onSubmit={handleSubmit}
            className='flex justify-between items-center space-x-2'
          >
            <input
              placeholder={dayjs.tz.guess()}
              className='grow border-none bg-[#F1F1F1] rounded-full h-10 pl-6'
              value={input}
              onChange={handleInputChange}
            />
            <button
              className={cn(
                'rounded-full relative w-10 h-10 flex justify-center items-center',
                bg_colors[Number(characterId)]
              )}
              disabled={isLoading}
              type='submit'
            >
              <PaperAirplaneIcon className='w-6 h-6 text-white' />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
