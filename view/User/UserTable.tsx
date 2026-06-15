import { DataTableCard, DataTableContent, DataTablePagination, defaultHeader, sortableHeader } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { User, UserFilter } from "@/model/User";
import { formatDate, formatEther, formatUsdc } from "@/utils";
import { ColumnDef, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";



const columns: ColumnDef<User>[] = 
    [
      {
        accessorKey: "id",
        header: defaultHeader("ID"),
      },
      {
        accessorKey: "walletAddress",
        header: defaultHeader("Địa chỉ ví"),
      },
    //   {
    //     accessorKey: "name",
    //     header: defaultHeader("Tên"),
    //   },
      
      {
        accessorKey: "createdAt",
        header: defaultHeader("Ngày tạo"),
        cell: ({ row }) => {
            return (
                formatDate(row.original.createdAt)
            )
        }
      },
      {
        accessorKey: "usdcBalance",
        header: defaultHeader("Số dư USDC"),
        cell: ({ row }) => {
            return (
                formatUsdc(row.original.usdcBalance)
            )
        }
      },
      {
        accessorKey: "ethBalance",
        header: defaultHeader("Số dư ETH"),
        cell: ({ row }) => {
            return (
                formatEther(row.original.ethBalance)
            )
        }
      },
      {
        accessorKey: "nftCount",
        header: defaultHeader("Số lượng NFT"),
      },

    //   {
    //     accessorKey: "phone",
    //     header: defaultHeader("SDT"),
    //   },
    //   {
    //     accessorKey: "email",
    //     header: defaultHeader("Email"),
    //   },
    //   {
    //     accessorKey: "address",
    //     header: defaultHeader("Địa chỉ"),
    //   },
    ];

export type UserTableProps = {
    title: string;
    emptyText: string;
    data : User[];
}


function UserTable(
    props : UserTableProps
) {
    const { title, emptyText, data } = props;

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
        <DataTableCard title={title ?? "Danh sách người dùng"}>
            <DataTableContent
                table={table}
                columnsLength={columns.length}
                emptyMessage={emptyText ?? "Chưa có offer nào"}
            />
        <DataTablePagination table={table} />
        </DataTableCard>
     );
}

export default UserTable;


