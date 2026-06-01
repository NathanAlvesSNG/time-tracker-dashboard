"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ResetPassword } from "@/components/reset-password";

export default async function ResetPasswordPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (token) {
    redirect("/dashboard");
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      }
    >
      <ResetPassword />
    </Suspense>
  );
}
