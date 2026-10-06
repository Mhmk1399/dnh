import { ArrowDownLeft, ArrowLeft, CornerDownLeft } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   HERO — SERVER COMPONENT

   No "use client"
   No state
   No effects
   No runtime animation JS
============================================================================= */

export function IntelligenceDeskHero() {
  return (
    <section
      id="intelligence-intro"
      dir="rtl"
      aria-labelledby="intelligence-hero-title"
      className="
        relative
        isolate

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
          relative
          z-10

          mx-auto
          flex
          min-h-[100svh]
          w-full
          max-w-[1536px]

          flex-col

          px-5
          pb-8
          pt-[116px]

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
            grid
            flex-1
            items-center
            gap-12

            py-12

            lg:grid-cols-[1.04fr_0.96fr]
            lg:gap-16
            lg:py-9

            xl:grid-cols-[1.08fr_0.92fr]
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
            <IntelligenceField />
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
            <div
              className="
                mb-5
                flex
                items-center
                gap-3
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

              <p
                className="
                  text-[10px]
                  font-black

                  text-white/67

                  sm:text-[11px]
                "
              >
                میز هوشمندی DNH
              </p>
            </div>

            {/* ===================================================
                ONE H1
            ==================================================== */}

            <h1
              id="intelligence-hero-title"
              className="
                max-w-[760px]

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
              هوشمندی،
              <br />
              برای فهم بهتر{" "}
              <span className="text-brand-accent">محیط تصمیم.</span>
            </h1>

            <p
              className="
                mt-6
                max-w-[650px]

                text-[13px]
                font-medium
                leading-[2.2]

                text-white/57

                sm:text-[14px]

                lg:text-[15px]
              "
            >
              DNH اقتصاد، بازار، نقدینگی و ریسک را برای روشن‌تر شدن زمینه تصمیم
              بررسی می‌کند؛ نه برای تولید سیگنال یا پیش‌بینی قطعی قیمت.
            </p>

            </div>

            {/* ===================================================
                CTA
            ==================================================== */}

            <div
              className="
                order-3
                mt-0

                flex
                flex-col
                gap-3

                lg:order-none
                lg:mt-8

                sm:flex-row
                sm:flex-wrap
              "
            >
              <ActionButton
                href="#intelligence-view"
                variant="assessment"
                size="lg"
                icon={ArrowDownLeft}
                className="
                  w-full

                  bg-brand-accent
                  text-white

                  shadow-[0_18px_46px_rgba(252,133,2,.18)]

                  hover:-translate-y-0.5
                  hover:bg-[#eb7c01]

                  sm:w-auto
                  sm:min-w-[230px]
                "
              >
                دیدن Intelligence View
              </ActionButton>

              <ActionButton
                href="/fa/financial-decision-assessment"
                variant="secondary"
                size="lg"
                icon={ArrowLeft}
                className="
                  w-full

                  border-white/20
                  bg-white/[0.025]

                  text-white

                  shadow-none

                  hover:border-white/38
                  hover:bg-white/[0.07]
                  hover:text-white

                  sm:w-auto
                  sm:min-w-[215px]
                "
              >
                ارزیابی تصمیم مالی
              </ActionButton>
            </div>
          </div>
        </div>

        {/* =======================================================
            Bottom rail
        ======================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-6

            border-t
            border-white/10

            py-4
          "
        >
          <div
            aria-hidden="true"
            className="
              flex
              items-center
              gap-3
            "
          >
            <span
              className="
                hidden
                h-px
                w-16

                bg-white/12

                sm:block
              "
            />

            <span
              className="
                h-[6px]
                w-[6px]

                bg-brand-accent
              "
            />
          </div>
        </div>
      </div>

      <HeroMotion />
    </section>
  );
}

/* =============================================================================
   INTELLIGENCE FIELD

   Important:
   This is intentionally NOT a dashboard and contains no fake market data.
============================================================================= */

function IntelligenceField() {
  return (
    <div
      className="
        intelligence-field
        group/field

        relative
        mx-auto

        aspect-[700/610]
        w-full
        max-w-[700px]

        overflow-hidden

        border
        border-white/12

        bg-white/[0.025]

        shadow-[0_40px_120px_rgba(0,0,0,.18)]

        transition-[border-color,transform,box-shadow]
        duration-500
        ease-[cubic-bezier(.22,1,.36,1)]

        hover:-translate-y-[3px]
        hover:border-white/20
        hover:shadow-[0_46px_130px_rgba(0,0,0,.23)]
      "
    >
      <FieldBackground />

      {/* =========================================================
          Header
      ========================================================== */}

      <div
        className="
          absolute
          inset-x-0
          top-0
          z-20

          flex
          items-center
          justify-between
          gap-5

          border-b
          border-white/10

          px-5
          py-4

          sm:px-6
        "
      >
        <div>
          <p
            dir="ltr"
            className="
              text-[6px]
              font-black
              tracking-[0.2em]

              text-brand-accent
            "
          >
            DNH INTELLIGENCE DESK
          </p>

          <p
            className="
              mt-1

              text-[8px]
              font-medium

              text-white/36
            "
          >
            مشاهده محیط تصمیم
          </p>
        </div>

        <span aria-hidden="true" className="flex items-center gap-2">
          <span className="h-[5px] w-[5px] bg-brand-accent" />

          <span
            className="
              h-px
              w-8

              bg-white/18

              transition-[width,background-color]
              duration-500

              group-hover/field:w-14
              group-hover/field:bg-brand-accent/60
            "
          />
        </span>
      </div>

      {/* =========================================================
          Unified SVG
          labels + paths + core = same coordinate system
      ========================================================== */}

      <svg
        aria-hidden="true"
        viewBox="0 0 700 610"
        preserveAspectRatio="xMidYMid meet"
        className="
          absolute
          inset-0

          h-full
          w-full
        "
        fill="none"
      >
        <defs>
          {/* blue */}
          <linearGradient id="blueFlow" x1="0" x2="1">
            <stop offset="0%" stopColor="#83CEE4" stopOpacity="0.14" />
            <stop offset="50%" stopColor="#83CEE4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#83CEE4" stopOpacity="0.22" />
          </linearGradient>

          {/* orange */}
          <linearGradient id="orangeFlow" x1="0" x2="1">
            <stop offset="0%" stopColor="#FC8502" stopOpacity="0.18" />
            <stop offset="55%" stopColor="#FC8502" stopOpacity="1" />
            <stop offset="100%" stopColor="#FC8502" stopOpacity="0.25" />
          </linearGradient>

          <filter id="blueGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="4" result="blur" />

            <feColorMatrix
              in="blur"
              type="matrix"
              values="
                0 0 0 0 0.51
                0 0 0 0 0.81
                0 0 0 0 0.90
                0 0 0 .65 0
              "
            />
          </filter>

          <filter
            id="orangeGlow"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur stdDeviation="5" result="blur" />

            <feColorMatrix
              in="blur"
              type="matrix"
              values="
                0 0 0 0 0.99
                0 0 0 0 0.52
                0 0 0 0 0.01
                0 0 0 .85 0
              "
            />
          </filter>
        </defs>

        {/* =======================================================
            Architecture frame
        ======================================================== */}

        <rect
          x="68"
          y="118"
          width="564"
          height="420"
          stroke="white"
          strokeOpacity="0.075"
        />

        <rect
          x="174"
          y="205"
          width="352"
          height="274"
          stroke="white"
          strokeOpacity="0.05"
        />

        <path d="M174 306H526" stroke="white" strokeOpacity="0.045" />

        <path d="M174 404H526" stroke="white" strokeOpacity="0.045" />

        <path d="M274 205V479" stroke="white" strokeOpacity="0.04" />

        <path d="M426 205V479" stroke="white" strokeOpacity="0.04" />

        {/* =======================================================
            LABEL 01 — ASSET VIEW
        ======================================================== */}

        <foreignObject x="82" y="235" width="112" height="55">
          <div
            dir="rtl"
            style={{
              width: "100%",
              height: "100%",
              textAlign: "left",
            }}
          >
            <div
              dir="ltr"
              style={{
                color: "rgba(131,206,228,.65)",
                fontSize: "7px",
                fontWeight: 900,
                letterSpacing: ".12em",
              }}
            >
              ASSET VIEW
            </div>

            <div
              style={{
                marginTop: "5px",
                color: "rgba(255,255,255,.48)",
                fontSize: "10px",
                fontWeight: 800,
              }}
            >
              نمای دارایی
            </div>
          </div>
        </foreignObject>

        {/* asset connector */}
        <path
          className="intel-base-line"
          d="M194 268H285V310H320"
          stroke="url(#blueFlow)"
          strokeWidth="1.35"
        />

        <path
          className="intel-glow-blue"
          d="M194 268H285V310H320"
          stroke="#83CEE4"
          strokeWidth="1.8"
          filter="url(#blueGlow)"
        />

        <rect
          x="190"
          y="264"
          width="8"
          height="8"
          fill="#83CEE4"
          fillOpacity=".72"
        />

        {/* =======================================================
            LABEL 02 — MACRO RISK
        ======================================================== */}

        <foreignObject x="510" y="205" width="120" height="60">
          <div
            dir="rtl"
            style={{
              width: "100%",
              height: "100%",
              textAlign: "right",
            }}
          >
            <div
              dir="ltr"
              style={{
                color: "rgba(131,206,228,.65)",
                fontSize: "7px",
                fontWeight: 900,
                letterSpacing: ".12em",
              }}
            >
              MACRO RISK
            </div>

            <div
              style={{
                marginTop: "5px",
                color: "rgba(255,255,255,.48)",
                fontSize: "10px",
                fontWeight: 800,
              }}
            >
              ریسک کلان
            </div>
          </div>
        </foreignObject>

        {/* macro connector */}
        <path
          className="intel-base-line"
          d="M506 240H430V300H382"
          stroke="url(#blueFlow)"
          strokeWidth="1.35"
        />

        <path
          className="intel-glow-blue intel-delay-1"
          d="M506 240H430V300H382"
          stroke="#83CEE4"
          strokeWidth="1.8"
          filter="url(#blueGlow)"
        />

        <rect
          x="502"
          y="236"
          width="8"
          height="8"
          fill="#83CEE4"
          fillOpacity=".72"
        />

        {/* =======================================================
            LABEL 03 — WHAT TO WATCH
        ======================================================== */}

        <foreignObject x="82" y="440" width="135" height="65">
          <div
            dir="rtl"
            style={{
              width: "100%",
              height: "100%",
              textAlign: "left",
            }}
          >
            <div
              dir="ltr"
              style={{
                color: "rgba(131,206,228,.65)",
                fontSize: "7px",
                fontWeight: 900,
                letterSpacing: ".12em",
              }}
            >
              WHAT TO WATCH
            </div>

            <div
              style={{
                marginTop: "5px",
                color: "rgba(255,255,255,.48)",
                fontSize: "10px",
                fontWeight: 800,
              }}
            >
              متغیرهای قابل توجه
            </div>
          </div>
        </foreignObject>

        {/* watch connector */}
        <path
          className="intel-base-line"
          d="M218 465H290V390H320"
          stroke="url(#blueFlow)"
          strokeWidth="1.35"
        />

        <path
          className="intel-glow-blue intel-delay-2"
          d="M218 465H290V390H320"
          stroke="#83CEE4"
          strokeWidth="1.8"
          filter="url(#blueGlow)"
        />

        <rect
          x="214"
          y="461"
          width="8"
          height="8"
          fill="#83CEE4"
          fillOpacity=".62"
        />

        {/* =======================================================
            LABEL 04 — LIQUIDITY
        ======================================================== */}

        <foreignObject x="510" y="410" width="120" height="60">
          <div
            dir="rtl"
            style={{
              width: "100%",
              height: "100%",
              textAlign: "right",
            }}
          >
            <div
              dir="ltr"
              style={{
                color: "rgba(131,206,228,.65)",
                fontSize: "7px",
                fontWeight: 900,
                letterSpacing: ".12em",
              }}
            >
              LIQUIDITY
            </div>

            <div
              style={{
                marginTop: "5px",
                color: "rgba(255,255,255,.48)",
                fontSize: "10px",
                fontWeight: 800,
              }}
            >
              نقدشوندگی
            </div>
          </div>
        </foreignObject>

        {/* liquidity connector */}
        <path
          className="intel-base-line"
          d="M506 445H430V390H382"
          stroke="url(#blueFlow)"
          strokeWidth="1.35"
        />

        <path
          className="intel-glow-blue intel-delay-3"
          d="M506 445H430V390H382"
          stroke="#83CEE4"
          strokeWidth="1.8"
          filter="url(#blueGlow)"
        />

        <rect
          x="502"
          y="441"
          width="8"
          height="8"
          fill="#83CEE4"
          fillOpacity=".62"
        />

        {/* =======================================================
            CORE
        ======================================================== */}

        <rect
          x="320"
          y="300"
          width="62"
          height="90"
          fill="#167394"
          fillOpacity=".07"
          stroke="#83CEE4"
          strokeOpacity=".24"
        />

        <rect
          x="330"
          y="312"
          width="42"
          height="66"
          fill="#FC8502"
          fillOpacity=".025"
          stroke="#FC8502"
          strokeOpacity=".8"
        />

        <foreignObject x="306" y="323" width="90" height="52">
          <div
            dir="rtl"
            style={{
              width: "100%",
              height: "100%",
              textAlign: "center",
            }}
          >
            <div
              dir="ltr"
              style={{
                color: "#FC8502",
                fontSize: "6px",
                fontWeight: 900,
                letterSpacing: ".1em",
              }}
            >
              DECISION CONTEXT
            </div>

            <div
              style={{
                marginTop: "5px",
                color: "rgba(255,255,255,.9)",
                fontSize: "11px",
                fontWeight: 900,
              }}
            >
              زمینه تصمیم
            </div>
          </div>
        </foreignObject>

        {/* =======================================================
            STRATEGIC IMPLICATION
        ======================================================== */}

        <path
          className="intel-accent-base"
          d="M351 390V505H487"
          stroke="url(#orangeFlow)"
          strokeWidth="1.6"
        />

        <path
          className="intel-glow-orange"
          d="M351 390V505H487"
          stroke="#FC8502"
          strokeWidth="2"
          filter="url(#orangeGlow)"
        />

        <rect x="483" y="501" width="9" height="9" fill="#FC8502" />

        <foreignObject x="365" y="520" width="170" height="52">
          <div
            dir="rtl"
            style={{
              width: "100%",
              height: "100%",
              textAlign: "right",
            }}
          >
            <div
              dir="ltr"
              style={{
                color: "#FC8502",
                fontSize: "7px",
                fontWeight: 900,
                letterSpacing: ".1em",
              }}
            >
              STRATEGIC IMPLICATION
            </div>

            <div
              style={{
                marginTop: "5px",
                color: "rgba(255,255,255,.42)",
                fontSize: "9px",
                fontWeight: 700,
              }}
            >
              معنای داده برای تصمیم
            </div>
          </div>
        </foreignObject>

        {/* =======================================================
            FLOW PARTICLES
        ======================================================== */}

        <path
          className="intel-particle intel-particle-a"
          d="M194 268H285V310H320"
          stroke="#C5F2FF"
          strokeWidth="2"
        />

        <path
          className="intel-particle intel-particle-b"
          d="M506 240H430V300H382"
          stroke="#C5F2FF"
          strokeWidth="2"
        />

        <path
          className="intel-particle intel-particle-c"
          d="M218 465H290V390H320"
          stroke="#C5F2FF"
          strokeWidth="2"
        />

        <path
          className="intel-particle intel-particle-d"
          d="M506 445H430V390H382"
          stroke="#C5F2FF"
          strokeWidth="2"
        />

        <path
          className="intel-particle intel-particle-orange"
          d="M351 390V505H487"
          stroke="#FFD4A6"
          strokeWidth="2.2"
        />
      </svg>
    </div>
  );
}

/* =============================================================================
   Label
============================================================================= */

function IntelligenceLabel({
  en,
  fa,
  className,
  align = "right",
}: {
  en: string;
  fa: string;
  className: string;
  align?: "right" | "left";
}) {
  return (
    <div
      className={`
        absolute z-20 ${className}
        ${align === "left" ? "text-left" : "text-right"}
      `}
    >
      <p
        dir="ltr"
        className="
          text-[6px] font-black tracking-[0.16em]
          text-[#83cee4]/65
        "
      >
        {en}
      </p>

      <p
        className="
          mt-1 text-[9px] font-bold
          text-white/44 sm:text-[10px]
        "
      >
        {fa}
      </p>
    </div>
  );
}

/* =============================================================================
   Micro
============================================================================= */

function MicroWord({ children }: { children: string }) {
  return (
    <span
      dir="ltr"
      className="
        text-[6px]
        font-bold
        tracking-[0.13em]

        text-white/28
      "
    >
      {children}
    </span>
  );
}

function Dot() {
  return (
    <span
      aria-hidden="true"
      className="
        h-[4px]
        w-[4px]

        bg-brand-primary
      "
    />
  );
}

/* =============================================================================
   Field background
============================================================================= */

function FieldBackground() {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 48%,rgba(22,115,148,.16),transparent 26%),linear-gradient(135deg,rgba(255,255,255,.02),transparent 65%)",
        }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,.08) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.06) 1px,transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
    </>
  );
}

/* =============================================================================
   Hero background
============================================================================= */

function HeroBackground() {
  return (
    <>
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
        "
        style={{
          background:
            "radial-gradient(circle at 23% 46%,rgba(22,115,148,.26),transparent 30%),linear-gradient(116deg,#022936 0%,#033847 52%,#022d3a 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.065]
        "
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,.09) 1px,transparent 1px)",
          backgroundSize: "118px 100%",
        }}
      />
    </>
  );
}

/* =============================================================================
   PURE CSS MOTION

   SSR-friendly:
   - CSS only
   - no hydration
   - no JS listeners
   - runs once
============================================================================= */

function HeroMotion() {
  return (
    <style>{`
      .intelligence-field {
        animation:
          intelligence-field-enter
          760ms
          cubic-bezier(.22,1,.36,1)
          both;
      }

      /* ---------------------------------------------------------
         INITIAL DRAW
      --------------------------------------------------------- */

      .intel-base-line,
      .intel-accent-base {
        stroke-dasharray: 500;
        stroke-dashoffset: 500;

        animation:
          intelligence-draw
          1000ms
          cubic-bezier(.22,1,.36,1)
          forwards;
      }

      .intel-accent-base {
        animation-delay: 500ms;
      }

      /* ---------------------------------------------------------
         BLUE GLOW
      --------------------------------------------------------- */

      .intel-glow-blue {
        opacity: .16;

        animation:
          intelligence-blue-glow
          4s
          ease-in-out
          infinite;
      }

      .intel-delay-1 {
        animation-delay: .7s;
      }

      .intel-delay-2 {
        animation-delay: 1.4s;
      }

      .intel-delay-3 {
        animation-delay: 2.1s;
      }

      /* ---------------------------------------------------------
         ORANGE GLOW
      --------------------------------------------------------- */

      .intel-glow-orange {
        opacity: .32;

        animation:
          intelligence-orange-glow
          2.8s
          ease-in-out
          infinite;
      }

      /* ---------------------------------------------------------
         CORE NODE
      --------------------------------------------------------- */

      .intel-core-node {
        transform-box: fill-box;
        transform-origin: center;

        animation:
          intelligence-core-pulse
          2.4s
          ease-in-out
          infinite;
      }

      /* ---------------------------------------------------------
         FLOW PARTICLES
         
         a short bright dash physically travels through the
         actual line, so the meaning becomes:
         signal -> decision context
      --------------------------------------------------------- */

      .intel-particle {
        fill: none;

        stroke-linecap: round;

        stroke-dasharray: 8 180;
        stroke-dashoffset: 0;

        opacity: 0;

        filter:
          drop-shadow(0 0 3px rgba(131,206,228,.9));

        animation:
          intelligence-flow
          4.4s
          linear
          infinite;
      }

      .intel-particle-a {
        animation-delay: 0s;
      }

      .intel-particle-b {
        animation-delay: 1.1s;
      }

      .intel-particle-c {
        animation-delay: 2.2s;
      }

      .intel-particle-d {
        animation-delay: 3.3s;
      }

      .intel-particle-orange {
        fill: none;

        stroke-linecap: round;

        stroke-dasharray: 10 160;

        opacity: 0;

        filter:
          drop-shadow(0 0 5px rgba(252,133,2,.95));

        animation:
          intelligence-flow-orange
          3.1s
          linear
          infinite;

        animation-delay: .8s;
      }

      /* ---------------------------------------------------------
         KEYFRAMES
      --------------------------------------------------------- */

      @keyframes intelligence-field-enter {
        from {
          opacity: 0;
          transform: translateY(12px);
        }

        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes intelligence-draw {
        to {
          stroke-dashoffset: 0;
        }
      }

      @keyframes intelligence-blue-glow {
        0%,
        100% {
          opacity: .12;
        }

        45% {
          opacity: .44;
        }

        60% {
          opacity: .24;
        }
      }

      @keyframes intelligence-orange-glow {
        0%,
        100% {
          opacity: .26;
        }

        50% {
          opacity: .9;
        }
      }

      @keyframes intelligence-core-pulse {
        0%,
        100% {
          opacity: .85;
          transform: scale(1);
        }

        50% {
          opacity: 1;
          transform: scale(1.22);
        }
      }

      @keyframes intelligence-flow {
        0% {
          opacity: 0;
          stroke-dashoffset: 190;
        }

        8% {
          opacity: .95;
        }

        68% {
          opacity: .95;
        }

        80%,
        100% {
          opacity: 0;
          stroke-dashoffset: 0;
        }
      }

      @keyframes intelligence-flow-orange {
        0% {
          opacity: 0;
          stroke-dashoffset: 170;
        }

        10% {
          opacity: 1;
        }

        70% {
          opacity: 1;
        }

        84%,
        100% {
          opacity: 0;
          stroke-dashoffset: 0;
        }
      }

      /* ---------------------------------------------------------
         REDUCED MOTION
      --------------------------------------------------------- */

      @media (prefers-reduced-motion: reduce) {
        .intelligence-field,
        .intel-base-line,
        .intel-accent-base,
        .intel-glow-blue,
        .intel-glow-orange,
        .intel-core-node,
        .intel-particle,
        .intel-particle-orange {
          animation: none !important;
        }

        .intel-base-line,
        .intel-accent-base {
          stroke-dashoffset: 0;
        }

        .intel-particle,
        .intel-particle-orange {
          display: none;
        }
      }
    `}</style>
  );
}
