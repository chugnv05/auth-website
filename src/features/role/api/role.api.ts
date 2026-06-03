import type { RoleDetailResponse, RoleFilter, RoleRequest, RoleResponse } from "@/entities/role";
import { ENDPOINTS } from "@/shared/api/endpoints";
import { httpClient } from "@/shared/api/httpClient";
import type { ApiResponse } from "@/shared/api/types";

export const roleApi = {
  getList: (filter?: RoleFilter, page = 1, size = 10) =>
    httpClient.get<ApiResponse<RoleResponse[]>>(ENDPOINTS.ROLES.list, {
      params: { ...filter, page, size },
    }),

  getDetail: (id: string) =>
    httpClient.get<ApiResponse<RoleDetailResponse>>(ENDPOINTS.ROLES.detail(id)),

  create: (data: RoleRequest) =>
    httpClient.post<ApiResponse<RoleResponse>>(ENDPOINTS.ROLES.create, data),

  update: (id: string, data: RoleRequest) =>
    httpClient.patch<ApiResponse<RoleDetailResponse>>(ENDPOINTS.ROLES.update(id), data),

  delete: (id: string) => httpClient.delete<ApiResponse<void>>(ENDPOINTS.ROLES.delete(id)),
};
