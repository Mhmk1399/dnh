import { getImageProps } from "next/image";
import Link from "next/link";

import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Coins,
  Compass,
  Network,
  Route,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   Types
============================================================================= */

type ExpertiseItem = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  tone?: "primary" | "accent";
};

type PrincipleItem = {
  title: string;
  icon: LucideIcon;
};

/* =============================================================================
   Content
============================================================================= */

const EXPERTISE_ITEMS: ExpertiseItem[] = [
  {
    title: "معماری ثروت",
    description: "خلق ساختارهای پایدار برای رشد، حفاظت و انسجام بهتر ثروت.",
    href: "/dnh/wealth-architecture",
    icon: Coins,
    tone: "primary",
  },
  {
    title: "تصمیم‌سازی راهبردی",
    description: "طراحی مسیرهای مالی متناسب با اهداف، شرایط و افق تصمیم.",
    href: "/dnh/framework",
    icon: Route,
    tone: "accent",
  },
  {
    title: "تحلیل و هوشمندی",
    description: "تبدیل داده و تحلیل به بینش‌های کاربردی برای تصمیم‌های بهتر.",
    href: "/dnh/intelligence-desk",
    icon: BarChart3,
    tone: "primary",
  },
];

const PRINCIPLES: PrincipleItem[] = [
  {
    title: "نگاه مستقل",
    icon: Compass,
  },
  {
    title: "رویکرد ساختارمحور",
    icon: Network,
  },
  {
    title: "اعتماد و دقت",
    icon: ShieldCheck,
  },
];

/* =============================================================================
   Responsive Portrait
============================================================================= */

const { props: desktopPortrait } = getImageProps({
  src: "/assets/images/dr-nasim-home-desktop.png",
  alt: "",
  width: 1200,
  height: 1400,
  quality: 90,
  sizes: "(min-width: 1536px) 650px, (min-width: 1024px) 48vw, 1px",
  loading: "lazy",
});

const { props: mobilePortrait } = getImageProps({
  src: "/assets/images/dr-nasim-home-mobile.png",
  alt: "",
  width: 900,
  height: 1100,
  quality: 88,
  sizes: "(max-width: 1023px) calc(100vw - 40px), 1px",
  loading: "lazy",
});

/* =============================================================================
   Helpers
============================================================================= */

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* =============================================================================
   Section
============================================================================= */

export default function AboutDrNasimSection() {
  return (
    <section
      id="about-dr-nasim"
      dir="rtl"
      aria-labelledby="about-dr-nasim-title"
      aria-describedby="about-dr-nasim-description"
      className="
        relative
        isolate

        mx-auto
        mt-12

        w-[calc(100%-20px)]
        max-w-[1520px]

        overflow-hidden

        rounded-[30px]

        border
        border-line

        bg-page

        shadow-[0_24px_80px_color-mix(in_srgb,var(--dnh-primary)_8%,transparent)]

        [content-visibility:auto]
        [contain-intrinsic-size:800px]

        sm:mt-16
        sm:w-[calc(100%-32px)]
        sm:rounded-[34px]

        lg:mt-20
        lg:w-[calc(100%-48px)]
        lg:rounded-[40px]
      "
    >
      {/* ===================================================================
          BACKGROUND
      ==================================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[-10]
        "
        style={{
          background: `
            radial-gradient(
              circle at 15% 25%,
              color-mix(
                in srgb,
                var(--dnh-primary) 9%,
                transparent
              ) 0%,
              transparent 31%
            ),

            radial-gradient(
              circle at 88% 12%,
              color-mix(
                in srgb,
                var(--dnh-primary) 5%,
                transparent
              ) 0%,
              transparent 27%
            ),

            radial-gradient(
              circle at 25% 92%,
              color-mix(
                in srgb,
                var(--dnh-accent) 5%,
                transparent
              ) 0%,
              transparent 24%
            ),

            linear-gradient(
              135deg,
              color-mix(
                in srgb,
                var(--dnh-primary) 5%,
                var(--dnh-bg-page)
              ),
              var(--dnh-bg-page) 50%,
              color-mix(
                in srgb,
                var(--dnh-primary) 3%,
                var(--dnh-bg-page)
              )
            )
          `,
        }}
      />

      {/* ===================================================================
          DOT TEXTURE
      ==================================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0

          z-[-9]

          opacity-40
        "
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in srgb,var(--dnh-primary) 15%,transparent) 0.75px,transparent 0.75px)",

          backgroundSize: "23px 23px",

          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 18%, black 83%, transparent 100%)",

          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 18%, black 83%, transparent 100%)",
        }}
      />

      {/* ===================================================================
          LARGE DECORATIVE CIRCLES
      ==================================================================== */}

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -left-[180px]
          -top-[80px]

          z-[-8]

          h-[650px]
          w-[650px]

          rounded-full

          border
          border-brand-primary/[0.07]
        "
      />

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          left-[5%]
          top-[8%]

          z-[-8]

          h-[480px]
          w-[480px]

          rounded-full

          border
          border-brand-primary/[0.055]
        "
      />

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -right-[250px]
          bottom-[-190px]

          z-[-8]

          h-[520px]
          w-[520px]

          rounded-full

          border
          border-brand-primary/[0.05]
        "
      />

      {/* orange orbit */}

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -left-[240px]
          top-[100px]

          z-[-7]

          h-[740px]
          w-[740px]

          rotate-[15deg]

          rounded-full

          border
          border-brand-accent/[0.10]
        "
      />

      {/* ===================================================================
          GLOWS
      ==================================================================== */}

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          left-[18%]
          top-[35%]

          z-[-7]

          h-[360px]
          w-[360px]

          rounded-full

          bg-brand-primary/[0.08]

          blur-[105px]
        "
      />

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          left-[40%]
          bottom-[-80px]

          z-[-7]

          h-[260px]
          w-[320px]

          rounded-full

          bg-brand-accent/[0.05]

          blur-[95px]
        "
      />

      {/* ===================================================================
          DECORATIVE DOTS
      ==================================================================== */}

      <DecorativeDot className="left-[7%] top-[14%]" />

      <DecorativeDot className="left-[36%] top-[8%]" accent />

      <DecorativeDot className="left-[42%] top-[43%]" />

      <DecorativeDot className="left-[14%] bottom-[24%]" accent />

      {/* ===================================================================
          MAIN GRID
      ==================================================================== */}

      <div
        dir="ltr"
        className="
          relative
          z-10

          grid

          lg:min-h-[690px]
          lg:grid-cols-[1.02fr_.98fr]
        "
      >
        {/* =================================================================
            PORTRAIT
        ================================================================== */}

        <div
          dir="rtl"
          className="
            relative

            order-1

            flex
            items-end
            justify-center

            px-3
            pt-4

            sm:px-6
            sm:pt-6

            lg:min-h-[690px]
            lg:px-2
            lg:pt-8

            xl:px-5
          "
        >
          {/* Portrait halo */}

          <span
            aria-hidden="true"
            className="
              pointer-events-none

              absolute
              left-1/2
              top-[44%]

              h-[360px]
              w-[360px]

              -translate-x-1/2
              -translate-y-1/2

              rounded-full

              bg-brand-primary/[0.10]

              blur-[75px]

              sm:h-[420px]
              sm:w-[420px]

              lg:h-[470px]
              lg:w-[470px]
            "
          />

          {/* Main portrait */}

          <picture
            className="
              relative
              z-10

              block

              h-[365px]
              w-full

              max-w-[570px]

              sm:h-[470px]

              lg:h-[660px]
              lg:max-w-[700px]
            "
          >
            <source
              media="(min-width: 1024px)"
              srcSet={desktopPortrait.srcSet}
              sizes={desktopPortrait.sizes}
            />

            <source
              media="(max-width: 1023px)"
              srcSet={mobilePortrait.srcSet}
              sizes={mobilePortrait.sizes}
            />

            <img
              {...mobilePortrait}
              alt="پرتره دکتر نسیم محمدحسنی"
              decoding="async"
              className="
                h-full
                w-full

                object-contain
                object-bottom
              "
            />
          </picture>

          {/* ===============================================================
              SMALL FLOATING CARD
          ================================================================ */}

          <div
            className="
              absolute
              bottom-[22px]
              left-[14px]

              z-20

              hidden

              min-w-[125px]

              rounded-[18px]

              border
              border-line

              bg-page/70

              px-[14px]
              py-[12px]

              text-center

              shadow-[0_12px_30px_color-mix(in_srgb,var(--dnh-primary)_8%,transparent)]

              backdrop-blur-[18px]

              lg:block

              xl:left-[34px]
            "
          >
            <span
              aria-hidden="true"
              className="
                mx-auto
                mb-[6px]

                block
                h-[6px]
                w-[6px]

                rounded-full

                bg-brand-accent
              "
            />

            <p
              className="
                text-[9px]
                font-bold

                leading-[1.9]

                text-ink-muted
              "
            >
              تجربه
            </p>

            <p
              className="
                mt-[2px]

                text-[10px]
                font-black

                leading-[1.9]

                text-ink
              "
            >
              نگاه مستقل
              <br />
              آینده روشن‌تر
            </p>
          </div>
        </div>

        {/* =================================================================
            CONTENT
        ================================================================== */}

        <div
          dir="rtl"
          className="
            order-2

            flex
            items-center

            px-5
            pb-8
            pt-6

            sm:px-8
            sm:pb-10

            lg:min-h-[690px]

            lg:px-8
            lg:py-12

            xl:px-11

            2xl:px-14
          "
        >
          <div
            className="
              mx-auto

              w-full
              max-w-[640px]

              lg:mx-0
            "
          >
            {/* =============================================================
                EYEBROW
            ============================================================== */}

            <div
              className="
                flex
                justify-center

                lg:justify-start
              "
            >
              <div
                className="
                  inline-flex
                  items-center
                  gap-[8px]

                  rounded-full

                  border
                  border-line

                  bg-page/70

                  px-[14px]
                  py-[8px]

                  text-[9px]
                  font-bold

                  text-brand-primary

                  shadow-[0_7px_22px_color-mix(in_srgb,var(--dnh-primary)_6%,transparent)]

                  backdrop-blur-[14px]

                  sm:text-[10px]
                "
              >
                <span>درباره دکتر نسیم</span>

                <span
                  aria-hidden="true"
                  className="
                    h-[6px]
                    w-[6px]

                    rounded-full

                    bg-brand-accent

                    shadow-[0_0_0_5px_color-mix(in_srgb,var(--dnh-accent)_9%,transparent)]
                  "
                />
              </div>
            </div>

            {/* =============================================================
                NAME
            ============================================================== */}

            <h2
              id="about-dr-nasim-title"
              className="
                mt-5

                text-center

                text-[28px]
                font-black

                leading-[1.55]

                tracking-[-0.045em]

                text-ink

                sm:text-[36px]

                lg:text-right
                lg:text-[44px]

                xl:text-[48px]
              "
            >
              دکتر <span className="text-brand-primary">نسیم</span> محمدحسنی
            </h2>

            {/* =============================================================
                POSITIONING
            ============================================================== */}

            <p
              className="
                mt-2

                text-center

                text-[18px]
                font-black

                leading-[1.8]

                text-ink-muted

                sm:text-[21px]

                lg:text-right
                lg:text-[24px]
              "
            >
              معمار تصمیم‌های مالی بزرگ
            </p>

            {/* =============================================================
                DESCRIPTION
            ============================================================== */}

            <p
              id="about-dr-nasim-description"
              className="
                mx-auto
                mt-4

                max-w-[590px]

                text-center

                text-[10.5px]
                font-medium

                leading-[2.2]

                text-ink-muted

                sm:text-[11.5px]

                lg:mx-0
                lg:mt-5
                lg:text-right

                lg:text-[12.5px]
              "
            >
              با رویکردی تحلیلی، راهبردی و مستقل، دکتر نسیم به افراد، خانواده‌ها
              و کسب‌وکارها کمک می‌کند تا میان داده، تصمیم و افق بلندمدت، هماهنگی
              ایجاد کنند.
            </p>

            {/* =============================================================
                EXPERTISE CARDS
            ============================================================== */}

            <ul
              aria-label="حوزه‌های تخصصی دکتر نسیم محمدحسنی"
              className="
                mt-6

                grid
                grid-cols-1

                gap-[8px]

                sm:grid-cols-3

                lg:mt-7
              "
            >
              {EXPERTISE_ITEMS.map((item) => (
                <li key={item.href} className="h-full">
                  <ExpertiseCard item={item} />
                </li>
              ))}
            </ul>

            {/* =============================================================
                PRINCIPLES
            ============================================================== */}

            <ul
              aria-label="اصول رویکرد حرفه‌ای"
              className="
                mt-[10px]

                grid
                grid-cols-3

                overflow-hidden

                rounded-[18px]

                border
                border-line

                bg-page/55

                shadow-[0_8px_25px_color-mix(in_srgb,var(--dnh-primary)_4%,transparent)]

                backdrop-blur-[14px]
              "
            >
              {PRINCIPLES.map((item, index) => (
                <li
                  key={item.title}
                  className={cn(
                    "min-w-0",

                    index !== PRINCIPLES.length - 1 && "border-l border-line",
                  )}
                >
                  <PrincipleCard item={item} />
                </li>
              ))}
            </ul>

            {/* =============================================================
                CTA
            ============================================================== */}

            <div
              className="
                mt-5

                flex
                flex-col

                gap-[9px]

                sm:flex-row

                lg:mt-6
              "
            >
              <ActionButton
                href="/about"
                variant="primary"
                size="md"
                icon={ArrowLeft}
                iconPosition="end"
                className="w-full sm:flex-1"
              >
                بیشتر درباره دکتر نسیم
              </ActionButton>

              <ActionButton
                href="/services"
                variant="secondary"
                size="md"
                icon={ArrowRight}
                iconPosition="start"
                className="w-full sm:flex-1"
              >
                مشاهده خدمات
              </ActionButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   Expertise Card
============================================================================= */

function ExpertiseCard({ item }: { item: ExpertiseItem }) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className="
        group/expertise

        relative

        flex
        h-full
        min-h-[128px]
        items-center

        gap-[12px]

        overflow-hidden

        rounded-[18px]

        border
        border-line

        bg-page/65

        px-[11px]
        py-[10px]

        text-right

        shadow-[0_8px_24px_color-mix(in_srgb,var(--dnh-primary)_5%,transparent)]

        backdrop-blur-[14px]

        outline-none

        touch-manipulation

        transition-[transform,background-color,border-color,box-shadow]
        duration-[500ms]
        ease-[cubic-bezier(.22,1,.36,1)]

        hover:-translate-y-[3px]

        hover:border-line-strong/30
        hover:bg-page/90

        hover:shadow-[0_16px_38px_color-mix(in_srgb,var(--dnh-primary)_10%,transparent)]

        active:translate-y-[1px]
        active:scale-[0.98]

        focus-visible:ring-4
        focus-visible:ring-focus/20

        motion-reduce:transition-none
        motion-reduce:transform-none

        sm:min-h-[180px]
        sm:flex-col
        sm:justify-center
        sm:px-[12px]
        sm:py-[15px]
        sm:text-center
      "
    >
      {/* =================================================================
          ICON
      ================================================================== */}

      <span
        aria-hidden="true"
        className={cn(
          `
            relative

            flex
            h-[48px]
            w-[48px]
            shrink-0
            items-center
            justify-center

            rounded-full

            shadow-[0_7px_20px_color-mix(in_srgb,var(--dnh-primary)_6%,transparent)]

            transition-[transform,background-color,color,box-shadow]
            duration-[500ms]
            ease-[cubic-bezier(.22,1,.36,1)]

            group-hover/expertise:-translate-y-[2px]
            group-hover/expertise:scale-[1.045]

            group-active/expertise:scale-[0.9]

            sm:h-[58px]
            sm:w-[58px]
          `,

          item.tone === "accent"
            ? `
                bg-brand-accent/[0.10]
                text-brand-accent
              `
            : `
                bg-surface-soft
                text-brand-primary
              `,
        )}
      >
        <Icon
          strokeWidth={1.6}
          className="
            h-[19px]
            w-[19px]

            sm:h-[23px]
            sm:w-[23px]
          "
        />
      </span>

      {/* =================================================================
          CONTENT
      ================================================================== */}

      <div className="min-w-0 flex-1 sm:flex-none">
        <h3
          className="
            text-[11px]
            font-black

            leading-[1.8]

            text-ink

            transition-colors
            duration-300

            group-hover/expertise:text-brand-primary

            sm:text-[12px]

            lg:text-[13px]
          "
        >
          {item.title}
        </h3>

        <p
          className="
            mt-[3px]

            text-[8px]
            font-medium

            leading-[1.9]

            text-ink-muted

            sm:mt-[5px]
            sm:text-[8.5px]

            lg:text-[9px]
          "
        >
          {item.description}
        </p>
      </div>

      {/* Mobile arrow */}

      <span
        aria-hidden="true"
        className="
          mr-auto

          flex
          h-[27px]
          w-[27px]
          shrink-0
          items-center
          justify-center

          rounded-full

          bg-surface-soft

          text-brand-primary

          transition-[transform,background-color,color]
          duration-[350ms]

          group-hover/expertise:-translate-x-[2px]

          group-active/expertise:scale-[0.85]

          sm:hidden
        "
      >
        <ArrowLeft strokeWidth={1.7} className="h-[11px] w-[11px]" />
      </span>

      {/* hover glow */}

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -right-[70px]
          -top-[70px]

          h-[160px]
          w-[160px]

          rounded-full

          bg-brand-primary/[0.08]

          opacity-0

          blur-[55px]

          transition-opacity
          duration-500

          group-hover/expertise:opacity-100
        "
      />
    </Link>
  );
}

/* =============================================================================
   Principle
============================================================================= */

function PrincipleCard({ item }: { item: PrincipleItem }) {
  const Icon = item.icon;

  return (
    <div
      className="
        group/principle

        flex
        min-h-[72px]
        flex-col
        items-center
        justify-center

        gap-[5px]

        px-1
        py-[9px]

        text-center

        touch-manipulation

        transition-[background-color,transform]
        duration-[400ms]
        ease-[cubic-bezier(.22,1,.36,1)]

        hover:bg-page/70

        active:scale-[0.96]

        motion-reduce:transition-none
        motion-reduce:transform-none

        sm:min-h-[76px]

        lg:min-h-[70px]
        lg:flex-row
        lg:gap-[8px]
      "
    >
      <Icon
        aria-hidden="true"
        strokeWidth={1.65}
        className="
          h-[16px]
          w-[16px]
          shrink-0

          text-brand-primary

          transition-transform
          duration-[400ms]

          group-hover/principle:scale-[1.08]
        "
      />

      <span
        className="
          text-[7.5px]
          font-black

          leading-[1.7]

          text-ink

          sm:text-[8.5px]

          lg:text-[9px]
        "
      >
        {item.title}
      </span>
    </div>
  );
}

/* =============================================================================
   Decorative Dot
============================================================================= */

function DecorativeDot({
  className,
  accent = false,
}: {
  className: string;
  accent?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        `
          pointer-events-none

          absolute
          z-[-6]

          h-[8px]
          w-[8px]

          rounded-full
        `,
        accent
          ? `
              bg-brand-accent

              shadow-[0_0_0_5px_color-mix(in_srgb,var(--dnh-accent)_8%,transparent)]
            `
          : `
              bg-brand-primary

              shadow-[0_0_0_5px_color-mix(in_srgb,var(--dnh-primary)_8%,transparent)]
            `,
        className,
      )}
    />
  );
}
