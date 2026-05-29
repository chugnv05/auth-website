import type { Gender } from "@/shared/constants/gender";

export interface UserUpdateRequest {
  firstName?: string;
  lastName?: string;
  gender?: Gender;
  dob?: string;
  phoneNumber?: string;
  email?: string;
}
