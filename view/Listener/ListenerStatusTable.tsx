import { DataTableCard, DataTableContent, DataTablePagination, defaultHeader } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenu } from "@/components/ui/dropdown-menu";
import { LOAN_ADMIN_ACTION, LoanAdminAction } from "@/model/Loan";
import { LISTENER_ACTIONS, ListenerActionLabelMap, ListenerActions, ListenerStatus } from "@/model/Manage/ListenerStatus";
import { formatDate } from "@/utils";
import { ColumnDef, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";


type ListenerStatusTableProps = {
    data: ListenerStatus[];
    onTableAction: (action: ListenerActions, listener: ListenerStatus) => void;
}

function ListenerStatusTable({ data, onTableAction }: ListenerStatusTableProps) {
    const columns: ColumnDef<ListenerStatus>[] = [
        {
            accessorKey: "eventName",
            header: defaultHeader("Tên sự kiện"),
        },
        {   
            accessorKey: "isRunning",
            header: defaultHeader("Trạng thái"),
            cell: ({ row }) => {
                const isRunning = row.original.isRunning;
                return (
                    <Badge variant={isRunning ? "success" : "danger"}>
                        {isRunning ? "Đang chạy" : "Đã dừng"}
                    </Badge>
                );
            }
        },
        {
            accessorKey: "lastProcessedBlock",
            header: defaultHeader("Block cuối đã xử lý"),
        },
        {
            accessorKey: "lastHeartbeat",
            header: defaultHeader("Lần cuối nhận sự kiện"),
            cell: ({ row }) => {
                const lastHeartbeat = row.original.lastHeartbeat;
                const date = new Date(lastHeartbeat);
                return (
                    <span>{formatDate(date.toISOString())}</span>
                );
            }
        },
        {
            id: "actions",
            header: defaultHeader("Hành động"),
            cell: ({ row }) => {
                const listener = row.original;
                return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                  <MoreHorizontal className="size-4" />
                  <span className="sr-only">Mở menu thao tác</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-sidebar border border-border text-foreground">
                <DropdownMenuLabel className="text-foreground">Hành động</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {
                    LISTENER_ACTIONS.map((actionKey) => (
                        <DropdownMenuItem
                            key={actionKey}
                            onSelect={() => onTableAction(actionKey as ListenerActions, listener)}
                             className="cursor-pointer"
                        >
                            {ListenerActionLabelMap[actionKey as ListenerActions]}
                        </DropdownMenuItem>
                    ))
                }
              </DropdownMenuContent>
            </DropdownMenu>
          );
            }
        }
    ];

     const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    
        initialState: {
          pagination: {
            pageSize: 5,
          },
        },
      });

       return (
          <DataTableCard title={"Danh sách các Listener"}>
            <DataTableContent
              table={table}
              columnsLength={columns.length}
              emptyMessage={"Chưa có listener nào"}
            />
            <DataTablePagination table={table} />
          </DataTableCard>
        );
}

export default ListenerStatusTable;

