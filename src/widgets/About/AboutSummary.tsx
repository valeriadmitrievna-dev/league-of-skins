import type { FC } from "react";

import { Typography } from "@/components/Typography";
import EmojiBarChartIcon from "@/shared/assets/emoji-barchart.svg?react";
import EmojiGamepadIcon from "@/shared/assets/emoji-gamepad.svg?react";
import EmojiHeartIcon from "@/shared/assets/emoji-heart.svg?react";
import EmojiSearchIcon from "@/shared/assets/emoji-search.svg?react";

const data = [
  {
    icon: EmojiSearchIcon,
    title: "Поиск образов",
    text: "Ищите скины по названию, чемпиону, редкости или линейке. Удобная система фильтров поможет найти именно то, что вы ищете.",
  },
  {
    icon: EmojiBarChartIcon,
    title: "Статистика коллекции",
    text: "Отслеживайте прогресс вашей коллекции с подробной статистикой по редкости, чемпионам и потраченным RP.",
  },
  {
    icon: EmojiHeartIcon,
    title: "Вишлисты",
    text: "Создавайте списки желаемых скинов, делитесь ими с друзьями и планируйте будущие покупки.",
  },
  {
    icon: EmojiGamepadIcon,
    title: "Актуальная база данных",
    text: "База данных регулярно обновляется с учетом новых патчей и выпусков скинов от Riot Games.",
  },
];

const AboutSummary: FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 pb-3">
        <Typography.H4 className="text-primary">Что такое League of Skins?</Typography.H4>
        <Typography.P>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa dicta exercitationem, pariatur soluta quasi sequi
          neque laborum tempore alias ullam.
        </Typography.P>
      </div>

      <div className="grid md:grid-cols-2 gap-5 auto-rows-fr">
        {data.map(({ icon: Icon, ...item }) => (
          <div key={item.title} className="border-2 border-primary/20 rounded-md p-5 flex flex-col gap-2">
            <Icon className="size-8" />
            <Typography.Large className="text-primary">{item.title}</Typography.Large>
            <Typography.P>{item.text}</Typography.P>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutSummary;
