import React from 'react';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import bomi from '/public/bomi_planet.svg';
import yermi from '/public/yermi_planet.svg';
import gauri from '/public/gauri_planet.svg';
import gyeouri from '/public/gyeouri_planet.svg';
import Image from 'next/image';

const characters = [
  { name: '보미', ch_src: bomi },
  { name: '여르미', ch_src: yermi },
  { name: '가으리', ch_src: gauri },
  { name: '겨우리', ch_src: gyeouri },
];

type Props = {};

export default function CharacterCarousel({}: Props) {
  return (
    <div className='w-full'>
      <Carousel
        showArrows={false}
        showIndicators={false}
        showStatus={false}
        showThumbs={false}
        swipeable
        emulateTouch
        transitionTime={500}
        width='100%'
      >
        {characters.map((character) => (
          <div className='w-full h-[500px] px-5 flex flex-col justify-evenly items-center border-[1px] border-white rounded-lg'>
            <div id='character-image' className='w-52 h-52 relative'>
              <Image
                key={character.name}
                src={character.ch_src}
                alt={character.name}
                layout='fill'
                objectFit='contain'
              />
            </div>
            <div
              id='usage-info'
              className='flex justify-center items-center gap-10'
            >
              <div className='flex flex-col justify-center items-center'>
                <p>총 대화일</p>
                <p>6일</p>
              </div>
              <div className='flex flex-col justify-center items-center'>
                <p>총 대화시간</p>
                <p>84시간</p>
              </div>
              <div className='flex flex-col justify-center items-center'>
                <p>총 대화수</p>
                <p>3134개</p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
