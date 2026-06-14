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
import { EventFilter } from "@/model/Events/EventFilter";
import { useEvents, useEvents2 } from "@/hooks/use-events";
import { EVENT_LABEL_MAP, EVENT_OPTIONS, EventAdminAction, EventType } from "@/model/Event";
import { EventTable } from "@/view/Event/EventTable";

function EventPage() {
    const router = useRouter();
  const [eventFilter, setEventFilter] = useState<EventFilter>({});
  
    const {
        data : eventData,
        error : eventError,
        isLoading : eventIsLoading,
    } = useEvents2({ filter: eventFilter, pageable: { page: 0, size: 10, sort: "timestamp,DESC" } });
    

  if (eventIsLoading) {
    return <FullScreenLoading />;
  }

  if (!eventData) {
    return (
      <FullScreenError message="Đã có lỗi xảy ra khi tải dữ liệu người dùng." />
    );
  }

  function onFilter(filter: EventFilter) {
    alert("Filter applied: " + JSON.stringify(filter));
    setEventFilter(filter);
  }

  function onTableAction(
    action: EventAdminAction,
    event: EventType,
  ) {
    console.log("Action:", action, "on event:", event);

    switch (action) {
        case "VIEW_DETAIL": 
            // router.push(`/event/${ev}`);
            break;
        default:
            console.warn("Unknown action:", action);
    }
  }

  return (
    <div className="space-y-6">
      <div>
                <h2 className="text-2xl font-bold mb-4">Quản lý sự kiện</h2>
            </div>
      <TableFilter<EventFilter>
        config={[
          {
            name: "eventName",
            label: "Tên sự kiện",
            type: "select",
            options: EVENT_OPTIONS,
        
            required: false,
          },
          {
            name: "txHash",
            label: "Hash giao dịch",
            type: "text",
            required: false,
          },
          {
            name: "blockNumber",
            label: "Số block",
            type: "number",
            required: false,
          },
          {
            name: "logIndex",
            label: "Log Index",
            type: "number",
            required: false,
          },
          {
            name: "eventStatus",
            label: "Trạng thái sự kiện",
            type: "select",
            options: [
                { label: "Đang chờ xử lý", value: "PROCESSING" },
                { label: "Thành công", value: "DONE" },
                { label: "Thất bại", value: "FAILED" },
            ],
            required: false,
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

        <EventTable
            title={`Danh sách sự kiện - ${EVENT_LABEL_MAP[eventData.eventName as string] || "Tất cả sự kiện"}`}
          data={eventData.data}
          onTableAction={onTableAction}
         />
    </div>
  );
}

export default EventPage;
