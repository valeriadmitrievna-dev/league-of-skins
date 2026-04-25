import type { FC } from "react";

import { Typography } from "@/components/Typography";
import { Button } from "@/components/ui/button";

import SubTitle from "./SubTitle";

const HeroSection: FC = () => {
  return (
    <section className="mt-20">
      <SubTitle>Для игроков League of Legends</SubTitle>
      <Typography.H1 className="text-4xl md:text-5xl text-center mt-4">
        <span className="block">Все скины.</span>
        <span className="block text-primary">Один вишлист.</span>
      </Typography.H1>
      <Typography.Muted className="text-center mt-6 max-w-100 mx-auto">
        Просматривай образы, отмечай любимые и делись списком с друзьями — пусть знают, что тебе подарить.
      </Typography.Muted>

      <Button className="block mt-7 mx-auto">Открыть Страницу Скинов</Button>
    </section>
  );
};

export default HeroSection;
