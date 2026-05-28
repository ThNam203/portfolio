import { experiences } from "@/content/experience";

export function Timeline() {
  return (
    <ol className="relative space-y-12 border-l border-border pl-8">
      {experiences.map((exp) => (
        <li key={`${exp.company}-${exp.start}`} className="relative">
          <span className="absolute -left-[33px] top-2 h-2 w-2 rounded-full border border-border bg-background" />
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {exp.period}
          </div>
          <h3 className="mt-1 font-serif text-2xl tracking-tight">
            {exp.role} ·{" "}
            <span className="text-muted-foreground">{exp.company}</span>
          </h3>
          <ul className="mt-4 space-y-2 text-pretty text-muted-foreground">
            {exp.bullets.map((b, i) => (
              <li key={i} className="leading-relaxed">
                <span className="mr-2 select-none text-foreground/40">›</span>
                {b}
              </li>
            ))}
          </ul>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {exp.stack.map((s) => (
              <li
                key={s}
                className="rounded border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
              >
                {s}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
