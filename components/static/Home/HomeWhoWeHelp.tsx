"use client";

import Image from "next/image";
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
const audienceImages = {
  "major-financial-decision": "/assets/images/big-financial-decision4.webp",
  "unstructured-portfolio": "/assets/images/unstructured-portfolio4.webp",
  "complex-business-capital": "/assets/images/complex-business-capital4.webp",
} as const;

type AudienceContent = {
  id: "who-we-help";
  type: "audience_cards";
  eyebrow: string;
  heading: string;
  heading_highlight?: string;
  intro: string;
  audiences: Array<{
    id: string;
    title: string;
    description: string;
    cta: string;
    href: string;
    icon: keyof typeof audienceIcons;
  }>;
};

export function HomeWhoWeHelp() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const homepage = locale === "en" ? homeEn : homeFa;
  const content = homepage.sections.find(
    (section) =>
      section.id === "who-we-help" && section.type === "audience_cards",
  ) as AudienceContent | undefined;

  if (!content) return null;

  const highlight = content.heading_highlight ?? "";
  const highlightIndex = highlight ? content.heading.indexOf(highlight) : -1;
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="home-who-we-help-heading"
      className="relative isolate overflow-hidden border-b border-line bg-page py-14 text-ink sm:py-18 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="absolute end-0 top-0 size-40 border-s border-b border-line bg-[linear-gradient(135deg,color-mix(in_srgb,var(--dnh-primary)_10%,white)_25%,transparent_25%,transparent_50%,color-mix(in_srgb,var(--dnh-primary)_7%,white)_50%,color-mix(in_srgb,var(--dnh-primary)_7%,white)_75%,transparent_75%)] bg-[length:80px_80px]"
      />
      <div className="dnh-site-shell relative z-10">
        <header className="mx-auto max-w-[1040px] text-center">
          <div className="flex items-center justify-center gap-3 text-[12px] font-bold text-brand-primary sm:text-[13px]">
            <p>{content.eyebrow}</p>
            <span aria-hidden="true" className="h-[2px] w-12 bg-brand-accent" />
          </div>
          <h2
            id="home-who-we-help-heading"
            className={`mt-5 text-pretty text-[clamp(2rem,7.7vw,3.2rem)] font-black tracking-[-0.03em] sm:text-[clamp(2.8rem,5.2vw,3rem)] ${isRTL ? "leading-[1.45]" : "leading-[1.13]"}`}
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
            className={`mx-auto mt-4 max-w-[80ch] text-[14px] text-ink-muted sm:text-[16px] ${isRTL ? "leading-[2]" : "leading-[1.72]"}`}
          >
            {content.intro}
          </p>
        </header>

        <div className="mt-9 grid min-w-0 grid-cols-1 gap-5 sm:mt-12 lg:grid-cols-3 lg:gap-7">
          {content.audiences.map((audience) => {
            const Icon = audienceIcons[audience.icon];
            const image =
              audienceImages[audience.id as keyof typeof audienceImages];
            return (
              <article
                key={audience.id}
                className="group flex min-w-0 flex-col border border-line bg-page transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-brand-primary motion-reduce:transform-none motion-reduce:transition-none"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-surface-soft">
                  {image ? (
                    <Image
                      src={image}
                      alt=""
                      fill
                      sizes="(max-width: 1023px) calc(100vw - 24px), 32vw"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transition-none"
                    />
                  ) : null}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute end-4 top-4 size-5 bg-brand-accent"
                  />
                </div>
                <div className="relative flex min-w-0 flex-1 flex-col p-5 pt-8 sm:p-6 sm:pt-9">
                  <span
                    aria-hidden="true"
                    className="absolute start-5 top-0 flex size-12 -translate-y-1/2 items-center justify-center border border-line bg-surface-soft text-brand-primary sm:start-6"
                  >
                    <Icon size={23} strokeWidth={1.6} />
                  </span>
                  <h3
                    className={`text-start text-[20px] font-black sm:text-[22px] ${isRTL ? "leading-[1.65]" : "leading-[1.35]"}`}
                  >
                    {audience.title}
                  </h3>
                  <p
                    className={`mt-4 text-start text-[14px] text-ink-muted sm:text-[15px] ${isRTL ? "leading-[1.95]" : "leading-[1.72]"}`}
                  >
                    {audience.description}
                  </p>
                  <div className="mt-auto pt-5">
                    <ActionButton
                      href={audience.href}
                      variant="secondary"
                      shape="square"
                      size="sm"
                      icon={Arrow}
                      iconPosition="end"
                      dir={direction}
                      className="min-h-11 w-full justify-between border-line bg-page text-start text-[13px] shadow-none hover:shadow-none"
                    >
                      {audience.cta}
                    </ActionButton>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
