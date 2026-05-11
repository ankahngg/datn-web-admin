import { EventResponse } from "@/model/Event";
import { EventPrams, getEvents } from "@/service/modules/event";
import { useQuery } from "@tanstack/react-query";

export function useEvents(options : EventPrams) {
    const { filter, pageable } = options;

    return useQuery<EventResponse, Error>({
        queryKey: ["useEvents", filter, pageable],
        queryFn: async () => {
            const data = await getEvents({
                filter: { ...filter },
                pageable: pageable
            });
            return data;
        }
    });
}

    