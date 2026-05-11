import { BlockchainEventBase } from "./BlockchainEventBase";

export type DepositEtherEvent = BlockchainEventBase & {
    id: number;
    user: string;
    amount: bigint;
    timestamp : bigint;
};