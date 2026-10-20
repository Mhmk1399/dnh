import { DnhPageHero } from "@/components/ui/DnhPageHero";

export function WeeklyOutlookHero() {
  return (
    <DnhPageHero
      id="weekly-outlook-intro"
      direction="rtl"
      lang="fa-IR"
      eyebrow="چشم‌انداز هفتگی DNH"
      heading="اقتصاد، ریسک و بازارها؛ در یک تصویر هفتگی برای تصمیم‌گیری مالی."
      headingHighlight="یک تصویر هفتگی برای تصمیم‌گیری مالی."
      paragraphs={[
        {
          id: "weekly-outlook-introduction",
          text: "DNH Weekly Outlook تغییرات مهم اقتصاد، ریسک‌ها و شرایط دارایی‌ها را در یک گزارش فشرده و تصمیم‌محور جمع‌بندی می‌کند؛ بدون سیگنال خرید و فروش و بدون پیش‌بینی قطعی.",
        },
      ]}
      ctas={[
        {
          id: "weekly-reports",
          label: "مشاهده گزارش‌های هفتگی",
          type: "primary",
          href: "#weekly-outlook-reports",
        },
        {
          id: "weekly-report-structure",
          label: "ساختار گزارش",
          type: "secondary",
          href: "#weekly-outlook-structure",
        },
      ]}
      media={{
        src: "/assets/images/home-weekly-outlook-heading.webp",
        alt: "نمای مفهومی چشم‌انداز هفتگی اقتصاد، ریسک و بازارها",
      }}
    />
  );
}
