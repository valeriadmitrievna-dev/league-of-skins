import { type FC } from "react";

import { useTranslation } from "react-i18next";
import { useSearchPage } from "../model";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NavLink } from "react-router";

const SearchPageResults: FC = () => {
  const { t } = useTranslation();
  const { skins } = useSearchPage();

  return (
    <div className="grid grid-cols-3 gap-3 xl:grid-cols-4 2xl:grid-cols-5">
      {skins.map((skin) => (
        <NavLink key={skin.contentId} to={`/${skin.id}`}>
          <Card className="relative mx-auto w-full p-0 overflow-hidden gap-y-4">
            <img src={skin.image.loading ?? ""} alt={skin.name} className="relative aspect-11/20 w-full object-cover" />
            <Badge variant="secondary" className="absolute top-2 end-2">
              {t(`rarity.${skin.rarity}`)}
            </Badge>
            <CardContent
              className="
                absolute size-full p-4
                bg-linear-to-t from-neutral-950 to-transparent
                flex items-end
                opacity-0 hover:opacity-100 transition-opacity
              "
            >
              <span className="text-neutral-50">{skin.name}</span>
            </CardContent>
            {/* <CardHeader className="px-4">
                <CardTitle>{skin.name}</CardTitle>
              </CardHeader> */}
            {/* <CardFooter className="px-4 mt-auto">
                <Button className="w-full cursor-pointer">Add to wishlist</Button>
              </CardFooter> */}
          </Card>
        </NavLink>
      ))}
    </div>
  );
};

export default SearchPageResults;
