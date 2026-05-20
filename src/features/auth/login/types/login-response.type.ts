import type { User } from "@/entities/user/types/user.type";
import type { ApiResponse, TokenInfo } from "@/shared/api/types";

export type LoginResponse = ApiResponse<User, TokenInfo>;
