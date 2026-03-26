import { MailIcon, MessageCircleIcon } from "lucide-react";
import type { FC } from "react";

import { Typography } from "@/components/Typography";
import SocialTelegramIcon from "@/shared/assets/social-telegram.svg?react";
// import SocialXIcon from '@/shared/assets/social-x.svg?react'

const AboutContact: FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <Typography.H4>Связаться со мной</Typography.H4>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="border-2 border-primary/20 rounded-md p-5 flex flex-col gap-4">
          <Typography.Large className="flex items-center gap-3">
            <MailIcon className="p-1.5 size-8 rounded-sm bg-primary/20" />
            <span>Email</span>
          </Typography.Large>

          <div className="flex flex-col gap-1">
            <p className="text-muted-foreground">По общим вопросам:</p>
            <p className="text-primary">comingsoon@leagueofskins.com</p>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-muted-foreground">Техническая поддержка:</p>
            <p className="text-primary">comingsoon@leagueofskins.com</p>
          </div>
        </div>
        <div className="border-2 border-primary/20 rounded-md p-5 flex flex-col gap-4">
          <Typography.Large className="flex items-center gap-3">
            <MessageCircleIcon className="p-1.5 size-8 rounded-sm bg-primary/20" />
            <span>Социальные сети</span>
          </Typography.Large>

          <a href="https://t.me/+nBzwgyuff9pkMjUy" target="_blank" className="group flex items-center gap-3 pl-1 w-fit">
            <SocialTelegramIcon className="size-6" />
            <span className="font-medium text-primary group-hover:underline">Telegram</span>
          </a>

          {/* <div className='flex items-center gap-3 pl-1'>
            <SocialXIcon className="size-6" />
            <p className='font-medium text-primary'>Twitter / X</p>
          </div> */}
        </div>
      </div>
      <div className="border-2 border-primary/20 rounded-md p-5 flex flex-col gap-2 bg-primary/10">
        <Typography.Large className="text-primary">Предложения и отзывы</Typography.Large>
        <Typography.P>
          Мы всегда рады услышать ваше мнение! Если у вас есть идеи по улучшению проекта или вы хотите сообщить об ошибке,
          пожалуйста, свяжитесь с нами по любому из указанных каналов связи.
        </Typography.P>
      </div>
    </div>
  );
};

export default AboutContact;
