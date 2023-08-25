import LoginSection from '@/components/login/LoginSection';
import Splash from '@/components/UI/Splash';
import { auth } from '@/config/firebase';
import { cookies } from 'next/headers';
export default async function Home() {
  return (
    <div className='w-screen h-screen flex flex-col items-start shrink-0 min-w-full'>
      <section id='login_section'>
        <LoginSection />
        {/* <Splash /> */}
      </section>
    </div>
  );
}