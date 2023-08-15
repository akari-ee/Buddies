import React from 'react'
import { useRouter } from 'next/navigation';
import { BiArrowBack } from '@react-icons/all-files/bi/BiArrowBack';

type Props = {}

export default function ProfileHeader({}: Props) {
  const router = useRouter();
  return (
    <div>
      <button onClick={() => router.back()}>
        <BiArrowBack size={30} color="black" />
        {/* <Image src={prevBtn} alt='go to prev' width={21} height={17}/> */}
      </button>
    </div>
  )
}