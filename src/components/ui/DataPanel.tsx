import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface DataPanelProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  headerRight?: ReactNode;
  variant?: "default" | "alert" | "success";
}

export function DataPanel({
  title,
  subtitle,
  children,
  className,
  headerRight,
  variant = "default",
}: DataPanelProps) {
  const variantStyles = {
    default: "border-border",
    alert: "border-status-critical glow-red",
    success: "border-primary glow-green",
  };

  return (
    <div
      className={cn(
        "data-panel overflow-hidden",
        variantStyles[variant],
        className
      )}
    >
      {(title || headerRight) && (
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div>
            {title && (
              <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-foreground">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="font-mono text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {headerRight}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}
