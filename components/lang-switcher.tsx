"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import { useState } from "react";
import { locales, localeShort, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

function swappedPath(pathname: string, target: Locale): string {
  const parts = pathname.split("/");
  if (parts[1] && (locales as readonly string[]).includes(parts[1])) {
    parts[1] = target;
  } else {
    parts.splice(1, 0, target);
  }
  return parts.join("/") || "/";
}

export function LangSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Switch language"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 100)}
        className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border px-2.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <Languages className="h-3.5 w-3.5" />
        {localeShort[current]}
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-1 min-w-[140px] overflow-hidden rounded-md border border-border bg-background shadow-lg"
        >
          {locales.map((l) => (
            <Link
              key={l}
              role="menuitem"
              href={swappedPath(pathname, l)}
              onClick={() => {
                document.cookie = `NEXT_LOCALE=${l}; path=/; max-age=31536000; SameSite=Lax`;
                setOpen(false);
              }}
              className={cn(
                "block px-3 py-2 font-mono text-xs",
                l === current
                  ? "bg-foreground/[0.04] text-foreground"
                  : "text-muted-foreground hover:bg-foreground/[0.025] hover:text-foreground",
              )}
            >
              {localeShort[l]} · {l === "en" ? "English" : "Tiếng Việt"}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
