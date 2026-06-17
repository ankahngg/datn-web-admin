"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, History, MoreHorizontal } from "lucide-react";
import {
  type ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { formatDate, formatUsdc, shortAddress } from "@/utils";
import {
  DataTableCard,
  DataTableToolbar,
  DataTableContent,
  DataTablePagination,
  defaultHeader,
} from "@/components/data-table";
import {
  EVENT_ADMIN_ACTIONS,
  EventAdminAction,
  EventResponse,
  EventType,
} from "@/model/Event";
import {
  BlockchainEventBase,
  EventProcessingStatusLabelMap,
  EventProcessingStatusVariantMap,
} from "@/model/Events/BlockchainEventBase";
import ActionButton from "@/components/MyComponent/ActionButton";
import { FAILED_EVENT_ACTIONS, FailedEvent, FailedEventAction, FailedEventActionLabelMap } from "@/model/Manage/FailedEvent";

type EventTableProps = {
  title: string;
  data: FailedEvent[];
  isLoading?: boolean;
  onTableAction: (action: FailedEventAction, event: FailedEvent) => void;
};

export function FailedEventTable({
  data,
  isLoading = false,
  onTableAction,
  title,
}: EventTableProps) {
  const columns: ColumnDef<FailedEvent>[] = [
    {
        accessorKey: "eventName",
        header: defaultHeader("Tên sự kiện"),
    },
    {
        accessorKey: "isResolved",
        header: defaultHeader("Trạng thái"),
        cell: ({ row }) => {
            return (
                <Badge variant={row.original.isResolved ? "success" : "danger"}>
                    {row.original.isResolved ? "Đã giải quyết" : "Chưa giải quyết"}
                </Badge>
            );
        }
    },
     {
        accessorKey: "tryCount",
        header: defaultHeader("Số lần thử"),
    },
    {
        accessorKey: "timeCreated",
        header: defaultHeader("Thời gian tạo"),
    },
    {
        accessorKey: "timeResolved",
        header: defaultHeader("Thời gian giải quyết"),
    },
    // {
    //     accessorKey: "event",
    //     header: defaultHeader("Dữ liệu sự kiện"),
    // },
    {
      header: "Hành động",
      cell: ({ row }) => {
        const data = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <ActionButton />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 bg-sidebar border border-border text-foreground"
            >
              <DropdownMenuLabel className="text-foreground">
                Hành động
              </DropdownMenuLabel>
              {FAILED_EVENT_ACTIONS.map(
                (actionKey) => (
                  <DropdownMenuItem
                    key={actionKey}
                    onSelect={() =>
                      onTableAction(actionKey as FailedEventAction, data)
                    }
                    className="cursor-pointer"
                  >
                    {FailedEventActionLabelMap[actionKey as FailedEventAction]}
                  </DropdownMenuItem>
                ),
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <DataTableCard title={title}>
      <DataTableContent
        table={table}
        columnsLength={columns.length}
        emptyMessage={
          isLoading ? "Đang tải dữ liệu..." : "Không có sự kiện thất bại nào."
        }
      />

      <DataTablePagination table={table} />
    </DataTableCard>
  );
}
