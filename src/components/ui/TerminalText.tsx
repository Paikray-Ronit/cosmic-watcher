import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TerminalTextProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "success" | "error" | "warning" | "muted";
  size?: "xs" | "sm" | "md" | "lg";
  blink?: boolean;
}

const variantStyles = {
  default: "text-foreground",
  success: "text-status-low",
  error: "text-status-critical",
  warning: "text-status-high",
  muted: "text-muted-foreground",
};

const sizeStyles = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export function TerminalText({
  children,
  className,
  variant = "default",
  size = "sm",
  blink = false,
}: TerminalTextProps) {
  return (
    <span
      className={cn(
        "font-mono",
        variantStyles[variant],
        sizeStyles[size],
        blink && "cursor-blink",
        className
      )}
    >
      {children}
    </span>
  );
}
