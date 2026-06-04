import type {
  StaffCreationRequest,
  User,
  UserAdminResponse,
  UserBaseResponse,
  UserDetailResponse,
  UserFilter,
  UserUpdateByIdRequest,
  UserUpdateRequest,
} from "@/entities/user";
import { ENDPOINTS } from "@/shared/api/endpoints";
import { httpClient } from "@/shared/api/httpClient";
import type { ApiResponse } from "@/shared/api/types";

export const userApi = {
  getMe: () => httpClient.get<ApiResponse<User>>(ENDPOINTS.USERS.me),
  updateMe: (data: UserUpdateRequest) =>
    httpClient.patch<ApiResponse<UserBaseResponse>>(ENDPOINTS.USERS.updateMe, data),
  updateAvatar: (file: File) => {
    const formData = new FormData();
    formData.append("profilePictureFile", file);
    return httpClient.patch<ApiResponse<UserBaseResponse>>(ENDPOINTS.USERS.updateAvatar, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  removeAvatar: () => httpClient.patch<ApiResponse<UserBaseResponse>>(ENDPOINTS.USERS.removeAvatar),

  getList: (filter?: UserFilter, page = 1, size = 10) =>
    httpClient.get<ApiResponse<(UserAdminResponse | UserBaseResponse)[]>>(ENDPOINTS.USERS.list, {
      params: { ...filter, page, size },
    }),

  getById: (id: string) =>
    httpClient.get<ApiResponse<UserDetailResponse>>(ENDPOINTS.USERS.detail(id)),

  create: (data: StaffCreationRequest) =>
    httpClient.post<ApiResponse<UserBaseResponse>>(ENDPOINTS.USERS.create, data),

  updateById: (id: string, data: UserUpdateByIdRequest) => {
    const formData = new FormData();
    (Object.keys(data) as (keyof UserUpdateByIdRequest)[]).forEach((key) => {
      const value = data[key];
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    return httpClient.patch<ApiResponse<UserBaseResponse>>(
      ENDPOINTS.USERS.updateById(id),
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
  },

  lockAndUnlock: (id: string) => httpClient.patch<ApiResponse<string>>(ENDPOINTS.USERS.lock(id)),

  softDelete: (id: string) => httpClient.patch<ApiResponse<string>>(ENDPOINTS.USERS.softDelete(id)),

  delete: (id: string) => httpClient.delete<ApiResponse<string>>(ENDPOINTS.USERS.delete(id)),
};
