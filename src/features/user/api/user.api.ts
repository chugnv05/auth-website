import type { User, UserBaseResponse, UserUpdateRequest } from "@/entities/user/types";
import { ENDPOINTS } from "@/shared/api/endpoints";
import { httpClient } from "@/shared/api/httpClient";
import type { ApiResponse } from "@/shared/api/types";

export const userApi = {
  getMe: () => httpClient.get<ApiResponse<User>>(ENDPOINTS.USERS.me),
  updateMe: (data: UserUpdateRequest, profilePictureFile?: File) => {
    const formData = new FormData();

    if (data.firstName) formData.append("first_name", data.firstName);
    if (data.lastName) formData.append("last_name", data.lastName);
    if (data.gender) formData.append("gender", data.gender);
    if (data.dob) formData.append("dob", data.dob);
    if (data.phoneNumber) formData.append("phone_number", data.phoneNumber);
    if (profilePictureFile) formData.append("profile_picture_file", profilePictureFile);

    return httpClient.patch<ApiResponse<UserBaseResponse>>(ENDPOINTS.USERS.update, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
