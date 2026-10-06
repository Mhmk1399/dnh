import { getImageProps } from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   IMAGES
   مسیر تصاویر را خودت اینجا قرار بده
============================================================================= */

const HERO_DESKTOP = "/assets/images/private-wealth-strategyhero-desktop.png";
const HERO_MOBILE = "/assets/images/private-wealth-strategyhero-mobile.png";

/* =============================================================================
   SERVICES
============================================================================= */

const SERVICES = [
  {
    index: "01",
    shortTitle: "استراتژی ثروت خصوصی",
    href: "/fa/services/private-wealth-strategy",
    active: true,
  },
  {
    index: "02",
    shortTitle: "هوشمندی پرتفوی",
    href: "/fa/services/portfolio-intelligence",
  },
  {
    index: "03",
    shortTitle: "مشاوره مالی راهبردی",
    href: "/fa/services/strategic-financial-advisory",
  },
  {
    index: "04",
    shortTitle: "مشاوره اقتصاد و بازار",
    href: "/fa/services/macro-market-advisory",
  },
  {
    index: "05",
    shortTitle: "مدیریت ریسک و حفاظت از ثروت",
    href: "/fa/services/risk-management-wealth-protection",
  },
  {
    index: "06",
    shortTitle: "نشست‌های مدیران",
    href: "/fa/services/executive-briefings",
  },
] as const;

/* =============================================================================
   HERO
============================================================================= */

export function PrivateWealthStrategyHero() {
  return (
    <section
      id="private-wealth-strategy-hero"
      dir="rtl"
      aria-labelledby="private-wealth-strategy-title"
      className="
        private-wealth-hero
        relative
        isolate
        overflow-hidden
        bg-[#073949]
        text-white
      "
      style={{
        height: "100dvh",
        minHeight: "680px",
      }}
    >
      {/* =========================================================
          BACKGROUND
      ========================================================== */}

      <HeroBackground />

      {/* Desktop overlay */}
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
              rgba(1,29,39,0.03) 0%,
              rgba(2,38,50,0.08) 30%,
              rgba(3,47,62,0.40) 52%,
              rgba(2,42,56,0.86) 72%,
              rgba(2,37,49,0.97) 100%
            )
          `,
        }}
      />

      {/* Mobile overlay */}
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
              rgba(2,38,50,0.05) 0%,
              rgba(2,40,53,0.10) 25%,
              rgba(2,43,56,0.48) 46%,
              rgba(3,47,61,0.88) 62%,
              rgba(3,48,62,0.98) 100%
            )
          `,
        }}
      />

      {/* Right-side readability */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-y-0
          right-0
          z-[1]
          hidden
          w-[48%]
          lg:block
        "
        style={{
          background: `
            linear-gradient(
              90deg,
              transparent 0%,
              rgba(2,40,52,.18) 22%,
              rgba(2,38,50,.72) 100%
            )
          `,
        }}
      />

      {/* Bottom depth */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-[1]
          h-[28%]
          bg-gradient-to-t
          from-[#032f3f]/80
          via-[#032f3f]/30
          to-transparent
        "
      />

      {/* =========================================================
          SUBTLE STRUCTURAL DETAILS
      ========================================================== */}

      <div
        aria-hidden="true"
        className="
          private-wealth-grid
          pointer-events-none
          absolute
          inset-0
          z-[2]
          opacity-[0.10]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(255,255,255,.09) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(255,255,255,.07) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "96px 96px",
          maskImage:
            "linear-gradient(to right, black 0%, rgba(0,0,0,.62) 52%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, black 0%, rgba(0,0,0,.62) 52%, transparent 100%)",
        }}
      />

      {/* top thin line */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[42%]
          top-0
          z-[3]
          hidden
          h-px
          w-[34%]
          bg-white/15
          lg:block
        "
      />

      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[42%]
          top-0
          z-[3]
          hidden
          h-[5px]
          w-[3px]
          bg-brand-accent
          lg:block
        "
      />

      {/* =========================================================
          MAIN CONTAINER
      ========================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          h-full
          w-full
          max-w-[1600px]
          flex-col
          px-5
          pb-6
          pt-[118px]

          sm:px-8
          sm:pb-8
          sm:pt-[128px]

          lg:px-12
          lg:pb-7
          lg:pt-[108px]

          xl:px-16

          2xl:px-20
        "
      >
        {/* =======================================================
            MAIN CONTENT
        ======================================================== */}

        <div
          className="
            flex
            min-h-0
            flex-1
            items-end
            pb-10

            sm:pb-12

            lg:items-center
            lg:pb-12
          "
        >
          <div
            className="
              private-wealth-content
              mr-0
              ml-auto
              w-full
              max-w-[650px]
              text-right

              lg:max-w-[610px]

              xl:max-w-[670px]
            "
          >
            {/* ===============================================
                EYEBROW
            ================================================ */}

            <div
              className="
                private-wealth-enter
                private-wealth-delay-1

                mb-4
                flex
                items-center
                gap-3

                sm:mb-5
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
                  font-bold
                  text-white/70

                  sm:text-[11px]
                "
              >
                خدمات DNH
              </span>
            </div>

            {/* service counter */}

            <div
              className="
                private-wealth-enter
                private-wealth-delay-2

                mb-5
                flex
                items-center
                gap-4

                text-[9px]
                font-medium
                text-white/45
              "
            >
              <span
                dir="ltr"
                className="
                  tracking-[0.12em]
                  text-white/72
                "
              >
                01 / 06
              </span>

              <span className="h-px w-8 bg-white/20" />

              <ArrowLeft
                aria-hidden="true"
                className="h-3 w-3"
                strokeWidth={1.4}
              />
            </div>

            {/* ===============================================
                H1
            ================================================ */}

            <h1
              id="private-wealth-strategy-title"
              className="
                private-wealth-enter
                private-wealth-delay-3

                max-w-[620px]

                text-[clamp(2.55rem,11vw,4.1rem)]
                font-black
                leading-[1.24]
                tracking-[-0.045em]

                text-white

                sm:text-[clamp(3rem,8vw,4.4rem)]

                lg:text-[clamp(3.25rem,4.3vw,4.7rem)]

                xl:text-[5rem]
              "
            >
              استراتژی
              <br />
              <span className="text-brand-accent">ثروت خصوصی</span>
            </h1>

            {/* ===============================================
                TAGLINE
            ================================================ */}

            <p
              className="
                private-wealth-enter
                private-wealth-delay-4

                mt-5

                text-[14px]
                font-bold
                leading-[2]

                text-white/90

                sm:text-[15px]

                lg:mt-6
                lg:text-[16px]
              "
            >
              ساختاردهی و برنامه‌ریزی بلندمدت ثروت.
            </p>

            {/* ===============================================
                DESCRIPTION
            ================================================ */}

            <p
              className="
                private-wealth-enter
                private-wealth-delay-5

                mt-5
                max-w-[570px]

                text-[12px]
                font-medium
                leading-[2.15]

                text-white/62

                sm:text-[13px]

                lg:text-[14px]
              "
            >
              برای تصمیم‌های مهم مالی، داشتن یک مسیر و ساختار منسجم می‌تواند دید
              روشن‌تری در امتداد افق بلندمدت ایجاد کند.
            </p>

            {/* ===============================================
                ACTIONS
            ================================================ */}

            <div
              className="
                private-wealth-enter
                private-wealth-delay-6

                mt-7
                flex
                w-full
                flex-col
                gap-3

                sm:flex-row
                sm:flex-wrap
                sm:items-center

                lg:mt-8
              "
            >
              <ActionButton
                href="#who-it-is-for"
                variant="assessment"
                size="md"
                icon={ArrowLeft}
                className="
                  w-full

                  bg-brand-accent
                  text-white

                  shadow-[0_16px_38px_color-mix(in_srgb,var(--dnh-accent)_24%,transparent)]

                  hover:bg-[#ec7d01]

                  sm:w-auto
                  sm:min-w-[235px]
                "
              >
                آشنایی با این خدمت
              </ActionButton>

              <ActionButton
                href="/fa/contact"
                variant="secondary"
                size="md"
                icon={ArrowLeft}
                className="
                  w-full

                  border-white/35
                  bg-white/[0.035]

                  text-white

                  shadow-none
                  backdrop-blur-[6px]

                  hover:border-white/60
                  hover:bg-white/[0.08]
                  hover:text-white

                  sm:w-auto
                  sm:min-w-[210px]
                "
              >
                گفت‌وگو با تیم DNH
              </ActionButton>
            </div>
          </div>
        </div>

        {/* =======================================================
            BOTTOM AREA
        ======================================================== */}

        <div
          className="
            private-wealth-enter
            private-wealth-delay-7

            relative
            mt-auto

            hidden

            lg:grid
            lg:grid-cols-[0.72fr_1.28fr]
            lg:items-end
            lg:gap-12

            xl:grid-cols-[0.75fr_1.25fr]
          "
        >
          {/* ===============================================
              IMAGE MICRO COPY
          ================================================ */}

          <div
            dir="rtl"
            className="
              justify-self-start
              pb-2
              text-right
            "
          >
            <div className="mb-4 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="
                  flex
                  h-[11px]
                  w-[11px]
                  items-center
                  justify-center

                  bg-brand-accent
                "
              >
                <span className="h-[3px] w-[3px] bg-white" />
              </span>

              <span className="h-px w-32 bg-brand-accent/65" />
            </div>

            <p
              className="
                max-w-[180px]
                text-[10px]
                font-medium
                leading-[1.9]
                text-white/62
              "
            >
              نگاهی فراتر از امروز
              <br />
              به ساختار فردا
            </p>
          </div>

          {/* ===============================================
              SERVICES INDEX
          ================================================ */}

          <nav
            aria-label="خدمات DNH"
            className="
              grid
              grid-cols-6
              items-start
              gap-4
            "
          >
            {SERVICES.map((service) => (
              <ServiceIndexItem key={service.index} {...service} />
            ))}
          </nav>
        </div>

        {/* =======================================================
            MOBILE SERVICE INDEX
        ======================================================== */}

        <div
          className="
            private-wealth-enter
            private-wealth-delay-7

            mt-auto

            border-t
            border-white/12

            pt-4

            lg:hidden
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              gap-4
            "
          >
            <div>
              <span
                dir="ltr"
                className="
                  block

                  text-[10px]
                  font-black
                  tracking-[0.12em]

                  text-brand-accent
                "
              >
                01 / 06
              </span>

              <span
                className="
                  mt-1
                  block

                  text-[10px]
                  font-bold

                  text-white/86
                "
              >
                استراتژی ثروت خصوصی
              </span>
            </div>

            <div
              aria-hidden="true"
              className="
                flex
                items-center
                gap-[10px]
              "
            >
              {SERVICES.map((service) => (
                <span
                  key={service.index}
                  className={`
                    block
                    h-[7px]
                    w-[7px]

                    border

                    ${
                      "active" in service && service.active
                        ? `
                          border-brand-accent
                          bg-brand-accent
                        `
                        : `
                          border-white/35
                          bg-white/15
                        `
                    }
                  `}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          MOTION
      ========================================================== */}

      <HeroMotionStyles />
    </section>
  );
}

/* =============================================================================
   SERVICE INDEX
============================================================================= */

function ServiceIndexItem({
  index,
  shortTitle,
  href,
  active = false,
}: {
  index: string;
  shortTitle: string;
  href: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className="
        group/service
        relative
        block
        min-w-0

        pt-5

        outline-none

        transition-transform
        duration-300

        hover:-translate-y-[2px]

        focus-visible:ring-2
        focus-visible:ring-focus/50
      "
    >
      <span
        aria-hidden="true"
        className={`
          absolute
          right-0
          top-0

          h-px

          transition-[width,background-color]
          duration-300

          ${
            active
              ? "w-full bg-brand-accent"
              : "w-7 bg-white/20 group-hover/service:w-full group-hover/service:bg-brand-accent/65"
          }
        `}
      />

      <span
        dir="ltr"
        className={`
          block

          text-[9px]
          font-medium

          ${active ? "text-brand-accent" : "text-white/42"}
        `}
      >
        {index}
      </span>

      <span
        className={`
          mt-2
          block

          text-[9px]
          font-medium
          leading-[1.7]

          transition-colors
          duration-300

          group-hover/service:text-white

          ${active ? "font-black text-white" : "text-white/48"}
        `}
      >
        {shortTitle}
      </span>
    </Link>
  );
}

/* =============================================================================
   BACKGROUND IMAGE
============================================================================= */

function HeroBackground() {
  /*
   * تا وقتی مسیر عکس‌ها را وارد نکرده‌ای،
   * این fallback نمایش داده می‌شود.
   */
  if (!HERO_DESKTOP || !HERO_MOBILE) {
    return (
      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          z-0
        "
        style={{
          background: `
            linear-gradient(
              105deg,
              #0b566a 0%,
              #07495c 34%,
              #043b4d 65%,
              #022d3b 100%
            )
          `,
        }}
      />
    );
  }

  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    src: HERO_DESKTOP,
    alt: "",
    width: 2400,
    height: 1350,
    quality: 90,
    sizes: "100vw",
  });

  const { props: mobileProps } = getImageProps({
    src: HERO_MOBILE,
    alt: "",
    width: 1080,
    height: 1920,
    quality: 88,
    sizes: "100vw",
    loading: "eager",
    fetchPriority: "high",
  });

  return (
    <picture
      aria-hidden="true"
      className="
        private-wealth-background
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
        alt=""
        className="
          h-full
          w-full

          object-cover
          object-top

          lg:object-center
        "
      />
    </picture>
  );
}

/* =============================================================================
   ANIMATION
============================================================================= */

function HeroMotionStyles() {
  return (
    <style>{`
      @keyframes privateWealthImageEnter {
        from {
          opacity: 0;
          transform: scale(1.025);
        }

        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      @keyframes privateWealthEnter {
        from {
          opacity: 0;
          transform: translate3d(0, 12px, 0);
        }

        to {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
      }

      @keyframes privateWealthGridEnter {
        from {
          opacity: 0;
        }

        to {
          opacity: .10;
        }
      }

      .private-wealth-background {
        opacity: 0;

        animation:
          privateWealthImageEnter
          950ms
          cubic-bezier(.22, 1, .36, 1)
          forwards;
      }

      .private-wealth-enter {
        opacity: 0;

        animation:
          privateWealthEnter
          620ms
          cubic-bezier(.22, 1, .36, 1)
          forwards;
      }

      .private-wealth-delay-1 {
        animation-delay: 100ms;
      }

      .private-wealth-delay-2 {
        animation-delay: 150ms;
      }

      .private-wealth-delay-3 {
        animation-delay: 210ms;
      }

      .private-wealth-delay-4 {
        animation-delay: 290ms;
      }

      .private-wealth-delay-5 {
        animation-delay: 360ms;
      }

      .private-wealth-delay-6 {
        animation-delay: 440ms;
      }

      .private-wealth-delay-7 {
        animation-delay: 540ms;
      }

      .private-wealth-grid {
        opacity: 0;

        animation:
          privateWealthGridEnter
          900ms
          400ms
          ease-out
          forwards;
      }

      /* ================================================
         Reduced motion
      ================================================= */

      @media (prefers-reduced-motion: reduce) {
        .private-wealth-background,
        .private-wealth-enter,
        .private-wealth-grid {
          opacity: 1 !important;
          transform: none !important;

          animation: none !important;
          transition: none !important;
        }
      }

      /* ================================================
         Short desktop screens
      ================================================= */

      @media (min-width: 1024px) and (max-height: 760px) {
        .private-wealth-hero {
          min-height: 640px !important;
        }
      }
    `}</style>
  );
}
