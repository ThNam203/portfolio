export type SkillGroup = { label: string; items: string[] };

export const skills: SkillGroup[] = [
  { label: "Languages", items: ["TypeScript", "JavaScript", "Go", "Java"] },
  { label: "Frontend", items: ["React", "Next.js", "Vue", "Nuxt", "HTML", "CSS", "Tailwind"] },
  { label: "Backend", items: ["Node.js", "Express", "NestJS", "Spring Boot", "REST", "WebSocket", "WebRTC"] },
  { label: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"] },
  {
    label: "AWS",
    items: ["ECS Fargate", "ECR", "EC2", "Lambda", "SES", "SNS", "S3", "Cognito", "Route 53", "CloudWatch", "Transcribe"],
  },
  {
    label: "Infra / Tooling",
    items: ["Docker", "Docker Compose", "Nginx", "Kong", "Consul", "GitHub Actions", "FFmpeg", "MinIO"],
  },
  { label: "Observability", items: ["OpenTelemetry", "Grafana", "Tempo", "Loki", "CloudWatch"] },
  { label: "Others", items: ["Microservices", "Design Patterns", "Git", "Postman", "English (TOEIC 940)"] },
];
