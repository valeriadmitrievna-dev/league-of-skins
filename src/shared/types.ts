export type Theme = "dark" | "light" | "system";

export type WithLanguage<T> = T & {
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
