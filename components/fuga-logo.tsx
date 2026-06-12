import { cn } from "@/lib/utils";

type FugaLogoProps = {
  className?: string;
  imageClassName?: string;
};

export function FugaLogo({ className, imageClassName }: FugaLogoProps) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <img
        src="/fuga-logo.png"
        alt="FUGA"
        className={cn("block h-auto w-full", imageClassName)}
      />
    </span>
  );
}
