import type { Gender } from "@/shared/constants/gender";
import type { Status } from "@/shared/constants/status";

export interface UserUpdateRequest {
  firstName?: string;
  lastName?: string;
  gender?: Gender;
  dob?: string;
  phoneNumber?: string;
  email?: string;
}
export interface StaffCreationRequest {
  firstName: string;
  lastName: string;
  gender: Gender;
  dob: string;
  email: string;
  phoneNumber: string;
}

export interface UserUpdateByIdRequest {
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  phoneNumber: string;
  gender: Gender;
  status: Status;
  profilePicture?: string;
}
