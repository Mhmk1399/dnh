"use client";

import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  BrainCircuit,
  GitBranch,
  Globe2,
  Landmark,
  Layers3,
  ShieldCheck,
} from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import homeFa from "@/config/DNH_Homepage_Final_FA.json";
import homeEn from "@/config/DNH_Homepage_Final_EN.json";

type InsightsContent = {
  id: "insights";
  type: "insight_categories";
  eyebrow: string;
  english_label?: string;
  heading: string;
  heading_highlight?: string;
  paragraphs: Array<{ id: string; text: string }>;
  categories: Array<{
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

const categoryIcons = {
  "wealth-architecture": Landmark,
  "financial-decision-making": GitBranch,
  "risk-and-protection": ShieldCheck,
  "asset-allocation": Layers3,
  "economy-inflation-currency": Globe2,
  "behavioral-finance": BrainCircuit,
} as const;
const categoryImages = [
  "/assets/images/private-wealth-strategy.webp",
  "/assets/images/strategic-financial-advisory.webp",
  "/assets/images/risk-management-wealth-protection.webp",
  "/assets/images/portfolio-intelligence.webp",
  "/assets/images/macro-market-advisory.webp",
  "/assets/images/executive-briefings.webp",
];

export function HomeInsights() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const homepage = locale === "en" ? homeEn : homeFa;
  const content = homepage.sections.find(
    (section) =>
      section.id === "insights" && section.type === "insight_categories",
  ) as InsightsContent | undefined;

  if (!content) return null;

  const highlight = content.heading_highlight ?? "";
  const highlightIndex = highlight ? content.heading.indexOf(highlight) : -1;
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="home-insights-heading"
      className="relative isolate overflow-hidden border-b border-line bg-page py-14 text-ink sm:py-18 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(to right,color-mix(in srgb,var(--dnh-primary) 9%,transparent) 1px,transparent 1px),linear-gradient(to bottom,color-mix(in srgb,var(--dnh-primary) 7%,transparent) 1px,transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "linear-gradient(90deg,black,transparent 22%,transparent 78%,black)",
        }}
      />
      <div className="dnh-site-shell relative z-10">
        <header className="mx-auto max-w-[1180px] text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[12px] font-bold text-brand-primary sm:text-[13px]">
            <p>{content.eyebrow}</p>
            <span aria-hidden="true" className="h-[2px] w-11 bg-brand-accent" />
          
          </div>
          <h2
            id="home-insights-heading"
            className={`mx-auto mt-5 max-w-[36ch] text-pretty text-[clamp(2rem,7.8vw,3.1rem)] font-black tracking-[-0.03em] sm:text-[clamp(2.75rem,5vw,3rem)] ${isRTL ? "leading-[1.45]" : "leading-[1.13]"}`}
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
            className={`mx-auto mt-4 max-w-[104ch] space-y-2 text-[14px] text-ink-muted sm:text-[16px] ${isRTL ? "leading-[2]" : "leading-[1.72]"}`}
          >
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph.id}>{paragraph.text}</p>
            ))}
          </div>
        </header>

        <div className="mt-9 grid min-w-0 grid-cols-1 gap-5 sm:mt-12 md:grid-cols-2 xl:grid-cols-3 xl:gap-7">
          {content.categories.map((category, index) => {
            const Icon =
              categoryIcons[category.id as keyof typeof categoryIcons] ??
              BookOpenText;
            return (
              <article
                key={category.id}
                className="group min-w-0 border border-line bg-page transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-brand-primary motion-reduce:transform-none motion-reduce:transition-none"
              >
                <div className="relative aspect-[16/7] overflow-hidden bg-brand-primary">
                  <Image
                    src={categoryImages[index] ?? categoryImages[0]}
                    alt=""
                    fill
                    sizes="(max-width: 767px) calc(100vw - 24px), (max-width: 1279px) 48vw, 31vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transition-none"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-e from-transparent to-ink/35"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute end-4 top-4 size-5 bg-brand-accent"
                  />
                </div>
                <div className="relative p-5 pt-8 sm:p-6 sm:pt-9">
                  <span
                    aria-hidden="true"
                    className="absolute start-5 top-0 flex size-12 -translate-y-1/2 items-center justify-center bg-surface-soft text-brand-primary sm:start-6"
                  >
                    <Icon size={23} strokeWidth={1.6} />
                  </span>
                  <h3
                    className={`text-start text-[19px] font-black sm:text-[21px] ${isRTL ? "leading-[1.65]" : "leading-[1.34]"}`}
                  >
                    {category.title}
                  </h3>
                  {category.english_label &&
                  category.english_label !== category.title ? (
                    <bdi
                      dir="ltr"
                      className="mt-1 block text-start text-[10px] tracking-[0.2em] text-brand-primary"
                    >
                      {category.english_label}
                    </bdi>
                  ) : null}
                  <p
                    className={`mt-3 text-start text-[14px] text-ink-muted sm:text-[15px] ${isRTL ? "leading-[1.9]" : "leading-[1.68]"}`}
                  >
                    {category.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <footer className="mx-auto mt-7 grid max-w-[1080px] gap-5 text-center sm:mt-9">
          <p
            className={`border-y border-line py-4 text-[14px] text-ink-muted sm:text-[15px] ${isRTL ? "leading-[1.9]" : "leading-[1.68]"}`}
          >
            {content.closing}
          </p>
          <div className="flex justify-center">
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
                className="w-full bg-brand-accent shadow-none hover:bg-brand-primary hover:shadow-none sm:w-auto sm:min-w-[280px]"
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
