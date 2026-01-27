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
import { AuthGuard } from "@/components/auth/auth-guard";
import { startOfMonth, startOfDay } from "date-fns";
import DashboardSkeleton from "@/components/dashboard-skeleton";
import { HeaderSkeleton } from "@/components/skeleton-header";
import { useMemo } from "react";
import { useFilterOptions } from "@/hooks/use-filter-options";
import { useDashboard } from "@/hooks/dashboard/use-dashboard";

export default function Page() {
  const { sourceSystem, dateRange, person, project } = useFilters();
  const { data: filterOptions, isLoading: isLoadingFilterOptions } =
    useFilterOptions();

  const startTime = dateRange?.from
    ? dateRange.from.toISOString()
    : startOfMonth(new Date()).toISOString();
  const endTime = dateRange?.to
    ? dateRange.to.toISOString()
    : startOfDay(new Date()).toISOString();

  const {
    workedHours: {
      day: workedHoursDay,
      perPerson: workedHoursPerPerson,
      perProject: workedHoursProject,
      perProjectPerson: workedHoursProjectPerson,
    },
    sla: { averageTicketSolution, highestTicketSolution, slaTicket },
    isLoading,
  } = useDashboard(
    { startTime, endTime, person, sourceSystem, project },
    {
      loadWorkedHours: true,
      loadProductivity: false,
      loadSla: true,
      loadOverview: false,
      loadPersonal: false,
    },
  );

  const personOptions = useMemo(
    () => filterOptions?.users ?? [],
    [filterOptions],
  );

  const sourceSystemOptions = useMemo(() => {
    if (!filterOptions?.services) return [];

    return Array.from(
      new Set(
        filterOptions.services.map((s) =>
          s.sourceSystem === "Azure DevOps" ? "Azure DevOps" : "IZIT",
        ),
      ),
    ).sort();
  }, [filterOptions]);

  const projectOptions = useMemo(() => {
    if (!filterOptions?.services) return [];

    return Array.from(
      new Set(filterOptions.services.map((s) => s.project)),
    ).sort();
  }, [filterOptions]);

  if (isLoading || isLoadingFilterOptions) {
    return (
      <AuthGuard>
        <SidebarProvider>
          <AppSidebar variant="inset" />
          <SidebarInset>
            <HeaderSkeleton />
            <DashboardSkeleton />
          </SidebarInset>
        </SidebarProvider>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard adminOnly>
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
                    sourceSystems={sourceSystemOptions}
                    projects={projectOptions}
                    persons={personOptions}
                    showSourceSystem
                    showDateRange
                    showPerson
                    showProject
                  />
                </div>
              </div>
              {sourceSystem === "IZIT" && (
                <div className="flex flex-col pb-4 px-4 lg:px-6">
                  <DashboardGlpiCards
                    slaTicket={slaTicket?.percentage || 0}
                    averageTicketTime={
                      averageTicketSolution?.averageSolutionTimeTicket || 0
                    }
                    highestTicketTime={
                      highestTicketSolution?.highestSolutionTimeTicket || 0
                    }
                  />
                </div>
              )}
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-2 px-4 lg:px-6">
                <WorkedHoursPerDayLineChart data={workedHoursDay || []} />
                <WorkedHoursPerPersonBarChart
                  data={workedHoursPerPerson || []}
                />
                {sourceSystem === "Azure DevOps" && (
                  <>
                    <TotalHoursPerPersonPerProjectBarChart
                      data={workedHoursProjectPerson || []}
                    />
                    <WorkedHoursPerProjectBarChart
                      data={workedHoursProject || []}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  );
}
