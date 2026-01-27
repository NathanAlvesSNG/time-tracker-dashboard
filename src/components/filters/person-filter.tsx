"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { cn } from "@/lib/utils";
import { useFilters } from "@/contexts/filters-context";

type Props = {
  options: string[];
  hasAll?: boolean;
};

export function PersonFilter({ options, hasAll = true }: Props) {
  const { person, setPerson } = useFilters();
  const [open, setOpen] = React.useState(false);

  const label = person ?? (hasAll ? "Todas as pessoas" : "Selecione");

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium">Pessoa</span>

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
            <CommandInput placeholder="Buscar pessoa..." />

            <CommandList className="max-h-60 overflow-y-auto">
              <CommandEmpty>Nenhuma pessoa encontrada</CommandEmpty>

              <CommandGroup>
                {hasAll && (
                  <CommandItem
                    value="all"
                    onSelect={() => {
                      setPerson(undefined);
                      setOpen(false);
                    }}
                  >
                    Todas
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        !person ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                )}

                {options.map((option) => (
                  <CommandItem
                    key={option}
                    value={option}
                    onSelect={() => {
                      setPerson(option);
                      setOpen(false);
                    }}
                  >
                    {option}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        person === option ? "opacity-100" : "opacity-0",
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
