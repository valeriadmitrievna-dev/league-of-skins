export interface IUser {
  _id: string;
  name: string;
  email: string;
  ownedSkins: string[];
}

export interface IUserSkinsStatistic {
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
