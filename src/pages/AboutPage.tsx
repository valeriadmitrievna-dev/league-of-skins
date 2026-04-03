import { HeartIcon } from "lucide-react";
import type { FC } from "react";

import CustomHead from "@/components/CustomMetaHead";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/shared/utils/cn";
import AboutContact from "@/widgets/About/AboutContact";
import AboutFAQ from "@/widgets/About/AboutFAQ";
import AboutSummary from "@/widgets/About/AboutSummary";
import AboutSupport from "@/widgets/About/AboutSupport";

const data = [
  { value: "summary", title: "Summary", content: AboutSummary },
  { value: "faq", title: "FAQ", content: AboutFAQ },
  { value: "contact", title: "Contact", content: AboutContact },
  { value: "support", icon: HeartIcon, title: "Support project", content: AboutSupport, accent: true },
];

const AboutPage: FC = () => {
  return (
    <>
      <CustomHead>
        <title>League of Skins | About</title>
        <meta name="description" content="Tool for collecting LoL skins wishlists" />
      </CustomHead>

      <Tabs defaultValue="summary" className="w-full max-w-5xl mx-auto gap-y-6">
        <TabsList className="w-full">
          {data.map(({ icon: Icon, ...item }) => (
            <TabsTrigger
              key={item.value}
              className={cn(
                "p-2 px-4",
                "data-[state=active]:text-primary! data-[state=active]:bg-card!",
                "data-[state=active]:border-primary/50!",
              )}
              value={item.value}
            >
              {Icon && <Icon className={cn({ "text-destructive": item.accent })} />}
              {item.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {data.map(({ content: Content, ...item }) => (
          <TabsContent key={item.value} value={item.value}>
            <Content />
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
};

export default AboutPage;
