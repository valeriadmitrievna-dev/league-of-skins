import { BugIcon, LightbulbIcon, StarIcon } from "lucide-react";
import type { FC } from "react";

import { Typography } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import DonateBoostyIcon from "@/shared/assets/donate-boosty.svg?react";
import DonateCryptoIcon from "@/shared/assets/donate-crypto.svg?react";
import DonateSbpIcon from "@/shared/assets/donate-sbp.svg?react";

const donate = [
  {
    icon: DonateBoostyIcon,
    title: "Way to Donate",
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    link: "",
  },
  {
    icon: DonateSbpIcon,
    title: "Way to Donate",
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    link: "",
  },
  {
    icon: DonateCryptoIcon,
    title: "Way to Donate",
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    link: "",
  },
];

const help = [
  {
    icon: StarIcon,
    title: "Распространяйте информацию",
    text: "Расскажите о League of Skins своим друзьям и в социальных сетях",
  },
  { icon: LightbulbIcon, title: "Предлагайте идеи", text: "Делитесь своими идеями по улучшению функционала проекта" },
  { icon: BugIcon, title: "Сообщайте об ошибках", text: "Помогите улучшить проект, сообщая о найденных проблемах" },
];

const AboutSupport: FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 items-center text-center py-4">
        <Typography.H4 className="text-primary">Поддержать проект</Typography.H4>
        <Typography.P className="max-w-xl">
          League of Skins создается и поддерживается двумя разработчиками. Ваша поддержка поможет развивать проект и
          добавлять новые функции.
        </Typography.P>
      </div>

      <div className="grid grid-cols-3 gap-3 auto-rows-fr">
        {donate.map(({ icon: Icon, ...item }) => (
          <div key={item.title} className="border-2 border-primary/20 rounded-md p-5 flex flex-col">
            <Icon className="size-8 mb-3" />
            <Typography.Large className="font-medium text-primary mb-1">Way to Donate</Typography.Large>
            <Typography.P className="mb-5">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</Typography.P>
            <Button className="mt-auto">Donate</Button>
          </div>
        ))}
      </div>

      <div className="border-2 border-primary/20 rounded-md p-5 flex flex-col gap-4 bg-primary/10">
        <Typography.Large className="mb-1">Другие способы помочь</Typography.Large>

        {help.map(({ icon: Icon, ...item }) => (
          <Item key={item.title} size="xs">
            <ItemMedia variant="icon" className="border-none bg-primary/50">
              <Icon />
            </ItemMedia>
            <ItemContent className="gap-y-0">
              <ItemTitle className="text-primary">{item.title}</ItemTitle>
              <ItemDescription>{item.text}</ItemDescription>
            </ItemContent>
          </Item>
        ))}
      </div>

      <Typography.Small className="rounded-md p-5 bg-input/50 text-center">
        Спасибо за вашу поддержку! Каждый вклад помогает делать League of Skins лучше ❤️
      </Typography.Small>
    </div>
  );
};

export default AboutSupport;
