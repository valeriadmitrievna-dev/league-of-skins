import type { FC } from "react";

import { Typography } from "@/components/Typography";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AboutFAQ: FC = () => {
  return (
    <div className="flex flex-col gap-5">
      <Typography.H4 className="mb-1">Часто задаваемые вопросы</Typography.H4>
      {Array.from({ length: 6 }, (_, i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle className='not-dark:text-primary'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, nam!</CardTitle>
            <CardDescription>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum, sequi, cupiditate dignissimos maxime est
              similique consequuntur quae minima itaque amet perferendis repudiandae vitae deleniti atque ea quasi impedit
              reiciendis alias tempora accusantium recusandae inventore quaerat nemo consectetur. Dolor ipsa eius in at
              nobis neque nihil adipisci consequuntur, ea libero aliquam.
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default AboutFAQ;
