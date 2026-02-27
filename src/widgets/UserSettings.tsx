import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { SettingsIcon } from 'lucide-react';
import { useState, type FC } from "react";

const UserSettings: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <SettingsIcon />
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={true}>
        settings
      </DialogContent>
    </Dialog>
  );
};

export default UserSettings;
