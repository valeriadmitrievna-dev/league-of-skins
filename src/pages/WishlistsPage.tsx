import { HeartIcon } from "lucide-react";
import { type FC } from "react";

import CustomHead from "@/components/CustomMetaHead";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/shared/utils/cn";
import WishlistsSectionOwned from "@/widgets/Wishlist/WishlistsSectionOwned";
import WishlistsSectionSearch from '@/widgets/Wishlist/WishlistsSectionSearch';
import WishlistsSectionSubscribed from "@/widgets/Wishlist/WishlistsSectionSubscribed";

const WishlistsPage: FC = () => {
  const data = [
    { value: "my_wishlists", title: "Мои Вишлисты", content: WishlistsSectionOwned },
    { value: "subscriptions", icon: HeartIcon, title: "Подписки", content: WishlistsSectionSubscribed },
  ];

  return (
    <>
      <CustomHead>
        <title>League of Skins | Wishlists</title>
        <meta name="description" content="List of all your wishlists" />
      </CustomHead>

      <div>
        <Tabs defaultValue="my_wishlists" className="gap-0">
          <TabsList variant="default" className="w-full p-2 rounded-none bg-transparent border-b gap-x-1">
            {data.map(({ icon: Icon, ...item }) => (
              <TabsTrigger
                key={item.value}
                className={cn(
                  "p-3",
                  "data-[state=active]:text-primary!",
                  // "data-[state=active]:bg-card!",
                  "data-[state=active]:border-primary/50!",
                )}
                value={item.value}
              >
                {Icon && <Icon />}
                {item.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {data.map(({ content: Content, ...item }) => (
            <TabsContent key={item.value} value={item.value} className="p-4">
              <Content />
            </TabsContent>
          ))}
        </Tabs>
        <WishlistsSectionSearch />
      </div>
    </>
  );
};

export default WishlistsPage;
