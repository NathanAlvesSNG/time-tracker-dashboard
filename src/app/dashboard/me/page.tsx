"use client";

import { AppSidebar } from "@/components/layout/sidebar";
import { DashboardGeneralCards } from "@/components/dashboard-general-cards";
import { Header } from "@/components/layout/header";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DashboardPersonalCards from "@/components/dashboard-personal-cards";
import { UserDailyHoursBarChart } from "@/components/charts/user-hours-bar-chart";
import { DailyHours } from "@/types/api";
import ProductivityPerDayLineChart from "@/components/charts/productivity-per-day-line-chart";
import { DataTable } from "@/components/data-table/data-table";

export default function Page() {
  const data: DailyHours[] = [
    { date: "2024-06-01", available: 5, worked: 4 },
    { date: "2024-06-02", available: 6, worked: 5 },
    { date: "2024-06-03", available: 4, worked: 3 },
    { date: "2024-06-04", available: 7, worked: 6 },
    { date: "2024-06-05", available: 5, worked: 5 },
    { date: "2024-06-06", available: 6, worked: 4 },
    { date: "2024-06-07", available: 5, worked: 5 },
  ];

  const productivityData = [
    { date: "2024-06-01", productivity: 80 },
    { date: "2024-06-02", productivity: 83 },
    { date: "2024-06-03", productivity: 85 },
    { date: "2024-06-04", productivity: 90 },
    { date: "2024-06-05", productivity: 88 },
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
        <div className="flex flex-1 flex-col pb-5">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <DashboardPersonalCards />
            </div>
            <div className="grid *:container/main grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2">
              <UserDailyHoursBarChart data={data} />
              <ProductivityPerDayLineChart data={productivityData} />
            </div>
            // TODO: Insert datatable
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
