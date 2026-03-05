import { useGetChromasQuery, useGetOwnedSkinsQuery } from "@/api";
import Search from "@/components/Search";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { useQueryParams } from "@/hooks/useQueryParams";
import { BREAKPOINTS } from "@/shared/constants/styles";
import { getODataWithDefault } from "@/shared/utils/getODataWithDefault";
import type { SkinDto } from "@/types/skin";
import SkinCard from "@/widgets/SkinCard";
import CollectionSkinsStatistics from "@/widgets/CollectionSkinsStatistics";
import VirtualizedGrid from "@/widgets/VirtualizedGrid";
import { useCallback, useEffect, useMemo, useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import { useDebounce } from "react-use";
import { getColorsString } from "@/shared/utils/getColorsString";
import UploadInventory from '@/widgets/UploadInventory';
import { Typography } from '@/components/Typography';
import ScrollTop from '@/components/ScrollTop';

const CollectionSkinsPage: FC = () => {
  const { t, i18n } = useTranslation();

  const [searchInput, setSearchInput] = useState("");

  const { get, update } = useQueryParams();
  useDebounce(() => update("search", searchInput), 300, [searchInput]);

  const search = get("search");
  const chromaId = get("chromaId");

  const { data: chromasData } = useGetChromasQuery({ lang: i18n.language });
  const { data: chromas } = getODataWithDefault(chromasData);

  const chroma = useMemo(() => {
    return chromas.find((chroma) => chroma.id === chromaId);
  }, [chromaId, chromas]);

  const skinsQueryParams = useMemo(
    () => ({
      lang: i18n.language,
      search: search || undefined,
      championId: get("championId") || undefined,
      skinlineId: get("skinlineId") || undefined,
      rarity: get("rarity") || undefined,
      chromaName: chroma?.name,
      chromaColors: getColorsString(chroma?.colors),
      legacy: get("legacy") || "all",
    }),
    [i18n.language, search, chroma, get],
  );

  const { data, isLoading, isFetching } = useGetOwnedSkinsQuery(skinsQueryParams);
  const { data: ownedSkins } = getODataWithDefault(data);

  const renderSkin = useCallback((item: unknown) => {
    const skin = item as SkinDto;
    return <SkinCard key={skin.id} data={skin} navigatable addToWishlistButton toggleOwnedButton />;
  }, []);

  useEffect(() => {
    if (search !== searchInput) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSearchInput(search ?? "");
    }
  }, [search]);

  if (!isLoading && !ownedSkins.length) {
    return (
      <Empty className="w-full h-full max-h-120">
        <EmptyHeader>
          <EmptyTitle>{t("empty.collection-skins__title")}</EmptyTitle>
          <EmptyDescription>{t("empty.collection-skins__desc")}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent className='gap-y-1'>
          <Button size="sm" asChild>
            <NavLink to="/search/skins">{t("empty.goto__search-skins")}</NavLink>
          </Button>
          <Typography.Muted>{t('shared.or')}</Typography.Muted>
          <UploadInventory />
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <div className="w-full grid grid-cols-[320px_1fr] gap-5">
      <CollectionSkinsStatistics />
      <div>
        <div className="mb-1 flex items-center justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>{t("header.collection")}</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage>{t("header.skins")}</BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>

          <UploadInventory />
        </div>
        <Search className="mb-4" value={searchInput} onSearch={setSearchInput} />

        <VirtualizedGrid
          items={ownedSkins}
          loading={isLoading}
          fetching={isFetching}
          gridClassName="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          overscan={2}
          responsiveColumns={[
            { minWidth: BREAKPOINTS.xl, columns: 5 },
            { minWidth: BREAKPOINTS.lg, columns: 4 },
            { minWidth: BREAKPOINTS.md, columns: 3 },
            { minWidth: 0, columns: 2 },
          ]}
          render={renderSkin}
        />

        <ScrollTop />
      </div>
    </div>
  );
};

export default CollectionSkinsPage;
