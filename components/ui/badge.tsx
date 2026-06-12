import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg border border-fuga-borderStrong px-2.5 py-1 text-[11px] font-medium leading-none text-fuga-slate",
        className
      )}
      {...props}
    />
  );
}
