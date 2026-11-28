import type { Metadata } from "next";
import { ServiceLeadForm } from "@/components/dynamic-forms/ServiceLeadForm";

import { ReviewedContentPage } from "@/components/static/reviewed-pages/ReviewedContentPage";
import type { ReviewedPageDocument } from "@/components/static/reviewed-pages/reviewedPageTypes";
import contentEn from "@/config/DNH_Portfolio_Intelligence_Final_EN.json";
import contentFa from "@/config/DNH_Portfolio_Intelligence_Final_FA.json";
import { normalizeSiteLocale, type SiteLocale } from "@/lib/site-language";
import { localizePageMetadata } from "@/lib/site-seo";

const ROUTE = "/services/portfolio-intelligence";
const getContent = (locale: SiteLocale) =>
  (locale === "fa" ? contentFa : contentEn) as ReviewedPageDocument;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = normalizeSiteLocale((await params).locale);
  const content = getContent(locale);
  return localizePageMetadata(
    { title: content.seo.title, description: content.seo.description },
    ROUTE,
    locale,
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = normalizeSiteLocale((await params).locale);
  return (
    <>
      <ReviewedContentPage content={getContent(locale)} locale={locale} />
      <ServiceLeadForm serviceKey="portfolio-intelligence" routeLocale={locale} />
    </>
  );
}
