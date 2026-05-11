import { EventProcessingStatus } from "./BlockchainEventBase";

export type ProcessedEvent = {
    blockNumber: number;
    txHash: string;
    logIndex: number;
    contractAddress: string;
    eventName: string;
    status: EventProcessingStatus;
    timeCreated : string;
    retryCount: number;
    createdAt: string;
}