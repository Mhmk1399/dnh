import Link from "next/link";

import {
  ArrowDownLeft,
  Droplets,
  Layers3,
  Newspaper,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";

const WARNING_SIGNS = [
  {
    title: "دارایی‌های پراکنده",
    description:
      "دارایی‌ها وجود دارند، اما نقش هرکدام در ساختار کلی پرتفوی روشن نیست.",
    icon: Layers3,
  },
  {
    title: "تمرکز پنهان ریسک",
    description:
      "تنوع ظاهری وجود دارد، اما چند بخش ممکن است به یک عامل مشترک حساس باشند.",
    icon: ShieldAlert,
  },
  {
    title: "نقدشوندگی نامتناسب",
    description:
      "ترکیب پرتفوی با میزان انعطاف و دسترسی موردنیاز شما هماهنگ نیست.",
    icon: Droplets,
  },
  {
    title: "تصمیم‌گیری خبرمحور",
    description:
      "خبر و نوسان کوتاه‌مدت بیش از منطق ساختاری بر تصمیم‌ها اثر می‌گذارد.",
    icon: Newspaper,
  },
] as const;

/* =============================================================================
   SECTION
   Server Component
============================================================================= */

export function PortfolioWarningSignsSection() {
  return (
    <section
      id="portfolio-warning-signs"
      dir="rtl"
      aria-labelledby="portfolio-warning-signs-title"
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
            Header
        ======================================================== */}

        <div
          className="
            grid gap-8

            lg:grid-cols-[0.82fr_1.18fr]
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
                نشانه‌های یک پرتفوی نیازمند بازبینی
              </span>
            </div>

            <h2
              id="portfolio-warning-signs-title"
              className="
                max-w-[790px]

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
              پرتفوی ممکن است متنوع باشد،
              <br />
              اما هنوز{" "}
              <span className="text-brand-primary">
                ساختار روشنی نداشته باشد.
              </span>
            </h2>
          </div>

          <div className="lg:pb-1">
            <p
              className="
                max-w-[620px]

                text-[13px]
                font-medium
                leading-[2.2]

                text-ink-muted

                sm:text-[14px]
                lg:text-[15px]
              "
            >
              چهار نشانه می‌توانند نشان دهند که پرتفوی نیاز به نگاه دقیق‌تری
              دارد؛ حتی اگر در ظاهر از دارایی‌های متنوع تشکیل شده باشد.
            </p>
          </div>
        </div>

        {/* =======================================================
            Diagnostic Surface
        ======================================================== */}

        <div
          className="
            relative
            mt-12

            overflow-hidden

            border
            border-line

            bg-white

            shadow-[0_24px_75px_rgba(16,76,97,.06)]

            sm:mt-14
            lg:mt-16
          "
        >
          {/* top strip */}

          <div
            className="
              flex
              flex-col gap-4

              border-b border-line

              bg-surface-soft/45

              px-5 py-5

              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:px-7
            "
          >
            <div>
              <p
                className="
                  text-[10px]
                  font-black
                  text-ink
                "
              >
                آیا یکی از این وضعیت‌ها برای شما آشناست؟
              </p>

              <p
                className="
                  mt-1.5

                  text-[10px]
                  font-medium
                  leading-[1.9]

                  text-ink-muted
                "
              >
                وجود یک نشانه الزاماً به معنای مشکل قطعی نیست، اما می‌تواند
                دلیلی برای بازبینی ساختار باشد.
              </p>
            </div>

            <span
              aria-hidden="true"
              className="
                hidden
                h-[11px] w-[11px]

                bg-brand-accent

                shadow-[0_0_16px_rgba(252,133,2,.35)]

                sm:block
              "
            />
          </div>

          {/* =====================================================
              2 × 2 signal field
          ====================================================== */}

          <div
            className="
              relative

              grid

              sm:grid-cols-2
            "
          >
            {WARNING_SIGNS.map((item, index) => (
              <Signal key={item.title} item={item} index={index} />
            ))}

            {/* central intersection */}

            <span
              aria-hidden="true"
              className="
                diagnostic-pulse

                pointer-events-none

                absolute
                left-1/2 top-1/2

                z-20

                hidden
                h-[10px] w-[10px]

                -translate-x-1/2
                -translate-y-1/2

                bg-brand-accent

                shadow-[0_0_0_7px_rgba(252,133,2,.06),0_0_20px_rgba(252,133,2,.30)]

                sm:block
              "
            />
          </div>
        </div>

        {/* =======================================================
            Closing insight
        ======================================================== */}

        <div
          className="
            mt-8

            grid gap-6

            border-r-[3px]
            border-brand-accent

            bg-[#f8fbfc]

            px-5 py-6

            sm:px-7

            lg:grid-cols-[1fr_auto]
            lg:items-center
            lg:gap-10
          "
        >
          <div>
            <p
              className="
                text-[11px]
                font-black
                text-brand-accent
              "
            >
              نکته اصلی
            </p>

            <p
              className="
                mt-2
                max-w-[820px]

                text-[15px]
                font-black
                leading-[1.95]

                text-ink

                sm:text-[17px]
              "
            >
              سؤال فقط این نیست که «چه دارایی‌هایی دارید؟» بلکه این است که «این
              دارایی‌ها چگونه با هم کار می‌کنند؟»
            </p>
          </div>

          <Link
            href="#portfolio-review"
            className="
              group/next

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
            چه چیزهایی بررسی می‌شود؟
            <ArrowDownLeft
              aria-hidden="true"
              className="
                h-4 w-4

                transition-transform
                duration-300

                group-hover/next:translate-y-1
                group-hover/next:-translate-x-1
              "
              strokeWidth={1.6}
            />
          </Link>
        </div>
      </div>

      <Motion />
    </section>
  );
}

/* =============================================================================
   Signal
============================================================================= */

function Signal({
  item,
  index,
}: {
  item: {
    title: string;
    description: string;
    icon: LucideIcon;
  };
  index: number;
}) {
  const Icon = item.icon;

  const desktopBorders =
    index === 0
      ? "sm:border-l sm:border-b"
      : index === 1
        ? "sm:border-b"
        : index === 2
          ? "sm:border-l"
          : "";

  const mobileBorder = index < 3 ? "border-b border-line" : "";

  return (
    <article
      className={`
        group/signal
        relative

        min-h-[210px]

        overflow-hidden

        px-5 py-7

        transition-[background-color]
        duration-300

        hover:bg-surface-soft/55

        sm:min-h-[235px]
        sm:px-7
        sm:py-8

        lg:px-9
        lg:py-9

        ${mobileBorder}
        ${desktopBorders}
      `}
    >
      <div
        className="
          flex
          h-full
          flex-col
          justify-between
          gap-7
        "
      >
        {/* icon */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-5
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

              group-hover/signal:-translate-y-1
              group-hover/signal:border-brand-primary
              group-hover/signal:bg-brand-primary
              group-hover/signal:text-white
            "
          >
            <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.45} />
          </span>

          <span
            aria-hidden="true"
            className="
              h-[6px] w-[6px]

              bg-brand-primary/18

              transition-[background-color,box-shadow]
              duration-300

              group-hover/signal:bg-brand-accent
              group-hover/signal:shadow-[0_0_14px_rgba(252,133,2,.32)]
            "
          />
        </div>

        {/* copy */}

        <div>
          <h3
            className="
              text-[17px]
              font-black
              leading-[1.8]

              text-ink

              transition-colors
              duration-300

              group-hover/signal:text-brand-primary

              sm:text-[18px]
            "
          >
            {item.title}
          </h3>

          <p
            className="
              mt-3
              max-w-[480px]

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

      {/* orange hover line */}

      <span
        aria-hidden="true"
        className="
          absolute
          bottom-0 right-0

          h-[3px] w-0

          bg-brand-accent

          transition-[width]
          duration-300

          group-hover/signal:w-full
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
            "linear-gradient(112deg,#f7fafb 0%,#ffffff 54%,#ffffff 100%)",
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
          left-[18%] top-0

          h-[6px] w-[2px]

          bg-brand-accent
        "
      />
    </>
  );
}

/* =============================================================================
   Motion
============================================================================= */

function Motion() {
  return (
    <style>{`
      .diagnostic-pulse {
        animation:
          dnh-diagnostic-pulse
          3.6s
          ease-in-out
          infinite;
      }

      @keyframes dnh-diagnostic-pulse {
        0%,
        100% {
          transform:
            translate(-50%, -50%)
            scale(.9);

          opacity: .55;

          box-shadow:
            0 0 0 6px rgba(252,133,2,.04),
            0 0 12px rgba(252,133,2,.18);
        }

        50% {
          transform:
            translate(-50%, -50%)
            scale(1.08);

          opacity: 1;

          box-shadow:
            0 0 0 10px rgba(252,133,2,.055),
            0 0 22px rgba(252,133,2,.34);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .diagnostic-pulse {
          animation: none !important;
        }
      }
    `}</style>
  );
}
