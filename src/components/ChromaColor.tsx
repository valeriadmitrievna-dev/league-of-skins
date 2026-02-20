import { cn } from '@/lib/utils';
import type { FC } from 'react';

interface ChromaColorProps {
  colors: string[];
  className?: string;
}

const ChromaColor: FC<ChromaColorProps> = ({ colors, className }) => {
  return (
    <div className={cn('size-5 rotate-45 rounded-full overflow-hidden flex gap-px bg-background border', className)}>
      <div className='size-full' style={{ background: colors[0] }} />
      {colors.length > 1 && <div className='size-full' style={{ background: colors[1] }} />}
    </div>
  )
}

export default ChromaColor;
