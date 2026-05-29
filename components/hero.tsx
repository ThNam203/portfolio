"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { profile } from "@/content/profile";
import { Container } from "./container";
import { localeHref } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero({
  locale,
  name,
  title,
  bio,
  location,
  dict,
}: {
  locale: Locale;
  name: string;
  title: string;
  bio: string;
  location: string;
  dict: Dict["hero"];
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <BgGrid />
      <Container className="relative py-24 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
        >
          <span className="inline-flex items-center gap-2">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            {dict.status}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease }}
          className="mt-6 font-serif text-5xl leading-[1.05] tracking-tight text-balance sm:text-6xl md:text-7xl"
        >
          {name}.
          <br />
          <span className="text-muted-foreground">{title}.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground"
        >
          {bio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Link
            href={localeHref(locale, "projects")}
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm text-background transition-colors hover:bg-foreground/90"
          >
            {dict.ctaProjects}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href={localeHref(locale, "contact")}
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-foreground transition-colors hover:bg-foreground/[0.04]"
          >
            {dict.ctaContact}
          </Link>
          <Link
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <GithubIcon className="h-4 w-4" />
            {dict.ctaGithub}
          </Link>
          <Link
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <LinkedinIcon className="h-4 w-4" />
            {dict.ctaLinkedin}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
          className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-muted-foreground"
        >
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {location}
          </span>
          <a href={profile.socials.email} className="hover:text-foreground">
            {profile.email}
          </a>
        </motion.div>
      </Container>
    </section>
  );
}

function BgGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]"
    >
      <svg
        className="absolute inset-0 h-full w-full text-foreground/[0.04]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}
