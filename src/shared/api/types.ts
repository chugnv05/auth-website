export type TokenInfo = {
  accessToken: string;
  accessTokenTTL: number;
};

export type Pagination = {
  page: number;
  size: number;
  total: number;
  totalPages: number;
};

export type ApiMeta<TTokenInfo = null> = {
  tokenInfo?: TTokenInfo;
  pagination?: Pagination;
};

export type ApiResponse<TData = null, TTokenInfo = null> = {
  code: number;
  message?: string;
  data?: TData;
  meta?: ApiMeta<TTokenInfo>;
};
