import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-cards';

import Image from 'next/image';
import bomi from '/public/bomi_planet.png';
import yermi from '/public/yermi_planet.png';
import gauri from '/public/gauri_planet.png';
import gyeouri from '/public/gyeouri_planet.png';
import { cn } from '@/utils/extendClass';

type Props = {
  chatUsageData: any;
};

const characters = [
  { name: '보미', ch_src: bomi },
  { name: '여르미', ch_src: yermi },
  { name: '가으리', ch_src: gauri },
  { name: '겨우리', ch_src: gyeouri },
];
const text_colors = ['text-bomi', 'text-yermi', 'text-gauri', 'text-gyeouri'];

export default function CharacterSwiper({ chatUsageData }: Props) {
  return (
    <div className='w-full lg:max-w-xl'>
      <Swiper
        modules={[EffectCards]}
        speed={1000}
        effect={'cards'}
        cardsEffect={{
          perSlideOffset: 30,
          perSlideRotate: 10,
          slideShadows: true,
        }}
        spaceBetween={50}
        grabCursor={true}
        loop
        slidesPerView={1}
        // roundLengths={true}
        // centeredSlides={true}
        // centeredSlidesBounds={true}
        onSlideChange={(swiper) => {}}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {characters.map((character) => (
          <SwiperSlide key={character.name}>
            <div
              key={character.name}
              className='w-full h-[500px] pt-7 flex flex-col justify-between items-center rounded-lg bg-gradient bg-gradient-to-tr from-white via-cyan-50 to-transparent backdrop-blur-2xl shadow-2xl border-1 border-white/50'
            >
              <div
                id='character-image'
                className='w-52 h-52 relative drop-shadow-lg'
              >
                <Image
                  key={character.name}
                  src={character.ch_src}
                  alt={character.name}
                  fill={true}
                  sizes='(max-width: 640px) 100vw, 640px'
                />
              </div>
              <div
                className={cn(
                  'font-PyeongChangPeace text-lg bg-white rounded-full shadow-md px-6 py-2'
                )}
              >
                <p>{character.name}</p>
              </div>
              <div
                id='usage-info'
                className='flex justify-center items-center gap-10 text-sm'
              >
                <div className='flex flex-col justify-center items-center'>
                  <p>총 대화일</p>
                  <p className='font-bold'>6일</p>
                </div>
                <div className='flex flex-col justify-center items-center'>
                  <p>총 대화시간</p>
                  <p className='font-bold'>84시간</p>
                </div>
                <div className='flex flex-col justify-center items-center'>
                  <p>총 대화수</p>
                  <p className='font-bold'>{chatUsageData[character.name]}</p>
                </div>
              </div>
              <div className='text-sm flex justify-center px-7 text-center'>
                이번달은 해결책 마스터 가을이의 솔로몬 같은 입장 판단을 가장
                많이 필요로 했어요.
              </div>
              <div className='w-full h-12 flex-2 flex justify-center place-self-stretch bg-white'>
                <button className='w-full  text-gray-500 text-sm'>
                  대화기록 보러가기
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
