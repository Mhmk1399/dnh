import Link from "next/link";
import { ArrowDownLeft } from "lucide-react";

const INTELLIGENCE_LAYERS = [
  {
    key: "MACRO",
    en: "MACRO RISK VIEW",
    fa: "ریسک کلان",
    description:
      "اقتصاد و ریسک‌های کلان، زمینه‌ای را می‌سازند که تصمیم در آن شکل می‌گیرد.",
  },
  {
    key: "ASSET",
    en: "ASSET VIEW",
    fa: "نمای دارایی",
    description: "دارایی‌ها و بازارها در نسبت با تصویر کلی تصمیم دیده می‌شوند.",
  },
  {
    key: "LIQUIDITY",
    en: "LIQUIDITY VIEW",
    fa: "نقدشوندگی",
    description: "دسترسی به منابع و انعطاف نقدینگی، بخشی از کیفیت تصمیم است.",
  },
  {
    key: "RISK",
    en: "INFLATION / FX / POLICY",
    fa: "تورم، ارز و سیاست‌گذاری",
    description:
      "متغیرهایی که می‌توانند قدرت خرید، ریسک و شرایط تصمیم را تغییر دهند.",
  },
] as const;

/* =============================================================================
   SECTION — SERVER COMPONENT
============================================================================= */

export function IntelligenceLayersSection() {
  return (
    <section
      id="intelligence-layers"
      dir="rtl"
      aria-labelledby="intelligence-layers-title"
      className="
        relative
        isolate

        scroll-mt-24
        overflow-hidden

        bg-[#032f3f]
        text-white

        sm:scroll-mt-28
      "
    >
      <Background />

      <div
        className="
          dnh-site-shell
          relative
          z-10

          mx-auto
          w-full
          max-w-[1536px]

          px-5
          py-16

          sm:px-8
          sm:py-20

          lg:px-12
          lg:py-24

          xl:px-16
          xl:py-28

          2xl:px-20
        "
      >
        {/* =======================================================
            Header
        ======================================================== */}

        <div
          className="
            grid
            gap-8

            lg:grid-cols-[0.82fr_1.18fr]
            lg:items-end
            lg:gap-16
          "
        >
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-10 bg-brand-accent" />

              <span
                className="
                  text-[10px]
                  font-black

                  text-white/62

                  sm:text-[11px]
                "
              >
                لایه‌های Intelligence
              </span>
            </div>

            <h2
              id="intelligence-layers-title"
              className="
                max-w-[730px]

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
              هیچ متغیری،
              <br />
              به‌تنهایی{" "}
              <span className="text-brand-accent">تصویر تصمیم نیست.</span>
            </h2>
          </div>

          <div className="lg:pb-1">
            <p
              className="
                max-w-[650px]

                text-[13px]
                font-medium
                leading-[2.2]

                text-white/52

                sm:text-[14px]

                lg:text-[15px]
              "
            >
              میز هوشمندی DNH چند لایه از محیط مالی را کنار هم می‌بیند تا اهمیت
              هر متغیر در زمینه تصمیم معنا پیدا کند.
            </p>
          </div>
        </div>

        {/* =======================================================
            MAIN
        ======================================================== */}

        <div
          className="
            mt-12

            grid
            gap-10

            sm:mt-14

            lg:mt-16
            lg:grid-cols-[1.08fr_0.92fr]
            lg:items-stretch
            lg:gap-14
          "
        >
          {/* =====================================================
              LAYER STACK
          ====================================================== */}

          <div
            className="
              intelligence-stack

              relative
              overflow-hidden

              border
              border-white/12

              bg-white/[0.025]

              p-4

              sm:p-6

              lg:min-h-[570px]
              lg:p-8
            "
          >
            <StackBackground />

            <div
              className="
                relative
                z-10

                flex
                h-full
                flex-col
                justify-center

                gap-3
              "
            >
              {INTELLIGENCE_LAYERS.map((layer, index) => (
                <LayerBar key={layer.key} layer={layer} index={index} />
              ))}

              {/* =================================================
                  Synthesis
              ================================================== */}

              <div
                className="
                  group/result

                  relative

                  mt-3

                  border
                  border-brand-accent/30

                  bg-brand-accent/[0.055]

                  px-5
                  py-5

                  sm:px-6
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    absolute
                    inset-y-0
                    right-0

                    w-[3px]

                    bg-brand-accent
                  "
                />

                <div
                  className="
                    flex
                    flex-col
                    gap-5

                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                  "
                >
                  <div>
                    <p
                      dir="ltr"
                      className="
                        text-[7px]
                        font-black
                        tracking-[0.18em]

                        text-brand-accent
                      "
                    >
                      DECISION INTELLIGENCE
                    </p>

                    <p
                      className="
                        mt-2

                        text-[14px]
                        font-black
                        leading-[1.9]

                        text-white

                        sm:text-[16px]
                      "
                    >
                      معنا در کنار هم دیده شدن لایه‌ها شکل می‌گیرد.
                    </p>
                  </div>

                  <div
                    aria-hidden="true"
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >
                    <span
                      className="
                        h-px
                        w-8

                        bg-brand-accent/40

                        transition-[width]
                        duration-300

                        group-hover/result:w-16
                      "
                    />

                    <span
                      className="
                        h-[7px]
                        w-[7px]

                        bg-brand-accent
                      "
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* subtle scan */}
            <span
              aria-hidden="true"
              className="
                intelligence-scan

                pointer-events-none

                absolute
                inset-y-0
                left-0

                z-[5]

                w-px

                bg-gradient-to-b
                from-transparent
                via-[#82d6ed]/55
                to-transparent

                opacity-60
              "
            />
          </div>

          {/* =====================================================
              OUTPUT SIDE
          ====================================================== */}

          <div
            className="
              relative

              flex
              flex-col
              justify-between

              border
              border-white/12

              bg-black/[0.07]

              p-5

              sm:p-7

              lg:p-8
            "
          >
            <div>
              <p
                dir="ltr"
                className="
                  text-[7px]
                  font-black
                  tracking-[0.19em]

                  text-[#82cfe5]/60
                "
              >
                FROM OBSERVATION TO MEANING
              </p>

              <h3
                className="
                  mt-4
                  max-w-[470px]

                  text-[22px]
                  font-black
                  leading-[1.85]

                  text-white

                  sm:text-[25px]
                "
              >
                دیدن متغیرها کافی نیست؛
                <br />
                باید فهمید چرا مهم‌اند.
              </h3>

              <p
                className="
                  mt-5
                  max-w-[540px]

                  text-[11px]
                  font-medium
                  leading-[2.1]

                  text-white/42

                  sm:text-[12px]
                "
              >
                هدف Intelligence Desk این است که مشاهده بازار و اقتصاد به شناخت
                بهتر ریسک، شرایط و پیامدهای تصمیم تبدیل شود.
              </p>
            </div>

            {/* ---------------------------------------------------
                OUTPUT LEDGER
            ---------------------------------------------------- */}

            <div
              className="
                mt-10

                border-y
                border-white/10
              "
            >
              <OutputRow en="WHAT TO WATCH" fa="چه چیزی نیازمند توجه است؟" />

              <OutputRow
                en="STRATEGIC IMPLICATION"
                fa="این تغییر برای تصمیم چه معنایی دارد؟"
                accent
              />
            </div>

            {/* ---------------------------------------------------
                Footer
            ---------------------------------------------------- */}

            <div
              className="
                mt-8

                flex
                flex-col
                gap-5

                border-r
                border-white/10

                pr-5
              "
            >
              <p
                className="
                  max-w-[470px]

                  text-[9px]
                  font-medium
                  leading-[2]

                  text-white/30
                "
              >
                خروجی این نگاه، سیگنال خرید یا فروش نیست؛ بلکه تصویر منظم‌تری از
                محیط تصمیم است.
              </p>

              <Link
                href="#strategic-implications"
                className="
                  group/link

                  inline-flex
                  min-h-11
                  w-fit

                  items-center
                  gap-3

                  text-[10px]
                  font-black

                  text-[#82cfe5]

                  outline-none

                  transition-colors
                  duration-300

                  hover:text-brand-accent

                  focus-visible:ring-2
                  focus-visible:ring-focus/50
                "
              >
                داده چگونه به معنای راهبردی می‌رسد؟
                <ArrowDownLeft
                  aria-hidden="true"
                  className="
                    h-4
                    w-4

                    transition-transform
                    duration-300

                    group-hover/link:translate-y-1
                    group-hover/link:-translate-x-1
                  "
                  strokeWidth={1.6}
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

/* =============================================================================
   Layer
============================================================================= */

function LayerBar({
  layer,
  index,
}: {
  layer: (typeof INTELLIGENCE_LAYERS)[number];
  index: number;
}) {
  const widths = ["lg:w-[100%]", "lg:w-[94%]", "lg:w-[88%]", "lg:w-[82%]"];

  return (
    <article
      className={`
        group/layer

        relative

        w-full

        overflow-hidden

        border
        border-white/10

        bg-white/[0.035]

        px-4
        py-4

        transition-[background-color,border-color,transform]
        duration-300

        hover:-translate-x-1
        hover:border-[#82cfe5]/30
        hover:bg-white/[0.06]

        sm:px-5
        sm:py-5

        ${widths[index]}
      `}
    >
      {/* left accent */}
      <span
        aria-hidden="true"
        className="
          absolute
          inset-y-0
          right-0

          w-[2px]

          bg-[#82cfe5]/20

          transition-colors
          duration-300

          group-hover/layer:bg-brand-accent
        "
      />

      <div
        className="
          grid
          gap-3

          sm:grid-cols-[125px_1fr]
          sm:items-center
          sm:gap-6
        "
      >
        <div>
          <p
            dir="ltr"
            className="
              text-right
              text-[6px]
              font-black
              tracking-[0.15em]

              text-[#82cfe5]/55
            "
          >
            {layer.en}
          </p>

          <p
            className="
              mt-1.5

              text-[11px]
              font-black

              text-white/78
            "
          >
            {layer.fa}
          </p>
        </div>

        <p
          className="
            max-w-[570px]

            text-[9px]
            font-medium
            leading-[1.95]

            text-white/36

            sm:text-[10px]
          "
        >
          {layer.description}
        </p>
      </div>

      {/* activity */}
      <span
        aria-hidden="true"
        className="
          absolute
          left-4
          top-1/2

          h-[5px]
          w-[5px]

          -translate-y-1/2

          bg-[#82cfe5]/35

          transition-[background-color,box-shadow]
          duration-300

          group-hover/layer:bg-brand-accent
          group-hover/layer:shadow-[0_0_12px_rgba(252,133,2,.55)]
        "
      />
    </article>
  );
}

/* =============================================================================
   Output
============================================================================= */

function OutputRow({
  en,
  fa,
  accent = false,
}: {
  en: string;
  fa: string;
  accent?: boolean;
}) {
  return (
    <div
      className="
        group/output

        flex
        items-center
        justify-between
        gap-6

        border-b
        border-white/10

        py-5

        last:border-b-0
      "
    >
      <div>
        <p
          dir="ltr"
          className={`
            text-right
            text-[6px]
            font-black
            tracking-[0.16em]

            ${accent ? "text-brand-accent" : "text-[#82cfe5]/55"}
          `}
        >
          {en}
        </p>

        <p
          className="
            mt-2

            text-[11px]
            font-black
            leading-[1.9]

            text-white/72
          "
        >
          {fa}
        </p>
      </div>

      <span
        aria-hidden="true"
        className={`
          h-[7px]
          w-[7px]

          transition-[transform,box-shadow]
          duration-300

          group-hover/output:scale-125

          ${
            accent
              ? "bg-brand-accent group-hover/output:shadow-[0_0_14px_rgba(252,133,2,.6)]"
              : "bg-[#82cfe5]/45"
          }
        `}
      />
    </div>
  );
}

/* =============================================================================
   Background
============================================================================= */

function Background() {
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
            "radial-gradient(circle at 20% 40%,rgba(22,115,148,.18),transparent 32%),linear-gradient(112deg,#022b39 0%,#033847 54%,#022d3a 100%)",
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
            "linear-gradient(to right,rgba(255,255,255,.08) 1px,transparent 1px)",
          backgroundSize: "118px 100%",
        }}
      />

      <span
        aria-hidden="true"
        className="
          absolute
          left-[18%]
          top-0

          h-[6px]
          w-[2px]

          bg-brand-accent
        "
      />
    </>
  );
}

/* =============================================================================
   Stack background
============================================================================= */

function StackBackground() {
  return (
    <>
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.10]
        "
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,.08) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.055) 1px,transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -bottom-16
          -left-8

          font-mono
          text-[160px]
          font-black
          leading-none

          text-white/[0.018]

          sm:text-[220px]
        "
      >
        VIEW
      </div>
    </>
  );
}

/* =============================================================================
   CSS-only Motion
============================================================================= */

function Motion() {
  return (
    <style>{`
      .intelligence-stack {
        --scan-position: 0%;
      }

      .intelligence-scan {
        animation:
          dnh-intelligence-scan
          7s
          ease-in-out
          infinite;
      }

      @keyframes dnh-intelligence-scan {
        0%,
        100% {
          left: 4%;
          opacity: .12;
        }

        50% {
          left: 96%;
          opacity: .5;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .intelligence-scan {
          animation: none !important;
          left: 50%;
          opacity: .15;
        }
      }
    `}</style>
  );
}
