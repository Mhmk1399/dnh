"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import servicesFa from "@/config/DNH_Services_Overview_Final_FA.json";
import servicesEn from "@/config/DNH_Services_Overview_Final_EN.json";

export type ServiceId =
  | "private-wealth-strategy"
  | "portfolio-intelligence"
  | "strategic-financial-advisory"
  | "macro-market-advisory"
  | "risk-management-wealth-protection"
  | "executive-briefings";

export type ServiceLayout =
  | "media"
  | "focus"
  | "statement"
  | "analysis"
  | "protection"
  | "briefing";

export type ServiceTone = "page" | "soft" | "primary" | "secondary";

export type ServicesServiceSectionProps = {
  serviceId: ServiceId;
  layout: ServiceLayout;
  tone: ServiceTone;
  mediaSide?: "start" | "end";
};

type ServiceContent = {
  order: number;
  id: ServiceId;
  type: "service-card";
  service_slug: ServiceId;
  eyebrow: string;
  english_label: string;
  heading: string;
  heading_highlight?: string;
  paragraphs: string[];
  ctas: Array<{
    id: string;
    label: string;
    type: "primary" | "secondary";
    href: string;
  }>;
  icon?: string;
  focus_areas?: Array<{
    id: string;
    label: string;
  }>;
  media?: {
    src: string;
    mobile_src?: string;
    alt: string;
    width: number;
    height: number;
  };
};

const toneClasses: Record<ServiceTone, string> = {
  page: "bg-page text-ink border-line",
  soft: "bg-surface-soft text-ink border-line",
  primary: "bg-brand-primary text-[var(--dnh-text-on-brand)] border-white/15",
  secondary:
    "bg-brand-secondary text-[var(--dnh-text-on-brand)] border-white/15",
};

function HighlightedHeading({
  heading,
  highlight,
  dark,
}: {
  heading: string;
  highlight?: string;
  dark: boolean;
}) {
  if (!highlight) return <>{heading}</>;

  const index = heading.indexOf(highlight);
  if (index < 0) return <>{heading}</>;

  return (
    <>
      {heading.slice(0, index)}
      <span className={dark ? "text-brand-accent" : "text-brand-accent"}>
        {heading.slice(index, index + highlight.length)}
      </span>
      {heading.slice(index + highlight.length)}
    </>
  );
}

function ServiceHeader({
  content,
  dark,
  isRTL,
}: {
  content: ServiceContent;
  dark: boolean;
  isRTL: boolean;
}) {
  return (
    <header>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span aria-hidden="true" className="h-[2px] w-10 bg-brand-accent" />
        <p
          className={`text-[12px] font-extrabold sm:text-[13px] ${
            dark ? "text-white" : "text-brand-primary"
          } ${isRTL ? "leading-[1.9]" : "leading-[1.5]"}`}
        >
          {content.eyebrow}
        </p>
       
      </div>

      <h2
        id={`${content.id}-heading`}
        className={`mt-5 max-w-[21ch] text-pretty font-black tracking-[-0.035em] ${
          isRTL ? "leading-[1.42]" : "leading-[1.04]"
        }`}
        style={{ fontSize: "clamp(2.15rem, 4.15vw, 4.65rem)" }}
      >
        <HighlightedHeading
          heading={content.heading}
          highlight={content.heading_highlight}
          dark={dark}
        />
      </h2>
    </header>
  );
}

function ServiceCta({
  content,
  dark,
  isRTL,
}: {
  content: ServiceContent;
  dark: boolean;
  isRTL: boolean;
}) {
  const cta = content.ctas[0];
  if (!cta) return null;

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <ActionButton
      href={cta.href}
      variant={cta.type}
      size="lg"
      icon={Arrow}
      iconPosition="end"
      contentAlignment="between"
      className={`w-full shadow-none sm:w-auto ${
        dark
          ? "bg-brand-accent text-white hover:bg-white hover:text-brand-primary hover:shadow-none"
          : "hover:shadow-none"
      }`}
    >
      {cta.label}
    </ActionButton>
  );
}

function MediaLayout({
  content,
  dark,
  isRTL,
  mediaSide,
}: {
  content: ServiceContent;
  dark: boolean;
  isRTL: boolean;
  mediaSide: "start" | "end";
}) {
  const imageSrc = content.media?.src?.trim();

  return (
    <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.03fr)_minmax(320px,0.97fr)] lg:gap-14 xl:gap-16">
      <div
        className={`min-w-0 ${
          mediaSide === "start" ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <ServiceHeader content={content} dark={dark} isRTL={isRTL} />

        <div className="mt-7 max-w-[46rem] space-y-4">
          {content.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className={`${
                index === 0 ? "font-semibold" : "font-medium"
              } text-[14px] sm:text-[15px] lg:text-[16px] ${
                dark ? "text-white/75" : "text-ink-muted"
              } ${isRTL ? "leading-[2.05]" : "leading-[1.8]"}`}
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-7">
          <ServiceCta content={content} dark={dark} isRTL={isRTL} />
        </div>
      </div>

      <div
        className={`min-w-0 ${
          mediaSide === "start" ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <div className="relative aspect-[5/6] min-h-[320px] overflow-hidden border border-line sm:min-h-[420px] lg:min-h-[570px]">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={content.media?.alt || content.heading}
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-surface-soft" />
          )}
          <span
            aria-hidden="true"
            className="absolute inset-y-0 start-0 w-[3px] bg-brand-accent"
          />
        </div>
      </div>
    </div>
  );
}

function FocusLayout({
  content,
  dark,
  isRTL,
}: {
  content: ServiceContent;
  dark: boolean;
  isRTL: boolean;
}) {
  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)] lg:items-end lg:gap-14">
        <ServiceHeader content={content} dark={dark} isRTL={isRTL} />
        <p
          className={`text-[15px] font-semibold sm:text-[16px] lg:text-[17px] ${
            dark ? "text-white/72" : "text-ink-muted"
          } ${isRTL ? "leading-[2]" : "leading-[1.8]"}`}
        >
          {content.paragraphs[0]}
        </p>
      </div>

      <div className="mt-8 border-y border-line-strong bg-brand-primary text-white lg:mt-10">
        <p
          className={`border-b border-white/15 px-5 py-5 text-[15px] font-bold sm:px-6 sm:text-[16px] lg:px-8 lg:py-6 ${
            isRTL ? "leading-[2]" : "leading-[1.75]"
          }`}
        >
          {content.paragraphs[1]}
        </p>

        {content.focus_areas?.length ? (
          <div className="grid grid-cols-2 md:grid-cols-4">
            {content.focus_areas.map((item) => (
              <div
                key={item.id}
                className="border-e border-t border-white/15 px-4 py-5 last:border-e-0 sm:px-5 lg:py-7"
              >
                <span className="block h-[2px] w-7 bg-brand-accent" />
                <p
                  className={`mt-3 text-[13px] font-extrabold text-white sm:text-[14px] ${
                    isRTL ? "leading-[1.9]" : "leading-[1.5]"
                  }`}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-7 grid gap-6 sm:mt-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-10">
        <p
          className={`max-w-[52rem] text-[14px] font-medium sm:text-[15px] ${
            dark ? "text-white/72" : "text-ink-muted"
          } ${isRTL ? "leading-[2]" : "leading-[1.8]"}`}
        >
          {content.paragraphs[2]}
        </p>
        <ServiceCta content={content} dark={dark} isRTL={isRTL} />
      </div>
    </div>
  );
}

function StatementLayout({
  content,
  dark,
  isRTL,
}: {
  content: ServiceContent;
  dark: boolean;
  isRTL: boolean;
}) {
  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:items-start lg:gap-16">
        <ServiceHeader content={content} dark={dark} isRTL={isRTL} />
        <p
          className={`border-s-2 border-brand-accent ps-5 text-[15px] font-bold sm:text-[16px] lg:mt-12 lg:text-[17px] ${
            dark ? "text-white/80" : "text-ink"
          } ${isRTL ? "leading-[2.05]" : "leading-[1.8]"}`}
        >
          {content.paragraphs[0]}
        </p>
      </div>

      <div className="mt-10 grid border-y border-white/15 lg:grid-cols-2">
        <div className="border-b border-white/15 py-7 lg:border-b-0 lg:border-e lg:pe-10">
          <p
            className={`text-[17px] font-extrabold sm:text-[19px] lg:text-[21px] ${
              dark ? "text-white" : "text-ink"
            } ${isRTL ? "leading-[1.95]" : "leading-[1.6]"}`}
          >
            {content.paragraphs[1]}
          </p>
        </div>
        <div className="py-7 lg:ps-10">
          <p
            className={`text-[14px] font-medium sm:text-[15px] ${
              dark ? "text-white/68" : "text-ink-muted"
            } ${isRTL ? "leading-[2]" : "leading-[1.8]"}`}
          >
            {content.paragraphs[2]}
          </p>
          <div className="mt-6">
            <ServiceCta content={content} dark={dark} isRTL={isRTL} />
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalysisLayout({
  content,
  dark,
  isRTL,
}: {
  content: ServiceContent;
  dark: boolean;
  isRTL: boolean;
}) {
  return (
    <div>
      <ServiceHeader content={content} dark={dark} isRTL={isRTL} />

      <div className="mt-8 grid border-t border-line lg:mt-10 lg:grid-cols-[0.75fr_1fr_1fr]">
        <div className="border-b border-line py-6 lg:border-b-0 lg:border-e lg:pe-8">
          <p
            className={`text-[14px] font-bold sm:text-[15px] ${
              dark ? "text-white/75" : "text-brand-primary"
            } ${isRTL ? "leading-[2]" : "leading-[1.75]"}`}
          >
            {content.paragraphs[0]}
          </p>
        </div>
        <div className="border-b border-line py-6 lg:border-b-0 lg:border-e lg:px-8">
          <p
            className={`text-[15px] font-semibold sm:text-[16px] ${
              dark ? "text-white/85" : "text-ink"
            } ${isRTL ? "leading-[2.05]" : "leading-[1.8]"}`}
          >
            {content.paragraphs[1]}
          </p>
        </div>
        <div className="py-6 lg:ps-8">
          <p
            className={`text-[14px] font-medium sm:text-[15px] ${
              dark ? "text-white/65" : "text-ink-muted"
            } ${isRTL ? "leading-[2]" : "leading-[1.8]"}`}
          >
            {content.paragraphs[2]}
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-6 border-t border-line pt-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <p
          className={`max-w-[48rem] text-[18px] font-black sm:text-[20px] lg:text-[23px] ${
            dark ? "text-white" : "text-ink"
          } ${isRTL ? "leading-[1.9]" : "leading-[1.55]"}`}
        >
          {content.paragraphs[3]}
        </p>
        <ServiceCta content={content} dark={dark} isRTL={isRTL} />
      </div>
    </div>
  );
}

function ProtectionLayout({
  content,
  dark,
  isRTL,
}: {
  content: ServiceContent;
  dark: boolean;
  isRTL: boolean;
}) {
  return (
    <div>
      <ServiceHeader content={content} dark={dark} isRTL={isRTL} />

      <div className="mt-9 grid border-y border-white/15 md:grid-cols-3 lg:mt-11">
        {content.paragraphs.map((paragraph, index) => (
          <div
            key={index}
            className="border-b border-white/15 py-6 md:border-b-0 md:border-e md:px-6 md:first:ps-0 md:last:border-e-0 md:last:pe-0 lg:py-8"
          >
            <span className="block h-[2px] w-8 bg-brand-accent" />
            <p
              className={`${
                index === 1
                  ? "font-extrabold text-white"
                  : "font-medium text-white/72"
              } mt-4 text-[14px] sm:text-[15px] lg:text-[16px] ${
                isRTL ? "leading-[2.05]" : "leading-[1.8]"
              }`}
            >
              {paragraph}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-7 flex justify-start">
        <ServiceCta content={content} dark={dark} isRTL={isRTL} />
      </div>
    </div>
  );
}

function BriefingLayout({
  content,
  dark,
  isRTL,
}: {
  content: ServiceContent;
  dark: boolean;
  isRTL: boolean;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16">
      <div>
        <ServiceHeader content={content} dark={dark} isRTL={isRTL} />
        <div className="mt-7">
          <ServiceCta content={content} dark={dark} isRTL={isRTL} />
        </div>
      </div>

      <div className="border-t border-line lg:mt-2">
        <p
          className={`border-b border-line py-5 text-[14px] font-semibold sm:text-[15px] ${
            dark ? "text-white/75" : "text-brand-primary"
          } ${isRTL ? "leading-[2]" : "leading-[1.75]"}`}
        >
          {content.paragraphs[0]}
        </p>
        <p
          className={`border-b border-line py-6 text-[18px] font-extrabold sm:text-[20px] lg:text-[22px] ${
            dark ? "text-white" : "text-ink"
          } ${isRTL ? "leading-[1.95]" : "leading-[1.6]"}`}
        >
          {content.paragraphs[1]}
        </p>
        <p
          className={`py-5 text-[14px] font-medium sm:text-[15px] ${
            dark ? "text-white/65" : "text-ink-muted"
          } ${isRTL ? "leading-[2]" : "leading-[1.8]"}`}
        >
          {content.paragraphs[2]}
        </p>
      </div>
    </div>
  );
}

export function ServicesServiceSection({
  serviceId,
  layout,
  tone,
  mediaSide = "end",
}: ServicesServiceSectionProps) {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const source = locale === "en" ? servicesEn : servicesFa;

  const content = source.sections.find(
    (section) => section.id === serviceId && section.type === "service-card",
  ) as ServiceContent | undefined;

  if (!content) return null;

  const dark = tone === "primary" || tone === "secondary";

  return (
    <section
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby={`${content.id}-heading`}
      className={`relative isolate scroll-mt-28 overflow-hidden border-b ${toneClasses[tone]}`}
    >
      {dark ? (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[3px] bg-brand-accent"
        />
      ) : null}

      <div className="dnh-site-shell relative py-14 sm:py-16 lg:py-20 xl:py-24">
        {layout === "media" ? (
          <MediaLayout
            content={content}
            dark={dark}
            isRTL={isRTL}
            mediaSide={mediaSide}
          />
        ) : null}

        {layout === "focus" ? (
          <FocusLayout content={content} dark={dark} isRTL={isRTL} />
        ) : null}

        {layout === "statement" ? (
          <StatementLayout content={content} dark={dark} isRTL={isRTL} />
        ) : null}

        {layout === "analysis" ? (
          <AnalysisLayout content={content} dark={dark} isRTL={isRTL} />
        ) : null}

        {layout === "protection" ? (
          <ProtectionLayout content={content} dark={dark} isRTL={isRTL} />
        ) : null}

        {layout === "briefing" ? (
          <BriefingLayout content={content} dark={dark} isRTL={isRTL} />
        ) : null}
      </div>
    </section>
  );
}
