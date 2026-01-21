import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeSelector } from "../theme-selector";
import { ModeToggle } from "../ui/mode-toggle";
import { UserMenu } from "./user-menu";

type HeaderProps = {
  title: string;
  isLoading?: boolean;
};

export function Header({ title, isLoading = false }: HeaderProps) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center border-b bg-background">
      <div className="flex w-full items-center gap-3 px-4 lg:px-6">
        <div className="flex min-w-0 items-center gap-2">
          <SidebarTrigger className="-ml-1 shrink-0" />
          <Separator orientation="vertical" className="h-4 shrink-0" />
          <h1 className="truncate text-base font-medium">{title}</h1>
        </div>

        <div className="hidden lg:flex flex-1 justify-center">
          <div className="flex h-9 items-center bg-background px-2">
            {isLoading ? (
              <span className="animate-pulse">Carregando produtividade...</span>
            ) : (
              <UserMenu />
            )}
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="flex h-9 items-center bg-background px-2 lg:hidden">
            {isLoading ? (
              <span className="animate-pulse">Carregando produtividade...</span>
            ) : (
              <UserMenu />
            )}
          </div>

          <ThemeSelector />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
