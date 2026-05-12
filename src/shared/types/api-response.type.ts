export type ApiError = {
  statusCode?: number;
  code?: string;
  message?: string;
  error?: string;
  errors?: Record<string, string[] | string>;
};

export type ApiResponse<TData> = {
  data?: TData;
  message?: string;
};

export type ApiEnvelope<TData> = {
  data?: ApiResponse<TData> | TData;
  message?: string;
};
