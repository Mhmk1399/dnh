import type { Metadata } from "next";
import { WeeklyOutlookHero } from "@/components/static/Knowledge/weekly-outlook/WeeklyOutlookHero";
import { WeeklyOutlookListSection } from "@/components/static/Knowledge/weekly-outlook/WeeklyOutlookListSection";
import { getPublishedWeeklyOutlookList } from "@/lib/public-weekly-outlooks";

export const metadata: Metadata = {
  title: "چشم‌انداز هفتگی DNH",
  description:
    "آرشیو گزارش‌های هفتگی DNH درباره اقتصاد، ریسک، بازارها و متغیرهای قابل رصد برای تصمیم‌گیری مالی.",
};

export const dynamic = "force-dynamic";

export default async function WeeklyOutlookPage() {
  const reports = await getPublishedWeeklyOutlookList();

  return (
    <div>
      <WeeklyOutlookHero />
      <WeeklyOutlookListSection reports={reports} />
    </div>
  );
}
