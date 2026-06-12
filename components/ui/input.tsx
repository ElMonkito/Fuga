import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-xl border border-fuga-borderStrong bg-white px-4 text-sm text-fuga-midnight outline-none transition placeholder:text-fuga-slate/70 focus:border-fuga-midnight",
        className
      )}
      {...props}
    />
  );
}
