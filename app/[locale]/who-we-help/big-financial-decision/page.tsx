import type { Metadata } from "next";
import { MajorFinancialDecisionPage, type MajorDecisionDocument } from "@/components/static/who-we-help/big-financial-decision/MajorFinancialDecisionPage";
import contentFa from "@/config/DNH_Major_Financial_Decision_Final_FA.json";
import contentEn from "@/config/DNH_Major_Financial_Decision_Final_EN.json";
import { normalizeSiteLocale } from "@/lib/site-language";
import { localizePageMetadata } from "@/lib/site-seo";

const path = "/who-we-help/big-financial-decision";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const locale = normalizeSiteLocale((await params).locale);
  const content = (locale === "fa" ? contentFa : contentEn) as MajorDecisionDocument;
  return <MajorFinancialDecisionPage content={content} locale={locale} />;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = normalizeSiteLocale((await params).locale);
  const content = locale === "fa" ? contentFa : contentEn;
  const description = content.sections[0].paragraphs?.[0] ?? content.title;
  return localizePageMetadata({ title: content.title, description, openGraph: { title: content.title, description, images: [{ url: "/assets/images/major-financial-decision.jpg", alt: content.title }] } }, path, locale);
}
