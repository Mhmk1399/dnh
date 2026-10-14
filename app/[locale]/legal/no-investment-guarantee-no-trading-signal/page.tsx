import { localizePageMetadata } from "@/lib/site-seo";
import { normalizeSiteLocale } from "@/lib/site-language";
export default function NoInvestmentGuaranteeNoTradingSignalPage() {
  return null;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return localizePageMetadata({}, "/legal/no-investment-guarantee-no-trading-signal", normalizeSiteLocale(locale));
}
