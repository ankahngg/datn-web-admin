import { BlockchainEventBase } from "./BlockchainEventBase";


export type WithdrawNftEvent = BlockchainEventBase & {
    id: number;
    user: string;
    nftId: bigint;
    nftAddress : string;
    tokenId : bigint;
    timestamp : bigint;
};