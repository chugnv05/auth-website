export interface TokenInfo {
  accessToken: string;
  accessTokenTTL: number;
}

export interface Pagination {
  total: number;
  count: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
}

export interface ApiMeta<TTokenInfo = null> {
  tokenInfo?: TTokenInfo;
  pagination?: Pagination;
}

export interface ApiResponse<TData = null, TTokenInfo = null> {
  code: number;
  message?: string;
  data?: TData;
  meta?: ApiMeta<TTokenInfo>;
}
