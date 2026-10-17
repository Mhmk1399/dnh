import type { Metadata } from "next";

import { AboutPage, type AboutSection } from "@/components/static/About/AboutPage";
import aboutFa from "@/config/DNH_About_Final_FA.json";
import aboutEn from "@/config/DNH_About_Final_EN.json";
import { normalizeSiteLocale } from "@/lib/site-language";
import { getLocalizedAlternates, localizePageMetadata } from "@/lib/site-seo";

type AboutDocument = {
  locale: string;
  direction: "rtl" | "ltr";
  title: string;
  sections: AboutSection[];
};

export default async function AboutRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: routeLocale } = await params;
  const locale = normalizeSiteLocale(routeLocale);
  const content = (locale === "fa" ? aboutFa : aboutEn) as AboutDocument;

  return <AboutPage content={content} locale={locale} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: routeLocale } = await params;
  const locale = normalizeSiteLocale(routeLocale);
  const content = locale === "fa" ? aboutFa : aboutEn;
  const hero = content.sections[0];
  const description = hero.paragraphs?.[0] ?? content.title;

  return localizePageMetadata(
    {
      title: content.title,
      description,
      alternates: getLocalizedAlternates("/about", locale),
      openGraph: {
        title: content.title,
        description,
        images: [
          {
            url: "/assets/images/about-hero-desktop.png",
            width: 1600,
            height: 1000,
            alt: content.title,
          },
        ],
      },
    },
    "/about",
    locale,
  );
}
