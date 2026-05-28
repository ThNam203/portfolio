import type { Locale } from "@/i18n/config";
import { profile } from "./profile";
import { experiences, type Experience } from "./experience";
import { projects, type Project } from "./projects";
import { skills, type SkillGroup } from "./skills";

const VI = {
  profile: {
    title: "Kỹ sư phần mềm Fullstack",
    tagline: "Xây dựng hệ thống từ RTMP đến React.",
    bio: "Kỹ sư fullstack tại Thành phố Hồ Chí Minh. Tôi đưa microservices lên AWS production, thiết kế pipeline media real-time, và viết TypeScript/Go hằng ngày. Hiện làm tại FAVOLIST5 ASIA.",
    location: "Thành phố Hồ Chí Minh, Việt Nam",
    education: {
      degree: "Cử nhân Kỹ thuật Phần mềm",
      school: "Trường Đại học Công nghệ Thông tin — ĐHQG-HCM",
    },
    certifications: [
      { name: "TOEIC Nghe & Đọc", score: "940" },
      { name: "TOEIC Nói & Viết", score: "320" },
    ],
    stats: [
      { label: "Năm kinh nghiệm", value: "3+" },
      { label: "Microservices đã ship", value: "17+" },
      { label: "Tiết kiệm AWS", value: "~25%" },
      { label: "TOEIC R&L", value: "940" },
    ],
  },
  experiencesBySlug: {
    "favolist5-asia": {
      role: "Lập trình viên Fullstack",
      bullets: [
        "Xây và bảo trì nền tảng chia sẻ nội dung mạng xã hội dưới dạng ~11 microservice TypeScript trên AWS ECS Fargate.",
        "Giảm latency API bằng cách tối ưu query MySQL và lớp cache Redis với invalidation chính xác.",
        "Ship pipeline email tự động (AWS Lambda + SES + SNS) và speech-to-text real-time (AWS Transcribe streaming).",
        "Vận hành CI/CD cho 11+ service qua GitHub Actions → ECR → ECS Fargate: OIDC, blue-green deploy, rollback, image scan, smoke test.",
        "Giảm chi phí AWS ~25% nhờ scheduling ngoài giờ, right-sizing EC2/RDS, và ECR lifecycle policy.",
        "Tăng tốc workflow phát triển hằng ngày bằng Cursor và Claude Code.",
      ],
    },
    "hpt-vietnam-corporation": {
      role: "Thực tập sinh Fullstack",
      bullets: [
        "Xây ứng dụng chat và video call nội bộ cho khách hàng công ty bằng NodeJS, WebSocket, WebRTC, PostgreSQL và ReactJS.",
        "Phân tích user story, thiết kế schema database và endpoint RESTful.",
        "Tiếp cận ban đầu với kiến trúc server-side và quản lý cơ sở dữ liệu.",
      ],
    },
  } as Record<string, { role: string; bullets: string[] }>,
  projectsBySlug: {
    letslive: {
      name: "Let's Live",
      tagline:
        "Nền tảng livestream kiểu Twitch — RTMP ingest, HLS đa bitrate, Go microservices.",
      description:
        "Nền tảng livestream và VOD tự xây. OBS ingest qua RTMP, transcode thành HLS đa bitrate với latency thấp, phục vụ bởi fleet Go microservices đứng sau Kong gateway.",
      role: "Kiến trúc sư & tự phát triển",
      highlights: [
        "Thiết kế OBS (RTMP) → FFmpeg → HLS đa bitrate (360p/720p/1080p) với latency end-to-end ~10–15s.",
        "Xây 6 Go microservices (auth, user, livestream, VOD, transcode, chat) trên PostgreSQL, tích hợp qua Kong, Consul, Redis Pub-Sub.",
        "MinIO làm storage upload HLS segment để scale playback.",
        "Ship trải nghiệm live/VOD Next.js (stream key OBS, HLS player).",
        "GitHub Actions CI/CD deploy lên Docker self-hosted.",
        "OpenTelemetry + Grafana (Tempo/Loki) cho tracing và log.",
      ],
    },
    "favolist5-platform": {
      name: "FAVOLIST5 — Nền tảng Mạng xã hội",
      tagline:
        "Case study đã ẩn nội dung nội bộ: 11 microservice TypeScript trên AWS ECS Fargate.",
      description:
        "Dự án công việc chính tại FAVOLIST5 ASIA. Chỉ tóm tắt kiến trúc — không tiết lộ code nội bộ, business logic, hay chi tiết độc quyền.",
      role: "Lập trình viên Fullstack (team)",
      highlights: [
        "~11 microservice, tất cả trên ECS Fargate đứng sau ALB.",
        "Lớp cache Redis với invalidation chính xác giảm latency p95.",
        "Pipeline email tự động: Lambda + SES + SNS xử lý bounce/complaint.",
        "Speech-to-text real-time qua AWS Transcribe streaming.",
        "Blue-green deploy qua GH Actions → ECR → ECS với OIDC, rollback, image scan, smoke test.",
        "Tiết kiệm chi phí AWS ~25% nhờ scheduling ngoài giờ, right-sizing, ECR lifecycle policy.",
      ],
    },
    "store-management": {
      name: "Quản lý Cửa hàng",
      tagline:
        "Dashboard quản lý cửa hàng quy mô lớn. Next.js + Spring Boot.",
      description:
        "Website quản lý đa module cho bán lẻ: tồn kho, bán hàng, nhân sự, báo cáo.",
      role: "Lập trình viên Fullstack",
      highlights: [
        "Frontend Next.js với dashboard phân quyền theo vai trò.",
        "Backend Spring Boot REST, JWT auth, query phân trang.",
        "Module: tồn kho, POS, nhân sự, khách hàng, báo cáo.",
      ],
    },
    "food-order-website": {
      name: "Website Đặt món Ăn",
      tagline:
        "Đặt món online với cart, checkout, và admin panel.",
      description:
        "Đồ án khóa học — full flow đặt món, trải nghiệm cho khách và quản trị.",
      role: "Lập trình viên Fullstack",
      highlights: [
        "Giỏ hàng, thanh toán, lịch sử đơn.",
        "Admin panel quản lý menu và đơn hàng.",
      ],
    },
    "cloud-media": {
      name: "CloudMedia",
      tagline: "Quản lý media trên cloud.",
      description: "Dự án TypeScript quản lý và phục vụ media asset trên cloud.",
      role: "Developer",
      highlights: [
        "Flow upload/lưu trữ media.",
        "TypeScript end-to-end.",
      ],
    },
    "hpt-chat-video": {
      name: "Chat & Video nội bộ HPT",
      tagline:
        "Ứng dụng chat + video call WebRTC cho khách hàng HPT Vietnam.",
      description:
        "Đồ án thực tập tại HPT Vietnam Corporation. Công cụ giao tiếp nội bộ cho khách hàng công ty.",
      role: "Thực tập sinh",
      highlights: [
        "Video call WebRTC peer-to-peer.",
        "Chat WebSocket lưu trữ trong PostgreSQL.",
        "Thiết kế schema và endpoint REST từ user story.",
      ],
    },
  } as Record<
    string,
    { name: string; tagline: string; description: string; role: string; highlights: string[] }
  >,
  skillsLabels: {
    Languages: "Ngôn ngữ",
    Frontend: "Frontend",
    Backend: "Backend",
    Databases: "Cơ sở dữ liệu",
    AWS: "AWS",
    "Infra / Tooling": "Hạ tầng / Công cụ",
    Observability: "Observability",
    Others: "Khác",
  } as Record<string, string>,
};

export function localizedProfile(locale: Locale) {
  if (locale === "vi") {
    return {
      ...profile,
      title: VI.profile.title,
      tagline: VI.profile.tagline,
      bio: VI.profile.bio,
      location: VI.profile.location,
      education: { ...profile.education, ...VI.profile.education },
      certifications: VI.profile.certifications,
      stats: VI.profile.stats,
    };
  }
  return profile;
}

export function localizedExperiences(locale: Locale): Experience[] {
  if (locale !== "vi") return experiences;
  return experiences.map((e) => {
    const slug = e.company
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const o = VI.experiencesBySlug[slug];
    if (!o) return e;
    return { ...e, role: o.role, bullets: o.bullets };
  });
}

export function localizedProjects(locale: Locale): Project[] {
  if (locale !== "vi") return projects;
  return projects.map((p) => {
    const o = VI.projectsBySlug[p.slug];
    if (!o) return p;
    return {
      ...p,
      name: o.name,
      tagline: o.tagline,
      description: o.description,
      role: o.role,
      highlights: o.highlights,
    };
  });
}

export function localizedSkills(locale: Locale): SkillGroup[] {
  if (locale !== "vi") return skills;
  return skills.map((g) => ({
    ...g,
    label: VI.skillsLabels[g.label] ?? g.label,
  }));
}
