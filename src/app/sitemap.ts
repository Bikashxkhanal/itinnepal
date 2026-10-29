import { MetadataRoute } from "next";
import { SAMPLE_COLLEGES_DATA, SAMPLE_PROGRAMS } from "@/modules/shared/db/sample-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://itinnepal.com";

  // Core static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/colleges`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/programs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  // Dynamic college profiles
  const collegeRoutes: MetadataRoute.Sitemap = SAMPLE_COLLEGES_DATA.map((col) => ({
    url: `${baseUrl}/colleges/${col.slug}`,
    lastModified: new Date("2026-01-15"),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Dynamic program pages
  const programRoutes: MetadataRoute.Sitemap = SAMPLE_PROGRAMS.map((prog) => ({
    url: `${baseUrl}/programs/${prog.slug}`,
    lastModified: new Date("2026-01-15"),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...collegeRoutes, ...programRoutes];
}
