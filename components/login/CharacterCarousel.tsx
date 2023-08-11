'use client';

import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import bomi from '/public/bomi.svg';
import yermi from '/public/yermi.svg';
import gauri from '/public/gauri.svg';
import gyeouri from '/public/gyeouri.svg';

type Props = {};

const characters = [
  { name: '보미', src: bomi },
  { name: '여르미', src: yermi },
  { name: '가으리', src: gauri },
  { name: '겨우리', src: gyeouri },
];

export default function CharacterCarousel({}: Props) {
  return (
    <div className='h-[800px]'>
      <Carousel
        showArrows={false}
        showIndicators={false}
        showStatus={false}
        swipeable
        emulateTouch
        transitionTime={500}
      >
        {characters.map((character) => (
          <div key={character.name} id='ch-wrapper' className='w-48 h-48 md:w-96 md:h-96 mx-auto'>
            <Image key={character.name} src={character.src} alt={character.name} layout='fill' objectFit='contain'/>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
