/* =============================================================================
   EXECUTIVE BRIEFINGS — DECISION VIEW

   Dark signature section

   One decision subject
   ↓
   What matters?
   What scenarios matter?
   What paths remain open?

   No fake data
   No dashboard
   No decorative flowchart
============================================================================= */

const DECISION_VIEW = [
  {
    question: "چه چیزی مهم است؟",
    title: "نکات کلیدی",
    description:
      "موضوعات و ملاحظاتی که برای فهم مسئله و تصمیم‌گیری باید در مرکز توجه باقی بمانند.",
  },
  {
    question: "چه وضعیت‌هایی باید دیده شوند؟",
    title: "سناریوهای مرتبط",
    description:
      "چند وضعیت قابل بررسی که می‌توانند تصویر تصمیم یا پیامدهای آن را تغییر دهند.",
  },
  {
    question: "چه مسیرهایی روی میز می‌مانند؟",
    title: "مسیرهای قابل بررسی",
    description:
      "گزینه‌ها و مسیرهایی که بعد از جمع‌بندی حرفه‌ای ارزش بررسی بیشتر دارند.",
  },
] as const;

export function ExecutiveBriefingsDecisionViewSection() {
  return (
    <section
      id="executive-briefings-decision-view"
      dir="rtl"
      aria-labelledby="executive-briefings-decision-view-title"
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
      <DecisionViewBackground />

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
                نمای تصمیم
              </p>
            </div>

            <h2
              id="executive-briefings-decision-view-title"
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
              بریفینگ زمانی ارزش دارد که{" "}
              <span className="text-brand-accent">
                مسئله را به یک نمای روشن برای تصمیم تبدیل کند.
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
            تصمیم‌گیرنده ارشد باید بتواند در یک تصویر متمرکز ببیند چه چیزی مهم
            است، چه سناریوهایی باید در نظر گرفته شوند و چه مسیرهایی هنوز قابل
            بررسی‌اند.
          </p>
        </div>

        {/* =============================================================
            EXECUTIVE DECISION PAPER
        ============================================================== */}

        <div
          role="img"
          aria-label="نمای تصمیم اجرایی شامل موضوع اصلی، نکات کلیدی، سناریوهای مرتبط و مسیرهای قابل بررسی"
          className="
            relative

            mt-10

            overflow-hidden

            border
            border-white/12

            bg-white/[0.018]

            shadow-[0_32px_90px_rgba(0,0,0,.20)]

            lg:mt-12
          "
        >
          {/* ===========================================================
              SUBJECT BAR
          ============================================================ */}

          <div
            className="
              relative

              flex
              flex-col
              gap-3

              border-b
              border-white/10

              bg-[#063746]

              px-5
              py-5

              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:gap-8
              sm:px-6

              lg:px-8
            "
          >
            <div
              className="
                flex
                items-center
                gap-4
              "
            >
              <span
                aria-hidden="true"
                className="
                  h-[11px]
                  w-[11px]

                  shrink-0

                  bg-brand-accent
                "
              />

              <div>
                <p
                  className="
                    text-[14px]
                    font-black

                    text-white/45
                  "
                >
                  موضوع مرکزی
                </p>

                <p
                  className="
                    mt-1

                    text-[18px]
                    font-black
                    leading-8

                    text-white

                    sm:text-[20px]
                  "
                >
                  همان مسئله‌ای که تصمیم‌گیرنده باید درباره آن به جمع‌بندی برسد
                </p>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="
                hidden
                items-center
                gap-2

                sm:flex
              "
            >
              <span className="h-px w-9 bg-white/12" />
              <span className="h-[6px] w-[6px] bg-[#82cee4]/55" />
              <span className="h-px w-9 bg-white/12" />
            </div>
          </div>

          {/* ===========================================================
              DESKTOP — THREE DECISION QUESTIONS
          ============================================================ */}

          <div
            className="
              hidden

              grid-cols-3

              divide-x
              divide-x-reverse
              divide-white/10

              lg:grid
            "
          >
            {DECISION_VIEW.map((item, index) => (
              <DecisionColumn
                key={item.title}
                question={item.question}
                title={item.title}
                description={item.description}
                accent={index === 2}
              />
            ))}
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
            {DECISION_VIEW.map((item, index) => (
              <MobileDecisionItem
                key={item.title}
                question={item.question}
                title={item.title}
                description={item.description}
                accent={index === 2}
              />
            ))}
          </div>

          {/* ===========================================================
              PROFESSIONAL SUMMARY
          ============================================================ */}

          <div
            className="
              relative

              grid
              gap-3

              border-t
              border-white/10

              bg-black/[0.07]

              px-5
              py-4

              sm:grid-cols-[auto_1fr]
              sm:items-center
              sm:gap-5
              sm:px-6

              lg:px-8
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
                  h-[11px]
                  w-[11px]

                  shrink-0

                  bg-brand-accent
                "
              />

              <p
                className="
                  text-[14px]
                  font-black

                  text-brand-accent
                "
              >
                جمع‌بندی حرفه‌ای
              </p>
            </div>

            <p
              className="
                text-[14px]
                font-medium
                leading-7

                text-white/48

                sm:text-[15px]
              "
            >
              هدف این نیست که حجم بیشتری از اطلاعات ارائه شود؛ هدف این است که
              مسئله، سناریوها و مسیرهای قابل بررسی در یک نمای قابل استفاده برای
              تصمیم قرار بگیرند.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   DESKTOP DECISION COLUMN
============================================================================= */

function DecisionColumn({
  question,
  title,
  description,
  accent = false,
}: {
  question: string;
  title: string;
  description: string;
  accent?: boolean;
}) {
  return (
    <article
      className="
        group/decision
        relative

        min-h-[235px]

        px-6
        py-6

        transition-colors
        duration-300

        hover:bg-white/[0.018]

        xl:px-7
      "
    >
      {/* question */}

      <p
        className="
          min-h-[28px]

          text-[14px]
          font-black
          leading-7

          text-white/40
        "
      >
        {question}
      </p>

      {/* semantic line */}

      <div
        className="
          my-4
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

        <span
          aria-hidden="true"
          className={`
            h-px
            flex-1

            ${accent ? "bg-brand-accent/30" : "bg-white/10"}
          `}
        />
      </div>

      {/* answer */}

      <h3
        className={`
          text-[18px]
          font-black
          leading-8

          ${accent ? "text-brand-accent" : "text-white"}
        `}
      >
        {title}
      </h3>

      <p
        className="
          mt-3

          text-[14px]
          font-medium
          leading-[1.95]

          text-white/48
        "
      >
        {description}
      </p>

      {/* hover focus */}

      <span
        aria-hidden="true"
        className="
          absolute
          inset-x-6
          bottom-0

          h-[2px]

          origin-right
          scale-x-0

          bg-brand-accent

          transition-transform
          duration-300

          group-hover/decision:scale-x-100

          xl:inset-x-7
        "
      />
    </article>
  );
}

/* =============================================================================
   MOBILE DECISION ITEM
============================================================================= */

function MobileDecisionItem({
  question,
  title,
  description,
  accent = false,
}: {
  question: string;
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
      <p
        className="
          text-[14px]
          font-black
          leading-7

          text-white/40
        "
      >
        {question}
      </p>

      <div
        className="
          mt-2

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
          className={`
            text-[16px]
            font-black
            leading-7

            ${accent ? "text-brand-accent" : "text-white"}
          `}
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

          text-white/48
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

function DecisionViewBackground() {
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
            "radial-gradient(circle at 54% 48%,rgba(22,115,148,.20),transparent 30%),radial-gradient(circle at 16% 80%,rgba(252,133,2,.025),transparent 18%),linear-gradient(116deg,#022936 0%,#033847 52%,#022d3a 100%)",
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
