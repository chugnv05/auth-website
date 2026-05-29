import type { User, UserBaseResponse, UserUpdateRequest } from "@/entities/user/types";
import { ENDPOINTS } from "@/shared/api/endpoints";
import { httpClient } from "@/shared/api/httpClient";
import type { ApiResponse } from "@/shared/api/types";

export const userApi = {
  getMe: () => httpClient.get<ApiResponse<User>>(ENDPOINTS.USERS.me),
  updateMe: (data: UserUpdateRequest) =>
    httpClient.patch<ApiResponse<UserBaseResponse>>(ENDPOINTS.USERS.updateMe, data),
  updateAvatar: (file: File) => {
    const formData = new FormData();
    formData.append("profile_picture_file", file);
    return httpClient.patch<ApiResponse<UserBaseResponse>>(ENDPOINTS.USERS.updateAvatar, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  removeAvatar: () => httpClient.patch<ApiResponse<UserBaseResponse>>(ENDPOINTS.USERS.removeAvatar),
};
