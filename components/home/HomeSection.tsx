'use client';

import React, { useState } from 'react';
import service_title from '/public/service_title_white.svg';
import LogoHeader from '../UI/LogoHeader';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import './styles.css';

import bomi_desc from '/public/bomi_desc.svg';
import yermi_desc from '/public/yermi_desc.svg';
import gauri_desc from '/public/gauri_desc.svg';
import gyeouri_desc from '/public/gyeouri_desc.svg';
import Image from 'next/image';
import bomi from '/public/bomi_planet.svg';
import yermi from '/public/yermi_planet.svg';
import gauri from '/public/gauri_planet.svg';
import gyeouri from '/public/gyeouri_planet.svg';
import arrow from '/public/btn_right_arrow.svg';
import { cn } from '@/utils/extendClass';

const characters = [
  { name: '보미', src: bomi_desc, ch_src: bomi },
  { name: '여르미', src: yermi_desc, ch_src: yermi },
  { name: '가으리', src: gauri_desc, ch_src: gauri },
  { name: '겨우리', src: gyeouri_desc, ch_src: gyeouri },
];
const bg_colors = ['bg-bomi', 'bg-yermi', 'bg-gauri', 'bg-gyeouri'];
const gradients = ['from-bomi', 'from-yermi', 'from-gauri', 'from-gyeouri']
type Props = {};
export default function HomeSection({}: Props) {
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  return (
    <div className={cn('w-screen h-screen flex flex-col gap-8 relative overflow-hidden pt-5 bg-gradient-to-b via-transparent to-white', bg_colors[currentIdx], gradients[currentIdx])}>
      <div id='header' className='flex justify-between items-center px-6'>
        <LogoHeader serviceTitle={service_title} isHome={true} />
        <div
          id='icon-wrapper'
          className='flex justify-center items-center gap-3 text-white'
        >
          <div>User</div>
          <div>Notify</div>
        </div>
      </div>
      <div className='text-white pl-6 flex flex-col justify-center gap-4'>
        <div className='font-PyeongChangPeace text-3xl'>Hello!</div>
        <div className='text-sm'>
          <p>대화하고 싶은 감정요정,</p>
          <p className='font-bold'>버디를 선택해보세요.</p>
        </div>
      </div>
      <div className='h-fit'>
        <Carousel
          showArrows={false}
          showIndicators={false}
          showStatus={false}
          swipeable
          emulateTouch
          transitionTime={500}
          selectedItem={currentIdx}
          onChange={(idx) => setCurrentIdx((prev) => idx)}
        >
          {characters.map((character) => (
            <div className='h-full'>
              <div className='flex flex-col items-center'>
                <div className='w-56 h-56 scale-110'>
                  <Image
                    key={character.name}
                    src={character.src}
                    alt={character.name}
                  />
                </div>
                <div className='w-96 h-96 scale-125'>
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
          ))}
        </Carousel>
      </div>

      <div className='fixed bottom-12 left-1/2 translate-x-[-50%] bg-[#171717] text-white text-base font-medium rounded-full w-72 py-3 flex justify-center items-center'>
        <div className='flex justify-center items-center gap-4'>
          <button className='flex justify-center items-center'>
            대화 시작하기
          </button>
          <div className='flex justify-center items-center'>
            <Image src={arrow} alt='화살표' />
          </div>
        </div>
      </div>
    </div>
  );
}
