"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Login } from "@/components/login";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (token) {
    redirect("/dashboard");
  }

  return <Login />;
}
