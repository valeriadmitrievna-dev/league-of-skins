import { type FC } from "react";

import logo from '@/shared/assets/logo.png';

import Image from './Image';

const AppLogo: FC = () => {
  return (
    <div className='flex items-center gap-3 md:gap-4'>
      <Image src={logo} className='size-10 md:size-12' />
      <div className='flex flex-col gap-y-0.5'>
        <span className='text-lg leading-none md:text-2xl font-black uppercase tracking-wider text-primary text-glow-gold'>League of Skins</span>
        <span className='text-[8px] leading-none md:text-xs text-muted-foreground uppercase tracking-widest'>League of Legends Skins Wishlists</span>
      </div>
    </div>
  );
};

export default AppLogo;
