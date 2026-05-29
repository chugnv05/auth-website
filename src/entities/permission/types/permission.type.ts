import type { BaseEntity } from "@/entities/base.entity";

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface PermissionDetail extends BaseEntity {
  name: string;
  description: string;
}
