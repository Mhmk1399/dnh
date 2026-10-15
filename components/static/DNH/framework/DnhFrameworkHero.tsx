"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import frameworkFa from "@/config/DNH_Framework_Final_FA.json";
import frameworkEn from "@/config/DNH_Framework_Final_EN.json";

type FrameworkSectionLookup = {
  id: string;
  type: string;
};

type FrameworkHeroContent = {
  order: number;
  id: "dnh-framework-hero";
  type: "hero";
  eyebrow: string;
  english_label: string;
  heading: string;
  paragraphs: Array<{
    id: string;
    text: string;
  }>;
  pillars: Array<{
    id: string;
    code: "D" | "N" | "H";
    title: string;
    english_label: string;
  }>;
  closing: string;
  ctas: Array<{
    id: string;
    label: string;
    type: "primary" | "secondary";
    href: string;
  }>;
};

export function FrameworkHero() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const framework = locale === "en" ? frameworkEn : frameworkFa;
  const content = framework.sections.find(
    (section: FrameworkSectionLookup) =>
      section.id === "dnh-framework-hero" && section.type === "hero",
  ) as FrameworkHeroContent | undefined;

  if (!content) return null;

  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const prose = content.paragraphs.slice(0, -1);
  const pillarsIntro = content.paragraphs.at(-1);

  return (
    <section
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="dnh-framework-hero-heading"
      className="relative isolate overflow-x-clip border-b border-line bg-brand-secondary text-[var(--dnh-text-on-brand)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage: `${
            isRTL
              ? "linear-gradient(to left,color-mix(in srgb,var(--dnh-primary) 54%,transparent),transparent 58%)"
              : "linear-gradient(to right,color-mix(in srgb,var(--dnh-primary) 54%,transparent),transparent 58%)"
          },linear-gradient(to bottom,color-mix(in srgb,var(--dnh-bg-page) 6%,transparent) 1px,transparent 1px),linear-gradient(to right,color-mix(in srgb,var(--dnh-bg-page) 5%,transparent) 1px,transparent 1px)`,
          backgroundSize: "auto,72px 72px,72px 72px",
        }}
      />

      <div className="dnh-site-shell relative z-10 grid min-w-0 gap-10 pb-14 pt-[calc(7.75rem+env(safe-area-inset-top))] sm:gap-12 sm:pb-16 sm:pt-36 lg:min-h-[min(58rem,100svh)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-x-14 lg:gap-y-8 lg:pb-20 lg:pt-[clamp(9.5rem,14svh,11.5rem)] xl:gap-x-20">
        <div className="min-w-0">
          <div className="flex min-w-0 items-center gap-3 text-start text-[12px] font-bold leading-[1.8] text-[color-mix(in_srgb,var(--dnh-text-on-brand)_90%,transparent)] sm:text-[13px]">
            <span
              aria-hidden="true"
              className="h-[2px] w-10 shrink-0 bg-brand-accent sm:w-12"
            />
            <p className="min-w-0">{content.eyebrow}</p>
          </div>

        

          <h1
            id="dnh-framework-hero-heading"
            className={`mt-5 max-w-[29ch] text-pretty text-start text-[clamp(2rem,8.8vw,2.45rem)] font-black [overflow-wrap:break-word] sm:mt-6 sm:text-[clamp(2.65rem,6vw,3.65rem)] lg:max-w-[24ch] lg:text-[clamp(3.1rem,4vw,3rem)] ${
              isRTL ? "leading-[1.55]" : "leading-[1.12]"
            }`}
          >
            {content.heading}
          </h1>

          <div
            className={`mt-6 max-w-[72ch] space-y-4 border-s-2 border-brand-accent ps-4 text-start text-[14px] text-[color-mix(in_srgb,var(--dnh-text-on-brand)_78%,transparent)] sm:mt-7 sm:ps-5 sm:text-[15px] lg:text-[16px] ${
              isRTL ? "leading-[2]" : "leading-[1.75]"
            }`}
          >
            {prose.map((paragraph) => (
              <p key={paragraph.id}>{paragraph.text}</p>
            ))}
          </div>
        </div>

        <div className="min-w-0">
          {pillarsIntro ? (
            <p
              className={`mb-4 text-start text-[13px] font-bold text-[color-mix(in_srgb,var(--dnh-text-on-brand)_70%,transparent)] sm:mb-5 sm:text-[14px] ${
                isRTL ? "leading-[1.9]" : "leading-[1.65]"
              }`}
            >
              {pillarsIntro.text}
            </p>
          ) : null}

          <div className="relative border-y border-[color-mix(in_srgb,var(--dnh-text-on-brand)_18%,transparent)]">
            <span
              aria-hidden="true"
              className="absolute inset-y-0 start-[7px] w-px bg-[color-mix(in_srgb,var(--dnh-accent)_70%,transparent)]"
            />

            {content.pillars.map((pillar, index) => (
              <div
                key={pillar.id}
                className="group relative grid min-w-0 grid-cols-[64px_minmax(0,1fr)] items-center gap-4 border-b border-[color-mix(in_srgb,var(--dnh-text-on-brand)_14%,transparent)] py-5 last:border-b-0 sm:grid-cols-[80px_minmax(0,1fr)] sm:gap-5 sm:py-6"
              >
                <div className="relative z-10 flex size-16 items-center justify-start ps-5 sm:size-20 sm:ps-6">
                  <span className="absolute start-[2px] top-1/2 size-3 -translate-y-1/2 border border-brand-accent bg-brand-secondary transition-transform duration-300 motion-reduce:transition-none group-hover:scale-125" />
                  <bdi
                    dir="ltr"
                    className="relative text-[32px] font-black leading-none text-brand-accent sm:text-[40px]"
                  >
                    {pillar.code}
                  </bdi>
                </div>

                <div className="min-w-0 py-1 text-start">
                  <p className="text-[18px] font-extrabold leading-[1.7] text-[var(--dnh-text-on-brand)] sm:text-[20px] lg:text-[22px]">
                    {pillar.title}
                  </p>
                  {locale === "fa" ? (
                    <bdi
                      dir="ltr"
                      className="mt-1 block w-fit max-w-full text-[11px] font-semibold tracking-[0.035em] text-[color-mix(in_srgb,var(--dnh-text-on-brand)_52%,transparent)] sm:text-[12px]"
                    >
                      {pillar.english_label}
                    </bdi>
                  ) : null}
                </div>

                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 end-0 w-[3px] origin-bottom scale-y-0 bg-brand-accent transition-transform duration-300 motion-reduce:transition-none group-hover:scale-y-100"
                />

              
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-0 lg:col-span-2">
          <div className="grid min-w-0 gap-5 border-t border-[color-mix(in_srgb,var(--dnh-text-on-brand)_18%,transparent)] pt-6 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <p
              className={`max-w-[80ch] text-start text-[13px] font-medium text-[color-mix(in_srgb,var(--dnh-text-on-brand)_72%,transparent)] sm:text-[14px] ${
                isRTL ? "leading-[1.95]" : "leading-[1.7]"
              }`}
            >
              {content.closing}
            </p>

            <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
              {content.ctas.map((cta) => (
                <ActionButton
                  key={cta.id}
                  href={cta.href}
                  variant="assessment"
                  size="lg"
                  icon={Arrow}
                  iconPosition="end"
                  dir={direction}
                  className={`min-h-12 w-full min-w-0 whitespace-normal text-center [overflow-wrap:anywhere] sm:w-auto ${
                    cta.type === "primary"
                      ? "bg-brand-accent   shadow-none hover:bg-brand-primary hover:shadow-none"
                      : "border-[color-mix(in_srgb,var(--dnh-text-on-brand)_34%,transparent)] bg-transparent  shadow-none hover:border-brand-accent hover:bg-[color-mix(in_srgb,var(--dnh-bg-page)_8%,transparent)] hover:text-[var(--dnh-text-on-brand)] hover:shadow-none"
                  }`}
                >
                  {cta.label}
                </ActionButton>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
