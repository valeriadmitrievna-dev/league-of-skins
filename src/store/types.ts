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
