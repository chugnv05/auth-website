import type { Status } from "../constants/status";

export const STATUS_CONFIG: Record<Status, { color: string; label: string }> = {
  ACTIVE: { color: "bg-emerald-500", label: "Active" },
  LOCKED: { color: "bg-amber-400", label: "Locked" },
  EXPIRED: { color: "bg-gray-400", label: "Expired" },
  DELETED: { color: "bg-red-500", label: "Deleted" },
};
