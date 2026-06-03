export interface RoleRequest {
  name: string;
  description: string;
  permissions: string[]; //list ids
}
