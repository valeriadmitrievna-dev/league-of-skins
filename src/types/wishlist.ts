import type { SkinDto } from "./skin";

export interface WishlistFullDto {
  _id: string;
  name: string;
  skins: SkinDto[];
  price: number;
  link: string;
  views: number;
  private: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface WishlistDto {
  _id: string;
  name: string;
  skins: string[];
  link: string;
  private: boolean;
  preview?: (string | null)[];

  createdAt: string;
  updatedAt: string;
}

export interface UpdateWishlistBody {
  name?: string;
  addIds?: string[];
  removeIds?: string[];
  private?: boolean;
}
