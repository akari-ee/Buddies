import { cn } from '@/utils/extendClass';
import React from 'react'

type ChatBoxStyle = {
  align: string;
  bg: string;
  color: string;
  radius: string;
};

type ChatBoxProps = {
  styles: ChatBoxStyle;
  message: string;
}

export default function ChatBox({styles, message}: ChatBoxProps) {
  return (
    <div className={cn('flex flex-col mb-2 w-full', styles.align)}>
      <div className={cn('flex max-w-[calc(45%)]', styles.bg, styles.color, styles.radius)}>
        <div className='px-2 py-3 text-md'>
          <span>
            {message}
          </span>
        </div>
      </div>
    </div>
  )
}

// padding='8px 14px'
// fontSize='14px'
// fontFamily='Spoqa Han Sans Neo'
// fontWeight='400'