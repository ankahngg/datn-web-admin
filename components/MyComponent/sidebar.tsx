"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Landmark, Scale } from "lucide-react";
import { FileText } from "lucide-react";
import { ChartColumn } from 'lucide-react';
import { HandCoins } from 'lucide-react';
import { Banknote } from 'lucide-react';
import { Boxes } from 'lucide-react';
import Link from "next/link";

function Leftbar() {
  return (
    <Sidebar>
      <div className="p-4">
        <SidebarHeader className="text-xl text-sidebar-primary-foreground font-mono
        border-b-2 border-(--devider-color) pb-4 flex-row">
          <Boxes className="mr-2" />
          Lending Web Admin
        </SidebarHeader>
        <SidebarContent className="mt-8">
         
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/user" className="font-heading">
                  <ChartColumn className="mr-2" />
                  Người dùng
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/loan-application" className="font-heading">
                  <Landmark className="mr-2" />
                  Đơn vay
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/loan" className="font-heading">
                  <FileText className="mr-2" />
                  Khoản vay
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/loan-transfer" className="font-heading">
                  <HandCoins className="mr-2" />
                  Chuyển nhượng vay
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/auction" className="font-heading">
                    <Scale className="mr-2" />
                    Đấu giá
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/event" className="font-heading">
                  <Banknote className="mr-2" />
                  Event
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/config" className="font-heading">
                  <Banknote className="mr-2" />
                  Cấu hình
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter />
      </div>
    </Sidebar>
  );
}

export default Leftbar;
