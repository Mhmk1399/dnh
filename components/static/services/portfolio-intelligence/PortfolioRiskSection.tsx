import Link from "next/link";
import Image from "next/image";

import { ArrowDownLeft, ArrowUpLeft, Eye, ShieldAlert } from "lucide-react";

/* =============================================================================
   PORTFOLIO RISK CONCENTRATION
   Server Component
============================================================================= */

export function PortfolioRiskSection() {
  return (
    <section
      id="portfolio-risk"
      dir="rtl"
      aria-labelledby="portfolio-risk-title"
      className="
        relative isolate
        scroll-mt-24 overflow-hidden

        bg-[#032f3f]
        text-white

        sm:scroll-mt-28
      "
    >
      <Background />

      <div
        className="
          dnh-site-shell
          relative z-10

          mx-auto
          w-full max-w-[1536px]

          px-5 py-16
          sm:px-8 sm:py-20
          lg:px-12 lg:py-24
          xl:px-16 xl:py-28
          2xl:px-20
        "
      >
        <div
          className="
            grid
            gap-12

            lg:grid-cols-[1.08fr_0.92fr]
            lg:items-center
            lg:gap-16

            xl:gap-20
          "
        >
          {/* =====================================================
              VISUAL — LEFT
          ====================================================== */}
          <div
            className="
              order-2 w-full 
 relative
              lg:order-2
            "
          >
            <Image
              src="/assets/images/risk.png"
              alt="Risk Concentration"
              width={2000}
              height={2000}
            />
          </div>

          {/* =====================================================
              COPY — RIGHT
          ====================================================== */}

          <div
            className="
              order-1

              lg:order-1
            "
          >
            <div
              className="
                mb-5
                flex items-center gap-3
              "
            >
              <span
                aria-hidden="true"
                className="
                  h-px w-10
                  bg-brand-accent
                "
              />

              <span
                className="
                  text-[10px]
                  font-black
                  text-white/62

                  sm:text-[11px]
                "
              >
                تمرکز ریسک
              </span>
            </div>

            <h2
              id="portfolio-risk-title"
              className="
                max-w-[760px]

                text-[31px]
                font-black
                leading-[1.65]
                tracking-[-0.045em]

                text-white

                sm:text-[38px]

                lg:text-[45px]
                lg:leading-[1.55]

                xl:text-[50px]
              "
            >
              چند دارایی متفاوت،
              <br />
              ممکن است هنوز به{" "}
              <span className="text-brand-accent">یک ریسک مشترک</span> متصل
              باشند.
            </h2>

            <p
              className="
                mt-6
                max-w-[610px]

                text-[13px]
                font-medium
                leading-[2.2]

                text-white/48

                sm:text-[14px]
              "
            >
              چیزی که در ظاهر متنوع دیده می‌شود، ممکن است در سطح ریسک همچنان
              تمرکز داشته باشد. به همین دلیل، تعداد دارایی‌ها به‌تنهایی معیار
              کافی برای شناخت ساختار پرتفوی نیست.
            </p>

            {/* ===================================================
                Three quick principles
            ==================================================== */}

            <div
              className="
                mt-9

                border-y
                border-white/10
              "
            >
              <Principle
                title="تنوع دارایی"
                text="می‌گوید چند جزء متفاوت در پرتفوی وجود دارد."
              />

              <Principle
                title="توزیع ریسک"
                text="نشان می‌دهد ریسک واقعاً تا چه اندازه در ساختار پخش شده است."
              />

              <Principle
                title="نقطه قابل توجه"
                text="جایی است که تمرکز می‌تواند نیازمند بررسی دقیق‌تر باشد."
                accent
              />
            </div>

            {/* ===================================================
                Internal link
            ==================================================== */}

            <div
              className="
                mt-7

                flex flex-wrap
                items-center
                gap-x-4 gap-y-3
              "
            >
              <span
                className="
                  text-[9px]
                  font-medium
                  text-white/27
                "
              >
                برای نگاه گسترده‌تر به ریسک:
              </span>

              <Link
                href="/services/risk-management-wealth-protection"
                className="
                  group/risk-link

                  inline-flex
                  min-h-10
                  items-center gap-2

                  text-[9px]
                  font-black

                  text-[#82cee4]

                  outline-none

                  transition-colors duration-300

                  hover:text-brand-accent

                  focus-visible:ring-2
                  focus-visible:ring-focus/50
                "
              >
                مدیریت ریسک و حفاظت از ثروت
                <ArrowUpLeft
                  aria-hidden="true"
                  className="
                    h-3.5 w-3.5

                    transition-transform duration-300

                    group-hover/risk-link:
                    -translate-x-0.5

                    group-hover/risk-link:
                    -translate-y-0.5
                  "
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          </div>
        </div>

        {/* =======================================================
            NEXT
        ======================================================== */}

        <div
          className="
            mt-10

            flex
            justify-end

            border-t
            border-white/10

            pt-6
          "
        >
          <Link
            href="#portfolio-outcome"
            className="
              group/next

              inline-flex
              min-h-11

              items-center gap-3

              text-[10px]
              font-black

              text-[#82cee4]

              outline-none

              transition-colors duration-300

              hover:text-brand-accent

              focus-visible:ring-2
              focus-visible:ring-focus/50
            "
          >
            بعد از بررسی، چه چیزی روشن‌تر می‌شود؟
            <ArrowDownLeft
              aria-hidden="true"
              className="
                h-4 w-4

                transition-transform duration-300

                group-hover/next:
                translate-y-1

                group-hover/next:
                -translate-x-1
              "
              strokeWidth={1.6}
            />
          </Link>
        </div>
      </div>

      <Motion />
    </section>
  );
}

/* =============================================================================
   RISK LENS VISUAL
============================================================================= */

function RiskLensVisual() {
  return (
    <div
      className="
        group/lens
        relative

        mx-auto
        w-full
        max-w-[650px]

        overflow-hidden

        border
        border-white/12

        bg-[#063746]

        shadow-[0_38px_110px_rgba(0,0,0,.18)]
      "
    >
      <LensBackground />

      {/* =========================================================
          Header
      ========================================================== */}

      <div
        className="
          relative z-20

          flex
          items-center
          justify-between
          gap-5

          border-b
          border-white/10

          px-5 py-5

          sm:px-6
        "
      >
        <div
          className="
            flex items-center gap-3
          "
        >
          <Eye
            aria-hidden="true"
            className="
              h-4 w-4
              text-[#82cee4]
            "
            strokeWidth={1.5}
          />

          <div>
            <p
              className="
                text-[10px]
                font-black

                text-white/74
              "
            >
              نگاه به زیرِ تنوع ظاهری
            </p>

            <p
              className="
                mt-1
                text-[8px]
                font-medium

                text-white/27
              "
            >
              نمای مفهومی؛ نه امتیازدهی پرتفوی
            </p>
          </div>
        </div>

        <span
          aria-hidden="true"
          className="
            h-[7px] w-[7px]

            bg-brand-accent

            shadow-[0_0_16px_rgba(252,133,2,.5)]
          "
        />
      </div>

      {/* =========================================================
          Diagram
      ========================================================== */}

      <div
        className="
          relative z-10

          px-5
          pb-7
          pt-8

          sm:px-7
          sm:pb-8
          sm:pt-9
        "
      >
        {/* =======================================================
            Visible portfolio
        ======================================================== */}

        <div>
          <div
            className="
              flex
              items-end
              justify-between
              gap-5
            "
          >
            <div>
              <p
                className="
                  text-[9px]
                  font-black

                  text-[#82cee4]/65
                "
              >
                آنچه در ظاهر دیده می‌شود
              </p>

              <p
                className="
                  mt-1.5

                  text-[12px]
                  font-black

                  text-white/75
                "
              >
                چند بخش متفاوت در پرتفوی
              </p>
            </div>

            <span
              className="
                text-[9px]
                font-bold

                text-white/25
              "
            >
              تنوع دارایی
            </span>
          </div>

          {/* asset cells */}

          <div
            className="
              mt-5
              grid grid-cols-6
              gap-2
            "
          >
            <Asset />
            <Asset />
            <Asset />
            <Asset />
            <Asset />
            <Asset />
          </div>
        </div>

        {/* =======================================================
            Connector
        ======================================================== */}

        <div
          className="
            relative
            mx-auto

            h-14
            w-px

            bg-gradient-to-b
            from-[#82cee4]/25
            to-brand-accent/50
          "
        >
          <span
            aria-hidden="true"
            className="
              risk-flow

              absolute
              left-1/2
              top-0

              h-7 w-[2px]

              -translate-x-1/2

              bg-gradient-to-b
              from-transparent
              via-brand-accent
              to-transparent
            "
          />
        </div>

        {/* =======================================================
            Underlying risk layer
        ======================================================== */}

        <div
          className="
            relative

            border
            border-white/10

            bg-black/[0.08]

            px-5 py-6
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              gap-6
            "
          >
            <div>
              <p
                className="
                  text-[9px]
                  font-black

                  text-brand-accent
                "
              >
                آنچه باید در سطح ریسک دیده شود
              </p>

              <p
                className="
                  mt-1.5

                  text-[12px]
                  font-black

                  text-white/72
                "
              >
                ریسک چگونه در کل ساختار توزیع شده است؟
              </p>
            </div>

            <ShieldAlert
              aria-hidden="true"
              className="
                h-5 w-5
                shrink-0

                text-brand-accent
              "
              strokeWidth={1.45}
            />
          </div>

          {/* -----------------------------------------------------
              Conceptual Risk Map
          ------------------------------------------------------ */}

          <div
            className="
              relative

              mt-7
              h-[190px]

              overflow-hidden

              border-y
              border-white/[0.07]
            "
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 600 190"
              preserveAspectRatio="none"
              className="
                absolute inset-0
                h-full w-full
              "
              fill="none"
            >
              {/* connectors from apparent assets */}

              <path
                d="M55 0 C55 48 120 58 150 95"
                stroke="#78c9df"
                strokeOpacity=".24"
              />

              <path
                d="M155 0 C155 45 165 62 150 95"
                stroke="#78c9df"
                strokeOpacity=".27"
              />

              <path
                d="M255 0 C255 42 320 57 350 95"
                stroke="#78c9df"
                strokeOpacity=".24"
              />

              <path
                d="M355 0 C355 44 360 61 350 95"
                stroke="#FC8502"
                strokeOpacity=".72"
                strokeWidth="1.6"
              />

              <path
                d="M455 0 C455 45 405 60 350 95"
                stroke="#FC8502"
                strokeOpacity=".52"
                strokeWidth="1.3"
              />

              <path
                d="M545 0 C545 47 505 64 490 95"
                stroke="#78c9df"
                strokeOpacity=".24"
              />

              {/* lower relationship */}

              <path
                d="M150 95 C205 145 290 145 350 95"
                stroke="#78c9df"
                strokeOpacity=".12"
              />

              <path
                d="M350 95 C400 137 450 130 490 95"
                stroke="#78c9df"
                strokeOpacity=".12"
              />

              {/* risk nodes */}

              <circle
                cx="150"
                cy="95"
                r="19"
                fill="#0A4557"
                stroke="#78C9DF"
                strokeOpacity=".4"
              />

              <circle
                cx="350"
                cy="95"
                r="32"
                fill="#FC8502"
                fillOpacity=".12"
                stroke="#FC8502"
                strokeOpacity=".9"
                strokeWidth="1.5"
              />

              <circle
                cx="490"
                cy="95"
                r="17"
                fill="#0A4557"
                stroke="#78C9DF"
                strokeOpacity=".35"
              />

              <circle cx="150" cy="95" r="4" fill="#78C9DF" fillOpacity=".7" />

              <circle cx="350" cy="95" r="7" fill="#FC8502" />

              <circle cx="490" cy="95" r="4" fill="#78C9DF" fillOpacity=".65" />
            </svg>

            {/* orange focus ring */}

            <span
              aria-hidden="true"
              className="
                risk-focus-ring

                absolute
                left-[58.33%]
                top-1/2

                h-[66px] w-[66px]

                -translate-x-1/2
                -translate-y-1/2

                border
                border-brand-accent/35
              "
            />

            <span
              className="
                absolute
                bottom-4
                left-[58.33%]

                -translate-x-1/2

                text-[8px]
                font-black

                text-brand-accent
              "
            >
              تمرکز قابل توجه
            </span>
          </div>

          {/* =====================================================
              Clear meaning
          ====================================================== */}

          <div
            className="
              mt-6

              border-r-[3px]
              border-brand-accent

              bg-brand-accent/[0.075]

              px-5 py-4
            "
          >
            <p
              className="
                text-[13px]
                font-black
                leading-[2]

                text-white

                sm:text-[14px]
              "
            >
              چند جزء متفاوت می‌توانند در سطح ریسک، همچنان به یک نقطه متمرکز
              شوند.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================
          Bottom
      ========================================================== */}

      <div
        className="
          relative z-20

          flex
          items-center
          justify-between
          gap-5

          border-t
          border-white/10

          bg-black/[0.06]

          px-5 py-4

          sm:px-6
        "
      >
        <p
          className="
            text-[9px]
            font-medium

            text-white/28
          "
        >
          هدف، دیدن تمرکزهای نیازمند بررسی است؛ نه تولید یک امتیاز عمومی.
        </p>

        <span
          aria-hidden="true"
          className="
            h-[6px] w-[6px]
            shrink-0

            bg-brand-accent
          "
        />
      </div>
    </div>
  );
}

/* =============================================================================
   ASSET
============================================================================= */

function Asset() {
  return (
    <span
      aria-hidden="true"
      className="
        relative
        block
        h-14

        border
        border-[#82cee4]/14

        bg-[#82cee4]/[0.045]

        transition-[background-color,border-color,transform]
        duration-300

        group-hover/lens:
        border-[#82cee4]/24

        group-hover/lens:
        bg-[#82cee4]/[0.065]
      "
    >
      <span
        className="
          absolute
          bottom-3
          left-1/2

          h-[5px] w-[5px]

          -translate-x-1/2

          bg-[#82cee4]/42
        "
      />
    </span>
  );
}

/* =============================================================================
   PRINCIPLE
============================================================================= */

function Principle({
  title,
  text,
  accent = false,
}: {
  title: string;
  text: string;
  accent?: boolean;
}) {
  return (
    <div
      className="
        group/principle

        grid
        gap-2

        border-b
        border-white/10

        py-4

        last:border-b-0

        sm:grid-cols-[130px_1fr]
        sm:items-center
        sm:gap-6
      "
    >
      <span
        className={`
          text-[11px]
          font-black

          ${accent ? "text-brand-accent" : "text-white/72"}
        `}
      >
        {title}
      </span>

      <span
        className="
          text-[10px]
          font-medium
          leading-[1.9]

          text-white/33
        "
      >
        {text}
      </span>
    </div>
  );
}

/* =============================================================================
   BACKGROUNDS
============================================================================= */

function Background() {
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
            "radial-gradient(circle at 25% 45%,rgba(22,115,148,.21),transparent 31%),linear-gradient(116deg,#022936 0%,#033746 54%,#022c39 100%)",
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

          h-[7px] w-[2px]

          bg-brand-accent
        "
      />
    </>
  );
}

function LensBackground() {
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
            "radial-gradient(circle at 58% 58%,rgba(252,133,2,.055),transparent 25%),radial-gradient(circle at 38% 35%,rgba(22,115,148,.15),transparent 38%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0

          opacity-[0.04]
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
   CSS MOTION
============================================================================= */

function Motion() {
  return (
    <style>{`
      .risk-flow {
        animation:
          dnh-risk-flow
          2.8s
          ease-in-out
          infinite;
      }

      .risk-focus-ring {
        animation:
          dnh-risk-ring
          3.4s
          ease-in-out
          infinite;
      }

      @keyframes dnh-risk-flow {
        0% {
          top: -15%;
          opacity: 0;
        }

        20% {
          opacity: 1;
        }

        80% {
          opacity: 1;
        }

        100% {
          top: 75%;
          opacity: 0;
        }
      }

      @keyframes dnh-risk-ring {
        0%,
        100% {
          opacity: .35;

          transform:
            translate(-50%, -50%)
            scale(.9);

          box-shadow:
            0 0 0 0
            rgba(252,133,2,0);
        }

        50% {
          opacity: 1;

          transform:
            translate(-50%, -50%)
            scale(1.08);

          box-shadow:
            0 0 30px
            rgba(252,133,2,.14);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .risk-flow,
        .risk-focus-ring {
          animation: none !important;
        }
      }
    `}</style>
  );
}
