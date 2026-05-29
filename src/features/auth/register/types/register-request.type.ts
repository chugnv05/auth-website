import type { Gender } from "@/shared/constants/gender";

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  gender: Gender;
  dob: string;
  email: string;
  phoneNumber: string;
  password: string;
}
