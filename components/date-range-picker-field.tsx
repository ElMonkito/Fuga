"use client";

import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths
} from "date-fns";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type DateRangePickerFieldProps = {
  departureDate: string;
  returnDate: string;
  onChange: (value: { departureDate: string; returnDate: string }) => void;
  placeholder?: string;
  minDate?: string;
  maxDate?: string;
  className?: string;
};

const weekdayLabels = ["L", "M", "M", "J", "V", "S", "D"];

function parseDateValue(value: string) {
  if (!value) return null;
  const parts = value.split("-").map((part) => Number(part));
  if (parts.length !== 3 || parts.some((part) => Number.isNaN(part))) {
    return null;
  }

  const [year, month, day] = parts;
  return new Date(year, month - 1, day, 12);
}

function formatDateValue(date: Date) {
  return format(date, "yyyy-MM-dd");
}

function formatDisplay(date: Date) {
  return new Intl.DateTimeFormat("fr-CH", {
    weekday: "short",
    day: "2-digit",
    month: "short"
  }).format(date);
}

function compareDates(left: Date, right: Date) {
  return left.getTime() - right.getTime();
}

export function DateRangePickerField({
  departureDate,
  returnDate,
  onChange,
  placeholder = "Départ - Retour",
  minDate,
  maxDate,
  className
}: DateRangePickerFieldProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const parsedDeparture = useMemo(() => parseDateValue(departureDate), [departureDate]);
  const parsedReturn = useMemo(() => parseDateValue(returnDate), [returnDate]);
  const minValue = useMemo(() => parseDateValue(minDate ?? ""), [minDate]);
  const maxValue = useMemo(() => parseDateValue(maxDate ?? ""), [maxDate]);
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState<Date>(() => startOfMonth(parsedDeparture ?? new Date()));

  useEffect(() => {
    if (parsedDeparture) {
      setCursor(startOfMonth(parsedDeparture));
    }
  }, [parsedDeparture]);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(cursor), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(cursor), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [cursor]);

  function isDisabled(date: Date) {
    if (minValue && isBefore(date, minValue)) {
      return true;
    }
    if (maxValue && isAfter(date, maxValue)) {
      return true;
    }
    return false;
  }

  function selectDate(date: Date) {
    if (!parsedDeparture || (parsedDeparture && parsedReturn)) {
      onChange({
        departureDate: formatDateValue(date),
        returnDate: ""
      });
      return;
    }

    if (compareDates(date, parsedDeparture) < 0) {
      onChange({
        departureDate: formatDateValue(date),
        returnDate: formatDateValue(parsedDeparture)
      });
      return;
    }

    onChange({
      departureDate: formatDateValue(parsedDeparture),
      returnDate: formatDateValue(date)
    });
    setOpen(false);
  }

  const buttonLabel = parsedDeparture
    ? parsedReturn
      ? `${formatDisplay(parsedDeparture)} → ${formatDisplay(parsedReturn)}`
      : `${formatDisplay(parsedDeparture)} · retour`
    : placeholder;

  return (
    <div ref={rootRef} className={cn("relative z-30", className)}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label="Période de voyage"
        className={cn(
          "flex h-11 w-full items-center gap-2 rounded-xl border border-fuga-border bg-white px-3 text-left text-sm text-fuga-midnight transition-colors hover:border-fuga-borderStrong",
          !parsedDeparture && "text-fuga-slate"
        )}
      >
        <CalendarDays className="h-4 w-4 shrink-0 text-fuga-slate" />
        <span className="min-w-0 flex-1 truncate">{buttonLabel}</span>
      </button>

      {open ? (
        <div className="absolute left-0 top-full z-50 mt-2 w-[19rem] rounded-3xl border border-fuga-border bg-white p-4 shadow-2xl">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setCursor((current) => subMonths(current, 1))}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-fuga-border text-fuga-midnight transition-colors hover:border-fuga-midnight"
              aria-label="Mois précédent"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="text-sm font-semibold capitalize text-fuga-midnight">
              {new Intl.DateTimeFormat("fr-CH", { month: "long", year: "numeric" }).format(cursor)}
            </div>

            <button
              type="button"
              onClick={() => setCursor((current) => addMonths(current, 1))}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-fuga-border text-fuga-midnight transition-colors hover:border-fuga-midnight"
              aria-label="Mois suivant"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-7 text-center text-[11px] font-medium uppercase tracking-[0.12em] text-fuga-slate">
            {weekdayLabels.map((label, index) => (
              <div key={`${label}-${index}`} className="py-2">
                {label}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day) => {
              const disabled = isDisabled(day);
              const selectedDeparture = parsedDeparture ? isSameDay(day, parsedDeparture) : false;
              const selectedReturn = parsedReturn ? isSameDay(day, parsedReturn) : false;
              const inRange =
                parsedDeparture && parsedReturn
                  ? compareDates(day, parsedDeparture) > 0 && compareDates(day, parsedReturn) < 0
                  : false;
              const muted = !isSameMonth(day, cursor);

              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  onClick={() => selectDate(day)}
                  disabled={disabled}
                  className={cn(
                    "flex h-10 items-center justify-center rounded-xl text-sm transition-colors",
                    muted && "text-fuga-slate/40",
                    disabled && "cursor-not-allowed text-fuga-slate/25",
                    inRange && "bg-fuga-orange/10 text-fuga-midnight",
                    (selectedDeparture || selectedReturn) &&
                      "bg-fuga-orange text-white hover:bg-fuga-orange",
                    !disabled && !inRange && !selectedDeparture && !selectedReturn && "hover:bg-fuga-offwhite hover:text-fuga-midnight"
                  )}
                >
                  {format(day, "d")}
                </button>
              );
            })}
          </div>

          {(minValue || maxValue) ? (
            <div className="mt-3 flex items-center justify-between text-[11px] text-fuga-slate">
              <span>{minValue ? `Min ${formatDisplay(minValue)}` : ""}</span>
              <span>{maxValue ? `Max ${formatDisplay(maxValue)}` : ""}</span>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
