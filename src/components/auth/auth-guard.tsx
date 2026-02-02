"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";

type AuthGuardProps = {
  children: ReactNode;
  adminOnly?: boolean;
};

export function AuthGuard({ children, adminOnly = false }: AuthGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (adminOnly && user.role !== "admin") {
      router.replace("/dashboard");
    }
  }, [isLoading, user, adminOnly, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span>Carregando...</span>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (adminOnly && user.role !== "admin") {
    return null;
  }

  return <>{children}</>;
}
