import { ListenerStatus, ListenerStatusResponse } from "@/model/Manage/ListenerStatus";
import { getListenerStatus } from "@/service/modules/listener";
import { formatDate } from "@/utils";
import { useQuery } from "@tanstack/react-query";


export function useListenerStatus() {

    return useQuery<ListenerStatusResponse, Error>({
        queryKey: ["listenerStatus"],
        queryFn: async () => {
            const response = await getListenerStatus();
            return response;
        },
    }); 
}
