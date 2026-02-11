export interface ChromaDto {
  name: string;
  skinName: string;
  colors: string[];
  isUnique: boolean;
}

export interface SkinlineDto {
  id: number;
  name: string;
  description: string;
}

export interface ChampionDto {
  id: string;
  key: string;
  name: string;
  image: {
    full: string | null;
    loading: string | null;
    icon: string | null;
  };
}

export interface SkinDto {
  id: number;
  name: string;
  contentId: string;
  championId: string;
  championName: string;
  chromaPath: string | null;
  rarity: string;
  skinlines: SkinlineDto[];
  image: {
    full: string;
    loading: string;
  };
  chromas: {
    id: number;
    name: string;
    path: string;
    contentId: string;
    colors: string[];
  }[];
}
