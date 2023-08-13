'use client';

import React, { useRef, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { usePathname, useRouter } from 'next/navigation';

import bomi from '/public/bomi_option.svg';
import yermi from '/public/yermi_option.svg';
import gauri from '/public/gauri_option.svg';
import gyeouri from '/public/gyeouri_option.svg';
import Image from 'next/image';
import { cn } from '@/utils/extendClass';

type OptionDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  curCharacter: number;
};

const characters = [
  { name: '보미', src: bomi },
  { name: '여르미', src: yermi },
  { name: '가으리', src: gauri },
  { name: '겨우리', src: gyeouri },
];
const bg_colors = ['bg-bomi', 'bg-yermi', 'bg-gauri', 'bg-gyeouri'];
const border_colors = [
  'border-bomi',
  'border-yermi',
  'border-gauri',
  'border-gyeouri',
];
export default function OptionDialog({
  isOpen,
  onClose,
  curCharacter,
}: OptionDialogProps) {
  let completeButtonRef = useRef(null);
  const router = useRouter();
  const [selectedCharacter, setSelectedCharacter] =
    useState<number>(curCharacter);

  return (
    <Dialog
      initialFocus={completeButtonRef}
      open={isOpen}
      onClose={onClose}
      className='relative z-10'
    >
      <div className='fixed inset-0 bg-[#00000080]' aria-hidden='true' />
      <div className='fixed bottom-0 h-80 w-screen flex items-center justify-center border-gray-800'>
        <Dialog.Panel className='w-full h-full max-w-lg rounded-t-lg bg-white p-6 flex flex-col justify-between md:max-w-xl'>
          <Dialog.Title className='flex'>
            <div id='title' className='space-y-1'>
              <p className='font-bold text-lg text-[#171717]'>
                대화상대를 변경할까요?
              </p>
              <p className='text-sm text-[#444]'>
                이야기를 나누고 싶은{' '}
                <span className='font-bold'>버디를 선택해보세요.</span>
              </p>
            </div>
          </Dialog.Title>
          <div
            id='character_list'
            className='flex justify-between items-center space-y-2'
          >
            {characters.map((character, idx) => (
              <div
                className={cn(
                  'w-16 h-16 relative rounded-full border-4 border-double p-3',
                  border_colors[idx],
                  selectedCharacter !== idx ? 'opacity-30' : ''
                )}
                onClick={() => setSelectedCharacter((prev) => idx)}
              >
                <Image
                  src={character.src}
                  alt={character.name}
                  layout='fill'
                  objectFit='contain'
                  className={cn('rounded-full', bg_colors[idx])}
                />
              </div>
            ))}
          </div>
          <div className='h-12 flex justify-center bg-[#171717] text-white text-sm rounded-full mb-8'>
            <button className='w-full h-full rounded-full' onClick={() => {
              onClose();
              router.replace(`/chat/${selectedCharacter}`);
            }}>선택완료</button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
