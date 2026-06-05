import type { UserAdminResponse, UserBaseResponse } from "@/entities/user";
import { genderData } from "@/shared/config/gender.data";
import { STATUS_CONFIG } from "@/shared/config/status.data";
import { RoleType } from "@/shared/constants/role";
import type { Status } from "@/shared/constants/status";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui";
import { DataTable, type ColumnDef, type PaginationState } from "@/shared/ui/custom/data-table";
import { Eye, LockKeyhole, LockKeyholeOpen, Trash2 } from "lucide-react";

type UserRow = UserAdminResponse | UserBaseResponse;

function isAdminResponse(row: UserRow): row is UserAdminResponse {
  return "roles" in row && Array.isArray((row as UserAdminResponse).roles);
}

function getStatusBadgeVariant(status: Status) {
  switch (status) {
    case "ACTIVE":
      return "success";
    case "LOCKED":
      return "warning";
    case "DELETED":
      return "destructive";
    default:
      return "info";
  }
}

type UserTableProps = {
  data: UserRow[];
  isLoading?: boolean;
  pagination?: PaginationState;
  onPageChange?: (page: number) => void;
  onDetail?: (user: UserRow) => void;
  onLock?: (user: UserRow) => void;
  onSoftDelete?: (user: UserRow) => void;
  currentUserRoles?: string[];
};

export function UserTable({
  data,
  isLoading,
  pagination,
  onPageChange,
  onDetail,
  onLock,
  onSoftDelete,
  currentUserRoles = [],
}: UserTableProps) {
  const isCurrentUserAdmin = currentUserRoles.includes(RoleType.ADMIN);
  const columns: ColumnDef<UserRow>[] = [
    {
      key: "avatar",
      header: "",
      className: "w-10",
      cell: (row) => {
        const initials = row.fullName
          .split(" ")
          .slice(-2)
          .map((n) => n[0])
          .join("")
          .toUpperCase();
        return (
          <Avatar className="size-8">
            <AvatarImage src={row.profilePicture ?? undefined} alt={row.fullName} />
            <AvatarFallback className="bg-crimson-red/10 text-crimson-red text-xs font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
        );
      },
    },
    {
      key: "fullName",
      header: "Full Name",
      cell: (row) => <span className="font-semibold text-crimson-red">{row.fullName}</span>,
    },
    {
      key: "gender",
      header: "Gender",
      cell: (row) => {
        const label = genderData.find((g) => g.value === row.gender)?.label ?? row.gender;
        return <span className="text-crimson-red/70 text-sm">{label}</span>;
      },
    },
    {
      key: "phoneNumber",
      header: "Phone",
      cell: (row) => <span className="text-crimson-red/70 text-sm">{row.phoneNumber || "—"}</span>,
    },
    {
      key: "email",
      header: "Email",
      cell: (row) => <span className="text-crimson-red/70 text-sm">{row.email}</span>,
    },
    ...(isCurrentUserAdmin
      ? [
          {
            key: "roles",
            header: "Roles",
            cell: (row: UserRow) => {
              if (!isAdminResponse(row) || !row.roles?.length) {
                return <span className="text-crimson-red/40 text-xs">—</span>;
              }
              return (
                <div className="flex flex-wrap gap-1">
                  {row.roles.map((r) => (
                    <Badge
                      key={r.id}
                      variant={r.name === RoleType.ADMIN ? "default" : "outline"}
                      size="sm"
                    >
                      {r.name}
                    </Badge>
                  ))}
                </div>
              );
            },
          },
        ]
      : []),
    {
      key: "status",
      header: "Status",
      cell: (row) => {
        const cfg = STATUS_CONFIG[row.status as Status];
        return (
          <Badge variant={getStatusBadgeVariant(row.status as Status)} size="sm">
            <span className={`size-1.5 rounded-full ${cfg.color} mr-1`} />
            {cfg.label}
          </Badge>
        );
      },
    },
    {
      key: "actions",
      header: "Actions",
      className: "w-28 text-right",
      cell: (row) => {
        const isDeleted = row.status === "DELETED";
        const isLocked = row.status === "LOCKED";

        // Không cho thao tác nếu là ADMIN
        const isAdmin = isAdminResponse(row) && row.roles?.some((r) => r.name === RoleType.ADMIN);

        return (
          <TooltipProvider>
            <div className="flex items-center justify-end gap-1">
              {/* Detail */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:text-crimson-red hover:bg-crimson-red/10"
                    onClick={() => onDetail?.(row)}
                  >
                    <Eye className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Detail</TooltipContent>
              </Tooltip>

              {/* Lock / Unlock */}
              {!isAdmin && !isDeleted && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:text-amber-600 hover:bg-amber-50"
                      onClick={() => onLock?.(row)}
                    >
                      {isLocked ? (
                        <LockKeyholeOpen className="size-4" />
                      ) : (
                        <LockKeyhole className="size-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{isLocked ? "Unlock" : "Lock"}</TooltipContent>
                </Tooltip>
              )}

              {/* Soft Delete */}
              {!isAdmin && !isDeleted && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-crimson hover:text-destructive hover:bg-red-50"
                      onClick={() => onSoftDelete?.(row)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Deactivate</TooltipContent>
                </Tooltip>
              )}
            </div>
          </TooltipProvider>
        );
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      isLoading={isLoading}
      pagination={pagination}
      onPageChange={onPageChange}
      emptyMessage="No Users Found"
    />
  );
}
