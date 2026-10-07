/* =============================================================================
   HOLDING — STRATEGIC REVIEW

   Concept:
   "The Group Decision Table"

   The decision sits at the center.
   Four review areas surround it.

   Desktop:
                     Financial Structure
   Capital Allocation | Group Decision | Liquidity + Financing
                     Risk + Objectives

   Mobile:
   Simple vertical reading order.

   No generic card grid.
   No complex connectors.
   No fake metrics.
============================================================================= */

export function HoldingStrategicReviewSection() {
  return (
    <section
      id="holding-review"
      dir="rtl"
      aria-labelledby="holding-review-title"
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
        {/* ===========================================================
            INTRO
        ============================================================ */}

        <div
          className="
            mx-auto
            max-w-[920px]

            text-center
          "
        >
          <div
            className="
              mb-4

              flex
              items-center
              justify-center
              gap-3
            "
          >
            <span aria-hidden="true" className="h-px w-9 bg-brand-accent" />

            <p
              className="
                text-[13px]
                font-black

                text-brand-primary/70
              "
            >
              بازبینی در سطح گروه
            </p>

            <span aria-hidden="true" className="h-px w-9 bg-brand-accent" />
          </div>

          <h2
            id="holding-review-title"
            className="
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
            برای بررسی یک تصمیم مهم،{" "}
            <span className="text-brand-primary">
              چه چیزهایی باید هم‌زمان روی میز باشند؟
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-[720px]

              text-[15px]
              font-medium
              leading-[2.05]

              text-[#60737a]

              sm:text-[16px]
            "
          >
            تصمیم در سطح هلدینگ فقط از یک زاویه بررسی نمی‌شود. ساختار مالی،
            سرمایه، نقدینگی و ریسک باید در یک قاب مشترک دیده شوند.
          </p>
        </div>

        {/* ===========================================================
            DESKTOP DECISION TABLE
        ============================================================ */}

        <div
          className="
            relative

            mx-auto
            mt-11

            hidden
            max-w-[1180px]

            border
            border-brand-primary/14

            bg-[#f8fbfc]

            shadow-[0_28px_80px_rgba(4,61,78,.06)]

            lg:block
          "
        >
          {/* ---------------------------------------------------------
              TOP — FINANCIAL STRUCTURE
          ---------------------------------------------------------- */}

          <ReviewBand
            eyebrow="ساختار پایه"
            title="ساختار مالی"
            text="منابع، تعهدات و ساختار سرمایه چه تصویری از وضعیت مالی گروه ساخته‌اند؟"
            position="top"
          />

          {/* ---------------------------------------------------------
              MIDDLE
          ---------------------------------------------------------- */}

          <div
            className="
              grid
              grid-cols-[1fr_1.12fr_1fr]

              border-y
              border-brand-primary/10
            "
          >
            {/* RIGHT SIDE */}

            <SideReviewArea
              eyebrow="جایگاه سرمایه"
              title="دارایی و تخصیص سرمایه"
              text="سرمایه کجا قرار گرفته و هر بخش چه نقشی در اهداف گروه دارد؟"
            />

            {/* CENTER */}

            <div
              className="
                relative

                flex
                min-h-[280px]
                items-center
                justify-center

                border-x
                border-brand-primary/10

                bg-[#063746]

                px-8
                py-8

                text-center
              "
            >
              <div
                aria-hidden="true"
                className="
                  absolute
                  inset-x-0
                  top-0

                  h-[3px]

                  bg-brand-accent
                "
              />

              <div className="max-w-[300px]">
                <span
                  aria-hidden="true"
                  className="
                    mx-auto
                    block

                    h-[9px]
                    w-[9px]

                    bg-brand-accent
                  "
                />

                <p
                  className="
                    mt-5

                    text-[13px]
                    font-black

                    text-brand-accent
                  "
                >
                  موضوع مرکزی
                </p>

                <h3
                  className="
                    mt-2

                    text-[25px]
                    font-black
                    leading-[1.7]
                    tracking-[-0.035em]

                    text-white
                  "
                >
                  تصمیم مالی
                  <br />
                  در سطح گروه
                </h3>

                <p
                  className="
                    mt-4

                    text-[14px]
                    font-medium
                    leading-7

                    text-white/58
                  "
                >
                  تصمیم باید در نسبت با کل ساختار دیده شود، نه فقط در سطح یک
                  شرکت یا یک نیاز مالی.
                </p>
              </div>
            </div>

            {/* LEFT SIDE */}

            <SideReviewArea
              eyebrow="دسترسی به منابع"
              title="نقدینگی و تأمین مالی"
              text="منابع موردنیاز چگونه در دسترس قرار می‌گیرند و تأمین می‌شوند؟"
              accent
            />
          </div>

          {/* ---------------------------------------------------------
              BOTTOM — RISK
          ---------------------------------------------------------- */}

          <ReviewBand
            eyebrow="چارچوب تصمیم"
            title="ریسک و اهداف گروه"
            text="این تصمیم با چه ریسک‌هایی روبه‌رو است و چه نسبتی با اولویت‌های کل گروه دارد؟"
            position="bottom"
            accent
          />

          {/* ---------------------------------------------------------
              FOOT
          ---------------------------------------------------------- */}

          <div
            className="
              flex
              items-center
              justify-center
              gap-4

              border-t
              border-brand-primary/10

              bg-white

              px-7
              py-4
            "
          >
            <span
              aria-hidden="true"
              className="
                h-px
                w-10

                bg-brand-primary/12
              "
            />

            <p
              className="
                text-[14px]
                font-black

                text-[#4a6871]
              "
            >
              یک تصمیم، چهار زاویه، یک تصویر مالی
            </p>

            <span
              aria-hidden="true"
              className="
                h-[7px]
                w-[7px]

                bg-brand-accent
              "
            />

            <span
              aria-hidden="true"
              className="
                h-px
                w-10

                bg-brand-primary/12
              "
            />
          </div>
        </div>

        {/* ===========================================================
            MOBILE
        ============================================================ */}

        <div
          className="
            relative

            mt-9

            border-y
            border-brand-primary/14

            bg-[#f8fbfc]

            shadow-[0_20px_55px_rgba(4,61,78,.045)]

            lg:hidden
          "
        >
          {/* central decision */}

          <div
            className="
              relative

              bg-[#063746]

              px-5
              py-6

              text-center
            "
          >
            <span
              aria-hidden="true"
              className="
                absolute
                inset-x-0
                top-0

                h-[3px]

                bg-brand-accent
              "
            />

            <p
              className="
                text-[13px]
                font-black

                text-brand-accent
              "
            >
              موضوع مرکزی
            </p>

            <h3
              className="
                mt-1

                text-[22px]
                font-black
                leading-9

                text-white
              "
            >
              تصمیم مالی در سطح گروه
            </h3>
          </div>

          <MobileReviewArea
            title="ساختار مالی"
            text="منابع، تعهدات و ساختار سرمایه چه تصویری ساخته‌اند؟"
          />

          <MobileReviewArea
            title="دارایی و تخصیص سرمایه"
            text="سرمایه کجاست و هر بخش چه نقشی در گروه دارد؟"
          />

          <MobileReviewArea
            title="نقدینگی و تأمین مالی"
            text="منابع موردنیاز چگونه در دسترس و تأمین می‌شوند؟"
          />

          <MobileReviewArea
            title="ریسک و اهداف گروه"
            text="تصمیم با چه ریسک‌ها و اولویت‌هایی روبه‌رو است؟"
            accent
          />

          <div
            className="
              flex
              items-start
              gap-3

              border-t
              border-brand-primary/10

              bg-white

              px-5
              py-4
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
                text-[14px]
                font-bold
                leading-7

                text-[#536d75]
              "
            >
              این چهار موضوع باید درباره{" "}
              <span className="text-brand-primary">همان تصمیم واحد</span> بررسی
              شوند.
            </p>
          </div>
        </div>

        {/* ===========================================================
            CLOSING STATEMENT
        ============================================================ */}

        <div
          className="
            mx-auto
            mt-7

            flex
            max-w-[900px]
            items-start
            justify-center
            gap-4

            text-center
          "
        >
          <span
            aria-hidden="true"
            className="
              mt-[9px]

              hidden
              h-[7px]
              w-[7px]

              shrink-0

              bg-brand-accent

              sm:block
            "
          />

          <p
            className="
              text-[14px]
              font-medium
              leading-7

              text-[#60737a]

              sm:text-[15px]
            "
          >
            هدف بازبینی این نیست که هر موضوع جداگانه تحلیل شود؛{" "}
            <span className="font-bold text-brand-primary">
              هدف، روشن‌تر شدن رابطه میان آن‌ها در یک تصمیم واحد است.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   TOP / BOTTOM BAND
============================================================================= */

function ReviewBand({
  eyebrow,
  title,
  text,
  position,
  accent = false,
}: {
  eyebrow: string;
  title: string;
  text: string;
  position: "top" | "bottom";
  accent?: boolean;
}) {
  return (
    <article
      className="
        group/band
        relative

        grid
        grid-cols-[210px_1fr]
        items-center
        gap-8

        px-7
        py-5

        transition-colors
        duration-300

        hover:bg-white
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
          className={`
            h-9
            w-[3px]

            shrink-0

            ${accent ? "bg-brand-accent" : "bg-brand-primary/25"}
          `}
        />

        <div>
          <p
            className={`
              text-[13px]
              font-black

              ${accent ? "text-brand-accent" : "text-brand-primary/46"}
            `}
          >
            {eyebrow}
          </p>

          <h3
            className="
              mt-1

              text-[18px]
              font-black

              text-[#173b45]
            "
          >
            {title}
          </h3>
        </div>
      </div>

      <p
        className="
          border-r
          border-brand-primary/[0.08]

          pr-7

          text-[15px]
          font-medium
          leading-7

          text-[#61757c]
        "
      >
        {text}
      </p>

      <span
        aria-hidden="true"
        className={`
          absolute
          right-0

          h-[2px]
          w-0

          bg-brand-accent

          transition-[width]
          duration-300

          group-hover/band:w-14

          ${position === "top" ? "bottom-0" : "top-0"}
        `}
      />
    </article>
  );
}

/* =============================================================================
   SIDE AREA
============================================================================= */

function SideReviewArea({
  eyebrow,
  title,
  text,
  accent = false,
}: {
  eyebrow: string;
  title: string;
  text: string;
  accent?: boolean;
}) {
  return (
    <article
      className="
        group/side

        relative

        flex
        min-h-[280px]
        flex-col
        justify-center

        px-7
        py-7

        transition-colors
        duration-300

        hover:bg-white
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
            h-[8px]
            w-[8px]

            shrink-0

            ${accent ? "bg-brand-accent" : "bg-brand-primary/28"}
          `}
        />

        <p
          className={`
            text-[13px]
            font-black

            ${accent ? "text-brand-accent" : "text-brand-primary/46"}
          `}
        >
          {eyebrow}
        </p>
      </div>

      <h3
        className="
          mt-4

          text-[21px]
          font-black
          leading-9

          text-[#173b45]
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-3
          max-w-[300px]

          text-[14px]
          font-medium
          leading-7

          text-[#667a81]
        "
      >
        {text}
      </p>

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

          group-hover/side:w-12
        "
      />
    </article>
  );
}

/* =============================================================================
   MOBILE AREA
============================================================================= */

function MobileReviewArea({
  title,
  text,
  accent = false,
}: {
  title: string;
  text: string;
  accent?: boolean;
}) {
  return (
    <article
      className="
        border-b
        border-brand-primary/[0.09]

        px-5
        py-5

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

        <h3
          className="
            text-[17px]
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

          text-[#667a81]
        "
      >
        {text}
      </p>
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
            "radial-gradient(circle at 50% 48%,rgba(22,115,148,.045),transparent 32%),linear-gradient(180deg,#ffffff 0%,#fafcfd 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-x-0
          top-[54%]

          hidden
          h-px

          bg-brand-primary/[0.02]

          lg:block
        "
      />
    </>
  );
}
