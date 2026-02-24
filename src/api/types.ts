import type { ODataRequest } from '@/types/shared';

export interface SkinsRequest extends ODataRequest {
  championId?: string;
  skinlineId?: string;
  colors?: string[];
  rarity?: string;
  isLegacy: boolean;
}

export interface RegistrationRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
}