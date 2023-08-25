'use client';

import React, { useEffect, useRef } from 'react';
import ChatBox from './ChatBox';
import { timeConverter } from '@/utils/timeConverter';

const gptStyle = {
  align: 'justify-end',
  bg: 'bg-gray-100',
  color: 'text-black',
  radius: 'rounded-2xl rounded-bl-none',
};

const userStyle = {
  align: 'justify-end',
  bg: 'bg-green-300',
  color: 'text-white',
  radius: 'rounded-2xl rounded-br-none',
};

// any 타입 고쳐야 함.
const AlwaysScrollToBottom = () => {
  const elementRef: any = useRef();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};

export default function Chats({ messages, characterId }: Message) {
  return (
    <div className='w-full h-[calc(100vh*0.8)] overflow-y-scroll flex flex-col p-3'>
      {messages.length > 0
        ? messages.map((message) => {
            if (message.role === 'user') {
              return (
                <ChatBox
                  key={message.id}
                  styles={userStyle}
                  message={message.content}
                  characterId={Number(characterId)}
                  timestamp={timeConverter(message.createdAt)}
                />
              );
            } else {
              return (
                <ChatBox
                  key={message.id}
                  styles={gptStyle}
                  message={message.content}
                  characterId={-1}
                  timestamp={timeConverter(message.createdAt)}
                />
              );
            }
          })
        : null}
      <AlwaysScrollToBottom />
    </div>
  );
}
