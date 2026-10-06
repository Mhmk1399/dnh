import Link from "next/link";

import { ArrowDownLeft } from "lucide-react";

const STEPS = [
  {
    number: "01",
    en: "OBSERVE",
    title: "چه چیزی تغییر کرده؟",
    text: "اقتصاد، بازار، نقدشوندگی و ریسک در زمینه تصمیم دیده می‌شوند.",
  },
  {
    number: "02",
    en: "INTERPRET",
    title: "چرا این تغییر مهم است؟",
    text: "اثر تغییر بر ریسک، سناریو و شرایط تصمیم بررسی می‌شود.",
  },
  {
    number: "03",
    en: "IMPLICATION",
    title: "برای تصمیم چه معنایی دارد؟",
    text: "نتیجه به یک پیامد راهبردی و مسیر قابل بررسی تبدیل می‌شود.",
  },
] as const;

export function StrategicImplicationsSection() {
  return (
    <section
      id="strategic-implications"
      dir="rtl"
      aria-labelledby="strategic-implications-title"
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
          dnh-site-shell relative z-10
          mx-auto w-full max-w-[1536px]

          px-5 py-16
          sm:px-8 sm:py-20
          lg:px-12 lg:py-24
          xl:px-16 xl:py-28
          2xl:px-20
        "
      >
        {/* Header */}
        <div className="max-w-[820px]">
          <div className="mb-5 flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-10 bg-brand-accent" />

            <span
              className="
                text-[10px] font-black text-brand-primary
                sm:text-[11px]
              "
            >
              پیامد راهبردی
            </span>
          </div>

          <h2
            id="strategic-implications-title"
            className="
              text-[31px] font-black leading-[1.65]
              tracking-[-0.045em] text-ink

              sm:text-[38px]
              lg:text-[45px] lg:leading-[1.55]
              xl:text-[50px]
            "
          >
            از دیدن تغییر،
            <br />
            تا فهمیدن{" "}
            <span className="text-brand-primary">معنای آن برای تصمیم.</span>
          </h2>

          <p
            className="
              mt-5 max-w-[640px]
              text-[13px] font-medium leading-[2.15]
              text-ink-muted

              sm:text-[14px]
            "
          >
            Intelligence فقط مشاهده داده نیست؛ ارزش آن زمانی شکل می‌گیرد که
            بدانیم تغییرات چرا برای تصمیم اهمیت دارند.
          </p>
        </div>

        {/* Simple flow */}
        <div
          className="
            relative mt-12
            border-y border-line

            sm:mt-14
            lg:mt-16
          "
        >
          {/* desktop connecting line */}
          <span
            aria-hidden="true"
            className="
              absolute left-[8%] right-[8%] top-[42px]
              hidden h-px bg-line
              lg:block
            "
          />

          <div className="grid lg:grid-cols-3">
            {STEPS.map((step, index) => (
              <Step
                key={step.number}
                step={step}
                last={index === STEPS.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div
          className="
            mt-7
            flex flex-col gap-5

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p
            className="
              max-w-[700px]
              text-[9px] font-medium leading-[2]
              text-ink-muted
              sm:text-[10px]
            "
          >
            هدف، پیش‌بینی نتیجه نیست؛ هدف، روشن‌تر کردن شرایط و مسیرهای قابل
            بررسی است.
          </p>

          <Link
            href="#what-to-watch"
            className="
              group inline-flex min-h-11 items-center gap-3
              text-[10px] font-black text-brand-primary
              outline-none
              transition-colors duration-300
              hover:text-brand-accent
              focus-visible:ring-2 focus-visible:ring-focus/40
            "
          >
            چه چیزهایی باید زیر نظر بمانند؟
            <ArrowDownLeft
              aria-hidden="true"
              className="
                h-4 w-4
                transition-transform duration-300
                group-hover:translate-y-1
                group-hover:-translate-x-1
              "
              strokeWidth={1.6}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Step({ step, last }: { step: (typeof STEPS)[number]; last: boolean }) {
  return (
    <article
      className={`
        group relative
        px-5 py-7

        sm:px-7 sm:py-8
        lg:px-8 lg:py-10

        ${!last ? "border-b border-line lg:border-b-0 lg:border-l" : ""}
      `}
    >
      {/* node */}
      <div
        className="
          relative z-10
          mb-6 flex items-center gap-4
        "
      >
        <span
          className="
            flex h-10 w-10 items-center justify-center
            border border-brand-primary/20
            bg-white

            font-mono text-[11px] font-black
            text-brand-primary

            transition-[background-color,color,border-color]
            duration-300

            group-hover:border-brand-primary
            group-hover:bg-brand-primary
            group-hover:text-white
          "
        >
          {step.number}
        </span>

        <span
          dir="ltr"
          className="
            text-[7px] font-black tracking-[0.17em]
            text-brand-primary/35
          "
        >
          {step.en}
        </span>
      </div>

      <h3
        className="
          text-[16px] font-black leading-[1.9]
          text-ink
          sm:text-[18px]
        "
      >
        {step.title}
      </h3>

      <p
        className="
          mt-3 max-w-[360px]
          text-[11px] font-medium leading-[2]
          text-ink-muted
          sm:text-[12px]
        "
      >
        {step.text}
      </p>

      <span
        aria-hidden="true"
        className="
          mt-5 block h-[2px] w-7
          bg-brand-primary/18

          transition-[width,background-color]
          duration-300

          group-hover:w-14
          group-hover:bg-brand-accent
        "
      />
    </article>
  );
}

function Background() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(112deg,color-mix(in srgb,var(--dnh-primary) 2%,white) 0%,white 60%,white 100%)",
        }}
      />

      <span
        aria-hidden="true"
        className="
          absolute right-[18%] top-0
          h-[6px] w-[2px]
          bg-brand-accent
        "
      />
    </>
  );
}
