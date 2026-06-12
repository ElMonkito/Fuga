"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Route } from "next";
import { useEffect, useState } from "react";

type BudgetSliderProps = {
  defaultValue: number;
};

export function BudgetSlider({ defaultValue }: BudgetSliderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(defaultValue);
  const min = 120;
  const max = 5000;
  const percent = ((value - min) / (max - min)) * 100;

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  function updateBudget(value: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("budget", String(value));
    router.replace((`${pathname}?${params.toString()}` as Route));
  }

  return (
    <label className="flex items-center gap-3 rounded-2xl border border-fuga-border bg-white px-4 py-3 text-sm text-fuga-slate">
      <span className="shrink-0">Budget max</span>
      <input
        type="range"
        min={min}
        max={max}
        step={10}
        value={value}
        onChange={(event) => {
          const nextValue = Number(event.target.value);
          setValue(nextValue);
          updateBudget(nextValue);
        }}
        aria-label="Budget max"
        className="h-1 w-full appearance-none rounded-full accent-fuga-orange"
        style={{
          background: `linear-gradient(to right, #ff6a3d 0%, #ff6a3d ${Math.max(
            0,
            Math.min(100, percent)
          )}%, #d9dce6 ${Math.max(0, Math.min(100, percent))}%, #d9dce6 100%)`
        }}
      />
      <span className="shrink-0 font-medium text-fuga-midnight">{value} CHF</span>
    </label>
  );
}
