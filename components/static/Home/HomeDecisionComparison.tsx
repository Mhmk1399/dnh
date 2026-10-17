"use client";

import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Box,
  Clock3,
  LineChart,
  ListChecks,
  Network,
  Newspaper,
  PieChart,
  RefreshCcw,
  Target,
  Users,
  Waves,
} from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import homeFa from "@/config/DNH_Homepage_Final_FA.json";
import homeEn from "@/config/DNH_Homepage_Final_EN.json";

type ComparisonContent = {
  id: "market-noise-vs-structured-decision";
  type: "comparison";
  eyebrow: string;
  heading: string;
  heading_highlight?: string;
  intro: string;
  columns: Array<{
    id: string;
    title: string;
    items: Array<{ id: string; text: string }>;
  }>;
  closing: string;
  ctas: Array<{
    id: string;
    label: string;
    type: "primary" | "secondary";
    href: string;
  }>;
};

const reactiveIcons = [Newspaper, LineChart, Users, RefreshCcw, Box];
const structuredIcons = [Target, PieChart, BarChart3, Clock3, Network];

export function HomeDecisionComparison() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const homepage = locale === "en" ? homeEn : homeFa;
  const content = homepage.sections.find(
    (section) =>
      section.id === "market-noise-vs-structured-decision" &&
      section.type === "comparison",
  ) as ComparisonContent | undefined;

  if (!content) return null;

  const highlight = content.heading_highlight ?? "";
  const highlightIndex = highlight ? content.heading.indexOf(highlight) : -1;
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="home-decision-comparison-heading"
      className="relative isolate overflow-hidden border-b border-line bg-page py-14 text-ink sm:py-18 lg:py-24"
    >
      <div className="dnh-site-shell grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:grid-rows-[auto_auto_auto] lg:gap-x-10 xl:gap-x-14">
        <header className="min-w-0 text-start lg:col-start-1 lg:row-start-1">
          <div className="flex items-center gap-3 text-[12px] font-bold text-brand-primary sm:text-[13px]">
            <p>{content.eyebrow}</p>
            <span aria-hidden="true" className="h-[2px] w-11 bg-brand-accent" />
          </div>
          <h2
            id="home-decision-comparison-heading"
            className={`mt-5 max-w-[22ch] text-pretty text-[clamp(2rem,7.8vw,3.1rem)] font-black tracking-[-0.03em] sm:text-[clamp(2.7rem,4.8vw,4rem)] lg:max-w-none ${isRTL ? "leading-[1.45]" : "leading-[1.13]"}`}
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
          <p
            className={`mt-4 max-w-[74ch] text-[14px] text-ink-muted sm:text-[16px] ${isRTL ? "leading-[2]" : "leading-[1.72]"}`}
          >
            {content.intro}
          </p>
        </header>

        <div className="relative aspect-[4/5] min-h-[460px] overflow-hidden border border-line bg-brand-primary lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:h-full lg:min-h-[780px] lg:aspect-auto">
          <Image
            src="/assets/images/market-noise-vs-structured-decision.webp"
            alt=""
            fill
            sizes="(max-width: 1023px) calc(100vw - 24px), 42vw"
            className="object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink/45 via-brand-primary/5 to-transparent"
          />
          <span
            aria-hidden="true"
            className="absolute end-6 top-6 size-6 bg-brand-accent"
          />
        
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 lg:col-start-1 lg:row-start-2 lg:mt-7">
          {content.columns.map((column) => {
            const structured = column.id === "structured";
            const HeaderIcon = structured ? ListChecks : Waves;
            const icons = structured ? structuredIcons : reactiveIcons;
            return (
              <article
                key={column.id}
                className="min-w-0 border border-line bg-page"
              >
                <div
                  className={`flex min-h-16 items-center gap-3 px-4 py-3 text-white sm:px-5 ${structured ? "bg-brand-primary" : "bg-brand-accent"}`}
                >
                  <HeaderIcon size={25} strokeWidth={1.65} />
                  <h3
                    className={`text-[19px] font-black sm:text-[21px] ${isRTL ? "leading-[1.6]" : "leading-[1.35]"}`}
                  >
                    {column.title}
                  </h3>
                </div>
                <ul role="list" className="divide-y divide-line">
                  {column.items.map((item, index) => {
                    const Icon = icons[index] ?? Target;
                    return (
                      <li
                        key={item.id}
                        className="flex min-w-0 items-start gap-3 p-4 sm:p-5"
                      >
                        <span
                          aria-hidden="true"
                          className={`flex size-8 shrink-0 items-center justify-center ${structured ? "bg-surface-soft text-brand-primary" : "bg-[color-mix(in_srgb,var(--dnh-accent)_8%,white)] text-brand-accent"}`}
                        >
                          <Icon size={20} strokeWidth={1.65} />
                        </span>
                        <span
                          className={`min-w-0 flex-1 text-start text-[14px] font-semibold text-ink-muted sm:text-[13px] ${isRTL ? "leading-[1.85]" : "leading-[1.65]"}`}
                        >
                          {item.text}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </article>
            );
          })}
        </div>

        <footer className="grid min-w-0 gap-4 border border-line bg-surface-soft p-4 sm:p-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center lg:col-start-1 lg:row-start-3 lg:mt-5">
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
