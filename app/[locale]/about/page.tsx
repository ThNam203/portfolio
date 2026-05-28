import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { SkillsGrid } from "@/components/skills-grid";
import { profile } from "@/content/profile";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localizedProfile, localizedSkills } from "@/content/i18n";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) return {};
  const dict = getDictionary(raw as Locale);
  return { title: dict.about.eyebrow };
}

export default async function AboutPage({ params }: { params: Params }) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const prof = localizedProfile(locale);
  const skills = localizedSkills(locale);

  const aboutBlocks: React.ReactNode[] =
    locale === "vi"
      ? [
          <>
            Tôi là kỹ sư fullstack tại {prof.location}. Tôi thích những bài
            toán xuyên suốt cả stack — từ gói tin RTMP đến React component đến
            hóa đơn AWS. Tôi viết TypeScript và Go cho production, Java khi
            công việc đòi hỏi, và nghịch những thứ khác khi thấy thú vị.
          </>,
          <>
            Hiện tại tôi đang ở FAVOLIST5 ASIA, ship nền tảng chia sẻ nội dung
            mạng xã hội dưới dạng ~11 microservice TypeScript trên AWS ECS
            Fargate. Bên cạnh đó tôi đang xây{" "}
            <Link
              href={profile.socials.livestream}
              className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
            >
              letslive.work
            </Link>
            , nền tảng livestream kiểu Twitch — RTMP ingest, HLS đa bitrate,
            Go microservices, toàn bộ pipeline.
          </>,
          <>
            Trước đó tôi thực tập tại HPT Vietnam, xây ứng dụng chat và video
            call nội bộ qua WebRTC và WebSocket. Tôi vừa hoàn thành Cử nhân
            Kỹ thuật Phần mềm tại Trường Đại học Công nghệ Thông tin (ĐHQG-HCM).
          </>,
          <>
            Thỉnh thoảng tôi viết tại{" "}
            <Link
              href="https://www.sen1or.blog/vi"
              className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
            >
              sen1or.blog
            </Link>
            . Tôi đọc nhiều hơn viết. Hiện đang quan tâm nhất: pipeline media,
            observability hệ thống phân tán, và làm hóa đơn AWS nhỏ lại.
          </>,
        ]
      : [
          <>
            I&apos;m a fullstack engineer in {prof.location}. I like problems
            that touch the whole stack — from RTMP packets to React components
            to AWS bills. I write TypeScript and Go for production, Java when
            the job calls for it, and dabble with whatever else looks
            interesting.
          </>,
          <>
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
          </>,
          <>
            Before that I interned at HPT Vietnam, where I built an internal
            chat and video-call app over WebRTC and WebSocket. I just finished
            my Bachelor of Software Engineering at the University of
            Information Technology (VNUHCM).
          </>,
          <>
            I write occasionally at{" "}
            <Link
              href="https://www.sen1or.blog/en"
              className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
            >
              sen1or.blog
            </Link>
            . I read more than I write. Currently most interested in: media
            pipelines, distributed-systems observability, and making AWS bills
            smaller.
          </>,
        ];

  return (
    <Container size="narrow">
      <Section eyebrow={dict.about.eyebrow} title={prof.name}>
        <div className="space-y-6 text-pretty text-muted-foreground">
          {aboutBlocks.map((b, i) => (
            <p key={i} className={i === 0 ? "text-lg leading-relaxed" : "leading-relaxed"}>
              {b}
            </p>
          ))}
        </div>
      </Section>

      <Section
        eyebrow={dict.about.sectionEduEyebrow}
        title={dict.about.sectionEduTitle}
      >
        <div className="border-y border-border py-6">
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {prof.education.period}
          </div>
          <div className="mt-1 text-lg">{prof.education.degree}</div>
          <div className="text-muted-foreground">{prof.education.school}</div>
        </div>
      </Section>

      <Section
        eyebrow={dict.about.sectionCertsEyebrow}
        title={dict.about.sectionCertsTitle}
      >
        <ul className="divide-y divide-border border-y border-border">
          {prof.certifications.map((c) => (
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

      <Section
        eyebrow={dict.about.sectionSkillsEyebrow}
        title={dict.about.sectionSkillsTitle}
      >
        <SkillsGrid groups={skills} />
      </Section>
    </Container>
  );
}
