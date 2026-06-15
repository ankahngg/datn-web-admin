import { EventFilter } from "@/model/Events/EventFilter";
import { LoanFilter } from "@/model/Loan";
import { Page, Pageable, request } from "../api";
import path from "path";
import { EventResponse, mockEvents } from "@/model/Event";

export interface EventPrams {
  filter: EventFilter;
  pageable?: Pageable;
}

export async function getEvents({
    filter,
    pageable,
}: EventPrams) : Promise<EventResponse> {
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
        console.log("Returning mock events with filter:", filter, "and pageable:", pageable);
        return mockEvents;
    }

    const data = await request<EventResponse>({
        path: "/admin/events",
        method: "GET",
        query: {
            ...filter,
            page: pageable?.page ?? 0,
            size: pageable?.size ?? 10,
            sort: pageable?.sort ?? "timestamp,DESC",
        },
    });
    
    return data;
}
