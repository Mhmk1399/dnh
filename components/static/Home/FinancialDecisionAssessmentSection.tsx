"use client";

import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Clock3,
  FileText,
  Flag,
  Focus,
  Gauge,
  Route,
  ShieldCheck,
  Target,
} from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import homeFa from "@/config/DNH_Homepage_Final_FA.json";
import homeEn from "@/config/DNH_Homepage_Final_EN.json";

const paragraphIcons = {
  decision: BarChart3,
  scope: Focus,
  privacy: ShieldCheck,
} as const;

const assessmentIcons = {
  document: FileText,
  goal: Flag,
  time: Clock3,
  urgency: Gauge,
  risk: ShieldCheck,
  fit: Route,
} as const;

type AssessmentContent = {
  id: "financial-decision-assessment";
  type: "final_cta";
  eyebrow: string;
  english_label?: string;
  heading: string;
  heading_highlight?: string;
  media: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  paragraphs: Array<{
    id: string;
    text: string;
    icon: keyof typeof paragraphIcons;
  }>;
  assessment_title: string;
  assessment_items: Array<{
    id: string;
    text: string;
    icon: keyof typeof assessmentIcons;
  }>;
  closing: string;
  ctas: Array<{
    id: string;
    label: string;
    type: "primary" | "secondary";
    href: string;
  }>;
};

export function FinancialDecisionAssessmentSection() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const homepage = locale === "en" ? homeEn : homeFa;
  const content = homepage.sections.find(
    (section) =>
      section.id === "financial-decision-assessment" &&
      section.type === "final_cta",
  ) as AssessmentContent | undefined;

  if (!content) return null;

  const highlight = content.heading_highlight ?? "";
  const highlightIndex = highlight ? content.heading.indexOf(highlight) : -1;
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="home-assessment-heading"
      className="relative isolate overflow-hidden border-b border-line bg-page py-14 text-ink sm:py-18 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--dnh-primary)_7%,white),transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute end-0 top-0 size-40 border-b border-s border-line opacity-70"
      />

      <div className="dnh-site-shell relative z-10 grid min-w-0 gap-7 lg:grid-cols-[minmax(360px,0.82fr)_minmax(0,1.32fr)] lg:grid-rows-[auto_auto_auto_auto] lg:gap-x-10 xl:gap-x-14">
        <header className="min-w-0 text-start lg:col-start-2 lg:row-start-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] font-bold text-brand-primary sm:text-[13px]">
            <span aria-hidden="true" className="h-[2px] w-10 bg-brand-accent" />
            <p>{content.eyebrow}</p>
         
          </div>

          <h2
            id="home-assessment-heading"
            className={`mt-5 max-w-[86ch] text-pretty text-[clamp(2rem,7.4vw,3.15rem)] font-black tracking-[-0.035em] sm:text-[clamp(2.65rem,4.7vw,2.5rem)] ${
              isRTL ? "leading-[1.48]" : "leading-[1.13]"
            }`}
          >
            {highlightIndex < 0 ? (
              content.heading
            ) : (
              <>
                {content.heading.slice(0, highlightIndex)}
                <span className="text-brand-accent">
                  {content.heading.slice(
                    highlightIndex,
                    highlightIndex + highlight.length,
                  )}
                </span>
                {content.heading.slice(highlightIndex + highlight.length)}
              </>
            )}
          </h2>
        </header>

        <div className="grid min-w-0 gap-3 sm:grid-cols-3 lg:col-start-2 lg:row-start-2 lg:mt-2">
          {content.paragraphs.map((paragraph) => {
            const Icon = paragraphIcons[paragraph.icon] ?? Target;

            return (
              <article
                key={paragraph.id}
                className="border-s border-line py-2 ps-4 text-start sm:min-h-[190px] sm:pe-3"
              >
                <Icon
                  aria-hidden="true"
                  size={27}
                  strokeWidth={1.55}
                  className="text-brand-primary"
                />
                <p
                  className={`mt-4 text-[13px] text-ink-muted sm:text-[14px] ${
                    isRTL ? "leading-[1.95]" : "leading-[1.7]"
                  }`}
                >
                  {paragraph.text}
                </p>
              </article>
            );
          })}
        </div>

        <div className="relative aspect-[4/5] min-h-[460px] overflow-hidden border border-line bg-surface-soft lg:col-start-1 lg:row-span-4 lg:row-start-1 lg:h-full lg:min-h-[760px] lg:aspect-auto">
          <Image
            src={content.media.src}
            alt={content.media.alt}
            fill
            sizes="(max-width: 1023px) calc(100vw - 24px), 34vw"
            className="object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink/28 via-transparent to-brand-primary/5"
          />
          <span
            aria-hidden="true"
            className="absolute end-6 top-6 size-6 bg-brand-accent"
          />
        </div>

        <div className="border border-line bg-page lg:col-start-2 lg:row-start-3 lg:mt-2">
          <div className="flex items-center gap-3 border-b border-line px-5 py-4 sm:px-6">
            <Target
              aria-hidden="true"
              size={24}
              strokeWidth={1.6}
              className="text-brand-primary"
            />
            <h3 className="text-[16px] font-black sm:text-[18px]">
              {content.assessment_title}
            </h3>
            <span aria-hidden="true" className="ms-auto h-[2px] w-10 bg-brand-accent" />
          </div>

          <ul className="grid min-w-0 grid-cols-1 sm:grid-cols-2">
            {content.assessment_items.map((item) => {
              const Icon = assessmentIcons[item.icon] ?? FileText;

              return (
                <li
                  key={item.id}
                  className="flex min-h-[68px] items-center gap-3 border-b border-line px-4 py-3 text-start odd:sm:border-e sm:px-5"
                >
                  <span
                    aria-hidden="true"
                    className="flex size-10 shrink-0 items-center justify-center bg-surface-soft text-brand-primary"
                  >
                    <Icon size={20} strokeWidth={1.6} />
                  </span>
                  <span
                    className={`text-[13px] font-bold text-ink sm:text-[14px] ${
                      isRTL ? "leading-[1.75]" : "leading-[1.45]"
                    }`}
                  >
                    {item.text}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <footer className="grid min-w-0 gap-4 lg:col-start-2 lg:row-start-4 lg:mt-1">
          <p
            className={`border-s-2 border-brand-primary ps-4 text-start text-[13px] text-ink-muted sm:text-[14px] ${
              isRTL ? "leading-[1.9]" : "leading-[1.7]"
            }`}
          >
            {content.closing}
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {content.ctas.map((cta) => (
              <ActionButton
                key={cta.id}
                href={cta.href}
                variant={cta.type}
                shape="square"
                size="md"
                icon={Arrow}
                iconPosition="end"
                contentAlignment="between"
                dir={direction}
                className={`w-full shadow-none hover:shadow-none ${
                  cta.type === "primary"
                    ? "bg-brand-accent hover:bg-brand-primary"
                    : "border-brand-primary bg-page"
                }`}
              >
                {cta.label}
              </ActionButton>
            ))}
          </div>
        </footer>
      </div>
    </section>
  );
}
