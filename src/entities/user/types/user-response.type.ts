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
