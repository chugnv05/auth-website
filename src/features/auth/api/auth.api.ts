import { ENDPOINTS } from "@/shared/api/endpoints";
import { httpClient } from "@/shared/api/httpClient";
import type { ApiResponse } from "@/shared/api/types";
import type { LoginRequest, LoginResponse } from "../login";

export const authApi = {
  login: (data: LoginRequest) => httpClient.post<LoginResponse>(ENDPOINTS.AUTH.login, data),
  logout: () => httpClient.post<ApiResponse>(ENDPOINTS.AUTH.logout),
  refresh: () => httpClient.post<LoginResponse>(ENDPOINTS.AUTH.refresh),
};
