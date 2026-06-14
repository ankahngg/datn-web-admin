"use client";
import { Bell, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { logout } from "@/service/modules/auth";




function Header() {
  
  async function handleLogout() {
    try {
      await logout();
      alert("Đăng xuất thành công!");
      window.location.href = "/login";
    }
    catch (err) {
      console.error("Logout error:", err);
      alert("Đăng xuất thất bại!");
      return;
    }
  }

  return (
    <div className="flex justify-end border-b-2 border-(--devider-color) pt-5 pb-3">
    
        <div className="flex items-center gap-4">
          <Bell />

          {/* Divider */}
          <div className="h-6 w-0.5 bg-(--devider-color)" />

          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm font-medium">Admin</div>
              <div className="text-xs text-sidebar-foreground">Quản trị viên</div>
            </div>
            <Button className="my-btn" 
              onClick={handleLogout}
            >
              <LogOut />
            </Button>
          </div>
        </div>
      </div>
  );
}

export default Header;
