import type { CDragonAsset } from './shared';
import type { SkinlineDto } from './skinline';

export interface SkinDto {
  id: string;
  description: string;
  championId: string;
  championName: string;
  contentId: string;
  name: string;
  originName?: string;
  pbe: boolean;
  owned?: boolean;
  release?: number;
  price?: number;
  sale?: {
    price: number;
    discount: number;
    startDate: string;
    endDate: string;
  };
  image: {
    centered: CDragonAsset;
    uncentered: CDragonAsset;
    loading: CDragonAsset;
  };
  video?: {
    centered: CDragonAsset;
    uncentered: CDragonAsset;
    card: CDragonAsset;
  };
  rarity: string;
  isLegacy: boolean;
  chromaPath: CDragonAsset;
  skinlines: SkinlineDto[];
  chromas: {
    id: string;
    name: string;
    path: string;
    contentId: string;
    colors: string[];
  }[];
  features?: {
    description: string;
    iconPath: string;
    videoPath: string;
  }[];
  questSkinInfo?: {
    name: string;
    splashPath: CDragonAsset;
    uncenteredSplashPath: CDragonAsset;
    collectionCardPath: CDragonAsset;
    tiers: {
      name: string;
      stage: number;
      splashPath: CDragonAsset;
      uncenteredSplashPath: CDragonAsset;
      loadScreenPath: CDragonAsset;
      splashVideoPath: CDragonAsset;
      previewVideoUrl: CDragonAsset;
      collectionSplashVideoPath: CDragonAsset;
      collectionCardHoverVideoPath: CDragonAsset;
    }[];
  };
}