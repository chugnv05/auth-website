import type {
  PermissionDetailResponse,
  PermissionFilter,
  PermissionRequest,
  PermissionResponse,
} from "@/entities/permission";
import { ENDPOINTS } from "@/shared/api/endpoints";
import { httpClient } from "@/shared/api/httpClient";
import type { ApiResponse } from "@/shared/api/types";

export const permissionApi = {
  getList: (filter?: PermissionFilter, page = 1, size = 10) =>
    httpClient.get<ApiResponse<PermissionResponse[]>>(ENDPOINTS.PERMISSIONS.list, {
      params: { ...filter, page, size },
    }),

  getDetail: (id: string) =>
    httpClient.get<ApiResponse<PermissionDetailResponse>>(ENDPOINTS.PERMISSIONS.detail(id)),

  create: (data: PermissionRequest) =>
    httpClient.post<ApiResponse<PermissionResponse>>(ENDPOINTS.PERMISSIONS.create, data),

  update: (id: string, data: PermissionRequest) =>
    httpClient.patch<ApiResponse<PermissionDetailResponse>>(ENDPOINTS.PERMISSIONS.update(id), data),

  delete: (id: string) => httpClient.delete<ApiResponse<void>>(ENDPOINTS.PERMISSIONS.delete(id)),
};
