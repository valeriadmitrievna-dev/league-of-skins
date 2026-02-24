import { Button } from '@/components/ui/button';
import { setAppAuth } from '@/store';
import type { FC } from "react";
import { useDispatch } from 'react-redux';

const Settings: FC = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(setAppAuth(false));
    localStorage.removeItem('access-token');
  }

  return (
    <div className="border rounded-md px-4 py-3 h-fit flex flex-col gap-y-3">
      <p className='text-lg font-semibold'>Settings</p>
      <Button variant='destructive' onClick={logoutHandler} className='w-fit'>Logout</Button>
    </div>
  );
};

export default Settings;
