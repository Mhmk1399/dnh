/* eslint-disable @next/next/no-img-element -- The picture sources use optimized next/image props. */
import { getImageProps } from "next/image";

import { ActionButton } from "@/components/ui/ActionButton";
import homepage from "@/config/DNH_Homepage_Final_FA.json";

type HeroContent = {
  id: string;
  eyebrow: string;
  heading: string;
  paragraphs: { id: string; text: string }[];
  ctas: {
    id: string;
    label: string;
    type: "primary" | "secondary";
    href: string;
  }[];
  trust_line: string;
  media: {
    src: string;
    mobile_src: string;
    alt: string;
    width: number;
    height: number;
  };
};

export function HomeHero({
  content = homepage.sections.find((section) => section.id === "hero") as
    | HeroContent
    | undefined,
  locale = homepage.locale,
  direction = homepage.direction === "ltr" ? "ltr" : "rtl",
}: {
  content?: HeroContent;
  locale?: string;
  direction?: "rtl" | "ltr";
} = {}) {
  if (!content) return null;

  const desktopSrc = content.media.src.trim();
  const mobileSrc = content.media.mobile_src.trim();
  const imageSrc = desktopSrc || mobileSrc;
  const imageProps = imageSrc
    ? getImageProps({
        src: imageSrc,
        alt: content.media.alt || content.trust_line,
        width: content.media.width,
        height: content.media.height,
        sizes: "100vw",
        loading: "eager",
        fetchPriority: "high",
      }).props
    : null;
  const mobileImageProps =
    desktopSrc && mobileSrc && desktopSrc !== mobileSrc
      ? getImageProps({
          src: mobileSrc,
          alt: content.media.alt || content.trust_line,
          width: content.media.width,
          height: content.media.height,
          sizes: "100vw",
        }).props
      : null;

  return (
    <section
      id={content.id}
      dir={direction}
      lang={locale}
      aria-labelledby={`${content.id}-title`}
      className="
        relative isolate scroll-mt-24 overflow-hidden
        bg-[color-mix(in_srgb,var(--dnh-text)_80%,var(--dnh-secondary))]
        text-start text-[var(--dnh-text-on-brand)]
      "
    >
      {imageProps ? (
        <link
          rel="preload"
          as="image"
          imageSrcSet={imageProps.srcSet}
          imageSizes="100vw"
          media={mobileImageProps ? "(min-width: 1024px)" : undefined}
          fetchPriority="high"
        />
      ) : null}
      {mobileImageProps ? (
        <link
          rel="preload"
          as="image"
          imageSrcSet={mobileImageProps.srcSet}
          imageSizes="100vw"
          media="(max-width: 1023px)"
          fetchPriority="high"
        />
      ) : null}

      <div
        className="
          dnh-site-shell grid min-w-0 grid-cols-1 gap-y-7
          pb-10 pt-[calc(7.5rem+env(safe-area-inset-top))]
          sm:gap-y-8 sm:pb-14 sm:pt-[calc(8rem+env(safe-area-inset-top))]
          lg:min-h-[100svh] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]
          lg:content-center lg:gap-x-12 lg:gap-y-8
          lg:pb-16 lg:pt-[calc(9rem+env(safe-area-inset-top))]
          xl:gap-x-20
        "
      >
        <div className="relative z-10 min-w-0 lg:col-start-1 lg:row-start-1">
          <div className="mb-5 flex items-center gap-3 sm:mb-6">
            <span
              aria-hidden="true"
              className="h-px w-8 shrink-0 bg-brand-accent sm:w-10"
            />
            <p className="text-xs font-bold leading-7 text-page/85 sm:text-[13px]">
              {content.eyebrow}
            </p>
          </div>

          <h1
            id={`${content.id}-title`}
            className="
              text-[clamp(1.75rem,5.4vw,3rem)] font-black leading-[1.6]
              [overflow-wrap:anywhere]
              lg:text-[clamp(2rem,3.1vw,3.5rem)] lg:leading-[1.55]
            "
          >
            {content.heading}
          </h1>

          <div className="mt-6 max-w-[42rem] space-y-4 sm:mt-7">
            {content.paragraphs.map((paragraph) => (
              <p
                key={paragraph.id}
                className="text-[13px] font-medium leading-[2.05] text-page/80 sm:text-sm lg:text-[15px]"
              >
                {paragraph.text}
              </p>
            ))}
          </div>
        </div>

        <figure
          aria-hidden={imageProps ? undefined : true}
          className="
            relative m-0 aspect-[4/3] min-w-0 overflow-hidden
            border border-page/15 bg-brand-secondary/15
            sm:aspect-video
            lg:absolute lg:inset-0 lg:z-0 lg:aspect-auto lg:border-0
          "
        >
          {imageProps ? (
            <picture className="absolute inset-0 block h-full w-full">
              {mobileImageProps ? (
                <source
                  media="(max-width: 1023px)"
                  srcSet={mobileImageProps.srcSet}
                  sizes="100vw"
                />
              ) : null}
              <img
                {...imageProps}
                alt={imageProps.alt}
                className="h-full w-full object-cover object-center"
              />
            </picture>
          ) : null}

          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute inset-0 hidden lg:block
              from-[color-mix(in_srgb,var(--dnh-text)_92%,var(--dnh-secondary))]
              from-10%
              via-[color-mix(in_srgb,var(--dnh-text)_80%,var(--dnh-secondary))]/85
              via-45% to-transparent
              rtl:bg-linear-to-l ltr:bg-linear-to-r
            "
          />
        </figure>

        <div
          className="
            relative z-10 flex min-w-0 flex-col gap-3
            sm:flex-row sm:flex-wrap
            lg:col-start-1 lg:row-start-2
          "
        >
          {content.ctas.map((cta) => (
            <ActionButton
              key={cta.id}
              href={cta.href}
              variant={cta.type}
              shape="square"
              size="md"
              className={
                cta.type === "primary"
                  ? "w-full border border-page/25 shadow-none sm:w-auto"
                  : "w-full border-page/30 bg-page/5 text-page shadow-none hover:border-page/60 hover:bg-page/10 hover:text-page sm:w-auto"
              }
            >
              <span className="flex min-w-0 items-center justify-center gap-3">
                <span className="min-w-0 text-start leading-6">{cta.label}</span>
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center border border-current/20"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-4 w-4 ltr:rotate-180"
                  >
                    <path
                      d="M19 12H5M5 12L10 7M5 12L10 17"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </span>
            </ActionButton>
          ))}
        </div>

        <p
          className="
            relative z-10 min-w-0 border-t border-page/20 pt-5
            text-xs font-medium leading-[2] text-page/75
            sm:text-[13px] lg:col-start-1 lg:row-start-3
          "
        >
          {content.trust_line}
        </p>
      </div>
    </section>
  );
}
