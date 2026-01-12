"use client";

import TotalHoursPerPersonPerProjectBarChart from "@/components/charts/total-hours-per-person-per-project-bar-chart";
import WorkedHoursPerDayLineChart from "@/components/charts/worked-hours-per-day-line-chart";
import WorkedHoursPerPersonBarChart from "@/components/charts/worked-hours-per-person";
import { WorkedHoursPerProjectBarChart } from "@/components/charts/worked-hours-per-project-bar-chart";
import DashboardGlpiCards from "@/components/dashboard-glpi-cards";
import { DashboardFilters } from "@/components/layout/dashboard-filters";
import { Header } from "@/components/layout/header";
import { AppSidebar } from "@/components/layout/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useFilters } from "@/contexts/filters-context";

import {
  totalHoursPerPersonPerProjectData,
  workedHoursPerDayData,
  workedHoursPerPersonBarChartData,
  workedHoursPerProjectData,
} from "./mockData";

export default function Page() {
  const { sourceSystem } = useFilters();
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 64)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <Header title="Dashboard Geral - Time Tracker" />
        <div className="flex flex-1 flex-col pb-5">
          <div className="@container/main flex flex-1 flex-col gap-4">
            <div className="border-b bg-background">
              <div className="px-4 py-3 lg:px-6">
                <DashboardFilters
                  sourceSystems={["Azure DevOps", "GLPI"]}
                  projects={["Projeto 1", "Projeto 2", "Projeto 3"]}
                  persons={["Nathan", "Isabela", "Fernanda"]}
                  showSourceSystem
                  showDateRange
                  showPerson
                  showProject
                />
              </div>
            </div>
            {sourceSystem === "GLPI" && (
              <div className="flex flex-col pb-4 px-4 lg:px-6">
                <DashboardGlpiCards />
              </div>
            )}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-2 px-4 lg:px-6">
              <WorkedHoursPerDayLineChart data={workedHoursPerDayData} />
              <WorkedHoursPerPersonBarChart
                data={workedHoursPerPersonBarChartData}
              />
              {sourceSystem === "Azure DevOps" && (
                <>
                  <TotalHoursPerPersonPerProjectBarChart
                    data={totalHoursPerPersonPerProjectData}
                  />
                  <WorkedHoursPerProjectBarChart
                    data={workedHoursPerProjectData}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
