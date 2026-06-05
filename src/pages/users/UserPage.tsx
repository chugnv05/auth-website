import type { UserAdminResponse, UserBaseResponse, UserFilter } from "@/entities/user";
import { useAuthStore } from "@/features/auth/store/auth.store";
import {
  useCreateUser,
  useDeleteUser,
  useLockUser,
  UserCreateDialog,
  UserDetailDialog,
  UserTable,
  UserToolbar,
  useSoftDeleteUser,
  useUpdateUserById,
  useUserDetail,
  useUsers,
  type CreateUserSchemaType,
  type UpdateUserByIdSchemaType,
} from "@/features/user";
import { ConfirmDialog } from "@/shared/ui/custom";
import { useState } from "react";

type UserRow = UserAdminResponse | UserBaseResponse;

type DialogAction = "lock" | "softDelete" | "delete";

export default function UserPage() {
  const currentUser = useAuthStore((s) => s.user);
  const currentUserRoles = currentUser?.roles?.map((r) => r.name) ?? [];

  const [filter, setFilter] = useState<UserFilter>({});
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  // dialog states
  const [createOpen, setCreateOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<DialogAction | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserRow | undefined>();

  // queries
  const { data, isLoading } = useUsers(filter, page, PAGE_SIZE);
  const { data: userDetail, isLoading: isLoadingDetail } = useUserDetail(
    detailOpen ? selectedUser?.id : undefined,
  );

  // mutations
  const createUser = useCreateUser();
  const updateUser = useUpdateUserById();
  const lockUser = useLockUser();
  const softDeleteUser = useSoftDeleteUser();
  const deleteUser = useDeleteUser();

  const handleSearch = (keyword: string) => {
    setFilter((prev) => ({ ...prev, keyWords: keyword || undefined }));
    setPage(1);
  };

  const handleFilterChange = (partial: Partial<UserFilter>) => {
    setFilter((prev) => ({ ...prev, ...partial }));
    setPage(1);
  };

  const handleDetail = (user: UserRow) => {
    setSelectedUser(user);
    setDetailOpen(true);
  };

  const handleLock = (user: UserRow) => {
    setSelectedUser(user);
    setConfirmAction("lock");
    setConfirmOpen(true);
  };

  const handleSoftDelete = (user: UserRow) => {
    setSelectedUser(user);
    setConfirmAction("softDelete");
    setConfirmOpen(true);
  };

  // Từ detail dialog -> hard delete
  const handleDeleteRequest = () => {
    setConfirmAction("delete");
    setConfirmOpen(true);
  };

  const handleUpdate = (values: UpdateUserByIdSchemaType) => {
    if (!selectedUser) return;
    updateUser.mutate(
      { id: selectedUser.id, data: values },
      {
        onSuccess: () => setDetailOpen(false),
      },
    );
  };

  const handleCreate = (values: CreateUserSchemaType) => {
    createUser.mutate(values, {
      onSuccess: () => setCreateOpen(false),
    });
  };

  const handleConfirm = () => {
    if (!selectedUser) return;

    if (confirmAction === "lock") {
      lockUser.mutate(selectedUser.id, {
        onSuccess: () => {
          setConfirmOpen(false);
          setSelectedUser(undefined);
        },
      });
    } else if (confirmAction === "softDelete") {
      softDeleteUser.mutate(selectedUser.id, {
        onSuccess: () => {
          setConfirmOpen(false);
          setSelectedUser(undefined);
          if (data?.data.length === 1 && page > 1) setPage((p) => p - 1);
        },
      });
    } else if (confirmAction === "delete") {
      deleteUser.mutate(selectedUser.id, {
        onSuccess: () => {
          setConfirmOpen(false);
          setDetailOpen(false);
          setSelectedUser(undefined);
          if (data?.data.length === 1 && page > 1) setPage((p) => p - 1);
        },
      });
    }
  };

  const confirmConfig = {
    lock: {
      title: selectedUser?.status === "LOCKED" ? "Unlock User" : "Lock User",
      description:
        selectedUser?.status === "LOCKED"
          ? `Unlock ${selectedUser?.fullName}? They will regain access to the system.`
          : `Lock ${selectedUser?.fullName}? They will not be able to log in.`,
      confirmLabel: selectedUser?.status === "LOCKED" ? "Unlock" : "Lock",
      variant: "destructive" as const,
    },
    softDelete: {
      title: "Deactivate User",
      description: `Deactivate ${selectedUser?.fullName}? Their account will be marked as deleted but data is preserved.`,
      confirmLabel: "Deactivate",
      variant: "destructive" as const,
    },
    delete: {
      title: "Permanently Delete User",
      description: `Permanently delete ${selectedUser?.fullName}? This action cannot be undone and all data will be lost.`,
      confirmLabel: "Delete Forever",
      variant: "destructive" as const,
    },
  };

  const confirm = confirmAction ? confirmConfig[confirmAction] : confirmConfig.lock;
  const isConfirmPending = lockUser.isPending || softDeleteUser.isPending || deleteUser.isPending;

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
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-crimson-red">User Management</h1>
        <p className="text-sm text-crimson-red/60 mt-0.5">List of users in the system</p>
      </div>

      {/* Toolbar */}
      <UserToolbar
        filter={filter}
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        onAdd={() => setCreateOpen(true)}
      />

      {/* Table */}
      <UserTable
        data={(data?.data as UserRow[]) ?? []}
        isLoading={isLoading}
        pagination={pagination}
        onPageChange={setPage}
        onDetail={handleDetail}
        onLock={handleLock}
        onSoftDelete={handleSoftDelete}
        currentUserRoles={currentUserRoles}
      />

      {/* Create dialog */}
      <UserCreateDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSubmit={handleCreate}
        isPending={createUser.isPending}
      />

      {/* Detail dialog - chi mount khi co selectedUser de tranh portal render lech */}
      {selectedUser && (
        <UserDetailDialog
          open={detailOpen}
          onOpenChange={setDetailOpen}
          user={userDetail}
          isLoading={isLoadingDetail}
          currentUserRoles={currentUserRoles}
          onUpdate={handleUpdate}
          onDelete={handleDeleteRequest}
          isUpdatePending={updateUser.isPending}
          isDeletePending={deleteUser.isPending}
        />
      )}

      {/* Confirm dialog (lock / softDelete / delete) */}
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title={confirm.title}
        description={confirm.description}
        confirmLabel={confirm.confirmLabel}
        cancelLabel="Cancel"
        variant={confirm.variant}
        loading={isConfirmPending}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
