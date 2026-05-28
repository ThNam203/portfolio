import type { SkillGroup } from "@/content/skills";

export function SkillsGrid({ groups }: { groups: SkillGroup[] }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      {groups.map((group) => (
        <div key={group.label} className="border-t border-border pt-6">
          <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {group.label}
          </h3>
          <ul className="flex flex-wrap gap-1.5">
            {group.items.map((s) => (
              <li
                key={s}
                className="rounded border border-border px-2 py-1 font-mono text-xs text-foreground"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
