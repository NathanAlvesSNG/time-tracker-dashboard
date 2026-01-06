"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BarChart, User, Shield } from "lucide-react";
import { useSession } from "next-auth/react";

const navItems = [
  {
    label: "Dashboard Geral",
    href: "/dashboard",
    icon: BarChart,
  },
  {
    label: "Minha Produtividade",
    href: "/dashboard/me",
    icon: User,
  },
];

const adminItems = [
  {
    label: "Administração",
    href: "/dashboard/admin",
    icon: Shield,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const role = session?.user?.email;

  return (
    <aside className="w-64 border-r bg-background h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b">
        <h1 className="text-lg font-semibold tracking-tight">
          ⏱ Time Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Monitoramento de Produtividade
        </p>
      </div>

      {/* Navegação */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                isActive ? "bg-muted font-medium" : "hover:bg-muted/50"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}

        {role === "admin" && (
          <>
            <div className="mt-6 mb-2 text-xs font-semibold text-muted-foreground uppercase">
              Administração
            </div>

            {adminItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                    isActive ? "bg-muted font-medium" : "hover:bg-muted/50"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </>
        )}
      </nav>

      {/* Rodapé */}
      <div className="p-4 border-t text-xs text-muted-foreground">
        © {new Date().getFullYear()} Synergroup
      </div>
    </aside>
  );
}
