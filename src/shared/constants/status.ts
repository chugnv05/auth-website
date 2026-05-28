export const Status = {
  ACTIVE: "ACTIVE",
  LOCKED: "LOCKED",
  EXPIRED: "EXPIRED",
  DELETED: "DELETED",
} as const;
export type Status = (typeof Status)[keyof typeof Status];
