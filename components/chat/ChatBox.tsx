import { cn } from '@/utils/extendClass';
import React from 'react'

const bg_colors = ['bg-bomi', 'bg-yermi', 'bg-gauri', 'bg-gyeouri'];

export default function ChatBox({styles, message, characterId}: ChatBox) {
  return (
    <div className={cn('flex flex-col mb-2 w-full', styles.align)}>
      <div className={cn('flex max-w-[calc(45%)]', characterId === -1 ? styles.bg: bg_colors[characterId], styles.color, styles.radius)}>
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