'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import prevBtn from '/public/prev_btn.svg';
import { useRouter } from 'next/navigation';

import bomi from '/public/bomi_option.svg';
import yermi from '/public/yermi_option.svg';
import gauri from '/public/gauri_option.svg';
import gyeouri from '/public/gyeouri_option.svg';
import { cn } from '@/utils/extendClass';
import OptionDialog from './Dialog';

const characters = [
  { name: '보미', src: bomi },
  { name: '여르미', src: yermi },
  { name: '가으리', src: gauri },
  { name: '겨우리', src: gyeouri },
];

const bg_colors = ['bg-bomi', 'bg-yermi', 'bg-gauri', 'bg-gyeouri'];

export default function ChatHeader({ characterId }: { characterId: string }) {
  const [selectedCharacter, setSelectedCharacter] = useState<number>(
    Number(characterId)
  );
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen((prev) => !prev);
  };
  const closeDialog = () => {
    setIsOpen((prev) => !prev);
  };

  const router = useRouter();

  return (
    <div className='w-screen flex h-[calc(100vh*0.1)] rounded-b-xl shadow-[#6d6d6d1a]/10 shadow-md px-5'>
      <div className='w-full flex justify-between items-center'>
        <div className='flex justify-center items-center'>
          <button onClick={() => router.back()}>
            <Image src={prevBtn} alt='go to prev' width={21} height={17} />
          </button>
        </div>
        <div className='flex justify-between items-center space-x-3'>
          <div>BGM | ON</div>
          <div
            className={cn(
              'rounded-full w-10 h-10 relative overflow-hidden',
              bg_colors[selectedCharacter]
            )}
            onClick={openDialog}
          >
            <Image
              src={characters[selectedCharacter].src}
              alt={characters[selectedCharacter].name}
              layout='fill'
              objectFit='contain'
              className='rounded-full'
            />
          </div>
        </div>
      </div>
      <OptionDialog isOpen={isOpen} onClose={closeDialog} curCharacter={Number(selectedCharacter)}/>
    </div>
  );
}
