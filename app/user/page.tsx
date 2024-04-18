import UserSection from '@/app/user/_components/user/UserSection';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import React from 'react';

export default async function User() {
  const chatUsageData = await getChatUsage();
  return <UserSection chatUsageData={chatUsageData} />;
}

async function getChatUsage() {
  const session: unknown = await getServerSession(authOptions);
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

  return chatUsageData.data.chatUsage;
}
