import { cn } from "@/lib/utils";

export function Section({
  id,
  title,
  eyebrow,
  children,
  className,
  action,
}: {
  id?: string;
  title?: string;
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-24", className)}>
      {(title || eyebrow) && (
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            {eyebrow && (
              <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-serif text-3xl tracking-tight text-balance sm:text-4xl">
                {title}
              </h2>
            )}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
