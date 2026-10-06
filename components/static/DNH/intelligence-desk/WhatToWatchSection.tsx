import Link from "next/link";

import { ArrowDownLeft, CircleDot } from "lucide-react";

const WATCH_ITEMS = [
  {
    en: "INFLATION",
    fa: "تورم",
    note: "اثر بر قدرت خرید و شرایط تصمیم",
  },
  {
    en: "CURRENCY",
    fa: "ارز",
    note: "اثر بر ریسک و ارزش نسبی تصمیم",
  },
  {
    en: "LIQUIDITY",
    fa: "نقدشوندگی",
    note: "اثر بر انعطاف و امکان اجرا",
  },
  {
    en: "POLICY RISK",
    fa: "ریسک سیاست‌گذاری",
    note: "اثر بر شرایط و محدودیت‌های پیش رو",
  },
  {
    en: "MARKET CONDITIONS",
    fa: "شرایط بازار",
    note: "اثر بر زمینه و زمان‌بندی تصمیم",
  },
] as const;

/* =============================================================================
   SERVER COMPONENT
============================================================================= */

export function WhatToWatchSection() {
  return (
    <section
      id="what-to-watch"
      dir="rtl"
      aria-labelledby="what-to-watch-title"
      className="
        relative isolate

        scroll-mt-24
        overflow-hidden

        border-b border-line
        bg-[#f8fbfc]

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
        <div
          className="
            grid gap-10

            lg:grid-cols-[0.78fr_1.22fr]
            lg:items-start
            lg:gap-16
          "
        >
          {/* =====================================================
              INTRO
          ====================================================== */}

          <div className="lg:sticky lg:top-32">
            <div className="mb-5 flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-10 bg-brand-accent" />

              <span
                className="
                  text-[10px] font-black
                  text-brand-primary

                  sm:text-[11px]
                "
              >
                چه چیزهایی زیر نظر می‌مانند؟
              </span>
            </div>

            <h2
              id="what-to-watch-title"
              className="
                max-w-[650px]

                text-[31px]
                font-black
                leading-[1.65]
                tracking-[-0.045em]

                text-ink

                sm:text-[38px]

                lg:text-[44px]
                lg:leading-[1.55]
              "
            >
              همه‌چیز مهم نیست؛
              <br />
              باید بدانیم{" "}
              <span className="text-brand-primary">کجا نگاه کنیم.</span>
            </h2>

            <p
              className="
                mt-5
                max-w-[560px]

                text-[13px]
                font-medium
                leading-[2.15]

                text-ink-muted

                sm:text-[14px]
              "
            >
              تمرکز روی متغیرهایی است که می‌توانند زمینه تصمیم، ریسک یا انعطاف
              مسیر را تغییر دهند.
            </p>
          </div>

          {/* =====================================================
              WATCH LIST
          ====================================================== */}

          <div
            className="
              overflow-hidden

              border-y
              border-line

              bg-white
            "
          >
            {WATCH_ITEMS.map((item, index) => (
              <WatchRow
                key={item.en}
                item={item}
                last={index === WATCH_ITEMS.length - 1}
              />
            ))}

            {/* ===================================================
                Closing
            ==================================================== */}

            <div
              className="
                border-t
                border-line

                bg-surface-soft/55

                px-5 py-6

                sm:px-7
              "
            >
              <div
                className="
                  flex
                  flex-col
                  gap-5

                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <div
                  className="
                    flex
                    items-start
                    gap-3
                  "
                >
                  <CircleDot
                    aria-hidden="true"
                    className="
                      mt-1
                      h-4 w-4
                      shrink-0

                      text-brand-primary
                    "
                    strokeWidth={1.5}
                  />

                  <p
                    className="
                      max-w-[620px]

                      text-[10px]
                      font-medium
                      leading-[2]

                      text-ink-muted
                    "
                  >
                    هدف رصد، پیش‌بینی قطعی نیست؛ هدف تشخیص تغییراتی است که
                    می‌توانند برای تصمیم مهم شوند.
                  </p>
                </div>

                <Link
                  href="#intelligence-boundary"
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
                  مرز Intelligence Desk
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
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   Row
============================================================================= */

function WatchRow({
  item,
  last,
}: {
  item: (typeof WATCH_ITEMS)[number];
  last: boolean;
}) {
  return (
    <article
      className={`
        group

        grid
        gap-3

        px-5
        py-5

        transition-colors
        duration-300

        hover:bg-surface-soft/45

        sm:grid-cols-[0.34fr_0.66fr]
        sm:items-center
        sm:px-7
        sm:py-6

        ${!last ? "border-b border-line" : ""}
      `}
    >
      <div>
        <p
          dir="ltr"
          className="
            text-right

            text-[7px]
            font-black
            tracking-[0.16em]

            text-brand-primary/40
          "
        >
          {item.en}
        </p>

        <h3
          className="
            mt-1.5

            text-[15px]
            font-black

            text-ink

            sm:text-[16px]
          "
        >
          {item.fa}
        </h3>
      </div>

      <div
        className="
          flex
          items-center
          justify-between
          gap-6
        "
      >
        <p
          className="
            text-[11px]
            font-medium
            leading-[2]

            text-ink-muted

            sm:text-[12px]
          "
        >
          {item.note}
        </p>

        <span
          aria-hidden="true"
          className="
            h-[6px]
            w-[6px]
            shrink-0

            bg-brand-primary/25

            transition-[background-color,transform,box-shadow]
            duration-300

            group-hover:scale-125
            group-hover:bg-brand-accent
            group-hover:shadow-[0_0_12px_rgba(252,133,2,.35)]
          "
        />
      </div>
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
          absolute
          inset-0
        "
        style={{
          background:
            "linear-gradient(112deg,#f5fafb 0%,#ffffff 52%,#f8fbfc 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.08]
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

          h-[6px]
          w-[2px]

          bg-brand-accent
        "
      />
    </>
  );
}
