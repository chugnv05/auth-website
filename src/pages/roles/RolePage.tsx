import type { RoleDetailResponse, RoleFilter } from "@/entities/role";
import {
  RoleFormDialog,
  RoleTable,
  RoleToolbar,
  useCreateRole,
  useDeleteRole,
  useRoles,
  useUpdateRole,
} from "@/features/role";
import type { RoleSchemaType } from "@/features/role/schemas/role.schema";
import { ConfirmDialog } from "@/shared/ui/custom";
import { useState } from "react";

export default function RolePage() {
  const [filter, setFilter] = useState<RoleFilter>({});
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedRole, setSelectRole] = useState<RoleDetailResponse | undefined>();

  const { data, isLoading } = useRoles(filter, page, PAGE_SIZE);
  const createRole = useCreateRole();
  const updateRole = useUpdateRole();
  const deleteRole = useDeleteRole();

  const handleSearch = (keyword: string) => {
    setFilter({ keyWords: keyword || undefined });
    setPage(1);
  };

  const handleAdd = () => {
    setSelectRole(undefined);
    setFormOpen(true);
  };

  const handleEdit = (role: RoleDetailResponse) => {
    setSelectRole(role);
    setFormOpen(true);
  };

  const handleDelete = (role: RoleDetailResponse) => {
    setSelectRole(role);
    setDeleteOpen(true);
  };

  const handleFormSubmit = (values: RoleSchemaType) => {
    if (selectedRole) {
      updateRole.mutate(
        { id: selectedRole.id, data: values },
        { onSuccess: () => setFormOpen(false) },
      );
    } else {
      createRole.mutate(values, { onSuccess: () => setFormOpen(false) });
    }
  };

  const handleConfirmDelete = () => {
    if (!selectedRole) return;
    deleteRole.mutate(selectedRole.id, {
      onSuccess: () => {
        setDeleteOpen(false);
        setSelectRole(undefined);
        // neu xoa het trang cuoi -> ve trang truoc
        if (data?.data.length === 1 && page > 1) setPage((p) => p - 1);
      },
    });
  };

  const pagination = data?.pagination
    ? {
        currentPage: data.pagination.currentPage ?? page,
        totalPages: data.pagination.totalPages ?? 1,
        total: data.pagination.total ?? 0,
        perPage: PAGE_SIZE,
      }
    : undefined;

  return (
    <div className="flex flex-col gap-5 py-6">
      <div>
        <h1 className="text-3xl font-semibold text-crimson-red">Role management</h1>
        <p className="text-sm text-crimson-red/60 mt-0.5">List of roles in the system</p>
      </div>

      <RoleToolbar onSearch={handleSearch} onAdd={handleAdd} />

      <RoleTable
        data={(data?.data as RoleDetailResponse[]) ?? []}
        isLoading={isLoading}
        pagination={pagination}
        onPageChange={setPage}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <RoleFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleFormSubmit}
        isPending={createRole.isPending || updateRole.isPending}
        role={selectedRole}
      />

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Role"
        description={`Are you sure you want to delete the ${selectedRole?.name} role? The action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="destructive"
        loading={deleteRole.isPending}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
