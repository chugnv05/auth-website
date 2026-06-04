import type { PermissionDetailResponse } from "@/entities/permission";
import { formatDate } from "@/shared/lib/format";
import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/ui";
import { DataTable, type ColumnDef, type PaginationState } from "@/shared/ui/custom/data-table";
import { Pencil, Trash2 } from "lucide-react";

type PermissionTableProps = {
  data: PermissionDetailResponse[];
  isLoading?: boolean;
  pagination?: PaginationState;
  onPageChange?: (page: number) => void;
  onEdit?: (role: PermissionDetailResponse) => void;
  onDelete?: (role: PermissionDetailResponse) => void;
};

export function PermissionTable({
  data,
  isLoading,
  pagination,
  onPageChange,
  onEdit,
  onDelete,
}: PermissionTableProps) {
  const columns: ColumnDef<PermissionDetailResponse>[] = [
    {
      key: "name",
      header: "Name",
      cell: (row) => (
        <span className="font-semibold tracking-wide text-crimson-red">{row.name}</span>
      ),
    },
    {
      key: "description",
      header: "Description",
      className: "max-w-xs",
      cell: (row) => <span className="line-clamp-1 text-crimson-red/70">{row.description}</span>,
    },
    {
      key: "createdAt",
      header: "Created",
      cell: (row) => (
        <span className="text-crimson-red/60 text-xs">{formatDate(row.createdAt)}</span>
      ),
    },
    {
      key: "updatedAt",
      header: "Updated",
      cell: (row) => (
        <span className="text-crimson-red/60 text-xs">{formatDate(row.updatedAt)}</span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "w-20 text-right",
      cell: (row) => (
        <TooltipProvider>
          <div className="flex items-center justify-end gap-1">
            {/* Edit */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:text-destructive hover:bg-red-50"
                  onClick={() => onEdit?.(row)}
                >
                  <Pencil className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit</TooltipContent>
            </Tooltip>

            {/* Delete */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-crimson hover:text-destructive hover:bg-red-50"
                  onClick={() => onDelete?.(row)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      isLoading={isLoading}
      pagination={pagination}
      onPageChange={onPageChange}
      emptyMessage="No Data"
    />
  );
}
