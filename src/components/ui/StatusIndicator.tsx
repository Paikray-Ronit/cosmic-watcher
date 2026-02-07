import { cn } from "@/lib/utils";

export type RiskLevel = "critical" | "high" | "moderate" | "low";

interface StatusIndicatorProps {
  level: RiskLevel;
  label?: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  pulse?: boolean;
}

const levelConfig: Record<RiskLevel, { label: string; className: string }> = {
  critical: {
    label: "CRITICAL",
    className: "bg-status-critical shadow-[0_0_8px_hsl(var(--status-critical))]",
  },
  high: {
    label: "HIGH",
    className: "bg-status-high shadow-[0_0_8px_hsl(var(--status-high))]",
  },
  moderate: {
    label: "MODERATE",
    className: "bg-status-moderate shadow-[0_0_8px_hsl(var(--status-moderate))]",
  },
  low: {
    label: "LOW",
    className: "bg-status-low shadow-[0_0_8px_hsl(var(--status-low))]",
  },
};

const sizeConfig = {
  sm: "w-2 h-2",
  md: "w-3 h-3",
  lg: "w-4 h-4",
};

const textSizeConfig = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export function StatusIndicator({
  level,
  label,
  showLabel = true,
  size = "md",
  pulse = false,
}: StatusIndicatorProps) {
  const config = levelConfig[level];

  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "rounded-full",
          sizeConfig[size],
          config.className,
          pulse && "animate-pulse-glow"
        )}
      />
      {showLabel && (
        <span
          className={cn(
            "font-mono font-semibold uppercase tracking-wider",
            textSizeConfig[size],
            level === "critical" && "text-status-critical",
            level === "high" && "text-status-high",
            level === "moderate" && "text-status-moderate",
            level === "low" && "text-status-low"
          )}
        >
          {label || config.label}
        </span>
      )}
    </div>
  );
}
