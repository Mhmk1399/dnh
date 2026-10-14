"use client";

import { useEffect, useRef } from "react";
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

type OutlookItem = {
  id: string;
  title: string;
  english_label?: string;
  description: string;
};

type WeeklyOutlookContent = {
  id: "weekly-outlook";
  type: "weekly_outlook";
  eyebrow: string;
  english_label?: string;
  heading: string;
  heading_highlight?: string;
  paragraphs: Array<{ id: string; text: string }>;
  items: OutlookItem[];
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

export function HomeWeeklyOutlook() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const homepage = locale === "en" ? homeEn : homeFa;
  const content = homepage.sections.find(
    (section) =>
      section.id === "weekly-outlook" && section.type === "weekly_outlook",
  ) as WeeklyOutlookContent | undefined;

  // Progressive enhancement: content is in the initial HTML and visible
  // without JavaScript. Only offscreen elements enter once on observation.
  useEffect(() => {
    const root = sectionRef.current;
    if (
      !root ||
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const pending = new Set<HTMLElement>();
    root.querySelectorAll<HTMLElement>("[data-outlook-entry]").forEach((item) => {
      item.removeAttribute("data-reveal");
      if (item.getBoundingClientRect().top > window.innerHeight - 36) {
        item.dataset.reveal = "pending";
        pending.add(item);
      }
    });

    if (!pending.size) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          element.dataset.reveal = "shown";
          pending.delete(element);
          observer.unobserve(element);
        }
        if (!pending.size) observer.disconnect();
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
    );

    pending.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [locale]);

  if (!content) return null;

  const highlight = content.heading_highlight ?? "";
  const highlightIndex = highlight ? content.heading.indexOf(highlight) : -1;
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const [leadItem, ...otherItems] = content.items;
  const LeadIcon = leadItem
    ? outlookIcons[leadItem.id as keyof typeof outlookIcons] ?? FileText
    : FileText;

  return (
    <section
      ref={sectionRef}
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="home-weekly-outlook-heading"
      className="relative isolate border-t border-line bg-surface-soft py-12 text-ink sm:py-14 lg:py-[4.5rem]"
    >
      <div className="dnh-site-shell">
        {/* Editorial masthead: bilingual labels come from the active JSON. */}
        <header className="grid min-w-0 gap-5 pb-7 md:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] md:items-end md:gap-10 md:pb-9 xl:gap-16">
          <div className="min-w-0 text-start">
            <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
              <span aria-hidden="true" className="h-[2px] w-9 shrink-0 bg-brand-accent" />
              <p className="text-[12px] font-semibold leading-[1.8] text-brand-primary sm:text-[13px]">
                {content.eyebrow}
              </p>
              {content.english_label && content.english_label !== content.eyebrow && (
                <span className="text-[11px] leading-[1.65] text-ink-muted">
                  <bdi dir="ltr">{content.english_label}</bdi>
                </span>
              )}
            </div>

            <h2
              id="home-weekly-outlook-heading"
              className="mt-4 max-w-[33ch] text-pretty text-start text-[clamp(1.875rem,6.5vw,2.375rem)] font-extrabold leading-[1.6] [overflow-wrap:break-word] sm:mt-5 md:text-[clamp(2.2rem,3.25vw,3rem)] md:leading-[1.5]"
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
          </div>

          <div
            className={`min-w-0 max-w-[74ch] space-y-3 border-s border-line ps-4 text-start text-[14px] text-ink-muted sm:space-y-4 sm:ps-5 sm:text-[15px] ${
              isRTL ? "leading-[1.95]" : "leading-[1.75]"
            }`}
          >
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph.id}>{paragraph.text}</p>
            ))}
          </div>
        </header>

        {/* A compact editorial register: one lead story, four supporting views. */}
        <div className="min-w-0 border-t border-line">
          <span aria-hidden="true" className="block h-[2px] w-14 bg-brand-accent" />

          {leadItem && (
              <article
                data-outlook-entry=""
                className="group relative grid min-w-0 gap-3 bg-[color-mix(in_srgb,var(--dnh-secondary)_24%,var(--dnh-text)_76%)] px-4 py-5 text-[var(--dnh-text-on-brand)] motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] sm:items-center sm:gap-7 sm:px-6 sm:py-6 lg:gap-12 lg:px-8"
              >
                <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                  <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center border border-[color-mix(in_srgb,var(--dnh-text-on-brand)_30%,transparent)] text-brand-accent sm:size-11">
                    <LeadIcon size={20} strokeWidth={1.6} />
                  </span>
                  <div className="min-w-0">
                    <span aria-hidden="true" dir="ltr" className="block w-fit text-[11px] font-semibold tabular-nums text-brand-accent">
                      01
                    </span>
                    <h3 className="mt-0.5 text-start text-[19px] font-bold leading-[1.65] sm:text-[21px]">
                      {leadItem.title}
                    </h3>
                    {leadItem.english_label && leadItem.english_label !== leadItem.title && (
                      <p className="mt-0.5 text-start text-[11px] text-[color-mix(in_srgb,var(--dnh-text-on-brand)_70%,transparent)]">
                        <bdi dir="ltr">{leadItem.english_label}</bdi>
                      </p>
                    )}
                  </div>
                </div>
                <p className={`min-w-0 max-w-[78ch] text-start text-[14px] text-[color-mix(in_srgb,var(--dnh-text-on-brand)_88%,transparent)] sm:text-[15px] ${
                  isRTL ? "leading-[1.9]" : "leading-[1.75]"
                }`}>
                  {leadItem.description}
                </p>
              </article>
          )}

          <ol start={2} className="grid min-w-0 grid-cols-1 border-x border-line bg-page sm:grid-cols-2 sm:[&>li:nth-child(odd)]:border-e">
            {otherItems.map((item, index) => {
              const Icon = outlookIcons[item.id as keyof typeof outlookIcons] ?? FileText;

              return (
                <li
                  key={item.id}
                  data-outlook-entry=""
                  className="group relative flex min-w-0 gap-3 border-b border-line px-4 py-5 motion-safe:transition-[opacity,transform,background-color] motion-safe:duration-500 motion-safe:ease-out hover:bg-surface-soft motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 sm:gap-4 sm:px-6 sm:py-6 lg:px-8"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-4 start-0 w-[2px] scale-y-0 bg-brand-accent motion-safe:origin-center motion-safe:transition-transform motion-safe:duration-300 group-hover:scale-y-100"
                  />
                  <div className="flex shrink-0 flex-col items-center gap-3">
                    <span className="flex size-10 items-center justify-center border border-line bg-surface-soft text-brand-primary sm:size-11">
                      <Icon size={20} strokeWidth={1.65} />
                    </span>
                    <span aria-hidden="true" dir="ltr" className="text-[11px] font-semibold tabular-nums text-ink-muted">
                      {String(index + 2).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-start text-[17px] font-bold leading-[1.65] [overflow-wrap:break-word] sm:text-[18px] lg:text-[19px]">
                      {item.title}
                    </h3>
                    {item.english_label && item.english_label !== item.title && (
                      <p className="mt-0.5 text-start text-[11px] leading-[1.6] text-brand-primary">
                        <bdi dir="ltr">{item.english_label}</bdi>
                      </p>
                    )}
                    <p className={`mt-2 max-w-[68ch] text-start text-[14px] text-ink-muted sm:mt-2.5 sm:text-[15px] ${
                      isRTL ? "leading-[1.9]" : "leading-[1.72]"
                    }`}>
                      {item.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Real editorial note and the existing primary action. */}
        <footer
          data-outlook-entry=""
          className="grid min-w-0 gap-5 pt-6 motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 sm:pt-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-8"
        >
          <p className={`min-w-0 max-w-[88ch] border-s-2 border-brand-accent ps-4 text-start text-[14px] text-ink-muted sm:ps-5 sm:text-[15px] ${
            isRTL ? "leading-[1.9]" : "leading-[1.75]"
          }`}>
            {content.closing}
          </p>
          <div className="flex min-w-0 flex-wrap gap-3">
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
                className="min-h-11 w-full min-w-0 max-w-full whitespace-normal text-start text-[13px] [overflow-wrap:anywhere] sm:w-auto"
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
