"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

const subscribe = () => () => {};
const useIsMounted = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

const options = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "system", label: "System", Icon: Laptop },
  { value: "dark", label: "Dark", Icon: Moon },
] as const;

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useIsMounted();
  const [open, setOpen] = useState(false);

  const current = mounted ? theme ?? "system" : "system";
  const Active = options.find((o) => o.value === current)?.Icon ?? Laptop;
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Change theme"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 100)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground"
      >
        <Active className="h-4 w-4" />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-1 min-w-[140px] overflow-hidden rounded-md border border-border bg-background shadow-lg"
        >
          {options.map(({ value, label, Icon }) => (
            <button
              key={value}
              role="menuitemradio"
              aria-checked={current === value}
              type="button"
              onClick={() => {
                setTheme(value);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center gap-2 px-3 py-2 text-left font-mono text-xs",
                current === value
                  ? "bg-foreground/[0.04] text-foreground"
                  : "text-muted-foreground hover:bg-foreground/[0.025] hover:text-foreground",
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
              {value === "system" && mounted && (
                <span className="ml-auto text-muted-foreground/70">
                  ({isDark ? "dark" : "light"})
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
