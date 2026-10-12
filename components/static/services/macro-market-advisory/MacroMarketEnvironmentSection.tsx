/* =============================================================================
   MACRO & MARKET ADVISORY — SIGNATURE DARK SECTION

   Meaning:
   Current environment
   → Relevant scenarios
   → Strategic implication

   Compact desktop layout
   No trading UI
   No tiny copy
============================================================================= */

const ENVIRONMENT_INPUTS = [
  "ریسک کلان",
  "تورم و ارز",
  "نقدینگی",
  "شرایط بازار",
] as const;

const DECISION_EFFECTS = [
  "ریسک",
  "نقدشوندگی",
  "گزینه‌های پیش رو",
  "افق تصمیم",
] as const;

export function MacroMarketEnvironmentSection() {
  return (
    <section
      id="macro-market-environment"
      dir="rtl"
      aria-labelledby="macro-market-environment-title"
      className="
        relative
        isolate

        scroll-mt-24
        overflow-hidden

        bg-[#022f3e]
        text-white

        py-18
        sm:scroll-mt-28
        sm:py-20
        lg:py-22
      "
    >
      <EnvironmentBackground />

      <div
        className="
          dnh-site-shell
          relative
          z-10

          mx-auto
          w-full
          max-w-[1536px]

          px-5
          sm:px-8
          lg:px-12
          xl:px-16
          2xl:px-20
        "
      >
        {/* ===============================================================
            HEADER
        ================================================================ */}

        <div
          className="
            grid
            gap-6

            lg:grid-cols-[1.08fr_0.92fr]
            lg:items-end
            lg:gap-14
          "
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-9 bg-brand-accent" />

              <p
                className="
                  text-[12px]
                  font-black
                  text-white/65
                "
              >
                از تحلیل تا تصمیم
              </p>
            </div>

            <h2
              id="macro-market-environment-title"
              className="
                max-w-[860px]
                [text-wrap:balance]

                text-[29px]
                font-black
                leading-[1.72]
                tracking-[-0.045em]

                text-white

                sm:text-[35px]
                lg:text-[41px]
                lg:leading-[1.58]
              "
            >
              تحلیل اقتصاد و بازار، پایان کار نیست؛{" "}
              <span className="text-brand-accent">
                باید اثر آن بر تصمیم روشن شود.
              </span>
            </h2>
          </div>

          <p
            className="
              max-w-[580px]

              text-[15px]
              font-medium
              leading-[2.05]

              text-white/52

              sm:text-[16px]
            "
          >
            شرایط امروز ابتدا در قالب سناریوهای مرتبط دیده می‌شود و سپس اثر هر
            سناریو بر ریسک، نقدشوندگی و مسیر تصمیم بررسی می‌شود.
          </p>
        </div>

        {/* ===============================================================
            SIGNATURE VISUAL
        ================================================================ */}

        <div
          role="img"
          aria-label="نمایش حرکت از شرایط اقتصاد و بازار به سناریوهای مرتبط و سپس پیامدهای راهبردی برای تصمیم"
          className="
            relative

            mt-10

            overflow-hidden

            border
            border-white/12

            bg-white/[0.018]

            shadow-[0_32px_90px_rgba(0,0,0,.2)]

            lg:mt-12
          "
        >
          {/* =============================================================
              DESKTOP
          ============================================================== */}

          <div
            className="
              relative
              hidden

              min-h-[300px]

              grid-cols-[1fr_190px_1fr]
              items-stretch

              lg:grid
            "
          >
            {/* -----------------------------------------------------------
                01 — ENVIRONMENT
            ------------------------------------------------------------ */}

            <div
              className="
                relative

                flex
                flex-col
                justify-center

                px-8
                py-8

                xl:px-10
              "
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="h-[11px] w-[11px] bg-[#82cee4]/75" />

                <p className="text-[15px] font-black text-white/78">
                  شرایط امروز
                </p>
              </div>

              <div
                className="
                  grid
                  grid-cols-2

                  border
                  border-white/10
                "
              >
                {ENVIRONMENT_INPUTS.map((item) => (
                  <EnvironmentCell key={item} title={item} />
                ))}
              </div>
            </div>

            {/* -----------------------------------------------------------
                02 — SCENARIO
            ------------------------------------------------------------ */}

            <div
              className="
                relative

                flex
                items-center
                justify-center

                border-x
                border-white/[0.08]

                bg-black/[0.06]
              "
            >
              {/* connectors */}

              <span
                aria-hidden="true"
                className="
                  absolute
                  right-0
                  top-1/2

                  h-px
                  w-[42px]

                  -translate-y-1/2

                  bg-[#82cee4]/35
                "
              />

              <span
                aria-hidden="true"
                className="
                  absolute
                  left-0
                  top-1/2

                  h-px
                  w-[42px]

                  -translate-y-1/2

                  bg-brand-accent/55
                "
              />

              <div
                className="
                  relative

                  flex
                  h-[150px]
                  w-[132px]

                  flex-col
                  items-center
                  justify-center

                  border
                  border-white/14

                  bg-[#063746]

                  px-4

                  text-center
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    mb-4

                    h-[11px]
                    w-[11px]

                    bg-brand-accent

                    shadow-[0_0_20px_rgba(252,133,2,.28)]

                    dnh-macro-pulse
                  "
                />

                <p
                  className="
                    text-[16px]
                    font-black
                    leading-7

                    text-white
                  "
                >
                  سناریوهای
                  <br />
                  مرتبط
                </p>
              </div>
            </div>

            {/* -----------------------------------------------------------
                03 — IMPLICATION
            ------------------------------------------------------------ */}

            <div
              className="
                relative

                flex
                flex-col
                justify-center

                px-8
                py-8

                xl:px-10
              "
            >
              <div className="mb-5 flex items-center gap-3">
                <span
                  className="
                    h-[11px]
                    w-[11px]

                    bg-brand-accent

                    dnh-macro-pulse
                  "
                />

                <p className="text-[15px] font-black text-brand-accent">
                  پیامد برای تصمیم
                </p>
              </div>

              <div
                className="
                  grid
                  grid-cols-2

                  border
                  border-brand-accent/25

                  bg-brand-accent/[0.025]
                "
              >
                {DECISION_EFFECTS.map((item) => (
                  <DecisionEffectCell key={item} title={item} />
                ))}
              </div>
            </div>

            {/* main flow line */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none

                absolute
                left-[33%]
                right-[33%]
                top-1/2

                -z-10

                h-px

                -translate-y-1/2

                bg-gradient-to-l
                from-[#82cee4]/20
                via-white/10
                to-brand-accent/35
              "
            />
          </div>

          {/* =============================================================
              MOBILE
          ============================================================== */}

          <div
            className="
              px-5
              py-7

              lg:hidden
            "
          >
            {/* Conditions */}

            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-[11px] w-[11px] bg-[#82cee4]/75" />

                <p className="text-[15px] font-black text-white/75">
                  شرایط امروز
                </p>
              </div>

              <div
                className="
                  grid
                  grid-cols-2

                  border
                  border-white/10
                "
              >
                {ENVIRONMENT_INPUTS.map((item) => (
                  <EnvironmentCell key={item} title={item} />
                ))}
              </div>
            </div>

            <MobileConnector />

            {/* Scenario */}

            <div
              className="
                mx-auto
                max-w-[270px]

                border
                border-white/14

                bg-[#063746]

                px-5
                py-5

                text-center
              "
            >
              <span
                aria-hidden="true"
                className="
                  mx-auto
                  mb-3
                  block

                  h-[11px]
                  w-[11px]

                  bg-brand-accent

                  dnh-macro-pulse
                "
              />

              <p className="text-[16px] font-black text-white">
                سناریوهای مرتبط
              </p>
            </div>

            <MobileConnector accent />

            {/* Implication */}

            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-[11px] w-[11px] bg-brand-accent" />

                <p className="text-[15px] font-black text-brand-accent">
                  پیامد برای تصمیم
                </p>
              </div>

              <div
                className="
                  grid
                  grid-cols-2

                  border
                  border-brand-accent/25

                  bg-brand-accent/[0.025]
                "
              >
                {DECISION_EFFECTS.map((item) => (
                  <DecisionEffectCell key={item} title={item} />
                ))}
              </div>
            </div>
          </div>

          {/* =============================================================
              BOTTOM MESSAGE
          ============================================================== */}

          <div
            className="
              flex
              items-start
              gap-4

              border-t
              border-white/10

              bg-black/[0.07]

              px-5
              py-4

              sm:px-6
              lg:px-8
            "
          >
            <span
              aria-hidden="true"
              className="
                mt-[11px]

                h-[11px]
                w-[11px]

                shrink-0

                bg-brand-accent
              "
            />

            <p
              className="
                text-[14px]
                font-bold
                leading-7

                text-white/48

                sm:text-[15px]
              "
            >
              هدف، پیش‌بینی قطعی بازار نیست؛ هدف، فهم پیامدهای احتمالی شرایط
              مختلف برای تصمیم است.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes macroPulse {
          0%,
          100% {
            opacity: 0.65;
          }

          50% {
            opacity: 1;
          }
        }

        .dnh-macro-pulse {
          animation: macroPulse 3.4s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .dnh-macro-pulse {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

/* =============================================================================
   ENVIRONMENT CELL
============================================================================= */

function EnvironmentCell({ title }: { title: string }) {
  return (
    <div
      className="
        flex
        min-h-[68px]
        items-center

        border-b
        border-l
        border-white/[0.075]

        px-4

        last:border-b-0
      "
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="
            h-[6px]
            w-[6px]

            shrink-0

            bg-[#82cee4]/65
          "
        />

        <span
          className="
            text-[14px]
            font-black
            leading-6

            text-white/68
          "
        >
          {title}
        </span>
      </div>
    </div>
  );
}

/* =============================================================================
   DECISION EFFECT
============================================================================= */

function DecisionEffectCell({ title }: { title: string }) {
  return (
    <div
      className="
        flex
        min-h-[68px]
        items-center

        border-b
        border-l
        border-brand-accent/10

        px-4
      "
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="
            h-[6px]
            w-[6px]

            shrink-0

            bg-brand-accent/80
          "
        />

        <span
          className="
            text-[14px]
            font-black
            leading-6

            text-white/72
          "
        >
          {title}
        </span>
      </div>
    </div>
  );
}

/* =============================================================================
   MOBILE CONNECTOR
============================================================================= */

function MobileConnector({ accent = false }: { accent?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="
        relative

        mx-auto
        h-9
        w-px
      "
    >
      <span
        className={`
          absolute
          inset-0

          ${accent ? "bg-brand-accent/45" : "bg-[#82cee4]/25"}
        `}
      />

      <span
        className={`
          absolute
          bottom-[-3px]
          left-1/2

          h-[11px]
          w-[11px]

          -translate-x-1/2

          ${accent ? "bg-brand-accent" : "bg-[#82cee4]/65"}
        `}
      />
    </div>
  );
}

/* =============================================================================
   BACKGROUND
============================================================================= */

function EnvironmentBackground() {
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
            "radial-gradient(circle at 50% 48%,rgba(22,115,148,.20),transparent 30%),linear-gradient(116deg,#022936 0%,#033847 52%,#022d3a 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.045]
        "
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,.08) 1px,transparent 1px)",
          backgroundSize: "118px 100%",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-1/2

          h-px

          bg-white/[0.025]
        "
      />
    </>
  );
}
