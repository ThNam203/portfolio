export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  period: string;
  role: string;
  stack: string[];
  highlights: string[];
  links: { label: string; href: string }[];
  featured: boolean;
  caseStudy: boolean;
  repo?: string;
};

export const projects: Project[] = [
  {
    slug: "letslive",
    name: "Let's Live",
    tagline: "Twitch-like livestreaming platform — RTMP ingest, multi-bitrate HLS, Go microservices.",
    description:
      "Self-built livestreaming and VOD platform. OBS ingest via RTMP, transcoded to multi-bitrate HLS with low end-to-end latency, served by a fleet of Go microservices behind Kong gateway.",
    period: "Jan 2025 — Present",
    role: "Architect & sole developer",
    stack: [
      "Go", "Next.js", "TypeScript", "PostgreSQL", "Redis", "Kong", "Consul",
      "MinIO", "FFmpeg", "HLS", "RTMP", "OpenTelemetry", "Grafana", "Tempo", "Loki",
      "Docker", "GitHub Actions",
    ],
    highlights: [
      "Architected OBS (RTMP) → FFmpeg → multi-bitrate HLS (360p/720p/1080p) with ~10–15s end-to-end latency.",
      "Built 6 Go microservices (auth, user, livestream, VOD, transcode, chat) on PostgreSQL, integrated via Kong, Consul, Redis Pub-Sub.",
      "MinIO-backed HLS segment upload for scalable playback.",
      "Shipped Next.js live/VOD experience (OBS stream keys, HLS player).",
      "GitHub Actions CI/CD to self-hosted Docker deploy.",
      "OpenTelemetry + Grafana (Tempo/Loki) for tracing and logs.",
    ],
    links: [
      { label: "Live site", href: "https://letslive.work" },
      { label: "Repo", href: "https://github.com/ThNam203/letslive" },
    ],
    featured: true,
    caseStudy: true,
    repo: "ThNam203/letslive",
  },
  {
    slug: "favolist5-platform",
    name: "FAVOLIST5 — Social Content Platform",
    tagline: "Sanitized case study: 11 TypeScript microservices on AWS ECS Fargate.",
    description:
      "Day-job platform at FAVOLIST5 ASIA. Architecture overview only — no internal code, business logic, or proprietary details.",
    period: "May 2025 — Present",
    role: "Fullstack Developer (team)",
    stack: [
      "TypeScript", "NestJS", "Express", "Next.js", "Nuxt", "Vue", "MySQL", "Redis",
      "AWS ECS Fargate", "AWS Lambda", "AWS SES", "AWS SNS", "AWS Transcribe",
      "GitHub Actions",
    ],
    highlights: [
      "~11 microservices, all on ECS Fargate behind ALB.",
      "Redis caching layer with targeted invalidation cut p95 latency.",
      "Automated email pipeline: Lambda + SES + SNS for bounces/complaints.",
      "Real-time speech-to-text via AWS Transcribe streaming.",
      "Blue-green deploys via GH Actions → ECR → ECS with OIDC, rollback, image scans, smoke tests.",
      "AWS spend cut ~25% via off-hours scheduling, right-sizing, ECR lifecycle policies.",
    ],
    links: [],
    featured: true,
    caseStudy: true,
  },
  {
    slug: "store-management",
    name: "Store Management",
    tagline: "Massive store-management dashboard. Next.js + Spring Boot.",
    description:
      "Multi-module management website covering inventory, sales, staff, and reporting for retail stores.",
    period: "2024",
    role: "Fullstack Developer",
    stack: ["Next.js", "TypeScript", "Spring Boot", "Java", "PostgreSQL"],
    highlights: [
      "Next.js frontend with role-based dashboards.",
      "Spring Boot REST backend, JWT auth, paginated queries.",
      "Modules: inventory, POS, staff, customers, reports.",
    ],
    links: [{ label: "Repo", href: "https://github.com/ThNam203/StoreManagement" }],
    featured: true,
    caseStudy: true,
    repo: "ThNam203/StoreManagement",
  },
  {
    slug: "food-order-website",
    name: "Food Order Website",
    tagline: "Online food ordering with cart, checkout, and admin panel.",
    description: "Course project — full ordering flow, customer + admin experiences.",
    period: "2024",
    role: "Fullstack Developer",
    stack: ["TypeScript", "Next.js", "Node.js"],
    highlights: ["Cart, checkout, order history.", "Admin panel for menu and orders."],
    links: [{ label: "Repo", href: "https://github.com/ThNam203/FoodOrderWebsite" }],
    featured: false,
    caseStudy: false,
    repo: "ThNam203/FoodOrderWebsite",
  },
  {
    slug: "cloud-media",
    name: "CloudMedia",
    tagline: "Cloud-based media management.",
    description: "TypeScript project for managing and serving media assets in the cloud.",
    period: "2023",
    role: "Developer",
    stack: ["TypeScript"],
    highlights: ["Media upload/storage flow.", "TypeScript end-to-end."],
    links: [{ label: "Repo", href: "https://github.com/ThNam203/CloudMedia" }],
    featured: false,
    caseStudy: false,
    repo: "ThNam203/CloudMedia",
  },
  {
    slug: "hpt-chat-video",
    name: "HPT Internal Chat & Video",
    tagline: "WebRTC chat + video call app for HPT Vietnam clients.",
    description:
      "Internship project at HPT Vietnam Corporation. Internal communication tool for company clients.",
    period: "Jun 2024 — Nov 2024",
    role: "Intern Developer",
    stack: ["Node.js", "WebSocket", "WebRTC", "PostgreSQL", "React"],
    highlights: [
      "WebRTC peer-to-peer video calls.",
      "WebSocket-based chat with persistence in PostgreSQL.",
      "Designed schemas and REST endpoints from user stories.",
    ],
    links: [],
    featured: false,
    caseStudy: false,
  },
];
