import React from 'react';
import Image from 'next/image';
import logo from '/public/logo.svg';
import serviceName from '/public/service_name.svg';

type Props = {};

export default function Splash({}: Props) {
  return (
    <div className='h-screen flex flex-col justify-center items-center bg-[#171717] space-y-3'>
      <Image src={logo} alt='logo'/>
      <Image src={serviceName} alt='service_name' />
    </div>
  );
}
