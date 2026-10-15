"use client";

import {
  ArrowLeft,
  ArrowRight,
  Droplets,
  Focus,
  RefreshCw,
  Scale,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import intelligenceFa from "@/config/DNH_Intelligence_Desk_Final_FA.json";
import intelligenceEn from "@/config/DNH_Intelligence_Desk_Final_EN.json";

type SectionLookup = {
  id: string;
  type: string;
};

type ImplicationId =
  | "liquidity-implication"
  | "concentration-risk"
  | "decision-caution"
  | "assumptions-review"
  | "preserve-vs-review";

type ImplicationItem = {
  id: ImplicationId;
  title: string;
  description: string;
};

type StrategicImplicationsContent = {
  order: number;
  id: "strategic-implications";
  type: "strategic-implications";
  eyebrow: string;
  english_label: string;
  heading: string;
  heading_highlight: string;
  intro: string;
  items: ImplicationItem[];
  closing: string;
  ctas: Array<{
    id: string;
    label: string;
    type: "primary" | "secondary";
    href: string;
  }>;
};

const implicationIcons: Record<ImplicationId, LucideIcon> = {
  "liquidity-implication": Droplets,
  "concentration-risk": Focus,
  "decision-caution": ShieldAlert,
  "assumptions-review": RefreshCw,
  "preserve-vs-review": Scale,
};

function HighlightedHeading({
  heading,
  highlight,
}: {
  heading: string;
  highlight: string;
}) {
  const index = highlight ? heading.indexOf(highlight) : -1;

  if (index < 0) return <>{heading}</>;

  return (
    <>
      {heading.slice(0, index)}
      <span className="text-brand-accent">
        {heading.slice(index, index + highlight.length)}
      </span>
      {heading.slice(index + highlight.length)}
    </>
  );
}

function ImplicationRow({
  item,
  isRTL,
}: {
  item: ImplicationItem;
  isRTL: boolean;
}) {
  const Icon = implicationIcons[item.id];

  return (
    <article className="group relative grid min-w-0 border-t border-line lg:grid-cols-[minmax(0,0.92fr)_84px_minmax(0,1.08fr)] lg:items-stretch">
      <div className="min-w-0 px-4 py-5 text-start sm:px-6 sm:py-6 lg:flex lg:items-center lg:px-7 lg:py-7 xl:px-9">
        <h3
          className={`max-w-[34rem] text-[1rem] font-extrabold text-ink transition-colors duration-200 group-hover:text-brand-primary motion-reduce:transition-none sm:text-[1.08rem] lg:text-[1.12rem] ${
            isRTL ? "leading-[1.9]" : "leading-[1.48]"
          }`}
        >
          {item.title}
        </h3>
      </div>

      <div className="relative flex min-h-16 items-center justify-center border-y border-line bg-surface-soft lg:min-h-full lg:border-x lg:border-y-0">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 start-1/2 hidden w-px -translate-x-1/2 bg-line lg:block"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line lg:block"
        />
        <span className="relative z-10 flex size-11 items-center justify-center border border-line bg-page text-brand-primary transition-all duration-200 group-hover:border-brand-accent group-hover:text-brand-accent motion-reduce:transition-none sm:size-12">
          <Icon aria-hidden="true" size={19} strokeWidth={1.6} />
        </span>
      </div>

      <div className="min-w-0 px-4 py-5 text-start sm:px-6 sm:py-6 lg:flex lg:items-center lg:px-7 lg:py-7 xl:px-9">
        <p
          className={`max-w-[40rem] text-[14px] font-medium text-ink-muted sm:text-[15px] lg:text-[15.5px] ${
            isRTL ? "leading-[2]" : "leading-[1.76]"
          }`}
        >
          {item.description}
        </p>
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 start-0 w-[3px] origin-center scale-y-0 bg-brand-accent transition-transform duration-200 group-hover:scale-y-100 motion-reduce:transition-none"
      />
    </article>
  );
}

export function IntelligenceDeskStrategicImplications() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const intelligence = locale === "en" ? intelligenceEn : intelligenceFa;
  const content = intelligence.sections.find(
    (section: SectionLookup) =>
      section.id === "strategic-implications" &&
      section.type === "strategic-implications",
  ) as StrategicImplicationsContent | undefined;

  if (!content) return null;

  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const cta = content.ctas[0];

  return (
    <section
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="dnh-strategic-implications-heading"
      className="relative isolate scroll-mt-28 overflow-x-clip border-b border-line bg-page py-14 sm:py-16 lg:py-20 xl:py-24"
    >
      <div className="dnh-site-shell min-w-0">
        <header className="grid min-w-0 gap-7 lg:grid-cols-[minmax(0,0.64fr)_minmax(18rem,0.36fr)] lg:items-end lg:gap-14 xl:gap-20">
          <div className="min-w-0 text-start">
            <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5">
              <span
                aria-hidden="true"
                className="h-[2px] w-9 shrink-0 bg-brand-accent sm:w-11"
              />
              <p className="text-[12px] font-extrabold leading-[1.8] text-brand-primary sm:text-[13px]">
                {content.eyebrow}
              </p>
            </div>

            <h2
              id="dnh-strategic-implications-heading"
              className={`mt-4 max-w-[28ch] text-pretty text-[clamp(1.95rem,7vw,2.65rem)] font-black text-ink [overflow-wrap:break-word] sm:mt-5 sm:text-[clamp(2.3rem,4.8vw,3.25rem)] lg:text-[clamp(2.7rem,3.45vw,3.8rem)] ${
                isRTL ? "leading-[1.55]" : "leading-[1.08]"
              }`}
            >
              <HighlightedHeading
                heading={content.heading}
                highlight={content.heading_highlight}
              />
            </h2>
          </div>

          <div className="min-w-0 border-s border-line ps-4 text-start sm:ps-5 lg:ps-6">
            <p
              className={`text-[14px] font-medium text-ink-muted sm:text-[15px] ${
                isRTL ? "leading-[2]" : "leading-[1.78]"
              }`}
            >
              {content.intro}
            </p>
          </div>
        </header>

        <div className="mt-10 min-w-0 overflow-hidden border border-line bg-page sm:mt-12 lg:mt-14">
          <div className="min-w-0">
            {content.items.map((item) => (
              <ImplicationRow key={item.id} item={item} isRTL={isRTL} />
            ))}
          </div>
        </div>

        <div className="mt-6 grid min-w-0 overflow-hidden border border-line bg-surface-soft lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.38fr)]">
          <div className="relative min-w-0 p-5 text-start sm:p-6 lg:p-7 xl:p-8">
            <span
              aria-hidden="true"
              className="absolute inset-y-0 start-0 w-[3px] bg-brand-accent"
            />
            <p
              className={`max-w-[64rem] text-[15px] font-bold text-ink sm:text-[16px] ${
                isRTL ? "leading-[2]" : "leading-[1.78]"
              }`}
            >
              {content.closing}
            </p>
          </div>

          {cta ? (
            <div className="flex min-w-0 items-center border-t border-line bg-page p-4 sm:p-5 lg:border-s lg:border-t-0 lg:p-6">
              <ActionButton
                href={cta.href}
                variant="primary"
                size="lg"
                icon={Arrow}
                iconPosition="end"
                contentAlignment="between"
                className="w-full"
              >
                {cta.label}
              </ActionButton>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
