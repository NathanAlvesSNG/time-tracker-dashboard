"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFilters } from "@/contexts/filters-context";
import { cn } from "@/lib/utils";

export type DateRangeFilter = {
  from: Date | undefined;
  to: Date | undefined;
};

type DateRangeFilterProps = {
  defaultValue?: DateRangeFilter;
};

export function DateRangeFilter({ defaultValue }: DateRangeFilterProps) {
  const { dateRange, setDateRange } = useFilters();
  const [tempDateRange, setTempDateRange] = useState<DateRangeFilter>({
    from: dateRange?.from,
    to: dateRange?.to,
  });
  const [open, setOpen] = useState(false);
  const hasSetDefault = useRef(false);

  useEffect(() => {
    if (!defaultValue) return;
    if (hasSetDefault.current) return;

    hasSetDefault.current = true;

    const from = defaultValue.from ? new Date(defaultValue.from) : undefined;
    const to = defaultValue.to ? new Date(defaultValue.to) : undefined;

    if (from) from.setHours(12, 0, 0, 0);
    if (to) to.setHours(12, 0, 0, 0);

    setDateRange({ from, to });
  }, [defaultValue, setDateRange]);

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium">Período</span>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-65 justify-start text-left font-normal",
              !dateRange?.from && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />

            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "dd/MM/yyyy", { locale: ptBR })} —{" "}
                  {format(dateRange.to, "dd/MM/yyyy", { locale: ptBR })}
                </>
              ) : (
                format(dateRange.from, "dd/MM/yyyy", { locale: ptBR })
              )
            ) : (
              <span>Selecione um período</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-3" align="start">
          <Calendar
            mode="range"
            numberOfMonths={2}
            defaultMonth={tempDateRange?.from}
            selected={tempDateRange}
            onSelect={(range) => {
              setTempDateRange({
                from: range?.from,
                to: range?.to,
              });
            }}
            locale={ptBR}
            className="rounded-lg border"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            💡 Clique duas vezes em uma data para alterar o início do período
          </p>

          <div className="mt-3 flex justify-end gap-2 border-t pt-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setTempDateRange({
                  from: dateRange?.from,
                  to: dateRange?.to,
                });
                setOpen(false);
              }}
            >
              Cancelar
            </Button>

            <Button
              size="sm"
              onClick={() => {
                setDateRange({
                  from: tempDateRange?.from,
                  to: tempDateRange?.to,
                });
                setOpen(false);
              }}
              disabled={!tempDateRange?.from}
            >
              Confirmar
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
