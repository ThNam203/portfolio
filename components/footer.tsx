import Link from "next/link";
import { profile } from "@/content/profile";
import { Mail, Rss, Radio } from "lucide-react";
import { GithubIcon } from "./icons";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} {profile.name} — built with Next.js.
        </div>
        <div className="flex items-center gap-4 text-muted-foreground">
          <Link
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hover:text-foreground"
          >
            <GithubIcon className="h-4 w-4" />
          </Link>
          <Link
            href={profile.socials.blog}
            target="_blank"
            rel="noreferrer"
            aria-label="Blog"
            className="hover:text-foreground"
          >
            <Rss className="h-4 w-4" />
          </Link>
          <Link
            href={profile.socials.livestream}
            target="_blank"
            rel="noreferrer"
            aria-label="Livestream project"
            className="hover:text-foreground"
          >
            <Radio className="h-4 w-4" />
          </Link>
          <Link
            href={profile.socials.email}
            aria-label="Email"
            className="hover:text-foreground"
          >
            <Mail className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
