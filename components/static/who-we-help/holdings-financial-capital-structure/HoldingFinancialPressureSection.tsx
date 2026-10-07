/* =============================================================================
   HOLDING FINANCIAL STRUCTURE — FRAGMENTED DECISIONS

   Light section

   Core idea:
   A decision may make sense locally,
   while the group-level picture is still incomplete.

   Right  → decisions viewed separately
   Left   → what must be visible at group level
============================================================================= */

const LOCAL_DECISIONS = [
  {
    title: "تخصیص سرمایه",
    text: "سرمایه در کدام شرکت یا بخش به‌کار گرفته شود؟",
  },
  {
    title: "تأمین مالی",
    text: "نیاز مالی از چه مسیری تأمین شود؟",
  },
  {
    title: "نقدینگی",
    text: "منابع نقد در کجا نگه داشته یا مصرف شوند؟",
  },
] as const;

const GROUP_VIEW = ["ساختار مالی", "ریسک گروه", "اهداف کل گروه"] as const;

export function HoldingFinancialPressureSection() {
  return (
    <section
      id="holding-financial-pressure"
      dir="rtl"
      aria-labelledby="holding-financial-pressure-title"
      className="
        relative
        isolate
        scroll-mt-24
        overflow-hidden

        bg-white

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

            lg:grid-cols-[0.82fr_1.18fr]
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
                مسئله در سطح گروه
              </p>
            </div>

            <h2
              id="holding-financial-pressure-title"
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
              هر تصمیم می‌تواند جداگانه منطقی باشد؛{" "}
              <span className="text-brand-primary">
                اما تصویر کل گروه چیز دیگری بگوید.
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
              وقتی نقدینگی، تأمین مالی یا تخصیص سرمایه فقط در سطح یک بخش دیده
              شوند، ارتباط آن تصمیم با ساختار مالی، ریسک و اهداف کل گروه ممکن
              است کمتر دیده شود.
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
                سؤال فقط این نیست که{" "}
                <span className="text-brand-primary">
                  «این تصمیم برای این شرکت مناسب است؟»
                </span>
                ؛ باید دید برای کل ساختار چه معنایی دارد.
              </p>
            </div>
          </div>

          {/* ===========================================================
              LOCAL VS GROUP VIEW
          ============================================================ */}

          <div
            className="
              relative

              border-y
              border-brand-primary/14

              bg-[#f8fbfc]

              shadow-[0_22px_65px_rgba(4,61,78,.05)]
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
                py-4

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
                  دو سطح نگاه
                </p>

                <h3
                  className="
                    mt-1

                    text-[18px]
                    font-black
                    leading-8

                    text-[#173b45]
                  "
                >
                  تصمیم محلی در برابر تصویر کل گروه
                </h3>
              </div>

              <span
                aria-hidden="true"
                className="
                  h-[8px]
                  w-[8px]

                  shrink-0

                  bg-brand-accent
                "
              />
            </div>

            {/* ---------------------------------------------------------
                DESKTOP COMPARISON
            ---------------------------------------------------------- */}

            <div
              className="
                hidden

                grid-cols-[1fr_110px_0.92fr]

                lg:grid
              "
            >
              {/* RIGHT — LOCAL DECISIONS */}

              <div className="border-l border-brand-primary/10">
                <PanelTitle eyebrow="نگاه بخشی" title="هر تصمیم، جداگانه" />

                <div>
                  {LOCAL_DECISIONS.map((item) => (
                    <LocalDecisionRow
                      key={item.title}
                      title={item.title}
                      text={item.text}
                    />
                  ))}
                </div>
              </div>

              {/* CENTER — CONTEXT GAP */}

              <div
                className="
                  relative

                  flex
                  items-center
                  justify-center

                  bg-brand-primary/[0.025]
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    absolute
                    inset-y-0
                    right-1/2

                    w-px

                    bg-brand-primary/10
                  "
                />

                <div
                  className="
                    relative
                    z-10

                    bg-[#f8fbfc]

                    py-6
                  "
                >
                  <div
                    className="
                      flex
                      flex-col
                      items-center
                      gap-3
                    "
                  >
                    <span
                      aria-hidden="true"
                      className="
                        h-9
                        w-[2px]

                        bg-brand-accent
                      "
                    />

                    <p
                      className="
                        max-w-[80px]

                        text-center
                        text-[13px]
                        font-black
                        leading-6

                        text-brand-primary
                      "
                    >
                      ارتباط با تصویر کل
                    </p>

                    <span
                      aria-hidden="true"
                      className="
                        h-9
                        w-[2px]

                        bg-brand-accent
                      "
                    />
                  </div>
                </div>
              </div>

              {/* LEFT — GROUP VIEW */}

              <div>
                <PanelTitle
                  eyebrow="نگاه گروه"
                  title="همه چیز در یک قاب"
                  accent
                />

                <div
                  className="
                    flex
                    min-h-[245px]
                    flex-col
                    justify-center

                    px-6
                    py-6
                  "
                >
                  <p
                    className="
                      mb-5

                      text-[14px]
                      font-medium
                      leading-7

                      text-[#687c83]
                    "
                  >
                    همان تصمیم باید در نسبت با این سه موضوع هم دیده شود:
                  </p>

                  <div
                    className="
                      border-y
                      border-brand-primary/10
                    "
                  >
                    {GROUP_VIEW.map((item, index) => (
                      <GroupViewRow
                        key={item}
                        label={item}
                        accent={index === GROUP_VIEW.length - 1}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ---------------------------------------------------------
                MOBILE
            ---------------------------------------------------------- */}

            <div className="lg:hidden">
              <PanelTitle eyebrow="نگاه بخشی" title="هر تصمیم، جداگانه" />

              <div>
                {LOCAL_DECISIONS.map((item) => (
                  <LocalDecisionRow
                    key={item.title}
                    title={item.title}
                    text={item.text}
                  />
                ))}
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-4

                  border-y
                  border-brand-primary/10

                  bg-brand-primary/[0.035]

                  px-5
                  py-4

                  sm:px-6
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    h-9
                    w-[2px]

                    shrink-0

                    bg-brand-accent
                  "
                />

                <p
                  className="
                    text-[14px]
                    font-black

                    text-brand-primary
                  "
                >
                  اما تصمیم باید در تصویر کل گروه هم دیده شود.
                </p>
              </div>

              <PanelTitle
                eyebrow="نگاه گروه"
                title="سه موضوع که نباید از تصویر خارج شوند"
                accent
              />

              <div
                className="
                  px-5
                  py-5

                  sm:px-6
                "
              >
                <div
                  className="
                    border-y
                    border-brand-primary/10
                  "
                >
                  {GROUP_VIEW.map((item, index) => (
                    <GroupViewRow
                      key={item}
                      label={item}
                      accent={index === GROUP_VIEW.length - 1}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* ---------------------------------------------------------
                BOTTOM
            ---------------------------------------------------------- */}

            <div
              className="
                relative

                border-t
                border-brand-primary/10

                bg-white

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
                  items-start
                  gap-4
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    mt-[9px]

                    h-[7px]
                    w-[7px]

                    shrink-0

                    bg-brand-accent
                  "
                />

                <p
                  className="
                    max-w-[900px]

                    text-[14px]
                    font-bold
                    leading-7

                    text-[#536d75]

                    sm:text-[15px]
                  "
                >
                  در سطح هلدینگ، کیفیت تصمیم فقط به خود تصمیم وابسته نیست؛{" "}
                  <span className="text-brand-primary">
                    به جایگاه آن در کل ساختار مالی گروه هم وابسته است.
                  </span>
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
   PANEL TITLE
============================================================================= */

function PanelTitle({
  eyebrow,
  title,
  accent = false,
}: {
  eyebrow: string;
  title: string;
  accent?: boolean;
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-4

        border-b
        border-brand-primary/10

        px-5
        py-4

        sm:px-6
      "
    >
      <div>
        <p
          className={`
            text-[13px]
            font-black

            ${accent ? "text-brand-accent" : "text-brand-primary/45"}
          `}
        >
          {eyebrow}
        </p>

        <p
          className="
            mt-1

            text-[17px]
            font-black

            text-[#173b45]
          "
        >
          {title}
        </p>
      </div>

      <span
        aria-hidden="true"
        className={`
          h-[7px]
          w-[7px]

          shrink-0

          ${accent ? "bg-brand-accent" : "bg-brand-primary/22"}
        `}
      />
    </div>
  );
}

/* =============================================================================
   LOCAL DECISION
============================================================================= */

function LocalDecisionRow({ title, text }: { title: string; text: string }) {
  return (
    <article
      className="
        group
        relative

        border-b
        border-brand-primary/[0.09]

        px-5
        py-4

        last:border-b-0

        transition-colors
        duration-300

        hover:bg-white

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
          className="
            h-[7px]
            w-[7px]

            shrink-0

            bg-brand-primary/25

            transition-colors
            duration-300

            group-hover:bg-brand-accent
          "
        />

        <h4
          className="
            text-[16px]
            font-black

            text-[#173b45]
          "
        >
          {title}
        </h4>
      </div>

      <p
        className="
          mt-2
          pr-[19px]

          text-[14px]
          font-medium
          leading-7

          text-[#687c83]
        "
      >
        {text}
      </p>
    </article>
  );
}

/* =============================================================================
   GROUP VIEW ROW
============================================================================= */

function GroupViewRow({
  label,
  accent = false,
}: {
  label: string;
  accent?: boolean;
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-5

        border-b
        border-brand-primary/[0.09]

        py-3.5

        last:border-b-0
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
            h-[7px]
            w-[7px]

            shrink-0

            ${accent ? "bg-brand-accent" : "bg-brand-primary/28"}
          `}
        />

        <p
          className="
            text-[15px]
            font-black

            text-[#31545e]
          "
        >
          {label}
        </p>
      </div>

      <span
        aria-hidden="true"
        className="
          h-px
          w-8

          bg-brand-primary/12
        "
      />
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
            "radial-gradient(circle at 82% 26%,rgba(22,115,148,.045),transparent 24%),linear-gradient(180deg,#ffffff 0%,#fafcfd 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-y-0
          left-[11%]

          hidden
          w-px

          bg-brand-primary/[0.025]

          lg:block
        "
      />
    </>
  );
}
