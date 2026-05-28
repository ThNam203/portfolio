export type Experience = {
  company: string;
  role: string;
  period: string;
  start: string;
  end: string | "present";
  location?: string;
  url?: string;
  bullets: string[];
  stack: string[];
};

export const experiences: Experience[] = [
  {
    company: "FAVOLIST5 ASIA",
    role: "Fullstack Developer",
    period: "May 2025 — Present",
    start: "2025-05",
    end: "present",
    bullets: [
      "Built and maintain a social content-sharing platform as ~11 TypeScript microservices on AWS ECS Fargate.",
      "Cut API latency via MySQL query tuning and a Redis caching layer with targeted invalidation.",
      "Shipped automated email (AWS Lambda + SES + SNS) and real-time speech-to-text voice input (AWS Transcribe streaming).",
      "Ran CI/CD for 11+ services via GitHub Actions → ECR → ECS Fargate with OIDC, blue-green deploys, rollback, image scans, smoke tests.",
      "Reduced AWS spend ~25% through off-hours ECS scheduling, EC2/RDS right-sizing, and ECR lifecycle policies.",
      "Sped up daily development workflow with Cursor and Claude Code.",
    ],
    stack: [
      "TypeScript", "Vue", "Nuxt", "React", "Next.js", "NestJS", "Express",
      "MySQL", "Redis", "AWS ECS Fargate", "AWS Lambda", "AWS SES", "AWS SNS",
      "AWS Transcribe", "GitHub Actions",
    ],
  },
  {
    company: "HPT Vietnam Corporation",
    role: "Fullstack Developer Intern",
    period: "Jun 2024 — Nov 2024",
    start: "2024-06",
    end: "2024-11",
    bullets: [
      "Built an internal chat and video call application for company clients using NodeJS, WebSocket, WebRTC, PostgreSQL and ReactJS.",
      "Analyzed user stories, designed database schemas and RESTful API endpoints.",
      "Gained initial exposure to server-side architecture and database management.",
    ],
    stack: ["Node.js", "WebSocket", "WebRTC", "PostgreSQL", "React"],
  },
];
