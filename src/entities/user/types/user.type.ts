import { UserRole } from "./user-role.type";

export type User = {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
};
