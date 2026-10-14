"use client";

import { useEffect, useRef } from "react";
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

type ProblemItem = {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof problemIcons;
};

type ProblemRecognitionContent = {
  id: "problem-recognition";
  type: "problem_list";
  eyebrow: string;
  heading: string;
  heading_highlight?: string;
  intro: string;
  items: ProblemItem[];
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
  const sectionRef = useRef<HTMLElement>(null);

  const homepage = locale === "en" ? homeEn : homeFa;
  const content = homepage.sections.find(
    (section) =>
      section.id === "problem-recognition" && section.type === "problem_list",
  ) as ProblemRecognitionContent | undefined;

  // Enhance only off-screen rows. Without JS, all content remains visible.
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

    root
      .querySelectorAll<HTMLElement>("[data-problem-entry]")
      .forEach((row) => {
        row.removeAttribute("data-reveal");
        if (row.getBoundingClientRect().top > window.innerHeight - 48) {
          row.dataset.reveal = "pending";
          pending.add(row);
        }
      });

    if (pending.size === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const row = entry.target as HTMLElement;
          row.dataset.reveal = "shown";
          pending.delete(row);
          observer.unobserve(row);
        });

        if (pending.size === 0) observer.disconnect();
      },
      { threshold: 0.08, rootMargin: "0px 0px -32px 0px" },
    );

    pending.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, [locale]);

  if (!content) return null;

  const highlight = content.heading_highlight ?? "";
  const highlightIndex = highlight ? content.heading.indexOf(highlight) : -1;
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section
      ref={sectionRef}
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="home-problem-recognition-heading"
      className="relative isolate overflow-x-clip border-y border-line/20 bg-[color-mix(in_srgb,var(--dnh-secondary)_18%,var(--dnh-text)_82%)] py-12 text-[var(--dnh-text-on-brand)] sm:py-14 lg:py-16"
    >
      <div className="dnh-site-shell">
        <header className="grid min-w-0 gap-4 pb-7 sm:gap-5 sm:pb-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end lg:gap-12 lg:pb-9">
          <div className="min-w-0 text-start">
            <div className="flex min-w-0 items-center gap-2.5 text-[11px] font-medium leading-[1.9] text-page/70 sm:text-[12px]">
              <span
                aria-hidden="true"
                className="h-px w-6 shrink-0 bg-brand-accent sm:w-8"
              />
              <p className="min-w-0">{content.eyebrow}</p>
            </div>

            <h2
              id="home-problem-recognition-heading"
              className={`mt-3 max-w-[30ch] text-pretty text-start text-[clamp(1.625rem,6.7vw,2rem)] font-extrabold [overflow-wrap:break-word] sm:text-[34px] lg:text-[40px] xl:text-[44px] ${
                isRTL ? "leading-[1.65]" : "leading-[1.3]"
              }`}
            >
              {highlightIndex === -1 ? (
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

          <p
            className={`min-w-0 max-w-[66ch] text-start text-[13px] text-page/75 sm:text-[14px] lg:mb-1 lg:text-[15px] ${
              isRTL ? "leading-[2]" : "leading-[1.8]"
            }`}
          >
            {content.intro}
          </p>
        </header>

        {/* These are independent situations, not sequential steps. */}
        <ul role="list" className="grid min-w-0 grid-cols-1 gap-x-8 border-t border-page/15 md:grid-cols-2 md:gap-x-10 lg:gap-x-14">
          {content.items.map((item) => {
            const Icon = problemIcons[item.icon] ?? Compass;

            return (
              <li
                key={item.id}
                data-problem-entry=""
                className="group flex min-w-0 items-start gap-3 border-b border-page/15 py-5 motion-safe:transition-[opacity,transform] motion-safe:duration-300 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 sm:gap-4 sm:py-6"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex size-8 shrink-0 items-center justify-center bg-page/5 text-page/75 transition-colors duration-200 group-hover:text-brand-accent motion-reduce:transition-none sm:size-9"
                >
                  <Icon size={19} strokeWidth={1.6} />
                </span>

                <div className="min-w-0 flex-1 text-start">
                  <h3
                    className={`text-pretty text-[16px] font-bold text-page [overflow-wrap:break-word] sm:text-[17px] lg:text-[18px] ${
                      isRTL ? "leading-[1.85]" : "leading-[1.55]"
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`mt-1.5 max-w-[65ch] text-[13px] font-normal text-page/70 sm:mt-2 sm:text-[14px] ${
                      isRTL ? "leading-[1.95]" : "leading-[1.75]"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-7 flex min-w-0 flex-col gap-5 sm:mt-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <p
            className={`min-w-0 max-w-[88ch] flex-1 border-s-2 border-brand-accent/80 ps-4 text-start text-[13px] font-normal text-page/80 sm:ps-5 sm:text-[14px] ${
              isRTL ? "leading-[1.95]" : "leading-[1.75]"
            }`}
          >
            {content.closing}
          </p>

          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap lg:shrink-0">
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
                className="min-h-11 w-full min-w-0 whitespace-normal text-center shadow-none [overflow-wrap:anywhere] hover:shadow-none sm:w-auto sm:max-w-full"
              >
                {cta.label}
              </ActionButton>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
