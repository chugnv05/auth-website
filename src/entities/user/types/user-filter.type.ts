import type { Gender } from "@/shared/constants/gender";
import type { Status } from "@/shared/constants/status";

export interface UserFilter {
  keyWords?: string;
  gender?: Gender;
  status?: Status;
}
