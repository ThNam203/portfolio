import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { SkillsGrid } from "@/components/skills-grid";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "About",
  description: profile.bio,
};

export default function AboutPage() {
  return (
    <Container size="narrow">
      <Section eyebrow="About" title={profile.name}>
        <div className="space-y-6 text-pretty text-muted-foreground">
          <p className="text-lg leading-relaxed">
            I&apos;m a fullstack engineer in {profile.location}. I like
            problems that touch the whole stack — from RTMP packets to React
            components to AWS bills. I write TypeScript and Go for production,
            Java when the job calls for it, and dabble with whatever else looks
            interesting.
          </p>
          <p className="leading-relaxed">
            Right now I&apos;m at FAVOLIST5 ASIA, shipping a social
            content-sharing platform built as ~11 TypeScript microservices on
            AWS ECS Fargate. On the side I&apos;m building{" "}
            <Link
              href={profile.socials.livestream}
              className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
            >
              letslive.work
            </Link>
            , a Twitch-like livestreaming platform — RTMP ingest, multi-bitrate
            HLS, Go microservices, the whole pipeline.
          </p>
          <p className="leading-relaxed">
            Before that I interned at HPT Vietnam, where I built an internal
            chat and video-call app over WebRTC and WebSocket. I just finished
            my Bachelor of Software Engineering at the University of
            Information Technology (VNUHCM).
          </p>
          <p className="leading-relaxed">
            I write occasionally at{" "}
            <Link
              href={profile.socials.blog}
              className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
            >
              sen1or.blog
            </Link>
            . I read more than I write. Currently most interested in: media
            pipelines, distributed-systems observability, and making AWS bills
            smaller.
          </p>
        </div>
      </Section>

      <Section eyebrow="Education" title="Education.">
        <div className="border-y border-border py-6">
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {profile.education.period}
          </div>
          <div className="mt-1 text-lg">{profile.education.degree}</div>
          <div className="text-muted-foreground">{profile.education.school}</div>
        </div>
      </Section>

      <Section eyebrow="Certifications" title="Certifications.">
        <ul className="divide-y divide-border border-y border-border">
          {profile.certifications.map((c) => (
            <li
              key={c.name}
              className="flex items-center justify-between py-4"
            >
              <span className="text-foreground">{c.name}</span>
              <span className="font-mono text-sm text-muted-foreground">
                {c.score}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Skills" title="What I work with.">
        <SkillsGrid />
      </Section>
    </Container>
  );
}
