import { BoltIcon, HeartIcon, InfoIcon, SearchIcon, SparklesIcon } from 'lucide-react';
import type { FC } from "react";

import { Button } from '@/components/ui/button';

const AppMenu: FC = () => {
  return <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background border-t z-5 flex items-center justify-evenly">
    <Button variant="ghost" size="icon-lg">
      <SearchIcon className='size-6' />
    </Button>
    <Button variant="ghost" size="icon-lg">
      <InfoIcon className='size-6' />
    </Button>
    <Button variant="ghost" size="icon-lg">
      <SparklesIcon className='size-6' />
    </Button>
    <Button variant="ghost" size="icon-lg">
      <HeartIcon className='size-6' />
    </Button>
    <Button variant="ghost" size="icon-lg">
      <BoltIcon className='size-6' />
    </Button>
  </div>;
};

export default AppMenu;
