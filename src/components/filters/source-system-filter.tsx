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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFilters } from "@/contexts/filters-context";
import { cn } from "@/lib/utils";
import type { SourceSystem } from "@/types/api";

type Props = {
  options: string[];
};

export function SourceSystemFilter({ options }: Props) {
  const { sourceSystem, setSourceSystem } = useFilters();
  const [open, setOpen] = React.useState(false);

  const label = sourceSystem ?? "Todos os sistemas";

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium">Sistema</span>

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
            <CommandInput placeholder="Buscar sistema..." />

            <CommandList className="max-h-60 overflow-y-auto">
              <CommandEmpty>Nenhum sistema encontrado</CommandEmpty>

              <CommandGroup>
                <CommandItem
                  value="all"
                  onSelect={() => {
                    setSourceSystem(undefined);
                    setOpen(false);
                  }}
                >
                  Todos
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      !sourceSystem ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>

                {options.map((system) => (
                  <CommandItem
                    key={system}
                    value={system}
                    onSelect={() => {
                      setSourceSystem(system as SourceSystem);
                      setOpen(false);
                    }}
                  >
                    {system}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        sourceSystem === system ? "opacity-100" : "opacity-0",
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
