/* =============================================================================
   STRATEGIC FINANCIAL ADVISORY — SIGNATURE SECTION

   Simple visual logic:
   Reviewed areas → Integrated view → Decision picture

   Server Component
   No client JS
   No image dependency
============================================================================= */

const REVIEW_INPUTS = [
  "ساختار سرمایه",
  "نقدینگی",
  "تأمین مالی",
  "تخصیص سرمایه",
] as const;

const DECISION_OUTPUTS = [
  "ساختار مالی",
  "گزینه‌های قابل بررسی",
  "ریسک‌های مهم",
  "مسیر تصمیم",
] as const;

export function StrategicAdvisoryArchitectureSection() {
  return (
    <section
      id="strategic-advisory-architecture"
      dir="rtl"
      aria-labelledby="strategic-advisory-architecture-title"
      className="
        relative
        isolate

        scroll-mt-24
        overflow-hidden

        bg-[#022f3e]
        text-white

        py-24

        sm:scroll-mt-28
        sm:py-28

        lg:py-32
      "
    >
      <SectionBackground />

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
            items-end
            gap-8

            lg:grid-cols-[1.08fr_0.92fr]
            lg:gap-16
          "
        >
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-10 bg-brand-accent" />

              <p
                className="
                  text-[10px]
                  font-black

                  text-white/58

                  sm:text-[11px]
                "
              >
                نگاه یکپارچه به تصمیم
              </p>
            </div>

            <h2
              id="strategic-advisory-architecture-title"
              className="
                max-w-[850px]
                [text-wrap:balance]

                text-[30px]
                font-black
                leading-[1.75]
                tracking-[-0.045em]

                text-white

                sm:text-[36px]

                lg:text-[42px]
                lg:leading-[1.65]

                xl:text-[47px]
              "
            >
              وقتی اجزای مالی کنار هم دیده می‌شوند،{" "}
              <span className="text-brand-accent">
                مسیر تصمیم روشن‌تر می‌شود.
              </span>
            </h2>
          </div>

          <div className="lg:pb-1 lg:pr-8">
            <p
              className="
                max-w-[570px]

                text-[13px]
                font-medium
                leading-[2.25]

                text-white/48

                sm:text-[14px]
                lg:text-[15px]
              "
            >
              هدف فقط بررسی جداگانه هر موضوع نیست؛ مسئله اصلی، دیدن ارتباط میان
              وضعیت مالی، گزینه‌های پیش رو و ریسک‌های مرتبط با تصمیم است.
            </p>
          </div>
        </div>

        {/* ===============================================================
            MAIN VISUAL
        ================================================================ */}

        <div
          role="img"
          aria-label="نمایش تبدیل بررسی ساختار سرمایه، نقدینگی، تأمین مالی و تخصیص سرمایه به تصویری روشن‌تر از ساختار مالی، گزینه‌ها، ریسک‌ها و مسیر تصمیم"
          className="
            relative
            mt-14

            overflow-hidden

            border
            border-white/12

            bg-white/[0.018]

            shadow-[0_45px_130px_rgba(0,0,0,.22)]

            lg:mt-16
          "
        >
          {/* top rail */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-6

              border-b
              border-white/10

              px-5
              py-5

              sm:px-6
              lg:px-8
            "
          >
            <div>
              <p className="text-[10px] font-black text-white/72">
                از بررسی اجزا تا تصویر تصمیم
              </p>

              <p className="mt-1.5 text-[9px] font-medium text-white/27">
                نمایش مفهومی، نه مدل داخلی DNH
              </p>
            </div>

            <div aria-hidden="true" className="flex items-center gap-2">
              <span className="h-[5px] w-[5px] bg-[#82cee4]/65" />

              <span className="h-px w-8 bg-white/15" />

              <span
                className="
                  h-[5px]
                  w-[5px]

                  bg-brand-accent

                  dnh-decision-pulse
                "
              />
            </div>
          </div>

          {/* =============================================================
              DESKTOP
          ============================================================== */}

          <div
            className="
              relative
              hidden

              min-h-[480px]

              grid-cols-[1fr_190px_1fr]
              items-stretch

              lg:grid
            "
          >
            {/* -----------------------------------------------------------
                INPUT SIDE
            ------------------------------------------------------------ */}

            <div
              className="
                relative

                flex
                flex-col
                justify-center

                px-10
                py-12

                xl:px-14
              "
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="h-[5px] w-[5px] bg-[#82cee4]/75" />

                <p
                  className="
                    text-[10px]
                    font-black

                    text-[#82cee4]/75
                  "
                >
                  آنچه بررسی می‌شود
                </p>
              </div>

              <div
                className="
                  border-y
                  border-white/10
                "
              >
                {REVIEW_INPUTS.map((item) => (
                  <InputRow key={item} title={item} />
                ))}
              </div>

              <p
                className="
                  mt-5

                  max-w-[390px]

                  text-[9px]
                  font-medium
                  leading-6

                  text-white/24
                "
              >
                هر محور به‌تنهایی بخشی از تصویر را نشان می‌دهد.
              </p>
            </div>

            {/* -----------------------------------------------------------
                CENTER BRIDGE
            ------------------------------------------------------------ */}

            <div
              className="
                relative

                flex
                items-center
                justify-center

                border-x
                border-white/[0.07]

                bg-black/[0.055]
              "
            >
              {/* incoming line */}

              <span
                aria-hidden="true"
                className="
                  absolute
                  right-0
                  top-1/2

                  h-px
                  w-[34%]

                  -translate-y-1/2

                  bg-[#82cee4]/35
                "
              />

              {/* outgoing line */}

              <span
                aria-hidden="true"
                className="
                  absolute
                  left-0
                  top-1/2

                  h-px
                  w-[34%]

                  -translate-y-1/2

                  bg-brand-accent/60
                "
              />

              <div
                className="
                  relative
                  z-10

                  flex
                  h-[168px]
                  w-[128px]

                  flex-col
                  items-center
                  justify-center

                  border
                  border-brand-accent/65

                  bg-[#063746]

                  text-center

                  shadow-[0_0_65px_rgba(252,133,2,.07)]
                "
              >
                {/* corner */}

                <span
                  aria-hidden="true"
                  className="
                    absolute
                    right-[-1px]
                    top-[-1px]

                    h-7
                    w-[2px]

                    bg-brand-accent
                  "
                />

                <span
                  aria-hidden="true"
                  className="
                    absolute
                    right-[-1px]
                    top-[-1px]

                    h-[2px]
                    w-7

                    bg-brand-accent
                  "
                />

                <span
                  aria-hidden="true"
                  className="
                    mb-4

                    h-[8px]
                    w-[8px]

                    bg-brand-accent

                    shadow-[0_0_22px_rgba(252,133,2,.42)]

                    dnh-decision-pulse
                  "
                />

                <p
                  className="
                    text-[11px]
                    font-black
                    leading-6

                    text-white
                  "
                >
                  بررسی
                  <br />
                  یکپارچه
                </p>

                <span
                  aria-hidden="true"
                  className="
                    my-4

                    h-px
                    w-7

                    bg-white/10
                  "
                />

                <p
                  className="
                    text-[8px]
                    font-bold
                    leading-5

                    text-white/30
                  "
                >
                  دیدن ارتباط
                  <br />
                  میان اجزا
                </p>
              </div>
            </div>

            {/* -----------------------------------------------------------
                OUTPUT SIDE
            ------------------------------------------------------------ */}

            <div
              className="
                relative

                flex
                flex-col
                justify-center

                px-10
                py-12

                xl:px-14
              "
            >
              <div className="mb-6 flex items-center gap-3">
                <span
                  className="
                    h-[5px]
                    w-[5px]

                    bg-brand-accent

                    dnh-decision-pulse
                  "
                />

                <p
                  className="
                    text-[10px]
                    font-black

                    text-brand-accent
                  "
                >
                  آنچه روشن‌تر می‌شود
                </p>
              </div>

              <div
                className="
                  border-y
                  border-white/10
                "
              >
                {DECISION_OUTPUTS.map((item, index) => (
                  <OutputRow
                    key={item}
                    title={item}
                    active={index === DECISION_OUTPUTS.length - 1}
                  />
                ))}
              </div>

              <p
                className="
                  mt-5

                  max-w-[390px]

                  text-[9px]
                  font-medium
                  leading-6

                  text-white/24
                "
              >
                خروجی، تصویر ساختاریافته‌تری برای بررسی مسیرهای پیش رو است.
              </p>
            </div>

            {/* top structural markers */}

            <span
              aria-hidden="true"
              className="
                absolute
                right-0
                top-0

                h-8
                w-px

                bg-[#82cee4]/40
              "
            />

            <span
              aria-hidden="true"
              className="
                absolute
                left-0
                bottom-0

                h-8
                w-px

                bg-brand-accent/50
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

              sm:px-7

              lg:hidden
            "
          >
            {/* Inputs */}

            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-[5px] w-[5px] bg-[#82cee4]/70" />

                <p
                  className="
                    text-[10px]
                    font-black

                    text-[#82cee4]/75
                  "
                >
                  آنچه بررسی می‌شود
                </p>
              </div>

              <div className="border-y border-white/10">
                {REVIEW_INPUTS.map((item) => (
                  <InputRow key={item} title={item} />
                ))}
              </div>
            </div>

            {/* connector */}

            <div
              aria-hidden="true"
              className="
                relative

                mx-auto
                h-10
                w-px

                bg-[#82cee4]/25
              "
            >
              <span
                className="
                  absolute
                  bottom-[-3px]
                  left-1/2

                  h-[7px]
                  w-[7px]

                  -translate-x-1/2

                  bg-brand-accent

                  dnh-decision-pulse
                "
              />
            </div>

            {/* integration */}

            <div
              className="
                relative

                mx-auto
                max-w-[280px]

                border
                border-brand-accent/60

                bg-[#063746]

                px-5
                py-5

                text-center
              "
            >
              <span
                aria-hidden="true"
                className="
                  absolute
                  right-[-1px]
                  top-[-1px]

                  h-6
                  w-[2px]

                  bg-brand-accent
                "
              />

              <p className="text-[12px] font-black text-white">بررسی یکپارچه</p>

              <p
                className="
                  mt-2

                  text-[9px]
                  font-medium
                  leading-5

                  text-white/32
                "
              >
                دیدن ارتباط میان اجزای مالی تصمیم
              </p>
            </div>

            {/* connector */}

            <div
              aria-hidden="true"
              className="
                mx-auto
                h-10
                w-px

                bg-brand-accent/45
              "
            />

            {/* outputs */}

            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-[5px] w-[5px] bg-brand-accent" />

                <p
                  className="
                    text-[10px]
                    font-black

                    text-brand-accent
                  "
                >
                  آنچه روشن‌تر می‌شود
                </p>
              </div>

              <div className="border-y border-white/10">
                {DECISION_OUTPUTS.map((item, index) => (
                  <OutputRow
                    key={item}
                    title={item}
                    active={index === DECISION_OUTPUTS.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* =============================================================
              FOOTER
          ============================================================== */}

          <div
            className="
              flex
              flex-col
              gap-3

              border-t
              border-white/10

              bg-black/[0.07]

              px-5
              py-4

              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:gap-8
              sm:px-6

              lg:px-8
            "
          >
            <div className="flex items-center gap-3">
              <span className="h-[5px] w-[5px] bg-brand-accent" />

              <p
                className="
                  text-[9px]
                  font-bold

                  text-white/38
                "
              >
                هدف، روشن‌تر کردن تصمیم است؛ نه پیچیده‌تر کردن آن.
              </p>
            </div>

            <p
              className="
                max-w-[490px]

                text-[8px]
                font-medium
                leading-5

                text-white/20
              "
            >
              این نمایش صرفاً حوزه‌های عمومی بررسی را نشان می‌دهد و شامل منطق
              اختصاصی DNH نیست.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dnhDecisionPulse {
          0%,
          100% {
            opacity: 0.62;
          }

          50% {
            opacity: 1;
          }
        }

        .dnh-decision-pulse {
          animation: dnhDecisionPulse 3.5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .dnh-decision-pulse {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

/* =============================================================================
   INPUT ROW
============================================================================= */

function InputRow({ title }: { title: string }) {
  return (
    <div
      className="
        group/input

        flex
        min-h-[58px]
        items-center
        justify-between

        border-b
        border-white/[0.075]

        px-1

        last:border-b-0
      "
    >
      <span
        className="
          text-[11px]
          font-black

          text-white/58

          transition-colors
          duration-300

          group-hover/input:text-white/82
        "
      >
        {title}
      </span>

      <span
        aria-hidden="true"
        className="
          flex
          items-center
          gap-2
        "
      >
        <span className="h-px w-5 bg-[#82cee4]/20" />

        <span className="h-[5px] w-[5px] bg-[#82cee4]/60" />
      </span>
    </div>
  );
}

/* =============================================================================
   OUTPUT ROW
============================================================================= */

function OutputRow({
  title,
  active = false,
}: {
  title: string;
  active?: boolean;
}) {
  return (
    <div
      className={`
        group/output

        relative

        flex
        min-h-[58px]
        items-center
        justify-between

        border-b
        border-white/[0.075]

        px-1

        last:border-b-0

        ${active ? "text-white" : ""}
      `}
    >
      {active && (
        <span
          aria-hidden="true"
          className="
            absolute
            inset-y-[14px]
            -right-[14px]

            w-[2px]

            bg-brand-accent
          "
        />
      )}

      <span
        className={`
          text-[11px]
          font-black

          transition-colors
          duration-300

          ${
            active
              ? "text-brand-accent"
              : "text-white/62 group-hover/output:text-white/85"
          }
        `}
      >
        {title}
      </span>

      <span
        aria-hidden="true"
        className="
          flex
          items-center
          gap-2
        "
      >
        <span
          className={`
            h-px
            w-5

            ${active ? "bg-brand-accent/45" : "bg-white/10"}
          `}
        />

        <span
          className={`
            h-[5px]
            w-[5px]

            ${active ? "bg-brand-accent dnh-decision-pulse" : "bg-white/24"}
          `}
        />
      </span>
    </div>
  );
}

/* =============================================================================
   BACKGROUND
============================================================================= */

function SectionBackground() {
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
            "radial-gradient(circle at 50% 54%,rgba(22,115,148,.20),transparent 31%),linear-gradient(118deg,#022936 0%,#033847 54%,#022d3a 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.05]
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
          top-[42%]

          h-px

          bg-white/[0.025]
        "
      />
    </>
  );
}
