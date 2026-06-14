import { ListenerStatus, ListenerStatusResponse } from "@/model/Manage/ListenerStatus";
import { getListenerStatus } from "@/service/modules/listener";
import { formatDate } from "@/utils";
import { useQuery } from "@tanstack/react-query";


export function useListenerStatus() {

    return useQuery<ListenerStatusResponse[], Error>({
        queryKey: ["listenerStatus"],
        queryFn: async () => {
            const response = await getListenerStatus();
            return response;
        },
    }); 
}

export function useListenerStatus2() {
    return useQuery<ListenerStatus[], Error>({
        queryKey: ["listenerStatus2"],
        queryFn: async () => {
            const response = await getListenerStatus();
            return response.map(item => ({
                eventName: item.eventName,
                isRunning: item.isRunning,
                lastProcessedBlock: item.lastProcessedBlock,
                lastHeartbeat: formatDate(new Date(item.lastHeartbeat).toLocaleString()),
            }));
        }
    })
}