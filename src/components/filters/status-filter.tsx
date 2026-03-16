"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useFilters } from "@/contexts/filters-context";
import { cn } from "@/lib/utils";

type Props = {
  options: string[];
};

export function StatusFilter({ options }: Props) {
  const { status, setStatus } = useFilters();
  const [open, setOpen] = React.useState(false);

  const label = status ?? "Todos os status";

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium">Status</span>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-48 justify-between"
          >
            <span className="truncate">{label}</span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-56 p-0">
          <Command>
            <CommandInput placeholder="Buscar status..." />

            <CommandList className="max-h-60 overflow-y-auto">
              <CommandEmpty>Nenhum status encontrado</CommandEmpty>

              <CommandGroup>
                <CommandItem
                  value="all"
                  onSelect={() => {
                    setStatus(undefined);
                    setOpen(false);
                  }}
                >
                  Todos
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      !status ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>

                {options.map((option) => (
                  <CommandItem
                    key={option}
                    value={option}
                    onSelect={() => {
                      setStatus(option);
                      setOpen(false);
                    }}
                  >
                    {option}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        status === option ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
