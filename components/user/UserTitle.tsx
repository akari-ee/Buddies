import { useSession } from 'next-auth/react';
import React from 'react';

type Props = {};

export default function UserTitle({}: Props) {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <div className='gap-4 text-white mb-4'>
      <div className='font-PyeongChangPeace font-bold text-[32px] -space-y-4'>
        <p>Planetary</p>
        <p>record</p>
      </div>
      <div className='text-[18px]'>
        <p>
          {user?.name || '익명'}님의 <span className='font-bold'>행성기록</span>을
          확인해보세요.
        </p>
      </div>
    </div>
  );
}
