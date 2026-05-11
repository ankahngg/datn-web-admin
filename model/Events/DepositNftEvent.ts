import { BlockchainEventBase } from "./BlockchainEventBase";

export type DepositNftEvent = BlockchainEventBase & {
    id: number;
    owner: string;
    nftAddress: string;
    tokenId : bigint;
    nftId : bigint;
    status : bigint;
    timestamp : bigint;
};