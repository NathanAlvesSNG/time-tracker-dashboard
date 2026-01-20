"use client";

import { type ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

type AuthGuardProps = {
  children: ReactNode;
  adminOnly?: boolean;
};

export function AuthGuard({ children, adminOnly = false }: AuthGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [isLoading, user, router]);

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
    return (
      <div className="flex h-screen items-center justify-center">
        <span>Você não tem permissão para acessar essa página.</span>
      </div>
    );
  }

  return <>{children}</>;
}
