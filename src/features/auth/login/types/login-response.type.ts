import { User } from "@/entities/user/types/user.type";
import { AuthTokens } from "@/features/session/types/auth-token.type";

export type LoginResponse = {
  user: User;
  tokens: AuthTokens;
};
