"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type BudgetSliderProps = {
  defaultValue: number;
};

export function BudgetSlider({ defaultValue }: BudgetSliderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  function updateBudget(value: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("budget", String(value));
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <label className="flex items-center gap-3 rounded-2xl border border-fuga-border bg-white px-4 py-3 text-sm text-fuga-slate">
      <span className="shrink-0">Budget max</span>
      <input
        type="range"
        min={120}
        max={500}
        step={5}
        value={value}
        onChange={(event) => {
          const nextValue = Number(event.target.value);
          setValue(nextValue);
          updateBudget(nextValue);
        }}
        className="h-1 w-full appearance-none rounded-full bg-fuga-borderStrong accent-fuga-orange"
      />
      <span className="shrink-0 font-medium text-fuga-midnight">{value} CHF</span>
    </label>
  );
}
