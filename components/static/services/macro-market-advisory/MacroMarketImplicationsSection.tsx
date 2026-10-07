/* =============================================================================
   MACRO & MARKET ADVISORY — STRATEGIC IMPLICATIONS

   Light / compact / decision-oriented
   Server Component
   No tiny microcopy
============================================================================= */

const IMPLICATIONS = [
  {
    title: "شرایط",
    description:
      "تصویر روشن‌تری از محیط اقتصادی و بازاری که تصمیم در آن گرفته می‌شود.",
  },
  {
    title: "سناریوهای مرتبط",
    description:
      "چند مسیر قابل بررسی برای شرایط متفاوت، به‌جای تکیه بر یک پیش‌بینی واحد.",
  },
  {
    title: "پیامد راهبردی",
    description:
      "فهم اینکه هر سناریو چه اثری می‌تواند بر جهت و منطق تصمیم داشته باشد.",
  },
] as const;

export function MacroMarketImplicationsSection() {
  return (
    <section
      id="macro-market-implications"
      dir="rtl"
      aria-labelledby="macro-market-implications-title"
      className="
        relative
        isolate
        scroll-mt-24
        overflow-hidden

        bg-white

        py-16
        sm:scroll-mt-28
        sm:py-20
        lg:py-24
      "
    >
      <ImplicationsBackground />

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
                  text-brand-primary/75
                "
              >
                خروجی تحلیل
              </p>
            </div>

            <h2
              id="macro-market-implications-title"
              className="
                max-w-[850px]
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
              تحلیل زمانی ارزش دارد که{" "}
              <span className="text-brand-primary">
                به فهم بهتر تصمیم منجر شود.
              </span>
            </h2>
          </div>

          <p
            className="
              max-w-[570px]

              text-[15px]
              font-medium
              leading-[2.05]

              text-[#5d7178]

              sm:text-[16px]
            "
          >
            هدف، اضافه کردن اطلاعات بیشتر نیست؛ هدف این است که شرایط، سناریوهای
            مرتبط و پیامدهای احتمالی در یک تصویر قابل‌استفاده برای تصمیم دیده
            شوند.
          </p>
        </div>

        {/* ===============================================================
            EXECUTIVE OUTCOME BAND
        ================================================================ */}

        <div
          className="
            relative

            mt-10

            border
            border-brand-primary/14

            bg-white

            shadow-[0_18px_50px_rgba(5,62,79,.045)]

            lg:mt-12
          "
        >
          {/* architectural corner */}

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

          {/* desktop */}

          <div
            className="
              hidden
              grid-cols-3

              divide-x
              divide-x-reverse
              divide-brand-primary/10

              lg:grid
            "
          >
            {IMPLICATIONS.map((item, index) => (
              <ImplicationItem
                key={item.title}
                title={item.title}
                description={item.description}
                accent={index === IMPLICATIONS.length - 1}
              />
            ))}
          </div>

          {/* mobile / tablet */}

          <div
            className="
              divide-y
              divide-brand-primary/10

              lg:hidden
            "
          >
            {IMPLICATIONS.map((item, index) => (
              <ImplicationMobileItem
                key={item.title}
                title={item.title}
                description={item.description}
                accent={index === IMPLICATIONS.length - 1}
              />
            ))}
          </div>

          {/* =============================================================
              CLOSING STATEMENT
          ============================================================== */}

          <div
            className="
              flex
              items-start
              gap-4

              border-t
              border-brand-primary/11

              bg-brand-primary/[0.025]

              px-5
              py-4

              sm:px-6
              lg:px-7
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

                text-[#355761]

                sm:text-[15px]
              "
            >
              خروجی نهایی، یک پیش‌بینی قطعی نیست؛
              <span className="text-brand-primary">
                {" "}
                تصویری روشن‌تر از شرایط و پیامدهای مسیرهای پیش رو است.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   DESKTOP ITEM
============================================================================= */

function ImplicationItem({
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
        group/item
        relative

        min-h-[185px]

        px-6
        py-6

        transition-colors
        duration-300

        hover:bg-brand-primary/[0.018]

        xl:px-7
      "
    >
      <div
        className="
          mb-5
          flex
          items-center
          justify-between
          gap-4
        "
      >
        <span
          aria-hidden="true"
          className={`
            h-[7px]
            w-[7px]

            ${accent ? "bg-brand-accent" : "bg-brand-primary/32"}
          `}
        />

        <span
          aria-hidden="true"
          className={`
            h-px
            w-8

            ${accent ? "bg-brand-accent/35" : "bg-brand-primary/12"}
          `}
        />
      </div>

      <h3
        className={`
          text-[17px]
          font-black
          leading-7

          ${accent ? "text-brand-primary" : "text-[#173b45]"}
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

          text-[#697c82]
        "
      >
        {description}
      </p>

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

          group-hover/item:scale-x-100

          xl:inset-x-7
        "
      />
    </article>
  );
}

/* =============================================================================
   MOBILE ITEM
============================================================================= */

function ImplicationMobileItem({
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
        flex
        items-start
        gap-4

        px-5
        py-5

        sm:px-6
      "
    >
      <span
        aria-hidden="true"
        className={`
          mt-[9px]

          h-[7px]
          w-[7px]

          shrink-0

          ${accent ? "bg-brand-accent" : "bg-brand-primary/32"}
        `}
      />

      <div>
        <h3
          className={`
            text-[16px]
            font-black
            leading-7

            ${accent ? "text-brand-primary" : "text-[#173b45]"}
          `}
        >
          {title}
        </h3>

        <p
          className="
            mt-2

            text-[14px]
            font-medium
            leading-[1.95]

            text-[#697c82]
          "
        >
          {description}
        </p>
      </div>
    </article>
  );
}

/* =============================================================================
   BACKGROUND
============================================================================= */

function ImplicationsBackground() {
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
            "radial-gradient(circle at 82% 26%,rgba(22,115,148,.04),transparent 24%),linear-gradient(180deg,#ffffff 0%,#f9fcfd 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-[52%]

          h-px

          bg-brand-primary/[0.025]
        "
      />
    </>
  );
}
