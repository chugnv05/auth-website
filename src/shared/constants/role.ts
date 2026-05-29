export const RoleType = {
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  STAFF: "STAFF",
  USER: "USER",
} as const;
export type RoleType = (typeof RoleType)[keyof typeof RoleType];
