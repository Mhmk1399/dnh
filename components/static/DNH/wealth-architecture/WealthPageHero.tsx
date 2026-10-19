"use client";

import { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { getImageProps } from "next/image";

import { ActionButton } from "@/components/ui/ActionButton";
import { WealthRichText, getParagraphs } from "./WealthArchitectureShared";
import type { WealthSectionProps } from "./wealthArchitectureTypes";

export function WealthPageHero({ section, direction }: WealthSectionProps) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const paragraphs = getParagraphs(section);
  const media = section.media;
  const isRTL = direction === "rtl";
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const highlight = section.heading_highlight?.trim() ?? "";
  const highlightIndex = highlight ? section.heading.indexOf(highlight) : -1;
  const descriptionToggle = section.description_toggle;
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [expandedHeight, setExpandedHeight] = useState(0);
  const [collapsedHeight, setCollapsedHeight] = useState(0);

  useEffect(() => {
    const element = descriptionRef.current;
    if (!element) return;

    const updateHeights = () => {
      const styles = window.getComputedStyle(element);
      const lineHeight = parseFloat(styles.lineHeight);
      const lines = window.innerWidth >= 1024 ? 5 : 4;

      setCollapsedHeight(
        lineHeight * lines +
          parseFloat(styles.paddingTop) +
          parseFloat(styles.paddingBottom),
      );
      setExpandedHeight(element.scrollHeight);
    };

    updateHeights();

    const observer = new ResizeObserver(updateHeights);
    observer.observe(element);

    window.addEventListener("resize", updateHeights);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeights);
    };
  }, [paragraphs]);
  if (!media?.src) return null;

  const desktopImage = getImageProps({
    src: media.src,
    alt: media.alt,
    fill: true,
    sizes: "(max-width: 1023px) calc(100vw - 24px), 47vw",
    loading: "eager",
    fetchPriority: "high",
    className:
      "absolute inset-0 block h-full w-full object-cover object-center",
  }).props;
  const mobileImage = media.mobile_src
    ? getImageProps({
        src: media.mobile_src,
        alt: media.alt,
        fill: true,
        sizes: "(max-width: 767px) 100vw, 50vw",
        loading: "eager",
        fetchPriority: "high",
        className:
          "absolute inset-0 block h-full w-full object-cover object-center",
      }).props
    : null;

  return (
    <section
      id={section.id}
      dir={direction}
      aria-labelledby="wealth-page-hero-heading"
      className="relative isolate overflow-hidden border-b border-white/10 bg-brand-secondary text-white"
    >
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

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,.55) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.45) 1px,transparent 1px)",
          backgroundSize: "88px 88px",
          maskImage:
            "linear-gradient(to bottom,black,transparent 82%),linear-gradient(to right,transparent,black 40%,black 70%,transparent)",
        }}
      />

      <div
        className="
  dnh-site-shell relative z-10
  grid w-full min-w-0
  grid-cols-[minmax(0,1fr)]
  gap-8
  min-h-svh
  pb-10
  pt-[calc(7.5rem+env(safe-area-inset-top))]

  sm:gap-10
  sm:pb-14
  sm:pt-[calc(8.75rem+env(safe-area-inset-top))]

  lg:grid-cols-[minmax(0,1.06fr)_minmax(400px,0.94fr)]
  lg:items-center
  lg:gap-[clamp(2.5rem,5vw,6rem)]
  lg:pb-[clamp(4rem,8svh,7rem)]
  lg:pt-[calc(8.75rem+env(safe-area-inset-top))]
"
      >
        <div className="contents min-w-0 lg:col-start-1 lg:row-start-1 lg:block">
          <div className="order-1 min-w-0">
            <header className="max-w-[58rem] text-start">
              <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-bold leading-7 text-white sm:text-[13px]">
                <span
                  aria-hidden="true"
                  className="h-[2px] w-9 shrink-0 bg-brand-primary sm:w-9"
                />
                <span>{section.eyebrow}</span>
              </div>

              <h1
                id="wealth-page-hero-heading"
                className={`mt-4 max-w-[60ch]  text-[clamp(1.75rem,7vw,1.5rem)] font-black sm:mt-6   lg:text-[clamp(2.8rem,4vw,2.7rem)] ${
                  isRTL ? "leading-[1.5]" : "leading-[1.08] tracking-[-0.035em]"
                }`}
              >
                {highlightIndex < 0 ? (
                  section.heading
                ) : (
                  <>
                    {section.heading.slice(0, highlightIndex)}
                    <span className="text-brand-primary">
                      {section.heading.slice(
                        highlightIndex,
                        highlightIndex + highlight.length,
                      )}
                    </span>
                    {section.heading.slice(highlightIndex + highlight.length)}
                  </>
                )}
              </h1>
            </header>

            {paragraphs.length > 0 ? (
              <div className="mt-5 max-w-[109ch] border-s border-brand-primary/65 ps-4 sm:mt-7 sm:ps-5 lg:mt-8">
                <div
                  id="wealth-hero-description"
                  ref={descriptionRef}
                  className={`
    space-y-3
    overflow-hidden
    text-start text-[13px]
    font-normal text-white/76
    sm:text-[15px]
    lg:text-[16px]

    transition-[max-height,opacity]
    duration-500
    ease-in-out
    motion-reduce:transition-none

    ${isRTL ? "leading-[2]" : "leading-[1.72]"}
  `}
                  style={{
                    maxHeight: isDescriptionExpanded
                      ? `${expandedHeight}px`
                      : `${collapsedHeight}px`,
                  }}
                >
                  {paragraphs.map((paragraph) => (
                    <p key={paragraph.id}>
                      <WealthRichText text={paragraph.text} />
                    </p>
                  ))}
                </div>

                {descriptionToggle ? (
                  <button
                    type="button"
                    aria-expanded={isDescriptionExpanded}
                    aria-controls="wealth-hero-description"
                    onClick={() =>
                      setIsDescriptionExpanded((isExpanded) => !isExpanded)
                    }
                    className="mt-2 inline-flex min-h-11 cursor-pointer items-center gap-2 text-[12px] font-bold text-brand-primary transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary motion-reduce:transition-none sm:mt-3 sm:text-[13px]"
                  >
                    <span>
                      {isDescriptionExpanded
                        ? descriptionToggle.collapse_label
                        : descriptionToggle.expand_label}
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className={`size-4 shrink-0 transition-transform duration-500 ease-in-outmotion-reduce:transition-none ${
                        isDescriptionExpanded ? "rotate-180" : "rotate-0"
                      }`}
                      strokeWidth={1.8}
                    />
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="order-3 grid min-w-0 gap-1 grid-cols-2 lg:mt-9 lg:flex lg:flex-wrap">
            {section.ctas.map((cta) => (
              <ActionButton
                key={cta.id}
                href={cta.href}
                variant={cta.type}
                shape="square"
                size="md"
                dir={direction}
                className={`w-full min-w-0 shadow-none hover:shadow-none sm:min-w-[250px] lg:w-auto ${
                  cta.type === "primary"
                    ? "!bg-brand-primary !text-brand-secondary hover:!bg-white"
                    : "!border-white/35 !bg-transparent !text-white hover:!border-brand-primary hover:!bg-transparent hover:!text-brand-primary"
                }`}
              >
                {cta.label}
              </ActionButton>
            ))}
          </div>
        </div>

        <figure
          className="
    relative order-2
    block w-full min-w-0 max-w-full
    aspect-[4/3]
    min-h-0
    overflow-hidden
    border border-white/15
    bg-brand-secondary

    sm:aspect-[16/10]
    sm:min-h-[420px]

    lg:col-start-2
    lg:row-start-1
    lg:aspect-auto
    lg:h-[min(760px,76svh)]
    lg:min-h-[560px]
  "
        >
          <picture className="absolute inset-0 block h-full w-full">
            {mobileImage ? (
              <source
                media="(max-width: 767px)"
                srcSet={mobileImage.srcSet}
                sizes={mobileImage.sizes}
              />
            ) : null}
            <img {...desktopImage} alt={media.alt} />
          </picture>
          <div
            aria-hidden="true"
            className="absolute inset-0 lg:hidden"
            style={{
              backgroundImage:
                "linear-gradient(to top,var(--dnh-secondary),transparent 58%)",
              opacity: 0.7,
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 hidden lg:block"
            style={{
              backgroundImage: isRTL
                ? "linear-gradient(to left,color-mix(in srgb,var(--dnh-secondary) 42%,transparent),transparent 42%)"
                : "linear-gradient(to right,color-mix(in srgb,var(--dnh-secondary) 42%,transparent),transparent 42%)",
            }}
          />
        </figure>
      </div>
    </section>
  );
}
