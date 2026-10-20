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
  /** Optional for editorial pages without a dedicated hero image. */
  media?: DnhPageHeroMedia;
  mediaMode?: "side" | "background";
  expandLabel?: string;
  collapseLabel?: string;
  headingId?: string;
  /** Compact mode works well for FAQ and other interior landing pages. */
  compact?: boolean;
};

function HighlightedHeading({
  heading,
  highlight,
}: {
  heading: string;
  highlight?: string;
}) {
  const trimmed = highlight?.trim() ?? "";
  const index = trimmed ? heading.indexOf(trimmed) : -1;
  if (index < 0) return <>{heading}</>;

  return (
    <>
      {heading.slice(0, index)}
      <span className="text-brand-primary">
        {heading.slice(index, index + trimmed.length)}
      </span>
      {heading.slice(index + trimmed.length)}
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
  const innerRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [fullHeight, setFullHeight] = useState<number>();
  const [shortHeight, setShortHeight] = useState<number>();
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const element = innerRef.current;
    if (!element) return;

    const measure = () => {
      const style = window.getComputedStyle(element);
      const lineHeight = Number.parseFloat(style.lineHeight);
      const fallback = direction === "rtl" ? 28 : 26;
      const collapsed =
        (Number.isFinite(lineHeight) ? lineHeight : fallback) *
        (window.innerWidth >= 1024 ? 5 : 4);
      const full = element.scrollHeight;
      setShortHeight(collapsed);
      setFullHeight(full);
      setIsOverflowing(full > collapsed + 3);
    };

    measure();
    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(measure)
        : null;
    observer?.observe(element);
    window.addEventListener("resize", measure);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [paragraphs, direction]);

  if (paragraphs.length === 0) return null;

  const descriptionId = `${id}-description`;
  const height = expanded || !isOverflowing ? fullHeight : shortHeight;

  return (
    <div className="mt-5 max-w-[78ch] border-s-2 border-brand-accent/70 ps-4 sm:mt-7 sm:ps-5 lg:mt-8">
      <div
        id={descriptionId}
        className="overflow-hidden transition-[max-height] duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none"
        style={{ maxHeight: height === undefined ? undefined : `${height}px` }}
      >
        <div
          ref={innerRef}
          className={`space-y-3 text-start text-[13px] font-normal text-white/80 sm:text-[15px] lg:text-[16px] ${
            direction === "rtl" ? "leading-[2]" : "leading-[1.75]"
          }`}
        >
          {paragraphs.map((paragraph) => (
            <p key={paragraph.id}>{paragraph.text}</p>
          ))}
        </div>
      </div>
      {isOverflowing && (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={descriptionId}
          onClick={() => setExpanded((current) => !current)}
          className="mt-2 inline-flex min-h-11 items-center gap-2 text-[12px] font-bold text-brand-accent transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent sm:text-[13px]"
        >
          {expanded ? collapseLabel : expandLabel}
          <ChevronDown
            aria-hidden="true"
            size={16}
            className={`transition-transform duration-300 motion-reduce:transition-none ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      )}
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
  if (ctas.length === 0) return null;
  return (
    <div
      className={`grid min-w-0 grid-cols-1 gap-2 sm:flex sm:flex-wrap ${className}`}
    >
      {ctas.map((cta) => (
        <ActionButton
          key={cta.id}
          href={cta.href}
          variant={cta.type}
          shape="square"
          size="md"
          dir={direction}
          className={`min-h-12 w-full min-w-0 shadow-none hover:shadow-none sm:w-auto ${
            cta.type === "primary"
              ? "!bg-brand-primary !text-white hover:!bg-brand-accent hover:!text-ink"
              : "!border-white/30 !bg-white/5 !text-white hover:!border-white/60 hover:!bg-white/10"
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
  compact = false,
}: DnhPageHeroProps) {
  const rtl = direction === "rtl";
  const resolvedMode = media?.src ? mediaMode : "background";
  const resolvedExpandLabel =
    expandLabel ?? (rtl ? "مشاهده توضیحات کامل" : "Read more");
  const resolvedCollapseLabel =
    collapseLabel ?? (rtl ? "نمایش خلاصه" : "Show less");

  const desktopImage = media?.src
    ? getImageProps({
        src: media.src,
        alt: media.alt,
        fill: true,
        sizes:
          resolvedMode === "background"
            ? "100vw"
            : "(max-width: 1023px) calc(100vw - 24px), 47vw",
        loading: "eager",
        fetchPriority: "high",
        className: "absolute inset-0 block h-full w-full object-cover",
        style: { objectPosition: media.objectPosition ?? "center" },
      }).props
    : null;

  const mobileImage = media?.mobileSrc
    ? getImageProps({
        src: media.mobileSrc,
        alt: media.alt,
        fill: true,
        sizes:
          resolvedMode === "background" ? "100vw" : "(max-width: 767px) 100vw",
        loading: "eager",
        fetchPriority: "high",
        className: "absolute inset-0 block h-full w-full object-cover",
        style: {
          objectPosition:
            media.mobileObjectPosition ?? media.objectPosition ?? "center",
        },
      }).props
    : null;

  const renderImage = () =>
    desktopImage && (
      <picture className="absolute inset-0 block h-full w-full">
        {mobileImage && (
          <source
            media="(max-width: 767px)"
            srcSet={mobileImage.srcSet}
            sizes={mobileImage.sizes}
          />
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img {...desktopImage} alt={media?.alt ?? ""} />
      </picture>
    );

  const content = (
    <div className="min-w-0">
      <header className="max-w-[60rem] text-start">
        <p className="flex items-center gap-3 text-[12px] font-bold leading-7 text-white/85 sm:text-[13px]">
          <span
            aria-hidden="true"
            className="h-[2px] w-8 shrink-0 bg-brand-accent"
          />
          {eyebrow}
        </p>
        <h1
          id={headingId}
          className={`mt-5 max-w-[22ch] text-pretty font-black [overflow-wrap:break-word] ${
            compact
              ? "text-[clamp(1.85rem,4.5vw,3.25rem)]"
              : "text-[clamp(1.85rem,5vw,3.4rem)]"
          } ${rtl ? "leading-[1.5]" : "leading-[1.17] tracking-[-.025em]"}`}
        >
          <HighlightedHeading heading={heading} highlight={headingHighlight} />
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
      {desktopImage &&
        (mobileImage ? (
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
        ))}

      {resolvedMode === "background" && (
        <>
          {desktopImage ? (
            renderImage()
          ) : (
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 77% 29%,rgba(34,129,160,.28),transparent 36%),radial-gradient(circle at 16% 86%,rgba(209,141,67,.14),transparent 40%),linear-gradient(115deg,#061723 0%,#10374b 60%,#081e2d 100%)",
              }}
            />
          )}
          {desktopImage && (
            <>
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(9,22,36,.63),rgba(9,22,36,.89))] lg:hidden"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 hidden lg:block"
                style={{
                  backgroundImage: `linear-gradient(${rtl ? "to left" : "to right"},rgba(9,22,36,.94),rgba(9,22,36,.77) 48%,rgba(9,22,36,.16))`,
                }}
              />
            </>
          )}
        </>
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,.35) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.28) 1px,transparent 1px)",
          backgroundSize: "88px 88px",
        }}
      />

      {resolvedMode === "background" ? (
        <div
          className={`dnh-site-shell relative z-10 flex min-w-0 items-center py-12 pt-[calc(8rem+env(safe-area-inset-top))] sm:pt-[calc(9rem+env(safe-area-inset-top))] ${
            compact
              ? "min-h-[470px] sm:min-h-[500px] lg:min-h-[530px] lg:pb-16"
              : "min-h-svh lg:pb-[clamp(4rem,8svh,7rem)]"
          }`}
        >
          <div className="w-full min-w-0 lg:max-w-[68%]">
            {content}
            <HeroActions
              ctas={ctas}
              direction={direction}
              className="mt-7 lg:mt-9"
            />
          </div>
        </div>
      ) : (
        <div
          className={`dnh-site-shell relative z-10 grid w-full min-w-0 grid-cols-[minmax(0,1fr)] gap-8 pb-10 pt-[calc(8rem+env(safe-area-inset-top))] sm:gap-10 sm:pb-14 sm:pt-[calc(9rem+env(safe-area-inset-top))] lg:grid-cols-[minmax(0,1.06fr)_minmax(400px,0.94fr)] lg:items-center lg:gap-[clamp(2.5rem,5vw,6rem)] ${compact ? "lg:min-h-[520px]" : "min-h-svh"}`}
        >
          <div className="contents min-w-0 lg:col-start-1 lg:row-start-1 lg:block">
            <div className="order-1 min-w-0">{content}</div>
            <HeroActions
              ctas={ctas}
              direction={direction}
              className="order-3 lg:mt-8"
            />
          </div>
          <figure className="relative order-2 block aspect-[4/3] w-full min-w-0 overflow-hidden border border-white/15 sm:aspect-[16/10] lg:col-start-2 lg:row-start-1 lg:h-[min(720px,74svh)] lg:min-h-[500px] lg:aspect-auto">
            {renderImage()}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_top,rgba(9,22,36,.35),transparent_55%)]"
            />
          </figure>
        </div>
      )}
    </section>
  );
}
