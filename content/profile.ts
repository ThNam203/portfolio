export const profile = {
  name: "Huynh Thanh Nam",
  handle: "sen1or",
  title: "Fullstack Software Engineer",
  tagline: "Building scalable systems from RTMP to React.",
  bio: "Fullstack engineer based in Ho Chi Minh City. I ship production microservices on AWS, design real-time media pipelines, and write TypeScript/Go for a living. Currently at FAVOLIST5 ASIA.",
  location: "Ho Chi Minh City, Vietnam",
  email: "hthnam203@gmail.com",
  phone: "+84 373168922",
  avatar: "https://avatars.githubusercontent.com/u/84430638?v=4",
  socials: {
    github: "https://github.com/ThNam203",
    blog: "https://www.sen1or.blog/en",
    blogRss: "https://www.sen1or.blog/en/rss.xml",
    livestream: "https://letslive.work",
    email: "mailto:hthnam203@gmail.com",
  },
  education: {
    school: "University of Information Technology — VNUHCM",
    degree: "Bachelor of Software Engineering",
    period: "2021 — 2025",
  },
  certifications: [
    { name: "TOEIC Reading & Listening", score: "940" },
    { name: "TOEIC Speaking & Writing", score: "320" },
  ],
  stats: [
    { label: "Years building", value: "3+" },
    { label: "Microservices shipped", value: "17+" },
    { label: "AWS cost cut", value: "~25%" },
    { label: "TOEIC R&L", value: "940" },
  ],
} as const;

export type Profile = typeof profile;
