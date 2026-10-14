import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/fa", "/en"],
      disallow: ["/admin", "/api", "/dashboard", "/test", "/test-form"],
    },
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}
