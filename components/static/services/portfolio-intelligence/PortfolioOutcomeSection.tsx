import Link from "next/link";

import {
  ArrowDownLeft,
  CircleAlert,
  Layers3,
  RotateCcw,
  type LucideIcon,
} from "lucide-react";

const OUTCOMES = [
  {
    title: "ساختار پرتفوی",
    description:
      "تصویر روشن‌تری از نحوه قرار گرفتن اجزای پرتفوی در کنار یکدیگر.",
    icon: Layers3,
  },
  {
    title: "نقاط قابل توجه",
    description:
      "بخش‌هایی که از نظر تمرکز ریسک، نقدشوندگی یا ساختار نیازمند توجه بیشتری هستند.",
    icon: CircleAlert,
  },
  {
    title: "حوزه‌های نیازمند بازبینی",
    description:
      "بخش‌هایی که ارزش دارد پیش از تصمیم‌های بعدی، دوباره بررسی شوند.",
    icon: RotateCcw,
  },
] as const;

/* =============================================================================
   PORTFOLIO OUTCOME
   Server Component
============================================================================= */

export function PortfolioOutcomeSection() {
  return (
    <section
      id="portfolio-outcome"
      dir="rtl"
      aria-labelledby="portfolio-outcome-title"
      className="
        relative isolate
        scroll-mt-24 overflow-hidden

        border-b border-line
        bg-white

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
            HEADER
        ======================================================== */}

        <div
          className="
            mx-auto
            max-w-[930px]
            text-center
          "
        >
          <div
            className="
              mb-5
              flex items-center justify-center gap-3
            "
          >
            <span aria-hidden="true" className="h-px w-9 bg-brand-accent" />

            <span
              className="
                text-[10px]
                font-black
                text-brand-primary

                sm:text-[11px]
              "
            >
              خروجی بررسی پرتفوی
            </span>

            <span aria-hidden="true" className="h-px w-9 bg-brand-accent" />
          </div>

          <h2
            id="portfolio-outcome-title"
            className="
              text-[31px]
              font-black
              leading-[1.65]
              tracking-[-0.045em]

              text-ink

              sm:text-[38px]

              lg:text-[46px]
              lg:leading-[1.5]

              xl:text-[51px]
            "
          >
            هدف، پیچیده‌تر کردن تصویر نیست؛
            <br />
            هدف، <span className="text-brand-primary">
              روشن‌تر دیدن پرتفوی
            </span>{" "}
            است.
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-[680px]

              text-[13px]
              font-medium
              leading-[2.15]

              text-ink-muted

              sm:text-[14px]
            "
          >
            بررسی باید کمک کند بدانید ساختار فعلی چگونه دیده می‌شود، چه نقاطی
            اهمیت بیشتری دارند و کدام بخش‌ها ارزش بازبینی دارند.
          </p>
        </div>

        {/* =======================================================
            SUMMARY SHEET
        ======================================================== */}

        <div
          className="
            relative

            mx-auto
            mt-12
            max-w-[1180px]

            overflow-hidden

            border
            border-line

            bg-white

            shadow-[0_24px_70px_rgba(19,74,94,.055)]

            sm:mt-14
            lg:mt-16
          "
        >
          {/* top line */}

          <div
            className="
              relative

              border-b
              border-line

              bg-surface-soft/40

              px-5 py-5

              sm:px-7
            "
          >
            <div
              className="
                flex
                flex-col
                gap-3

                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <p
                className="
                  text-[11px]
                  font-black

                  text-ink
                "
              >
                تصویری که بعد از بررسی باید روشن‌تر شود
              </p>

              <span
                className="
                  text-[9px]
                  font-bold

                  text-brand-primary/55
                "
              >
                ساختار، توجه، بازبینی
              </span>
            </div>

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
          </div>

          {/* =====================================================
              3 OUTCOMES
          ====================================================== */}

          <div
            className="
              grid

              lg:grid-cols-3
            "
          >
            {OUTCOMES.map((item, index) => (
              <Outcome key={item.title} item={item} divided={index > 0} />
            ))}
          </div>

          {/* =====================================================
              FINAL STATEMENT
          ====================================================== */}

          <div
            className="
              border-t
              border-line

              px-5 py-6

              sm:px-7
              sm:py-7

              lg:px-8
            "
          >
            <div
              className="
                flex
                flex-col
                gap-5

                lg:flex-row
                lg:items-center
                lg:justify-between
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
                  نتیجه اصلی
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
                  پرتفوی به‌جای مجموعه‌ای از دارایی‌های جدا، به‌عنوان یک ساختار
                  واحد قابل بررسی دیده می‌شود.
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
        </div>

        {/* =======================================================
            NEXT
        ======================================================== */}

        <div
          className="
            mx-auto
            mt-8
            flex
            max-w-[1180px]
            justify-end
          "
        >
          <Link
            href="#portfolio-cta"
            className="
              group/link

              inline-flex
              min-h-11
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
            قدم بعدی برای بررسی پرتفوی
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
   OUTCOME
============================================================================= */

function Outcome({
  item,
  divided,
}: {
  item: {
    title: string;
    description: string;
    icon: LucideIcon;
  };
  divided: boolean;
}) {
  const Icon = item.icon;

  return (
    <article
      className={`
        group/outcome
        relative

        min-h-[235px]

        px-5 py-7

        transition-colors
        duration-300

        hover:bg-surface-soft/45

        sm:px-7
        sm:py-8

        lg:min-h-[270px]
        lg:px-8
        lg:py-9

        ${divided ? "border-t border-line lg:border-r lg:border-t-0" : ""}
      `}
    >
      <div
        className="
          flex
          h-full
          flex-col
          justify-between
          gap-8
        "
      >
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

            group-hover/outcome:-translate-y-1
            group-hover/outcome:border-brand-primary
            group-hover/outcome:bg-brand-primary
            group-hover/outcome:text-white
          "
        >
          <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.45} />
        </span>

        <div>
          <h3
            className="
              text-[17px]
              font-black
              leading-[1.8]

              text-ink

              transition-colors
              duration-300

              group-hover/outcome:text-brand-primary

              sm:text-[18px]
            "
          >
            {item.title}
          </h3>

          <p
            className="
              mt-3
              max-w-[380px]

              text-[11px]
              font-medium
              leading-[2]

              text-ink-muted

              sm:text-[12px]
            "
          >
            {item.description}
          </p>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="
          absolute
          bottom-0
          right-0

          h-[3px]
          w-0

          bg-brand-accent

          transition-[width]
          duration-300

          group-hover/outcome:w-full
        "
      />
    </article>
  );
}

/* =============================================================================
   BACKGROUND
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
            "linear-gradient(112deg,#f7fafb 0%,#ffffff 50%,#ffffff 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0

          opacity-[0.045]
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
          left-[18%]
          top-0

          h-[6px] w-[2px]

          bg-brand-accent
        "
      />
    </>
  );
}
