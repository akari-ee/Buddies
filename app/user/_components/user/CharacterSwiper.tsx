import Image from 'next/image';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-cards';
import { cn } from '@/utils/extendClass';
import { charactersForUserSwiper, text_colors } from '@/app/_constant/constant';
import badge from '@/public/badge.svg';

type Props = {
  chatUsageData: any;
};

export default function CharacterSwiper({ chatUsageData }: Props) {
  return (
    <div className='w-full lg:w-[80%] lg:max-w-xl'>
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
        {charactersForUserSwiper.map((character, index) => (
          <SwiperSlide key={character.name} className='rounded-lg'>
            <div
              key={character.name}
              className='w-full h-[600px] pt-7 flex flex-col justify-between items-center bg-[white]/90 backdrop-blur-3xl shadow-2xl drop-shadow-2xl'
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
              <div className='bg-white rounded-full shadow-md px-6 py-2 relative'>
                <p
                  className={cn(
                    text_colors[index],
                    'text-lg font-bold font-PyeongChangPeace'
                  )}
                >
                  {character.name}
                </p>
                <Image
                  src={badge}
                  alt='badge'
                  width={22}
                  height={22}
                  className='absolute -top-[5px] -right-[6px]'
                />
              </div>
              <div
                id='usage-info'
                className='flex flex-col gap-2 text-sm min-w-full px-6'
              >
                <div className='flex w-full'>
                  {/* for icon */}
                  <div id='icon'></div>
                  <div className='text-[13px] text-[#999]'>총 대화수</div>
                  <div className='font-bold grow text-right text-sm'>
                    3134개
                  </div>
                </div>
                <div className='flex w-full'>
                  <div id='icon'></div>
                  <div className='relative text-[13px] text-[#999] after:content-[">"] after:absolute after:-right-3'>
                    긍정단어
                  </div>
                  <div className='font-bold grow text-right text-sm'>84개</div>
                </div>
                <div className='flex w-full'>
                  <div id='icon'></div>
                  <div className='relative text-[13px] text-[#999] after:content-[">"] after:absolute after:-right-3'>
                    부정단어
                  </div>
                  <div className='font-bold grow text-right text-sm'>
                    3050개
                  </div>
                </div>
              </div>
              <div className='h-[1px] border-[1px] border-dashed border-[#999] w-full opacity-[0.3] mt-[31px]'></div>
              <div className='text-sm flex justify-center px-14 text-center pt-[23px] pb-[40px] text-[#444]'>
                {character.msg}
              </div>
              <div className='w-full h-12 flex-2 flex justify-center place-self-stretch bg-white py-[15px]'>
                <button className='w-full text-[#868686] text-sm'>
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
