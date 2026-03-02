import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { FC } from "react";

const AboutPage: FC = () => {
  return (
    <Tabs defaultValue="main" className="gap-6 h-full" orientation='vertical'>
      <TabsList className='w-80 p-3 gap-y-1 h-full! justify-start'>
        <TabsTrigger className='py-2 px-4 h-fit! flex-none!' value="main">Описание проекта</TabsTrigger>
        <TabsTrigger className='py-2 px-4 h-fit! flex-none!' value="faq">FAQ</TabsTrigger>
        <TabsTrigger className='py-2 px-4 h-fit! flex-none!' value="contacts">Контакты</TabsTrigger>
        <TabsTrigger className='py-2 px-4 h-fit! flex-none!' value="support">Поддержать проект</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Make changes to your account here.</TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  );
};

export default AboutPage;
