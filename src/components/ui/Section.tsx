import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "default" | "primary" | "light" | "dark";
}

export function Section({ variant = "default", className, children, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        "py-16 md:py-24 px-4",
        variant === "default" && "bg-white",
        variant === "primary" && "bg-primary text-white",
        variant === "light" && "bg-gray-50",
        variant === "dark" && "bg-primary-darker text-white",
        className
      )}
      {...props}
    >
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}
