import type { Gender, Status } from "@/shared/constants/gender";

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
