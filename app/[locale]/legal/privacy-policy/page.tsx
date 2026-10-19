import type { Metadata } from "next";

import {
  PrivacyPolicyPage as PrivacyPolicyView,
  type PrivacyPolicyContent,
} from "@/components/static/legal/privacy-policy/PrivacyPolicyPage";
import privacyEn from "@/config/DNH_Privacy_Policy_Final_EN.json";
import privacyFa from "@/config/DNH_Privacy_Policy_Final_FA.json";
import { normalizeSiteLocale } from "@/lib/site-language";
import { getLocalizedAlternates, localizePageMetadata } from "@/lib/site-seo";

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: routeLocale } = await params;
  const locale = normalizeSiteLocale(routeLocale);
  const content = (locale === "fa" ? privacyFa : privacyEn) as PrivacyPolicyContent;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: content.seo.title,
    description: content.seo.description,
    inLanguage: locale === "fa" ? "fa-IR" : "en-US",
    dateModified: "2026-10-19",
    about: "Privacy policy",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <PrivacyPolicyView content={content} />
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
  const content = locale === "fa" ? privacyFa : privacyEn;

  return localizePageMetadata(
    {
      title: content.seo.title,
      description: content.seo.description,
      alternates: getLocalizedAlternates("/legal/privacy-policy", locale),
      openGraph: {
        title: content.seo.title,
        description: content.seo.description,
      },
    },
    "/legal/privacy-policy",
    locale,
  );
}
