"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  value: string[];
  onChange: (value: string[]) => void;
};

export function PersonFilter({ value, onChange }: Props) {
  const people = ["Ana", "Carlos", "João", "Maria"];

  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium">Pessoa</span>

      <Select
        onValueChange={(v) =>
          onChange(
            value.includes(v) ? value.filter((i) => i !== v) : [...value, v]
          )
        }
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Selecionar pessoa" />
        </SelectTrigger>
        <SelectContent>
          {people.map((p) => (
            <SelectItem key={p} value={p}>
              {p}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
