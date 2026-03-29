import type { WishlistDto } from "./wishlist";

export interface UserDto {
  _id: string;
  name: string;
  email: string;
  ownedSkins: string[];
  subscriptions: string[];
  wishlists: WishlistDto["_id"][];

  createdAt: string;
  updatedAt: string;
}

export interface UserSkinsStatisticDto {
  totals: {
    skins: number;
    champions: number;
    skinlines: number;
  };
  user: {
    skins: number;
    champions: number;
    skinlines: number;
    legacy: number;
    value: number;
  };
  distribution: {
    byChampion: { id: string; key: string; name: string; count: number }[];
    bySkinline: { id: string; name: string; count: number }[];
    byChroma: { id: string; name: string; colors: string[] }[];
    byRarity: { value: string; count: number }[];
  };
  top: {
    champions: { [place: string]: { id: string; key: string; name: string; count: number }[] };
    skinlines: { [place: string]: { id: string; name: string; count: number }[] };
  };
}
