import React from 'react';

type Props = {};

export default function BackgroundCircles({}: Props) {
  return (
    <div className='absolute '>
      <div className='w-[450px] h-[450px] absolute top-72 left-[-130px] rounded-full opacity-20 z-[-1] bg-gradient-to-b from-[#aFEB83] to-transparent via-white md:w-[700px] md:h-[700px] md:top-[300px] md:left-[-290px] lg:w-[1200px] lg:h-[1200px] lg:top-[200px] lg:left-[-150px]' />
      <div className='w-[450px] h-[450px] top-[-100px] left-[100px] absolute rounded-full opacity-20 z-[-1] bg-gradient-to-b from-transparent via-transparent to-[#FFC6CF] md:w-[700px] md:h-[700px] md:top-[-100px] md:left-[290px] lg:w-[1200px] lg:h-[1200px] lg:top-[-400px] lg:left-[900px]'/>
    </div>
  );
}
