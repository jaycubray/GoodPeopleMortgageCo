import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "outline";
}

export function Badge({ variant = "primary", className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        variant === "primary" && "bg-primary/10 text-primary",
        variant === "secondary" && "bg-secondary/20 text-secondary-dark",
        variant === "outline" && "border border-gray-300 text-gray-600",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
