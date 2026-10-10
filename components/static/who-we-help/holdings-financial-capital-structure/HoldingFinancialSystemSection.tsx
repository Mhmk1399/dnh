/* =============================================================================
   HOLDING FINANCIAL SYSTEM — SIGNATURE SECTION

   Dark signature section

   Core visual:
   One group-level financial system.

   4 decision areas:
   - Financial Structure
   - Liquidity
   - Financing
   - Capital Allocation

   All viewed inside one shared frame:
   - Risk
   - Group Objectives

   No flowchart.
   No fake data.
   No complex connectors.
============================================================================= */

const FINANCIAL_SYSTEM = [
  {
    title: "ساختار مالی",
    question: "منابع و تعهدات گروه چگونه در کنار هم قرار گرفته‌اند؟",
  },
  {
    title: "نقدینگی",
    question: "منابع لازم، در زمان مناسب و در جای مناسب در دسترس هستند؟",
  },
  {
    title: "تأمین مالی",
    question: "نیازهای مالی چه اثری بر ساختار و انعطاف گروه می‌گذارند؟",
  },
  {
    title: "تخصیص سرمایه",
    question: "سرمایه با چه منطقی میان بخش‌ها و اولویت‌ها قرار گرفته است؟",
  },
] as const;

export function HoldingFinancialSystemSection() {
  return (
    <section
      id="holding-financial-system"
      dir="rtl"
      aria-labelledby="holding-financial-system-title"
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
        {/* ===========================================================
            HEADER
        ============================================================ */}

        <div
          className="
            grid
            gap-6

            lg:grid-cols-[0.9fr_1.1fr]
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
                تصویر مالی گروه
              </p>
            </div>

            <h2
              id="holding-financial-system-title"
              className="
                max-w-[820px]
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
              در سطح هلدینگ، یک تصمیم مالی{" "}
              <span className="text-brand-accent">
                فقط به یک بخش تعلق ندارد.
              </span>
            </h2>
          </div>

          <p
            className="
              max-w-[620px]

              text-[15px]
              font-medium
              leading-[2]

              text-white/62

              sm:text-[16px]
            "
          >
            ساختار مالی، نقدینگی، تأمین مالی و تخصیص سرمایه روی یکدیگر اثر
            می‌گذارند؛ بنابراین تصمیم باید در ارتباط با ریسک و اهداف کل گروه
            دیده شود.
          </p>
        </div>

        {/* ===========================================================
            FINANCIAL SYSTEM BOARD
        ============================================================ */}

        <div
          className="
            relative

            mt-10

            border
            border-white/13

            bg-white/[0.022]

            shadow-[0_32px_90px_rgba(0,0,0,.20)]

            lg:mt-12
          "
        >
          {/* ---------------------------------------------------------
              BOARD HEADER
          ---------------------------------------------------------- */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-5

              border-b
              border-white/10

              px-5
              py-5

              sm:px-6
              lg:px-7
            "
          >
            <div>
              <p
                className="
                  text-[13px]
                  font-black

                  text-white/40
                "
              >
                نگاه یکپارچه
              </p>

              <h3
                className="
                  mt-1

                  text-[19px]
                  font-black
                  leading-8

                  text-white
                "
              >
                چهار تصمیم؛ یک ساختار مالی
              </h3>
            </div>

            <div
              aria-hidden="true"
              className="
                flex
                items-center
                gap-3
              "
            >
              <span className="h-px w-9 bg-white/12" />

              <span
                className="
                  h-[11px]
                  w-[11px]

                  bg-brand-accent
                "
              />
            </div>
          </div>

          {/* ---------------------------------------------------------
              SYSTEM ROWS
          ---------------------------------------------------------- */}

          <div>
            {FINANCIAL_SYSTEM.map((item, index) => (
              <FinancialSystemRow
                key={item.title}
                index={index + 1}
                title={item.title}
                question={item.question}
                accent={index === 0}
              />
            ))}
          </div>

          {/* ---------------------------------------------------------
              COMMON FRAME
          ---------------------------------------------------------- */}

          <div
            className="
              relative

              border-t
              border-white/10

              bg-brand-accent/[0.07]

              px-5
              py-6

              sm:px-6
              lg:px-7
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
                gap-4

                sm:grid-cols-[185px_1fr]
                sm:items-center
                sm:gap-7
              "
            >
              <div>
                <p
                  className="
                    text-[13px]
                    font-black

                    text-brand-accent
                  "
                >
                  چارچوب مشترک
                </p>

                <p
                  className="
                    mt-1

                    text-[20px]
                    font-black

                    text-white
                  "
                >
                  ریسک و اهداف گروه
                </p>
              </div>

              <p
                className="
                  text-[14px]
                  font-medium
                  leading-7

                  text-white/65

                  sm:border-r
                  sm:border-white/10
                  sm:pr-6
                  sm:text-[15px]
                "
              >
                هر یک از تصمیم‌های بالا باید در نسبت با ریسک‌های گروه و
                اولویت‌هایی که برای آینده کسب‌وکار وجود دارد بررسی شود.
              </p>
            </div>
          </div>

          {/* ---------------------------------------------------------
              FINAL READ
          ---------------------------------------------------------- */}

          <div
            className="
              flex
              items-start
              gap-4

              border-t
              border-white/10

              bg-black/[0.07]

              px-5
              py-5

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

                bg-[#82cee4]/60
              "
            />

            <p
              className="
                max-w-[980px]

                text-[14px]
                font-bold
                leading-7

                text-white/58

                sm:text-[15px]
              "
            >
              هدف این نگاه، جداگانه بهتر کردن هر بخش نیست؛{" "}
              <span className="text-white">
                هدف، دیدن اثر تصمیم‌ها بر کل ساختار مالی گروه است.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   SYSTEM ROW
============================================================================= */

function FinancialSystemRow({
  index,
  title,
  question,
  accent = false,
}: {
  index: number;
  title: string;
  question: string;
  accent?: boolean;
}) {
  return (
    <article
      className="
        group/system
        relative

        grid
        gap-3

        border-b
        border-white/[0.085]

        px-5
        py-5

        last:border-b-0

        transition-colors
        duration-300

        hover:bg-white/[0.025]

        sm:px-6

        lg:grid-cols-[65px_190px_1fr]
        lg:items-center
        lg:gap-7
        lg:px-7
      "
    >
      {/* number */}

      <span
        className={`
          text-[14px]
          font-black

          ${accent ? "text-brand-accent" : "text-white/32"}
        `}
      >
        {String(index).padStart(2, "0")}
      </span>

      {/* title */}

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

            ${accent ? "bg-brand-accent" : "bg-[#82cee4]/45"}
          `}
        />

        <h4
          className="
            text-[17px]
            font-black

            text-white
          "
        >
          {title}
        </h4>
      </div>

      {/* question */}

      <p
        className="
          text-[14px]
          font-medium
          leading-7

          text-white/60

          lg:border-r
          lg:border-white/[0.085]
          lg:pr-6

          sm:text-[15px]
        "
      >
        {question}
      </p>

      {/* hover indicator */}

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

          group-hover/system:scale-y-100
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
            "radial-gradient(circle at 70% 42%,rgba(22,115,148,.23),transparent 31%),radial-gradient(circle at 18% 76%,rgba(252,133,2,.025),transparent 18%),linear-gradient(116deg,#022936 0%,#033847 52%,#022d3a 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.04]
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
