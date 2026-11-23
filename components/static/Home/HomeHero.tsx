import { getImageProps } from "next/image";

import { ActionButton } from "@/components/ui/ActionButton";
import { getHomepageContent } from "@/lib/homepage-content";
import { SITE_LANGUAGES, type SiteLocale } from "@/lib/site-language";
import { HomeHeroDescription } from "./HomeHeroDescription";

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

export function HomeHero({ locale }: { locale: SiteLocale }) {
  const { direction, languageTag } = SITE_LANGUAGES[locale];
  const isRTL = direction === "rtl";
  const hero = getHomepageContent(locale).sections.find(
    (section) => section.id === "hero" && section.type === "hero",
  ) as HeroContent | undefined;

  if (!hero) return null;

  const highlight = hero.heading_highlight ?? "";
  const highlightIndex = highlight ? hero.heading.indexOf(highlight) : -1;

  const mobileSource = hero.media.mobile_src?.trim();
  const desktopSource = hero.media.src.trim() || mobileSource;
  const hasMobileCrop = Boolean(mobileSource && mobileSource !== desktopSource);
  const desktopImage = desktopSource && getImageProps({
    src: desktopSource,
    alt: hero.media.alt,
    fill: true,
    unoptimized: true,
    loading: "eager",
    fetchPriority: "high",
    className: `absolute inset-0 h-full w-full object-cover object-[center_30%] sm:object-center lg:object-center ${
      isRTL ? "" : "md:[transform:scaleX(-1)]"
    }`,
  }).props;

  const desktopScrim = `
  linear-gradient(
    ${isRTL ? "to left" : "to right"},
    color-mix(in srgb, var(--dnh-text) 98%, transparent) 0%,
    color-mix(in srgb, var(--dnh-text) 94%, transparent) 24%,
    color-mix(in srgb, var(--dnh-text) 82%, transparent) 48%,
    color-mix(in srgb, var(--dnh-text) 5%, transparent) 60%,
    color-mix(in srgb, var(--dnh-text) 12%, transparent) 100%
  )
`;
  const hasDescription = hero.paragraphs.some(
    (paragraph) => paragraph.text.trim().length > 0,
  );

  return (
    <section
      id={hero.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="home-hero-heading"
      className="relative isolate overflow-hidden h-screen border-b border-line   text-[var(--dnh-text-on-brand)]"
    >
      {hasMobileCrop && (
        <link
          rel="preload"
          as="image"
          href={mobileSource}
          media="(width < 768px)"
          fetchPriority="high"
        />
      )}
      {desktopSource && (
        <link
          rel="preload"
          as="image"
          href={desktopSource}
          media={hasMobileCrop ? "(min-width: 768px)" : undefined}
          fetchPriority="high"
        />
      )}

      {/* Mobile image area / Full desktop background */}
      <div
        className="
          pointer-events-none absolute inset-x-0 top-0 z-0
          h-screen   md:mt-0
          overflow-hidden
          lg:inset-0 lg:h-full
        "
      >
        {desktopImage && (
          <picture className="absolute inset-0 block h-full w-full">
            {hasMobileCrop && <source media="(width < 768px)" srcSet={mobileSource} />}
            <img {...desktopImage} alt={hero.media.alt} />
          </picture>
        )}

        {/* Mobile: dark top, visible center, smooth bottom */}
        <div
          aria-hidden="true"
          className="absolute inset-0 lg:hidden"
          style={{
            backgroundImage: `
              linear-gradient(
                to top,
                rgba(8,20,38,0.82) 20%,
                rgba(8,20,38,0.66) 36%,
                rgba(8,20,38,0.14) 63%,
                rgba(8,20,38,0.12) 80%,
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

    pt-[clamp(29rem,57svh,32rem)]
    sm:pt-[calc(9rem+env(safe-area-inset-top))]

    lg:block
    lg:min-h-0
    lg:pt-0
  "
          >
            {/* Eyebrow */}
            <div
              className="
                flex min-w-0 justify-center lg:justify-start items-center gap-3
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
    mx-auto w-full max-w-[28ch]
    mt-4
    text-center
    text-[clamp(1.125rem,4.7vw,1.5rem)]
    font-extrabold
    [overflow-wrap:break-word]
    line-clamp-3

    sm:mt-6
    sm:text-[1.875rem]

    lg:mx-0
    lg:max-w-3xl
    lg:text-start
    lg:text-3xl
    lg:line-clamp-3

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

                  <span className="text-brand-primary">
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

          {hasDescription && (
            <HomeHeroDescription paragraphs={hero.paragraphs} isRTL={isRTL} />
          )}

          {/* CTA buttons */}
          <div
            className="
              mt-10 grid min-w-0 grid-cols-1 gap-2
              sm:mt-8 sm:grid-cols-2 sm:gap-3
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
