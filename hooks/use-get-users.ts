import { User, UserFilter, UserListResponse } from "@/model/User";
import { Page, Pageable } from "@/service/api";
import { getUserList } from "@/service/modules/user";
import { useQuery } from "@tanstack/react-query";



export interface DataFilterOptions<T> {
  filter: T;
  pageable?: Pageable;
}

export function useGetUsers(options: DataFilterOptions<UserFilter>) {
    const { filter, pageable = {
        page: 0,
        size: 10,
        sort: "createdAt,DESC",
    } } = options;

    const query = useQuery<Page<UserListResponse>, Error>({
        queryKey: ["users", filter, pageable],
        queryFn: async () => {
            const response = getUserList({
                filter,
                pageable,
            });
            return response;
        }
    });

    return query;
}

export function useGetUsers2(options: DataFilterOptions<UserFilter>) {
    const { filter, pageable = {
        page: 0,
        size: 10,
        sort: "createdAt,DESC",
    } } = options;

    const query = useQuery<User[], Error>({
        queryKey: ["users", filter, pageable],
        queryFn: async () => {
            const response = await getUserList({
                filter,
                pageable,
            });

            const res: User[] = response.content.map((item) => ({
                id: item.id,
                walletAddress: item.walletAddress,
                name: item.name,
                address: item.address,
                phone: item.phone,
                email: item.email,
                createdAt: item.createdAt,
                usdcBalance: item.usdcBalance,
                ethBalance: item.ethBalance,
                nftCount: item.nftCount,
            }));

            return res;
        }
    });

    return query;
}

