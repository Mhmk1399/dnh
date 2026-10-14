"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { getImageProps } from "next/image";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import homeFa from "@/config/DNH_Homepage_Final_FA.json";
import homeEn from "@/config/DNH_Homepage_Final_EN.json";

type HeroContent = {
  id: "hero";
  type: "hero";
  eyebrow: string;
  heading: string;
  heading_highlight?: string;
  paragraphs: Array<{ id: string; text: string }>;
  ctas: Array<{
    id: string;
    label: string;
    type: "primary" | "secondary";
    href: string;
  }>;
  trust_line: string;
  media: {
    src: string;
    mobile_src?: string;
    alt: string;
    width: number;
    height: number;
  };
};

export function HomeHero() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const homepage = locale === "en" ? homeEn : homeFa;
  const hero = homepage.sections.find(
    (section) => section.id === "hero" && section.type === "hero",
  ) as HeroContent | undefined;

  if (!hero) return null;

  const highlight = hero.heading_highlight ?? "";
  const highlightIndex = highlight ? hero.heading.indexOf(highlight) : -1;
  const imageSrc = hero.media.src.trim();
  const mobileImageSrc = hero.media.mobile_src?.trim() ?? "";
  const imageSizes =
    "(max-width: 767px) calc(100vw - 24px), (max-width: 1023px) calc(100vw - 32px), (max-width: 1439px) 43vw, 610px";

  // One <picture>, with a mobile <source> when available, avoids fetching
  // two different assets for the same viewport. No source means no request.
  const desktopImage = imageSrc
    ? getImageProps({
        src: imageSrc,
        alt: hero.media.alt,
        fill: true,
        sizes: imageSizes,
        loading: "eager",
        fetchPriority: "high",
        className: "absolute inset-0 h-full w-full object-cover object-center",
      }).props
    : null;

  const mobileImage =
    desktopImage && mobileImageSrc
      ? getImageProps({
          src: mobileImageSrc,
          alt: hero.media.alt,
          fill: true,
          sizes: "(max-width: 767px) calc(100vw - 24px), 100vw",
        }).props
      : null;

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section
      id={hero.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="home-hero-heading"
      className="relative isolate overflow-hidden bg-[color-mix(in_srgb,var(--dnh-secondary)_24%,var(--dnh-text)_76%)] text-[var(--dnh-text-on-brand)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-secondary/20 via-transparent to-brand-primary/15"
      />

      <div className="dnh-site-shell relative z-10 grid min-w-0 gap-y-8 pb-12 pt-[calc(7.5rem+env(safe-area-inset-top))] sm:gap-y-9 sm:pb-16 sm:pt-36 md:gap-y-10 md:pb-20 lg:min-h-svh lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:content-center lg:gap-x-10 lg:gap-y-7 lg:pb-20 lg:pt-[clamp(10rem,16svh,13rem)] xl:gap-x-14">
        <header className="min-w-0 text-start lg:col-start-1 lg:row-start-1">
          <div className="flex min-w-0 items-center gap-3 text-[12px] font-semibold leading-[1.8] text-white/90 sm:text-[13px] lg:text-[14px]">
            <span
              aria-hidden="true"
              className="h-px w-8 shrink-0 bg-brand-accent sm:w-10"
            />
            <p className="min-w-0">{hero.eyebrow}</p>
          </div>

          <h1
            id="home-hero-heading"
            className="mt-5 max-w-[30ch] text-pretty text-start text-[clamp(1.75rem,8vw,2.125rem)] font-extrabold leading-[1.55] [overflow-wrap:break-word] sm:mt-6 sm:text-[clamp(2.25rem,5vw,2.75rem)] sm:leading-[1.5] md:text-[clamp(2.375rem,4.8vw,2.875rem)] lg:mt-7 lg:max-w-none lg:text-[clamp(2.875rem,3.75vw,2.5rem)] lg:leading-[1.45]"
          >
            {highlightIndex < 0 ? (
              hero.heading
            ) : (
              <>
                {hero.heading.slice(0, highlightIndex)}
                <span className="text-brand-accent">
                  {hero.heading.slice(
                    highlightIndex,
                    highlightIndex + highlight.length,
                  )}
                </span>
                {hero.heading.slice(highlightIndex + highlight.length)}
              </>
            )}
          </h1>

          <div
            className={`mt-6 max-w-[88ch] space-y-4 text-start text-[14px] font-normal text-white/90 sm:mt-7 sm:space-y-5 sm:text-[15px] lg:mt-8 lg:text-[16px] ${isRTL ? "leading-[1.95]" : "leading-[1.7]"}`}
          >
            {hero.paragraphs.map((paragraph) => (
              <p key={paragraph.id}>{paragraph.text}</p>
            ))}
          </div>
        </header>

        <div className="relative isolate aspect-[4/3] min-w-0 overflow-hidden border border-line/40 bg-brand-primary/10 sm:aspect-[16/10] md:aspect-[2/1] lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:min-h-[540px] lg:aspect-auto lg:self-stretch">
          {desktopImage ? (
            <>
              {mobileImage ? (
                <>
                  <link
                    rel="preload"
                    as="image"
                    media="(max-width: 767px)"
                    imageSrcSet={mobileImage.srcSet}
                    imageSizes={mobileImage.sizes}
                  />
                  <link
                    rel="preload"
                    as="image"
                    media="(min-width: 768px)"
                    imageSrcSet={desktopImage.srcSet}
                    imageSizes={desktopImage.sizes}
                  />
                </>
              ) : (
                <link
                  rel="preload"
                  as="image"
                  imageSrcSet={desktopImage.srcSet}
                  imageSizes={desktopImage.sizes}
                />
              )}
              <picture className="absolute inset-0 block h-full w-full">
                {mobileImage ? (
                  <source
                    media="(max-width: 767px)"
                    srcSet={mobileImage.srcSet}
                    sizes={mobileImage.sizes}
                  />
                ) : null}
                {/* eslint-disable-next-line @next/next/no-img-element -- getImageProps supplies Next's optimized srcSet for responsive art direction. */}
                <img {...desktopImage} />
              </picture>
            </>
          ) : null}
        </div>

        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4 lg:col-start-1 lg:row-start-2 lg:pt-2">
          {hero.ctas.map((cta) => (
            <ActionButton
              key={cta.id}
              href={cta.href}
              variant={cta.type}
              shape="square"
              size="lg"
              icon={Arrow}
              iconPosition="end"
              dir={direction}
              className="min-h-11 min-w-0 w-full whitespace-normal text-center [overflow-wrap:anywhere] sm:w-auto sm:max-w-full"
            >
              {cta.label}
            </ActionButton>
          ))}
        </div>

        <p
          className={`min-w-0 max-w-[68ch] border-s-2 border-brand-accent/80 ps-4 text-start text-[13px] font-medium text-white/85 sm:ps-5 sm:text-[14px] lg:col-start-1 lg:row-start-3 lg:mt-1 ${isRTL ? "leading-[1.95]" : "leading-[1.7]"}`}
        >
          {hero.trust_line}
        </p>
      </div>
    </section>
  );
}
