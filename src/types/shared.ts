export type Theme = "dark" | "light" | "system";

export type WithLanguage<T = Record<string, string>> = T & {
  lang: string;
};

export interface ODataResponse<T> {
  count: number;
  data: T;
}

export interface ODataRequest {
  search?: string;
  page?: number;
  size?: number;
}

export interface ApiErrorPayload {
  data: ApiErrorResponse;
  status?: number;
}

export interface ApiErrorResponse {
  message: string;
}
