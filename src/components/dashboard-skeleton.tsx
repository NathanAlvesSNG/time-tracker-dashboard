"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="flex flex-1 flex-col pb-5 animate-pulse">
      <div className="@container/main flex flex-1 flex-col gap-4">
        <div className="border-b bg-background">
          <div className="px-4 py-3 lg:px-6 flex gap-4">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-64" />
          </div>
        </div>

        <div className="mt-2 md:mt-4 px-4 lg:px-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>

        <div className="grid *:container/main grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2">
          <Skeleton className="h-[320px] rounded-xl" />
          <Skeleton className="h-[320px] rounded-xl" />
        </div>

        <div className="px-4 lg:px-6">
          <div className="rounded-lg border overflow-hidden">
            <div className="bg-muted p-4">
              <Skeleton className="h-6 w-1/3" />
            </div>

            <div className="divide-y">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="p-4 flex gap-4">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-4 px-2">
            <Skeleton className="h-4 w-32" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
