import type { SkinlineDto } from './skinline';

export interface SkinDto {
  id: string;
  description: string;
  championId: string;
  championName: string;
  contentId: string;
  name: string;
  image: {
    centered: string | null;
    uncentered: string | null;
    loading: string | null;
  };
  video?: {
    centered: string | null;
    uncentered: string | null;
    card: string | null;
  };
  rarity: string;
  isLegacy: boolean;
  chromaPath: string | null;
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
}