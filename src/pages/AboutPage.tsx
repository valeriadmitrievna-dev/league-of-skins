import { CircleQuestionMarkIcon, HeartIcon, InfoIcon, MailIcon } from "lucide-react";
import type { FC } from "react";

import CustomHead from "@/components/CustomMetaHead";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/shared/utils/cn";
import AboutContact from "@/widgets/About/AboutContact";
import AboutFAQ from "@/widgets/About/AboutFAQ";
import AboutSummary from "@/widgets/About/AboutSummary";
import AboutSupport from "@/widgets/About/AboutSupport";

const data = [
  { value: "summary", icon: InfoIcon, title: "Summary", content: AboutSummary },
  { value: "faq", icon: CircleQuestionMarkIcon, title: "FAQ", content: AboutFAQ },
  { value: "contact", icon: MailIcon, title: "Contact", content: AboutContact },
  { value: "support", icon: HeartIcon, title: "Support project", content: AboutSupport, accent: true },
];

const AboutPage: FC = () => {
  return (
    <>
      <CustomHead>
        <title>League of Skins | About</title>
        <meta name="description" content="Tool for collecting LoL skins wishlists" />
      </CustomHead>

      <Tabs defaultValue="summary" className="w-full max-w-5xl mx-auto gap-0">
        <TabsList
          variant="line"
          className="w-full rounded-t-md! border border-b-transparent p-0 bg-transparent overflow-hidden"
        >
          {data.map(({ icon: Icon, ...item }) => (
            <TabsTrigger
              key={item.value}
              className={cn(
                "p-3 rounded-none relative",
                "data-[state=active]:text-primary! data-[state=active]:bg-card!",
                "border-b-2! data-[state=active]:border-b-primary!",
              )}
              value={item.value}
            >
              <Icon className={cn({ "text-destructive": item.accent })} />
              {item.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {data.map(({ content: Content, ...item }) => (
          <TabsContent key={item.value} value={item.value} className="rounded-md rounded-t-none border p-6 bg-card">
            <Content />
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
};

export default AboutPage;
