import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Inbox } from "lucide-react";
import type React from "react";
import { Button } from "../button";
import { Skeleton } from "../skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../table";

export interface ColumnDef<TData> {
  key: string;
  header: string;
  className?: string;
  cell: (row: TData) => React.ReactNode;
}

export interface PaginationState {
  currentPage: number;
  totalPages: number;
  total: number;
  perPage: number;
}

type DataTableProps<TData> = {
  columns: ColumnDef<TData>[];
  data: TData[];
  isLoading?: boolean;
  pagination?: PaginationState;
  onPageChange?: (page: number) => void;
  emptyMessage?: string;
};

// khung hang
function TableSkeleton({ cols, rows = 6 }: { cols: number; rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <TableRow key={i} className="hover:translate-y-0 hover:bg-transparent">
          {Array.from({ length: cols }).map((_, j) => (
            <TableCell key={j}>
              <Skeleton variant="shimmer" className="h-4 w-full rounded" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
// bang trong
function EmptyState({ message }: { message: string }) {
  return (
    <TableRow className="hover:translate-y-0 hover:bg-transparent">
      <TableCell colSpan={999} className="h-48 text-center">
        <div className="flex flex-col items-center gap-2 text-crimson-red/40">
          <Inbox className="size-10" strokeWidth={1.2} />
          <span className="text-sm">{message}</span>
        </div>
      </TableCell>
    </TableRow>
  );
}

// phan trang
function PaginationControls({
  pagination,
  onPageChange,
}: {
  pagination: PaginationState;
  onPageChange: (page: number) => void;
}) {
  const { currentPage, totalPages, total, perPage } = pagination;
  const from = total === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const to = Math.min(currentPage * perPage, total);

  return (
    <div className="flex items-center justify-between px-1 py-3 text-sm text-crimson-red/70">
      <span>{total === 0 ? "Không có dữ liệu" : `${from}–${to} / ${total} mục`}</span>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          <ChevronsLeft className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="size-4" />
        </Button>

        <span className="px-2 font-medium text-crimson-red">
          {currentPage} / {totalPages || 1}
        </span>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          <ChevronRight className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage >= totalPages}
        >
          <ChevronsRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
// component
export function DataTable<TData extends { id: string }>({
  columns,
  data,
  isLoading = false,
  pagination,
  onPageChange,
  emptyMessage = "Không có dữ liệu",
}: DataTableProps<TData>) {
  return (
    <div className="flex flex-col gap-2">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.key} className={col.className}>
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <TableSkeleton cols={columns.length} />
          ) : data.length === 0 ? (
            <EmptyState message={emptyMessage} />
          ) : (
            data.map((row) => (
              <TableRow key={row.id}>
                {columns.map((col) => (
                  <TableCell key={col.key} className={col.className}>
                    {col.cell(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {pagination && onPageChange && (
        <PaginationControls pagination={pagination} onPageChange={onPageChange} />
      )}
    </div>
  );
}
