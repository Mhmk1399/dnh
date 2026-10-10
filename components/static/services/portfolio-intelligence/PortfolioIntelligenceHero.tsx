import Link from "next/link";

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
   PORTFOLIO INTELLIGENCE HERO
   Server Component
============================================================================= */

export function PortfolioIntelligenceHero() {
  return (
    <section
      id="portfolio-intelligence-intro"
      dir="rtl"
      aria-labelledby="portfolio-intelligence-title"
      className="
        relative isolate
        min-h-[100svh]
        scroll-mt-24
        overflow-hidden

        bg-[#022f3e]
        text-white

        sm:scroll-mt-28
      "
    >
      <HeroBackground />

      <div
        className="
          dnh-site-shell
          relative z-10

          mx-auto
          flex min-h-[100svh]
          w-full max-w-[1536px]
          flex-col

          px-5 pb-8 pt-[116px]

          sm:px-8
          sm:pb-10
          sm:pt-[126px]

          lg:px-12
          lg:pb-10
          lg:pt-[108px]

          xl:px-16
          2xl:px-20
        "
      >
       

        {/* =======================================================
            Main
        ======================================================== */}

        <div
          className="
            grid flex-1
            items-center
            gap-12
            py-12

            lg:grid-cols-[0.94fr_1.06fr]
            lg:gap-16
            lg:py-9

            xl:grid-cols-[1fr_1fr]
            xl:gap-20
          "
        >
          {/* =====================================================
              Visual
          ====================================================== */}

          <div
            className="
              order-2

              lg:col-start-2
              lg:row-start-1
            "
          >
            <PortfolioMeaningVisual />
          </div>

          <PortfolioHeroActions className="order-3 mt-0 lg:hidden" />

          {/* =====================================================
              Copy
          ====================================================== */}

          <div
            className="
              order-1

              lg:col-start-1
              lg:row-start-1
            "
          >
            <div className="mb-5 flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-10 bg-brand-accent" />

              <p
                className="
                  text-[10px]
                  font-black
                  text-white/68

                  sm:text-[11px]
                "
              >
                هوشمندی پرتفوی
              </p>
            </div>

            <h1
              id="portfolio-intelligence-title"
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
              هوشمندی پرتفوی؛
              <br />
              فراتر از{" "}
              <span className="text-brand-accent">تعداد دارایی‌ها.</span>
            </h1>

            <p
              className="
                mt-6
                max-w-[660px]

                text-[13px]
                font-medium
                leading-[2.2]

                text-white/54

                sm:text-[14px]
                lg:text-[15px]
              "
            >
              داشتن دارایی‌های متعدد، لزوماً به معنای داشتن پرتفوی منسجم نیست.
              ساختار، تمرکز ریسک و نقدشوندگی باید در کنار یکدیگر دیده شوند.
            </p>

            {/* ===================================================
                Actions
            ==================================================== */}

            <PortfolioHeroActions className="hidden mt-8 lg:flex" />

            {/* ===================================================
                Context link
            ==================================================== */}

            <div
              className="
                mt-7

                hidden
                flex-wrap
                items-center
                gap-x-4 gap-y-2

                border-t
                border-white/10

                pt-5

                lg:flex
              "
            >
              <span
                className="
                  text-[11px]
                  font-medium
                  text-white/27
                "
              >
                برای مسئله پرتفوی‌های پراکنده:
              </span>

              <Link
                href="/who-we-help/unstructured-portfolio"
                className="
                  inline-flex
                  items-center gap-2

                  text-[11px]
                  font-black
                  text-[#82cee4]

                  outline-none

                  transition-colors duration-300

                  hover:text-brand-accent

                  focus-visible:ring-2
                  focus-visible:ring-focus/50
                "
              >
                پرتفوی پراکنده و بدون معماری
                <ArrowLeft
                  aria-hidden="true"
                  className="h-3.5 w-3.5"
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Motion />
    </section>
  );
}

function PortfolioHeroActions({ className = "" }: { className?: string }) {
  return (
    <div
      className={`
        flex
        flex-col
        gap-3

        sm:flex-row
        sm:flex-wrap

        ${className}
      `}
    >
      <ActionButton
        href="/financial-decision-assessment"
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
          sm:min-w-[265px]
        "
      >
        ارزیابی اولیه پرتفوی
      </ActionButton>

      <ActionButton
        href="#portfolio-warning-signs"
        variant="secondary"
        size="lg"
        icon={ArrowDownLeft}
        className="
          w-full

          border-white/18
          bg-white/[0.025]

          text-white
          shadow-none

          hover:-translate-y-0.5
          hover:border-white/34
          hover:bg-white/[0.06]
          hover:text-white

          sm:w-auto
          sm:min-w-[245px]
        "
      >
        نشانه‌های پرتفوی نامنسجم
      </ActionButton>
    </div>
  );
}

/* =============================================================================
   VISUAL

   Message:
   Multiple assets ≠ structured portfolio
============================================================================= */

function PortfolioMeaningVisual() {
  return (
    <div
      className="
        group/visual
        relative

        mx-auto
        w-full
        max-w-[720px]

        overflow-hidden

        border
        border-white/12

        bg-[#053645]

        shadow-[0_38px_110px_rgba(0,0,0,.18)]
      "
    >
      <VisualBackground />

      {/* =========================================================
          Header
      ========================================================== */}

      <div
        className="
          relative z-20

          flex
          min-w-0
          items-center
          justify-between
          gap-5

          border-b
          border-white/10

          px-5 py-4

          sm:px-6
        "
      >
        <div className="min-w-0">
          <p
            className="
              text-[13px]
              font-black
              leading-[1.9]
              text-white/75
            "
          >
            هوشمندی یعنی دیدن رابطه‌ها
          </p>

          <p
            className="
              mt-1
              text-[10px]
              font-medium
              leading-[1.9]
              text-white/40
            "
          >
            از فهرست دارایی‌ها تا تصویری قابل تصمیم
          </p>
        </div>

        <span
          aria-hidden="true"
          className="
            h-[11px] w-[11px]

            bg-brand-accent

            shadow-[0_0_16px_rgba(252,133,2,.52)]
          "
        />
      </div>

      {/* =========================================================
          Main concept — assets / intelligence / decision
      ========================================================== */}

      <div
        className="
          relative z-10

          grid gap-0

          xl:grid-cols-[minmax(0,1fr)_112px_minmax(0,1.08fr)]
        "
      >
        {/* =======================================================
            Scattered assets
        ======================================================== */}

        <FlowPanel
          index="01"
          eyebrow="ورودی خام"
          title="دارایی‌های جدا از هم"
          text="اینجا فقط می‌دانیم چه دارایی‌هایی وجود دارد؛ هنوز معلوم نیست هرکدام چه نقشی در کل پرتفوی دارند."
          muted
        >
          <div
            className="
              mt-5
              grid
              grid-cols-2
              gap-2.5
            "
          >
            <AssetTile title="سهام" note="بازار" />
            <AssetTile title="ملک" note="کم‌نقدشونده" />
            <AssetTile title="طلا" note="پوشش ریسک" accent />
            <AssetTile title="صندوق" note="مدیریت‌شده" />
            <AssetTile title="سپرده" note="نقد" />
            <AssetTile title="کسب‌وکار" note="ریسک خاص" />
          </div>

          <div
            className="
              mt-4

              border-r
              border-[#82cee4]/16

              pr-3

              text-[10px]
              font-black
              leading-[1.9]

              text-white/42
            "
          >
            ابهام اصلی: آیا این اجزا با هم کار می‌کنند یا فقط کنار هم چیده
            شده‌اند؟
          </div>
        </FlowPanel>

        {/* =======================================================
            Intelligence layer
        ======================================================== */}

        <IntelligenceBridge />

        {/* =======================================================
            Decision picture
        ======================================================== */}

        <FlowPanel
          index="02"
          eyebrow="خروجی قابل تصمیم"
          title="تصویر خوانا از پرتفوی"
          text="بعد از بررسی رابطه‌ها، خروجی باید نشان دهد کجا ریسک، کجا نیاز نقدینگی و کجا نقش دارایی روشن‌تر می‌شود."
        >
          <div className="mt-5 space-y-2.5">
            <InsightCard
              icon={ShieldCheck}
              title="ریسک واقعی"
              text="تمرکزهای پنهان و حساسیت مشترک دارایی‌ها مشخص می‌شود."
              accent
            />

            <InsightCard
              icon={Droplets}
              title="نقدشوندگی"
              text="معلوم می‌شود سرمایه برای تصمیم‌های پیش رو چقدر آماده است."
            />

            <InsightCard
              icon={Layers3}
              title="نقش هر دارایی"
              text="هر جزء در نسبت با کل پرتفوی معنا پیدا می‌کند."
            />

            <InsightCard
              icon={Target}
              title="مسیر تصمیم"
              text="تصمیم بعدی از ساختار می‌آید، نه از واکنش لحظه‌ای به بازار."
            />
          </div>
        </FlowPanel>
      </div>

      {/* =========================================================
          Final meaning
      ========================================================== */}

      <div
        className="
          relative z-20

          border-t
          border-white/10

          bg-black/[0.08]

          px-5 py-5

          sm:px-6
        "
      >
        <div
          className="
            flex
            flex-col
            gap-2

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p
            className="
              text-[12px]
              font-black
              leading-[1.9]

              text-white
            "
          >
            سؤال اصلی: هر دارایی چه نقشی دارد و چه اثری بر تصمیم بعدی می‌گذارد؟
          </p>

          <span
            className="
              shrink-0

              text-[11px]
              font-black

              text-brand-accent
            "
          >
            رابطه، ریسک، نقدشوندگی
          </span>
        </div>
      </div>

      {/* =========================================================
          Scan
      ========================================================== */}

      <span
        aria-hidden="true"
        className="
          portfolio-scan

          pointer-events-none

          absolute
          bottom-0 top-[74px]

          w-[2px]

          bg-gradient-to-b
          from-transparent
          via-[#82cee4]
          to-transparent

          opacity-0

          shadow-[0_0_16px_rgba(130,206,228,.30)]
        "
      />
    </div>
  );
}

/* =============================================================================
   Flow panel
============================================================================= */

function FlowPanel({
  index,
  eyebrow,
  title,
  text,
  muted = false,
  children,
}: {
  index: string;
  eyebrow: string;
  title: string;
  text: string;
  muted?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        min-w-0
        px-5 py-7

        sm:px-6
        sm:py-8
      "
    >
      <div
        className="
          flex
          min-w-0
          items-start
          justify-between
          gap-4
        "
      >
        <div className="min-w-0">
          <p
            className={`
              text-[11px]
              font-black
              leading-[1.8]

              ${muted ? "text-[#82cee4]/58" : "text-brand-accent"}
            `}
          >
            {eyebrow}
          </p>

          <h3
            className="
              mt-2
              text-[15px]
              font-black
              leading-[1.85]
              text-white/82
            "
          >
            {title}
          </h3>
        </div>

        <span
          dir="ltr"
          className={`
            shrink-0
            pt-1
            text-[11px]
            font-black

            ${muted ? "text-white/25" : "text-brand-accent/75"}
          `}
        >
          {index}
        </span>
      </div>

      <p
        className="
          mt-3
          text-[10px]
          font-medium
          leading-[2]
          text-white/36
        "
      >
        {text}
      </p>

      {children}
    </div>
  );
}

/* =============================================================================
   Asset tile
============================================================================= */

function AssetTile({
  title,
  note,
  accent = false,
}: {
  title: string;
  note: string;
  accent?: boolean;
}) {
  return (
    <span
      className={`
        min-w-0

        border

        bg-white/[0.025]

        px-3 py-3

        transition-[border-color,background-color,transform]
        duration-300

        group-hover/visual:-translate-y-0.5

        ${
          accent
            ? "border-brand-accent/36 bg-brand-accent/[0.07]"
            : "border-[#82cee4]/16"
        }
      `}
    >
      <span
        className={`
          block
          break-words
          text-[11px]
          font-black
          leading-[1.7]

          ${accent ? "text-brand-accent" : "text-white/74"}
        `}
      >
        {title}
      </span>

      <span
        className="
          mt-1
          block
          break-words
          text-[11px]
          font-medium
          leading-[1.8]
          text-white/35
        "
      >
        {note}
      </span>
    </span>
  );
}

/* =============================================================================
   Intelligence bridge
============================================================================= */

function IntelligenceBridge() {
  return (
    <div
      className="
        relative

        flex
        min-h-[184px]
        min-w-0
        flex-col
        items-center
        justify-center
        gap-4

        border-y
        border-white/10

        px-5 py-6

        xl:min-h-0
        xl:border-x
        xl:border-y-0
        xl:px-3
        xl:py-0
      "
    >
      <span
        aria-hidden="true"
        className="
          portfolio-bridge-line

          absolute
          inset-y-6
          right-1/2

          w-px

          bg-gradient-to-b
          from-transparent
          via-brand-accent/55
          to-transparent

          xl:inset-x-2
          xl:inset-y-auto
          xl:top-1/2
          xl:h-px
          xl:w-auto
          xl:bg-gradient-to-l
        "
      />

      <span
        className="
          portfolio-bridge-node

          relative z-10

          flex
          h-[76px] w-[76px]

          items-center
          justify-center

          border
          border-brand-accent/42

          bg-[#063746]

          text-center
          text-[10px]
          font-black
          leading-[1.7]

          text-brand-accent

          shadow-[0_0_32px_rgba(252,133,2,.14)]
        "
      >
        تحلیل
        <br />
        رابطه‌ها
      </span>

      <div
        className="
          relative z-10

          grid
          w-full
          max-w-[280px]
          grid-cols-2
          gap-1.5

          text-center
          text-[11px]
          font-black
          leading-[1.7]
          text-[#82cee4]/62

          xl:grid-cols-1
        "
      >
        <BridgeToken>ریسک مشترک</BridgeToken>
        <BridgeToken>نقدشوندگی</BridgeToken>
        <BridgeToken>هدف</BridgeToken>
        <BridgeToken>افق تصمیم</BridgeToken>
      </div>
    </div>
  );
}

function BridgeToken({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="
        min-w-0
        border
        border-white/10
        bg-[#022f3e]/45
        px-2 py-1.5
      "
    >
      {children}
    </span>
  );
}

/* =============================================================================
   Insight card
============================================================================= */

function InsightCard({
  icon: Icon,
  title,
  text,
  accent = false,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
  accent?: boolean;
}) {
  return (
    <article
      className={`
        portfolio-insight-card

        grid
        grid-cols-[38px_1fr]
        gap-3
        min-w-0

        border

        px-3.5 py-3.5

        transition-[border-color,background-color,transform]
        duration-300

        group-hover/visual:-translate-x-0.5

        ${
          accent
            ? "border-brand-accent/26 bg-brand-accent/[0.055]"
            : "border-white/[0.075] bg-white/[0.025]"
        }
      `}
    >
      <span
        className={`
          flex
          h-9 w-9
          shrink-0
          items-center
          justify-center

          border

          ${
            accent
              ? "border-brand-accent/34 bg-brand-accent/[0.08] text-brand-accent"
              : "border-[#82cee4]/16 bg-[#82cee4]/[0.045] text-[#82cee4]"
          }
          `}
        >
        <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.45} />
      </span>

      <div className="min-w-0">
        <h3
          className={`
            break-words
            text-[10px]
            font-black
            leading-[1.8]

            ${accent ? "text-brand-accent" : "text-white/76"}
          `}
        >
          {title}
        </h3>

        <p
          className="
            mt-1

            break-words
            text-[11px]
            font-medium
            leading-[1.9]

            text-white/35
          "
        >
          {text}
        </p>
      </div>
    </article>
  );
}

/* =============================================================================
   Background
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
            "radial-gradient(circle at 22% 48%,rgba(22,115,148,.22),transparent 30%),linear-gradient(116deg,#022936 0%,#033847 52%,#022d3a 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0

          opacity-[0.045]
        "
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,.08) 1px,transparent 1px)",
          backgroundSize: "118px 100%",
        }}
      />

      <span
        aria-hidden="true"
        className="
          absolute
          right-[18%] top-0

          h-[11px] w-[2px]

          bg-brand-accent
        "
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
            "radial-gradient(circle at 70% 48%,rgba(22,115,148,.14),transparent 38%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0

          opacity-[0.045]
        "
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,.07) 1px,transparent 1px)",
          backgroundSize: "72px 100%",
        }}
      />
    </>
  );
}

/* =============================================================================
   CSS-only motion
============================================================================= */

function Motion() {
  return (
    <style>{`
      .portfolio-scan {
        animation:
          dnh-portfolio-scan
          5.4s
          ease-in-out
          infinite;
      }

      .portfolio-bridge-node {
        animation:
          dnh-portfolio-node
          3.6s
          ease-in-out
          infinite;
      }

      .portfolio-bridge-line {
        animation:
          dnh-portfolio-flow
          3.8s
          ease-in-out
          infinite;
      }

      @keyframes dnh-portfolio-scan {
        0% {
          left: -4%;
          opacity: 0;
        }

        15% {
          opacity: .35;
        }

        75% {
          opacity: .35;
        }

        100% {
          left: 104%;
          opacity: 0;
        }
      }

      @keyframes dnh-portfolio-node {
        0%,
        100% {
          box-shadow:
            0 0 24px rgba(252,133,2,.10),
            inset 0 0 0 rgba(252,133,2,0);
        }

        50% {
          box-shadow:
            0 0 36px rgba(252,133,2,.18),
            inset 0 0 18px rgba(252,133,2,.08);
        }
      }

      @keyframes dnh-portfolio-flow {
        0% {
          opacity: .12;
          transform: scaleY(.82);
        }

        50% {
          opacity: .55;
          transform: scaleY(1);
        }

        100% {
          opacity: .12;
          transform: scaleY(.82);
        }
      }

      @media (min-width: 1280px) {
        @keyframes dnh-portfolio-flow {
          0% {
            opacity: .12;
            transform: scaleX(.82);
          }

          50% {
            opacity: .55;
            transform: scaleX(1);
          }

          100% {
            opacity: .12;
            transform: scaleX(.82);
          }
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .portfolio-scan,
        .portfolio-bridge-node,
        .portfolio-bridge-line {
          animation: none !important;
        }

        .portfolio-scan {
          display: none;
        }
      }
    `}</style>
  );
}
