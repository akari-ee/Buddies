import React from 'react';
import { GrNext } from '@react-icons/all-files/gr/GrNext';
import BgmSwitch from './BgmSwitch';
import { useRouter } from 'next/navigation';
import { getAuth } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { delCookie } from '@/utils/handleCookie';
import { useAuth } from '../client-auth-provider';
import { handleProviderId } from '@/utils/handleProviderId';
import Image from 'next/image';
type Props = {};

export default function ProfileInfo({}: Props) {
  const user = useAuth().user;
  console.log(user);
  const router = useRouter();
  const [profile, setProfile] = React.useState<Profile>({
    name: user?.displayName || '익명 사용자',
    email: user?.email || '익명 이메일',
    photoURL: user?.photoURL || '',
    provider: handleProviderId(user?.email || '') || '',
  });

  const logoutHandler = async () => {
    const auth = getAuth();
    delCookie('uid');

    await signOut(auth)
      .then((res) => {
        // Sign-out successful.
        console.log('Sign out success! ', res);
        router.replace('/');
      })
      .catch((error) => {
        // An error happened.
        console.log('Sign out Failed! ', error);
      });
  };

  return (
    <div className='flex flex-col justify-center grow gap-10'>
      <div className='flex items-center gap-2 rounded-lg border border-gray-300 p-4'>
        <div className='rounded-full border border-gray-500 w-12 h-12 relative'>
          <Image src={profile.photoURL} alt='profile' layout='fill' objectFit='contain' className='rounded-full'/>
        </div>
        <div className='flex flex-col justify-start'>
          <div className='text-sm'>{profile.provider} 로그인</div>
          <div className='text-xs'>{profile.email}</div>
        </div>
      </div>
      <div className='rounded-lg space-y-4 text-sm text-[#121212] py-6'>
        <div className='flex justify-between items-center'>
          <div>BGM 설정</div>
          <BgmSwitch />
        </div>
        <div className='flex justify-between items-center cursor-pointer'>
          <div>데이터 백업 설정</div>
          <GrNext size={14} color='gray' />
        </div>
        <div className='flex justify-between items-center cursor-pointer'>
          <div>알림 설정</div>
          <GrNext size={14} color='gray' />
        </div>
        <div className='flex justify-between items-center cursor-pointer'>
          <div>이용약관</div>
          <GrNext size={14} color='gray' />
        </div>
        <div className='flex justify-between items-center'>
          <div className='cursor-pointer' onClick={logoutHandler}>
            로그아웃
          </div>
          <div className='text-sm text-[#999] cursor-pointer'>회원 탈퇴</div>
        </div>
      </div>
      <div className='grow flex flex-col justify-end items-center pb-16'>
        <div className='flex flex-col justify-center items-center'>
          <p>웹 버전 정보</p>
          <p className='text-[#999]'>1.2.35</p>
        </div>
      </div>
    </div>
  );
}
