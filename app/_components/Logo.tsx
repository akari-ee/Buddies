import React from 'react';
import Image from 'next/image';

export default function Logo({serviceTitle, isHome}: LogoHeader) {
  return (
    <div className='w-[85px] h-[16px] lg:w-[113px] lg:h-[21px] relative flex justify-between'>
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
