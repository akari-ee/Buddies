import { cn } from '@/utils/extendClass';
import React from 'react';

const bg_colors = ['bg-bomi', 'bg-yermi', 'bg-gauri', 'bg-gyeouri'];

export default function ChatBox({
  styles,
  message,
  characterId,
  timestamp,
}: ChatBox) {
  return (
    <div className={cn('flex items-end mb-2 gap-2', styles.align, characterId === -1 ? 'flex-row-reverse': '')}>
      <div className='text-xs text-gray-600'>{timestamp}</div>
      <div
        className={cn(
          'flex max-w-[calc(45%)]',
          characterId === -1 ? styles.bg : bg_colors[characterId],
          styles.color,
          styles.radius
        )}
      >
        <div className='px-2 py-3 text-md'>
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
}
