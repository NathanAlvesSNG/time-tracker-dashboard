"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilters } from "@/contexts/filters-context";

type Props = {
  options: string[];
};

export function SourceSystemFilter({ options }: Props) {
  const { sourceSystem, setSourceSystem } = useFilters();

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium">Sistema</span>
      <Select
        value={sourceSystem ?? "all"}
        onValueChange={(v) => {
          const value = v === "all" ? undefined : (v as any);
          setSourceSystem(value);
        }}
        defaultValue="all"
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Selecione um sistema" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectGroup>
            <SelectLabel>Sistema</SelectLabel>
            {options.map((system) => (
              <SelectItem key={system} value={system}>
                {system}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
