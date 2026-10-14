"use client";

import { useEffect, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  GitBranch,
  Layers3,
} from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import homeFa from "@/config/DNH_Homepage_Final_FA.json";
import homeEn from "@/config/DNH_Homepage_Final_EN.json";

const audienceIcons = {
  decision: GitBranch,
  portfolio: Layers3,
  holdings: Building2,
} as const;

type Audience = {
  id: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  icon: keyof typeof audienceIcons;
};

type WhoWeHelpContent = {
  id: "who-we-help";
  type: "audience_cards";
  eyebrow: string;
  heading: string;
  heading_highlight?: string;
  intro: string;
  audiences: Audience[];
};

export function HomeWhoWeHelp() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const homepage = locale === "en" ? homeEn : homeFa;
  const content = homepage.sections.find(
    (section) =>
      section.id === "who-we-help" && section.type === "audience_cards",
  ) as WhoWeHelpContent | undefined;

  useEffect(() => {
    const section = sectionRef.current;
    if (
      !section ||
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const pending = new Set<HTMLElement>();
    section
      .querySelectorAll<HTMLElement>("[data-audience-entry]")
      .forEach((node) => {
        node.removeAttribute("data-reveal");
        if (node.getBoundingClientRect().top > window.innerHeight - 32) {
          node.dataset.reveal = "pending";
          pending.add(node);
        }
      });
    if (!pending.size) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const node = entry.target as HTMLElement;
          node.dataset.reveal = "shown";
          pending.delete(node);
          observer.unobserve(node);
        }
        if (!pending.size) observer.disconnect();
      },
      { threshold: 0.06, rootMargin: "0px 0px -20px 0px" },
    );

    pending.forEach((node) => observer.observe(node));
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
      aria-labelledby="home-who-we-help-heading"
      className="relative border-t border-line bg-page py-12 text-ink sm:py-14 lg:py-[4.5rem]"
    >
      <div className="dnh-site-shell">
        <header className="grid min-w-0 gap-4 border-b border-line pb-7 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:items-end md:gap-10 lg:pb-8">
          <div className="min-w-0 text-start">
            <div className="flex min-w-0 items-center gap-3 text-xs font-semibold leading-7 text-brand-primary sm:text-[13px]">
              <span
                aria-hidden="true"
                className="h-[2px] w-8 shrink-0 bg-brand-accent"
              />
              <p>{content.eyebrow}</p>
            </div>
            <h2
              id="home-who-we-help-heading"
              className="mt-3 max-w-[34ch] text-pretty text-start text-[clamp(1.75rem,6vw,2.25rem)] font-extrabold leading-[1.55] [overflow-wrap:break-word] md:text-[clamp(2rem,3.1vw,2.625rem)]"
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
          <p
            className={`min-w-0 max-w-[68ch] text-start text-[14px] text-ink-muted sm:text-[15px] ${isRTL ? "leading-[1.9]" : "leading-[1.7]"}`}
          >
            {content.intro}
          </p>
        </header>

        <div className="grid min-w-0 divide-y divide-line md:grid-cols-3 md:divide-x-0 md:divide-y-0">
          {content.audiences.map((audience, index) => {
            const Icon = audienceIcons[audience.icon];
            return (
              <article
                key={audience.id}
                data-audience-entry=""
                className="group relative flex min-w-0 flex-col py-6 motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 sm:py-7 md:border-s md:border-line md:py-7 md:pe-6 md:ps-6 md:first:border-s-0 md:first:ps-0 md:last:pe-0 lg:pe-9 lg:ps-9"
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex size-9 shrink-0 items-center justify-center border border-line bg-surface-soft text-brand-primary"
                  >
                    <Icon size={19} strokeWidth={1.6} />
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-xs font-semibold tabular-nums text-ink-muted"
                  >
                    <bdi dir="ltr">{String(index + 1).padStart(2, "0")}</bdi>
                  </span>
                  <span
                    aria-hidden="true"
                    className="ms-auto h-px w-8 bg-line transition-colors duration-200 group-hover:bg-brand-accent motion-reduce:transition-none"
                  />
                </div>

                <h3
                  className={`mt-4 min-w-0 text-start text-[18px] font-bold [overflow-wrap:break-word] sm:text-[19px] lg:text-[20px] ${isRTL ? "leading-[1.65]" : "leading-[1.45]"}`}
                >
                  {audience.title}
                </h3>
                <p
                  className={`mt-2.5 min-w-0 text-start text-[14px] text-ink-muted [overflow-wrap:break-word] sm:text-[15px] ${isRTL ? "leading-[1.9]" : "leading-[1.7]"}`}
                >
                  {audience.description}
                </p>
                <div className="mt-auto min-w-0 pt-5">
                  <ActionButton
                    href={audience.href}
                    variant="secondary"
                    shape="square"
                    size="sm"
                    icon={Arrow}
                    iconPosition="end"
                    dir={direction}
                    className="min-h-11 max-w-full min-w-0 whitespace-normal text-start text-[12px] [overflow-wrap:anywhere] sm:text-[13px]"
                  >
                    {audience.cta}
                  </ActionButton>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
