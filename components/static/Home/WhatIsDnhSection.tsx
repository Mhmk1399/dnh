import { getImageProps } from "next/image";

import {
  ArrowLeft,
  BarChart3,
  Compass,
  Layers3,
  Play,
  type LucideIcon,
} from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   Types
============================================================================= */

type DnhPillar = {
  title: string;
  description: string;
  icon: LucideIcon;
};

/* =============================================================================
   Content
============================================================================= */

const DNH_PILLARS: DnhPillar[] = [
  {
    title: "معماری ثروت",
    description:
      "طراحی ساختار یکپارچه برای دارایی‌ها، سرمایه و جریان‌های مالی.",
    icon: Layers3,
  },
  {
    title: "تحلیل و هوشمندی",
    description:
      "تصمیم‌گیری بر پایه داده، تحلیل تخصصی و بینش‌های قابل اتکا.",
    icon: BarChart3,
  },
  {
    title: "تصمیم‌سازی راهبردی",
    description:
      "تعیین مسیر مناسب با اهداف بلندمدت و مدیریت ریسک‌های مالی.",
    icon: Compass,
  },
];

/* =============================================================================
   Responsive Visual

   Desktop:
   public/assets/images/dnh-what-is-desktop.png

   Mobile:
   public/assets/images/dnh-what-is-mobile.png

   <picture> باعث می‌شود مرورگر بر اساس viewport فقط تصویر موردنیاز را
   انتخاب کند و دو تصویر همزمان دانلود نشوند.
============================================================================= */

const { props: desktopVisual } = getImageProps({
  src: "/assets/images/dnh-what-is-desktop.png",
  alt: "",
  width: 1536,
  height: 1024,
  quality: 88,
  sizes:
    "(min-width: 1536px) 760px, (min-width: 1024px) 52vw, 1px",
  loading: "lazy",
});

const { props: mobileVisual } = getImageProps({
  src: "/assets/images/dnh-what-is-mobile.png",
  alt: "",
  width: 1024,
  height: 1536,
  quality: 86,
  sizes: "(max-width: 1023px) calc(100vw - 32px), 1px",
  loading: "lazy",
});

/* =============================================================================
   Main Section
============================================================================= */

export default function WhatIsDnhSection() {
  return (
    <section
      id="what-is-dnh"
      dir="rtl"
      aria-labelledby="what-is-dnh-title"
      aria-describedby="what-is-dnh-description"
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

        sm:mt-16
        sm:w-[calc(100%-32px)]
        sm:rounded-[34px]

        lg:mt-20
        lg:w-[calc(100%-48px)]
        lg:rounded-[40px]
      "
    >
      {/* ===================================================================
          THEME BACKGROUND
      ==================================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0

          z-[-5]
        "
        style={{
          background: `
            radial-gradient(
              circle at 4% 20%,
              color-mix(
                in srgb,
                var(--dnh-primary) 9%,
                transparent
              ) 0%,
              transparent 33%
            ),
            radial-gradient(
              circle at 91% 8%,
              color-mix(
                in srgb,
                var(--dnh-primary) 6%,
                transparent
              ) 0%,
              transparent 30%
            ),
            radial-gradient(
              circle at 15% 94%,
              color-mix(
                in srgb,
                var(--dnh-accent) 5%,
                transparent
              ) 0%,
              transparent 30%
            ),
            linear-gradient(
              135deg,
              color-mix(
                in srgb,
                var(--dnh-primary) 5%,
                var(--dnh-bg-page)
              ),
              var(--dnh-bg-page) 48%,
              color-mix(
                in srgb,
                var(--dnh-primary) 4%,
                var(--dnh-bg-page)
              )
            )
          `,
        }}
      />

      {/* ===================================================================
          LARGE DECORATIVE ARCS
      ==================================================================== */}

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -left-[170px]
          -top-[140px]

          z-[-4]

          h-[520px]
          w-[520px]

          rounded-full

          border
          border-brand-primary/[0.08]
        "
      />

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -left-[60px]
          -top-[55px]

          z-[-4]

          h-[350px]
          w-[350px]

          rounded-full

          border
          border-brand-primary/[0.06]
        "
      />

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -right-[150px]
          bottom-[20px]

          z-[-4]

          h-[350px]
          w-[350px]

          rounded-full

          border
          border-brand-primary/[0.05]
        "
      />

      {/* ===================================================================
          TOP REFLECTION
      ==================================================================== */}

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-x-[10%]
          top-0

          h-px

          bg-gradient-to-r
          from-transparent
          via-brand-primary/20
          to-transparent
        "
      />

      {/* ===================================================================
          LAYOUT
      ==================================================================== */}

      <div 
        className="
          relative
          z-10

          grid

          lg:min-h-[650px]
          lg:grid-cols-[1.06fr_.94fr]
        "
      >
        {/* =================================================================
            VISUAL

            Mobile: top
            Desktop: left
        ================================================================== */}

        <div
          className="
            relative

            col-start-1
            row-start-1

            flex
            items-center
            justify-center

            px-3
            pb-2
            pt-5

            sm:px-6
            sm:pt-7

            lg:min-h-[650px]

            lg:px-4
            lg:py-8

            xl:px-5
          "
        >
          {/* ---------------------------------------------------------------
              Visual glow
          ---------------------------------------------------------------- */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none

              absolute
              left-1/2
              top-1/2

              h-[65%]
              w-[72%]

              -translate-x-1/2
              -translate-y-1/2

              rounded-full

              bg-brand-primary/[0.08]

              blur-[65px]

              lg:blur-[90px]
            "
          />

          {/* ---------------------------------------------------------------
              Illustration
          ---------------------------------------------------------------- */}

          <picture
            aria-hidden="true"
            className="
              relative
              z-10

              block

              h-[285px]
              w-full

              sm:h-[370px]

              lg:h-[590px]

              xl:h-[620px]
            "
          >
            <source
              media="(min-width: 1024px)"
              srcSet={desktopVisual.srcSet}
              sizes={desktopVisual.sizes}
            />

            <source
              media="(max-width: 1023px)"
              srcSet={mobileVisual.srcSet}
              sizes={mobileVisual.sizes}
            />

            <img
              {...mobileVisual}
              alt=""
              aria-hidden="true"
              decoding="async"
              className="
                h-full
                w-full

                object-contain
                object-center
              "
            />
          </picture>
        </div>

        {/* =================================================================
            CONTENT

            Mobile: below visual
            Desktop: right
        ================================================================== */}

        <div
          className="
            col-start-1
            row-start-2

            flex
            items-center

            px-5
            pb-7
            pt-2

            sm:px-8
            sm:pb-9

            lg:col-start-2
            lg:row-start-1

            lg:min-h-[650px]

            lg:px-8
            lg:py-12

            xl:px-12

            2xl:px-16
          "
        >
          <div
            className="
              mx-auto

              w-full
              max-w-[610px]

              lg:mx-0
            "
          >
            {/* =============================================================
                EYEBROW
            ============================================================== */}

            <div
              className="
                mb-5

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

                  bg-page/[0.68]

                  px-[14px]
                  py-[8px]

                  text-[9px]
                  font-bold

                  text-brand-primary

                  shadow-[0_7px_24px_color-mix(in_srgb,var(--dnh-primary)_6%,transparent)]

                  backdrop-blur-[14px]

                  sm:text-[10px]
                "
              >
                <span>معرفی DNH</span>

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
                TITLE
            ============================================================== */}

            <h2
              id="what-is-dnh-title"
              className="
                text-center

                text-[31px]
                font-black

                leading-[1.55]

                tracking-[-0.045em]

                text-ink

                sm:text-[37px]

                lg:text-right

                lg:text-[44px]
                lg:leading-[1.45]

                xl:text-[49px]
              "
            >
              <span
                dir="ltr"
                className="
                  inline-block

                  text-brand-primary
                "
              >
                DNH
              </span>{" "}
              چیست؟
            </h2>

            {/* =============================================================
                LEAD
            ============================================================== */}

            <p
              className="
                mx-auto
                mt-3

                max-w-[520px]

                text-center

                text-[14px]
                font-black

                leading-[1.9]

                text-ink

                sm:text-[15px]

                lg:mx-0
                lg:mt-4
                lg:text-right

                lg:text-[17px]
              "
            >
              یک سیستم تصمیم‌سازی برای ثروت، سرمایه و
              تصمیم‌های مالی راهبردی
            </p>

            {/* =============================================================
                DESCRIPTION
            ============================================================== */}

            <p
              id="what-is-dnh-description"
              className="
                mx-auto
                mt-4

                max-w-[540px]

                text-center

                text-[10px]
                font-medium

                leading-[2.15]

                text-ink-muted

                sm:text-[11px]

                lg:mx-0
                lg:mt-5
                lg:text-right

                lg:text-[12px]
                lg:leading-[2.1]
              "
            >
              DNH به شما کمک می‌کند تا دارایی‌ها و منابع
              مالی خود را به شکلی یکپارچه مدیریت کنید؛ از
              پراکندگی تصمیم‌ها جلوگیری کنید و با
              تحلیل‌های دقیق، معماری حرفه‌ای و ارزیابی
              کارشناسی، مسیر روشن‌تری برای آینده مالی خود
              بسازید.
            </p>

            {/* =============================================================
                PILLARS
            ============================================================== */}

            <ul
              aria-label="سه محور اصلی DNH"
              className="
                mt-6

                space-y-[8px]

                sm:mt-7

                lg:mt-8
              "
            >
              {DNH_PILLARS.map((item) => (
                <li key={item.title}>
                  <DnhPillarCard item={item} />
                </li>
              ))}
            </ul>

            {/* =============================================================
                ACTIONS - DESKTOP
            ============================================================== */}

            <div
              className="
                mt-7

                hidden
                items-center
                gap-5

                lg:flex
              "
            >
              <PrimaryAction />

              <FrameworkAction />

              <div
                aria-hidden="true"
                className="
                  relative

                  h-px
                  flex-1

                  bg-line
                "
              >
                <span
                  className="
                    absolute
                    left-[36%]
                    top-1/2

                    h-[6px]
                    w-[6px]

                    -translate-y-1/2

                    rounded-full

                    bg-brand-accent
                  "
                />
              </div>
            </div>

            {/* =============================================================
                ACTIONS - MOBILE
            ============================================================== */}

            <div
              className="
                mt-7

                space-y-3

                lg:hidden
              "
            >
              <PrimaryAction mobile />

              <div className="flex justify-center">
                <FrameworkAction />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   Pillar Card
============================================================================= */

function DnhPillarCard({
  item,
}: {
  item: DnhPillar;
}) {
  const Icon = item.icon;

  return (
    <div
      className="
        group/pillar

        relative

        flex
        min-h-[74px]
        items-center
        gap-[13px]

        overflow-hidden

        rounded-[18px]

        border
        border-line

        bg-page/[0.68]

        px-[12px]
        py-[10px]

        shadow-[0_8px_25px_color-mix(in_srgb,var(--dnh-primary)_5%,transparent)]

        backdrop-blur-[14px]

        touch-manipulation

        transition-[transform,box-shadow,border-color,background-color]
        duration-[500ms]
        ease-[cubic-bezier(.22,1,.36,1)]

        hover:-translate-y-[2px]

        hover:border-line-strong/30
        hover:bg-page/[0.88]

        hover:shadow-[0_14px_36px_color-mix(in_srgb,var(--dnh-primary)_10%,transparent)]

        active:translate-y-[1px]
        active:scale-[0.985]

        active:shadow-[0_6px_18px_color-mix(in_srgb,var(--dnh-primary)_8%,transparent)]

        motion-reduce:transition-none
        motion-reduce:transform-none

        sm:min-h-[78px]

        lg:rounded-[20px]
        lg:px-[14px]
      "
    >
      {/* ===============================================================
          ICON
      ================================================================ */}

      <span
        aria-hidden="true"
        className="
          relative

          flex
          h-[48px]
          w-[48px]
          shrink-0
          items-center
          justify-center

          overflow-hidden

          rounded-[15px]

          bg-surface-soft

          text-brand-primary

          shadow-[0_5px_18px_color-mix(in_srgb,var(--dnh-primary)_7%,transparent)]

          transition-[transform,background-color,color,box-shadow]
          duration-[500ms]
          ease-[cubic-bezier(.22,1,.36,1)]

          group-hover/pillar:-translate-y-[2px]
          group-hover/pillar:scale-[1.035]

          group-hover/pillar:bg-brand-primary
          group-hover/pillar:text-[var(--dnh-text-on-brand)]

          group-hover/pillar:shadow-[0_10px_25px_color-mix(in_srgb,var(--dnh-primary)_18%,transparent)]

          group-active/pillar:translate-y-0
          group-active/pillar:scale-[0.94]

          motion-reduce:transition-none
          motion-reduce:transform-none

          sm:h-[52px]
          sm:w-[52px]
        "
      >
        <span
          aria-hidden="true"
          className="
            absolute
            -right-[10px]
            -top-[10px]

            h-[25px]
            w-[25px]

            rounded-full

            bg-brand-accent/15

            blur-[7px]
          "
        />

        <Icon
          strokeWidth={1.6}
          className="
            relative
            z-10

            h-[20px]
            w-[20px]

            sm:h-[22px]
            sm:w-[22px]
          "
        />
      </span>

      {/* ===============================================================
          TEXT
      ================================================================ */}

      <div
        className="
          min-w-0
          flex-1
        "
      >
        <h3
          className="
            text-[11px]
            font-black

            text-ink

            transition-colors
            duration-[350ms]

            group-hover/pillar:text-brand-primary

            sm:text-[12px]
          "
        >
          {item.title}
        </h3>

        <p
          className="
            mt-[3px]

            text-[8.5px]
            font-medium

            leading-[1.9]

            text-ink-muted

            sm:text-[9px]

            xl:text-[9.5px]
          "
        >
          {item.description}
        </p>
      </div>

      {/* ===============================================================
          SOFT HOVER GLOW
      ================================================================ */}

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -left-[70px]
          -top-[70px]

          h-[160px]
          w-[160px]

          rounded-full

          bg-brand-primary/[0.08]

          opacity-0

          blur-[55px]

          transition-opacity
          duration-500

          group-hover/pillar:opacity-100
          group-active/pillar:opacity-70
        "
      />
    </div>
  );
}

/* =============================================================================
   Primary CTA
============================================================================= */

function PrimaryAction({
  mobile = false,
}: {
  mobile?: boolean;
}) {
  return (
    <ActionButton
      href="/about"
      variant="primary"
      size="md"
      icon={ArrowLeft}
      iconPosition="end"
      fullWidth={mobile}
      className={mobile ? "" : "min-w-[190px]"}
    >
      بیشتر درباره DNH
    </ActionButton>
  );
}

/* =============================================================================
   Framework CTA
============================================================================= */

function FrameworkAction() {
  return (
    <ActionButton
      href="/dnh/framework"
      variant="secondary"
      size="sm"
      icon={Play}
      iconPosition="start"
    >
      مشاهده چارچوب DNH
    </ActionButton>
  );
}
