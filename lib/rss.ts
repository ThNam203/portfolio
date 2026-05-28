import Parser from "rss-parser";

export type Post = {
  title: string;
  link: string;
  isoDate: string;
  contentSnippet?: string;
  categories?: string[];
};

const parser = new Parser();

export async function fetchBlogPosts(feedUrl: string): Promise<Post[]> {
  try {
    const res = await fetch(feedUrl, {
      next: { revalidate: 3600 },
      headers: { "User-Agent": "sen1or-portfolio/1.0" },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const feed = await parser.parseString(xml);
    return (feed.items ?? [])
      .filter((i) => i.title && i.link && i.isoDate)
      .map((i) => ({
        title: i.title!,
        link: i.link!,
        isoDate: i.isoDate!,
        contentSnippet: i.contentSnippet,
        categories: i.categories as string[] | undefined,
      }));
  } catch {
    return [];
  }
}
