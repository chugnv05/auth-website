import type { BaseEntity } from "@/entities/base.entity";

export interface RoleBaseResponse {
  id: string;
  name: string;
}

export interface RoleResponse {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface RoleDetailResponse extends BaseEntity {
  name: string;
  description: string;
}
