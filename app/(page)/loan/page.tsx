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
import { LoanAdminAction, LoanFilter, UserLoan } from "@/model/Loan";
import { useGetLoans2 } from "@/hooks/use-get-loans";
import { LoanTable } from "@/view/Loan/LoanTable";

function LoanPage() {
    const router = useRouter();
  const [loanFilter, setLoanFilter] = useState<LoanFilter>({});
  
    const {
        data: loanData,
        error: loanError,
        isLoading: loanIsLoading,
    } = useGetLoans2({ filter: loanFilter, pageable: { page: 0, size: 10, sort: "createdAt,DESC" } });

  if (loanIsLoading) {
    return <FullScreenLoading />;
  }

  if (!loanData) {
    return (
      <FullScreenError message="Đã có lỗi xảy ra khi tải dữ liệu người dùng." />
    );
  }

  function onFilter(filter: LoanFilter) {
    alert("Filter applied: " + JSON.stringify(filter));
    setLoanFilter(filter);
  }

  function onTableAction(
    action: LoanAdminAction,
    loan: UserLoan,
  ) {
    console.log("Action:", action, "on loan:", loan);

    switch (action) {
        case "VIEW_DETAIL": 
            router.push(`/loan/${loan.loanId}`);
            break;
        default:
            console.warn("Unknown action:", action);
    }
  }

  return (
    <div className="space-y-6">
      <div>
                <h2 className="text-2xl font-bold mb-4">Quản lý khoản vay</h2>
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
          // {
          //   name: "collateralAmount",
          //   label: "Số lượng tài sản thế chấp",
          //   type: "number",
          //   required: false,
          // },
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

      <LoanTable 
        loans={loanData}
        isLoading={loanIsLoading}
        onTableAction={onTableAction}
       />
    </div>
  );
}

export default LoanPage;
