"use client";
import { FullScreenLoading } from "@/components/MyComponent/FullLoadingScreen";
import { FullScreenError } from "@/components/MyComponent/FullScreenError";
import { useListenerStatus2 } from "@/hooks/use-listener";
import { ListenerActions, ListenerStatus } from "@/model/Manage/ListenerStatus";
import { restartListener, stopListener } from "@/service/modules/listener";
import ListenerStatusTable from "@/view/Listener/ListenerStatusTable";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  const { data, error, isLoading } = useListenerStatus2();

    if (isLoading) {
        return <FullScreenLoading />;
    }
    if(!data ) {
        return <FullScreenError message="Đã có lỗi xảy ra khi tải dữ liệu listener." />;
    }

    async function onTableAction(
        action: ListenerActions,
        listener: ListenerStatus,
    ) {
        console.log("Action:", action, "on listener:", listener);
        switch (action) {
            case "RESTART": 
                try {
                    await restartListener(listener.eventName);
                    alert('Khởi động lại listener thành công!');
                }
                catch (err) {
                    console.error("Failed to restart listener:", err);
                    alert('Khởi động lại listener thất bại!');
                }
                break;
            case "STOP":
                try {
                    await stopListener(listener.eventName);
                    alert('Dừng listener thành công!');
                }
                catch (err) {
                    console.error("Failed to stop listener:", err);
                    alert('Dừng listener thất bại!');
                }
                break;
            default:
                console.warn("Unknown action:", action);
        }
    }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Quản lý lắng nghe sự kiện</h2>
      </div>

      <div>
        <ListenerStatusTable
            data={data}
            onTableAction={onTableAction}
            />
      </div>
    </div>
  );
}

export default Page;
