import { MetadataRoute } from "next";
import { getLoanPrograms, getMortgageBasics, getBlogPosts } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.goodpeoplemortgage.com";

  const staticPages = [
    "",
    "/home-purchase",
    "/home-refinance",
    "/mortgage-calculators",
    "/loan-programs",
    "/loan-process",
    "/about-us",
    "/contact-us",
    "/faq",
    "/mortgage-basics",
    "/online-forms",
    "/blog",
    "/loan-officer",
    "/legal",
    "/privacy-policy",
    "/accessibility-statement",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const loanPrograms = await getLoanPrograms();
  const programPages = loanPrograms.map((p) => ({
    url: `${baseUrl}/loan-programs/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const mortgageBasics = await getMortgageBasics();
  const basicPages = mortgageBasics.map((m) => ({
    url: `${baseUrl}/mortgage-basics/${m.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const { posts } = await getBlogPosts();
  const blogPages = posts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...programPages, ...basicPages, ...blogPages];
}
