export type Theme = "dark" | "light" | "system";

export interface ODataResponse<T> {
  count: number;
  data: T;
}

export interface ODataRequest {
  search?: string;
  page?: number;
  size?: number;
}
