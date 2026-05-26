import type { User, UserBaseResponse } from "@/entities/user/types/user.type";
import { ENDPOINTS } from "@/shared/api/endpoints";
import { httpClient } from "@/shared/api/httpClient";
import type { ApiResponse, TokenInfo } from "@/shared/api/types";
import type { LoginRequest, LoginResponse } from "../login";
import type { RefreshTokenResponse } from "../login/types/login-response.type";
import type { RegisterRequest } from "../register";

export const authApi = {
  login: (data: LoginRequest) => httpClient.post<LoginResponse>(ENDPOINTS.AUTH.login, data),
  register: (data: RegisterRequest) =>
    httpClient.post<ApiResponse<UserBaseResponse>>(ENDPOINTS.AUTH.register, data),
  logout: () => httpClient.post<ApiResponse>(ENDPOINTS.AUTH.logout),
  refresh: () =>
    httpClient.post<ApiResponse<RefreshTokenResponse, TokenInfo>>(ENDPOINTS.AUTH.refresh),
  getMe: () => httpClient.get<ApiResponse<User>>(ENDPOINTS.USERS.me),
};
