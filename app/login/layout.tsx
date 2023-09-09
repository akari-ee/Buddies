'use client';

import Splash from '@/components/UI/Splash';
import { useEffect, useState } from 'react';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSplash, setShowSplash] = useState(false);
  useEffect(() => {
    const sessionValue = sessionStorage.getItem('isInit');
    if (!sessionValue) {
      sessionStorage.setItem('isInit', 'true'); // 세션 값에 true를 저장
      setShowSplash(true); // 스플래시 화면을 보여줌
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 3000); // 3초 후에 setShowSplash(false)가 실행되면서 스플래시 화면이 사라짐

      return () => clearTimeout(timer); // 컴포넌트가 언마운트되면 타이머를 제거
    }
  }, []);

  return (
    <>
      {showSplash ? <Splash showSplash={showSplash} /> : children}
    </>
  );
}
