import React from 'react';
import Image from 'next/image';

export default function Logo({serviceTitle, isHome}: LogoHeader) {
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
