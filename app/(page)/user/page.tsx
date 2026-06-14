"use client";

import { FullScreenLoading } from "@/components/MyComponent/FullLoadingScreen";
import { FullScreenError } from "@/components/MyComponent/FullScreenError";
import { useGetUsers, useGetUsers2 } from "@/hooks/use-get-users";

import { User, UserFilter } from "@/model/User";
import { TableFilter } from "@/components/data-table/TableFilter";
import { useState } from "react";
import UserTable from "@/view/User/UserTable";

function UserMainPage() {
    const [userFilter, setUserFilter] = useState<UserFilter>({});
    const { data: userData, error:userError, isLoading:userIsLoading } = useGetUsers2({ filter: userFilter, pageable: { page: 0, size: 10 } });

    if (userIsLoading) {
        return <FullScreenLoading />;
    }

    if (userError || !userData) {
        return <FullScreenError message="Đã có lỗi xảy ra khi tải dữ liệu người dùng." />;
    }

    function onFilter(filter: UserFilter) {
        console.log("Applying filter:", filter);
        setUserFilter(filter);
    }

    

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold mb-4">Quản lý người dùng</h2>
            </div>
            <TableFilter<UserFilter>
                config={[
                    {
                        name: "walletAddress",
                        label: "Địa chỉ ví",
                        type: "text",
                        required: false,
                    },
                    {
                        name: "name",
                        label: "Tên người dùng",
                        type: "text",
                        required: false,
                    },
                    {
                        name: "email",
                        label: "Email",
                        type: "text",
                        required: false,
                    },
                    {
                        name: "phone",
                        label: "Số điện thoại",
                        type: "text",
                        required: false,
                    },
                    {
                        name: "fromTimeCreated",
                        label: "Ngày tạo từ",
                        type: "date",
                        required: false,
                    },
                    {
                        name: "toTimeCreated",
                        label: "Ngày tạo đến",
                        type: "date",
                        required: false,
                    },
                ]}

                onFilter={(filter:UserFilter) => onFilter(filter)}
             />

            <UserTable
                title="Danh sách người dùng"
                emptyText="Chưa có người dùng nào"
                data={userData}
            />
        </div>

        
    );
}

export default UserMainPage;