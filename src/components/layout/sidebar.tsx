"use client";

import {
  IconClock,
  IconDashboard,
  IconLayoutDashboard,
  IconListCheck,
  IconListDetails,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";
import Image from "next/image";
import type * as React from "react";
import { NavAdmin } from "@/components/nav-admin";
import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/auth-context";
import Logo from "@/images/logo.svg";

const data = {
  navMain: [
    {
      title: "Geral",
      url: "/dashboard",
      icon: IconLayoutDashboard,
    },
    {
      title: "Individual",
      url: "/dashboard/me",
      icon: IconUser,
    },
    {
      title: "Apontamentos",
      url: "https://sngtimetrackersite.sng.com.br/index.html",
      icon: IconClock,
    },
    {
      title: "Todas Tarefas",
      url: "/dashboard/alltasks",
      icon: IconListCheck,
    },
  ],

  navAdmin: [
    {
      name: "Visão Geral",
      url: "/dashboard/admin",
      icon: IconDashboard,
    },
    {
      name: "Produtividade",
      url: "/dashboard/admin/productivity",
      icon: IconListDetails,
    },
    {
      name: "Colaboradores",
      url: "/dashboard/admin/users",
      icon: IconUsers,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();

  const isAdmin = user?.role === "admin";

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
        {isAdmin && <NavAdmin items={data.navAdmin} />}
      </SidebarContent>
    </Sidebar>
  );
}
