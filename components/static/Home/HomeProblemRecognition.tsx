"use client";

import Image from "next/image";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Building2,
  Compass,
  Layers3,
  ShieldAlert,
  UsersRound,
} from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import homeFa from "@/config/DNH_Homepage_Final_FA.json";
import homeEn from "@/config/DNH_Homepage_Final_EN.json";

const problemIcons = {
  decision: Compass,
  portfolio: Layers3,
  market: Activity,
  risk: ShieldAlert,
  advisory: Building2,
  briefing: UsersRound,
} as const;

const PROBLEM_IMAGE_VERSION = "20261017";

type ProblemContent = {
  id: "problem-recognition";
  type: "problem_list";
  eyebrow: string;
  heading: string;
  heading_highlight?: string;
  intro: string;
  items: Array<{
    id: string;
    title: string;
    description: string;
    icon: keyof typeof problemIcons;
    media: {
      src: string;
      alt: string;
    };
  }>;
  closing: string;
  ctas: Array<{
    id: string;
    label: string;
    type: "primary" | "secondary";
    href: string;
  }>;
};

export function HomeProblemRecognition() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const homepage = locale === "en" ? homeEn : homeFa;
  const content = homepage.sections.find(
    (section) =>
      section.id === "problem-recognition" && section.type === "problem_list",
  ) as ProblemContent | undefined;

  if (!content) return null;

  const highlight = content.heading_highlight ?? "";
  const highlightIndex = highlight ? content.heading.indexOf(highlight) : -1;
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="home-problem-recognition-heading"
      className="relative isolate overflow-hidden border-b border-line bg-page py-14 text-ink sm:py-18 lg:py-24"
    >
      <div className="dnh-site-shell relative z-10 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.9fr)] lg:grid-rows-[auto_auto_auto] lg:gap-x-4 ">
        <header className="min-w-0 text-start lg:col-start-1 lg:row-start-1">
          <div className="flex items-center gap-3 text-[12px] font-bold text-brand-primary sm:text-[13px]">
            <span aria-hidden="true" className="h-[2px] w-10 bg-brand-accent" />
            <p>{content.eyebrow}</p>
          </div>
          <h2
            id="home-problem-recognition-heading"
            className={`mt-5 max-w-[24ch] text-pretty text-[clamp(2rem,7.8vw,3rem)] font-black tracking-[-0.03em] sm:text-[clamp(2.65rem,4.8vw,3rem)] lg:max-w-none ${isRTL ? "leading-[1.45]" : "leading-[1.14]"}`}
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
            className={`mt-4 max-w-[94ch] text-[14px] text-ink-muted sm:text-[16px] ${isRTL ? "leading-[2]" : "leading-[1.72]"}`}
          >
            {content.intro}
          </p>
        </header>

        <div className="relative aspect-[4/5] min-h-[430px] overflow-hidden border border-line bg-brand-primary lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:h-full lg:max-h-full lg:aspect-auto">
          <Image
            src="/assets/images/home-problem-recognition-heading.webp"
            alt=""
            fill
            sizes="(max-width: 1023px) calc(100vw - 24px), 38vw"
            className="object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-brand-primary/15"
          />
        </div>

        <ul
          role="list"
          className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 lg:col-start-1 lg:row-start-2  "
        >
          {content.items.map((item) => {
            const Icon = problemIcons[item.icon] ?? Compass;
            const mediaSrc = item.media.src.trim();
            const versionedMediaSrc = `${mediaSrc}${mediaSrc.includes("?") ? "&" : "?"}v=${PROBLEM_IMAGE_VERSION}`;

            return (
              <li
                key={item.id}
                className="group min-w-0 border border-line bg-page transition-colors duration-300 hover:border-brand-primary motion-reduce:transition-none"
              >
                <div className="relative aspect-[16/7] overflow-hidden bg-brand-primary">
                  <Image
                    src={versionedMediaSrc}
                    alt={item.media.alt}
                    fill
                    sizes="(max-width: 639px) calc(100vw - 24px), (max-width: 1279px) 48vw, 20vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transition-none"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-brand-primary/10"
                  />
             
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-5 bottom-0 h-px bg-white/35"
                  />
                </div>
                <div className="relative p-4 pt-7 sm:p-5 sm:pt-8">
                  <span
                    aria-hidden="true"
                    className="absolute start-4 top-0 flex size-11 -translate-y-1/2 items-center justify-center border border-line bg-surface-soft text-brand-primary sm:start-5"
                  >
                    <Icon size={21} strokeWidth={1.6} />
                  </span>
                  <h3
                    className={`text-start text-[16px] font-black sm:text-[17px] ${isRTL ? "leading-[1.75]" : "leading-[1.42]"}`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`mt-2 text-start text-[13px] text-ink-muted sm:text-[14px] ${isRTL ? "leading-[1.9]" : "leading-[1.68]"}`}
                  >
                    {item.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        <footer className="grid min-w-0 gap-4 border border-line bg-surface-soft p-4 sm:p-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center lg:col-start-1 lg:row-start-3 lg:mt-5">
          <p
            className={`border-s-2 border-brand-primary ps-4 text-start text-[13px] text-ink-muted sm:text-[14px] ${isRTL ? "leading-[1.9]" : "leading-[1.7]"}`}
          >
            {content.closing}
          </p>
          <div className="flex flex-wrap gap-3">
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
          </div>
        </footer>
      </div>
    </section>
  );
}
