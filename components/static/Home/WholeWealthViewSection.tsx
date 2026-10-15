"use client";

import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Landmark,
  PieChart,
} from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import homeFa from "@/config/DNH_Homepage_Final_FA.json";
import homeEn from "@/config/DNH_Homepage_Final_EN.json";

type FrameworkContent = {
  id: "dnh-framework";
  type: "framework";
  eyebrow: string;
  english_label?: string;
  heading: string;
  heading_highlight?: string;
  intro: string;
  pillars: Array<{
    id: string;
    code: string;
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

const pillarImages = [
  "/assets/images/strategic-financial-advisory.webp",
  "/assets/images/portfolio-intelligence.webp",
  "/assets/images/private-wealth-strategy.webp",
];
const pillarIcons = [BarChart3, PieChart, Landmark];

export function HomeFramework() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const homepage = locale === "en" ? homeEn : homeFa;
  const content = homepage.sections.find(
    (section) => section.id === "dnh-framework" && section.type === "framework",
  ) as FrameworkContent | undefined;

  if (!content) return null;

  const highlight = content.heading_highlight ?? "";
  const highlightIndex = highlight ? content.heading.indexOf(highlight) : -1;
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="home-framework-heading"
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
        <header className="mx-auto max-w-[1120px] text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[12px] font-bold text-brand-primary sm:text-[13px]">
            <p>{content.eyebrow}</p>
            <span aria-hidden="true" className="h-[2px] w-11 bg-brand-accent" />
           
          </div>
          <h2
            id="home-framework-heading"
            className={`mx-auto mt-5 max-w-[24ch] text-pretty text-[clamp(2rem,7.8vw,3.1rem)] font-black tracking-[-0.03em] sm:text-[clamp(2.75rem,5vw,4.2rem)] ${isRTL ? "leading-[1.45]" : "leading-[1.13]"}`}
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
            className={`mx-auto mt-4 max-w-[90ch] text-[14px] text-ink-muted sm:text-[16px] ${isRTL ? "leading-[2]" : "leading-[1.72]"}`}
          >
            {content.intro}
          </p>
        </header>

        <ol
          dir="ltr"
          className="mt-9 grid min-w-0 grid-cols-1 gap-5 sm:mt-12 lg:grid-cols-3 lg:gap-7"
        >
          {content.pillars.map((pillar, index) => {
            const Icon = pillarIcons[index] ?? BarChart3;
            return (
              <li
                dir={direction}
                key={pillar.id}
                className="group min-w-0 border border-line bg-page transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-brand-primary motion-reduce:transform-none motion-reduce:transition-none"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-brand-primary">
                  <Image
                    src={pillarImages[index] ?? pillarImages[0]}
                    alt=""
                    fill
                    sizes="(max-width: 1023px) calc(100vw - 24px), 32vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transition-none"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-e from-transparent to-ink/45"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute end-4 top-4 size-5 bg-brand-accent"
                  />
                </div>
                <div
                  dir="ltr"
                  className="grid min-w-0 grid-cols-[4.75rem_minmax(0,1fr)] border-b border-line bg-page"
                >
                  <bdi
                    dir="ltr"
                    className="flex min-h-24 items-center justify-center bg-brand-primary text-[3.6rem] font-black leading-none text-white"
                  >
                    {pillar.code}
                  </bdi>
                  <div dir={direction} className="min-w-0 self-center p-4">
                    <h3
                      className={`text-start text-[20px] font-black sm:text-[22px] ${isRTL ? "leading-[1.6]" : "leading-[1.3]"}`}
                    >
                      {pillar.title}
                    </h3>
                    {pillar.english_label &&
                    pillar.english_label !== pillar.title ? (
                      <bdi
                        dir="ltr"
                        className="mt-1 block text-start text-[10px] tracking-[0.24em] text-brand-primary"
                      >
                        {pillar.english_label}
                      </bdi>
                    ) : null}
                  </div>
                </div>
                <div className="p-5 sm:p-6">
                  <span
                    aria-hidden="true"
                    className="mb-4 flex size-11 items-center justify-center bg-surface-soft text-brand-primary"
                  >
                    <Icon size={22} strokeWidth={1.6} />
                  </span>
                  <p
                    className={`text-start text-[14px] text-ink-muted sm:text-[15px] ${isRTL ? "leading-[1.95]" : "leading-[1.72]"}`}
                  >
                    {pillar.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <footer className="mx-auto mt-8 grid max-w-[1100px] gap-5 text-center sm:mt-10">
          <p
            className={`border-y border-line py-4 text-[14px] font-semibold text-ink-muted sm:text-[16px] ${isRTL ? "leading-[1.9]" : "leading-[1.68]"}`}
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
