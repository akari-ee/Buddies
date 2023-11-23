import React from 'react';
import HomeSection from '@/app/home/_components/HomeSection';
type Props = {};

export default function Home({}: Props) {
  return (
    <div className='w-screen h-screen flex flex-col items-start shrink-0 min-w-full'>
      <section id='login_section'>
        <HomeSection />
      </section>
    </div>
  );
}
