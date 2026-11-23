import "server-only";
import homepageFa from "@/config/DNH_Homepage_Final_FA.json";
import homepageEn from "@/config/DNH_Homepage_Final_EN.json";
import type { SiteLocale } from "@/lib/site-language";

export function getHomepageContent(locale: SiteLocale) {
  return locale === "en" ? homepageEn : homepageFa;
}

export type HomepageContent = ReturnType<typeof getHomepageContent>;
