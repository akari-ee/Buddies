'use client';

import React, { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import bomi from '/public/bomi_option.png';
import yermi from '/public/yermi_option.png';
import gauri from '/public/gauri_option.png';
import gyeouri from '/public/gyeouri_option.png';
import Image from 'next/image';
import { cn } from '@/utils/extendClass';
import ReCheckDialog from './ReCheckDialog';

type OptionDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  curCharacter: number;
  onChange: (idx: number) => void;
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
  onChange,
}: OptionDialogProps) {
  let completeButtonRef = useRef(null);

  const [selectedCharacter, setSelectedCharacter] =
    useState<number>(curCharacter);
  const [isCheckOpen, setIsCheckOpen] = useState(false);

  const openDialog = () => {
    setIsCheckOpen((prev) => !prev);
  };
  const closeDialog = (e: boolean) => {
    setIsCheckOpen((prev) => !prev);
    if (e) {
      onChange(selectedCharacter);
      onClose();
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        initialFocus={completeButtonRef}
        open={isOpen}
        onClose={onClose}
        className='relative z-5'
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className='fixed inset-0 bg-[#00000080] z-0' aria-hidden='true' />
        {/* Full-screen container to center the panel */}
        <div className='fixed bottom-0 h-80 w-screen flex items-center justify-center border-gray-800'>
          {/* The actual dialog panel  */}
          <Transition.Child
            as={Fragment}
            enter='transform transition ease-in-out duration-500 sm:duration-700'
            enterFrom='translate-y-full'
            enterTo='translate-y-0'
            leave='transform transition ease-in-out duration-500 sm:duration-700'
            leaveFrom='translate-y-0'
            leaveTo='translate-y-full'
          >
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
                className='flex justify-evenly items-center'
              >
                {characters.map((character, idx) => (
                  <div
                    key={character.name}
                    className={cn(
                      'w-16 h-16 md:w-20 md:h-20 relative rounded-full cursor-pointer',
                      border_colors[idx],
                      selectedCharacter !== idx ? 'opacity-30' : ''
                    )}
                    onClick={() => setSelectedCharacter((prev) => idx)}
                  >
                    <Image
                      src={character.src}
                      alt={character.name}
                      fill={true}
                      className={cn('rounded-full shadow-lg absolute', bg_colors[idx])
                    }
                    />
                  </div>
                ))}
              </div>
              <div className='h-12 flex justify-center bg-[#171717] text-white text-sm rounded-full mb-8'>
                <button
                  className='w-full h-full rounded-full shadow-lg'
                  onClick={() => {
                    openDialog();
                  }}
                  ref={completeButtonRef}
                >
                  선택완료
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
        <ReCheckDialog
          isOpen={isCheckOpen}
          onClose={closeDialog}
          selectedCharacter={characters[selectedCharacter]}
          characterIdx={selectedCharacter}
        />
      </Dialog>
    </Transition.Root>
  );
}
