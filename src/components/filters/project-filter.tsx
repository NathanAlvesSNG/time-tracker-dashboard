"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

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
import { cn } from "@/lib/utils";
import { useFilters } from "@/contexts/filters-context";

type Props = {
  options: string[];
};

export function ProjectFilter({ options }: Props) {
  const { project, setProject } = useFilters();
  const [open, setOpen] = useState(false);

  const selectedLabel = project ?? "Todos os projetos";

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium">Projeto</span>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-48 justify-between"
          >
            <span className="truncate">{selectedLabel}</span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-56 p-0">
          <Command>
            <CommandInput placeholder="Buscar projeto..." />

            <CommandList className="max-h-60 overflow-y-auto scrollbar-thin">
              <CommandEmpty>Nenhum projeto encontrado</CommandEmpty>

              <CommandGroup>
                <CommandItem
                  value="all"
                  onSelect={() => {
                    setProject(undefined);
                    setOpen(false);
                  }}
                >
                  Todos
                </CommandItem>

                {options.map((option) => (
                  <CommandItem
                    key={option}
                    value={option}
                    onSelect={() => {
                      setProject(option);
                      setOpen(false);
                    }}
                  >
                    {option}
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
