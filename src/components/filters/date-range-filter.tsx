"use client";

import { type DateRange } from "react-day-picker";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";

import { useFilters } from "@/contexts/filters-context";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export type DateRangeFilter = {
  from: Date | undefined;
  to: Date | undefined;
};

export function DateRangeFilter() {
  const { dateRange, setDateRange } = useFilters();

  const selected: DateRange | undefined =
    dateRange?.from || dateRange?.to
      ? { from: dateRange?.from, to: dateRange?.to }
      : undefined;

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium">Período</span>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[260px] justify-start text-left font-normal",
              !selected && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />

            {selected?.from ? (
              selected.to ? (
                <>
                  {format(selected.from, "dd/MM/yyyy", { locale: ptBR })} —{" "}
                  {format(selected.to, "dd/MM/yyyy", { locale: ptBR })}
                </>
              ) : (
                format(selected.from, "dd/MM/yyyy", { locale: ptBR })
              )
            ) : (
              <span>Selecione um período</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            numberOfMonths={2}
            defaultMonth={selected?.from}
            selected={selected}
            onSelect={(range) => {
              setDateRange({
                from: range?.from,
                to: range?.to,
              });
            }}
            locale={ptBR}
            className="rounded-lg border"
          />
        </PopoverContent>
      </Popover>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setDateRange({ from: undefined, to: undefined })}
      >
        Limpar
      </Button>
    </div>
  );
}
