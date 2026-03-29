import type { SkinDto } from "./skin";

export interface WishlistFullDto {
  _id: string;
  name: string;
  skins: SkinDto[];
  price: number;
  link: string;
  views: number;
  subscribers: number;
  private: boolean;

  userId: string;

  createdAt: string;
  updatedAt: string;
}

export interface WishlistDto {
  _id: string;
  name: string;
  skins: string[];
  link: string;
  views: number;
  subscribers: number;
  private: boolean;
  preview?: (string | null)[];

  userId: string | { _id: string; name: string };

  createdAt: string;
  updatedAt: string;
}

export interface UpdateWishlistBody {
  name?: string;
  addIds?: string[];
  removeIds?: string[];
  private?: boolean;
}
