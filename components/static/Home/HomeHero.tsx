import { getImageProps } from "next/image";
import { ArrowLeft } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   Assets
============================================================================= */

const HERO_DESKTOP = "/assets/images/dnh-hero-desktop.png";

const HERO_MOBILE = "/assets/images/dnh-hero-mobile.png";

/* =============================================================================
   Routes
   مسیرهای سایت فعلاً فارسی و بدون پیشوند زبانی هستند.
============================================================================= */

const ASSESSMENT_HREF = "/financial-decision-assessment";

const WEALTH_ARCHITECTURE_HREF = "/dnh/wealth-architecture";

/* =============================================================================
   Hero
============================================================================= */

export function HomeHero() {
  return (
    <section
      id="home"
      dir="rtl"
      aria-labelledby="home-hero-title"
      className="
        home-hero
        relative
        isolate
        overflow-hidden
        bg-brand-secondary
        text-right
      "
      style={{
        height: "100dvh",
        minHeight: "680px",
      }}
    >
      {/* =========================================================
          Image
      ========================================================== */}

      <HeroBackground />

      {/* =========================================================
          Desktop readability overlay
      ========================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
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
              color-mix(
                in srgb,
                var(--dnh-secondary) 0%,
                transparent
              ) 0%,

              color-mix(
                in srgb,
                var(--dnh-secondary) 5%,
                transparent
              ) 32%,

              color-mix(
                in srgb,
                var(--dnh-secondary) 30%,
                transparent
              ) 48%,

              color-mix(
                in srgb,
                var(--dnh-secondary) 68%,
                transparent
              ) 69%,

              color-mix(
                in srgb,
                var(--dnh-secondary) 90%,
                transparent
              ) 100%
            )
          `,
        }}
      />

      {/* =========================================================
          Mobile readability overlay
      ========================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
          lg:hidden
        "
        style={{
          background: `
            linear-gradient(
              180deg,

              color-mix(
                in srgb,
                var(--dnh-secondary) 3%,
                transparent
              ) 0%,

              color-mix(
                in srgb,
                var(--dnh-secondary) 8%,
                transparent
              ) 34%,

              color-mix(
                in srgb,
                var(--dnh-secondary) 44%,
                transparent
              ) 55%,

              color-mix(
                in srgb,
                var(--dnh-secondary) 82%,
                transparent
              ) 72%,

              color-mix(
                in srgb,
                var(--dnh-secondary) 97%,
                transparent
              ) 100%
            )
          `,
        }}
      />

      {/* =========================================================
          Bottom depth
      ========================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-[1]

          h-[34%]

          bg-gradient-to-t
          from-brand-secondary/70
          via-brand-secondary/18
          to-transparent
        "
      />

      {/* =========================================================
          Very subtle atmosphere
      ========================================================== */}

      {/* =========================================================
          Content shell
      ========================================================== */}

      <div
        className="
          relative
          z-10

          dnh-site-shell
          mx-auto

          flex
          h-full
          min-h-0
          w-full

          items-end

          pb-8
          pt-[118px]

          sm:pb-10
          sm:pt-[128px]

          lg:items-center
          lg:pb-0
          lg:pt-[106px]


        "
      >
        <div
          className="
            mr-0
            ml-auto

            w-full

            sm:max-w-[620px]

            lg:max-w-[680px]

            xl:max-w-[730px]
          "
        >
          {/* =====================================================
              Eyebrow
          ====================================================== */}

          <div
            className="
              home-hero-reveal
              home-hero-reveal-1

              mb-4
              flex
              items-center
              gap-3

              sm:mb-5

              lg:mb-6
            "
          >
            <span
              aria-hidden="true"
              className="
                h-px
                w-9
                shrink-0

                bg-brand-accent

                sm:w-11
              "
            />

            <p
              className="
                text-[10px]
                font-bold
                leading-none

                text-white/88

                sm:text-[11px]
              "
            >
              DNH؛ معماری ثروت و تصمیم‌سازی مالی
            </p>
          </div>

          {/* =====================================================
              Heading
          ====================================================== */}

          <h1
            id="home-hero-title"
            className="
              home-hero-reveal
              home-hero-reveal-2

              max-w-[730px]

              text-[clamp(2rem,8vw,3rem)]
              font-black
              leading-[1.48]
              tracking-[-0.045em]

              text-white

              sm:text-[clamp(2.45rem,6.8vw,3.5rem)]

              lg:text-[clamp(2.8rem,3.7vw,3.9rem)]
              lg:leading-[1.42]

              xl:text-[4rem]
            "
          >
            تصمیم‌های مالی مهم،
            <br />
            به یک <span className="text-brand-accent">تصویر کامل‌تر</span> نیاز
            دارند.
          </h1>

          {/* =====================================================
              Positioning
          ====================================================== */}

          <p
            className="
              home-hero-reveal
              home-hero-reveal-3

              mt-5
              max-w-[610px]

              text-[13px]
              font-medium
              leading-[2.05]

              text-white/74

              sm:text-[14px]

              lg:mt-6
              lg:text-[15px]
              lg:leading-[2.1]
            "
          >
            DNH یک سیستم حرفه‌ای برای معماری ثروت و تصمیم‌سازی مالی است؛ برای
            دیدن شفاف‌تر ساختار مالی، ریسک‌ها، سناریوها و مسیرهای تصمیم‌گیری.
          </p>

          {/* =====================================================
              Actions
          ====================================================== */}

          <div
            className="
              home-hero-reveal
              home-hero-reveal-4

              mt-7

              flex
              w-full
              flex-col
              gap-3

              sm:w-auto
              sm:flex-row
              sm:flex-wrap
              sm:items-center

              lg:mt-8
            "
          >
            <ActionButton
              href={ASSESSMENT_HREF}
              variant="assessment"
              size="md"
              icon={ArrowLeft}
              className="
                w-full
 border-white/30 border
                sm:w-auto
                sm:min-w-[250px]
              "
            >
              ارزیابی اولیه تصمیم مالی
            </ActionButton>

            <ActionButton
              href={WEALTH_ARCHITECTURE_HREF}
              variant="secondary"
              size="md"
              icon={ArrowLeft}
              className="
                w-full

                border-white/30
                bg-white/[0.055]

                text-white

                shadow-none
                backdrop-blur-[8px]

                hover:border-white/55
                hover:bg-white/[0.10]
                hover:text-white

                sm:w-auto
                sm:min-w-[215px]
              "
            >
              آشنایی با معماری ثروت
            </ActionButton>
          </div>

          {/* =====================================================
              Authority line
          ====================================================== */}

          <div
            className="
              home-hero-reveal
              home-hero-reveal-5

              mt-7

              hidden

              border-t
              border-white/15

              pt-5

              sm:block

              lg:mt-9
              lg:pt-5
            "
          >
            <p
              className="
                text-[10px]
                font-medium
                leading-[1.9]

                text-white/64

                lg:text-[11px]
              "
            >
              <span className="font-bold text-white/88">
                دکتر نسیم محمدحسنی
              </span>
              <span aria-hidden="true" className="mx-2 text-brand-accent">
                —
              </span>
              معمار ثروت خصوصی، مشاور مالی راهبردی و بنیان‌گذار چارچوب DNH
            </p>
          </div>
        </div>
      </div>

      <HeroMotionStyles />
    </section>
  );
}

/* =============================================================================
   Background image
============================================================================= */

function HeroBackground() {
  const commonProps = {
    sizes: "100vw",
  };

  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...commonProps,

    src: HERO_DESKTOP,

    alt: "",

    width: 2400,
    height: 1350,

    quality: 90,
  });

  const { props: mobileProps } = getImageProps({
    ...commonProps,

    src: HERO_MOBILE,

    alt: "دکتر نسیم محمدحسنی، بنیان‌گذار DNH و مشاور مالی راهبردی",

    width: 1080,
    height: 1920,

    quality: 88,

    loading: "eager",
    fetchPriority: "high",
  });

  return (
    <picture
      className="
        home-hero-background

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
        alt="دکتر نسیم محمدحسنی، بنیان‌گذار DNH و مشاور مالی راهبردی"
        className="
          h-full
          w-full

          object-cover
          object-center

          lg:object-center
        "
      />
    </picture>
  );
}

/* =============================================================================
   Motion
============================================================================= */

function HeroMotionStyles() {
  return (
    <style>{`
      /* ==========================================================
         Background
      =========================================================== */

      @keyframes dnhHeroBackgroundEnter {
        from {
          opacity: 0;
          transform: scale(1.018);
        }

        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      .home-hero-background {
        opacity: 0;

        transform-origin: center;

        animation:
          dnhHeroBackgroundEnter
          1100ms
          cubic-bezier(.22, 1, .36, 1)
          forwards;
      }

      /* ==========================================================
         Content
      =========================================================== */

      @keyframes dnhHeroContentEnter {
        from {
          opacity: 0;
          transform: translate3d(0, 12px, 0);
        }

        to {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
      }

      .home-hero-reveal {
        opacity: 0;

        animation:
          dnhHeroContentEnter
          640ms
          cubic-bezier(.22, 1, .36, 1)
          forwards;
      }

      .home-hero-reveal-1 {
        animation-delay: 120ms;
      }

      .home-hero-reveal-2 {
        animation-delay: 200ms;
      }

      .home-hero-reveal-3 {
        animation-delay: 300ms;
      }

      .home-hero-reveal-4 {
        animation-delay: 400ms;
      }

      .home-hero-reveal-5 {
        animation-delay: 500ms;
      }

      /* ==========================================================
         Atmosphere
      =========================================================== */

      @keyframes dnhHeroAtmosphereEnter {
        from {
          opacity: 0;
          transform: translate3d(10px, 0, 0);
        }

        to {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
      }

      .home-hero-atmosphere {
        opacity: 0;

        animation:
          dnhHeroAtmosphereEnter
          800ms
          520ms
          cubic-bezier(.22, 1, .36, 1)
          forwards;
      }

      /* ==========================================================
         Reduced motion
      =========================================================== */

      @media (prefers-reduced-motion: reduce) {
        .home-hero-background,
        .home-hero-reveal,
        .home-hero-atmosphere {
          opacity: 1 !important;

          transform: none !important;

          animation: none !important;
          transition: none !important;
        }
      }

      /* ==========================================================
         Short desktop displays
      =========================================================== */

      @media (min-width: 1024px) and (max-height: 740px) {
        .home-hero {
          min-height: 640px !important;
        }

        .home-hero-reveal-5 {
          display: none;
        }
      }
    `}</style>
  );
}
