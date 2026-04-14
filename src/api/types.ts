export interface SkinsRequest {
  search?: string;
  championId?: string;
  skinlineId?: string;
  chromaId?: string;
  rarity?: string;
  legacy: string;
  owned: string;
  server: string;
  hasChroma?: "true" | "false";
}

export interface ChromasRequest {
  search?: string;
  championId?: string;
  owned: string;
  skin: string;
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
}

export interface UpdateOwnedSkinsRequest {
  addIds?: string[];
  removeIds?: string[];
}

export interface UpdateUserPasswordRequest {
  oldPassword: string;
  newPassword: string;
}
