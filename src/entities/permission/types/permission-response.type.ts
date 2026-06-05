import type { BaseEntity } from "@/entities/base.entity";

export interface PermissionBaseResponse {
  id: string;
  name: string;
}
export interface PermissionResponse {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}
export interface PermissionDetailResponse extends BaseEntity {
  name: string;
  description: string;
}
