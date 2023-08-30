import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import bomi_desc from '/public/bomi_desc.svg';
import yermi_desc from '/public/yermi_desc.svg';
import gauri_desc from '/public/gauri_desc.svg';
import gyeouri_desc from '/public/gyeouri_desc.svg';
import Image from 'next/image';
import bomi from '/public/bomi_planet.svg';
import yermi from '/public/yermi_planet.svg';
import gauri from '/public/gauri_planet.svg';
import gyeouri from '/public/gyeouri_planet.svg';

const characters = [
  { name: '보미', src: bomi_desc, ch_src: bomi },
  { name: '여르미', src: yermi_desc, ch_src: yermi },
  { name: '가으리', src: gauri_desc, ch_src: gauri },
  { name: '겨우리', src: gyeouri_desc, ch_src: gyeouri },
];
export default function CharacterSwiper({onChange} : {onChange: (idx: number) => void}) {
  return (
    <div className='w-full'>
      <Swiper
        speed={1500}
        modules={[Navigation, EffectCoverflow]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        onSlideChange={(swiper) => {
          onChange(swiper.activeIndex);
        }}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {characters.map((character) => (
          <SwiperSlide key={character.name}>
            <div key={character.name} className=''>
              <div className='flex flex-col justify-center items-center'>
                <div className='w-72 h-96 scale-110 md:w-96 md:h-96'>
                  <Image
                    key={character.name}
                    src={character.src}
                    alt={character.name}
                    layout='fill'
                    objectFit='contain'
                  />
                </div>
                <div className='w-96 h-96 scale-150 md:scale-159'>
                  <Image
                    key={character.name}
                    src={character.ch_src}
                    alt={character.name}
                    layout='fill'
                    objectFit='contain'
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
