import { redirect } from "next/navigation";

export default async function HomePage() {
  // Fazer a verificação de autenticação

  redirect("/dashboard");
}
