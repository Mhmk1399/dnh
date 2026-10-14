import type { MetadataRoute } from "next";

import { SITE_MAP } from "@/config/site-map";
import { getLocalizedAlternates } from "@/lib/site-seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return SITE_MAP.filter((page) => page.indexable).flatMap((page) =>
    (["fa", "en"] as const).map((locale) => {
      const alternates = getLocalizedAlternates(page.path, locale);
      return {
        url: alternates.canonical,
        alternates: { languages: alternates.languages },
      };
    }),
  );
}
