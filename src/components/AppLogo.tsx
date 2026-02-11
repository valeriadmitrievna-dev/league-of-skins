import { type FC } from "react";
import { CatIcon } from 'lucide-react';

const AppLogo: FC = () => {
  return (
    <div className='flex items-center gap-1'>
      <CatIcon size={44} />
      <div className='flex flex-col gap-1'>
        <span className='text-xl font-bold leading-none'>League of Skins</span>
        <span className='text-[10px] leading-none uppercase'>League of Legends Skins Wishlists</span>
      </div>
    </div>
  );
};

export default AppLogo;
