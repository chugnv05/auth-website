export type UserRole = "admin" | "user";

export type User = {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
};

export type LoginPayload = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken?: string;
};

export type LoginResponse = {
  user: User;
  tokens: AuthTokens;
};
