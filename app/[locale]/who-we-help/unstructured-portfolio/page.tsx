import { PortfolioIntelligencePage, type PortfolioDocument } from "@/components/static/who-we-help/unstructured-portfolio/PortfolioIntelligencePage";
import contentFa from "@/config/DNH_Fragmented_Portfolio_Without_Architecture_Final_FA.json";
import contentEn from "@/config/DNH_Fragmented_Portfolio_Without_Architecture_Final_EN.json";
import { normalizeSiteLocale } from "@/lib/site-language";
import { localizePageMetadata } from "@/lib/site-seo";

const path = "/who-we-help/unstructured-portfolio";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const locale = normalizeSiteLocale((await params).locale);
  const content = (locale === "fa" ? contentFa : contentEn) as PortfolioDocument;
  return <PortfolioIntelligencePage content={content} locale={locale} />;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = normalizeSiteLocale((await params).locale);
  const content = locale === "fa" ? contentFa : contentEn;
  const description = content.sections[0].paragraphs?.[0] ?? content.title;
  return localizePageMetadata({
    title: content.title,
    description,
    openGraph: {
      title: content.title,
      description,
      images: [{ url: "/assets/images/unstructured-portfolio.png", alt: content.title }],
    },
  }, path, locale);
}
