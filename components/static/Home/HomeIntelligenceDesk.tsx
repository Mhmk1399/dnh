"use client";

import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  Layers,
  Route,
  ShieldCheck,
  Wallet,
} from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import homeFa from "@/config/DNH_Homepage_Final_FA.json";
import homeEn from "@/config/DNH_Homepage_Final_EN.json";

type IntelligenceContent = {
  id: "dnh-intelligence-desk";
  type: "intelligence_desk";
  eyebrow: string;
  english_label?: string;
  heading: string;
  heading_highlight?: string;
  paragraphs: Array<{ id: string; text: string }>;
  items: Array<{
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
  media: {
    src: string;
    mobile_src?: string;
    alt: string;
    width: number;
    height: number;
  };
};

const intelligenceIcons = {
  "macro-risk": ShieldCheck,
  "asset-view": Layers,
  "liquidity-view": Wallet,
  "what-to-watch": Eye,
  "strategic-implications": Route,
} as const;
const intelligenceImages = [
  "/assets/images/risk-management-wealth-protection.webp",
  "/assets/images/private-wealth-strategy.webp",
  "/assets/images/portfolio-intelligence.webp",
  "/assets/images/macro-market-advisory.webp",
  "/assets/images/strategic-financial-advisory.webp",
];

export function HomeIntelligenceDesk() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const homepage = locale === "en" ? homeEn : homeFa;
  const content = homepage.sections.find(
    (section) =>
      section.id === "dnh-intelligence-desk" &&
      section.type === "intelligence_desk",
  ) as IntelligenceContent | undefined;

  if (!content) return null;

  const highlight = content.heading_highlight ?? "";
  const highlightIndex = highlight ? content.heading.indexOf(highlight) : -1;
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const mainImage =
    content.media.src.trim() ||
    "/assets/images/strategic-financial-advisory.webp";

  return (
    <section
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="home-intelligence-heading"
      className="relative isolate overflow-hidden border-b border-line bg-page py-14 text-ink sm:py-18 lg:py-24"
    >
      <div className="dnh-site-shell grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(360px,1.12fr)] lg:grid-rows-[auto_auto_auto] lg:gap-x-10 xl:gap-x-14">
        <header className="min-w-0 text-start lg:col-start-1 lg:row-start-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] font-bold text-brand-primary sm:text-[13px]">
            <p>{content.eyebrow}</p>
            <span aria-hidden="true" className="h-[2px] w-11 bg-brand-accent" />
          
          </div>
          <h2
            id="home-intelligence-heading"
            className={`mt-5 max-w-[23ch] text-pretty text-[clamp(2rem,7.5vw,3rem)] font-black tracking-[-0.03em] sm:text-[clamp(2.55rem,4.3vw,3.65rem)] lg:max-w-none ${isRTL ? "leading-[1.46]" : "leading-[1.14]"}`}
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
            className={`mt-5 max-w-[78ch] space-y-3 border-s-2 border-brand-primary ps-4 text-[14px] text-ink-muted sm:text-[15px] ${isRTL ? "leading-[1.95]" : "leading-[1.72]"}`}
          >
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph.id}>{paragraph.text}</p>
            ))}
          </div>
        </header>

        <div className="relative aspect-[4/5] min-h-[500px] overflow-hidden border border-line bg-brand-primary lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:h-full lg:min-h-[850px] lg:aspect-auto">
          <Image
            src={mainImage}
            alt={content.media.alt}
            fill
            sizes="(max-width: 1023px) calc(100vw - 24px), 52vw"
            className="object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-brand-primary/5"
          />
          <span
            aria-hidden="true"
            className="absolute end-6 top-6 size-6 bg-brand-accent"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-8 end-8 start-8 grid grid-cols-3 border border-white/25 bg-ink/55 text-white backdrop-blur-sm"
          >
            {[ShieldCheck, Layers, Route].map((Icon, index) => (
              <span
                key={index}
                className="flex min-h-20 items-center justify-center border-s border-white/15 first:border-s-0"
              >
                <Icon size={26} strokeWidth={1.5} />
              </span>
            ))}
          </div>
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 lg:col-start-1 lg:row-start-2 lg:mt-7">
          {content.items.map((item, index) => {
            const Icon =
              intelligenceIcons[item.id as keyof typeof intelligenceIcons] ??
              Eye;
            return (
              <article
                key={item.id}
                className="group min-w-0 border border-line bg-page transition-colors duration-300 hover:border-brand-primary motion-reduce:transition-none"
              >
                <div className="relative aspect-[16/7] overflow-hidden bg-brand-primary">
                  <Image
                    src={intelligenceImages[index] ?? intelligenceImages[0]}
                    alt=""
                    fill
                    sizes="(max-width: 639px) calc(100vw - 24px), (max-width: 1279px) 48vw, 20vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transition-none"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute end-3 top-3 size-4 bg-brand-accent"
                  />
                </div>
                <div className="relative p-4 pt-7 sm:p-5 sm:pt-8">
                  <span
                    aria-hidden="true"
                    className="absolute start-4 top-0 flex size-10 -translate-y-1/2 items-center justify-center bg-surface-soft text-brand-primary sm:start-5"
                  >
                    <Icon size={20} strokeWidth={1.6} />
                  </span>
                  <h3
                    className={`text-start text-[17px] font-black sm:text-[18px] ${isRTL ? "leading-[1.65]" : "leading-[1.35]"}`}
                  >
                    {item.title}
                  </h3>
                  {item.english_label && item.english_label !== item.title ? (
                    <bdi
                      dir="ltr"
                      className="mt-1 block text-start text-[10px] tracking-[0.18em] text-brand-primary"
                    >
                      {item.english_label}
                    </bdi>
                  ) : null}
                  <p
                    className={`mt-2 text-start text-[13px] text-ink-muted sm:text-[14px] ${isRTL ? "leading-[1.85]" : "leading-[1.65]"}`}
                  >
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <footer className="grid min-w-0 gap-4 border border-line bg-surface-soft p-4 sm:p-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center lg:col-start-1 lg:row-start-3 lg:mt-5">
          <p
            className={`border-s-2 border-brand-primary ps-4 text-start text-[13px] text-ink-muted sm:text-[14px] ${isRTL ? "leading-[1.9]" : "leading-[1.68]"}`}
          >
            {content.closing}
          </p>
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
        </footer>
      </div>
    </section>
  );
}
