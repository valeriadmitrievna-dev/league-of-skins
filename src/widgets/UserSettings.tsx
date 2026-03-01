import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { setAppAuth } from '@/store';
import { SettingsIcon } from 'lucide-react';
import { useState, type FC } from "react";
import { useDispatch } from 'react-redux';

const UserSettings: FC = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem('access-token');
    dispatch(setAppAuth(false));
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <SettingsIcon />
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={true}>
        <Button variant="destructive" onClick={logoutHandler}>Logout</Button>
      </DialogContent>
    </Dialog>
  );
};

export default UserSettings;
