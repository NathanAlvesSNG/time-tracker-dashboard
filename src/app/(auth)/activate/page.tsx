"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AccountActivation } from "@/components/account-activation";

export default async function ActivatePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (token) {
    redirect("/dashboard");
  }

  return <AccountActivation />;
}
