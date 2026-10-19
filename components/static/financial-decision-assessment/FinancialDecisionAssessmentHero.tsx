import { DnhPageHero } from "@/components/ui/DnhPageHero";

export function FinancialDecisionAssessmentHero() {
  return (
    <DnhPageHero
      id="financial-decision-assessment-hero"
      direction="rtl"
      lang="fa-IR"
      eyebrow="شروع مسیر تصمیم‌گیری"
      heading="قبل از تصمیم بعدی، مسئله را درست تعریف کنید."
      headingHighlight="مسئله را درست تعریف کنید."
      paragraphs={[
        {
          id: "assessment-introduction",
          text: "بسیاری از تصمیم‌های مالی زمانی پیچیده می‌شوند که مسئله اصلی، محدودیت‌ها، ریسک‌ها و گزینه‌های موجود هنوز به‌درستی و به‌طور کامل تعریف نشده باشند. ارزیابی اولیه DNH کمک می‌کند پیش از ورود به مشاوره تخصصی، نوع مسئله، میزان فوریت و سطح پیچیدگی آن روشن‌تر شود.",
        },
      ]}
      ctas={[
        {
          id: "start-assessment",
          label: "شروع ارزیابی اولیه",
          type: "primary",
          href: "#assessment-form",
        },
        {
          id: "assessment-process",
          label: "مشاهده فرایند ارزیابی",
          type: "secondary",
          href: "#assessment-process",
        },
      ]}
      media={{
        src: "/assets/images/financial-decision-assessment.webp",
        alt: "تصویری مفهومی از ارزیابی ساختاریافته یک تصمیم مالی",
      }}
    />
  );
}
