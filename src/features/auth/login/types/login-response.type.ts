import type { User } from "@/entities/user";
import type { ApiResponse, TokenInfo } from "@/shared/api/types";

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export type LoginResponse = ApiResponse<User, TokenInfo>;
