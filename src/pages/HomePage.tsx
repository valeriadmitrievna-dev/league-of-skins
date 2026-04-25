import { Box, Heart, Search } from "lucide-react";
import { type FC } from "react";
import { NavLink } from "react-router";

import AppLogo from "@/components/AppLogo";
import CustomHead from "@/components/CustomMetaHead";
import Skeleton from "@/components/Skeleton";
import { Typography } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import CatalogSection from "@/widgets/Home/CatalogSection";
import HeroSection from "@/widgets/Home/HeroSection";
import SubTitle from "@/widgets/Home/SubTitle";

const HomePage: FC = () => {
  const functionalityList = [
    {
      title: "Поиск и фильтры",
      description: "По чемпиону, редкости, линейке образов или цветовой схеме. Найти конкретный скин — секунды.",
      icon: <Search />,
    },
    {
      title: "Вишлисты",
      description: "Собирай образы в списки и делись ими с друзьями. Удобно перед днём рождения или просто чтобы не забыть.",
      icon: <Heart />,
    },
    {
      title: "Коллекция",
      description: "Загрузи инвентарь и отслеживай что уже куплено, сколько потрачено RP и что ещё хочется.",
      icon: <Box />,
    },
  ];

  return (
    <>
      <CustomHead>
        <title>League of Skins</title>
        <meta name="description" content="Tool for collecting LoL skins wishlists" />
      </CustomHead>

      <HeroSection />

      <div className="h-px bg-primary my-15 md:my-20" />

      <section>{/* benefits */}</section>

      <CatalogSection />

      <div className="h-px bg-primary my-15 md:my-20" />

      <section>
        <SubTitle>Возможности</SubTitle>
        <Typography.H2 className="text-center mt-2">Всё что нужно</Typography.H2>
        <Typography.Muted className="text-center mt-4 max-w-100 mx-auto">
          Никаких лишних функций — только то, что реально используешь
        </Typography.Muted>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          {functionalityList.map((i) => (
            <div className="my-card" key={i.title}>
              <div className="flex items-center justify-center gap-2">
                {i.icon}
                <Typography.Large>{i.title}</Typography.Large>
              </div>
              <Typography.Muted className="mt-2 text-center">{i.description}</Typography.Muted>
            </div>
          ))}
        </div>
      </section>

      <div className="h-px bg-primary my-15 md:my-20" />

      <section className="flex flex-col md:flex-row items-center justify-between gap-10">
        <div>
          <SubTitle className="text-start">Вишлисты</SubTitle>
          <Typography.H2 className="mt-2">Поделись — и друзья поймут намёк</Typography.H2>
          <Typography.Muted className="mt-4 max-w-100">
            Создай список желаемых скинов и отправь ссылку. Публичный или приватный — как хочешь.
          </Typography.Muted>
          <Button className="mt-6">Создать Вишлист</Button>
        </div>

        <Skeleton className="md:w-[50%] h-80" />
      </section>

      <div className="h-px bg-primary my-15 md:my-20" />

      <section>
        <SubTitle>Готово?</SubTitle>
        <Typography.H2 className="text-center mt-2">Начни прямо сейчас</Typography.H2>
        <Typography.Muted className="text-center mt-4 max-w-100 mx-auto">
          Регистрация не нужна — просто открой каталог и смотри скины.
        </Typography.Muted>
        <Button className="block mt-6 mx-auto">Открыть Страницу Скинов</Button>
      </section>

      <footer className="mt-20 border-t border-gray-700/20 flex flex-col md:flex-row gap-3 items-center justify-between py-8">
        <NavLink to="/">
          <AppLogo />
        </NavLink>

        <Typography.Muted>Не аффилирован с Riot Games</Typography.Muted>
      </footer>
    </>
  );
};

export default HomePage;
