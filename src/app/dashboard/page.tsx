"use client";

import { AppSidebar } from "@/components/layout/sidebar";
import { DashboardGeneralCards } from "@/components/dashboard-general-cards";
import { timeTracksColumns } from "@/components/data-table/columns/time-tracks.columns";
import { DataTable } from "@/components/data-table/data-table";
import { Header } from "@/components/layout/header";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TimeTrackingRow } from "@/types/time-tracking";

export default function Page() {
  const apiMock: TimeTrackingRow[] = [
    {
      person: "Nathan",
      project: "Portal BI",
      task: "Dashboard Geral",
      startTime: "2024-06-10T08:00:00Z",
      sourceSystem: "Azure DevOps",
      duration: 3600,
    },
    {
      person: "Isabela",
      project: "App Mobile",
      task: "Dashboard Geral",
      startTime: "2026-01-05T10:30:00Z",
      sourceSystem: "GLPI",
      duration: 5400,
    },
  ];

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 50)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <Header title="Dashboard Geral - Time Tracker" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <DashboardGeneralCards />
              <div className="px-4 lg:px-6">
                <DataTable columns={timeTracksColumns} data={apiMock} />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
