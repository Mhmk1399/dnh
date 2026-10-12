import { getImageProps } from "next/image";
import { ArrowLeft } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

const ABOUT_HERO_DESKTOP = "/assets/images/about-hero-desktop.png";

const ABOUT_HERO_MOBILE = "/assets/images/about-hero-mobile.png";

export function AboutHero() {
  return (
    <section
      id="about-hero"
      dir="rtl"
      aria-labelledby="about-hero-title"
      className="
        relative
        isolate
        overflow-hidden
        bg-brand-secondary
      "
      style={{
        minHeight: "100dvh",
      }}
    >
      {/* Background از بالاترین نقطه صفحه شروع می‌شود */}
      <AboutHeroBackground />

      {/* ============================================================
          Desktop overlay
      ============================================================ */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          z-[1]
          hidden
          lg:block
        "
        style={{
          background: `
            linear-gradient(
              90deg,
              rgba(2, 20, 29, 0.04) 0%,
              rgba(3, 28, 40, 0.08) 34%,
              rgba(3, 34, 48, 0.54) 54%,
              rgba(2, 26, 38, 0.88) 100%
            )
          `,
        }}
      />

      {/* ============================================================
          Mobile overlay
      ============================================================ */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          z-[1]
          lg:hidden
        "
        style={{
          background: `
            linear-gradient(
              180deg,
              rgba(2, 24, 34, 0.04) 0%,
              rgba(2, 26, 38, 0.08) 35%,
              rgba(2, 28, 40, 0.66) 58%,
              rgba(2, 24, 35, 0.97) 100%
            )
          `,
        }}
      />

      {/* کمی عمق پایین */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-x-0
          bottom-0
          z-[1]
          h-[25%]
          bg-gradient-to-t
          from-[#021923]/55
          to-transparent
        "
      />

      {/* ============================================================
          Content
      ============================================================ */}
      <div
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-[1536px]

          items-end

          px-5
          pb-10
          pt-[120px]

          sm:px-8
          sm:pb-12
          sm:pt-[130px]

          lg:min-h-[100dvh]
          lg:items-center
          lg:px-12
          lg:pb-12
          lg:pt-[120px]

          xl:px-16
          2xl:px-20
        "
      >
        <div
          className="
            mr-0
            ml-auto
            w-full
            max-w-[700px]
            text-right

            lg:max-w-[660px]
            xl:max-w-[720px]
          "
        >
          {/* Eyebrow */}
          <div
            className="
              mb-5
              flex
              items-center
              gap-3

              lg:mb-6
            "
          >
            <span
              aria-hidden="true"
              className="
                h-px
                w-10
                bg-brand-accent
              "
            />

            <span
              className="
                text-[10px]
                font-black
                tracking-[0.04em]
                text-white/78

                sm:text-[11px]
              "
            >
              درباره DNH
            </span>
          </div>

          {/* H1 */}
          <h1
            id="about-hero-title"
            className="
              max-w-[720px]

              text-[34px]
              font-black
              leading-[1.55]
              tracking-[-0.04em]

              text-white

              sm:text-[42px]

              lg:text-[48px]
              lg:leading-[1.5]

              xl:text-[54px]
            "
          >
            DNH از جایی آغاز می‌شود
            <br />
            که تصمیم مالی فقط
            <span className="text-brand-accent"> یک انتخاب </span>
            نیست.
          </h1>

          {/* Description */}
          <p
            className="
              mt-6
              max-w-[650px]

              text-[13px]
              font-medium
              leading-[2.15]

              text-white/72

              sm:text-[14px]

              lg:text-[15px]
              lg:leading-[2.2]
            "
          >
            DNH با تمرکز بر معماری ثروت و تصمیم‌گیری مالی راهبردی شکل گرفته است؛
            رویکردی که تلاش می‌کند داده، ریسک، سناریو و ساختار مالی را در یک
            تصویر منسجم‌تر کنار هم قرار دهد.
          </p>

          {/* Founder */}
          <div
            className="
              mt-7
              border-r-2
              border-brand-accent
              pr-4

              sm:pr-5
              lg:mt-8
            "
          >
            <h2
              className="
                text-[16px]
                font-black
                text-white

                sm:text-[18px]
              "
            >
              دکتر نسیم محمدحسنی
            </h2>

            <p
              className="
                mt-1.5
                text-[11px]
                font-medium
                leading-6
                text-white/56

                sm:text-[12px]
              "
            >
              بنیان‌گذار DNH
            </p>
          </div>

          {/* Statement */}
          <p
            className="
              mt-7
              max-w-[640px]

              text-[20px]
              font-black
              leading-[1.9]
              tracking-[-0.025em]

              text-white

              sm:text-[22px]

              lg:mt-8
              lg:text-[24px]
            "
          >
            ثروت، مجموعه‌ای از تصمیم‌های جدا از هم نیست.
          </p>

          {/* CTA */}
          <div className="mt-7 lg:mt-8">
            <ActionButton
              href="#about-story"
              variant="assessment"
              size="md"
              icon={ArrowLeft}
              className="
                w-full

                border-[color-mix(in_srgb,var(--dnh-text-on-brand)_30%,transparent)]
 

                

                shadow-none

                backdrop-blur-[11px]

                hover:border-brand-accent
                hover:bg-[color-mix(in_srgb,var(--dnh-text-on-brand)_10%,transparent)]
                

                sm:w-auto
                sm:min-w-[200px]
              "
            >
              شناخت بیشتر DNH
            </ActionButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   Responsive background
============================================================================= */

function AboutHeroBackground() {
  const commonProps = {
    alt: "دکتر نسیم محمدحسنی، بنیان‌گذار DNH",
    sizes: "100vw",
  };

  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...commonProps,
    src: ABOUT_HERO_DESKTOP,
    width: 2400,
    height: 1350,
    quality: 90,
  });

  const { props: mobileProps } = getImageProps({
    ...commonProps,
    src: ABOUT_HERO_MOBILE,
    width: 1080,
    height: 1920,
    quality: 88,
    loading: "eager",
    fetchPriority: "high",
  });

  return (
    <picture
      className="
        absolute
        inset-0
        z-0
        block
        h-full
        w-full
      "
    >
      <source
        media="(min-width: 1024px)"
        srcSet={desktopSrcSet}
        sizes="100vw"
      />

      <img
        {...mobileProps}
        className="
          h-full
          w-full
          object-cover

          object-[38%_center]

          sm:object-[34%_center]

          lg:object-center
        "
      />
    </picture>
  );
}
