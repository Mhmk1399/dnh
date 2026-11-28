import { redirect } from "next/navigation";

import { getLocalizedSiteHref, normalizeSiteLocale } from "@/lib/site-language";

export default async function KnowledgeCaseStudiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = normalizeSiteLocale((await params).locale);
  redirect(getLocalizedSiteHref("/knowledge/weekly-outlook", locale));
}
