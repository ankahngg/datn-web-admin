"use client";

import { FullScreenLoading } from "@/components/MyComponent/FullLoadingScreen";
import { FullScreenError } from "@/components/MyComponent/FullScreenError";

import { User, UserFilter } from "@/model/User";
import { TableFilter } from "@/components/data-table/TableFilter";
import { useState } from "react";
import UserTable from "@/view/User/UserTable";
import { LoanApplication, LoanApplicationAdminAction, LoanApplicationFilter } from "@/model/LoanApplication";
import { useUserLoanApplications2 } from "@/hooks/use-get-loan-application";
import LoanApplicationTable from "@/view/LoanApplication/LoanApplicationTable";
import { useRouter } from "next/navigation";

function LoanApplicationPage() {
    const router = useRouter();
  const [loanApplicationFilter, setLoanApplicationFilter] =
    useState<LoanApplicationFilter>({});
  const {
    data: loanApplicationData,
    error: loanApplicationError,
    isLoading: loanApplicationIsLoading,
  } = useUserLoanApplications2({
    filter: loanApplicationFilter,
    pageable: { page: 0, size: 10, sort: "createdAt,DESC" },
  });

  if (loanApplicationIsLoading) {
    return <FullScreenLoading />;
  }

  if (loanApplicationError || !loanApplicationData) {
    return (
      <FullScreenError message="Đã có lỗi xảy ra khi tải dữ liệu người dùng." />
    );
  }

  function onFilter(filter: LoanApplicationFilter) {
    alert("Filter applied: " + JSON.stringify(filter));
    setLoanApplicationFilter(filter);
  }

  function onTableAction(
    action: LoanApplicationAdminAction,
    application: LoanApplication,
  ) {
    console.log("Action:", action, "on application:", application);

    switch (action) {
        case "VIEW_OFFERS": 
            router.push(`/loan-application/${application.applicationId}`);
            break;
        default:
            console.warn("Unknown action:", action);
    }
  }

  return (
    <div className="space-y-6">
      <div>
                <h2 className="text-2xl font-bold mb-4">Quản lý đơn vay</h2>
            </div>
      <TableFilter<LoanApplicationFilter>
        config={[
          {
            name: "borrower",
            label: "Địa chỉ Người vay",
            type: "text",
            required: false,
          },
          {
            name: "collateralType",
            label: "Loại tài sản thế chấp",
            type: "select",
            required: false,
            options: [
              { label: "ETH", value: "ETH" },
              { label: "NFT", value: "NFT" },
            ],
          },
          {
            name: "collateralAmount",
            label: "Số lượng tài sản thế chấp",
            type: "number",
            required: false,
          },
          {
            name: "nftId",
            label: "ID NFT",
            type: "text",
            required: false,
          },
        //   {
        //     name: "status",
        //     label: "Trạng thái",
        //     type: "text",
        //     required: false,
        //     options: [
        //       { label: "Đang tạo", value: "PENDING_CREATED" },
        //       { label: "Đã tạo", value: "CREATED" },
        //       { label: "Đang chấp nhận", value: "PENDING_ACCEPTED" },
        //       { label: "Đã chấp nhận", value: "ACCEPTED" },
        //       { label: "Đang hủy", value: "PENDING_CANCELED" },
        //       { label: "Đã hủy", value: "CANCELED" },
        //     ],
        //   },
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

      <LoanApplicationTable
        title="Danh sách đơn vay"
        emptyText="Chưa có đơn vay nào"
        data={loanApplicationData}
        onAction={onTableAction}
      />
    </div>
  );
}

export default LoanApplicationPage;
