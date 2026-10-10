/* =============================================================================
   RISK MANAGEMENT & WEALTH PROTECTION — DIAGNOSTIC MAP

   Meaning:
   Risk
   → Diagnostic question
   → What becomes visible
   → Structured risk picture
   → Protection priorities

   Server Component
   Compact desktop
   No fake scores
   No decorative flowchart
============================================================================= */

const RISK_CHECKS = [
  {
    risk: "تمرکز",
    question:
      "آیا بخش مهمی از ساختار به یک دارایی، حوزه یا منبع محدود وابسته است؟",
    reveals: "میزان وابستگی",
  },
  {
    risk: "نقدشوندگی",
    question: "آیا منابع مورد نیاز، در زمان مناسب واقعاً قابل‌دسترسی هستند؟",
    reveals: "دسترسی به منابع",
  },
  {
    risk: "ارز",
    question: "کدام بخش از ساختار نسبت به تغییرات ارز حساس‌تر است؟",
    reveals: "حساسیت ارزی",
  },
  {
    risk: "تورم",
    question:
      "تورم چگونه می‌تواند ارزش واقعی و قدرت خرید را تحت تأثیر قرار دهد؟",
    reveals: "حفظ قدرت خرید",
  },
] as const;

export function RiskProtectionExposureSection() {
  return (
    <section
      id="risk-protection-exposure"
      dir="rtl"
      aria-labelledby="risk-protection-exposure-title"
      className="
        relative
        isolate
        scroll-mt-24
        overflow-hidden

        bg-[#022f3e]
        text-white

        py-16

        sm:scroll-mt-28
        sm:py-20

        lg:py-20
      "
    >
      <ExposureBackground />

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
        {/* =============================================================
            HEADER
        ============================================================== */}

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
                  text-[13px]
                  font-black
                  text-white/65
                "
              >
                تشخیص محل آسیب‌پذیری
              </p>
            </div>

            <h2
              id="risk-protection-exposure-title"
              className="
                max-w-[900px]
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
              هر ریسک، سؤال متفاوتی از ساختار می‌پرسد؛{" "}
              <span className="text-brand-accent">
                پاسخ‌ها نشان می‌دهند کجا باید بیشتر محافظت شود.
              </span>
            </h2>
          </div>

          <p
            className="
              max-w-[590px]

              text-[15px]
              font-medium
              leading-[2.05]

              text-white/52

              sm:text-[16px]
            "
          >
            فقط دانستن نام ریسک کافی نیست. بررسی باید مشخص کند هر ریسک در کدام
            بخش از ساختار معنا پیدا می‌کند و چه نوع آسیب‌پذیری را آشکار می‌کند.
          </p>
        </div>

        {/* =============================================================
            DIAGNOSTIC MAP
        ============================================================== */}

        <div
          className="
            relative
            mt-10
            overflow-hidden

            border
            border-white/12

            bg-white/[0.018]

            shadow-[0_30px_90px_rgba(0,0,0,.18)]

            lg:mt-12
          "
        >
          {/* ===========================================================
              DESKTOP
          ============================================================ */}

          <div className="hidden lg:block">
            {/* COLUMN LABELS */}

            <div
              className="
                grid
                grid-cols-[160px_minmax(0,1fr)_210px]
                items-center

                border-b
                border-white/10

                bg-black/[0.06]

                px-7
                py-4

                xl:grid-cols-[180px_minmax(0,1fr)_230px]
                xl:px-9
              "
            >
              <p
                className="
                  text-[14px]
                  font-black
                  text-white/46
                "
              >
                محور ریسک
              </p>

              <p
                className="
                  text-[14px]
                  font-black
                  text-white/46
                "
              >
                سؤال بررسی
              </p>

              <p
                className="
                  text-[14px]
                  font-black
                  text-white/46
                "
              >
                چه چیزی روشن می‌شود؟
              </p>
            </div>

            {/* ROWS */}

            <div>
              {RISK_CHECKS.map((item, index) => (
                <DiagnosticRow key={item.risk} {...item} accent={index === 0} />
              ))}
            </div>

           
          </div>

          {/* ===========================================================
              MOBILE / TABLET
          ============================================================ */}

          <div
            className="
              divide-y
              divide-white/10

              lg:hidden
            "
          >
            {RISK_CHECKS.map((item, index) => (
              <MobileDiagnostic
                key={item.risk}
                {...item}
                accent={index === 0}
              />
            ))}

            <div
              className="
                bg-black/[0.07]

                px-5
                py-5
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <span
                  aria-hidden="true"
                  className="h-[11px] w-[11px] bg-[#82cee4]/65"
                />

                <p
                  className="
                    text-[14px]
                    font-black
                    text-white/65
                  "
                >
                  تصویر ساختاریافته ریسک‌ها
                </p>
              </div>

              <div
                className="
                  mt-4

                  border-r-2
                  border-brand-accent

                  bg-brand-accent/[0.035]

                  px-4
                  py-4
                "
              >
                <p
                  className="
                    text-[16px]
                    font-black

                    text-brand-accent
                  "
                >
                  اولویت‌های حفاظتی
                </p>

                <p
                  className="
                    mt-2

                    text-[14px]
                    font-medium
                    leading-7

                    text-white/50
                  "
                >
                  مشخص می‌شود کدام بخش از ساختار به توجه و حفاظت بیشتری نیاز
                  دارد.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   DESKTOP DIAGNOSTIC ROW
============================================================================= */

function DiagnosticRow({
  risk,
  question,
  reveals,
  accent = false,
}: {
  risk: string;
  question: string;
  reveals: string;
  accent?: boolean;
}) {
  return (
    <div
      className="
        group/row
        relative

        grid
        min-h-[82px]

        grid-cols-[160px_minmax(0,1fr)_210px]
        items-center

        border-b
        border-white/[0.075]

        px-7

        last:border-b-0

        transition-colors
        duration-300

        hover:bg-white/[0.018]

        xl:grid-cols-[180px_minmax(0,1fr)_230px]
        xl:px-9
      "
    >
      {/* RISK */}

      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        <span
          aria-hidden="true"
          className={`
            h-[11px]
            w-[11px]

            shrink-0

            ${accent ? "bg-brand-accent" : "bg-[#82cee4]/60"}
          `}
        />

        <h3
          className="
            text-[16px]
            font-black
            text-white
          "
        >
          {risk}
        </h3>
      </div>

      {/* QUESTION */}

      <div
        className="
          relative

          border-x
          border-white/[0.07]

          px-6
          py-4
        "
      >
        <p
          className="
            text-[14px]
            font-medium
            leading-7

            text-white/58
          "
        >
          {question}
        </p>

        {/* meaningful scan rail */}

        <span
          aria-hidden="true"
          className="
            absolute
            bottom-0
            right-6

            h-px
            w-0

            bg-brand-accent/55

            transition-[width]
            duration-300

            group-hover/row:w-12
          "
        />
      </div>

      {/* REVEAL */}

      <div
        className="
          flex
          items-center
          gap-3

          pr-6
        "
      >
        <span
          aria-hidden="true"
          className="
            h-px
            w-6

            shrink-0

            bg-white/14
          "
        />

        <p
          className="
            text-[15px]
            font-black
            leading-7

            text-white/72
          "
        >
          {reveals}
        </p>
      </div>
    </div>
  );
}

/* =============================================================================
   MOBILE DIAGNOSTIC
============================================================================= */

function MobileDiagnostic({
  risk,
  question,
  reveals,
  accent = false,
}: {
  risk: string;
  question: string;
  reveals: string;
  accent?: boolean;
}) {
  return (
    <article
      className="
        px-5
        py-5

        sm:px-6
      "
    >
      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        <span
          aria-hidden="true"
          className={`
            h-[11px]
            w-[11px]

            shrink-0

            ${accent ? "bg-brand-accent" : "bg-[#82cee4]/60"}
          `}
        />

        <h3
          className="
            text-[16px]
            font-black

            text-white
          "
        >
          {risk}
        </h3>
      </div>

      <p
        className="
          mt-3

          text-[14px]
          font-medium
          leading-7

          text-white/55
        "
      >
        {question}
      </p>

      <div
        className="
          mt-4

          flex
          items-center
          gap-3
        "
      >
        <span
          aria-hidden="true"
          className="
            h-px
            w-7

            bg-brand-accent/38
          "
        />

        <p
          className="
            text-[14px]
            font-black

            text-white/75
          "
        >
          روشن می‌شود: {reveals}
        </p>
      </div>
    </article>
  );
}

/* =============================================================================
   BACKGROUND
============================================================================= */

function ExposureBackground() {
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
            "radial-gradient(circle at 62% 48%,rgba(22,115,148,.20),transparent 31%),linear-gradient(116deg,#022936 0%,#033847 52%,#022d3a 100%)",
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
    </>
  );
}
