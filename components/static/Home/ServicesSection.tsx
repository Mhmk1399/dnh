import { getImageProps } from "next/image";
import Link from "next/link";

import {
  ArrowLeft,
  BarChart3,
  ChartNoAxesColumnIncreasing,
  ChartPie,
  Gem,
  Layers3,
  ShieldCheck,
  Target,
  UserRoundCheck,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   Types
============================================================================= */

type ServiceItem = {
  index: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  tone: "blue" | "orange";
};

type FeatureItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

/* =============================================================================
   Services

   These match the actual service routes of the DNH project.
============================================================================= */

const SERVICES: ServiceItem[] = [
  {
    index: "01",
    title: "استراتژی ثروت خصوصی",
    description: "طراحی مسیر اختصاصی برای مدیریت، حفاظت و توسعه ثروت خصوصی.",
    href: "/services/private-wealth-strategy",
    icon: Gem,
    tone: "orange",
  },
  {
    index: "02",
    title: "هوشمندی پرتفوی",
    description: "تحلیل ساختار، تمرکز، تخصیص و رفتار پرتفوی سرمایه‌گذاری.",
    href: "/services/portfolio-intelligence",
    icon: ChartPie,
    tone: "blue",
  },
  {
    index: "03",
    title: "مشاوره مالی راهبردی",
    description: "پشتیبانی تحلیلی برای تصمیم‌های مالی مهم، پیچیده و چندوجهی.",
    href: "/services/strategic-financial-advisory",
    icon: Target,
    tone: "blue",
  },
  {
    index: "04",
    title: "مشاوره اقتصاد و بازار",
    description: "تحلیل اقتصاد کلان، بازارها و متغیرهای مؤثر بر تصمیم سرمایه.",
    href: "/services/macro-market-advisory",
    icon: ChartNoAxesColumnIncreasing,
    tone: "orange",
  },
  {
    index: "05",
    title: "مدیریت ریسک و حفاظت از ثروت",
    description: "شناسایی ریسک‌ها و طراحی ساختار مناسب برای حفاظت از سرمایه.",
    href: "/services/risk-management-wealth-protection",
    icon: ShieldCheck,
    tone: "orange",
  },
  {
    index: "06",
    title: "نشست‌های مدیران",
    description: "جلسات تحلیلی و تصمیم‌محور برای مدیران و صاحبان سرمایه.",
    href: "/services/executive-briefings",
    icon: UsersRound,
    tone: "blue",
  },
];

/*
  Exact desktop arrangement matching the reference:

  LEFT                         CENTER                         RIGHT

  Private Wealth              DNH ORB                       Portfolio
  Strategic Advisory                                        Macro & Market
  Risk & Protection                                         Executive Briefings
*/

const LEFT_SERVICES = [SERVICES[0], SERVICES[2], SERVICES[4]];

const RIGHT_SERVICES = [SERVICES[1], SERVICES[3], SERVICES[5]];

/* =============================================================================
   Bottom features
============================================================================= */

const FEATURES: FeatureItem[] = [
  {
    title: "رویکرد یکپارچه",
    description: "ترکیب تحلیل، استراتژی و اجرا در یک مسیر منسجم.",
    icon: Layers3,
  },
  {
    title: "تصمیم‌سازی دقیق",
    description: "بر پایه تحلیل، تجربه و داده‌های قابل اتکا.",
    icon: BarChart3,
  },
  {
    title: "راهکار شخصی‌سازی‌شده",
    description: "متناسب با اهداف، شرایط و افق مالی شما.",
    icon: UserRoundCheck,
  },
];

/* =============================================================================
   Responsive central visual

   Using getImageProps + <picture> allows the browser to choose the correct
   artwork for the viewport instead of downloading both images.
============================================================================= */

const { props: desktopVisual } = getImageProps({
  src: "/assets/images/services-orbit-desktop.png",
  alt: "",
  width: 1536,
  height: 1024,
  quality: 88,
  sizes: "(min-width: 1536px) 590px, (min-width: 1024px) 40vw, 1px",
  loading: "lazy",
});

const { props: mobileVisual } = getImageProps({
  src: "/assets/images/services-orbit-mobile.png",
  alt: "",
  width: 1024,
  height: 1536,
  quality: 86,
  sizes: "(max-width: 1023px) calc(100vw - 48px), 1px",
  loading: "lazy",
});

/* =============================================================================
   Helpers
============================================================================= */

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* =============================================================================
   Main
============================================================================= */

export default function ServicesSection() {
  return (
    <section
      id="services"
      dir="rtl"
      aria-labelledby="services-title"
      aria-describedby="services-description"
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
        [contain-intrinsic-size:900px]

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
              circle at 50% 45%,
              color-mix(
                in srgb,
                var(--dnh-primary) 9%,
                transparent
              ) 0%,
              transparent 31%
            ),
            radial-gradient(
              circle at 7% 18%,
              color-mix(
                in srgb,
                var(--dnh-primary) 7%,
                transparent
              ) 0%,
              transparent 28%
            ),
            radial-gradient(
              circle at 94% 17%,
              color-mix(
                in srgb,
                var(--dnh-accent) 5.5%,
                transparent
              ) 0%,
              transparent 24%
            ),
            radial-gradient(
              circle at 11% 94%,
              color-mix(
                in srgb,
                var(--dnh-primary) 5%,
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
              var(--dnh-bg-page) 46%,
              color-mix(
                in srgb,
                var(--dnh-primary) 4%,
                var(--dnh-bg-page)
              ) 100%
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

          opacity-45
        "
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in srgb,var(--dnh-primary) 15%,transparent) 0.75px,transparent 0.75px)",
          backgroundSize: "23px 23px",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 13%, black 82%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 13%, black 82%, transparent 100%)",
        }}
      />

      {/* ===================================================================
          LARGE ARCS
      ==================================================================== */}

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -left-[210px]
          top-[80px]

          z-[-8]

          h-[520px]
          w-[520px]

          rounded-full

          border
          border-brand-primary/[0.065]
        "
      />

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -right-[210px]
          top-[50px]

          z-[-8]

          h-[520px]
          w-[520px]

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
          left-1/2
          top-[44%]

          z-[-8]

          h-[760px]
          w-[760px]

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          border
          border-brand-primary/[0.045]
        "
      />

      {/* ===================================================================
          AMBIENT LIGHTS
      ==================================================================== */}

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          left-1/2
          top-[46%]

          z-[-7]

          h-[420px]
          w-[420px]

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          bg-brand-primary/[0.08]

          blur-[100px]
        "
      />

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          left-[32%]
          top-[45%]

          z-[-7]

          h-[190px]
          w-[190px]

          rounded-full

          bg-brand-accent/[0.06]

          blur-[70px]
        "
      />

      {/* ===================================================================
          DECORATIVE LINES
      ==================================================================== */}

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          left-[-10%]
          top-[66%]

          z-[-6]

          h-px
          w-[55%]

          rotate-[-6deg]

          bg-gradient-to-r
          from-transparent
          via-brand-primary/10
          to-transparent
        "
      />

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          right-[-8%]
          top-[72%]

          z-[-6]

          h-px
          w-[50%]

          rotate-[7deg]

          bg-gradient-to-r
          from-transparent
          via-brand-accent/12
          to-transparent
        "
      />

      {/* ===================================================================
          HEADER
      ==================================================================== */}

      <div
        className="
          relative
          z-10

          px-4
          pb-5
          pt-9

          sm:px-6
          sm:pb-7
          sm:pt-11

          lg:px-[42px]
          lg:pb-[30px]
          lg:pt-[46px]

          xl:px-[54px]
        "
      >
        <header
          className="
            mx-auto

            max-w-[790px]

            text-center
          "
        >
          <div
            className="
              mx-auto

              inline-flex
              items-center
              gap-[8px]

              rounded-full

              border
              border-line

              bg-page/[0.70]

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
            <span>خدمات DNH</span>

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

          <h2
            id="services-title"
            className="
              mt-5

              text-[29px]
              font-black

              leading-[1.5]

              tracking-[-0.045em]

              text-ink

              sm:text-[37px]

              lg:text-[47px]
              lg:leading-[1.42]
            "
          >
            <span className="text-brand-accent">۶</span> خدمت اصلی
          </h2>

          <p
            className="
              mt-2

              text-[14px]
              font-black

              leading-[1.9]

              text-ink

              sm:text-[16px]

              lg:text-[19px]
            "
          >
            راهکارهای تخصصی برای مسیر مالی شما
          </p>

          <p
            id="services-description"
            className="
              mx-auto
              mt-3

              max-w-[720px]

              text-[10px]
              font-medium

              leading-[2.1]

              text-ink-muted

              sm:text-[11px]

              lg:text-[12px]
            "
          >
            از تحلیل و هوشمندی تا برنامه‌ریزی، مدیریت ریسک و تصمیم‌سازی راهبردی،
            خدمات DNH برای ایجاد یک مسیر منسجم در مدیریت سرمایه و ثروت طراحی
            شده‌اند.
          </p>
        </header>

        {/* =================================================================
            DESKTOP STAGE
        ================================================================== */}

        <div
          dir="ltr"
          className="
            relative

            mt-7

            hidden

            min-h-[520px]

            grid-cols-[minmax(270px,1fr)_minmax(360px,520px)_minmax(270px,1fr)]
            items-center

            gap-[10px]

            lg:grid

            xl:grid-cols-[minmax(300px,1fr)_minmax(430px,560px)_minmax(300px,1fr)]
            xl:gap-[14px]
          "
        >
          {/* ---------------------------------------------------------------
              LEFT SERVICES
          ---------------------------------------------------------------- */}

          <div
            dir="rtl"
            className="
              relative
              z-20

              flex
              h-[430px]
              flex-col
              justify-between

              py-4
            "
          >
            {LEFT_SERVICES.map((service) => (
              <DesktopServiceCard
                key={service.href}
                service={service}
                side="left"
              />
            ))}
          </div>

          {/* ---------------------------------------------------------------
              CENTRAL VISUAL
          ---------------------------------------------------------------- */}

          <div
            className="
              relative
              z-10

              flex
              h-[500px]
              items-center
              justify-center

              xl:h-[530px]
            "
          >
            <span
              aria-hidden="true"
              className="
                pointer-events-none

                absolute
                left-1/2
                top-1/2

                h-[320px]
                w-[320px]

                -translate-x-1/2
                -translate-y-1/2

                rounded-full

                bg-brand-primary/[0.10]

                blur-[80px]
              "
            />

            <picture
              aria-hidden="true"
              className="
                relative
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

              <img
                {...desktopVisual}
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

          {/* ---------------------------------------------------------------
              RIGHT SERVICES
          ---------------------------------------------------------------- */}

          <div
            dir="rtl"
            className="
              relative
              z-20

              flex
              h-[430px]
              flex-col
              justify-between

              py-4
            "
          >
            {RIGHT_SERVICES.map((service) => (
              <DesktopServiceCard
                key={service.href}
                service={service}
                side="right"
              />
            ))}
          </div>
        </div>

        {/* =================================================================
            MOBILE VISUAL
        ================================================================== */}

        <div
          className="
            relative

            mt-6

            h-[245px]

            lg:hidden

            sm:h-[310px]
          "
        >
          <span
            aria-hidden="true"
            className="
              pointer-events-none

              absolute
              left-1/2
              top-1/2

              h-[190px]
              w-[190px]

              -translate-x-1/2
              -translate-y-1/2

              rounded-full

              bg-brand-primary/[0.10]

              blur-[55px]
            "
          />

          <picture
            aria-hidden="true"
            className="
              relative
              z-10

              block
              h-full
              w-full
            "
          >
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
            MOBILE SERVICES
        ================================================================== */}

        <ul
          className="
            mt-3

            space-y-[7px]

            lg:hidden
          "
        >
          {SERVICES.map((service) => (
            <li key={service.href}>
              <MobileServiceCard service={service} />
            </li>
          ))}
        </ul>

        {/* =================================================================
            FEATURE STRIP
        ================================================================== */}

        <ul
          aria-label="ویژگی‌های خدمات DNH"
          className="
            mt-6

            grid
            grid-cols-3

            overflow-hidden

            rounded-[22px]

            border
            border-line

            bg-page/[0.62]

            shadow-[0_12px_32px_color-mix(in_srgb,var(--dnh-primary)_5%,transparent)]

            backdrop-blur-[14px]

            lg:mt-2
          "
        >
          {FEATURES.map((item, index) => (
            <li
              key={item.title}
              className={cn(
                "min-w-0",
                index !== FEATURES.length - 1 && "border-l border-line",
              )}
            >
              <FeatureCard item={item} />
            </li>
          ))}
        </ul>

        {/* =================================================================
            DESKTOP CTA
        ================================================================== */}

        <div
          className="
            mt-7

            hidden
            items-center
            justify-center

            gap-3

            lg:flex
          "
        >
          <SecondaryAction />

          <PrimaryAction />
        </div>

        {/* =================================================================
            MOBILE CTA
        ================================================================== */}

        <div
          className="
            mt-5

            space-y-[9px]

            lg:hidden
          "
        >
          <PrimaryAction mobile />

          <SecondaryAction mobile />
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   Desktop Service Card
============================================================================= */

function DesktopServiceCard({
  service,
  side,
}: {
  service: ServiceItem;
  side: "left" | "right";
}) {
  const Icon = service.icon;

  return (
    <Link
      href={service.href}
      className="
        group/service

        relative

        flex
        min-h-[118px]
        items-center

        overflow-hidden

        rounded-[22px]

        border
        border-line

        bg-page/[0.73]

        px-[13px]
        py-[12px]

        shadow-[0_12px_30px_color-mix(in_srgb,var(--dnh-primary)_6%,transparent)]

        backdrop-blur-[14px]

        outline-none

        touch-manipulation

        transition-[transform,box-shadow,border-color,background-color]
        duration-[500ms]
        ease-[cubic-bezier(.22,1,.36,1)]

        hover:-translate-y-[3px]

        hover:border-line-strong/30
        hover:bg-page/[0.92]

        hover:shadow-[0_20px_45px_color-mix(in_srgb,var(--dnh-primary)_12%,transparent)]

        active:translate-y-[1px]
        active:scale-[0.985]

        focus-visible:ring-4
        focus-visible:ring-focus/20

        motion-reduce:transition-none
        motion-reduce:transform-none
      "
    >
      <div
        className={cn(
          `
            flex
            w-full
            items-center
            gap-[13px]
          `,
          side === "left" ? "flex-row" : "flex-row-reverse",
        )}
      >
        <ServiceIcon icon={Icon} tone={service.tone} />

        <div
          className={cn(
            `
              min-w-0
              flex-1
            `,
            side === "left" ? "text-right" : "text-right",
          )}
        >
      

          <h3
            className="
              mt-[2px]

              text-[12px]
              font-black

              leading-[1.75]

              text-ink

              transition-colors
              duration-300

              group-hover/service:text-brand-primary

              xl:text-[13px]
            "
          >
            {service.title}
          </h3>

          <p
            className="
              mt-[3px]

              text-[8px]
              font-medium

              leading-[1.85]

              text-ink-muted

              xl:text-[8.5px]
            "
          >
            {service.description}
          </p>
        </div>

        <span
          className="
            flex
            h-[29px]
            w-[29px]
            shrink-0
            items-center
            justify-center

            rounded-full

            bg-surface-soft

            text-brand-primary

            opacity-0

            transition-[transform,opacity,background-color,color]
            duration-[400ms]
            ease-[cubic-bezier(.22,1,.36,1)]

            group-hover/service:-translate-x-[2px]
            group-hover/service:bg-brand-primary
            group-hover/service:text-[var(--dnh-text-on-brand)]
            group-hover/service:opacity-100

            group-active/service:scale-[0.88]

            motion-reduce:transition-none
          "
        >
          <ArrowLeft
            aria-hidden="true"
            strokeWidth={1.7}
            className="
              h-[12px]
              w-[12px]
            "
          />
        </span>
      </div>

      {/* glow */}

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -right-[70px]
          -top-[70px]

          h-[150px]
          w-[150px]

          rounded-full

          bg-brand-primary/[0.09]

          opacity-0

          blur-[50px]

          transition-opacity
          duration-500

          group-hover/service:opacity-100
        "
      />
    </Link>
  );
}

/* =============================================================================
   Mobile Service
============================================================================= */

function MobileServiceCard({ service }: { service: ServiceItem }) {
  const Icon = service.icon;

  return (
    <Link
      href={service.href}
      className="
        group/mobile-service

        flex
        min-h-[69px]
        items-center
        gap-[10px]

        rounded-[18px]

        border
        border-line

        bg-page/[0.72]

        px-[10px]
        py-[8px]

        shadow-[0_8px_22px_color-mix(in_srgb,var(--dnh-primary)_5%,transparent)]

        backdrop-blur-[13px]

        outline-none

        touch-manipulation

        transition-[transform,box-shadow,border-color,background-color]
        duration-[450ms]
        ease-[cubic-bezier(.22,1,.36,1)]

        hover:-translate-y-[2px]
        hover:border-line-strong/25
        hover:bg-page/[0.90]

        active:translate-y-[1px]
        active:scale-[0.98]

        active:shadow-[0_5px_16px_color-mix(in_srgb,var(--dnh-primary)_8%,transparent)]

        focus-visible:ring-3
        focus-visible:ring-focus/20

        motion-reduce:transition-none
        motion-reduce:transform-none
      "
    >
      <ServiceIcon icon={Icon} tone={service.tone} mobile />

      <div className="min-w-0 flex-1">
        <h3
          className="
            text-[10px]
            font-black

            leading-[1.7]

            text-ink

            transition-colors

            group-hover/mobile-service:text-brand-primary

            sm:text-[11px]
          "
        >
          {service.title}
        </h3>

        <p
          className="
            mt-[2px]

            line-clamp-1

            text-[7.5px]
            font-medium

            text-ink-muted

            sm:text-[8px]
          "
        >
          {service.description}
        </p>
      </div>

      <span
        className="
          flex
          h-[29px]
          w-[29px]
          shrink-0
          items-center
          justify-center

          rounded-full

          bg-surface-soft

          text-brand-primary

          transition-[transform,background-color,color]
          duration-[350ms]

          group-hover/mobile-service:-translate-x-[2px]

          group-active/mobile-service:scale-[0.86]
          group-active/mobile-service:bg-brand-primary
          group-active/mobile-service:text-[var(--dnh-text-on-brand)]
        "
      >
        <ArrowLeft
          aria-hidden="true"
          strokeWidth={1.7}
          className="
            h-[12px]
            w-[12px]
          "
        />
      </span>
    </Link>
  );
}

/* =============================================================================
   Unified service icon
============================================================================= */

function ServiceIcon({
  icon: Icon,
  tone,
  mobile = false,
}: {
  icon: LucideIcon;
  tone: ServiceItem["tone"];
  mobile?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        `
          relative

          flex
          shrink-0
          items-center
          justify-center

          overflow-hidden

          rounded-full

          border
          border-line

          bg-page/[0.80]

          shadow-[0_8px_22px_color-mix(in_srgb,var(--dnh-primary)_8%,transparent)]

          transition-[transform,box-shadow]
          duration-[450ms]
          ease-[cubic-bezier(.22,1,.36,1)]

          group-hover/service:scale-[1.04]
          group-hover/mobile-service:scale-[1.04]

          group-active/service:scale-[0.92]
          group-active/mobile-service:scale-[0.92]

          motion-reduce:transition-none
          motion-reduce:transform-none
        `,
        mobile
          ? "h-[42px] w-[42px]"
          : "h-[58px] w-[58px] xl:h-[62px] xl:w-[62px]",
      )}
    >
      <span
        className={cn(
          `
            absolute
            inset-[5px]

            rounded-full

            blur-[12px]
          `,
          tone === "orange"
            ? "bg-brand-accent/[0.13]"
            : "bg-brand-primary/[0.12]",
        )}
      />

      <Icon
        strokeWidth={1.55}
        className={cn(
          `
            relative
            z-10
          `,
          mobile ? "h-[17px] w-[17px]" : "h-[23px] w-[23px]",
          tone === "orange" ? "text-brand-accent" : "text-brand-primary",
        )}
      />
    </span>
  );
}

/* =============================================================================
   Feature Card
============================================================================= */

function FeatureCard({ item }: { item: FeatureItem }) {
  const Icon = item.icon;

  return (
    <div
      className="
        group/feature

        flex
        min-h-[102px]
        flex-col
        items-center
        justify-center

        gap-[6px]

        px-2
        py-3

        text-center

        touch-manipulation

        transition-[transform,background-color]
        duration-[450ms]
        ease-[cubic-bezier(.22,1,.36,1)]

        hover:bg-page/70

        active:scale-[0.97]

        motion-reduce:transition-none
        motion-reduce:transform-none

        sm:min-h-[108px]

        lg:min-h-[91px]
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
          h-[37px]
          w-[37px]
          shrink-0
          items-center
          justify-center

          rounded-full

          bg-surface-soft

          text-brand-primary

          transition-transform
          duration-[400ms]

          group-hover/feature:scale-[1.07]

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

function PrimaryAction({ mobile = false }: { mobile?: boolean }) {
  return (
    <ActionButton
      href="/services"
      variant="primary"
      size="md"
      icon={ArrowLeft}
      iconPosition="end"
      fullWidth={mobile}
      className={mobile ? "" : "min-w-[210px]"}
    >
      مشاهده همه خدمات
    </ActionButton>
  );
}

/* =============================================================================
   Secondary CTA
============================================================================= */

function SecondaryAction({ mobile = false }: { mobile?: boolean }) {
  return (
    <ActionButton
      href="/request-strategic-consultation"
      variant="secondary"
      size="md"
      icon={ArrowLeft}
      iconPosition="end"
      fullWidth={mobile}
      className={mobile ? "" : "min-w-[210px]"}
    >
      درخواست مشاوره راهبردی
    </ActionButton>
  );
}
