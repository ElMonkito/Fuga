import { cn } from "@/lib/utils";
import type { SelectHTMLAttributes } from "react";

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-11 w-full rounded-xl border border-fuga-borderStrong bg-white px-4 text-sm text-fuga-midnight outline-none transition focus:border-fuga-midnight",
        className
      )}
      {...props}
    />
  );
}
