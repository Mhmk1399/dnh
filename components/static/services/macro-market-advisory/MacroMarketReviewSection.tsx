/* =============================================================================
   MACRO & MARKET ADVISORY — REVIEW

   Compact analytical band
   Desktop-first readability
   Server Component
============================================================================= */

const REVIEW_AREAS = [
  {
    title: "ریسک کلان",
    description:
      "شرایطی که می‌توانند سطح عدم‌قطعیت و فضای کلی تصمیم را تغییر دهند.",
  },
  {
    title: "تورم و ارز",
    description:
      "اثر تغییرات تورم و ارز بر قدرت خرید، ارزش دارایی و انتخاب‌های مالی.",
  },
  {
    title: "نقدینگی",
    description:
      "شرایطی که بر انعطاف‌پذیری، زمان‌بندی و امکان اجرای تصمیم اثر می‌گذارند.",
  },
  {
    title: "وضعیت بازارها",
    description:
      "دیدن بازارها در کنار زمینه اقتصادی؛ نه به‌صورت یک تصویر جداگانه.",
  },
  {
    title: "ریسک سیاست‌گذاری",
    description:
      "تغییرات سیاستی که می‌توانند گزینه‌ها، ریسک یا افق تصمیم را جابه‌جا کنند.",
  },
] as const;

export function MacroMarketReviewSection() {
  return (
    <section
      id="macro-market-review"
      dir="rtl"
      aria-labelledby="macro-market-review-title"
      className="
        relative
        isolate
        scroll-mt-24
        overflow-hidden

        bg-[#f7fafb]

        py-16
        sm:scroll-mt-28
        sm:py-18
        lg:py-20
      "
    >
      <ReviewBackground />

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
            HEADER — COMPACT
        ================================================================ */}

        <div
          className="
            grid
            gap-6

            lg:grid-cols-[1.1fr_0.9fr]
            lg:items-end
            lg:gap-14
          "
        >
          <div>
            <div
              className="
                mb-4
                flex
                items-center
                gap-3
              "
            >
              <span aria-hidden="true" className="h-px w-9 bg-brand-accent" />

              <p
                className="
                  text-[12px]
                  font-black
                  text-brand-primary/75
                "
              >
                لایه‌های بررسی محیط تصمیم
              </p>
            </div>

            <h2
              id="macro-market-review-title"
              className="
                max-w-[820px]
                [text-wrap:balance]

                text-[28px]
                font-black
                leading-[1.72]
                tracking-[-0.04em]

                text-[#10242c]

                sm:text-[34px]
                lg:text-[39px]
                lg:leading-[1.6]
              "
            >
              یک متغیر، تصویر کامل نمی‌سازد؛{" "}
              <span className="text-brand-primary">
                محیط تصمیم از چند لایه خوانده می‌شود.
              </span>
            </h2>
          </div>

          <p
            className="
              max-w-[570px]

              text-[15px]
              font-medium
              leading-[2.05]

              text-[#5e7279]

              sm:text-[16px]
            "
          >
            هدف، پیش‌بینی یک عدد یا جهت بازار نیست؛ چند عامل مرتبط کنار هم بررسی
            می‌شوند تا زمینه تصمیم روشن‌تر دیده شود.
          </p>
        </div>

        {/* ===============================================================
            ANALYTICAL BAND
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
          {/* accent corner */}

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

          {/* Desktop: all in one glance */}

          <div
            className="
              hidden

              grid-cols-5

              divide-x
              divide-x-reverse
              divide-brand-primary/10

              lg:grid
            "
          >
            {REVIEW_AREAS.map((item, index) => (
              <DesktopReviewItem
                key={item.title}
                title={item.title}
                description={item.description}
                accent={index === 0}
              />
            ))}
          </div>

          {/* Tablet / Mobile */}

          <div
            className="
              grid

              sm:grid-cols-2

              lg:hidden
            "
          >
            {REVIEW_AREAS.map((item, index) => (
              <MobileReviewItem
                key={item.title}
                title={item.title}
                description={item.description}
                accent={index === 0}
              />
            ))}
          </div>

          {/* =============================================================
              CONCLUSION
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

                text-[#355761]

                sm:text-[15px]
              "
            >
              این لایه‌ها در کنار هم، زمینه لازم برای بررسی سناریوها و پیامدهای
              راهبردی تصمیم را می‌سازند.
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

function DesktopReviewItem({
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

        min-h-[190px]

        px-5
        py-6

        transition-colors
        duration-300

        hover:bg-brand-primary/[0.018]

        xl:px-6
      "
    >
      {/* focus marker */}

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
            h-[11px]
            w-[11px]

            ${accent ? "bg-brand-accent" : "bg-brand-primary/32"}
          `}
        />

        <span
          aria-hidden="true"
          className="
            h-px
            w-7

            bg-brand-primary/10

            transition-[width,background-color]
            duration-300

            group-hover/item:w-10
            group-hover/item:bg-brand-primary/22
          "
        />
      </div>

      <h3
        className="
          text-[16px]
          font-black
          leading-7

          text-[#173b45]

          transition-colors
          duration-300

          group-hover/item:text-brand-primary

          xl:text-[17px]
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-3

          text-[14px]
          font-medium
          leading-[1.95]

          text-[#6a7d83]
        "
      >
        {description}
      </p>

      {/* hover rail */}

      <span
        aria-hidden="true"
        className="
          absolute
          inset-x-5
          bottom-0

          h-[2px]

          origin-right
          scale-x-0

          bg-brand-accent

          transition-transform
          duration-300

          group-hover/item:scale-x-100

          xl:inset-x-6
        "
      />
    </article>
  );
}

/* =============================================================================
   MOBILE ITEM
============================================================================= */

function MobileReviewItem({
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
        relative

        border-b
        border-brand-primary/10

        px-5
        py-5

        sm:border-l
        sm:border-brand-primary/10

        sm:px-6
      "
    >
      <div
        className="
          flex
          items-start
          gap-4
        "
      >
        <span
          aria-hidden="true"
          className={`
            mt-[11px]

            h-[11px]
            w-[11px]

            shrink-0

            ${accent ? "bg-brand-accent" : "bg-brand-primary/32"}
          `}
        />

        <div>
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

          <p
            className="
              mt-2

              text-[14px]
              font-medium
              leading-[1.95]

              text-[#6a7d83]
            "
          >
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}

/* =============================================================================
   BACKGROUND
============================================================================= */

function ReviewBackground() {
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
          background: "linear-gradient(180deg,#f7fafb 0%,#ffffff 100%)",
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
