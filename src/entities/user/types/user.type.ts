import type { BaseEntity } from "@/entities/base.entity";
import type { Role } from "@/entities/role/types/role.type";
import type { Gender, Status } from "@/shared/constants/gender";

export interface User extends BaseEntity {
  firstName: string;
  lastName: string;
  fullName: string;
  gender: Gender;
  dob: string;
  email: string;
  phoneNumber: string;
  profilePicture: string | null;
  status: Status;
  roles: Role[];
}
