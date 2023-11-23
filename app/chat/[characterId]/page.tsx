import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ChatSection from '@/app/_components/chat/ChatSection';
import { handleChatList } from '@/utils/handleChatList';
import { getServerSession } from 'next-auth';
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
  // 익명(비회원) 사용자는 챗봇 대화기록을 저장하지 않는다.
  if (session === null || session === undefined) {
    return [];
  }

  // unknown 에러 방지
  const email = (
    session as { user: { name: string; email: string; image: string } }
  ).user.email;

  const chatListResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/firebase/getChatList`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, characterId: characterId }),
      // next: { revalidate: 5 },
    }
  );

  const chatListData = await chatListResponse.json();
  const initialMessages = handleChatList(chatListData.data);
  return initialMessages;
}
