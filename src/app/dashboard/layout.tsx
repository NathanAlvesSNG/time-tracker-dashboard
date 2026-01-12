import { redirect } from "next/navigation";
import { Header } from "@/components/layout/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = null; // Implement your session retrieval logic

  /*
  if (!session) {
    redirect("/login");
  }
  */

  return (
    <div className="dashboard-layout">
      <main className="dashboard-content">{children}</main>
    </div>
  );
}
