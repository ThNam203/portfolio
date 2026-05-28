export type Dict = {
  meta: { siteName: string; keywords: readonly string[] };
  nav: { home: string; about: string; projects: string; experience: string; writing: string; resume: string; contact: string };
  hero: { status: string; ctaProjects: string; ctaContact: string; ctaGithub: string };
  home: {
    selectedWork: string; projectsTitle: string; allProjects: string;
    toolbelt: string; stackTitle: string;
    githubEyebrow: string; githubTitle: string;
    writingEyebrow: string; writingTitle: string; allPosts: string;
    contactEyebrow: string; contactTitle: string; contactBlurb: string;
    sendMessage: string; viewResume: string;
  };
  about: {
    eyebrow: string;
    sectionEduEyebrow: string; sectionEduTitle: string;
    sectionCertsEyebrow: string; sectionCertsTitle: string;
    sectionSkillsEyebrow: string; sectionSkillsTitle: string;
  };
  experience: { eyebrow: string; title: string };
  projects: { eyebrow: string; title: string; backAll: string; stack: string; highlights: string };
  writing: { eyebrow: string; title: string; blurb: string; feedDown: string; visitDirect: string };
  resume: { eyebrow: string; title: string; download: string; cantView: string; openDirect: string };
  contact: {
    eyebrow: string; title: string; blurb: string; elsewhere: string;
    name: string; email: string; subject: string; message: string;
    namePh: string; emailPh: string; subjectPh: string; messagePh: string;
    send: string; sending: string;
    sentOk: string; sentAgain: string; errGeneric: string; errNetwork: string;
  };
  notFound: { code: string; title: string; blurb: string; home: string; projects: string };
  common: { sent: string; ghUnavailable: string; noPosts: string };
  footer: { builtWith: string };
};

export const en: Dict = {
  meta: {
    siteName: "Huynh Thanh Nam",
    keywords: [
      "Huynh Thanh Nam",
      "sen1or",
      "fullstack developer",
      "Next.js",
      "Go",
      "microservices",
      "AWS",
      "Vietnam",
    ],
  },
  nav: {
    home: "Home",
    about: "About",
    projects: "Projects",
    experience: "Experience",
    writing: "Writing",
    resume: "Resume",
    contact: "Contact",
  },
  hero: {
    status: "available for collaboration",
    ctaProjects: "See projects",
    ctaContact: "Get in touch",
    ctaGithub: "GitHub",
  },
  home: {
    selectedWork: "Selected work",
    projectsTitle: "Projects worth talking about.",
    allProjects: "All projects",
    toolbelt: "Toolbelt",
    stackTitle: "Stack I reach for.",
    githubEyebrow: "GitHub",
    githubTitle: "Recent activity.",
    writingEyebrow: "Writing",
    writingTitle: "From the blog.",
    allPosts: "All posts",
    contactEyebrow: "Contact",
    contactTitle: "Let's build something.",
    contactBlurb:
      "Open to fullstack roles, freelance projects, and interesting technical conversations. Best way to reach me is email — I read everything.",
    sendMessage: "Send a message",
    viewResume: "View resume",
  },
  about: {
    eyebrow: "About",
    sectionEduEyebrow: "Education",
    sectionEduTitle: "Education.",
    sectionCertsEyebrow: "Certifications",
    sectionCertsTitle: "Certifications.",
    sectionSkillsEyebrow: "Skills",
    sectionSkillsTitle: "What I work with.",
  },
  experience: {
    eyebrow: "Experience",
    title: "Where I've worked.",
  },
  projects: {
    eyebrow: "Projects",
    title: "Things I've built.",
    backAll: "All projects",
    stack: "Stack",
    highlights: "Highlights",
  },
  writing: {
    eyebrow: "Writing",
    title: "From the blog.",
    blurb:
      "I write occasionally about systems, engineering practice, and whatever I'm chewing on. Posts here are pulled live from",
    feedDown: "Couldn't pull the feed right now.",
    visitDirect: "Visit the blog directly",
  },
  resume: {
    eyebrow: "Resume",
    title: "Resume.",
    download: "Download PDF",
    cantView: "Can't view the PDF?",
    openDirect: "Open it directly",
  },
  contact: {
    eyebrow: "Contact",
    title: "Get in touch.",
    blurb:
      "Send a message and I'll reply within a couple of days. For quick stuff, email works best.",
    elsewhere: "Elsewhere",
    name: "Name",
    email: "Email",
    subject: "Subject",
    message: "Message",
    namePh: "Your name",
    emailPh: "you@domain.com",
    subjectPh: "What's this about?",
    messagePh: "Tell me what you have in mind…",
    send: "Send message",
    sending: "Sending…",
    sentOk: "Message sent. I'll get back to you soon.",
    sentAgain: "Sent. Send another?",
    errGeneric: "Something went wrong. Try email instead.",
    errNetwork: "Network error. Try email instead.",
  },
  notFound: {
    code: "404",
    title: "Lost in the wires.",
    blurb:
      "The page you were looking for doesn't exist (yet). Head back home or try the projects page.",
    home: "Home",
    projects: "Projects",
  },
  common: {
    sent: "Sent",
    ghUnavailable: "GitHub data unavailable right now.",
    noPosts: "No posts available right now. Visit",
  },
  footer: {
    builtWith: "built with Next.js.",
  },
};
