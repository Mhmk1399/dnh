import type { Metadata } from "next";

import { FaqPage, type FaqContent } from "@/components/static/Knowledge/faq/FaqPage";
import faqEn from "@/config/DNH_FAQ_Final_EN.json";
import faqFa from "@/config/DNH_FAQ_Final_FA.json";
import { normalizeSiteLocale } from "@/lib/site-language";
import { getLocalizedAlternates, localizePageMetadata } from "@/lib/site-seo";

export default async function KnowledgeFaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: routeLocale } = await params;
  const locale = normalizeSiteLocale(routeLocale);
  const content = (locale === "fa" ? faqFa : faqEn) as FaqContent;
  const faqEntities = content.categories.flatMap((category) =>
    category.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer.join("\n\n"),
      },
    })),
  );
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqEntities,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <FaqPage content={content} />
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
  const content = locale === "fa" ? faqFa : faqEn;

  return localizePageMetadata(
    {
      title: content.seo.title,
      description: content.seo.description,
      alternates: getLocalizedAlternates("/knowledge/faq", locale),
      openGraph: {
        title: content.seo.title,
        description: content.seo.description,
      },
    },
    "/knowledge/faq",
    locale,
  );
}
