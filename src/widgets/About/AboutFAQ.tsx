import type { FC } from "react";

import { Typography } from '@/components/Typography';
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";

const AboutFAQ: FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <Typography.H4>Часто задаваемые вопросы</Typography.H4>
      {Array.from({ length: 6 }, (i: number) => (
        <Item key={i} variant="outline" className="bg-background border-2 border-primary/20">
          <ItemContent>
            <ItemTitle className="text-lg text-primary line-clamp-none">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, nam!
            </ItemTitle>
            <ItemDescription className="line-clamp-none">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum, sequi, cupiditate dignissimos maxime est
              similique consequuntur quae minima itaque amet perferendis repudiandae vitae deleniti atque ea quasi impedit
              reiciendis alias tempora accusantium recusandae inventore quaerat nemo consectetur. Dolor ipsa eius in at nobis
              neque nihil adipisci consequuntur, ea libero aliquam.
            </ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </div>
  );
};

export default AboutFAQ;
