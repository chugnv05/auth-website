import { ENDPOINTS } from "@/shared/api/endpoints";
import { httpClient } from "@/shared/api/httpClient";
import type { ApiResponse } from "@/shared/api/types";
import type { LoginRequest, LoginResponse } from "../login";
import type { RefreshTokenResponse } from "../login/types/login-response.type";

export const authApi = {
  login: (data: LoginRequest) => httpClient.post<LoginResponse>(ENDPOINTS.AUTH.login, data),
  logout: () => httpClient.post<ApiResponse>(ENDPOINTS.AUTH.logout),
  refresh: () => httpClient.post<ApiResponse<RefreshTokenResponse>>(ENDPOINTS.AUTH.refresh),
};
