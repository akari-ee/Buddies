'use client';

import React, { useRef } from 'react';
import { Dialog } from '@headlessui/react';
import { usePathname, useRouter } from 'next/navigation';

type ReCheckProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedCharacter: {
    name: string;
    src: string;
  };
  characterIdx: number;
};

export default function ReCheckDialog({
  isOpen,
  onClose,
  selectedCharacter,
  characterIdx,
}: ReCheckProps) {
  let completeButtonRef = useRef(null);
  const router = useRouter();
  return (
    <Dialog
      initialFocus={completeButtonRef}
      open={isOpen}
      onClose={onClose}
      className='relatve z-10'
    >
      <div className='fixed inset-0 bg-[#00000080]' aria-hidden='true' />
      <div className='fixed inset-0 flex items-center justify-center p-6 border-gray-800'>
        <Dialog.Panel className='w-full relative max-w-lg rounded-lg bg-white pt-10 flex flex-col justify-center gap-3'>
          <Dialog.Title className='flex flex-col justify-center items-center text-center font-bold text-lg'>
            <div className='flex flex-col justify-center items-center text-lg font-bold'>
              <p>대화상대를</p>
              <p>{selectedCharacter.name}로 변경할까요?</p>
            </div>
          </Dialog.Title>

          <div
            id='dialog-body'
            className='text-sm text-[#999] flex flex-col justify-center items-center'
          >
            <p>대화상대 변경 시 {selectedCharacter.name}와의</p>
            <p>새로운 대화가 시작되요.</p>
          </div>
          <div className='w-full flex justify-center items-center h-14 border border-t-2 rounded-b-lg'>
            <button className='w-full h-full border-r-2' onClick={onClose}>
              아니오
            </button>
            <button
              className='w-full h-full'
              onClick={() => {
                onClose();
                router.replace(`/chat/${characterIdx}`);
              }}
            >
              네
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
