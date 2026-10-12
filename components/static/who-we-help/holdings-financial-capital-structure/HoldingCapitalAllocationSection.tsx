/* =============================================================================
   HOLDING — CAPITAL ALLOCATION

   Soft / structured / highly readable

   Core question:
   Where is group capital,
   and what role does each part play?

   No fake percentages.
   No portfolio chart.
   No meaningless flow.
============================================================================= */

const CAPITAL_AREAS = [
  {
    label: "دارایی‌های مولد",
    title: "سرمایه‌ای که در فعالیت اقتصادی نقش دارد",
    question: "این بخش چه نقشی در عملکرد و اهداف گروه دارد؟",
  },
  {
    label: "دارایی‌های غیرمولد",
    title: "منابعی که باید جایگاه آن‌ها روشن باشد",
    question: "آیا نگهداری این دارایی‌ها با اولویت‌های گروه هم‌راستاست؟",
  },
  {
    label: "نقدینگی",
    title: "منابعی که باید در زمان مناسب در دسترس باشند",
    question: "آیا سطح دسترسی به منابع با نیازهای گروه تناسب دارد؟",
  },
] as const;

export function HoldingCapitalAllocationSection() {
  return (
    <section
      id="holding-capital-allocation"
      dir="rtl"
      aria-labelledby="holding-capital-allocation-title"
      className="
        relative
        isolate
        scroll-mt-24
        overflow-hidden

        bg-[#f6f9fa]

        py-16

        sm:scroll-mt-28
        sm:py-20
        lg:py-20
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
        <div
          className="
            grid
            gap-10

            lg:grid-cols-[0.8fr_1.2fr]
            lg:items-center
            lg:gap-16

            xl:gap-20
          "
        >
          {/* ===========================================================
              COPY
          ============================================================ */}

          <div>
            <div className="mb-4 flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-9 bg-brand-accent" />

              <p
                className="
                  text-[13px]
                  font-black
                  text-brand-primary/70
                "
              >
                تخصیص سرمایه
              </p>
            </div>

            <h2
              id="holding-capital-allocation-title"
              className="
                max-w-[720px]
                [text-wrap:balance]

                text-[29px]
                font-black
                leading-[1.72]
                tracking-[-0.04em]

                text-[#10242c]

                sm:text-[35px]

                lg:text-[41px]
                lg:leading-[1.58]
              "
            >
              فقط محل سرمایه مهم نیست؛{" "}
              <span className="text-brand-primary">
                نقش آن در کل گروه باید روشن باشد.
              </span>
            </h2>

            <p
              className="
                mt-5
                max-w-[590px]

                text-[15px]
                font-medium
                leading-[2.05]

                text-[#60737a]

                sm:text-[16px]
              "
            >
              سرمایه ممکن است میان دارایی‌ها و بخش‌های مختلف گروه توزیع شده
              باشد. برای تصمیم‌گیری بهتر، باید مشخص شود هر بخش چه نقشی دارد و
              چگونه با نقدینگی، ریسک و اهداف گروه ارتباط پیدا می‌کند.
            </p>

            <div
              className="
                mt-7

                border-r-2
                border-brand-accent

                pr-4
              "
            >
              <p
                className="
                  max-w-[540px]

                  text-[14px]
                  font-bold
                  leading-7

                  text-[#385a64]

                  sm:text-[15px]
                "
              >
                سؤال اصلی فقط{" "}
                <span className="text-brand-primary">«سرمایه کجاست؟»</span>{" "}
                نیست؛ باید بدانیم در ساختار گروه چه کاری انجام می‌دهد.
              </p>
            </div>
          </div>

          {/* ===========================================================
              CAPITAL MAP
          ============================================================ */}

          <div
            aria-labelledby="capital-map-title"
            className="
              relative

              border
              border-brand-primary/14

              bg-white

              shadow-[0_24px_70px_rgba(4,61,78,.05)]
            "
          >
            {/* ---------------------------------------------------------
                HEADER
            ---------------------------------------------------------- */}

            <div
              className="
                flex
                items-center
                justify-between
                gap-5

                border-b
                border-brand-primary/10

                px-5
                py-5

                sm:px-6
              "
            >
              <div>
                <p
                  className="
                    text-[13px]
                    font-black
                    text-brand-primary/48
                  "
                >
                  نقشه سرمایه گروه
                </p>

                <h3
                  id="capital-map-title"
                  className="
                    mt-1

                    text-[19px]
                    font-black
                    leading-8

                    text-[#173b45]
                  "
                >
                  سرمایه کجاست و چه نقشی دارد؟
                </h3>
              </div>

              <span
                aria-hidden="true"
                className="
                  h-[11px]
                  w-[11px]

                  shrink-0

                  bg-brand-accent
                "
              />
            </div>

            {/* ---------------------------------------------------------
                CAPITAL AREAS
            ---------------------------------------------------------- */}

            <div>
              {CAPITAL_AREAS.map((item, index) => (
                <CapitalArea
                  key={item.label}
                  index={index + 1}
                  label={item.label}
                  title={item.title}
                  question={item.question}
                  accent={index === 0}
                />
              ))}
            </div>

            {/* ---------------------------------------------------------
                ALLOCATION QUESTION
            ---------------------------------------------------------- */}

            <div
              className="
                relative

                border-t
                border-brand-primary/10

                bg-brand-primary/[0.04]

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
                  grid
                  gap-3

                  sm:grid-cols-[145px_1fr]
                  sm:items-center
                  sm:gap-6
                "
              >
                <p
                  className="
                    text-[14px]
                    font-black

                    text-brand-accent
                  "
                >
                  سؤال تخصیص
                </p>

                <p
                  className="
                    text-[16px]
                    font-black
                    leading-8

                    text-[#31545e]
                  "
                >
                  آیا ترکیب فعلی سرمایه با نیاز، ریسک و اهداف کل گروه هماهنگ
                  است؟
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===========================================================
            BOTTOM NOTE
        ============================================================ */}

        <div
          className="
            mt-7

            flex
            items-start
            gap-4

            border-t
            border-brand-primary/[0.08]

            pt-5
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
              max-w-[880px]

              text-[14px]
              font-medium
              leading-7

              text-[#62767d]

              sm:text-[15px]
            "
          >
            بررسی تخصیص سرمایه زمانی معنا پیدا می‌کند که{" "}
            <span className="font-bold text-brand-primary">
              ساختار سرمایه، نقدینگی، تأمین مالی و ریسک نیز در همان تصویر دیده
              شوند.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   CAPITAL AREA
============================================================================= */

function CapitalArea({
  index,
  label,
  title,
  question,
  accent = false,
}: {
  index: number;
  label: string;
  title: string;
  question: string;
  accent?: boolean;
}) {
  return (
    <article
      className="
        group/capital
        relative

        grid
        gap-4

        border-b
        border-brand-primary/[0.09]

        px-5
        py-5

        last:border-b-0

        transition-colors
        duration-300

        hover:bg-[#fafcfd]

        sm:px-6

        lg:grid-cols-[58px_175px_1fr]
        lg:items-center
        lg:gap-6
      "
    >
      {/* number */}

      <span
        className={`
          text-[14px]
          font-black

          ${accent ? "text-brand-accent" : "text-brand-primary/38"}
        `}
      >
        {String(index).padStart(2, "0")}
      </span>

      {/* label */}

      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className={`
            h-[11px]
            w-[11px]

            shrink-0

            ${accent ? "bg-brand-accent" : "bg-brand-primary/25"}
          `}
        />

        <h4
          className="
            text-[16px]
            font-black
            leading-7

            text-[#173b45]
          "
        >
          {label}
        </h4>
      </div>

      {/* meaning */}

      <div
        className="
          lg:border-r
          lg:border-brand-primary/[0.08]
          lg:pr-6
        "
      >
        <p
          className="
            text-[15px]
            font-black
            leading-7

            text-[#31545e]
          "
        >
          {title}
        </p>

        <p
          className="
            mt-1

            text-[14px]
            font-medium
            leading-7

            text-[#6a7d83]
          "
        >
          {question}
        </p>
      </div>

      {/* hover rail */}

      <span
        aria-hidden="true"
        className="
          absolute
          inset-y-0
          right-0

          w-[2px]

          origin-bottom
          scale-y-0

          bg-brand-accent

          transition-transform
          duration-300

          group-hover/capital:scale-y-100
        "
      />
    </article>
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
            "radial-gradient(circle at 80% 30%,rgba(22,115,148,.055),transparent 27%),linear-gradient(180deg,#f7fafb 0%,#ffffff 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-y-0
          right-[9%]

          hidden
          w-px

          bg-brand-primary/[0.025]

          lg:block
        "
      />
    </>
  );
}
