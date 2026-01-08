"use client";

import { cn, getProductivityUI } from "@/lib/utils";
import { Avatar } from "../ui/avatar";
// import { useSession } from "next-auth/react";

export function UserMenu() {
  // const { data: session } = useSession();
  // if (!session?.user) return null;

  const name = "Nathan Yan";
  const email = "nathan.alves@synergroup.com.br";
  const productivity = 80;

  const { emoji, border, text } = getProductivityUI(productivity);

  return (
    <div
      className={cn(
        "flex items-center rounded-lg border transition-colors",
        "p-1",
        "lg:gap-2 lg:p-2",
        border
      )}
      title={`Produtividade: ${productivity}%`}
    >
      <Avatar className="h-8 w-8">
        <span className={cn("text-2xl leading-none", text)}>{emoji}</span>
      </Avatar>

      <div className="hidden lg:flex flex-col text-left">
        <span className="text-sm font-medium leading-none">
          {name || "Usuário"}
        </span>
        <span className="text-xs text-muted-foreground">{email}</span>
      </div>
    </div>
  );
}
