export const ENDPOINTS = {
  AUTH: {
    login: "/auth/login",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
  },
  ROLE: "",
  PERMISSION: "",
  USERS: {
    me: "/user/me",
  },
} as const;
