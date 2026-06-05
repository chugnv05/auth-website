import type { BaseEntity } from "@/entities/base.entity";
import type { RoleBaseResponse } from "@/entities/role/types/role-response.type";
import type { Gender } from "@/shared/constants/gender";
import type { Status } from "@/shared/constants/status";

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
  roles: RoleBaseResponse[];
}
