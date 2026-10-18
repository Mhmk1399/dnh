"use client";

import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  GraduationCap,
  Layers3,
  Quote,
} from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import homeFa from "@/config/DNH_Homepage_Final_FA.json";
import homeEn from "@/config/DNH_Homepage_Final_EN.json";

const credentialIcons = {
  experience: BriefcaseBusiness,
  portfolio: Layers3,
  education: GraduationCap,
} as const;

type AboutContent = {
  id: "about-dr-nasim";
  type: "about";
  eyebrow: string;
  english_label?: string;
  heading: string;
  heading_highlight?: string;
  paragraphs: Array<{ id: string; text: string }>;
  credentials: Array<{
    id: string;
    value: string;
    label: string;
    icon: keyof typeof credentialIcons;
  }>;
  philosophy_intro: string;
  philosophy_quote: string;
  philosophy_media: {
    src: string;
    alt: string;
  };
  closing: string;
  ctas: Array<{
    id: string;
    label: string;
    type: "primary" | "secondary";
    href: string;
  }>;
  media: {
    src: string;
    mobile_src: string;
    alt: string;
    width: number;
    height: number;
  };
};

export function AboutDrNasimSection() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const homepage = locale === "en" ? homeEn : homeFa;
  const content = homepage.sections.find(
    (section) => section.id === "about-dr-nasim" && section.type === "about",
  ) as AboutContent | undefined;

  if (!content) return null;

  const highlight = content.heading_highlight ?? "";
  const highlightIndex = highlight ? content.heading.indexOf(highlight) : -1;
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="home-about-dr-nasim-heading"
      className="relative isolate overflow-hidden border-b border-line bg-page py-14 text-ink sm:py-18 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-primary/40 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute start-0 top-0 size-56 bg-[linear-gradient(135deg,color-mix(in_srgb,var(--dnh-primary)_10%,white)_25%,transparent_25%,transparent_50%,color-mix(in_srgb,var(--dnh-primary)_7%,white)_50%,color-mix(in_srgb,var(--dnh-primary)_7%,white)_75%,transparent_75%)] bg-[length:84px_84px] opacity-50"
      />

      <div className="dnh-site-shell relative z-10 grid min-w-0 gap-7 lg:grid-cols-[minmax(360px,0.78fr)_minmax(0,1.35fr)] lg:grid-rows-[auto_auto_auto_auto_auto] lg:gap-x-10 xl:gap-x-14">
        <header className="min-w-0 text-start lg:col-start-2 lg:row-start-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] font-bold text-brand-primary sm:text-[13px]">
            <p>{content.eyebrow}</p>
            <span aria-hidden="true" className="h-[2px] w-11 bg-brand-accent" />
           
          </div>

          <h2
            id="home-about-dr-nasim-heading"
            className={`mt-5 max-w-[28ch] text-pretty text-[clamp(2rem,7.3vw,3.1rem)] font-black tracking-[-0.035em] sm:text-[clamp(2.6rem,4.6vw,3.25rem)] ${
              isRTL ? "leading-[1.48]" : "leading-[1.13]"
            }`}
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
        </header>

        <div className="space-y-4 text-start lg:col-start-2 lg:row-start-2">
          {content.paragraphs.map((paragraph) => (
            <p
              key={paragraph.id}
              className={`border-s-2 border-brand-primary ps-4 text-[14px] text-ink-muted sm:text-[16px] ${
                isRTL ? "leading-[2]" : "leading-[1.75]"
              }`}
            >
              {paragraph.text}
            </p>
          ))}
        </div>

        <div className="relative aspect-[4/5] min-h-[480px] overflow-hidden border border-line bg-surface-soft lg:col-start-1 lg:row-span-5 lg:row-start-1 lg:h-full lg:min-h-[790px] lg:aspect-auto">
          <Image
            src={content.media.src}
            alt={content.media.alt}
            fill
            sizes="(max-width: 1023px) calc(100vw - 24px), 34vw"
            className="object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink/22 via-transparent to-transparent"
          />
          
        </div>

        {/* <dl className="grid min-w-0 grid-cols-1 border border-line bg-surface-soft sm:grid-cols-2 xl:grid-cols-4 lg:col-start-2 lg:row-start-3">
          {content.credentials.map((credential) => {
            const Icon = credentialIcons[credential.icon] ?? GraduationCap;

            return (
              <div
                key={credential.id}
                className="flex min-h-[118px] items-center gap-3 border-b border-line p-4 text-start last:border-b-0 sm:border-e sm:[&:nth-last-child(-n+2)]:border-b-0 xl:border-b-0"
              >
                <Icon
                  aria-hidden="true"
                  size={26}
                  strokeWidth={1.55}
                  className="shrink-0 text-brand-primary"
                />
                <div>
                  {credential.value ? (
                    <dd className="text-[26px] font-black text-brand-accent">
                      <bdi dir="auto">{credential.value}</bdi>
                    </dd>
                  ) : null}
                  <dt
                    className={`text-[12px] font-bold text-ink sm:text-[11px] ${
                      isRTL ? "leading-[1.75]" : "leading-[1.45]"
                    }`}
                  >
                    {credential.label}
                  </dt>
                </div>
              </div>
            );
          })}
        </dl> */}

        <blockquote className="relative isolate min-h-[170px] overflow-hidden border border-line p-5 sm:p-7 lg:col-start-2 lg:row-start-4">
          <Image
            src={content.philosophy_media.src}
            alt={content.philosophy_media.alt}
            fill
            sizes="(max-width: 1023px) calc(100vw - 24px), 58vw"
            className="-z-20 object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-page/88"
          />
          <div className="flex items-center gap-3 text-start text-[13px] font-bold text-brand-primary sm:text-[14px]">
            <span aria-hidden="true" className="h-[2px] w-10 bg-brand-accent" />
            <p>{content.philosophy_intro}</p>
          </div>
          <Quote
            aria-hidden="true"
            size={28}
            strokeWidth={1.5}
            className="mt-4 text-brand-accent"
          />
          <p
            className={`mt-2 max-w-[50ch] text-start text-[18px] font-black sm:text-[22px] ${
              isRTL ? "leading-[1.75]" : "leading-[1.45]"
            }`}
          >
            {content.philosophy_quote}
          </p>
        </blockquote>

        <footer className="grid min-w-0 gap-4 lg:col-start-2 lg:row-start-5">
          <p
            className={`border-s-2 border-brand-primary ps-4 text-start text-[13px] text-ink-muted sm:text-[13px] ${
              isRTL ? "leading-[1.9]" : "leading-[1.7]"
            }`}
          >
            {content.closing}
          </p>

          <div className="flex justify-start">
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
                className="w-full bg-brand-accent shadow-none hover:bg-brand-primary hover:shadow-none sm:w-auto sm:min-w-[290px]"
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
