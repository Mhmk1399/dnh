import { DnhPageHero } from "@/components/ui/DnhPageHero";

export function StrategicConsultationHero() {
  return (
    <DnhPageHero
      id="consultation-intro"
      direction="rtl"
      lang="fa-IR"
      eyebrow="شروع یک گفت‌وگوی تخصصی"
      heading="وقتی مسئله مالی به یک پاسخ ساده محدود نمی‌شود."
      headingHighlight="محدود نمی‌شود."
      paragraphs={[
        {
          id: "consultation-introduction",
          text: "درخواست مشاوره راهبردی برای موضوعاتی است که پیش از تصمیم، به شناخت دقیق‌تر مسئله، ریسک‌ها، محدودیت‌ها و مسیرهای قابل بررسی نیاز دارند.",
        },
      ]}
      ctas={[
        {
          id: "submit-consultation-request",
          label: "ثبت درخواست مشاوره",
          type: "primary",
          href: "#consultation-request",
        },
        {
          id: "start-initial-assessment",
          label: "شروع از ارزیابی اولیه",
          type: "secondary",
          href: "/financial-decision-assessment",
        },
      ]}
      media={{
        src: "/assets/images/doctorHero.png",
        alt: "دکتر نسیم محمدحسنی در فضای حرفه‌ای مشاوره مالی DNH",
        objectPosition: "center top",
      }}
    />
  );
}
