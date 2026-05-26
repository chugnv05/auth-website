export const ENDPOINTS = {
  AUTH: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
  },
  ROLE: "",
  PERMISSION: "",
  USERS: {
    me: "/user/me",
  },
} as const;
