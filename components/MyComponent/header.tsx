"use client";
import { Bell } from "lucide-react";
import { Ellipsis } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";




function Header() {
  
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
              <div className="text-sm font-medium">User 1</div>
              <div className="text-xs text-sidebar-foreground">Người dùng</div>
            </div>
            <Ellipsis className="ml-2" />
          </div>
        </div>
      </div>
  );
}

export default Header;
