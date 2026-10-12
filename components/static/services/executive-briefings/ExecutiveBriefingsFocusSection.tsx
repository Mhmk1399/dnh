/* =============================================================================
   EXECUTIVE BRIEFINGS — FOCUS SECTION

   Meaning:
   One central issue
   examined through:
   - Context
   - Risk
   - Scenarios

   then translated into decision-relevant focus.

   Soft / compact / editorial
   No card grid
============================================================================= */

const FOCUS_LENSES = [
  {
    title: "زمینه مرتبط",
    description:
      "شرایط و اطلاعاتی که برای فهم درست موضوع واقعاً به تصمیم ارتباط دارند.",
  },
  {
    title: "ریسک‌های مرتبط",
    description:
      "ریسک‌هایی که می‌توانند نتیجه، زمان‌بندی یا مسیر تصمیم را تغییر دهند.",
  },
  {
    title: "سناریوهای قابل بررسی",
    description:
      "وضعیت‌های متفاوتی که لازم است پیش از تصمیم در نظر گرفته شوند.",
  },
] as const;

export function ExecutiveBriefingsFocusSection() {
  return (
    <section
      id="executive-briefings-focus"
      dir="rtl"
      aria-labelledby="executive-briefings-focus-title"
      className="
        relative
        isolate

        scroll-mt-24
        overflow-hidden

        bg-[#f7fafb]

        py-16

        sm:scroll-mt-28
        sm:py-20

        lg:py-20
      "
    >
      <FocusBackground />

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
                  text-[13px]
                  font-black

                  text-brand-primary/75
                "
              >
                تمرکز بریفینگ
              </p>
            </div>

            <h2
              id="executive-briefings-focus-title"
              className="
                max-w-[860px]
                [text-wrap:balance]

                text-[28px]
                font-black
                leading-[1.72]
                tracking-[-0.04em]

                text-[#10242c]

                sm:text-[34px]

                lg:text-[40px]
                lg:leading-[1.6]
              "
            >
              همه اطلاعات به یک اندازه مهم نیستند؛{" "}
              <span className="text-brand-primary">
                فقط آنچه به تصمیم مربوط است باید وارد تمرکز شود.
              </span>
            </h2>
          </div>

          <p
            className="
              max-w-[590px]

              text-[15px]
              font-medium
              leading-[2.05]

              text-[#5e7279]

              sm:text-[16px]
            "
          >
            موضوع اصلی ابتدا مشخص می‌شود؛ سپس زمینه، ریسک‌ها و سناریوهایی بررسی
            می‌شوند که واقعاً می‌توانند بر همان تصمیم اثر بگذارند.
          </p>
        </div>

        {/* ===============================================================
            EXECUTIVE FOCUS FRAME
        ================================================================ */}

        <div
          className="
            relative

            mt-10

            overflow-hidden

            border-y
            border-brand-primary/14

            bg-white

            shadow-[0_18px_50px_rgba(5,62,79,.035)]

            lg:mt-12
          "
        >
          {/* =============================================================
              DESKTOP
          ============================================================== */}

          <div
            className="
              hidden

              grid-cols-[245px_1fr]

              lg:grid
            "
          >
            {/* -----------------------------------------------------------
                CENTRAL SUBJECT
            ------------------------------------------------------------ */}

            <div
              className="
                relative

                flex
                flex-col
                justify-center

                border-l
                border-brand-primary/12

                bg-brand-primary/[0.035]

                px-7
                py-8
              "
            >
              <span
                aria-hidden="true"
                className="
                  absolute
                  inset-y-0
                  right-0

                  w-[2px]

                  bg-brand-accent
                "
              />

              <p
                className="
                  text-[14px]
                  font-black

                  text-brand-primary/55
                "
              >
                نقطه تمرکز
              </p>

              <p
                className="
                  mt-3

                  text-[21px]
                  font-black
                  leading-8

                  text-[#173b45]
                "
              >
                موضوع اصلی تصمیم
              </p>

              <p
                className="
                  mt-3

                  text-[14px]
                  font-medium
                  leading-7

                  text-[#687b81]
                "
              >
                یک موضوع مشخص که نیاز دارد در سطح تصمیم‌گیرنده ارشد روشن‌تر دیده
                شود.
              </p>
            </div>

            {/* -----------------------------------------------------------
                LENSES
            ------------------------------------------------------------ */}

            <div className="divide-y divide-brand-primary/10">
              {FOCUS_LENSES.map((item, index) => (
                <FocusLensRow
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  accent={index === 2}
                />
              ))}
            </div>
          </div>

          {/* =============================================================
              MOBILE
          ============================================================== */}

          <div className="lg:hidden">
            <div
              className="
                relative

                border-b
                border-brand-primary/12

                bg-brand-primary/[0.035]

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

                  w-[2px]

                  bg-brand-accent
                "
              />

              <p
                className="
                  text-[14px]
                  font-black

                  text-brand-primary/55
                "
              >
                نقطه تمرکز
              </p>

              <p
                className="
                  mt-2

                  text-[18px]
                  font-black

                  text-[#173b45]
                "
              >
                موضوع اصلی تصمیم
              </p>

              <p
                className="
                  mt-2

                  text-[14px]
                  font-medium
                  leading-7

                  text-[#687b81]
                "
              >
                موضوعی مشخص که بریفینگ حول همان مسئله شکل می‌گیرد.
              </p>
            </div>

            <div className="divide-y divide-brand-primary/10">
              {FOCUS_LENSES.map((item, index) => (
                <MobileFocusLens
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  accent={index === 2}
                />
              ))}
            </div>
          </div>

          {/* =============================================================
              RESULT
          ============================================================== */}

          <div
            className="
              flex
              items-start
              gap-4

              border-t
              border-brand-primary/12

              bg-[#f8fbfc]

              px-5
              py-4

              sm:px-6
              lg:px-7
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

                text-[#365963]

                sm:text-[15px]
              "
            >
              نتیجه این تمرکز باید مشخص کند{" "}
              <span className="text-brand-primary">
                چه چیزی برای تصمیم مهم است، چه سناریوهایی باید دیده شوند و چه
                مسیرهایی ارزش بررسی دارند.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   DESKTOP FOCUS LENS
============================================================================= */

function FocusLensRow({
  title,
  description,
  accent = false,
}: {
  title: string;
  description: string;
  accent?: boolean;
}) {
  return (
    <article
      className="
        group/lens
        relative

        grid
        min-h-[92px]

        grid-cols-[200px_1fr]
        items-center

        px-7

        transition-colors
        duration-300

        hover:bg-brand-primary/[0.018]

        xl:px-8
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

            ${accent ? "bg-brand-accent" : "bg-brand-primary/28"}
          `}
        />

        <h3
          className="
            text-[16px]
            font-black
            leading-7

            text-[#173b45]
          "
        >
          {title}
        </h3>
      </div>

      <div
        className="
          border-r
          border-brand-primary/[0.08]

          pr-6
        "
      >
        <p
          className="
            text-[14px]
            font-medium
            leading-7

            text-[#687b81]
          "
        >
          {description}
        </p>
      </div>

      <span
        aria-hidden="true"
        className="
          absolute
          bottom-0
          right-7

          h-[2px]
          w-0

          bg-brand-accent

          transition-[width]
          duration-300

          group-hover/lens:w-10

          xl:right-8
        "
      />
    </article>
  );
}

/* =============================================================================
   MOBILE FOCUS LENS
============================================================================= */

function MobileFocusLens({
  title,
  description,
  accent = false,
}: {
  title: string;
  description: string;
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
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className={`
            h-[11px]
            w-[11px]

            shrink-0

            ${accent ? "bg-brand-accent" : "bg-brand-primary/28"}
          `}
        />

        <h3
          className="
            text-[16px]
            font-black

            text-[#173b45]
          "
        >
          {title}
        </h3>
      </div>

      <p
        className="
          mt-2
          pr-[19px]

          text-[14px]
          font-medium
          leading-7

          text-[#687b81]
        "
      >
        {description}
      </p>
    </article>
  );
}

/* =============================================================================
   BACKGROUND
============================================================================= */

function FocusBackground() {
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
            "radial-gradient(circle at 84% 26%,rgba(22,115,148,.045),transparent 24%),linear-gradient(180deg,#f7fafb 0%,#ffffff 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-y-0
          left-[9%]

          hidden
          w-px

          bg-brand-primary/[0.025]

          lg:block
        "
      />
    </>
  );
}
