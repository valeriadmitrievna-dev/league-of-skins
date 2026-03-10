import { type FC } from "react";
import logo from '@/shared/assets/logo.png';
import Image from './Image';

const AppLogo: FC = () => {
  return (
    <div className='flex items-center gap-2'>
      <Image src={logo} className='size-6 md:size-10 lg:size-12' />
      <div className='flex flex-col gap-1'>
        <span className='text-lg md:text-xl lg:text-2xl font-bold leading-none'>League of Skins</span>
        <span className='text-[8px] lg:text-[10px] leading-none uppercase opacity-75'>League of Legends Skins Wishlists</span>
      </div>
    </div>
  );
};

export default AppLogo;
