"use client";

import LoginSection from "@/app/login/_components/LoginSection";
import Splash from "@/components/Splash";
import { useEffect, useState } from "react";

export default function Main() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (!sessionStorage.getItem("isInit")) {
      sessionStorage.setItem("isInit", "true");
    }
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer); // 컴포넌트가 언마운트되면 타이머를 제거
  }, []);

  return showSplash ? (
    <Splash showSplash={showSplash} />
  ) : (
    <div className="flex flex-col items-start w-screen min-w-full h-screen shrink-0">
      <section id="login_section">
        <LoginSection />
      </section>
    </div>
  );
}
