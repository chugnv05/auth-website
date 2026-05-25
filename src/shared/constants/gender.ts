export const RoleType = {
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  STAFF: "STAFF",
  USER: "USER",
} as const;
export type RoleType = (typeof RoleType)[keyof typeof RoleType];

export const Gender = {
  MALE: "MALE",
  FEMALE: "FEMALE",
  UNKNOWN: "UNKNOWN",
  OTHER: "OTHER",
} as const;
export type Gender = (typeof Gender)[keyof typeof Gender];

export const Status = {
  ACTIVE: "ACTIVE",
  LOCKED: "LOCKED",
  EXPIRED: "EXPIRED",
  DELETED: "DELETED",
} as const;
export type Status = (typeof Status)[keyof typeof Status];
