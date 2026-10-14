"use client";

import { useEffect, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  Layers,
  Route,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { getImageProps } from "next/image";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import homeFa from "@/config/DNH_Homepage_Final_FA.json";
import homeEn from "@/config/DNH_Homepage_Final_EN.json";

type IntelligenceItem = {
  id: string;
  title: string;
  english_label?: string;
  description: string;
};

type IntelligenceContent = {
  id: "dnh-intelligence-desk";
  type: "intelligence_desk";
  eyebrow: string;
  english_label?: string;
  heading: string;
  heading_highlight?: string;
  paragraphs: Array<{ id: string; text: string }>;
  items: IntelligenceItem[];
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

export function HomeIntelligenceDesk() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const homepage = locale === "en" ? homeEn : homeFa;
  const content = homepage.sections.find(
    (section) =>
      section.id === "dnh-intelligence-desk" &&
      section.type === "intelligence_desk",
  ) as IntelligenceContent | undefined;

  // Progressive enhancement: all text is visible in the initial HTML.
  // Only rows below the fold receive a one-time entrance transition.
  useEffect(() => {
    const root = sectionRef.current;
    if (
      !root ||
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const waiting = new Set<HTMLElement>();
    root
      .querySelectorAll<HTMLElement>("[data-intelligence-entry]")
      .forEach((element) => {
        element.removeAttribute("data-reveal");
        if (element.getBoundingClientRect().top > window.innerHeight - 32) {
          element.dataset.reveal = "pending";
          waiting.add(element);
        }
      });

    if (waiting.size === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          element.dataset.reveal = "shown";
          waiting.delete(element);
          observer.unobserve(element);
        }
        if (waiting.size === 0) observer.disconnect();
      },
      { threshold: 0.07, rootMargin: "0px 0px -24px 0px" },
    );

    waiting.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [locale]);

  if (!content) return null;

  const highlight = content.heading_highlight ?? "";
  const highlightIndex = highlight ? content.heading.indexOf(highlight) : -1;
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const imageSrc = content.media.src.trim() || content.media.mobile_src?.trim() || "";
  const mobileSrc = content.media.mobile_src?.trim() ?? "";
  const imageSizes =
    "(max-width: 767px) calc(100vw - 24px), (max-width: 1023px) calc(100vw - 32px), (max-width: 1439px) 41vw, 570px";

  // <picture> selects a single responsive source. Empty JSON sources
  // produce no image element, network request, or preload.
  const desktopImage = imageSrc
    ? getImageProps({
        src: imageSrc,
        alt: content.media.alt,
        fill: true,
        sizes: imageSizes,
        loading: "lazy",
        decoding: "async",
        className: "absolute inset-0 h-full w-full object-cover",
      }).props
    : null;

  const mobileImage = desktopImage && mobileSrc && mobileSrc !== imageSrc
    ? getImageProps({
        src: mobileSrc,
        alt: content.media.alt,
        fill: true,
        sizes: "(max-width: 767px) calc(100vw - 24px), 100vw",
        loading: "lazy",
      }).props
    : null;

  return (
    <section
      ref={sectionRef}
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="home-intelligence-heading"
      className="relative isolate border-t border-line bg-[color-mix(in_srgb,var(--dnh-secondary)_22%,var(--dnh-text)_78%)] py-12 text-[var(--dnh-text-on-brand)] sm:py-14 lg:py-[4.5rem]"
    >
      <div className="dnh-site-shell">
        <div className="grid min-w-0 items-center gap-7 md:gap-9 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-12 xl:gap-16">
          <header className="min-w-0 text-start">
            <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5">
              <span aria-hidden="true" className="h-[2px] w-9 shrink-0 bg-brand-accent" />
              <p className="text-[12px] font-semibold leading-[1.8] sm:text-[13px]">
                {content.eyebrow}
              </p>
              {content.english_label && content.english_label !== content.eyebrow && (
                <span className="text-[11px] leading-[1.6] text-[color-mix(in_srgb,var(--dnh-text-on-brand)_70%,transparent)]">
                  <bdi dir="ltr">{content.english_label}</bdi>
                </span>
              )}
            </div>

            <h2
              id="home-intelligence-heading"
              className="mt-4 max-w-[35ch] text-pretty text-start text-[clamp(1.85rem,6.5vw,2.375rem)] font-extrabold leading-[1.55] [overflow-wrap:break-word] sm:mt-5 md:text-[clamp(2.15rem,3.45vw,3rem)] md:leading-[1.5]"
            >
              {highlightIndex === -1 ? (
                content.heading
              ) : (
                <>
                  {content.heading.slice(0, highlightIndex)}
                  <span className="text-brand-accent">
                    {content.heading.slice(highlightIndex, highlightIndex + highlight.length)}
                  </span>
                  {content.heading.slice(highlightIndex + highlight.length)}
                </>
              )}
            </h2>

            <div
              className={`mt-5 max-w-[75ch] space-y-3 text-start text-[14px] text-[color-mix(in_srgb,var(--dnh-text-on-brand)_88%,transparent)] sm:mt-6 sm:space-y-4 sm:text-[15px] ${
                isRTL ? "leading-[1.95]" : "leading-[1.75]"
              }`}
            >
              {content.paragraphs.map((paragraph) => (
                <p key={paragraph.id}>{paragraph.text}</p>
              ))}
            </div>
          </header>

          <div
            aria-hidden={!desktopImage ? true : undefined}
            className="relative isolate aspect-[16/10] min-w-0 overflow-hidden border border-[color-mix(in_srgb,var(--dnh-text-on-brand)_20%,transparent)] bg-brand-secondary/20 sm:aspect-[12/5] lg:aspect-[16/10]"
          >
            {desktopImage ? (
              <picture className="absolute inset-0 block h-full w-full">
                {mobileImage && (
                  <source
                    media="(max-width: 767px)"
                    srcSet={mobileImage.srcSet}
                    sizes={mobileImage.sizes}
                  />
                )}
                {/* getImageProps applies Next.js optimization to this picture. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img {...desktopImage} />
              </picture>
            ) : null}
          </div>
        </div>

        <ol className="mt-9 grid min-w-0 grid-cols-1 gap-x-8 border-t border-[color-mix(in_srgb,var(--dnh-text-on-brand)_24%,transparent)] sm:mt-10 md:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          {content.items.map((item, index) => {
            const Icon = intelligenceIcons[item.id as keyof typeof intelligenceIcons] ?? Eye;
            const isLast = index === content.items.length - 1;

            return (
              <li
                key={item.id}
                data-intelligence-entry=""
                className={`group relative min-w-0 border-b border-[color-mix(in_srgb,var(--dnh-text-on-brand)_21%,transparent)] py-5 motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 sm:py-6 ${
                  isLast ? "md:col-span-2" : ""
                }`}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-brand-accent transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-within:scale-x-100 rtl:origin-right motion-reduce:transition-none"
                />

                <div className="grid min-w-0 grid-cols-[2.25rem_minmax(0,1fr)] gap-x-3 sm:grid-cols-[2.5rem_minmax(0,1fr)] sm:gap-x-4">
                  <div className="flex flex-col items-start gap-3">
                    <span className="text-[11px] font-semibold tabular-nums leading-[1.5] text-brand-accent">
                      <bdi dir="ltr">{String(index + 1).padStart(2, "0")}</bdi>
                    </span>
                    <Icon
                      aria-hidden="true"
                      size={21}
                      strokeWidth={1.6}
                      className="text-[color-mix(in_srgb,var(--dnh-text-on-brand)_78%,transparent)]"
                    />
                  </div>

                  <div
                    className={`min-w-0 ${
                      isLast ? "md:grid md:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] md:items-start md:gap-x-12" : ""
                    }`}
                  >
                    <div className="min-w-0 text-start">
                      <h3 className="text-[18px] font-bold leading-[1.65] [overflow-wrap:break-word] sm:text-[20px]">
                        {item.title}
                      </h3>
                      {item.english_label && item.english_label !== item.title && (
                        <p className="mt-0.5 text-[11px] leading-[1.65] text-brand-accent sm:text-[12px]">
                          <bdi dir="ltr">{item.english_label}</bdi>
                        </p>
                      )}
                    </div>
                    <p
                      className={`mt-2 min-w-0 max-w-[70ch] text-start text-[14px] text-[color-mix(in_srgb,var(--dnh-text-on-brand)_82%,transparent)] sm:mt-3 sm:text-[15px] ${
                        isLast ? "md:mt-0" : ""
                      } ${isRTL ? "leading-[1.9]" : "leading-[1.72]"}`}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <footer
          data-intelligence-entry=""
          className="mt-6 grid min-w-0 gap-5 border-s-2 border-brand-accent ps-4 motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out motion-safe:data-[reveal=pending]:translate-y-2 motion-safe:data-[reveal=pending]:opacity-0 sm:mt-7 sm:ps-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-8"
        >
          <p
            className={`min-w-0 max-w-[90ch] text-start text-[14px] text-[color-mix(in_srgb,var(--dnh-text-on-brand)_90%,transparent)] sm:text-[15px] ${
              isRTL ? "leading-[1.9]" : "leading-[1.75]"
            }`}
          >
            {content.closing}
          </p>
          <div className="flex min-w-0 flex-wrap gap-3">
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
                className="min-h-11 w-full min-w-0 max-w-full whitespace-normal text-start text-[13px] [overflow-wrap:anywhere] sm:w-auto"
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
