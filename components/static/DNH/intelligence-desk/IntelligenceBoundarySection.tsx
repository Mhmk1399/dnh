import Link from "next/link";

import { ArrowDownLeft, Check } from "lucide-react";

const PURPOSES = [
  {
    title: "زمینه تصمیم",
    text: "دیدن اقتصاد، بازار و شرایطی که بر تصمیم اثر می‌گذارند.",
  },
  {
    title: "شناخت ریسک",
    text: "تشخیص ریسک‌ها و متغیرهایی که نیازمند توجه‌اند.",
  },
  {
    title: "پیامد راهبردی",
    text: "فهمیدن اینکه تغییرات برای مسیر تصمیم چه معنایی دارند.",
  },
] as const;

export function IntelligenceBoundarySection() {
  return (
    <section
      id="intelligence-boundary"
      dir="rtl"
      aria-labelledby="intelligence-boundary-title"
      className="
        relative
        isolate
        scroll-mt-24
        overflow-hidden
        bg-white
        sm:scroll-mt-28
      "
    >
      <Background />

      <div
        className="
          dnh-site-shell
          relative z-10
          mx-auto w-full max-w-[1536px]

          px-5 py-16
          sm:px-8 sm:py-20
          lg:px-12 lg:py-24
          xl:px-16 xl:py-28
          2xl:px-20
        "
      >
        {/* Header */}
        <div className="mx-auto max-w-[900px] text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span aria-hidden="true" className="h-px w-10 bg-brand-accent" />

            <span
              className="
                text-[10px] font-black
                text-brand-primary
                sm:text-[11px]
              "
            >
              مرز Intelligence Desk
            </span>

            <span aria-hidden="true" className="h-px w-10 bg-brand-accent" />
          </div>

          <h2
            id="intelligence-boundary-title"
            className="
              text-[32px]
              font-black
              leading-[1.65]
              tracking-[-0.045em]
              text-ink

              sm:text-[40px]

              lg:text-[49px]
              lg:leading-[1.5]
            "
          >
            هدف، فهم بهتر <span className="text-brand-primary">تصمیم </span>
            است؛ 
            <br />
            نه پیش‌بینی بازار.
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-[650px]

              text-[13px]
              font-medium
              leading-[2.15]

              text-ink-muted

              sm:text-[14px]
            "
          >
            Intelligence Desk برای روشن‌تر کردن شرایط، ریسک و معنای تغییرات در
            مسیر تصمیم طراحی شده است.
          </p>
        </div>

        {/* Core points */}
        <div
          className="
            mx-auto
            mt-12
            max-w-[1050px]

            border-y
            border-line

            sm:mt-14

            lg:mt-16
          "
        >
          <div className="grid lg:grid-cols-3">
            {PURPOSES.map((item, index) => (
              <Purpose
                key={item.title}
                item={item}
                last={index === PURPOSES.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Boundary line */}
        <div
          className="
            mx-auto
            mt-10
            max-w-[1050px]

            border-r-2
            border-brand-accent

            bg-surface-soft/50

            px-5
            py-6

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
            <div>
              <p
                dir="ltr"
                className="
                  text-[7px]
                  font-black
                  tracking-[0.18em]

                  text-brand-accent
                "
              >
                NOT A TRADING SCREEN
              </p>

              <p
                className="
                  mt-2
                  text-[14px]
                  font-black
                  leading-[1.9]
                  text-ink

                  sm:text-[16px]
                "
              >
                نه سیگنال خرید و فروش، نه پیش‌بینی قطعی قیمت.
              </p>
            </div>

            <div
              className="
                flex
                flex-wrap
                gap-x-5
                gap-y-2
              "
            >
              <MutedLabel>Buy / Sell Signal</MutedLabel>

              <MutedLabel>Price Prediction</MutedLabel>

              <MutedLabel>Trading Terminal</MutedLabel>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="
            mx-auto
            mt-8
            flex
            max-w-[1050px]

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
            <Check
              aria-hidden="true"
              className="
                mt-1
                h-4 w-4
                shrink-0

                text-brand-primary
              "
              strokeWidth={1.6}
            />

            <p
              className="
                max-w-[680px]

                text-[9px]
                font-medium
                leading-[2]

                text-ink-muted

                sm:text-[10px]
              "
            >
              تمرکز DNH بر شناخت محیط تصمیم، ریسک و پیامدهای راهبردی است.
            </p>
          </div>

          <Link
            href="#intelligence-cta"
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
            ادامه مسیر
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

function Purpose({
  item,
  last,
}: {
  item: (typeof PURPOSES)[number];
  last: boolean;
}) {
  return (
    <article
      className={`
        px-5
        py-7

        sm:px-7
        sm:py-8

        lg:px-8
        lg:py-10

        ${!last ? "border-b border-line lg:border-b-0 lg:border-l" : ""}
      `}
    >
      <span
        aria-hidden="true"
        className="
          block
          h-[6px]
          w-[6px]

          bg-brand-accent
        "
      />

      <h3
        className="
          mt-4

          text-[18px]
          font-black

          text-ink
        "
      >
        {item.title}
      </h3>

      <p
        className="
          mt-3
          max-w-[300px]

          text-[11px]
          font-medium
          leading-[2]

          text-ink-muted

          sm:text-[12px]
        "
      >
        {item.text}
      </p>
    </article>
  );
}

function MutedLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      dir="ltr"
      className="
        relative

        text-[8px]
        font-black
        tracking-[0.12em]

        text-ink-muted/45

        after:absolute
        after:left-0
        after:top-1/2

        after:h-px
        after:w-full

        after:-translate-y-1/2

        after:bg-ink-muted/25
      "
    >
      {children}
    </span>
  );
}

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
            "linear-gradient(112deg,#f7fafb 0%,#ffffff 55%,#ffffff 100%)",
        }}
      />

  
    </>
  );
}
