
import { sortableHeader, useDataTableState, DataTableCard, DataTableToolbar, DataTableContent } from "@/components/data-table";
import ActionButton from "@/components/MyComponent/ActionButton";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  applicationStatusLabelMap,
  applicationStatusVariantMap,
  LoanApplication,
} from "@/model/LoanApplication";
import { LOAN_TRANSFER_ACTIONS, LoanTransferAction, LoanTransferActionLabelMap, UserLoanTransfer } from "@/model/LoanTransfer";
import { LoanTransferOfferAction, LoanTransferOfferActionLabelMap, UserLoanTransferOffer } from "@/model/LoanTransferOffer";
import { shortAddress, formatUsdc, formatDate, isNotProcessing } from "@/utils";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { WalletCards, XCircle } from "lucide-react";


type Props = {
    transferApplication: UserLoanTransfer;
  data: UserLoanTransferOffer[];
};


function TransferOfferTable(props: Props) {
   

  const { 
    transferApplication,
    data,
  } = props;


  const columns : ColumnDef<UserLoanTransferOffer>[] = [

    {
      accessorKey: "offerId",
      header: sortableHeader<UserLoanTransferOffer>("ID"),
    },
    {
      accessorKey: "requester",
      header: sortableHeader<UserLoanTransferOffer>("Người yêu cầu"),
    },
    {
      accessorKey: "price",
      header: sortableHeader<UserLoanTransferOffer>("Giá chuyển nhượng"),
      cell: ({ row }) => {
        return formatUsdc(row.original.price);
      },
    },
    {
      accessorKey: "status",
      header: sortableHeader<UserLoanTransferOffer>("Trạng thái"),
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Badge variant={applicationStatusVariantMap[status]}>
            {applicationStatusLabelMap[status]}
          </Badge>
        );
      },
    },
    {
      accessorKey: "timeCreated",
      header: sortableHeader<UserLoanTransferOffer>("Thời gian tạo"),
      cell: ({ row }) => {
        return formatDate(row.original.timeCreated);
      },
    },
];

  const {
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
    globalFilter,
    setGlobalFilter,
    clearFilters,
  } = useDataTableState();

  const table = useReactTable({
    data: data,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: "includesString",
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <DataTableCard title="Danh sách đề nghị mua chuyển nhượng">
      <DataTableToolbar
        searchPlaceholder="Tìm theo ID, người yêu cầu, giá..."
        searchValue={globalFilter}
        onSearchChange={setGlobalFilter}
        onClearFilters={() => {
          clearFilters();
          table.setPageIndex(0);
        }}
        statusFilter={{
          value:
            (table.getColumn("status")?.getFilterValue() as string) ?? "all",
          onChange: (value) =>
            table
              .getColumn("status")
              ?.setFilterValue(value === "all" ? undefined : value),
          options: [
            { value: "all", label: "Tất cả trạng thái" },
            {
              value: "PENDING_CREATED",
              label: applicationStatusLabelMap.PENDING_CREATED,
            },
            { value: "CREATED", label: applicationStatusLabelMap.CREATED },
            {
              value: "PENDING_ACCEPTED",
              label: applicationStatusLabelMap.PENDING_ACCEPTED,
            },
            { value: "ACCEPTED", label: applicationStatusLabelMap.ACCEPTED },
            {
              value: "PENDING_CANCELED",
              label: applicationStatusLabelMap.PENDING_CANCELED,
            },
            { value: "CANCELED", label: applicationStatusLabelMap.CANCELED },
          ],
        }}
      />
      <DataTableContent
        table={table}
        columnsLength={columns.length}
        emptyMessage="Không có dữ liệu phù hợp."
      />
    </DataTableCard>
  );
}

export default TransferOfferTable;
