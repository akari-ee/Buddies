import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ChatSection from '@/components/chat/ChatSection';
import { auth } from '@/config/firebase';
import { handleChatList } from '@/utils/handleChatList';
import { getServerSession } from 'next-auth';
import { getSession, useSession } from 'next-auth/react';
import React from 'react';
export default async function Chat({
  params,
}: {
  params: { characterId: string };
}) {
  const initialMessages = await getChatList(params.characterId);
  return (
    <div className='w-screen h-screen flex flex-col items-start shrink-0 min-w-full mx-auto'>
      <section id='chat_section'>
        <ChatSection
          characterId={params.characterId}
          loadedChatList={initialMessages}
        />
      </section>
    </div>
  );
}

async function getChatList(characterId: string) {
  const session: unknown = await getServerSession(authOptions);
  // unknown 에러 방지
  if (
    (session as { user: { name: string; email: string; image: string } })
      .user === undefined ||
    (session as { user: { name: string; email: string; image: string } })
      .user === null
  ) {
    return [];
  }
  
  const email = (
    session as { user: { name: string; email: string; image: string } }
  ).user.email;

  // // 익명(비회원) 사용자는 챗봇 대화기록을 저장하지 않는다.
  // if (email === undefined || email === null || email.length === 0) {
  //   return [];
  // }

  const res = await fetch(
    'https://buddies-next-js.vercel.app/api/firebase/getChatList',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, characterId: characterId }),
      // next: { revalidate: 5 },
    }
  );

  const data = await res.json();
  const initialMessages = handleChatList(data.data);
  return initialMessages;
}
