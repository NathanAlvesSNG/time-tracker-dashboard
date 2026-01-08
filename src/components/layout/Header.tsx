import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "../ui/mode-toggle";
import { UserMenu } from "./user-menu";
import { ThemeSelector } from "../theme-selector";

type HeaderProps = {
  title: string;
};

export function Header({ title }: HeaderProps) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center border-b">
      <div className="flex w-full items-center px-4 lg:px-6">
        <div className="flex items-center gap-2 min-w-0">
          <SidebarTrigger className="-ml-1 shrink-0" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4 shrink-0"
          />
          <h1 className="truncate text-base font-medium">{title}</h1>
        </div>

        <div className="hidden lg:flex flex-1 justify-center">
          <UserMenu />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="lg:hidden">
            <UserMenu />
          </div>

          <ThemeSelector />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
