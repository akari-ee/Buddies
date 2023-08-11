'use client';

import React, { useContext, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import Login from './login/Login';
import Image from 'next/image';
import service_title from '/public/service_title.svg';

type Props = {};

export default function LoginSection({}: Props) {
  // const { user } = useAuth();

  // useEffect(() => {
  //   console.log(user);
  // }, []);

  return (
    <div className='w-screen h-screen flex flex-col justify-between'>
      <div className='flex flex-col items-start'>
        <div className='flex flex-col items-start justify-between gap-12 pt-5 pl-6'>
          <Image
            src={service_title}
            alt='service_name'
            width={100}
            height={30}
            color='#000000'
          />
          <div className='flex flex-col items-start gap-6'>
            <div className='font-PyeongChangPeace text-3xl'>
              <p className='font-light'>Find your</p>
              <p className='font-bold'>
                own secret
                <br />
                planet
              </p>
            </div>
            <div className='text-[#444444] text-sm'>
              나의 친구, 버디와 함께{' '}
              <span className='font-bold'>
                차곡차곡 쌓이는 <br />
                이야기로 나만의 행성
              </span>
              을 만들어보세요!
            </div>
          </div>
        </div>
      </div>

      <Login />
    </div>
  );
}

// color: var(--grey-grey-44, #444);

// /* Body/Body_14R */
// font-family: Apple SD Gothic Neo;
// font-size: 14px;
// font-style: normal;
// font-weight: 400;
// line-height: 18px; /* 128.571% */
// letter-spacing: -0.33px;
