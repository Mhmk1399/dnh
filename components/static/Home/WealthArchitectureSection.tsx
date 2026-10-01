import { getImageProps } from "next/image";

import {
  ArrowLeft,
  BarChart3,
  ChartPie,
  Lightbulb,
  Play,
  ShieldCheck,
  Target,
  TrendingUp,
  Layers3,
  type LucideIcon,
} from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   Types
============================================================================= */

type ArchitecturePoint = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type OrbitConcept = {
  key: "growth" | "risk" | "allocation" | "goals";
  title: string;
  description: string;
  icon: LucideIcon;
};

type ArchitectureFeature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

/* =============================================================================
   Content
============================================================================= */

const ARCHITECTURE_POINTS: ArchitecturePoint[] = [
  {
    title: "نگاه یکپارچه",
    description:
      "ترکیب دارایی‌ها، سرمایه، فرصت‌ها و ریسک‌ها در یک ساختار منسجم.",
    icon: Layers3,
  },
  {
    title: "تصمیم‌های آگاهانه",
    description:
      "تصمیم‌گیری بر پایه داده، تحلیل تخصصی و درک دقیق‌تر از پیامدها.",
    icon: BarChart3,
  },
  {
    title: "مسیر رشد بلندمدت",
    description:
      "طراحی ساختاری که تصمیم امروز را با اهداف و افق آینده هماهنگ کند.",
    icon: TrendingUp,
  },
];

const ORBIT_CONCEPTS: OrbitConcept[] = [
  {
    key: "growth",
    title: "رشد پایدار",
    description: "ایجاد ارزش بلندمدت در چارچوب پایدار",
    icon: TrendingUp,
  },
  {
    key: "risk",
    title: "مدیریت ریسک",
    description: "حفاظت هوشمندانه از دارایی‌ها",
    icon: ShieldCheck,
  },
  {
    key: "allocation",
    title: "تخصیص بهینه",
    description: "چیدمان هدفمند دارایی‌ها",
    icon: ChartPie,
  },
  {
    key: "goals",
    title: "اهداف روشن",
    description: "هماهنگی سرمایه با آینده مالی",
    icon: Target,
  },
];

const ARCHITECTURE_FEATURES: ArchitectureFeature[] = [
  {
    title: "پایداری و اطمینان",
    description: "در مسیر بلندمدت سرمایه‌گذاری",
    icon: ShieldCheck,
  },
  {
    title: "ترکیب بهینه دارایی‌ها",
    description: "میان ریسک، بازده و نقدشوندگی",
    icon: ChartPie,
  },
  {
    title: "استراتژی شخصی‌سازی‌شده",
    description: "متناسب با اهداف و شرایط شما",
    icon: Lightbulb,
  },
];

/* =============================================================================
   Responsive image

   Only the correct desktop/mobile visual should be requested by the browser.
============================================================================= */

const { props: desktopVisual } = getImageProps({
  src: "/assets/images/wealth-architecture-visual-desktop.png",
  alt: "",
  width: 1536,
  height: 1024,
  quality: 88,
  sizes: "(min-width: 1536px) 720px, (min-width: 1024px) 52vw, 1px",
  loading: "lazy",
});

const { props: mobileVisual } = getImageProps({
  src: "/assets/images/wealth-architecture-visual-mobile.png",
  alt: "",
  width: 1024,
  height: 1536,
  quality: 86,
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
   Main Section
============================================================================= */

export default function WealthArchitectureSection() {
  return (
    <section
      id="wealth-architecture"
      dir="rtl"
      aria-labelledby="wealth-architecture-title"
      aria-describedby="wealth-architecture-description"
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
        [contain-intrinsic-size:850px]

        sm:mt-16
        sm:w-[calc(100%-32px)]
        sm:rounded-[34px]

        lg:mt-20
        lg:w-[calc(100%-48px)]
        lg:rounded-[40px]
      "
    >
      {/* ===================================================================
          CSS BACKGROUND
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
              circle at 8% 18%,
              color-mix(
                in srgb,
                var(--dnh-primary) 8%,
                transparent
              ) 0%,
              transparent 28%
            ),
            radial-gradient(
              circle at 84% 12%,
              color-mix(
                in srgb,
                var(--dnh-primary) 5%,
                transparent
              ) 0%,
              transparent 27%
            ),
            radial-gradient(
              circle at 18% 88%,
              color-mix(
                in srgb,
                var(--dnh-accent) 4.5%,
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
              ) 0%,
              var(--dnh-bg-page) 47%,
              color-mix(
                in srgb,
                var(--dnh-primary) 3.5%,
                var(--dnh-bg-page)
              ) 100%
            )
          `,
        }}
      />

      {/* ===================================================================
          DOTTED TEXTURE
      ==================================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0

          z-[-9]

          opacity-50
        "
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in srgb,var(--dnh-primary) 14%,transparent) 0.75px, transparent 0.75px)",
          backgroundSize: "22px 22px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
        }}
      />

      {/* ===================================================================
          LARGE BACKGROUND ARCS
      ==================================================================== */}

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -left-[230px]
          top-[70px]

          z-[-8]

          h-[600px]
          w-[600px]

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
          -left-[80px]
          top-[170px]

          z-[-8]

          h-[380px]
          w-[380px]

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
          -right-[230px]
          bottom-[-120px]

          z-[-8]

          h-[500px]
          w-[500px]

          rounded-full

          border
          border-brand-primary/[0.05]
        "
      />

      {/* ===================================================================
          AMBIENT GLOWS
      ==================================================================== */}

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          left-[16%]
          top-[29%]

          z-[-7]

          h-[230px]
          w-[230px]

          rounded-full

          bg-brand-primary/[0.08]

          blur-[80px]
        "
      />

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          left-[30%]
          top-[34%]

          z-[-7]

          h-[170px]
          w-[170px]

          rounded-full

          bg-brand-accent/[0.06]

          blur-[65px]
        "
      />

      {/* ===================================================================
          SMALL FLOATING DOTS
      ==================================================================== */}

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          left-[13%]
          top-[20%]

          z-[-6]

          h-[7px]
          w-[7px]

          rounded-full

          bg-brand-accent

          shadow-[0_0_0_5px_color-mix(in_srgb,var(--dnh-accent)_9%,transparent)]
        "
      />

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          left-[37%]
          top-[27%]

          z-[-6]

          h-[7px]
          w-[7px]

          rounded-full

          bg-brand-primary
        "
      />

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          left-[24%]
          bottom-[12%]

          z-[-6]

          h-[7px]
          w-[7px]

          rounded-full

          bg-brand-accent
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
          inset-x-[9%]
          top-0

          h-px

          bg-gradient-to-r
          from-transparent
          via-page
          to-transparent

          opacity-90
        "
      />

      {/* ===================================================================
          CONTENT WRAPPER
      ==================================================================== */}

      <div
        className="
          relative
          z-10

          px-4
          pb-5
          pt-8

          sm:px-6
          sm:pb-7
          sm:pt-10

          lg:px-[42px]
          lg:pb-[30px]
          lg:pt-[44px]

          xl:px-[54px]
        "
      >
        {/* =================================================================
            MAIN GRID

            First child = visual on mobile + desktop left
            Second child = content on desktop right
        ================================================================== */}

        <div
          dir="ltr"
          className="
            grid
            items-center

            gap-5

            lg:grid-cols-[1.08fr_.92fr]
            lg:gap-10

            xl:gap-14
          "
        >
          {/* ===============================================================
              VISUAL
          ================================================================ */}

          <div
            dir="rtl"
            className="
              relative

              mx-auto

              h-[330px]
              w-full
              max-w-[530px]

              sm:h-[430px]
              sm:max-w-[650px]

              lg:h-[570px]
              lg:max-w-none

              xl:h-[610px]
            "
          >
            {/* visual background halo */}

            <span
              aria-hidden="true"
              className="
                pointer-events-none

                absolute
                left-1/2
                top-1/2

                h-[62%]
                w-[68%]

                -translate-x-1/2
                -translate-y-1/2

                rounded-full

                bg-brand-primary/[0.08]

                blur-[60px]

                lg:blur-[85px]
              "
            />

            {/* -------------------------------------------------------------
                Main responsive visual
            -------------------------------------------------------------- */}

            <picture
              className="
                absolute
                inset-0

                z-10

                block
                h-full
                w-full
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
                alt="نمای مفهومی معماری ثروت DNH و ساختار چندلایه مدیریت سرمایه"
                decoding="async"
                className="
                  h-full
                  w-full

                  object-contain
                  object-center
                "
              />
            </picture>

            {/* -------------------------------------------------------------
                Concept orbit items
            -------------------------------------------------------------- */}

            <ul
              aria-label="مؤلفه‌های معماری ثروت"
              className="
                absolute
                inset-0

                z-20
              "
            >
              {ORBIT_CONCEPTS.map((item) => (
                <OrbitConceptCard key={item.key} item={item} />
              ))}
            </ul>
          </div>

          {/* ===============================================================
              CONTENT
          ================================================================ */}

          <div
            dir="rtl"
            className="
              mx-auto

              w-full
              max-w-[610px]

              text-center

              lg:mx-0
              lg:text-right
            "
          >
            {/* -------------------------------------------------------------
                Eyebrow
            -------------------------------------------------------------- */}

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
                <span>معماری ثروت</span>

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

            {/* -------------------------------------------------------------
                Heading
            -------------------------------------------------------------- */}

            <h2
              id="wealth-architecture-title"
              className="
                font-black

                leading-[1.5]

                tracking-[-0.045em]

                text-ink
              "
            >
              <span
                lang="en"
                dir="ltr"
                className="
                  block

                  text-[29px]

                  text-brand-primary

                  sm:text-[37px]

                  lg:text-[45px]

                  xl:text-[49px]
                "
              >
                معماری ثروت
              </span>

              <span
                className="
                  mt-1
                  block

                  text-[22px]

                  sm:text-[26px]

                  lg:text-[28px]
                "
              >
                معرفی مفهوم کلیدی برند
              </span>
            </h2>

            {/* -------------------------------------------------------------
                Description
            -------------------------------------------------------------- */}

            <p
              id="wealth-architecture-description"
              className="
                mx-auto
                mt-4

                max-w-[550px]

                text-[10px]
                font-medium

                leading-[2.15]

                text-ink-muted

                sm:text-[11px]

                lg:mx-0
                lg:mt-5

                lg:text-[12px]
              "
            >
              معماری ثروت، رویکردی یکپارچه برای طراحی، مدیریت و رشد دارایی‌هاست؛
              با هدف ایجاد هماهنگی میان تصمیم‌های امروز، ساختار سرمایه و آینده
              مالی شما.
            </p>

            {/* -------------------------------------------------------------
                Architecture cards
            -------------------------------------------------------------- */}

            <ul
              aria-label="اصول معماری ثروت DNH"
              className="
                mt-6

                space-y-[8px]

                sm:mt-7

                lg:mt-8
              "
            >
              {ARCHITECTURE_POINTS.map((item) => (
                <li key={item.title}>
                  <ArchitecturePointCard item={item} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* =================================================================
            FEATURE STRIP
        ================================================================== */}

        <ul
          aria-label="مزایای معماری ثروت"
          className="
            mt-7

            grid
            grid-cols-3

            overflow-hidden

            rounded-[22px]

            border
            border-line

            bg-page/[0.62]

            shadow-[0_12px_32px_color-mix(in_srgb,var(--dnh-primary)_5%,transparent)]

            backdrop-blur-[14px]

            lg:mt-5
          "
        >
          {ARCHITECTURE_FEATURES.map((item, index) => (
            <li
              key={item.title}
              className={cn(
                `
                    min-w-0
                  `,
                index !== ARCHITECTURE_FEATURES.length - 1 &&
                  `
                      border-l
                      border-line
                    `,
              )}
            >
              <ArchitectureFeatureCard item={item} />
            </li>
          ))}
        </ul>

        {/* =================================================================
            DESKTOP ACTIONS
        ================================================================== */}

        <div
          dir="rtl"
          className="
            mt-7

            hidden

            grid-cols-[240px_auto_1fr]
            items-center

            gap-5

            lg:grid
          "
        >
          <PrimaryArchitectureAction />

          <SecondaryArchitectureAction />

          <div
            aria-hidden="true"
            className="
              relative

              h-px

              bg-line
            "
          >
            <span
              className="
                absolute
                left-[35%]
                top-1/2

                h-[7px]
                w-[7px]

                -translate-y-1/2

                rounded-full

                bg-brand-accent

                shadow-[0_0_0_4px_color-mix(in_srgb,var(--dnh-accent)_8%,transparent)]
              "
            />
          </div>
        </div>

        {/* =================================================================
            MOBILE ACTIONS
        ================================================================== */}

        <div
          className="
            mt-6

            space-y-3

            lg:hidden
          "
        >
          <PrimaryArchitectureAction mobile />

          <div className="flex justify-center">
            <SecondaryArchitectureAction />
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   Orbit Concept
============================================================================= */

function OrbitConceptCard({ item }: { item: OrbitConcept }) {
  const Icon = item.icon;

  return (
    <li
      className={cn(
        `
          group/orbit

          absolute

          touch-manipulation
        `,
        getOrbitPosition(item.key),
      )}
    >
      <div
        className="
          flex
          items-center
          gap-[9px]

          rounded-[16px]

          border
          border-line

          bg-page/[0.78]

          p-[7px]

          shadow-[0_10px_28px_color-mix(in_srgb,var(--dnh-primary)_8%,transparent)]

          backdrop-blur-[14px]

          transition-[transform,box-shadow,background-color,border-color]
          duration-[500ms]
          ease-[cubic-bezier(.22,1,.36,1)]

          hover:-translate-y-[3px]
          hover:border-line-strong/30
          hover:bg-page/[0.92]

          hover:shadow-[0_16px_38px_color-mix(in_srgb,var(--dnh-primary)_12%,transparent)]

          active:translate-y-[1px]
          active:scale-[0.95]

          motion-reduce:transition-none
          motion-reduce:transform-none

          lg:min-w-[155px]
          lg:p-[9px]
        "
      >
        <span
          className="
            flex
            h-[38px]
            w-[38px]
            shrink-0
            items-center
            justify-center

            rounded-[12px]

            bg-surface-soft

            text-brand-primary

            transition-[transform,background-color,color]
            duration-[450ms]

            group-hover/orbit:scale-[1.05]
            group-hover/orbit:bg-brand-primary
            group-hover/orbit:text-[var(--dnh-text-on-brand)]

            group-active/orbit:scale-[0.9]

            lg:h-[43px]
            lg:w-[43px]
          "
        >
          <Icon
            aria-hidden="true"
            strokeWidth={1.6}
            className="
              h-[17px]
              w-[17px]

              lg:h-[19px]
              lg:w-[19px]
            "
          />
        </span>

        <div className="hidden lg:block">
          <h3
            className="
              text-[10px]
              font-black

              text-ink
            "
          >
            {item.title}
          </h3>

          <p
            className="
              mt-[2px]

              max-w-[105px]

              text-[7.5px]
              font-medium

              leading-[1.7]

              text-ink-muted
            "
          >
            {item.description}
          </p>
        </div>
      </div>
    </li>
  );
}

/* =============================================================================
   Orbit positions

   Desktop gets full concept cards.
   Mobile gets compact icon tiles around the visual.
============================================================================= */

function getOrbitPosition(key: OrbitConcept["key"]) {
  switch (key) {
    case "growth":
      return `
        left-1/2
        top-[1%]

        -translate-x-1/2

        lg:top-[2%]
      `;

    case "risk":
      return `
        left-[2%]
        top-[37%]

        lg:left-[1%]
        lg:top-[34%]
      `;

    case "allocation":
      return `
        right-[2%]
        top-[40%]

        lg:right-[1%]
        lg:top-[41%]
      `;

    case "goals":
      return `
        bottom-[2%]
        left-1/2

        -translate-x-1/2

        lg:bottom-[3%]
      `;

    default:
      return "";
  }
}

/* =============================================================================
   Architecture Point
============================================================================= */

function ArchitecturePointCard({ item }: { item: ArchitecturePoint }) {
  const Icon = item.icon;

  return (
    <article
      className="
        group/point

        relative

        flex
        min-h-[76px]
        items-center
        gap-[13px]

        overflow-hidden

        rounded-[18px]

        border
        border-line

        bg-page/[0.68]

        px-[12px]
        py-[10px]

        text-right

        shadow-[0_8px_25px_color-mix(in_srgb,var(--dnh-primary)_5%,transparent)]

        backdrop-blur-[14px]

        touch-manipulation

        transition-[transform,box-shadow,border-color,background-color]
        duration-[500ms]
        ease-[cubic-bezier(.22,1,.36,1)]

        hover:-translate-y-[2px]
        hover:border-line-strong/30
        hover:bg-page/[0.90]

        hover:shadow-[0_14px_36px_color-mix(in_srgb,var(--dnh-primary)_10%,transparent)]

        active:translate-y-[1px]
        active:scale-[0.985]

        motion-reduce:transition-none
        motion-reduce:transform-none

        sm:min-h-[80px]

        lg:rounded-[20px]
        lg:px-[14px]
      "
    >
      <span
        aria-hidden="true"
        className="
          flex
          h-[49px]
          w-[49px]
          shrink-0
          items-center
          justify-center

          rounded-[15px]

          bg-surface-soft

          text-brand-primary

          shadow-[0_5px_18px_color-mix(in_srgb,var(--dnh-primary)_7%,transparent)]

          transition-[transform,background-color,color,box-shadow]
          duration-[500ms]
          ease-[cubic-bezier(.22,1,.36,1)]

          group-hover/point:-translate-y-[2px]
          group-hover/point:scale-[1.035]

          group-hover/point:bg-brand-primary
          group-hover/point:text-[var(--dnh-text-on-brand)]

          group-hover/point:shadow-[0_10px_25px_color-mix(in_srgb,var(--dnh-primary)_18%,transparent)]

          group-active/point:scale-[0.93]

          motion-reduce:transition-none
          motion-reduce:transform-none

          sm:h-[53px]
          sm:w-[53px]
        "
      >
        <Icon
          strokeWidth={1.6}
          className="
            h-[20px]
            w-[20px]

            sm:h-[22px]
            sm:w-[22px]
          "
        />
      </span>

      <div className="min-w-0 flex-1">
        <h3
          className="
            text-[11px]
            font-black

            text-ink

            transition-colors
            duration-300

            group-hover/point:text-brand-primary

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

          group-hover/point:opacity-100
          group-active/point:opacity-70
        "
      />
    </article>
  );
}

/* =============================================================================
   Bottom Feature
============================================================================= */

function ArchitectureFeatureCard({ item }: { item: ArchitectureFeature }) {
  const Icon = item.icon;

  return (
    <div
      className="
        group/feature

        flex
        min-h-[95px]
        flex-col
        items-center
        justify-center

        gap-[7px]

        px-2
        py-3

        text-center

        touch-manipulation

        transition-[background-color,transform]
        duration-[450ms]
        ease-[cubic-bezier(.22,1,.36,1)]

        hover:bg-page/70

        active:scale-[0.97]

        motion-reduce:transition-none
        motion-reduce:transform-none

        sm:min-h-[105px]

        lg:min-h-[92px]
        lg:flex-row
        lg:gap-[12px]
        lg:px-6
        lg:text-right
      "
    >
      <span
        aria-hidden="true"
        className="
          flex
          h-[38px]
          w-[38px]
          shrink-0
          items-center
          justify-center

          rounded-full

          bg-surface-soft

          text-brand-primary

          transition-[transform,background-color,color]
          duration-[450ms]

          group-hover/feature:scale-[1.06]

          group-active/feature:scale-[0.9]

          sm:h-[42px]
          sm:w-[42px]
        "
      >
        <Icon
          strokeWidth={1.6}
          className="
            h-[17px]
            w-[17px]

            sm:h-[19px]
            sm:w-[19px]
          "
        />
      </span>

      <div className="min-w-0">
        <h3
          className="
            text-[8px]
            font-black

            leading-[1.8]

            text-ink

            sm:text-[9px]

            lg:text-[11px]
          "
        >
          {item.title}
        </h3>

        <p
          className="
            mt-[2px]

            hidden

            text-[8px]
            font-medium

            leading-[1.7]

            text-ink-muted

            sm:block

            lg:text-[8.5px]
          "
        >
          {item.description}
        </p>
      </div>
    </div>
  );
}

/* =============================================================================
   Primary CTA
============================================================================= */

function PrimaryArchitectureAction({ mobile = false }: { mobile?: boolean }) {
  return (
    <ActionButton
      href="/dnh/wealth-architecture"
      variant="primary"
      size="md"
      icon={ArrowLeft}
      iconPosition="end"
      fullWidth={mobile}
      className={mobile ? "" : "w-[240px]"}
    >
      بیشتر درباره معماری ثروت
    </ActionButton>
  );
}

/* =============================================================================
   Secondary CTA
============================================================================= */

function SecondaryArchitectureAction() {
  return (
    <ActionButton
      href="/services/private-wealth-strategy"
      variant="secondary"
      size="sm"
      icon={Play}
      iconPosition="start"
    >
      مشاهده مسیر مرتبط
    </ActionButton>
  );
}
