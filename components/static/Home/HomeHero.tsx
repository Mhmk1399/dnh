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

  // The supplied photograph is the current hero backdrop. A non-empty JSON
  // media.src takes precedence when the brand image is updated in the future.
  const imageSource = hero.media.src.trim();
  const mobileSource = hero.media.mobile_src?.trim() ?? "";

  // One responsive <picture> fills the entire section, including behind the
  // fixed navbar. Only the matching source is requested by the browser.
  const desktopImage = getImageProps({
    src: imageSource,
    alt: hero.media.alt,
    fill: true,
    sizes: "100vw",
    loading: "eager",
    fetchPriority: "high",
    className:
      "absolute inset-0 h-full w-full object-cover object-[34%_center] sm:object-[43%_center] lg:object-center",
  }).props;

  const mobileImage = mobileSource
    ? getImageProps({
        src: mobileSource,
        alt: hero.media.alt,
        fill: true,
        sizes: "100vw",
      }).props
    : null;

  // The image must not be mirrored. Only the scrim switches direction:
  // Persian text sits over the darkened right, English over the darkened left.
  const desktopScrim = isRTL
    ? "linear-gradient(to left, color-mix(in srgb, var(--dnh-text) 98%, transparent) 0%, color-mix(in srgb, var(--dnh-text) 94%, transparent) 24%, color-mix(in srgb, var(--dnh-text) 82%, transparent) 48%, color-mix(in srgb, var(--dnh-text) 35%, transparent) 76%, color-mix(in srgb, var(--dnh-text) 12%, transparent) 100%)"
    : "linear-gradient(to right, color-mix(in srgb, var(--dnh-text) 98%, transparent) 0%, color-mix(in srgb, var(--dnh-text) 94%, transparent) 24%, color-mix(in srgb, var(--dnh-text) 82%, transparent) 48%, color-mix(in srgb, var(--dnh-text) 35%, transparent) 76%, color-mix(in srgb, var(--dnh-text) 12%, transparent) 100%)";

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section
      id={hero.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="home-hero-heading"
      className="relative isolate overflow-hidden border-b border-line bg-brand-primary text-[var(--dnh-text-on-brand)]"
    >
      {/* Only the matching source is preloaded for the hero LCP. */}
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

      {/* Full-bleed image behind the text and fixed navbar. */}
      <picture className="pointer-events-none absolute inset-0 z-0 block h-full w-full">
        {mobileImage ? (
          <source
            media="(max-width: 767px)"
            srcSet={mobileImage.srcSet}
            sizes={mobileImage.sizes}
          />
        ) : null}
        {/* eslint-disable-next-line @next/next/no-img-element -- Next getImageProps supplies optimized srcSet for art direction. */}
        <img {...desktopImage} />
      </picture>

      {/* Stronger full-width scrim on phones; direction-aware scrim on desktop. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 lg:hidden"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, color-mix(in srgb, var(--dnh-text) 92%, transparent) 0%, color-mix(in srgb, var(--dnh-text) 79%, transparent) 45%, color-mix(in srgb, var(--dnh-text) 91%, transparent) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
        style={{ backgroundImage: desktopScrim }}
      />

      <div className="dnh-site-shell relative z-10 flex min-h-svh min-w-0 flex-col justify-center pb-12 pt-[calc(8.5rem+env(safe-area-inset-top))] sm:pb-16 sm:pt-[calc(9.5rem+env(safe-area-inset-top))] lg:pb-[clamp(3.5rem,8svh,6rem)] lg:pt-[clamp(10rem,17svh,13rem)]">
        <div className="me-auto w-full min-w-0 lg:w-[62%] lg:max-w-[52rem]">
          <header className="min-w-0 text-start">
            <div className="flex min-w-0 items-center gap-3 text-[12px] font-semibold leading-[1.8] text-white/90 sm:text-[13px]">
              <span
                aria-hidden="true"
                className="h-[2px] w-9 shrink-0 bg-brand-accent sm:w-11"
              />
              <p className="min-w-0">{hero.eyebrow}</p>
            </div>

            <h1
              id="home-hero-heading"
              className={`mt-5 max-w-[30ch] text-pretty text-start text-[clamp(1.9rem,7.7vw,2.25rem)] font-extrabold [overflow-wrap:break-word] sm:mt-6 sm:text-[clamp(2.25rem,5.1vw,2.875rem)] lg:text-[clamp(2.625rem,3.4vw,3rem)] ${isRTL ? "leading-[1.52]" : "leading-[1.28]"}`}
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
              className={`mt-5 max-w-[99ch] space-y-3 border-s-2 border-white/40 ps-4 text-start text-[14px] font-normal text-white/90 sm:mt-6 sm:space-y-4 sm:ps-5 sm:text-[15px] xl:text-[16px] ${isRTL ? "leading-[1.95]" : "leading-[1.7]"}`}
            >
              {hero.paragraphs.map((paragraph) => (
                <p key={paragraph.id}>{paragraph.text}</p>
              ))}
            </div>
          </header>

          <div className="mt-7 flex min-w-0 flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
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
                className="min-h-12 w-full min-w-0 max-w-full whitespace-normal text-center [overflow-wrap:anywhere] sm:w-auto"
              >
                {cta.label}
              </ActionButton>
            ))}
          </div>

          <p
            className={`mt-7 max-w-[65ch] border-s-2 border-brand-accent ps-4 text-start text-[13px] font-medium text-white/90 sm:mt-8 sm:ps-5 sm:text-[14px] ${isRTL ? "leading-[1.95]" : "leading-[1.7]"}`}
          >
            {hero.trust_line}
          </p>
        </div>
      </div>
    </section>
  );
}
