export type EventOffset = {
    id: number;
    contractAddress: string;
    eventName: string;
    lastProcessedBlock : bigint;
};