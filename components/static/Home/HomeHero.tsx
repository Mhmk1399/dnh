"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
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

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const [descriptionHeight, setDescriptionHeight] = useState(0);

  const descriptionRef = useRef<HTMLDivElement>(null);

  const homepage = locale === "en" ? homeEn : homeFa;

  const hero = homepage.sections.find(
    (section) => section.id === "hero" && section.type === "hero",
  ) as HeroContent | undefined;

  // Measure the full description height for smooth expansion.
  useEffect(() => {
    const element = descriptionRef.current;

    if (!element) return;

    const updateHeight = () => {
      setDescriptionHeight(element.scrollHeight);
    };

    updateHeight();

    if (typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(updateHeight);
    observer.observe(element);

    return () => observer.disconnect();
  }, [locale]);

  if (!hero) return null;

  const highlight = hero.heading_highlight ?? "";
  const highlightIndex = highlight ? hero.heading.indexOf(highlight) : -1;

  const imageSource = hero.media.src.trim();
  const mobileSource = hero.media.mobile_src?.trim() ?? "";

  const desktopImage = getImageProps({
    src: imageSource,
    alt: hero.media.alt,
    fill: true,
    sizes: "100vw",
    loading: "eager",
    fetchPriority: "high",
    className:
      "absolute inset-0 h-full w-full object-cover object-[center_30%] sm:object-center lg:object-center",
  }).props;

  const mobileImage = mobileSource
    ? getImageProps({
        src: mobileSource,
        alt: hero.media.alt,
        fill: true,
        sizes: "100vw",
      }).props
    : null;

  const desktopScrim = isRTL
    ? "linear-gradient(to left, color-mix(in srgb, var(--dnh-text) 98%, transparent) 0%, color-mix(in srgb, var(--dnh-text) 94%, transparent) 24%, color-mix(in srgb, var(--dnh-text) 82%, transparent) 48%, color-mix(in srgb, var(--dnh-text) 35%, transparent) 76%, color-mix(in srgb, var(--dnh-text) 12%, transparent) 100%)"
    : "linear-gradient(to right, color-mix(in srgb, var(--dnh-text) 98%, transparent) 0%, color-mix(in srgb, var(--dnh-text) 94%, transparent) 24%, color-mix(in srgb, var(--dnh-text) 82%, transparent) 48%, color-mix(in srgb, var(--dnh-text) 35%, transparent) 76%, color-mix(in srgb, var(--dnh-text) 12%, transparent) 100%)";

  const hasDescription = hero.paragraphs.some(
    (paragraph) => paragraph.text.trim().length > 0,
  );

  const collapsedHeight = isRTL ? "3.9em" : "3.4em";

  return (
    <section
      id={hero.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="home-hero-heading"
      className="relative isolate overflow-hidden h-screen border-b border-line   text-[var(--dnh-text-on-brand)]"
    >
      {/* Image preload */}
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

      {/* Mobile image area / Full desktop background */}
      <div
        className="
          pointer-events-none absolute inset-x-0 top-0 z-0
          h-screen
          overflow-hidden
          lg:inset-0 lg:h-full
        "
      >
        <picture className="absolute inset-0 block h-full w-full">
          {mobileImage && (
            <source
              media="(max-width: 767px)"
              srcSet={mobileImage.srcSet}
              sizes={mobileImage.sizes}
            />
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img {...desktopImage} />
        </picture>

        {/* Mobile: dark top, visible center, smooth bottom */}
        <div
          aria-hidden="true"
          className="absolute inset-0 lg:hidden"
          style={{
            backgroundImage: `
              linear-gradient(
                to bottom,
                rgba(8,20,38,0.82) 0%,
                rgba(8,20,38,0.66) 26%,
                rgba(8,20,38,0.14) 53%,
                rgba(8,20,38,0.12) 70%,
                var(--dnh-brand-primary, #102b46) 100%
              )
            `,
          }}
        />
      </div>

      {/* Desktop directional overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
        style={{ backgroundImage: desktopScrim }}
      />

      {/* Content */}
      <div
        className="
          dnh-site-shell relative z-10 flex min-w-0 flex-col
          pb-10
          sm:pb-14
          lg:min-h-svh lg:justify-center
          lg:pb-[clamp(3.5rem,8svh,6rem)]
          lg:pt-[clamp(10rem,17svh,13rem)]
        "
      >
        <div
          className="
            me-auto w-full min-w-0
            lg:w-[70%] lg:max-w-[62rem]
          "
        >
          {/* Heading area */}
          <header
            className="
              relative flex min-w-0 flex-col
              min-h-[clamp(27rem,65svh,38rem)]
              pt-[calc(7.5rem+env(safe-area-inset-top))]
              sm:pt-[calc(9rem+env(safe-area-inset-top))]
              lg:block lg:min-h-0 lg:pt-0
            "
          >
            {/* Eyebrow */}
            <div
              className="
                flex min-w-0 items-center gap-3
                text-[11px] font-semibold leading-[1.8]
                text-white/90
                sm:text-[13px]
              "
            >
              <span
                aria-hidden="true"
                className="h-[2px] w-6 shrink-0 bg-brand-accent "
              />

              <p className="min-w-0">{hero.eyebrow}</p>
            </div>

            {/* Heading */}
            <h1
              id="home-hero-heading"
              className={`
                mt-4 max-w-[28ch]
                line-clamp-3
                text-justify text-[clamp(1.125rem,4.7vw,1.5rem)]
                font-extrabold
                [overflow-wrap:break-word]
                sm:mt-6 sm:text-[1.875rem]
                lg:line-clamp-2
                lg:max-w-2xl
                lg:text-3xl
                ${
                  isRTL
                    ? "leading-[1.65] lg:leading-[1.65]"
                    : "leading-[1.4] lg:leading-[1.35]"
                }
              `}
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
          </header>

          {/* Description - below image on mobile */}
          {hasDescription && (
            <div
              className={`
                relative mt-1 min-w-0 hidden lg:block
                border-s-2 border-white/40 ps-4
                text-[14px] font-normal text-white/90
                sm:ps-5 sm:text-[15px]
                lg:mt-5 lg:max-w-[80ch]
                xl:text-[16px]
                ${isRTL ? "leading-[1.95]" : "leading-[1.7]"}
              `}
            >
              {/* Smooth expandable text */}
              <div
                id="hero-description"
                className="
                  min-w-0 overflow-hidden
                  transition-[max-height]
                  duration-500
                  ease-[cubic-bezier(0.22,1,0.36,1)]
                  motion-reduce:transition-none
                "
                style={{
                  maxHeight: isDescriptionExpanded
                    ? `${descriptionHeight}px`
                    : collapsedHeight,
                }}
              >
                <div
                  ref={descriptionRef}
                  className="space-y-3 text-justify sm:space-y-4"
                >
                  {hero.paragraphs.map((paragraph) => (
                    <p key={paragraph.id}>{paragraph.text}</p>
                  ))}
                </div>
              </div>

              {/* Expand / Collapse */}
              <button
                type="button"
                aria-expanded={isDescriptionExpanded}
                aria-controls="hero-description"
                onClick={() => setIsDescriptionExpanded((prev) => !prev)}
                className="
                  group mt-2 inline-flex min-h-10
                  items-center gap-2
                  rounded-sm
                  text-[13px] font-semibold
                  text-brand-accent
                  transition-colors duration-200
                  hover:text-white
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-4
                  focus-visible:outline-brand-accent
                  sm:mt-3
                "
              >
                <span>
                  {isDescriptionExpanded
                    ? isRTL
                      ? "نمایش کمتر"
                      : "Show less"
                    : isRTL
                      ? "مشاهده بیشتر"
                      : "Read more"}
                </span>

                <ChevronDown
                  size={16}
                  aria-hidden="true"
                  className={`
                    shrink-0
                    transition-transform duration-500
                    ease-[cubic-bezier(0.22,1,0.36,1)]
                    motion-reduce:transition-none
                    ${isDescriptionExpanded ? "rotate-180" : "rotate-0"}
                  `}
                />
              </button>
            </div>
          )}

          {/* CTA buttons */}
          <div
            className="
              mt-26 grid min-w-0 grid-cols-2 gap-2
              sm:mt-8 sm:gap-3
              lg:flex lg:flex-row lg:flex-wrap lg:gap-4
            "
          >
            {hero.ctas.map((cta) => (
              <ActionButton
                key={cta.id}
                href={cta.href}
                variant={cta.type}
                shape="square"
                size="lg"
                iconPosition="end"
                dir={direction}
                className="
                  min-h-12 w-full min-w-0 max-w-full
                  whitespace-normal
                  px-2 py-3
                  text-center text-[12px]
                  leading-[1.6]
                  [overflow-wrap:anywhere]
                  sm:px-4 sm:text-[14px]
                  lg:w-auto
                "
              >
                {cta.label}
              </ActionButton>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
