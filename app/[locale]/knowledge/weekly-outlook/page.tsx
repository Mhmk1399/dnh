import { localizePageMetadata } from "@/lib/site-seo";
import { normalizeSiteLocale } from "@/lib/site-language";
import type { Metadata } from "next";
import { WeeklyOutlookHero } from "@/components/static/Knowledge/weekly-outlook/WeeklyOutlookHero";
import { WeeklyOutlookListSection } from "@/components/static/Knowledge/weekly-outlook/WeeklyOutlookListSection";
import { getPublishedWeeklyOutlookList } from "@/lib/public-weekly-outlooks";

const pageMetadata: Metadata = {
  title: "چشم‌انداز هفتگی DNH",
  description:
    "آرشیو گزارش‌های هفتگی DNH درباره اقتصاد، ریسک، بازارها و متغیرهای قابل رصد برای تصمیم‌گیری مالی.",
};

export const dynamic = "force-dynamic";

export default async function WeeklyOutlookPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ market?: string | string[] }>;
}) {
  const [route, query] = await Promise.all([params, searchParams]);
  const locale = normalizeSiteLocale(route.locale);
  const reports = await getPublishedWeeklyOutlookList(locale).catch(() => {
    console.error("Weekly outlook archive is temporarily unavailable.");
    return null;
  });

  return (
    <div>
      <WeeklyOutlookHero locale={locale} />
      {reports ? (
        <WeeklyOutlookListSection
          reports={reports}
          locale={locale}
          market={query.market === "iran" || query.market === "global" ? query.market : undefined}
        />
      ) : (
        <section id="weekly-outlook-reports" className="dnh-site-shell scroll-mt-28 py-12 text-ink">
          <p role="status">{locale === "fa"
            ? "دریافت آرشیو گزارش‌ها ممکن نشد. لطفاً دوباره تلاش کنید."
            : "The report archive could not be loaded. Please try again."}</p>
        </section>
      )}
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return localizePageMetadata(
    pageMetadata,
    "/knowledge/weekly-outlook",
    normalizeSiteLocale(locale),
  );
}
