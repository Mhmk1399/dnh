import Link from "next/link";

import {
  ArrowDownLeft,
  Droplets,
  Layers3,
  PieChart,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";

const REVIEW_AREAS = [
  {
    title: "ساختار پرتفوی",
    question:
      "دارایی‌ها چگونه در کنار یکدیگر قرار گرفته‌اند و آیا نقش هر بخش در تصویر کلی روشن است؟",
    icon: Layers3,
  },
  {
    title: "تمرکز ریسک",
    question:
      "ریسک در کدام بخش‌های پرتفوی متمرکز شده و چه نقاطی نیازمند توجه بیشتری هستند؟",
    icon: ShieldAlert,
  },
  {
    title: "نقدشوندگی",
    question:
      "آیا سطح نقدشوندگی پرتفوی با نیازها و تصمیم‌های پیش رو تناسب دارد؟",
    icon: Droplets,
  },
  {
    title: "تخصیص دارایی",
    question:
      "ترکیب دارایی‌ها در ساختار کلی پرتفوی چگونه قرار گرفته و چه بخش‌هایی نیازمند بازبینی‌اند؟",
    icon: PieChart,
  },
] as const;

/* =============================================================================
   SECTION
   Server Component
============================================================================= */

export function PortfolioReviewSection() {
  return (
    <section
      id="portfolio-review"
      dir="rtl"
      aria-labelledby="portfolio-review-title"
      className="
        relative isolate
        scroll-mt-24 overflow-hidden

        border-b border-line
        bg-[#f7fafb]

        sm:scroll-mt-28
      "
    >
      <Background />

      <div
        className="
          dnh-site-shell
          relative z-10

          mx-auto
          w-full max-w-[1536px]

          px-5 py-16
          sm:px-8 sm:py-20
          lg:px-12 lg:py-24
          xl:px-16 xl:py-28
          2xl:px-20
        "
      >
        {/* =======================================================
            Header
        ======================================================== */}

        <div
          className="
            grid gap-8

            lg:grid-cols-[0.84fr_1.16fr]
            lg:items-end
            lg:gap-16
          "
        >
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-10 bg-brand-accent" />

              <span
                className="
                  text-[10px]
                  font-black
                  text-brand-primary

                  sm:text-[11px]
                "
              >
                در بررسی پرتفوی چه چیزهایی دیده می‌شود؟
              </span>
            </div>

            <h2
              id="portfolio-review-title"
              className="
                max-w-[780px]

                text-[31px]
                font-black
                leading-[1.65]
                tracking-[-0.045em]

                text-ink

                sm:text-[38px]

                lg:text-[45px]
                lg:leading-[1.55]

                xl:text-[50px]
              "
            >
              فقط دارایی‌ها مهم نیستند؛
              <br />
              <span className="text-brand-primary">رابطه میان آن‌ها</span> مهم
              است.
            </h2>
          </div>

          <p
            className="
              max-w-[640px]

              text-[13px]
              font-medium
              leading-[2.2]

              text-ink-muted

              sm:text-[14px]
              lg:text-[15px]
            "
          >
            بررسی پرتفوی باید نشان دهد ساختار فعلی چگونه شکل گرفته، ریسک کجا
            متمرکز است، نقدشوندگی چه وضعیتی دارد و ترکیب دارایی‌ها تا چه اندازه
            نیازمند بازبینی است.
          </p>
        </div>

        {/* =======================================================
            Review ledger
        ======================================================== */}

        <div
          className="
            mt-12

            overflow-hidden

            border-y
            border-line

            bg-white

            shadow-[0_18px_55px_rgba(20,79,99,.045)]

            sm:mt-14
            lg:mt-16
          "
        >
          {REVIEW_AREAS.map((item, index) => (
            <ReviewRow
              key={item.title}
              item={item}
              last={index === REVIEW_AREAS.length - 1}
            />
          ))}
        </div>

        {/* =======================================================
            Result
        ======================================================== */}

        <div
          className="
            mt-8

            border-r-[3px]
            border-brand-accent

            bg-white

            px-5 py-6

            shadow-[0_12px_38px_rgba(20,79,99,.04)]

            sm:px-7
          "
        >
          <div
            className="
              flex flex-col
              gap-5

              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div>
              <p
                className="
                  text-[9px]
                  font-black
                  text-brand-accent
                "
              >
                هدف بررسی
              </p>

              <p
                className="
                  mt-2
                  max-w-[760px]

                  text-[15px]
                  font-black
                  leading-[1.95]

                  text-ink

                  sm:text-[17px]
                "
              >
                روشن شدن ساختار پرتفوی، نقاط قابل توجه و حوزه‌هایی که نیازمند
                بازبینی هستند.
              </p>
            </div>

            <span
              aria-hidden="true"
              className="
                hidden
                h-[9px] w-[9px]
                shrink-0

                bg-brand-accent

                lg:block
              "
            />
          </div>
        </div>

        {/* =======================================================
            Boundary + next
        ======================================================== */}

        <div
          className="
            mt-7

            flex flex-col
            gap-5

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p
            className="
              max-w-[700px]

              text-[9px]
              font-medium
              leading-[2]

              text-ink-muted

              sm:text-[10px]
            "
          >
            هدف این بررسی، شناخت بهتر ساختار و ریسک است؛ نه ارائه سیگنال خرید و
            فروش یا پیش‌بینی قطعی قیمت.
          </p>

          <Link
            href="#portfolio-risk"
            className="
              group/link

              inline-flex
              min-h-11
              shrink-0

              items-center
              gap-3

              text-[10px]
              font-black

              text-brand-primary

              outline-none

              transition-colors
              duration-300

              hover:text-brand-accent

              focus-visible:ring-2
              focus-visible:ring-focus/40
            "
          >
            تمرکز ریسک چگونه دیده می‌شود؟
            <ArrowDownLeft
              aria-hidden="true"
              className="
                h-4 w-4

                transition-transform
                duration-300

                group-hover/link:translate-y-1
                group-hover/link:-translate-x-1
              "
              strokeWidth={1.6}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   Review Row
============================================================================= */

function ReviewRow({
  item,
  last,
}: {
  item: {
    title: string;
    question: string;
    icon: LucideIcon;
  };
  last: boolean;
}) {
  const Icon = item.icon;

  return (
    <article
      className={`
        group/row
        relative

        grid gap-5

        px-5 py-6

        transition-colors duration-300

        hover:bg-surface-soft/45

        sm:px-7
        sm:py-7

        lg:grid-cols-[60px_190px_1fr]
        lg:items-center
        lg:gap-9
        lg:px-8
        lg:py-8

        ${!last ? "border-b border-line" : ""}
      `}
    >
      {/* Icon */}

      <span
        className="
          flex
          h-12 w-12

          items-center
          justify-center

          border
          border-brand-primary/14

          bg-brand-primary/[0.035]

          text-brand-primary

          transition-[background-color,border-color,color,transform]
          duration-300

          group-hover/row:-translate-y-0.5
          group-hover/row:border-brand-primary
          group-hover/row:bg-brand-primary
          group-hover/row:text-white
        "
      >
        <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.45} />
      </span>

      {/* Title */}

      <h3
        className="
          text-[15px]
          font-black

          text-ink

          transition-colors
          duration-300

          group-hover/row:text-brand-primary

          sm:text-[16px]
        "
      >
        {item.title}
      </h3>

      {/* Question */}

      <p
        className="
          max-w-[760px]

          text-[11px]
          font-medium
          leading-[2.05]

          text-ink-muted

          sm:text-[12px]
        "
      >
        {item.question}
      </p>

      {/* Orange interaction mark */}

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

          group-hover/row:scale-y-100
        "
      />
    </article>
  );
}

/* =============================================================================
   Background
============================================================================= */

function Background() {
  return (
    <>
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
        "
        style={{
          background:
            "linear-gradient(112deg,#f4f9fa 0%,#ffffff 52%,#f7fafb 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0

          opacity-[0.05]
        "
        style={{
          backgroundImage:
            "linear-gradient(to right,color-mix(in srgb,var(--dnh-primary) 4%,transparent) 1px,transparent 1px)",
          backgroundSize: "118px 100%",
        }}
      />

      <span
        aria-hidden="true"
        className="
          absolute
          right-[18%]
          top-0

          h-[6px] w-[2px]

          bg-brand-accent
        "
      />
    </>
  );
}
