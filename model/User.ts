import { Page } from "@/service/api";
import { UserNFTResponseStatus } from "./enum";


export interface User {
    id: number;
    walletAddress: string;
    name: string;
    address: string;
    phone: string;
    email : string;
    createdAt: string;
    usdcBalance : bigint;
    ethBalance : bigint;
    nftCount: number;
}

export interface UserListResponse {
    id: number;
    walletAddress: string;
    name: string;
    address: string;
    phone: string;
    email : string;
    createdAt: string;
    usdcBalance : bigint;
    ethBalance : bigint;
    nftCount: number; 
}

export interface UserFilter {
    walletAddress?: string;
    name?: string;
    email?: string;
    phone?: string;
    fromTimeCreated?: string;
    toTimeCreated?: string;
}

export interface UserBalanceResponse {
  userWalletAddress : string;
  usdcBalance: bigint;
  ethBalance: bigint;
} 

export interface UserBalance {
  userWalletAddress : string;
  usdcBalance: bigint;
  ethBalance: bigint;
}

export interface UserNftFilter {
    user?: string;
    nftAddress?: string;
    fromTimeCreated?: string; // ISO string
    toTimeCreated?: string; // ISO string
}

export interface UserNftResponse {
  id  : number;
  nftId: bigint;
  user : string;
  nftAddress: string;
  tokenId : bigint;
 status : UserNFTResponseStatus
    timeCreated: string;
    timeWithdrawn ?: string;
    createdAt: string;
}

export const mockUsersResponse: Page<UserListResponse> = {
     content: [
            {
                id: 1,
                walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
                name: "Nguyen Van A",
                address: "123 Le Loi, District 1, HCM City",
                phone: "0909123456",
                email: "",
                createdAt: "2024-01-01T12:00:00Z",
                usdcBalance: BigInt(1000000), // 1,000,000 USDC
                ethBalance: BigInt(500000000000000000), // 0.5 ETH  
                nftCount: 2, // Số lượng NFT sở hữu
            },
            {
                id: 2,
                walletAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
                name: "Tran Thi B",
                address: "456 Nguyen Hue, District 1, HCM City",
                phone: "0909876543",
                email: "",
                createdAt: "2024-02-15T08:30:00Z",  
                usdcBalance: BigInt(2500000), // 2,500,000 USDC
                ethBalance: BigInt(2000000000000000000), // 2 ETH
                nftCount: 5, // Số lượng NFT sở hữu
            },
            {
                id: 3,
                walletAddress: "0x7890abcdef1234567890abcdef1234567890abcd",
                name: "Le Van C",
                address: "789 Pasteur, District 3, HCM City",
                phone: "0909988776",
                email: "",
                createdAt: "2024-03-10T15:45:00Z",  
                usdcBalance: BigInt(500000), // 500,000 USDC
                ethBalance: BigInt(100000000000000000), // 0.1 ETH
                nftCount: 0, // Số lượng NFT sở hữu
            },
        ],
    totalElements: 3,
    totalPages: 1,
    size: 10,
    number: 0

}

export const mockBalance: UserBalanceResponse = {
  userWalletAddress: "0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097",
  usdcBalance: BigInt("1000000000"), // 1000 USDC with 6 decimals
  ethBalance: BigInt("50000000000000000"), // 0.05 ETH with 18 decimals
};


export const mockNftsResponse: Page<UserNftResponse> = {
  content: [
    {
      id: 1,
        nftId: BigInt("1001"),
        user: "0x1234...abcd",
        nftAddress: "0x5678...efgh",
        tokenId: BigInt("1"),
        status: "DEPOSITED",
        timeCreated: "2024-01-01T12:00:00Z",
        createdAt: "2024-01-01T12:00:00Z",
    },
    {
      id: 2,
        nftId: BigInt("1002"),
        user: "0x1234...abcd",
        nftAddress: "0x5678...efgh",
        tokenId: BigInt("2"),
        status: "PENDING_DEPOSIT",
        timeCreated: "2024-01-02T12:00:00Z",
        createdAt: "2024-01-02T12:00:00Z",
    },
  ],
  totalElements: 2,
    totalPages: 1,
    size: 10,
    number: 0,
};
