
export type EventProcessingStatus = "PROCESSING" | "DONE" | "FAILED";
export type BlockchainEventBase = {
    txHash : string;
    blockNumber : bigint;
    logIndex : number;
    createdAt : string;
    eventStatus : EventProcessingStatus;
};

export const EventProcessingStatusVariantMap : Record<EventProcessingStatus, "warning" | "success" | "danger"> = {
    PROCESSING : "warning",
    DONE : "success",
    FAILED : "danger",
}

export const EventProcessingStatusLabelMap : Record<EventProcessingStatus, string> = {
    PROCESSING : "Đang xử lý",
    DONE : "Hoàn thành",
    FAILED : "Thất bại",
}
