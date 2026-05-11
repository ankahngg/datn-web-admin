export type EventFilter = {
    eventName ?: string;
    txHash ?: string;
    blockNumber ?: bigint;
    logIndex ?: number;
    fromTimeCreated?: string; // local date-time string
    toTimeCreated?: string;   // local date-time string
    eventStatus ?: EventProcessedStatus;
};  

export type EventProcessedStatus = "PROCESSING" | "DONE" | "FAILED";