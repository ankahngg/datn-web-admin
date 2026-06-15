import {
  FailedEventFilter,
  FailedEventResponse,
  FailedEventRetryResponse,
  mockFailedEvents,
} from "@/model/Manage/FailedEvent";
import { Page, Pageable, request } from "../api";

export interface FailedEventParams {
  filter: FailedEventFilter;
  pageable?: Pageable;
}

export async function getFailedEvents({ filter, pageable }: FailedEventParams) {
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
    console.log(
      "Returning mock failed events with filter:",
      filter,
      "and pageable:",
      pageable,
    );
    const res = mockFailedEvents;

    return {
      content: res,
      totalElements: res.length,
      totalPages: 1,
      size: res.length,
      number: 0,
    };
  }

  const data = await request<Page<FailedEventResponse>>({
    path: "/admin/listener/failed-events",
    method: "GET",
    query: {
        ...filter,
        page: pageable?.page ?? 0,
        size: pageable?.size ?? 10,
        sort: pageable?.sort ?? "timeCreated,DESC",
    },
  });

    return data;
}

export async function retryFailedEvent(eventIds: number[]) {
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
        console.log("Mock retry failed events with eventIds:", eventIds);
        return { isSuccess: true };
    }

    const data = await request<FailedEventRetryResponse>({
        path: "/admin/listener/failed-events/retry",
        method: "POST",
        body: eventIds,
    });

    return data;
}


