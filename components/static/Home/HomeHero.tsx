import Image, { getImageProps } from "next/image";

import {
  ArrowLeft,
  CircleDollarSign,
  LineChart,
  ShieldCheck,
  Sparkles,
  UserRound,
  type LucideIcon,
} from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   Hero image configuration

   We generate optimized Next.js srcsets for desktop and mobile, then allow
   <picture> to choose the correct asset BEFORE downloading the image.
============================================================================= */

const HERO_IMAGE_ALT =
  "نمایی از فضای تحلیلی DNH برای معماری ثروت و تصمیم‌های مالی راهبردی";

const {
  props: { srcSet: desktopHeroSrcSet },
} = getImageProps({
  src: "/assets/images/herod.png",
  alt: HERO_IMAGE_ALT,
  width: 1536,
  height: 1024,
  quality: 82,
  sizes: "100vw",
});

const {
  props: { srcSet: mobileHeroSrcSet },
} = getImageProps({
  src: "/assets/images/herom.png",
  alt: HERO_IMAGE_ALT,
  width: 1024,
  height: 1536,
  quality: 82,
  sizes: "(max-width: 1023px) 100vw, 1px",
});

/* =============================================================================
   Trust data
============================================================================= */

type TrustItem = {
  title: string;
  icon: LucideIcon;
};

const TRUST_ITEMS: TrustItem[] = [
  {
    title: "امن و محرمانه",
    icon: ShieldCheck,
  },
  {
    title: "تحلیل مبتنی بر داده",
    icon: LineChart,
  },
  {
    title: "مشاوره اختصاصی",
    icon: UserRound,
  },
];

/* =============================================================================
   Hero
============================================================================= */

export default function HeroSection() {
  return (
    <section
      id="home-hero"
      dir="rtl"
      aria-labelledby="home-hero-title"
      aria-describedby="home-hero-description"
      className="
        relative
        isolate

        min-h-[100svh]
        w-full

        overflow-hidden

        bg-surface-soft
      "
    >
      {/* =====================================================================
          RESPONSIVE HERO CANVAS

          Mobile:
          min-height: 760px
          content top / image bottom

          Desktop:
          height: 650px
          image left / content right
      ====================================================================== */}

      <div
        className="
          relative

          min-h-[100svh]

          overflow-hidden
        "
      >
        {/* =================================================================
            THEME BACKGROUND

            No large filter: blur().
            Radial gradients are considerably lighter to paint.
        ================================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            inset-0
          "
          style={{
            background: `
              radial-gradient(
                circle at 88% 4%,
                color-mix(
                  in srgb,
                  var(--dnh-primary) 12%,
                  transparent
                ) 0%,
                transparent 34%
              ),
              radial-gradient(
                circle at 8% 92%,
                color-mix(
                  in srgb,
                  var(--dnh-accent) 5%,
                  transparent
                ) 0%,
                transparent 34%
              ),
              linear-gradient(
                135deg,
                var(--dnh-bg-soft) 0%,
                var(--dnh-bg-page) 47%,
                color-mix(
                  in srgb,
                  var(--dnh-primary) 7%,
                  var(--dnh-bg-page)
                ) 100%
              )
            `,
          }}
        />

        {/* subtle top light */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            inset-x-[12%]
            top-0

            z-[1]

            h-px

            bg-gradient-to-r
            from-transparent
            via-brand-primary/20
            to-transparent
          "
        />

        {/* =================================================================
            RESPONSIVE HERO IMAGE

            One <img> in the DOM.
            Browser selects herom/herod using <picture>.
        ================================================================== */}

        <div
          className="
            absolute
            inset-0
            z-0
            h-full
            w-full
          "
        >
          <picture
            className="
              block
              h-full
              w-full
            "
          >
            {/* Desktop image */}

            <source
              media="(min-width: 1024px)"
              srcSet={desktopHeroSrcSet}
              sizes="100vw"
            />

            {/* Mobile image */}

            <source
              media="(max-width: 1023px)"
              srcSet={mobileHeroSrcSet}
              sizes="100vw"
            />

            <Image
              src="/assets/images/herom.png"
              alt={HERO_IMAGE_ALT}
              fill
              quality={82}
              sizes="100vw"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="
                object-cover
                object-center
              "
            />
          </picture>

          {/* ---------------------------------------------------------------
              MOBILE IMAGE FADE
          ---------------------------------------------------------------- */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none

              absolute
              inset-x-0
              top-0

              z-[2]

              h-[62%]

              lg:hidden
            "
            style={{
              background: `
                linear-gradient(
                  to bottom,
                  color-mix(
                    in srgb,
                    var(--dnh-bg-page) 94%,
                    transparent
                  ) 0%,
                  color-mix(
                    in srgb,
                    var(--dnh-bg-page) 76%,
                    transparent
                  ) 58%,
                  transparent 100%
                )
              `,
            }}
          />
        </div>

        {/* =================================================================
            DESKTOP IMAGE TRANSITION
        ================================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            inset-y-0
            left-[48%]

            z-[2]

            hidden
            w-[28%]

            lg:block
          "
          style={{
            background: `
              linear-gradient(
                to right,
                transparent 0%,
                color-mix(
                  in srgb,
                  var(--dnh-bg-page) 62%,
                  transparent
                ) 52%,
                var(--dnh-bg-page) 100%
              )
            `,
          }}
        />

        {/* light wash behind desktop text */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            inset-y-0
            right-0

            z-[2]

            hidden
            w-[58%]

            lg:block
          "
          style={{
            background: `
              radial-gradient(
                circle at 65% 48%,
                color-mix(
                  in srgb,
                  var(--dnh-bg-page) 98%,
                  transparent
                ) 0%,
                color-mix(
                  in srgb,
                  var(--dnh-bg-page) 86%,
                  transparent
                ) 42%,
                transparent 78%
              )
            `,
          }}
        />

        {/* =================================================================
            CONTENT

            One semantic content tree for both desktop + mobile.
        ================================================================== */}

        <div
          className="
            relative
            z-20

            px-6
            pb-12
            pt-[116px]

            text-center

            lg:z-10

            lg:ml-auto

            lg:flex
            lg:h-full
            lg:min-h-[100svh]
            lg:w-[48%]
            lg:items-center

            lg:px-10
            lg:py-0

            lg:text-right

            xl:px-16

            2xl:px-20
          "
        >
          <div
            className="
              mx-auto

              w-full
              max-w-[600px]

              lg:mx-0
            "
          >
            {/* ============================================================
                EYEBROW / BADGE
            ============================================================= */}

            <div
              className="
                mx-auto
                mb-5

                inline-flex
                items-center
                gap-[8px]

                rounded-full

                border
                border-line

                bg-page/75

                px-4
                py-2

                text-[11px]
                font-semibold

                text-ink-muted

                shadow-[0_8px_28px_color-mix(in_srgb,var(--dnh-primary)_6%,transparent)]

                lg:mx-0
                lg:mb-7
                lg:text-[12px]
              "
            >
              <Sparkles
                aria-hidden="true"
                strokeWidth={1.6}
                className="
                  h-[14px]
                  w-[14px]

                  text-brand-primary
                "
              />

              <span
                aria-hidden="true"
                className="
                  h-[6px]
                  w-[6px]

                  rounded-full

                  bg-brand-accent

                  shadow-[0_0_0_5px_color-mix(in_srgb,var(--dnh-accent)_10%,transparent)]
                "
              />

              <span>معماری هوشمند ثروت</span>
            </div>

            {/* ============================================================
                PRIMARY HEADING

                Only one H1 in the component.
            ============================================================= */}

            <h1
              id="home-hero-title"
              className="
                text-[37px]
                font-black

                leading-[1.5]

                tracking-[-1px]

                text-ink

                lg:text-[54px]
                lg:leading-[1.42]
                lg:tracking-[-1.8px]

                xl:text-[60px]
              "
            >
              تصمیم‌های مالی،
              <br />
              شفاف‌تر،
              <br className="lg:hidden" />
              <span className="text-brand-primary"> هوشمندتر</span>
            </h1>

            {/* ============================================================
                DESCRIPTION
            ============================================================= */}

            <p
              id="home-hero-description"
              className="
                mx-auto
                mt-4

                max-w-[370px]

                text-[13px]
                font-medium

                leading-[2]

                text-ink-muted

                lg:mx-0
                lg:mt-6

                lg:max-w-[560px]

                lg:text-[16px]
                lg:leading-[2.1]
              "
            >
              با معماری ثروت، هوشمندی پرتفوی و مشاوره مالی راهبردی DNH،
              تصمیم‌های مهم سرمایه را در مسیری شفاف، منسجم و مبتنی بر تحلیل پیش
              ببرید.
            </p>

            {/* ============================================================
                ACTIONS
            ============================================================= */}

            <div
              className="
                mt-6

                flex
                flex-col
                gap-3

                lg:mt-8

                lg:flex-row
                lg:items-center
              "
            >
              {/* Primary CTA */}

              <ActionButton
                href="/request-strategic-consultation"
                variant="primary"
                size="lg"
                icon={ArrowLeft} 
                iconPosition="end"
                className="w-full lg:w-auto lg:min-w-[220px]"
              >
                درخواست مشاوره راهبردی
              </ActionButton>

              {/* Secondary CTA */}

              <ActionButton
                href="/financial-decision-assessment"
                variant="secondary"
                size="lg"
                icon={CircleDollarSign}
                iconPosition="start"
                className="w-full lg:w-auto lg:min-w-[185px]"
              >
                ارزیابی تصمیم مالی
              </ActionButton>
            </div>

            {/* ============================================================
                TRUST SIGNALS

                Desktop only, exactly like the original visual layout.
            ============================================================= */}

            <ul
              aria-label="ویژگی‌های خدمات DNH"
              className="
                mt-10

                hidden
                max-w-[570px]

                items-center
                justify-between

                border-t
                border-line

                pt-6

                lg:flex
              "
            >
              {TRUST_ITEMS.map(({ title, icon: Icon }) => (
                <li key={title}>
                  <TrustItem title={title} icon={Icon} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   Trust Item
============================================================================= */

function TrustItem({ icon: Icon, title }: { icon: LucideIcon; title: string }) {
  return (
    <div
      className="
        flex
        items-center
        gap-[8px]

        whitespace-nowrap

        text-[12px]
        font-semibold

        text-ink-muted
      "
    >
      <span
        aria-hidden="true"
        className="
          flex
          h-[30px]
          w-[30px]
          shrink-0
          items-center
          justify-center

          rounded-[10px]

          bg-surface-soft

          text-brand-primary
        "
      >
        <Icon
          strokeWidth={1.65}
          className="
            h-[15px]
            w-[15px]
          "
        />
      </span>

      <span>{title}</span>
    </div>
  );
}
