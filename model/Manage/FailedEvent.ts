export type FailedEvent = {
    id: number,
    eventName: string,
    event : string,
    error : string,
    isResolved: boolean,
    tryCount: number,
    timeCreated : string,
    timeResolved : string,

}

export type FailedEventResponse = {
    id: number,
    eventName: string,
    event : string,
    error : string,
    isResolved: boolean,
    tryCount: number,
    timeCreated : string,
    timeResolved : string,
}

export type FailedEventRetryResponse = {
    id: number;
    eventName: string;
    isSuccess: boolean;
    error: string;
}

export type FailedEventRetry = {
    id: number;
    eventName: string;
    isSuccess: boolean;
    error: string;
}

export type FailedEventFilter = {
    eventName ?: string;
    isResolved ?: boolean;
    fromTimeCreated?: string; // local date-time string
    toTimeCreated?: string;   // local date-time string
}

export const FAILED_EVENT_ACTIONS = "RETRY";

export type FailedEventAction = typeof FAILED_EVENT_ACTIONS[number];

export const FailedEventActionLabelMap: Record<FailedEventAction, string> = {
    RETRY: "Chạy lại",
}

export const mockFailedEvents: FailedEventResponse[] = [
    {
        id: 1,
        eventName: "AuctionFinalized",
        event: "AuctionFinalized event data",
        error: "Error message",
        isResolved: false,
        tryCount: 3,
        timeCreated: "2024-06-01T10:00:00",
        timeResolved: "",
    },
    {
        id: 2,
        eventName: "BidPlaced",
        event: "BidPlaced event data",
        error: "",
        isResolved: true,
        tryCount: 1,
        timeCreated: "2024-06-02T12:00:00",
        timeResolved: "2024-06-02T13:00:00",
    },
    {
        id: 3,
        eventName: "LoanCreated",
        event: "LoanCreated event data",
        error: "",
        isResolved: true,
        tryCount: 2,
        timeCreated: "2024-06-03T14:00:00",
        timeResolved: "2024-06-03T15:00:00",
    }
];