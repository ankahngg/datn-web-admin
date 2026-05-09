import { mockUsersResponse, UserFilter, UserListResponse } from "@/model/User";
import { Page, Pageable, request } from "../api";
import { mock } from "node:test";
import path from "path";

export interface UserListParams {
  filter: UserFilter;
  pageable?: Pageable;
}
export async function getUserList( {
  filter,
  pageable,
}: UserListParams) {
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
        console.log("Returning mock user list with filter:", filter, "and pageable:", pageable);
        return mockUsersResponse;
    }

    const data = await request<Page<UserListResponse>>({
        path : "/api/v1/users",
        method: "GET",
        query: {
            ...filter,
            ...pageable,
        },
    });
    return data;
}

