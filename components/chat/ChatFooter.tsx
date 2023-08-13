import React from 'react';
import { GrSend } from '@react-icons/all-files/gr/GrSend';
import sendBtn from '/public/send_btn.svg';
import Image from 'next/image';
import { RiSendPlaneFill } from '@react-icons/all-files/ri/RiSendPlaneFill';

type Props = {
  inputMsg: string;
  inputHandler: (input: string) => void;
  sendMessageHandler: () => void;
};

export default function ChatFooter({
  inputMsg,
  inputHandler,
  sendMessageHandler,
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
      <button className='rounded-full relative w-10 h-10 flex justify-center items-center bg-[#5DD004]'>
        <RiSendPlaneFill size={22} color="white" />
      </button>
    </div>
  );
}
