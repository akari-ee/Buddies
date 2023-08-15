import React from 'react';

type Props = {};

export default function UserTitle({}: Props) {
  return (
    <div className='flex flex-col justify-center gap-4 text-white mb-10'>
      <div className='font-PyeongChangPeace font-bold text-[32px] -space-y-3'>
        <p>Planetary</p>
        <p>record</p>
      </div>
      <div>
        <p>
          User님의{' '}<span>행성기록</span>을 확인해보세요.
        </p>
      </div>
    </div>
  );
}