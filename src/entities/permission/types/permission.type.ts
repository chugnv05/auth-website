import type { BaseEntity } from "@/entities/base.entity";
import type { RoleBaseResponse } from "@/entities/role";

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface PermissionDetail extends BaseEntity {
  name: string;
  description: string;
  roles?: RoleBaseResponse[];
}
