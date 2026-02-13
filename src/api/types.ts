import type { ODataRequest } from '@/shared/types';

export interface SkinsRequest extends ODataRequest {
  championId?: string;
  skinlineId?: string;
  colors?: string[];
  rarity?: string;
  isLegacy: boolean;
}