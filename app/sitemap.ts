import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { locales } from "@/i18n/config";
import { siteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/about", "/projects", "/experience", "/writing", "/resume", "/contact"];
  const caseStudySlugs = projects.filter((p) => p.caseStudy).map((p) => p.slug);

  const out: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const p of pages) {
      out.push({
        url: `${siteUrl}/${locale}${p}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: p === "" ? 1.0 : 0.7,
      });
    }
    for (const slug of caseStudySlugs) {
      out.push({
        url: `${siteUrl}/${locale}/projects/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }
  return out;
}
