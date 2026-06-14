"use client";

import { FullScreenLoading } from "@/components/MyComponent/FullLoadingScreen";
import { FullScreenError } from "@/components/MyComponent/FullScreenError";
import { useGetUsers, useGetUsers2 } from "@/hooks/use-get-users";

import { User, UserFilter } from "@/model/User";
import { TableFilter } from "@/components/data-table/TableFilter";
import { useState } from "react";
import UserTable from "@/view/User/UserTable";
import { LoanApplication, LoanApplicationAdminAction, LoanApplicationFilter } from "@/model/LoanApplication";
import { useUserLoanApplications2 } from "@/hooks/use-get-loan-application";
import LoanApplicationTable from "@/view/LoanApplication/LoanApplicationTable";
import { useRouter } from "next/navigation";
import { LoanTransferAdminAction, LoanTransferFilter, UserLoanTransfer } from "@/model/LoanTransfer";
import { useGetLoanTransfers2 } from "@/hooks/uset-get-loan-transfer";
import LoanTransferTable from "@/view/LoanTransfer/LoanTransferTable";

function LoanApplicationPage() {
    const router = useRouter();
  const [loanTransferFilter, setLoanTransferFilter] =
    useState<LoanTransferFilter>({});
  const {
    data: loanTransferData,
    error: loanTransferError,
    isLoading: loanTransferIsLoading,
  } = useGetLoanTransfers2({
    filter: loanTransferFilter,
    pageable: { page: 0, size: 10, sort: "createdAt,DESC" },
  });

  if (loanTransferIsLoading) {
    return <FullScreenLoading />;
  }

  if ( !loanTransferData) {
    return (
      <FullScreenError message="Đã có lỗi xảy ra khi tải dữ liệu người dùng." />
    );
  }

  function onFilter(filter: LoanTransferFilter) {
    alert("Filter applied: " + JSON.stringify(filter));
    setLoanTransferFilter(filter);
  }

  function onTableAction(
    action: LoanTransferAdminAction,
    transfer: UserLoanTransfer,
  ) {
    console.log("Action:", action, "on application:", transfer);

    switch (action) {
        case "VIEW_DETAILS": 
            router.push(`/loan-transfer/${transfer.transferId}`);
            break;
        default:
            console.warn("Unknown action:", action);
    }
  }

  return (
    <div className="space-y-6">
      <div>
                <h2 className="text-2xl font-bold mb-4">Quản lý chuyển nhượng khoản vay</h2>
            </div>
      <TableFilter<LoanTransferFilter>
        config={[
          {
            name: "seller",
            label: "Địa chỉ Người bán",
            type: "text",
            required: false,
          },
          {
            name: "buyer",
            label: "Địa chỉ Người mua",
            type: "text",
            required: false,
          },
          {
            name: "price",
            label: "Giá chuyển nhượng",
            type: "number",
            required: false,
          }, 
          {
            name: "status",
            label: "Trạng thái",
            type: "select",
            required: false,
            options: [
              { label: "Đang tạo", value: "PENDING_CREATED" },
              { label: "Đã tạo", value: "CREATED" },
              { label: "Đang chấp nhận", value: "PENDING_ACCEPTED" },
              { label: "Đã chấp nhận", value: "ACCEPTED" },
              { label: "Đang hủy", value: "PENDING_CANCELED" },
              { label: "Đã hủy", value: "CANCELED" },
            ],
          },
          {
            name: "fromTimeCreated",
            label: "Ngày tạo từ",
            type: "date",
            required: false,
          },
          {
            name: "toTimeCreated",
            label: "Ngày tạo đến",
            type: "date",
            required: false,
          },
        ]}
        onFilter={(filter: UserFilter) => onFilter(filter)}
      />

        <LoanTransferTable
          title="Danh sách chuyển nhượng khoản vay"
          emptyText="Chưa có chuyển nhượng khoản vay nào"
          data={loanTransferData}
          onTableAction={onTableAction}
        />
    </div>
  );
}

export default LoanApplicationPage;
