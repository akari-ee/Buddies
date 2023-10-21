'use client';

import React, { useEffect, useRef, useState } from 'react';
import ChatHeader from './ChatHeader';
import Chats from './Chats';
import { cn } from '@/utils/extendClass';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { useChat } from 'ai/react';
import { useSession } from 'next-auth/react';
import { AIStream, Message } from 'ai';
import dayjs from 'dayjs';
import { useRecoilState } from 'recoil';
import { chatState } from '@/store/atoms';

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
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useRecoilState(chatState);
  // const { messages, input, isLoading, handleInputChange, handleSubmit } =
  //   useChat({
  //     body: {
  //       email: email,
  //       id: Number(characterId),
  //     },
  //     initialMessages: loadedChatList,
  //     api: '/api/chat',
  //   });

  const postMessage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const text = inputMessage;

    setInputMessage('');

    const createdAt = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const role = 'user';
    const id = crypto.randomUUID();

    const userChat = {
      id: id,
      role: role,
      content: text,
      createdAt: createdAt,
    };

    setMessages([...messages, userChat]);

    const res = await fetch('http://127.0.0.1:5000/queryJson', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: text,
      }),
    });

    const assistantChat = await res.json();

    setMessages([...messages, userChat, assistantChat]);

    console.log('messages:', messages);
  };

  const handleInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

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
            onSubmit={postMessage}
            className='flex justify-between items-center space-x-2'
          >
            <input
              placeholder='메세지를 입력하세요.'
              className='grow border-none bg-[#F1F1F1] rounded-full h-10 pl-6'
              value={inputMessage}
              onChange={handleInputText}
            />
            <button
              className={cn(
                'rounded-full relative w-10 h-10 flex justify-center items-center',
                bg_colors[Number(characterId)]
              )}
              disabled={false}
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
