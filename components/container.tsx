import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  size = "default",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}) {
  const max = size === "narrow" ? "max-w-3xl" : size === "wide" ? "max-w-6xl" : "max-w-5xl";
  return (
    <div className={cn("mx-auto w-full px-6", max, className)}>{children}</div>
  );
}
