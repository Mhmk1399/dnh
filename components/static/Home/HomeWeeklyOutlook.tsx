"use client";

import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Layers3,
  PenLine,
  ScanEye,
  ShieldAlert,
} from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import homeFa from "@/config/DNH_Homepage_Final_FA.json";
import homeEn from "@/config/DNH_Homepage_Final_EN.json";

type WeeklyContent = {
  id: "weekly-outlook";
  type: "weekly_outlook";
  eyebrow: string;
  english_label?: string;
  heading: string;
  heading_highlight?: string;
  paragraphs: Array<{ id: string; text: string }>;
  items: Array<{
    id: string;
    title: string;
    english_label?: string;
    description: string;
  }>;
  closing: string;
  ctas: Array<{
    id: string;
    label: string;
    type: "primary" | "secondary";
    href: string;
  }>;
};

const outlookIcons = {
  "executive-summary": FileText,
  "macro-risk": ShieldAlert,
  "asset-view": Layers3,
  "what-to-watch": ScanEye,
  "dnh-note": PenLine,
} as const;
const outlookImages = [
  "/assets/images/strategic-financial-advisory.webp",
  "/assets/images/risk-management-wealth-protection.webp",
  "/assets/images/portfolio-intelligence.webp",
  "/assets/images/macro-market-advisory.webp",
  "/assets/images/executive-briefings.webp",
];

export function HomeWeeklyOutlook() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const homepage = locale === "en" ? homeEn : homeFa;
  const content = homepage.sections.find(
    (section) =>
      section.id === "weekly-outlook" && section.type === "weekly_outlook",
  ) as WeeklyContent | undefined;

  if (!content) return null;

  const highlight = content.heading_highlight ?? "";
  const highlightIndex = highlight ? content.heading.indexOf(highlight) : -1;
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="home-weekly-outlook-heading"
      className="relative isolate overflow-hidden border-b border-line bg-page py-14 text-ink sm:py-18 lg:py-24"
    >
      <div className="dnh-site-shell">
        <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:items-stretch lg:gap-10 xl:gap-14">
          <header className="min-w-0 self-center text-start">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] font-bold text-brand-primary sm:text-[13px]">
              <p>{content.eyebrow}</p>
              <span
                aria-hidden="true"
                className="h-[2px] w-11 bg-brand-accent"
              />
          
            </div>
            <h2
              id="home-weekly-outlook-heading"
              className={`mt-5 max-w-[22ch] text-pretty text-[clamp(2rem,7.6vw,3rem)] font-black tracking-[-0.03em] sm:text-[clamp(2.6rem,4.5vw,3.8rem)] lg:max-w-none ${isRTL ? "leading-[1.46]" : "leading-[1.14]"}`}
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
            <div
              className={`mt-5 max-w-[76ch] space-y-4 text-[14px] text-ink-muted sm:text-[15px] ${isRTL ? "leading-[1.95]" : "leading-[1.72]"}`}
            >
              {content.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.id}
                  className="border-s-2 border-brand-primary ps-4"
                >
                  {paragraph.text}
                </p>
              ))}
            </div>
          </header>

          <div className="relative aspect-[16/10] min-h-[400px] overflow-hidden border border-line bg-surface-soft lg:min-h-[520px] lg:aspect-auto">
            <Image
              src="/assets/images/macro-market-advisory.webp"
              alt=""
              fill
              sizes="(max-width: 1023px) calc(100vw - 24px), 54vw"
              className="object-cover object-center"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent"
            />
            <span
              aria-hidden="true"
              className="absolute end-6 top-6 size-6 bg-brand-accent"
            />
            <div
              aria-hidden="true"
              className="absolute bottom-6 end-6 border border-white/30 bg-ink/60 p-5 text-white backdrop-blur-sm"
            >
              <FileText size={34} strokeWidth={1.5} />
            </div>
          </div>
        </div>

        <div className="mt-7 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-8 lg:grid-cols-5">
          {content.items.map((item, index) => {
            const Icon =
              outlookIcons[item.id as keyof typeof outlookIcons] ?? FileText;
            return (
              <article
                key={item.id}
                className="group min-w-0 border border-line bg-page transition-colors duration-300 hover:border-brand-primary motion-reduce:transition-none"
              >
                <div className="relative aspect-[16/7] overflow-hidden bg-surface-soft">
                  <Image
                    src={outlookImages[index] ?? outlookImages[0]}
                    alt=""
                    fill
                    sizes="(max-width: 639px) calc(100vw - 24px), (max-width: 1023px) 48vw, 19vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transition-none"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute end-3 top-3 size-4 bg-brand-accent"
                  />
                </div>
                <div className="relative p-4 pt-7 sm:p-5 sm:pt-8">
                  <span
                    aria-hidden="true"
                    className="absolute start-4 top-0 flex size-10 -translate-y-1/2 items-center justify-center bg-surface-soft text-brand-primary sm:start-5"
                  >
                    <Icon size={20} strokeWidth={1.6} />
                  </span>
                  <h3
                    className={`text-start text-[16px] font-black sm:text-[17px] ${isRTL ? "leading-[1.65]" : "leading-[1.35]"}`}
                  >
                    {item.title}
                  </h3>
                  {item.english_label && item.english_label !== item.title ? (
                    <bdi
                      dir="ltr"
                      className="mt-1 block text-start text-[9px] tracking-[0.18em] text-brand-primary"
                    >
                      {item.english_label}
                    </bdi>
                  ) : null}
                  <p
                    className={`mt-2 text-start text-[13px] text-ink-muted ${isRTL ? "leading-[1.85]" : "leading-[1.62]"}`}
                  >
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <footer className="mt-5 grid min-w-0 gap-4 border border-line bg-surface-soft p-4 sm:p-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <p
            className={`border-s-2 border-brand-primary ps-4 text-start text-[13px] text-ink-muted sm:text-[14px] ${isRTL ? "leading-[1.9]" : "leading-[1.68]"}`}
          >
            {content.closing}
          </p>
          {content.ctas.map((cta) => (
            <ActionButton
              key={cta.id}
              href={cta.href}
              variant={cta.type}
              shape="square"
              size="md"
              icon={Arrow}
              iconPosition="end"
              dir={direction}
              className="w-full bg-brand-accent shadow-none hover:bg-brand-primary hover:shadow-none sm:w-auto"
            >
              {cta.label}
            </ActionButton>
          ))}
        </footer>
      </div>
    </section>
  );
}
