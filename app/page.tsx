'use client';

import LoginSection from '@/components/login/LoginSection';
import Splash from '@/components/UI/Splash';
import { useEffect, useState } from 'react';
export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer); // 컴포넌트가 언마운트되면 타이머를 제거
  }, []);
  return showSplash ? (
    <Splash />
  ) : (
    <div className='w-screen h-screen flex flex-col items-start shrink-0 min-w-full'>
      <section id='login_section'>
        <LoginSection />
      </section>
    </div>
  );
}
