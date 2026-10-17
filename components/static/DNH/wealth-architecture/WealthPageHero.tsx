import { getImageProps } from "next/image";

import {
  WealthActions,
  WealthParagraph,
  WealthRichText,
  WealthSectionHeader,
  getParagraphs,
} from "./WealthArchitectureShared";
import type { WealthSectionProps } from "./wealthArchitectureTypes";

export function WealthPageHero({ section, direction }: WealthSectionProps) {
  const paragraphs = getParagraphs(section);
  const media = section.media;

  if (!media?.src) return null;

  const desktopImage = getImageProps({
    src: media.src,
    alt: media.alt,
    fill: true,
    sizes: "(max-width: 1023px) calc(100vw - 24px), 46vw",
    loading: "eager",
    fetchPriority: "high",
    className: "h-full w-full object-cover object-center",
  }).props;
  const mobileImage = media.mobile_src
    ? getImageProps({
        src: media.mobile_src,
        alt: media.alt,
        fill: true,
        sizes: "calc(100vw - 24px)",
        loading: "eager",
        fetchPriority: "high",
        className: "h-full w-full object-cover object-center",
      }).props
    : null;

  return (
    <section
      id={section.id}
      dir={direction}
      aria-labelledby="wealth-page-hero-heading"
      className="relative isolate overflow-hidden border-b border-white/10 bg-[color-mix(in_srgb,var(--dnh-secondary)_38%,#101820)] text-white"
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
      ) : null}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.07) 1px,transparent 1px)",
          backgroundSize: "82px 82px",
        }}
      />

      <div className="dnh-site-shell relative z-10 grid min-h-svh min-w-0 gap-8 pb-12 pt-[calc(8.5rem+env(safe-area-inset-top))] sm:pb-16 sm:pt-[calc(9.5rem+env(safe-area-inset-top))] lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:items-center lg:gap-12 lg:pb-20 lg:pt-[calc(9rem+env(safe-area-inset-top))]">
        <div className="contents lg:block lg:col-start-1 lg:row-start-1">
          <div className="order-1">
            <WealthSectionHeader
              section={section}
              direction={direction}
              headingId="wealth-page-hero-heading"
              as="h1"
              dark
              className="max-w-[760px]"
            />

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:max-w-[780px]">
              {paragraphs.map((paragraph) => (
                <WealthParagraph
                  key={paragraph.id}
                  direction={direction}
                  dark
                  className="border-s border-white/20 ps-4 text-[13px] sm:text-[14px]"
                >
                  <WealthRichText text={paragraph.text} />
                </WealthParagraph>
              ))}
            </div>
          </div>

          <WealthActions
            ctas={section.ctas}
            direction={direction}
            dark
            className="order-3 mt-0 lg:mt-8"
          />
        </div>

        <div className="relative order-2 aspect-[4/5] min-h-[430px] overflow-hidden border border-white/16 bg-brand-primary lg:col-start-2 lg:row-start-1 lg:h-[min(760px,76svh)] lg:aspect-auto">
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
            className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-brand-primary/10"
          />
        </div>
      </div>
    </section>
  );
}
