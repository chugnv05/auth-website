import type { RoleBaseResponse } from "@/entities/role";
import type { Gender } from "@/shared/constants/gender";
import type { Status } from "@/shared/constants/status";
export interface UserBaseResponse {
  id: string;
  fullName: string;
  gender: Gender;
  dob: string;
  email: string;
  phoneNumber: string;
  status: Status;
  profilePicture: string | null;
}
export interface UserAdminResponse extends UserBaseResponse {
  roles: RoleBaseResponse[];
}

export interface UserDetailResponse {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  gender: Gender;
  dob: string;
  email: string;
  phoneNumber: string;
  profilePicture: string | null;
  status: Status;
  createdAt: string;
  updatedAt: string;
  roles: RoleBaseResponse[];
}
