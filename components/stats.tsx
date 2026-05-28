import { Container } from "./container";

export function Stats({
  items,
}: {
  items: readonly { label: string; value: string }[];
}) {
  return (
    <Container>
      <div className="grid grid-cols-2 gap-y-8 border-y border-border py-10 sm:grid-cols-4 sm:divide-x sm:divide-border sm:py-12">
        {items.map((s) => (
          <div key={s.label} className="px-4 text-center sm:text-left">
            <div className="font-serif text-3xl text-foreground sm:text-4xl">
              {s.value}
            </div>
            <div className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
