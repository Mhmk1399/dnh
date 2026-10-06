import {
  ArrowDownLeft,
  ArrowLeft,
  Droplets,
  Layers3,
  ShieldCheck,
  Target,
  type LucideIcon,
} from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   PRIVATE WEALTH STRATEGY HERO
   Server Component
============================================================================= */

const WEALTH_DIMENSIONS = [
  {
    title: "دارایی‌ها",
    description: "آنچه امروز در ساختار ثروت وجود دارد",
    icon: Layers3,
  },
  {
    title: "اهداف",
    description: "آنچه ثروت باید در خدمت آن باشد",
    icon: Target,
  },
  {
    title: "نقدشوندگی",
    description: "انعطاف و دسترسی به منابع",
    icon: Droplets,
  },
  {
    title: "ریسک",
    description: "آنچه می‌تواند ساختار را آسیب‌پذیر کند",
    icon: ShieldCheck,
  },
] as const;

export function PrivateWealthStrategyHero() {
  return (
    <section
      id="wealth-strategy-intro"
      dir="rtl"
      aria-labelledby="wealth-strategy-hero-title"
      className="
        relative isolate
        min-h-[100svh]
        scroll-mt-24 overflow-hidden
        bg-[#022f3e] text-white
        sm:scroll-mt-28
      "
    >
      <HeroBackground />

      <div
        className="
          dnh-site-shell
          relative z-10
          mx-auto flex min-h-[100svh] w-full max-w-[1536px]
          flex-col

          px-5 pb-8 pt-[116px]
          sm:px-8 sm:pb-10 sm:pt-[126px]
          lg:px-12 lg:pb-10 lg:pt-[108px]
          xl:px-16
          2xl:px-20
        "
      >
        {/* =======================================================
            Hero content
        ======================================================== */}

        <div
          className="
            grid flex-1 items-center gap-12 py-12

            lg:grid-cols-[0.96fr_1.04fr]
            lg:gap-16
            lg:py-9

            xl:grid-cols-[1fr_1fr]
            xl:gap-20
          "
        >
          {/* =====================================================
              VISUAL — LEFT
          ====================================================== */}

          <div
            className="
              order-2
              lg:col-start-2
              lg:row-start-1
            "
          >
            <WealthStructureView />
          </div>

          {/* =====================================================
              COPY — RIGHT
          ====================================================== */}

          <div
            className="
              contents

              lg:block
              lg:col-start-1
              lg:row-start-1
            "
          >
            <div className="order-1">
            <div className="mb-5 flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-10 bg-brand-accent" />

              <p
                className="
                  text-[10px] font-black text-white/68
                  sm:text-[11px]
                "
              >
                استراتژی ثروت خصوصی
              </p>
            </div>

            {/* ===================================================
                ONE H1
            ==================================================== */}

            <h1
              id="wealth-strategy-hero-title"
              className="
                max-w-[850px]

                text-[36px]
                font-black
                leading-[1.62]
                tracking-[-0.05em]

                text-white

                sm:text-[44px]

                lg:text-[52px]
                lg:leading-[1.52]

                xl:text-[59px]
              "
            >
              استراتژی ثروت خصوصی؛
              <br />
              برای دیدن{" "}
              <span className="text-brand-accent">تصویر کامل‌تر ثروت.</span>
            </h1>

            <p
              className="
                mt-6 max-w-[700px]

                text-[13px]
                font-medium
                leading-[2.2]

                text-white/57

                sm:text-[14px]
                lg:text-[15px]
              "
            >
              برای افراد، خانواده‌ها و صاحبان سرمایه‌ای که می‌خواهند دارایی‌ها،
              اهداف، نقدشوندگی و ریسک را نه جدا از هم، بلکه در یک تصویر منسجم‌تر
              ببینند.
            </p>

            </div>

            {/* ===================================================
                CTA
            ==================================================== */}

            <div
              className="
                order-3
                mt-0
                flex flex-col gap-3

                lg:order-none
                lg:mt-8

                sm:flex-row sm:flex-wrap
              "
            >
              <ActionButton
                href="/fa/financial-decision-assessment"
                variant="assessment"
                size="lg"
                icon={ArrowLeft}
                className="
                  w-full
                  bg-brand-accent
                  text-white

                  shadow-[0_18px_48px_rgba(252,133,2,.18)]

                  hover:-translate-y-0.5
                  hover:bg-[#eb7c01]

                  sm:w-auto
                  sm:min-w-[285px]
                "
              >
                ارزیابی اولیه ساختار ثروت
              </ActionButton>

              <ActionButton
                href="#wealth-strategy-fit"
                variant="secondary"
                size="lg"
                icon={ArrowDownLeft}
                className="
                  w-full

                  border-white/20
                  bg-white/[0.025]

                  text-white
                  shadow-none

                  hover:border-white/38
                  hover:bg-white/[0.065]
                  hover:text-white

                  sm:w-auto
                  sm:min-w-[230px]
                "
              >
                این خدمت برای چه کسانی است؟
              </ActionButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   WEALTH STRUCTURE VIEW

   Meaning:
   4 dimensions are not shown as separate "products".
   They are gathered into one structural view of wealth.
============================================================================= */

function WealthStructureView() {
  return (
    <div
      className="
        group/view
        relative

        mx-auto
        w-full
        max-w-[650px]

        overflow-hidden

        border
        border-white/12

        bg-white/[0.025]

        shadow-[0_40px_120px_rgba(0,0,0,.19)]

        transition-[transform,border-color,box-shadow]
        duration-500
        ease-[cubic-bezier(.22,1,.36,1)]

        hover:-translate-y-[3px]
        hover:border-white/20
        hover:shadow-[0_48px_135px_rgba(0,0,0,.24)]
      "
    >
      <VisualBackground />

      {/* =========================================================
          Header
      ========================================================== */}

      <div
        className="
          relative z-10

          flex items-center justify-between gap-5

          border-b border-white/10

          px-5 py-5
          sm:px-6
        "
      >
        <div>
          <p
            className="
              text-[10px]
              font-black

              text-white/72
            "
          >
            یک تصویر، چند لایه
          </p>

          <p
            className="
              mt-1
              text-[8px]
              font-medium
              text-white/30
            "
          >
            هر جزء در نسبت با کل ساختار دیده می‌شود.
          </p>
        </div>

        <span
          aria-hidden="true"
          className="
            flex items-center gap-2
          "
        >
          <span
            className="
              h-[6px] w-[6px]
              bg-brand-accent
              shadow-[0_0_15px_rgba(252,133,2,.50)]
            "
          />

          <span
            className="
              h-px w-9
              bg-white/14

              transition-[width,background-color]
              duration-500

              group-hover/view:w-14
              group-hover/view:bg-brand-accent/55
            "
          />
        </span>
      </div>

      {/* =========================================================
          Dimensions
      ========================================================== */}

      <div
        className="
          relative z-10
          px-5 py-5
          sm:px-6 sm:py-6
        "
      >
        <div
          className="
            relative
            border-x border-white/[0.07]
          "
        >
          {WEALTH_DIMENSIONS.map((item, index) => (
            <WealthDimension
              key={item.title}
              item={item}
              last={index === WEALTH_DIMENSIONS.length - 1}
            />
          ))}
        </div>

        {/* =======================================================
            Convergence
        ======================================================== */}

        <div
          aria-hidden="true"
          className="
            relative
            mx-auto
            h-12
            w-px

            bg-gradient-to-b
            from-[#82cee4]/36
            to-brand-accent/70
          "
        >
          <span
            className="
              wealth-flow-dot

              absolute
              left-1/2 top-0

              h-[6px] w-[6px]

              -translate-x-1/2

              bg-brand-accent

              shadow-[0_0_15px_rgba(252,133,2,.55)]
            "
          />
        </div>

        {/* =======================================================
            Outcome
        ======================================================== */}

        <div
          className="
            relative
            overflow-hidden

            border
            border-brand-accent/30

            bg-brand-accent/[0.065]

            px-5 py-5

            sm:px-6
          "
        >
          <span
            aria-hidden="true"
            className="
              absolute inset-y-0 right-0
              w-[4px]
              bg-brand-accent
            "
          />

          <div
            className="
              flex flex-col gap-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div>
              <p
                className="
                  text-[8px]
                  font-black
                  text-brand-accent
                "
              >
                تصویر مورد نظر
              </p>

              <p
                className="
                  mt-1.5
                  text-[15px]
                  font-black
                  leading-[1.85]

                  text-white

                  sm:text-[17px]
                "
              >
                ساختار ثروت، در یک تصویر منسجم‌تر.
              </p>
            </div>

            <div
              aria-hidden="true"
              className="
                flex items-center gap-2
              "
            >
              <span
                className="
                  h-px w-10
                  bg-brand-accent/45

                  transition-[width]
                  duration-500

                  group-hover/view:w-16
                "
              />

              <span
                className="
                  h-[8px] w-[8px]
                  bg-brand-accent
                "
              />
            </div>
          </div>
        </div>
      </div>

      <VisualMotion />
    </div>
  );
}

/* =============================================================================
   DIMENSION
============================================================================= */

function WealthDimension({
  item,
  last,
}: {
  item: {
    title: string;
    description: string;
    icon: LucideIcon;
  };
  last: boolean;
}) {
  const Icon = item.icon;

  return (
    <div
      className={`
        group/layer
        relative

        grid
        gap-4

        px-4 py-4

        transition-colors
        duration-300

        hover:bg-white/[0.04]

        sm:grid-cols-[48px_120px_1fr]
        sm:items-center
        sm:px-5

        ${!last ? "border-b border-white/10" : ""}
      `}
    >
      <span
        className="
          flex h-10 w-10
          items-center justify-center

          border
          border-[#82cee4]/16

          bg-[#82cee4]/[0.04]

          text-[#82cee4]

          transition-[background-color,border-color,color]
          duration-300

          group-hover/layer:border-brand-accent/35
          group-hover/layer:bg-brand-accent/[0.07]
          group-hover/layer:text-brand-accent
        "
      >
        <Icon
          aria-hidden="true"
          className="h-[18px] w-[18px]"
          strokeWidth={1.45}
        />
      </span>

      <p
        className="
          text-[12px]
          font-black
          text-white/78

          sm:text-[13px]
        "
      >
        {item.title}
      </p>

      <p
        className="
          text-[9px]
          font-medium
          leading-[1.9]

          text-white/32

          sm:text-[10px]
        "
      >
        {item.description}
      </p>

      <span
        aria-hidden="true"
        className="
          absolute
          left-0 top-1/2

          h-[5px] w-[5px]

          -translate-y-1/2

          bg-[#82cee4]/32

          transition-[background-color,box-shadow,transform]
          duration-300

          group-hover/layer:scale-125
          group-hover/layer:bg-brand-accent
          group-hover/layer:shadow-[0_0_12px_rgba(252,133,2,.45)]
        "
      />
    </div>
  );
}

/* =============================================================================
   RAIL
============================================================================= */

function RailWord({
  children,
  active = false,
}: {
  children: string;
  active?: boolean;
}) {
  return (
    <span
      className={`
        text-[8px]
        font-black

        ${active ? "text-brand-accent" : "text-white/25"}
      `}
    >
      {children}
    </span>
  );
}

function RailDot() {
  return (
    <span
      aria-hidden="true"
      className="
        h-[4px]
        w-[4px]
        bg-white/14
      "
    />
  );
}

/* =============================================================================
   BACKGROUND
============================================================================= */

function HeroBackground() {
  return (
    <>
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
        "
        style={{
          background:
            "radial-gradient(circle at 23% 47%,rgba(22,115,148,.25),transparent 30%),linear-gradient(116deg,#022936 0%,#033847 52%,#022d3a 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          opacity-[0.055]
        "
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,.08) 1px,transparent 1px)",
          backgroundSize: "118px 100%",
        }}
      />

     
    </>
  );
}

function VisualBackground() {
  return (
    <>
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
        "
        style={{
          background:
            "radial-gradient(circle at 50% 65%,rgba(22,115,148,.15),transparent 36%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          opacity-[0.065]
        "
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,.08) 1px,transparent 1px)",
          backgroundSize: "72px 100%",
        }}
      />
    </>
  );
}

/* =============================================================================
   CSS MOTION
============================================================================= */

function VisualMotion() {
  return (
    <style>{`
      .wealth-flow-dot {
        animation:
          dnh-wealth-flow
          2.8s
          ease-in-out
          infinite;
      }

      @keyframes dnh-wealth-flow {
        0% {
          top: 0%;
          opacity: 0;
        }

        20% {
          opacity: 1;
        }

        75% {
          opacity: 1;
        }

        100% {
          top: 100%;
          opacity: 0;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .wealth-flow-dot {
          animation: none !important;
          top: 50%;
          opacity: .7;
        }
      }
    `}</style>
  );
}
