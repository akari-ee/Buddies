import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import Image from 'next/image';
import { LoginCarouselImages } from '@/app/_constant/constant';

export default function CharacterSwiper({
  onChange,
}: {
  onChange: (idx: number) => void;
}) {
  return (
    <div className='w-full h-80 flex justify-center items-center'>
      <Swiper
        speed={1500}
        modules={[Scrollbar, Autoplay, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        onSlideChange={(swiper) => {
          onChange(swiper.activeIndex);
        }}
        // pagination={{ clickable: true }}
        // loop={true}
      >
        {LoginCarouselImages.map((item) => (
          <SwiperSlide key={item.name}>
            <div
              key={item.name}
              id='ch-wrapper'
              className='w-48 h-48 md:w-96 md:h-96 mx-auto relative'
            >
              <Image
                key={item.name}
                src={item.src}
                alt={item.name}
                layout='fill'
                objectFit='contain'
                className=''
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
