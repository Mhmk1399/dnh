import { DnhPageHero } from "@/components/ui/DnhPageHero";

export function WeeklyOutlookHero({ locale }: { locale: "fa" | "en" }) {
  const fa = locale === "fa";
  return (
    <DnhPageHero
      id="weekly-outlook-intro"
      direction={fa ? "rtl" : "ltr"}
      lang={fa ? "fa-IR" : "en-US"}
      eyebrow={fa ? "چشم‌انداز هفتگی DNH" : "DNH Weekly Outlook"}
      heading={fa ? "اقتصاد، ریسک و بازارها؛ در یک تصویر هفتگی برای تصمیم‌گیری مالی." : "The economy, risk and markets in one weekly briefing."}
      headingHighlight={fa ? "یک تصویر هفتگی برای تصمیم‌گیری مالی." : "one weekly briefing."}
      paragraphs={[
        {
          id: "weekly-outlook-introduction",
          text: fa ? "DNH Weekly Outlook تغییرات مهم اقتصاد، ریسک‌ها و شرایط دارایی‌ها را در یک گزارش فشرده و تصمیم‌محور جمع‌بندی می‌کند؛ بدون سیگنال خرید و فروش و بدون پیش‌بینی قطعی." : "A concise review of economic developments, risks and asset markets to inform financial decisions. The briefing offers context rather than trading signals or forecasts.",
        },
      ]}
      ctas={[
        {
          id: "weekly-reports",
          label: fa ? "مشاهده گزارش‌های هفتگی" : "Browse weekly reports",
          type: "primary",
          href: "#weekly-outlook-reports",
        },
      ]}
      media={{
        src: "/assets/images/home-weekly-outlook-heading.webp",
        alt: fa ? "نمای مفهومی چشم‌انداز هفتگی اقتصاد، ریسک و بازارها" : "Weekly outlook on the economy, risk and markets",
      }}
    />
  );
}
