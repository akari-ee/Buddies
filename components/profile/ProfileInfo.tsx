import React from 'react';
import { GrNext } from '@react-icons/all-files/gr/GrNext';
import BgmSwitch from './BgmSwitch';

type Props = {};

export default function ProfileInfo({}: Props) {
  return (
    <div className='flex flex-col justify-center grow gap-10'>
      <div className='flex items-center gap-2 rounded-lg border border-gray-300 p-4'>
        <div className='rounded-full border border-gray-500 w-12 h-12'>
          아바타
        </div>
        <div className='flex flex-col justify-start'>
          <div>카카오톡으로 로그인</div>
          <div>49crehbgr@gmail.com</div>
        </div>
      </div>
      <div className='rounded-lg space-y-4 text-lg text-[#121212] py-6'>
        <div className='flex justify-between items-center'>
          <div>BGM 설정</div>
          <BgmSwitch />
        </div>
        <div className='flex justify-between items-center'>
          <div>데이터 백업 설정</div>
          <GrNext size={14} color='gray'/>
        </div>
        <div className='flex justify-between items-center'>
          <div>알림 설정</div>
          <GrNext size={14} color='gray'/>
        </div>
        <div className='flex justify-between items-center'>
          <div>이용약관</div>
          <GrNext size={14} color='gray'/>
        </div>
        <div className='flex justify-between items-center'>
          <div>로그아웃</div>
          <div className='text-sm text-[#999]'>회원 탈퇴</div>
        </div>
      </div>
      <div className='grow flex flex-col justify-end items-center pb-16'>
        <div className='flex flex-col justify-center items-center'>
          <p>웹 버전 정보</p>
          <p className='text-[#999]'>1.2.35</p>
        </div>
      </div>
    </div>
  );
}
