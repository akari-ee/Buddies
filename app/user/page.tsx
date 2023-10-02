'use client';

import UserSection from '@/components/user/UserSection';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import React, { useCallback, useEffect, useState } from 'react';
import { promptState } from '@/store/atoms';
import { cn } from '@/utils/extendClass';
import { useRecoilValue } from 'recoil';
import { getSession } from 'next-auth/react';

type Props = {};
const bg_colors = ['bg-bomi', 'bg-yermi', 'bg-gauri', 'bg-gyeouri'];

export default async function User({}: Props) {
  const [chatUsageData, setChatUsageData] = useState({
    '보미': 0,
    '여르미': 0,
    '가으리': 0,
    '겨우리': 0,
  });
  // bg-gauri bg-gradient-to-b  from-gauri via-gauri/20 to-white
  // const chatUsageData = await getChatUsage();
  const value = useRecoilValue(promptState);
  const getChatUsage = useCallback(async () => {
    const session: unknown = await getSession(authOptions);
    // 익명(비회원) 사용자는 챗봇 대화기록을 저장하지 않는다.
    if (session === null || session === undefined) {
      return [];
    }

    // unknown 에러 방지
    const email = (
      session as { user: { name: string; email: string; image: string } }
    ).user.email;

    const chatUsageResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/firebase/getChatUsage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      }
    );

    const chatUsageData = await chatUsageResponse.json();
    setChatUsageData(chatUsageData.data.chatUsage);
  }, []);

  useEffect(() => {
    getChatUsage();
  }, [])
  return (
    <div
      className={cn(
        'w-screen h-screen flex flex-col items-start shrink-0 min-w-full', bg_colors[value]
      )}
    >
      <section id='login_section' className=''>
        <UserSection chatUsageData={chatUsageData} />
      </section>
    </div>
  );
}

// async function getChatUsage() {
//   const session: unknown = await getServerSession(authOptions);
//   // 익명(비회원) 사용자는 챗봇 대화기록을 저장하지 않는다.
//   if (session === null || session === undefined) {
//     return [];
//   }

//   // unknown 에러 방지
//   const email = (
//     session as { user: { name: string; email: string; image: string } }
//   ).user.email;

//   const chatUsageResponse = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/api/firebase/getChatUsage`,
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email: email }),
//     }
//   );

//   const chatUsageData = await chatUsageResponse.json();

//   return chatUsageData.data.chatUsage;
// }