'use client';

import React, { useEffect, useRef } from 'react';
import ChatBox from './ChatBox';

type MessageType = {
  type: string;
  text: string;
};

type MessageProps = {
  messages: MessageType[]
}

const gptStyle = {
  align: 'items-start',
  bg: 'bg-gray-100',
  color: 'text-black',
  radius: 'rounded-2xl rounded-bl-none',
};

const userStyle = {
  align: 'items-end',
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

export default function Chats({ messages }: MessageProps) {
  return (
    <div className='w-full h-[calc(100vh*0.8)] overflow-y-scroll flex flex-col p-3'>
      {messages.map((message, index) => {
        if (message.type === 'user') {
          return <ChatBox key={index} styles={userStyle} message={message.text} />;
        } else {
          return <ChatBox key={index} styles={gptStyle} message={message.text} />;
        }
      })}
      <AlwaysScrollToBottom />
    </div>
  );
}
