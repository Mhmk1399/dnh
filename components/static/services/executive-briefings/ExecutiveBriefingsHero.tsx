import { ArrowDownLeft, ArrowLeft } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   EXECUTIVE BRIEFINGS — HERO

   Core idea:
   One important issue
   → focused executive review
   → key points / scenarios / paths to consider

   Dark / premium / boardroom
   Server Component
============================================================================= */

const BRIEF_OUTPUTS = [
  "نکات کلیدی",
  "سناریوهای مرتبط",
  "مسیرهای قابل بررسی",
] as const;

export function ExecutiveBriefingsHero() {
  return (
    <section
      id="executive-briefings-intro"
      dir="rtl"
      aria-labelledby="executive-briefings-hero-title"
      className="
        relative
        isolate

        min-h-[100svh]
        scroll-mt-24
        overflow-hidden

        bg-[#022f3e]
        text-white

        sm:scroll-mt-28
      "
    >
      <HeroBackground />

      <div
        className="
          dnh-site-shell
          relative
          z-10

          mx-auto
          flex
          min-h-[100svh]
          w-full
          max-w-[1536px]
          flex-col

          px-5
          pb-8
          pt-[116px]

          sm:px-8
          sm:pb-10
          sm:pt-[126px]

          lg:px-12
          lg:pb-10
          lg:pt-[108px]

          xl:px-16
          2xl:px-20
        "
      >
        <div
          className="
            grid
            flex-1
            items-center
            gap-12

            py-10

            lg:grid-cols-[1.02fr_0.98fr]
            lg:gap-16
            lg:py-8

            xl:gap-20
          "
        >
          {/* ===========================================================
              VISUAL
          ============================================================ */}

          <div
            className="
              order-2

              lg:col-start-2
              lg:row-start-1
            "
          >
            <ExecutiveBriefVisual />
          </div>

          {/* ===========================================================
              CONTENT
          ============================================================ */}

          <div
            className="
              contents

              lg:block
              lg:col-start-1
              lg:row-start-1
            "
          >
            <div className="order-1">
              {/* eyebrow */}

            <div
              className="
                mb-5
                flex
                items-center
                gap-3
              "
            >
              <span aria-hidden="true" className="h-px w-10 bg-brand-accent" />

              <p
                className="
                  text-[13px]
                  font-black
                  text-white/68
                "
              >
                بریفینگ‌های اجرایی DNH
              </p>
            </div>

            {/* h1 */}

            <h1
              id="executive-briefings-hero-title"
              className="
                max-w-[900px]

                text-[36px]
                font-black
                leading-[1.62]
                tracking-[-0.05em]

                text-white

                sm:text-[44px]

                lg:text-[52px]
                lg:leading-[1.52]

                xl:text-[59px]
              "
            >
              یک موضوع مهم؛
              <br />
              با{" "}
              <span className="text-brand-accent">
                تمرکز لازم برای تصمیم‌گیرنده ارشد.
              </span>
            </h1>

            {/* description */}

            <p
              className="
                mt-6
                max-w-[720px]

                text-[15px]
                font-medium
                leading-[2.15]

                text-white/58

                sm:text-[16px]
              "
            >
              وقتی یک موضوع مالی یا راهبردی به بررسی در سطح مدیر ارشد،
              هیئت‌مدیره یا صاحب سرمایه نیاز دارد، اطلاعات پراکنده باید به یک
              تصویر متمرکز از مسئله، نکات کلیدی، سناریوها و مسیرهای قابل بررسی
              تبدیل شوند.
              </p>
            </div>

            {/* actions */}

            <div
              className="
                order-3
                mt-0

                flex
                flex-col
                gap-3

                sm:flex-row
                sm:flex-wrap

                lg:order-none
                lg:mt-9
              "
            >
              <ActionButton
                href="/financial-decision-assessment"
                variant="assessment"
                size="lg"
                icon={ArrowLeft}
                className="
                  w-full

                  bg-brand-accent
                  text-white

                  shadow-[0_18px_48px_rgba(252,133,2,.18)]

                  hover:-translate-y-0.5
                  hover:bg-[#eb7c01]

                  sm:w-auto
                  sm:min-w-[275px]
                "
              >
                شروع ارزیابی اولیه تصمیم مالی
              </ActionButton>

              <ActionButton
                href="#executive-briefings-fit"
                variant="secondary"
                size="lg"
                icon={ArrowDownLeft}
                className="
                  w-full

                  border-white/20
                  bg-white/[0.025]

                  text-white
                  shadow-none

                  hover:-translate-y-0.5
                  hover:border-white/38
                  hover:bg-white/[0.06]
                  hover:text-white

                  sm:w-auto
                  sm:min-w-[235px]
                "
              >
                این بریفینگ برای چه زمانی است؟
              </ActionButton>
            </div>

            {/* audience */}

            <div
              className="
                order-4
                mt-0
                max-w-[720px]

                border-r-2
                border-[#82cee4]/38

                pr-4

                lg:order-none
                lg:mt-8
              "
            >
              <p
                className="
                  text-[14px]
                  font-medium
                  leading-7

                  text-white/46
                "
              >
                مناسب برای مدیران ارشد، اعضای هیئت‌مدیره، صاحبان سرمایه و
                تصمیم‌گیران کلیدی که نیاز دارند یک موضوع مهم را بدون پراکندگی
                بررسی کنند.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   EXECUTIVE BRIEF VISUAL
============================================================================= */

function ExecutiveBriefVisual() {
  return (
    <div
      role="img"
      aria-label="یک موضوع مهم در مرکز بریفینگ اجرایی قرار می‌گیرد و به جمع‌بندی نکات کلیدی، سناریوهای مرتبط و مسیرهای قابل بررسی منجر می‌شود."
      className="
        relative
        mx-auto
        w-full
        max-w-[650px]
      "
    >
      <div
        className="
          relative
          overflow-hidden

          border
          border-white/12

          bg-white/[0.022]

          shadow-[0_36px_100px_rgba(0,0,0,.2)]
        "
      >
        {/* =============================================================
            DOCUMENT HEADER
        ============================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-6

            border-b
            border-white/10

            px-5
            py-4

            sm:px-6
          "
        >
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-[11px] w-[11px] bg-brand-accent"
            />

            <p
              className="
                text-[14px]
                font-black

                text-white/62
              "
            >
              بریفینگ تصمیم
            </p>
          </div>

          <span
            aria-hidden="true"
            className="
              h-px
              w-10

              bg-white/12
            "
          />
        </div>

        {/* =============================================================
            FOCUS AREA
        ============================================================== */}

        <div
          className="
            relative

            px-5
            py-6

            sm:px-6
            sm:py-7
          "
        >
          <p
            className="
              text-[14px]
              font-black

              text-white/42
            "
          >
            موضوع مورد بررسی
          </p>

          <div
            className="
              relative

              mt-3

              border
              border-brand-accent/38

              bg-brand-accent/[0.035]

              px-5
              py-5
            "
          >
            {/* focus corner */}

            <span
              aria-hidden="true"
              className="
                absolute
                right-[-1px]
                top-[-1px]

                h-8
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
                w-8

                bg-brand-accent
              "
            />

            <p
              className="
                text-[18px]
                font-black
                leading-8

                text-white

                sm:text-[20px]
              "
            >
              یک تصمیم یا موضوع مهم در سطح مدیریت ارشد
            </p>

            <p
              className="
                mt-2

                text-[14px]
                font-medium
                leading-7

                text-white/48
              "
            >
              تمرکز روی همان مسئله‌ای که باید روشن‌تر دیده شود.
            </p>
          </div>

          {/* ===========================================================
              FILTER / REDUCTION
          ============================================================ */}

          <div
            className="
              relative

              my-5

              flex
              items-center
              gap-4
            "
          >
            <span
              aria-hidden="true"
              className="
                h-px
                flex-1

                bg-white/10
              "
            />

            <p
              className="
                text-[14px]
                font-black

                text-white/38
              "
            >
              جمع‌بندی متمرکز
            </p>

            <span
              aria-hidden="true"
              className="
                h-px
                flex-1

                bg-white/10
              "
            />
          </div>

          {/* ===========================================================
              OUTPUTS
          ============================================================ */}

          <div
            className="
              grid

              border
              border-white/10

              sm:grid-cols-3
            "
          >
            {BRIEF_OUTPUTS.map((item, index) => (
              <BriefOutput key={item} title={item} accent={index === 2} />
            ))}
          </div>
        </div>

        {/* =============================================================
            BOTTOM PRINCIPLE
        ============================================================== */}

        <div
          className="
            flex
            items-start
            gap-4

            border-t
            border-white/10

            bg-black/[0.06]

            px-5
            py-4

            sm:px-6
          "
        >
          <span
            aria-hidden="true"
            className="
              mt-[11px]

              h-[11px]
              w-[11px]

              shrink-0

              bg-[#82cee4]/60
            "
          />

          <p
            className="
              text-[14px]
              font-medium
              leading-7

              text-white/45
            "
          >
            کمتر کردن حجم اطلاعات؛ برای روشن‌تر شدن آنچه واقعاً به تصمیم مربوط
            است.
          </p>
        </div>
      </div>
    </div>
  );
}

/* =============================================================================
   BRIEF OUTPUT
============================================================================= */

function BriefOutput({
  title,
  accent = false,
}: {
  title: string;
  accent?: boolean;
}) {
  return (
    <div
      className="
        relative

        flex
        min-h-[78px]
        items-center

        border-b
        border-white/[0.075]

        px-4

        last:border-b-0

        sm:border-b-0
        sm:border-l
        sm:last:border-l-0
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
            h-[11px]
            w-[11px]

            shrink-0

            ${accent ? "bg-brand-accent" : "bg-[#82cee4]/55"}
          `}
        />

        <p
          className={`
            text-[14px]
            font-black
            leading-7

            ${accent ? "text-brand-accent" : "text-white/70"}
          `}
        >
          {title}
        </p>
      </div>
    </div>
  );
}

/* =============================================================================
   BACKGROUND
============================================================================= */

function HeroBackground() {
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
            "radial-gradient(circle at 28% 46%,rgba(22,115,148,.24),transparent 30%),radial-gradient(circle at 77% 72%,rgba(252,133,2,.025),transparent 18%),linear-gradient(116deg,#022936 0%,#033847 52%,#022d3a 100%)",
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

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-[41%]

          h-px

          bg-white/[0.025]
        "
      />
    </>
  );
}
