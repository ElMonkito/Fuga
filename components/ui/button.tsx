import { cn } from "@/lib/utils";
import Link from "next/link";
import type { Route } from "next";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
  href?: string;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-fuga-orange text-white border border-fuga-orange hover:opacity-95 active:opacity-90",
  secondary:
    "bg-fuga-midnight text-fuga-offwhite border border-fuga-midnight hover:opacity-95",
  ghost:
    "bg-transparent text-fuga-slate border border-transparent hover:bg-black/5 hover:text-fuga-midnight",
  outline:
    "bg-white text-fuga-midnight border border-fuga-borderStrong hover:border-fuga-midnight"
};

export function Button({
  className,
  variant = "primary",
  children,
  href,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    className
  );

  if (href) {
    return (
      <Link className={classes} href={href as Route}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
