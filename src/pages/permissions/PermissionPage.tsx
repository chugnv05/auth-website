import type { PermissionDetailResponse, PermissionFilter } from "@/entities/permission";
import {
  PermissionFormDialog,
  PermissionTable,
  PermissionToolbar,
  useCreatePermission,
  useDeletePermission,
  usePermissions,
  useUpdatePermission,
} from "@/features/permission";
import type { PermissionSchemaType } from "@/features/permission/schemas/permission.schema";
import { ConfirmDialog } from "@/shared/ui/custom";
import { useState } from "react";

export default function PermissionPage() {
  const [filter, setFilter] = useState<PermissionFilter>({});
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedPermission, setSelectPermission] = useState<
    PermissionDetailResponse | undefined
  >();

  const { data, isLoading } = usePermissions(filter, page, PAGE_SIZE);
  const createPermission = useCreatePermission();
  const updatePermission = useUpdatePermission();
  const deletePermission = useDeletePermission();

  const handleSearch = (keyword: string) => {
    setFilter({ keyWords: keyword || undefined });
    setPage(1);
  };

  const handleAdd = () => {
    setSelectPermission(undefined);
    setFormOpen(true);
  };

  const handleEdit = (role: PermissionDetailResponse) => {
    setSelectPermission(role);
    setFormOpen(true);
  };

  const handleDelete = (role: PermissionDetailResponse) => {
    setSelectPermission(role);
    setDeleteOpen(true);
  };

  const handleFormSubmit = (values: PermissionSchemaType) => {
    if (selectedPermission) {
      updatePermission.mutate(
        { id: selectedPermission.id, data: values },
        { onSuccess: () => setFormOpen(false) },
      );
    } else {
      createPermission.mutate(values, { onSuccess: () => setFormOpen(false) });
    }
  };

  const handleConfirmDelete = () => {
    if (!selectedPermission) return;
    deletePermission.mutate(selectedPermission.id, {
      onSuccess: () => {
        setDeleteOpen(false);
        setSelectPermission(undefined);
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
        <h1 className="text-3xl font-semibold text-crimson-red">Permission management</h1>
        <p className="text-sm text-crimson-red/60 mt-0.5">List of permissions in the system</p>
      </div>

      <PermissionToolbar onSearch={handleSearch} onAdd={handleAdd} />

      <PermissionTable
        data={(data?.data as PermissionDetailResponse[]) ?? []}
        isLoading={isLoading}
        pagination={pagination}
        onPageChange={setPage}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <PermissionFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleFormSubmit}
        isPending={createPermission.isPending || updatePermission.isPending}
        permission={selectedPermission}
      />

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Permission"
        description={`Are you sure you want to delete the ${selectedPermission?.name} permission? The action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="destructive"
        loading={deletePermission.isPending}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
