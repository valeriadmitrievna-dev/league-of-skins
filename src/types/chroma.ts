export interface ChromaDto {
  id: string;
  contentId: string;
  name: string;
  colors: string[];
  championId: string;
  skinContentId: string;
  skinName: string;
  path: string;
  fullName: string;

  owned?: boolean;
}