import { Event, EventResponse } from "@/model/Event";
import { FailedEvent, FailedEventResponse } from "@/model/Manage/FailedEvent";
import { Page } from "@/service/api";
import { EventPrams, getEvents } from "@/service/modules/event";
import { FailedEventParams, getFailedEvents } from "@/service/modules/failed-event";
import { formatDate } from "@/utils";
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

export function useEvents2(options : EventPrams) {
    const { filter, pageable } = options;

    return useQuery<Event, Error>({
        queryKey: ["useEvents2", filter, pageable],
        queryFn: async () => {
            const data = await getEvents({
                filter: { ...filter },
                pageable: pageable
            });
            var event: Event = {} as Event;
            event.eventName = data.eventName;
            event.lastProcessedBlock = data.lastProcessedBlock;
            event.data = data.data.content.map(event => ({
                ...event,
                createdAt: formatDate(event.createdAt),
            }));
            return event;
        }
    });
}


export function useFailedEvents(options : FailedEventParams) {
    const { filter, pageable } = options;

    return useQuery<Page<FailedEventResponse>, Error>({
        queryKey: ["useFailedEvents", filter, pageable],
        queryFn: async () => {
            const data = await getFailedEvents({
                filter: { ...filter },
                pageable: pageable
            });
            return data;
        }
    });
}

export function useFailedEvents2(options : FailedEventParams) {
    const { filter, pageable } = options;

    return useQuery<FailedEvent[], Error>({
        queryKey: ["useFailedEvents2", filter, pageable],
        queryFn: async () => {
            const data = await getFailedEvents({
                filter: { ...filter },
                pageable: pageable
            });
            return data.content.map(event => ({
                ...event,
                timeCreated: formatDate(event.timeCreated),
                timeResolved: formatDate(event.timeResolved),
            }));
        }
    });
}

    