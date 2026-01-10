"use client";

import { createElement } from "react";
import { cn, getProductivityUI } from "@/lib/utils";

export function UserMenu() {
  const name = "Nathan Yan";
  const email = "nathan.alves@synergroup.com.br";
  const productivity = 80;

  const { icon, border } = getProductivityUI(productivity);

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-md border px-2 py-1",
        "transition-colors hover:bg-muted/50",
        border
      )}
      title={`Produtividade: ${productivity}%`}
    >
      <div className="flex items-center gap-2">
        {icon && createElement(icon, { className: "size-8" })}
      </div>

      <div className="hidden max-w-[160px] flex-col text-left lg:flex">
        <span className="truncate text-sm font-medium leading-none">
          {name || "Usuário"}
        </span>
        <span className="truncate text-xs text-muted-foreground">{email}</span>
      </div>
    </div>
  );
}
