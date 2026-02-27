import type { ODataRequest } from "@/types/shared";

export interface SkinsRequest extends ODataRequest {
  championId?: string;
  skinlineId?: string;
  chromaName?: string;
  chromaColors?: string;
  rarity?: string;
  legacy: string;
  owned: string
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

export interface UpdateOwnedSkinsRequest {
  addIds?: string[];
  removeIds?: string[];
}
