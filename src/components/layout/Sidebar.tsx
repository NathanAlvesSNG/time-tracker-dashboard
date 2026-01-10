"use client";

import * as React from "react";
import { IconDashboard, IconListDetails, IconUser } from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Logo from "@/images/logo.svg";
import Image from "next/image";

const data = {
  navMain: [
    {
      title: "Geral",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Individual",
      url: "/dashboard/me",
      icon: IconUser,
    },
    {
      title: "Administrativo",
      url: "/dashboard/admin",
      icon: IconListDetails,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5"
            >
              <a href="#">
                <Image src={Logo} alt="Synergroup" width={24} height={24} />
                <span className="text-foreground text-lg font-semibold">
                  Synergroup
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
