import { type FC } from "react";

const AppLogo: FC = () => {
  return (
    <div className="flex items-center gap-3 md:gap-4 relative">
      {/* <Image src={logo} className='size-10 md:size-11' /> */}
      {/* <div className='flex flex-col gap-y-0.5'> */}
      <span className="text-lg leading-none md:text-xl font-black uppercase tracking-wider text-primary">
        League of Skins
      </span>
      <div className="absolute -inset-1 bg-primary/20 blur-xl"></div>
      {/* <span className='text-[8px] leading-none md:text-xs text-muted-foreground uppercase tracking-widest'>League of Legends Skins Wishlists</span> */}
      {/* </div> */}
    </div>
  );
};

export default AppLogo;
