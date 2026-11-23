import type { Metadata } from "next";

import {
  ExecutiveBriefingsPage,
  type ExecutiveBriefingsDocument,
} from "@/components/static/services/executive-briefings/ExecutiveBriefingsPage";
import briefingsEn from "@/config/DNH_Executive_Briefings_Final_EN.json";
import briefingsFa from "@/config/DNH_Executive_Briefings_Final_FA.json";
import { normalizeSiteLocale } from "@/lib/site-language";
import { localizePageMetadata } from "@/lib/site-seo";

const ROUTE = "/services/executive-briefings";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = normalizeSiteLocale((await params).locale);
  const content = (locale === "fa" ? briefingsFa : briefingsEn) as ExecutiveBriefingsDocument;

  return <ExecutiveBriefingsPage content={content} locale={locale} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = normalizeSiteLocale((await params).locale);
  const content = locale === "fa" ? briefingsFa : briefingsEn;
  const hero = content.sections[0];
  const description = hero.paragraphs?.[0] ?? content.title;

  return localizePageMetadata(
    {
      title: content.title,
      description,
      openGraph: {
        title: content.title,
        description,
        images: [
          {
            url: "/assets/images/executive-briefings-hero.webp",
            alt: hero.media?.alt ?? content.title,
          },
        ],
      },
    },
    ROUTE,
    locale,
  );
}
