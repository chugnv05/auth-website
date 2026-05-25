import type { BaseEntity } from "@/entities/base.entity";
import type { Permission } from "@/entities/permission/types/permission.type";

export interface Role {
  id: string;
  name: string;
  description: string;
}

export interface RoleDetail extends BaseEntity {
  name: string;
  description: string;
  permissions?: Permission[];
}
