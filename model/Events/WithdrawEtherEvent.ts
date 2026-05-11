import { BlockchainEventBase } from "./BlockchainEventBase";

export type WithdrawEtherEvent = BlockchainEventBase & {
    id: number;
    user: string;
    amount: bigint;
    timestamp : bigint;
};