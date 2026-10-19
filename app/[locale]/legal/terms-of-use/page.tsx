import type { Metadata } from "next";

import {
  TermsOfUsePage as TermsOfUseView,
  type TermsOfUseContent,
} from "@/components/static/legal/terms-of-use/TermsOfUsePage";
import termsEn from "@/config/DNH_Terms_Of_Use_Final_EN.json";
import termsFa from "@/config/DNH_Terms_Of_Use_Final_FA.json";
import { normalizeSiteLocale } from "@/lib/site-language";
import { getLocalizedAlternates, localizePageMetadata } from "@/lib/site-seo";

export default async function TermsOfUsePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: routeLocale } = await params;
  const locale = normalizeSiteLocale(routeLocale);
  const content = (locale === "fa" ? termsFa : termsEn) as TermsOfUseContent;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: content.seo.title,
    description: content.seo.description,
    inLanguage: locale === "fa" ? "fa-IR" : "en-US",
    dateModified: "2026-10-19",
    about: "Website terms of use",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <TermsOfUseView content={content} />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: routeLocale } = await params;
  const locale = normalizeSiteLocale(routeLocale);
  const content = locale === "fa" ? termsFa : termsEn;

  return localizePageMetadata(
    {
      title: content.seo.title,
      description: content.seo.description,
      alternates: getLocalizedAlternates("/legal/terms-of-use", locale),
      openGraph: { title: content.seo.title, description: content.seo.description },
    },
    "/legal/terms-of-use",
    locale,
  );
}
