import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <Container size="narrow">
      <div className="flex min-h-[60vh] flex-col items-start justify-center py-24">
        <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          404
        </div>
        <h1 className="mt-2 font-serif text-5xl tracking-tight">
          Lost in the wires.
        </h1>
        <p className="mt-3 max-w-md text-pretty text-muted-foreground">
          The page you were looking for doesn&apos;t exist (yet). Head back
          home or try the projects page.
        </p>
        <div className="mt-8 flex gap-3">
          <Link
            href="/"
            className="rounded-full bg-foreground px-5 py-2.5 text-sm text-background"
          >
            Home
          </Link>
          <Link
            href="/projects"
            className="rounded-full border border-border px-5 py-2.5 text-sm"
          >
            Projects
          </Link>
        </div>
      </div>
    </Container>
  );
}
