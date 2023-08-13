import React from 'react';
import { GrSend } from '@react-icons/all-files/gr/GrSend';
import sendBtn from '/public/send_btn.svg';
import Image from 'next/image';
import { RiSendPlaneFill } from '@react-icons/all-files/ri/RiSendPlaneFill';
import { cn } from '@/utils/extendClass';

type Props = {
  inputMsg: string;
  inputHandler: (input: string) => void;
  sendMessageHandler: () => void;
  characterId : string;
};

const bg_colors = ['bg-bomi', 'bg-yermi', 'bg-gauri', 'bg-gyeouri'];

export default function ChatFooter({
  inputMsg,
  inputHandler,
  sendMessageHandler,
  characterId,
}: Props) {
  return (
    <div className='w-full h-[calc(100vh*0.1)] px-6 py-4 flex justify-between items-center space-x-2 rounded-t-2xl bg-white shadow-2xl shadow-[#6d6d6dd9]'>
      <input
        placeholder='답변 입력'
        className='grow border-none bg-[#F1F1F1] rounded-full h-10 pl-6'
        value={inputMsg}
        onChange={(e) => {
          inputHandler(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            sendMessageHandler();
          }
        }}
      />
      <button className={cn('rounded-full relative w-10 h-10 flex justify-center items-center', bg_colors[Number(characterId)])}>
        <RiSendPlaneFill size={22} color="white" />
      </button>
    </div>
  );
}
