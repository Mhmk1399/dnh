import { ArrowLeft } from "lucide-react";

import Faq, { type FaqIconName } from "@/components/global/Faq";
import { ActionButton } from "@/components/ui/ActionButton";

type FaqItem = {
  question: string;
  answer: string;
  icon: FaqIconName;
};

const FAQS: FaqItem[] = [
  {
    question: "چه خدماتی در DNH ارائه می‌شود؟",
    answer:
      "خدمات DNH شامل استراتژی ثروت خصوصی، هوشمندی پرتفوی، مشاوره مالی راهبردی، مشاوره اقتصاد و بازار، مدیریت ریسک و حفاظت از ثروت و نشست‌های تخصصی مدیران است.",
    icon: "layers",
  },
  {
    question: "فرآیند همکاری با DNH چگونه است؟",
    answer:
      "همکاری با شناخت مسئله و ارزیابی شرایط آغاز می‌شود. سپس داده‌ها، ساختار مالی، ریسک‌ها و گزینه‌های پیشِ رو بررسی می‌شوند تا مسیر مناسب برای تصمیم‌گیری راهبردی مشخص شود.",
    icon: "users",
  },
  {
    question: "این خدمات برای چه کسانی مناسب است؟",
    answer:
      "این خدمات برای افرادی با تصمیم‌های مالی مهم، صاحبان پرتفوی‌های پراکنده و همچنین مدیران، هلدینگ‌ها و مجموعه‌هایی با ساختار مالی و سرمایه پیچیده طراحی شده‌اند.",
    icon: "user",
  },
  {
    question: "چه ارزش و مزایایی برای ما ایجاد می‌کند؟",
    answer:
      "هدف DNH ایجاد دید شفاف‌تر نسبت به ساختار دارایی‌ها، ریسک‌ها و گزینه‌های تصمیم‌گیری است تا تصمیم‌های مالی در یک مسیر منسجم، تحلیلی و بلندمدت قرار گیرند.",
    icon: "chart",
  },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FaqSection() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(FAQ_SCHEMA).replace(/</g, "\\u003c"),
        }}
      />

      <section
        id="faq"
        dir="rtl"
        aria-labelledby="faq-title"
        aria-describedby="faq-description"
        className="
          relative
          isolate
          mx-auto
          mt-12
          w-[calc(100%-20px)]
          max-w-[1520px]
          overflow-hidden
          rounded-[30px]
          border
          border-line
          bg-page
          shadow-[0_20px_60px_color-mix(in_srgb,var(--dnh-primary)_7%,transparent)]
          [content-visibility:auto]
          [contain-intrinsic-size:720px]
          sm:mt-16
          sm:w-[calc(100%-32px)]
          sm:rounded-[34px]
          lg:mt-20
          lg:w-[calc(100%-48px)]
          lg:rounded-[40px]
        "
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[-1]"
          style={{
            background:
              "linear-gradient(145deg, color-mix(in srgb,var(--dnh-primary) 4%,var(--dnh-bg-page)) 0%, var(--dnh-bg-page) 48%, color-mix(in srgb,var(--dnh-accent) 2%,var(--dnh-bg-page)) 100%)",
          }}
        />

        <span
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-x-[12%]
            top-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-page
            to-transparent
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            w-full
            max-w-[820px]
            px-4
            py-10
            sm:px-7
            sm:py-12
            lg:px-10
            lg:py-16
          "
        >
          <header className="text-center">
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-line
                bg-page
                px-4
                py-2
                text-[9px]
                font-bold
                text-brand-primary
                shadow-[0_7px_20px_color-mix(in_srgb,var(--dnh-primary)_5%,transparent)]
                sm:text-[10px]
              "
            >
              <span>سؤالات پرتکرار</span>
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-brand-accent"
              />
            </div>

            <h2
              id="faq-title"
              className="
                mt-5
                text-[30px]
                font-black
                leading-[1.5]
                tracking-[-0.045em]
                text-ink
                sm:text-[38px]
                lg:text-[46px]
              "
            >
              <span className="text-brand-primary">۴</span> سؤال اصلی
            </h2>

            <p
              className="
                mt-2
                text-[14px]
                font-black
                leading-[1.9]
                text-ink
                sm:text-[16px]
                lg:text-[18px]
              "
            >
              پاسخ‌های روشن برای تصمیم‌های مهم شما
            </p>

            <p
              id="faq-description"
              className="
                mx-auto
                mt-3
                max-w-[650px]
                text-[10px]
                font-medium
                leading-[2.1]
                text-ink-muted
                sm:text-[11px]
                lg:text-[12px]
              "
            >
              مهم‌ترین پرسش‌های سرمایه‌گذاران و مدیران درباره خدمات، فرآیند
              همکاری و ارزش‌آفرینی DNH را در این بخش به‌صورت شفاف پاسخ
              داده‌ایم.
            </p>
          </header>

          <div className="mt-7 space-y-2 sm:mt-8">
            {FAQS.map((item) => (
              <Faq
                key={item.question}
                question={item.question}
                answer={item.answer}
                icon={item.icon}
              />
            ))}
          </div>

          <div className="mt-7 border-t border-line pt-6 text-center">
            <ActionButton
              href="/contact"
              variant="primary"
              size="md"
              icon={ArrowLeft}
              iconPosition="end"
              className="w-full max-w-[310px]"
            >
              مشاهده همه سؤالات
            </ActionButton>
          </div>
        </div>
      </section>
    </>
  );
}
