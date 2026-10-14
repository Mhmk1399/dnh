import { localizePageMetadata } from "@/lib/site-seo";
import { normalizeSiteLocale } from "@/lib/site-language";
export default function DataProtectionAdvisoryLimitationPage() {
  return null;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return localizePageMetadata({}, "/legal/data-protection-advisory-limitation", normalizeSiteLocale(locale));
}
