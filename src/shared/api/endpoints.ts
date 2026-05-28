export const ENDPOINTS = {
  AUTH: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
    resetPassword: "/auth/reset-password",
    forgotPassword: "/auth/forgot-password",
    changePassword: "/auth/change-password",
  },
  ROLES: {
    list: "/roles",
    create: "/roles",
    detail: (id: string) => `/roles/${id}`,
    update: (id: string) => `/roles/${id}`,
    delete: (id: string) => `/roles/${id}`,
  },
  PERMISSIONS: {
    list: "/permissions",
    create: "/permissions",
    detail: (id: string) => `/permissions/${id}`,
    update: (id: string) => `/permissions/${id}`,
    delete: (id: string) => `/permissions/${id}`,
  },
  USERS: {
    me: "/users/me",
    list: "/users",
    create: "/users",
    update: "/users/me/update",
    updateAvatar: "/users/me/avatar",
    removeAvatar: "/users/me/remove/avatar",
    detail: (id: string) => `/users/${id}`,
    updateById: (id: string) => `/users/${id}/update`,
    lock: (id: string) => `/users/${id}/lock`,
    softDelete: (id: string) => `/users/${id}/soft-delete`,
    delete: (id: string) => `/users/${id}`,
  },
  EMAILS: {
    send: "/emails/send",
  },
  OTP: {
    verify: "/otp/verify",
  },
} as const;
