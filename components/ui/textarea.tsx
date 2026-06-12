import { cn } from "@/lib/utils";
import type { TextareaHTMLAttributes } from "react";

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full rounded-xl border border-fuga-borderStrong bg-white px-4 py-3 text-sm text-fuga-midnight outline-none transition placeholder:text-fuga-slate/70 focus:border-fuga-midnight",
        className
      )}
      {...props}
    />
  );
}
