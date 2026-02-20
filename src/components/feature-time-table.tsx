"use client";

import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  cn,
  formatHoursToHHMM,
  getDisplayPhaseName,
  getPhaseColor,
  normalizePhaseName,
  PHASE_ORDER,
} from "@/lib/utils";

type Props = {
  data: { phase: string; hours: number; project?: string }[];
  isLoading?: boolean;
};

export function FeatureTimeTable({ data, isLoading }: Props) {
  const availableProjects = Array.from(
    new Set(data.map((d) => d.project).filter(Boolean)),
  ) as string[];
  const projects = useMemo(() => availableProjects.sort(), [availableProjects]);

  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

  const phaseSummary = useMemo(() => {
    const phaseMap = new Map<string, number>();
    const isAllSelected = selectedProjects.length === 0;

    data.forEach((item) => {
      if (isAllSelected || selectedProjects.includes(item.project ?? "")) {
        const current = phaseMap.get(item.phase) ?? 0;
        phaseMap.set(item.phase, current + item.hours);
      }
    });

    const totalFiltered = Array.from(phaseMap.values()).reduce(
      (sum, hours) => sum + hours,
      0,
    );

    const withFloat = Array.from(phaseMap.entries()).map(([phase, hours]) => ({
      phase,
      hours,
      percentage: totalFiltered > 0 ? (hours / totalFiltered) * 100 : 0,
    }));

    const floored = withFloat.map((item, i) => ({
      ...item,
      percentage: Math.floor(item.percentage),
      remainder: item.percentage - Math.floor(item.percentage),
      originalIndex: i,
    }));

    const missing =
      100 - floored.reduce((sum, item) => sum + item.percentage, 0);

    floored
      .slice()
      .sort((a, b) => b.remainder - a.remainder)
      .slice(0, missing)
      .forEach((item) => {
        floored[item.originalIndex].percentage += 1;
      });

    const summary = floored.map(
      ({ remainder: _, originalIndex: __, ...item }) => item,
    );

    const normalizedOrder = PHASE_ORDER.map((p) => p.toLowerCase().trim());

    return summary.sort((a, b) => {
      const displayA = getDisplayPhaseName(a.phase).toLowerCase().trim();
      const displayB = getDisplayPhaseName(b.phase).toLowerCase().trim();

      const indexA = normalizedOrder.indexOf(displayA);
      const indexB = normalizedOrder.indexOf(displayB);

      if (indexA === -1 && indexB === -1) return 0;
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });
  }, [data, selectedProjects]);

  const stackedSegments = phaseSummary.map((item) => ({
    ...item,
    color: getPhaseColor(item.phase),
  }));

  const toggleAll = () => {
    setSelectedProjects((prev) => (prev.length === 0 ? [...projects] : []));
  };

  const selectedLabel = useMemo(() => {
    if (
      selectedProjects.length === 0 ||
      selectedProjects.length === projects.length
    ) {
      return "Todos os projetos";
    }
    if (selectedProjects.length === 1) {
      return selectedProjects[0];
    }
    return `${selectedProjects.length} projetos selecionados`;
  }, [selectedProjects, projects]);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Tempo por Fase</CardTitle>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-fit justify-between">
                {selectedLabel}
                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-55 p-0">
              <div className="p-4 pb-2">
                <div className="flex items-center space-x-2 mb-4">
                  <Checkbox
                    id="all-projects"
                    checked={
                      selectedProjects.length === 0 ||
                      selectedProjects.length === projects.length
                    }
                    onCheckedChange={toggleAll}
                  />
                  <label
                    htmlFor="all-projects"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Todos os projetos
                  </label>
                </div>

                <ScrollArea className="h-60">
                  {projects.map((project) => (
                    <div
                      key={project}
                      className="flex items-center space-x-2 py-1"
                    >
                      <Checkbox
                        id={project}
                        checked={selectedProjects.includes(project)}
                        onCheckedChange={(checked) => {
                          setSelectedProjects((prev) =>
                            checked
                              ? [...prev, project]
                              : prev.filter((p) => p !== project),
                          );
                        }}
                      />
                      <label
                        htmlFor={project}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {project}
                      </label>
                    </div>
                  ))}
                </ScrollArea>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            Carregando dados...
          </div>
        ) : phaseSummary.length === 0 ? (
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            Nenhuma fase registrada no período
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="text-sm font-medium mb-1">Distribuição total</div>
              <div className="h-6 w-full rounded-full overflow-hidden flex shadow-sm border">
                {stackedSegments.map((seg, index) => (
                  <div
                    key={index}
                    className={cn("h-full transition-all", seg.color)}
                    style={{ width: `${seg.percentage}%` }}
                    title={`${getDisplayPhaseName(seg.phase)}: ${formatHoursToHHMM(seg.hours)}hrs (${seg.percentage}%)`}
                  />
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                {stackedSegments.map((seg, index) => (
                  <div key={index} className="flex items-center gap-1.5">
                    <div className={cn("h-2 w-2 rounded-full", seg.color)} />
                    <span>
                      {getDisplayPhaseName(seg.phase)} {seg.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fase</TableHead>
                  <TableHead className="w-24 text-right">Horas</TableHead>
                  <TableHead className="w-40">% do Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {phaseSummary.map((item) => (
                  <TableRow key={item.phase}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            "h-3 w-3 rounded-full",
                            getPhaseColor(item.phase),
                          )}
                        />
                        {getDisplayPhaseName(item.phase)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {formatHoursToHHMM(item.hours)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Progress
                          value={item.percentage}
                          className="h-2 w-32"
                          indicatorClassName={getPhaseColor(item.phase)}
                        />
                        <span className="text-sm font-medium w-12 text-right">
                          {item.percentage}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </CardContent>
    </Card>
  );
}
