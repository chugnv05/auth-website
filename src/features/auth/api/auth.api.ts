import type { UserBaseResponse } from "@/entities/user/types";

import { ENDPOINTS } from "@/shared/api/endpoints";
import { httpClient } from "@/shared/api/httpClient";
import type { ApiResponse, TokenInfo } from "@/shared/api/types";
import type { ChangePasswordRequest } from "../change-password/types/change-password-request.type";
import type { ForgotPasswordRequest } from "../forgot-password/types/forgot-password-request.type";
import type { OptRequest } from "../forgot-password/types/otp-request.type";
import type { ResetPasswordRequest } from "../forgot-password/types/reset-password-request.type";
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

  changePassword: (data: ChangePasswordRequest) =>
    httpClient.post<ApiResponse<String>>(ENDPOINTS.AUTH.changePassword, data),

  forgotPassword: (data: ForgotPasswordRequest) =>
    httpClient.post<ApiResponse<string>>(ENDPOINTS.AUTH.forgotPassword, data),

  verifyOtp: (email: string, data: OptRequest) =>
    httpClient.post<ApiResponse<string>>(ENDPOINTS.OTP.verify, { email, data }),

  resetPassword: (email: string, data: ResetPasswordRequest) =>
    httpClient.post<ApiResponse<string>>(ENDPOINTS.AUTH.resetPassword, { email, data }),
};
