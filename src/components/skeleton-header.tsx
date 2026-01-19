"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function HeaderSkeleton() {
  return (
    <div className="flex items-center justify-between px-4 lg:px-6 h-16 border-b">
      <Skeleton className="h-6 w-80" />
      <Skeleton className="h-8 w-24" />
    </div>
  );
}
