"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn, localeHref } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { LangSwitcher } from "./lang-switcher";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries";

type NavDict = Dict["nav"];

export function Nav({ locale, dict }: { locale: Locale; dict: NavDict }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  const links: { href: string; label: string }[] = [
    { href: localeHref(locale), label: dict.home },
    { href: localeHref(locale, "about"), label: dict.about },
    { href: localeHref(locale, "projects"), label: dict.projects },
    { href: localeHref(locale, "experience"), label: dict.experience },
    { href: localeHref(locale, "writing"), label: dict.writing },
    { href: localeHref(locale, "resume"), label: dict.resume },
    { href: localeHref(locale, "contact"), label: dict.contact },
  ];

  const homeHref = localeHref(locale);

  const isActive = (href: string) =>
    href === homeHref ? pathname === homeHref : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors backdrop-blur",
        scrolled
          ? "bg-background/80 border-b border-border"
          : "bg-background/0 border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link
          href={homeHref}
          className="font-mono text-sm tracking-tight text-foreground"
        >
          <span className="text-muted-foreground">~/</span>sen1or
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-sm transition-colors hover:text-foreground",
                isActive(l.href) ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {l.label}
            </Link>
          ))}
          <LangSwitcher current={locale} />
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <LangSwitcher current={locale} />
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background md:hidden">
          <div className="mx-auto flex max-w-5xl flex-col px-6 py-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={close}
                className={cn(
                  "py-2 text-sm",
                  isActive(l.href) ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
