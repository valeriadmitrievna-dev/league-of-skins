import type { FC } from "react";

import { Typography } from "@/components/Typography";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SocialTelegramIcon from "@/shared/assets/social-telegram.svg?react";

const AboutContact: FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <Typography.H4 className='mb-2'>Связаться со мной</Typography.H4>
      <div className="grid gap-5 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="mb-2">Email</CardTitle>
            <CardDescription>
              <p className="text-muted-foreground">По общим вопросам:</p>
              <p className="text-primary">comingsoon@leagueofskins.com</p>
            </CardDescription>
            <CardDescription>
              <p className="text-muted-foreground">Техническая поддержка:</p>
              <p className="text-primary">comingsoon@leagueofskins.com</p>
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="mb-2">Социальные сети</CardTitle>
            <CardDescription>
              <a href="https://t.me/+nBzwgyuff9pkMjUy" target="_blank" className="group flex items-center gap-2 pl-1 w-fit">
                <SocialTelegramIcon className="size-5" />
                <span className="font-medium text-primary group-hover:underline">Telegram</span>
              </a>
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
      <Card className="bg-primary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="mb-1 not-dark:text-primary">Предложения и отзывы</CardTitle>
          <CardDescription>
            Мы всегда рады услышать ваше мнение! Если у вас есть идеи по улучшению проекта или вы хотите сообщить об ошибке,
            пожалуйста, свяжитесь с нами по любому из указанных каналов связи.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};

export default AboutContact;
