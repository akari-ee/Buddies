'use client';

import React, { useRef, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { signInAnonymously } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useRouter } from 'next/navigation';
import { setCookie } from '@/utils/handleCookie';
import {
  handleUserInfo,
  saveUserInfoInToFirebaseDatabase,
} from '@/utils/handleUserInfo';

export default function LoginDialog({ isOpen, onClose }: LoginDialog) {
  let completeButtonRef = useRef(null);
  const router = useRouter();

  const anonymousLoginHandler = async () => {
    await signInAnonymously(auth)
      .then((data) => {
        setCookie('uid', data.user.email || 'anonymous', 365);
        saveUserInfoInToFirebaseDatabase(
          handleUserInfo(data.user, 'anonymous')
        );
      })
      .catch((err) => {
        console.log(err);
        router.replace('/login');
      });
    router.replace('/home');
  };

  return (
    <Dialog
      initialFocus={completeButtonRef}
      open={isOpen}
      onClose={onClose}
      className='relative z-50'
    >
      <div className='fixed inset-0 bg-[#0000003e] backdrop-blur-sm' aria-hidden='true' />
      <div className='fixed inset-0 flex items-center justify-center p-6 border-gray-800'>
        <Dialog.Panel className='w-full max-w-lg rounded-lg bg-white p-10 flex flex-col justify-center items-center md:max-w-xl md:p-16'>
          <Dialog.Title className='flex flex-col justify-center items-center text-center font-bold text-lg mb-6 md:text-2xl'>
            <p>간편한 회원가입으로</p>
            <p>아래 기능을 이용해보세요.</p>
          </Dialog.Title>
          <ul className='flex flex-col justify-center text-xs list-disc space-y-1 text-[#444444] mb-6 md:text-base md:mb-10'>
            <li>
              챗봇과의 대화기록 저장하고 나에게 꼭 맞는 대화경험을 느껴보세요.
            </li>
            <li>
              나는 주로 어떤 위로를 필요로 했는지 챗봇별발화량 체크 기능으로
              확인해볼 수 있어요.
            </li>
            <li>대화 기반 감정상태 분석 기능 활용해보세요.</li>
            <li>나에게 의미있게 다가온 핫토픽을 모아보세요.</li>
          </ul>

          <div className='flex flex-col justify-center items-center space-y-4 text-xs md:text-base'>
            <button
              onClick={onClose}
              className='bg-[#171717] text-white rounded-full px-11 py-3.5'
            >
              SNS 계정으로 간편가입하기
            </button>
            <button onClick={anonymousLoginHandler} className='underline'>
              비회원으로 서비스를 이용할게요
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
