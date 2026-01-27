"use client";

import { LogOut } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useFilters } from "@/contexts/filters-context";
import { useProductivity } from "@/hooks/use-productivity";
import { cn, getProductivityUI } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserMenu() {
  const { user, isLoading, logout } = useAuth();
  const { dateRange } = useFilters();

  const { data: productivityData } = useProductivity(
    {
      startTime: dateRange?.from?.toISOString()!,
      endTime: dateRange?.to?.toISOString()!,
    },
    { enabled: !!dateRange?.from && !!dateRange?.to },
  );

  if (isLoading || !user) return null;

  const { emoji, border } = getProductivityUI(
    productivityData?.productivity || 0,
  );

  const handleLogout = async () => {
    await logout();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={cn(
            "flex cursor-pointer items-center gap-2 rounded-md border px-2 py-1",
            "transition-colors hover:bg-muted/50",
            border,
          )}
          title={`Produtividade: ${productivityData?.productivity}% \nPeríodo selecionado: ${dateRange?.from?.toLocaleDateString()} - ${dateRange?.to?.toLocaleDateString()}`}
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
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
