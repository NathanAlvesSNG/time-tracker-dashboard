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
  hasAll?: boolean;
};

export function PersonFilter({ options, hasAll = true }: Props) {
  const { person, setPerson } = useFilters();

  const defaultSelectValue = hasAll
    ? "all"
    : options.length > 0
    ? options[0]
    : undefined;

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium">Pessoa</span>

      <Select
        value={person ?? defaultSelectValue}
        onValueChange={(v) => {
          const value = v === "all" ? undefined : (v as any);
          setPerson(value);
        }}
        defaultValue={defaultSelectValue}
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Todas as pessoas" />
        </SelectTrigger>

        <SelectContent>
          {hasAll && <SelectItem value="all">Todas</SelectItem>}
          <SelectGroup>
            <SelectLabel>Pessoa</SelectLabel>
            {options.map((person) => (
              <SelectItem key={person} value={person}>
                {person}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
