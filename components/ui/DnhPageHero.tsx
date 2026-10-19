"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { getImageProps } from "next/image";

import { ActionButton } from "@/components/ui/ActionButton";

export type DnhPageHeroParagraph = {
  id: string;
  text: string;
};

export type DnhPageHeroCta = {
  id: string;
  label: string;
  href: string;
  type: "primary" | "secondary";
};

export type DnhPageHeroMedia = {
  src: string;
  mobileSrc?: string;
  alt: string;
  objectPosition?: string;
  mobileObjectPosition?: string;
};

type DnhPageHeroProps = {
  id: string;
  direction: "rtl" | "ltr";
  lang?: string;
  eyebrow: string;
  heading: string;
  headingHighlight?: string;
  paragraphs: DnhPageHeroParagraph[];
  ctas: DnhPageHeroCta[];
  media: DnhPageHeroMedia;
  mediaMode?: "side" | "background";
  expandLabel?: string;
  collapseLabel?: string;
  headingId?: string;
};

function HighlightedHeading({
  heading,
  highlight,
}: {
  heading: string;
  highlight?: string;
}) {
  const normalizedHighlight = highlight?.trim() ?? "";
  const highlightIndex = normalizedHighlight
    ? heading.indexOf(normalizedHighlight)
    : -1;

  if (highlightIndex < 0) return <>{heading}</>;

  return (
    <>
      {heading.slice(0, highlightIndex)}
      <span className="text-brand-primary">
        {heading.slice(
          highlightIndex,
          highlightIndex + normalizedHighlight.length,
        )}
      </span>
      {heading.slice(highlightIndex + normalizedHighlight.length)}
    </>
  );
}

function HeroDescription({
  id,
  paragraphs,
  direction,
  expandLabel,
  collapseLabel,
}: {
  id: string;
  paragraphs: DnhPageHeroParagraph[];
  direction: "rtl" | "ltr";
  expandLabel: string;
  collapseLabel: string;
}) {
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedHeight, setExpandedHeight] = useState<number>();
  const [collapsedHeight, setCollapsedHeight] = useState<number>();
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const element = descriptionRef.current;
    if (!element) return;

    const updateHeights = () => {
      const styles = window.getComputedStyle(element);
      const lineHeight = Number.parseFloat(styles.lineHeight);
      const lines = window.innerWidth >= 1024 ? 5 : 4;
      const nextCollapsedHeight =
        lineHeight * lines +
        Number.parseFloat(styles.paddingTop) +
        Number.parseFloat(styles.paddingBottom);

      setCollapsedHeight(nextCollapsedHeight);
      setExpandedHeight(element.scrollHeight);
      setHasOverflow(element.scrollHeight > nextCollapsedHeight + 2);
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

  if (!paragraphs.length) return null;

  const descriptionId = `${id}-description`;

  return (
    <div className="mt-5 max-w-[109ch] border-s border-brand-primary/65 ps-4 sm:mt-7 sm:ps-5 lg:mt-8">
      <div
        id={descriptionId}
        ref={descriptionRef}
        className={`space-y-3 overflow-hidden text-start text-[13px] font-normal text-white/76 transition-[max-height,opacity] duration-500 ease-in-out motion-reduce:transition-none sm:text-[15px] lg:text-[16px] ${
          direction === "rtl" ? "leading-[2]" : "leading-[1.72]"
        }`}
        style={{
          maxHeight:
            isExpanded || !hasOverflow
              ? expandedHeight
                ? `${expandedHeight}px`
                : undefined
              : collapsedHeight
                ? `${collapsedHeight}px`
                : undefined,
        }}
      >
        {paragraphs.map((paragraph) => (
          <p key={paragraph.id}>{paragraph.text}</p>
        ))}
      </div>

      {hasOverflow ? (
        <button
          type="button"
          aria-expanded={isExpanded}
          aria-controls={descriptionId}
          onClick={() => setIsExpanded((current) => !current)}
          className="mt-2 inline-flex min-h-11 cursor-pointer items-center gap-2 text-[12px] font-bold text-brand-primary transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary motion-reduce:transition-none sm:mt-3 sm:text-[13px]"
        >
          <span>{isExpanded ? collapseLabel : expandLabel}</span>
          <ChevronDown
            aria-hidden="true"
            className={`size-4 shrink-0 transition-transform duration-500 ease-in-out motion-reduce:transition-none ${
              isExpanded ? "rotate-180" : "rotate-0"
            }`}
            strokeWidth={1.8}
          />
        </button>
      ) : null}
    </div>
  );
}

function HeroActions({
  ctas,
  direction,
  className = "",
}: {
  ctas: DnhPageHeroCta[];
  direction: "rtl" | "ltr";
  className?: string;
}) {
  if (!ctas.length) return null;

  return (
    <div
      className={`grid min-w-0 grid-cols-2 gap-1 lg:flex lg:flex-wrap ${className}`}
    >
      {ctas.map((cta) => (
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
  );
}

export function DnhPageHero({
  id,
  direction,
  lang,
  eyebrow,
  heading,
  headingHighlight,
  paragraphs,
  ctas,
  media,
  mediaMode = "side",
  expandLabel,
  collapseLabel,
  headingId = `${id}-heading`,
}: DnhPageHeroProps) {
  const isRTL = direction === "rtl";
  const resolvedExpandLabel =
    expandLabel ??
    (isRTL ? "مشاهده توضیحات کامل" : "Read the full introduction");
  const resolvedCollapseLabel =
    collapseLabel ?? (isRTL ? "نمایش خلاصه" : "Show less");

  const desktopImage = getImageProps({
    src: media.src,
    alt: media.alt,
    fill: true,
    sizes:
      mediaMode === "background"
        ? "100vw"
        : "(max-width: 1023px) calc(100vw - 24px), 47vw",
    loading: "eager",
    fetchPriority: "high",
    className: "absolute inset-0 block h-full w-full object-cover",
    style: { objectPosition: media.objectPosition ?? "center" },
  }).props;
  const mobileImage = media.mobileSrc
    ? getImageProps({
        src: media.mobileSrc,
        alt: media.alt,
        fill: true,
        sizes: mediaMode === "background" ? "100vw" : "(max-width: 767px) 100vw",
        loading: "eager",
        fetchPriority: "high",
        className: "absolute inset-0 block h-full w-full object-cover",
        style: {
          objectPosition:
            media.mobileObjectPosition ?? media.objectPosition ?? "center",
        },
      }).props
    : null;

  const preload = mobileImage ? (
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
  );

  const copy = (
    <div className="min-w-0">
      <header className="max-w-[58rem] text-start">
        <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-bold leading-7 text-white sm:text-[13px]">
          <span
            aria-hidden="true"
            className="h-[2px] w-9 shrink-0 bg-brand-primary"
          />
          <span>{eyebrow}</span>
        </div>

        <h1
          id={headingId}
          className={`mt-4 max-w-[60ch] text-[clamp(1.75rem,7vw,1.5rem)] font-black sm:mt-6 lg:text-[clamp(2.8rem,4vw,2.7rem)] ${
            isRTL ? "leading-[1.5]" : "leading-[1.08] tracking-[-0.035em]"
          }`}
        >
          <HighlightedHeading
            heading={heading}
            highlight={headingHighlight}
          />
        </h1>
      </header>

      <HeroDescription
        id={id}
        paragraphs={paragraphs}
        direction={direction}
        expandLabel={resolvedExpandLabel}
        collapseLabel={resolvedCollapseLabel}
      />
    </div>
  );

  return (
    <section
      id={id}
      dir={direction}
      lang={lang}
      aria-labelledby={headingId}
      className="relative isolate overflow-hidden border-b border-white/10 bg-brand-secondary text-white"
    >
      {preload}

      {mediaMode === "background" ? (
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
      ) : null}

      {mediaMode === "background" ? (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(20,24,27,.72),rgba(20,24,27,.96)_82%)] lg:hidden"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 hidden lg:block"
            style={{
              backgroundImage: isRTL
                ? "linear-gradient(to left,rgba(20,24,27,.98) 4%,rgba(20,24,27,.91) 42%,rgba(20,24,27,.2) 78%,rgba(20,24,27,.08))"
                : "linear-gradient(to right,rgba(20,24,27,.98) 4%,rgba(20,24,27,.91) 42%,rgba(20,24,27,.2) 78%,rgba(20,24,27,.08))",
            }}
          />
        </>
      ) : null}

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

      {mediaMode === "background" ? (
        <div className="dnh-site-shell relative z-10 flex min-h-svh items-center pb-10 pt-[calc(7.5rem+env(safe-area-inset-top))] sm:pb-14 sm:pt-[calc(8.75rem+env(safe-area-inset-top))] lg:pb-[clamp(4rem,8svh,7rem)] lg:pt-[calc(8.75rem+env(safe-area-inset-top))]">
          <div className="w-full lg:max-w-[66%]">
            {copy}
            <HeroActions
              ctas={ctas}
              direction={direction}
              className="mt-7 lg:mt-9"
            />
          </div>
        </div>
      ) : (
        <div className="dnh-site-shell relative z-10 grid min-h-svh w-full min-w-0 grid-cols-[minmax(0,1fr)] gap-8 pb-10 pt-[calc(7.5rem+env(safe-area-inset-top))] sm:gap-10 sm:pb-14 sm:pt-[calc(8.75rem+env(safe-area-inset-top))] lg:grid-cols-[minmax(0,1.06fr)_minmax(400px,0.94fr)] lg:items-center lg:gap-[clamp(2.5rem,5vw,6rem)] lg:pb-[clamp(4rem,8svh,7rem)] lg:pt-[calc(8.75rem+env(safe-area-inset-top))]">
          <div className="contents min-w-0 lg:col-start-1 lg:row-start-1 lg:block">
            <div className="order-1">{copy}</div>
            <HeroActions
              ctas={ctas}
              direction={direction}
              className="order-3 mt-0 lg:mt-9"
            />
          </div>

          <figure className="relative order-2 block aspect-[4/3] w-full min-w-0 max-w-full overflow-hidden border border-white/15 bg-brand-secondary sm:aspect-[16/10] sm:min-h-[420px] lg:col-start-2 lg:row-start-1 lg:h-[min(760px,76svh)] lg:min-h-[560px] lg:aspect-auto">
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
              className="absolute inset-0 bg-[linear-gradient(to_top,var(--dnh-secondary),transparent_58%)] opacity-70 lg:hidden"
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
      )}
    </section>
  );
}
