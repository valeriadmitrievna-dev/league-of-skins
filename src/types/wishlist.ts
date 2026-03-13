import type { SkinDto } from "./skin";

export interface WishlistDto {
  _id: string;
  name: string;
  skins: SkinDto[];
  link?: string;

  createdAt: string;
  updatedAt: string;
}

export interface UpdateWishlistBody {
  name?: string;
  addIds?: string[];
  removeIds?: string[];
}
