import { cn } from "@/lib/utils";

interface GoldDividerProps {
  className?: string;
  variant?: "line" | "diamond" | "dots";
}

export function GoldDivider({
  className,
  variant = "diamond",
}: GoldDividerProps) {
  if (variant === "line") {
    return (
      <div className={cn("flex items-center justify-center py-8", className)}>
        <div className="h-px w-full max-w-xs bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div
        className={cn(
          "flex items-center justify-center gap-2 py-8",
          className
        )}
      >
        <div className="h-1 w-1 rounded-full bg-primary/40" />
        <div className="h-1.5 w-1.5 rounded-full bg-primary/60" />
        <div className="h-2 w-2 rounded-full bg-primary" />
        <div className="h-1.5 w-1.5 rounded-full bg-primary/60" />
        <div className="h-1 w-1 rounded-full bg-primary/40" />
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-center gap-4 py-8", className)}>
      <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-primary/40" />
      <div className="h-3 w-3 rotate-45 border border-primary/40" />
      <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-primary/40" />
    </div>
  );
}
