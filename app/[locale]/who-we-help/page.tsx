import { redirect } from "next/navigation";

import { getLocalizedSiteHref, normalizeSiteLocale } from "@/lib/site-language";

export default async function WhoWeHelpIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  redirect(
    getLocalizedSiteHref(
      "/who-we-help/big-financial-decision",
      normalizeSiteLocale(locale),
    ),
  );
}
