'use client';

import React, { useCallback, useEffect, useState } from 'react';
import ChatHeader from './ChatHeader';
import Chats from './Chats';
import ChatFooter from './ChatFooter';

type msgType = {
  type: string;
  text: string;
};

type totalStyle = msgType[];

export default function ChatSection({}) {
  const [userMsg, setUserMsg] = useState<string[]>([]); // User가 보낸 모든 메시지
  const [inputMsg, setInputMsg] = useState<string>(''); // User가 입력한 메시지
  const [gptMsg, setGptMsg] = useState<string[]>([]); // GPT가 답변한 모든 메시지
  const [totalMsg, setTotalMsg] = useState<totalStyle>([]);

  const getMessage = async () => {
    console.log('getMessage 실행');
    try {
      const response = await fetch('/api/handleMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userMessages: userMsg,
          gptMessages: gptMsg,
        }),
      });

      const data = await response.json();
      // GPT가 답변한 메시지를 gptMsg에 추가
      setGptMsg((prev) => [...prev, data.assistant]);

      setTotalMsg((prev) => [...prev, { type: 'gpt', text: data.assistant }]);
      console.log(data);
      console.log(totalMsg);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessageHandler = useCallback(() => {
    if (!inputMsg.trim().length) {
      return;
    }
    console.log('send message');

    const data = inputMsg;
    setUserMsg((prev) => [...prev, data]);
    console.log(userMsg);

    setTotalMsg((prev) => [...prev, { type: 'user', text: data }]);
    setInputMsg('');

    getMessage();
  }, [inputMsg]);

  const inputHandler = (value: string) => {
    setInputMsg((prev) => value);
  };

  // useEffect(() => {
  //   console.log("여기 실행됨.");

    

  //   getMessage();
  // }, [userMsg]);

  return (
    <div className='w-full min-h-screen justify-center items-center text-black'>
      <div className='w-full h-full flex flex-col bg-[#FAFAFA]'>
        <ChatHeader />
        <Chats messages={totalMsg} />
        <ChatFooter
          inputMsg={inputMsg}
          inputHandler={inputHandler}
          sendMessageHandler={sendMessageHandler}
        />
      </div>
    </div>
  );
}
