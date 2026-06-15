"use client";

import { FullScreenLoading } from "@/components/MyComponent/FullLoadingScreen";
import { FullScreenError } from "@/components/MyComponent/FullScreenError";
import { useGetUsers, useGetUsers2 } from "@/hooks/use-get-users";

import { User, UserFilter } from "@/model/User";
import { TableFilter } from "@/components/data-table/TableFilter";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFailedEvents2 } from "@/hooks/use-events";
import {
  EVENT_LABEL_MAP,
  EVENT_OPTIONS,
  EventAdminAction,
  EventType,
} from "@/model/Event";
import { EventTable } from "@/view/Event/EventTable";
import { FailedEvent, FailedEventAction, FailedEventFilter } from "@/model/Manage/FailedEvent";
import { FailedEventTable } from "@/view/Event/FailedEventTable";
import { retryFailedEvent } from "@/service/modules/failed-event";

function Page() {
  const router = useRouter();
  const [failedEventFilter, setFailedEventFilter] = useState<FailedEventFilter>(
    {},
  );

  const {
    data: failedEventData,
    error: failedEventError,
    isLoading: failedEventIsLoading,
  } = useFailedEvents2({
    filter: failedEventFilter,
    pageable: { page: 0, size: 10, sort: "timeCreated,DESC" },
  });

  if (failedEventIsLoading) {
    return <FullScreenLoading />;
  }

  if (!failedEventData) {
    return (
      <FullScreenError message="Đã có lỗi xảy ra khi tải dữ liệu người dùng." />
    );
  }

  function onFilter(filter: FailedEventFilter) {
    setFailedEventFilter(filter);
  }

  async function onTableAction(action: FailedEventAction, event: FailedEvent) {
    console.log("Action:", action, "on event:", event);

    switch (action) {
      case "RETRY":
        try {
            const res = await retryFailedEvent([event.id]);
            console.log("Retry result:", res);
            if(res.isSuccess) {
              alert("Chạy lại sự kiện thành công")
            }
            else {
              alert("Chạy lại sự kiện thất bại. Vui lòng thử lại.");
            }
        }
        catch (error) {
            console.error("Failed to retry event:", error);
            alert("Đã có lỗi xảy ra khi thử lại sự kiện. Vui lòng thử lại sau.");
            return;
        }
        break;
      default:
        console.warn("Unknown action:", action);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Quản lý sự kiện thất bại</h2>
      </div>
      <TableFilter<FailedEventFilter>
        config={[
          {
            name: "eventName",
            label: "Tên sự kiện",
            type: "select",
            options: EVENT_OPTIONS,
            required: false,
          },
          {
            name: "isResolved",
            label: "Trạng thái",
            type: "select",
            options: [
              // { label: "Tất cả", value: "" },
                { label: "Đã giải quyết", value: "true" },
                { label: "Chưa giải quyết", value: "false" },
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

      <FailedEventTable
        title={`Danh sách sự kiện thất bại`}
        data={failedEventData}
        onTableAction={onTableAction}
      />
    </div>
  );
}

export default Page;
