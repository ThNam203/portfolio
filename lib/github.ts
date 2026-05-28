export type Repo = {
  name: string;
  fullName: string;
  description: string | null;
  url: string;
  homepage: string | null;
  stars: number;
  forks: number;
  language: string | null;
  topics: string[];
  pushedAt: string;
};

const HEADERS: HeadersInit = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  ...(process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
};

const USERNAME = "ThNam203";

export async function fetchUserRepos(): Promise<Repo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=pushed`,
      {
        headers: HEADERS,
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return [];
    const raw = (await res.json()) as Array<{
      name: string;
      full_name: string;
      description: string | null;
      html_url: string;
      homepage: string | null;
      stargazers_count: number;
      forks_count: number;
      language: string | null;
      topics: string[];
      pushed_at: string;
      fork: boolean;
      archived: boolean;
    }>;
    return raw
      .filter((r) => !r.fork && !r.archived)
      .map((r) => ({
        name: r.name,
        fullName: r.full_name,
        description: r.description,
        url: r.html_url,
        homepage: r.homepage,
        stars: r.stargazers_count,
        forks: r.forks_count,
        language: r.language,
        topics: r.topics ?? [],
        pushedAt: r.pushed_at,
      }));
  } catch {
    return [];
  }
}

export async function fetchUserProfile() {
  try {
    const res = await fetch(`https://api.github.com/users/${USERNAME}`, {
      headers: HEADERS,
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return (await res.json()) as {
      public_repos: number;
      followers: number;
      following: number;
      created_at: string;
      bio: string | null;
    };
  } catch {
    return null;
  }
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Go: "#00ADD8",
  Java: "#b07219",
  Python: "#3572A5",
  "C#": "#178600",
  "C++": "#f34b7d",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Lua: "#000080",
  Makefile: "#427819",
  Shell: "#89e051",
};

export function langColor(lang: string | null): string {
  if (!lang) return "#9ca3af";
  return LANG_COLORS[lang] ?? "#9ca3af";
}
