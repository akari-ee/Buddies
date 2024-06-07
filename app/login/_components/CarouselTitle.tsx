import React from 'react';

type Props = {
  carouselIndex: number;
};

export default function CarouselTitle({ carouselIndex }: Props) {
  return (
    <div className='flex flex-col items-start leading-9 gap-6 md:gap-8'>
      {carouselIndex === 0 && (
        <>
          <div className='font-PyeongChangPeace text-[32px] md:text-6xl'>
            <p className='font-light'>Find your</p>
            <p>
              <span className='font-light'>own secret</span>
              <br />
              <span className='font-bold'>planet</span>
            </p>
          </div>
          <div className='text-[#444444] text-sm md:text-lg'>
            나의 친구, 버디와 함께{' '}
            <span className='font-bold'>
              차곡차곡 쌓이는 <br />
            </span>
            이야기로 나만의 행성을 만들어보세요!
          </div>
        </>
      )}
      {carouselIndex === 1 && (
        <>
          <div className='font-PyeongChangPeace text-[32px] md:text-6xl'>
            <p className='font-light'>Have a warm</p>
            <p>
              <span className='font-light'>conversation</span>
              <br />
              <span className='font-bold'>with buddy</span>
            </p>
          </div>
          <div className='text-[#444444] text-sm md:text-lg'>
            나와 마음이 맞는 버디와의{' '}
            <span className='font-bold'>
              대화기록을 저장
              <br />
            </span>
            하고
            <span className='font-bold'>나에게 꼭 맞는 대화경험</span>을
            느껴보세요.
          </div>
        </>
      )}
      {carouselIndex === 2 && (
        <>
          <div className='font-PyeongChangPeace text-[32px] md:text-6xl'>
            <p className='font-light'>Finding out</p>
            <p>
              <span className='font-light'>about my mind</span>
              <br />
              <span className='font-bold'>through analysis</span>
            </p>
          </div>
          <div className='text-[#444444] text-sm md:text-lg'>
            대화기반{' '}
            <span className='font-bold'>
              감정상태 분석 및 버디별 발화량 체크 기능
            </span>
            을<br />
            통해 나는 주로
            <span className='font-bold'>어떤 위로를 필요로 했는지 확인</span>
            해보세요.
          </div>
        </>
      )}
    </div>
  );
}
