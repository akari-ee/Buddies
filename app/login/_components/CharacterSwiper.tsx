import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import bomi from '/public/bomi.png';
import yermi from '/public/yermi.png';
import gauri from '/public/gauri.png';
import gyeouri from '/public/gyeouri.png';
import Image from 'next/image';

const characters = [
  { name: '보미', src: bomi },
  { name: '여르미', src: yermi },
  { name: '가으리', src: gauri },
  { name: '겨우리', src: gyeouri },
];

export default function CharacterSwiper({}) {
  return (
    <div className='w-full h-80 flex justify-center items-center'>
      <Swiper
        speed={1500}
        modules={[Scrollbar, Autoplay, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        // pagination={{ clickable: true }}
        loop={true}
      >
        {characters.map((character) => (
          <SwiperSlide key={character.name}>
            <div
              key={character.name}
              id='ch-wrapper'
              className='w-48 h-48 md:w-96 md:h-96 mx-auto relative'
            >
              <Image
                key={character.name}
                src={character.src}
                alt={character.name}
                layout='fill'
                objectFit='contain'
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
