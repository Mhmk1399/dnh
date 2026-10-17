import { HoldingsCapitalStructurePage, type HoldingsCapitalDocument } from "@/components/static/who-we-help/holdings-financial-capital-structure/HoldingsCapitalStructurePage";
import contentFa from "@/config/DNH_Holdings_Financial_Capital_Structure_Final_FA.json";
import contentEn from "@/config/DNH_Holdings_Financial_Capital_Structure_Final_EN.json";
import { normalizeSiteLocale } from "@/lib/site-language";
import { localizePageMetadata } from "@/lib/site-seo";

const path = "/who-we-help/holdings-financial-capital-structure";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const locale = normalizeSiteLocale((await params).locale);
  const content = (locale === "fa" ? contentFa : contentEn) as HoldingsCapitalDocument;
  return <HoldingsCapitalStructurePage content={content} locale={locale} />;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = normalizeSiteLocale((await params).locale);
  const content = locale === "fa" ? contentFa : contentEn;
  const description = content.sections[0].paragraphs?.[0] ?? content.title;
  return localizePageMetadata({ title: content.title, description, openGraph: { title: content.title, description, images: [{ url: "/assets/images/complex-financial-structure.png", alt: content.title }] } }, path, locale);
}
