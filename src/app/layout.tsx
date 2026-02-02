import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";

import { ActiveThemeProvider } from "@/components/active-theme";
import { QueryProvider } from "@/components/providers/query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/contexts/auth-context";
import { FiltersProvider } from "@/contexts/filters-context";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Dashboard - Time Tracker",
  description: "Dashboard de monitoramento de tempo e produtividade",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const activeThemeValue = cookieStore.get("active_theme")?.value;
  const isScaled = activeThemeValue?.endsWith("-scaled");

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          "bg-background overscroll-none font-sans antialiased",
          activeThemeValue ? `theme-${activeThemeValue}` : "",
          isScaled ? "theme-scaled" : "",
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          enableColorScheme
        >
          <ActiveThemeProvider initialTheme={activeThemeValue}>
            <QueryProvider>
              <AuthProvider>
                <FiltersProvider>{children}</FiltersProvider>
              </AuthProvider>
            </QueryProvider>
          </ActiveThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
