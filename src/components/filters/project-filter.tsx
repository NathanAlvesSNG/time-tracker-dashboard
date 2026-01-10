"use client";

import { useFilters } from "@/contexts/filters-context";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  options: string[];
};

export function ProjectFilter({ options }: Props) {
  const { project, setProject } = useFilters();

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium">Projeto</span>

      <Select
        value={project ?? "all"}
        onValueChange={(v) => {
          const value = v === "all" ? undefined : (v as any);
          setProject(value);
        }}
        defaultValue="all"
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Todas as pessoas" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">Todas</SelectItem>
          <SelectGroup>
            <SelectLabel>Projeto</SelectLabel>
            {options.map((project) => (
              <SelectItem key={project} value={project}>
                {project}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
