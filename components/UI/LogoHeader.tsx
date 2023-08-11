import React from 'react';
import Image from 'next/image';
import service_title from '/public/service_title.svg';

type HeaderProps = {
  serviceTitle: string;
  isHome: boolean;
};

export default function LogoHeader({serviceTitle, isHome}: HeaderProps) {
  return (
    <div className='w-[80px] h-[30px] md:w-[130px] md:h-[30px] relative flex justify-between'>
      <Image
        src={serviceTitle}
        alt='service_name'
        layout='fill'
        objectFit='contain'
        color='#000000'
      />
    </div>
  );
}
