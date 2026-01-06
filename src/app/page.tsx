import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = null; // await getSession(); // Implement your session retrieval logic

  /*
  if (!session) {
    redirect("/login");
  }
  */

  redirect("/dashboard");
}
