"use client";

import { useAuth } from "@/contexts/auth-context";
import { useFilters } from "@/contexts/filters-context";
import { useProductivity } from "@/hooks/use-productivity";
import { cn, getProductivityUI } from "@/lib/utils";

export function UserMenu() {
  const { user, isLoading } = useAuth();
  const { dateRange } = useFilters();

  const { data: productivityData } = useProductivity(
    {
      startTime: dateRange?.from?.toISOString()!,
      endTime: dateRange?.to?.toISOString()!,
    },
    { enabled: true },
  );

  if (isLoading || !user) return null;

  const { emoji, border } = getProductivityUI(
    productivityData?.productivity || 0,
  );

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-md border px-2 py-1",
        "transition-colors hover:bg-muted/50",
        border,
      )}
      title={`Produtividade: ${productivityData?.productivity}%`}
    >
      <span className="flex h-8 w-8 items-center justify-center text-[1.8rem] leading-none">
        {emoji}
      </span>

      <div className="hidden max-w-[160px] flex-col text-left lg:flex">
        <span className="truncate text-sm font-medium leading-none">
          {user.userName}
        </span>
        <span className="truncate text-xs text-muted-foreground">
          {user.userEmail}
        </span>
      </div>
    </div>
  );
}
