import { ArrowLeft, ArrowUpLeft } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

export function WealthStrategyFinalSection() {
  return (
    <section
      id="wealth-strategy-outcome"
      dir="rtl"
      aria-labelledby="wealth-strategy-outcome-title"
      className="
        relative isolate
        scroll-mt-24 overflow-hidden
        bg-[#022f3e]
        text-white
        sm:scroll-mt-28
      "
    >
      <Background />

      <div
        className="
          dnh-site-shell
          relative z-10

          mx-auto
          w-full
          max-w-[1536px]

          px-5 py-16
          sm:px-8 sm:py-20
          lg:px-12 lg:py-24
          xl:px-16 xl:py-28
          2xl:px-20
        "
      >
        {/* =======================================================
            Main statement
        ======================================================== */}

        <div
          className="
            mx-auto
            max-w-[1050px]
          "
        >
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-10 bg-brand-accent" />

            <span
              className="
                text-[10px]
                font-black
                text-white/58

                sm:text-[11px]
              "
            >
              خروجی استراتژی ثروت خصوصی
            </span>
          </div>

          <h2
            id="wealth-strategy-outcome-title"
            className="
              mt-6
              max-w-[930px]

              text-[34px]
              font-black
              leading-[1.7]
              tracking-[-0.05em]

              text-white

              sm:text-[43px]

              lg:text-[52px]
              lg:leading-[1.55]

              xl:text-[58px]
            "
          >
            در پایان،
            <br />
            باید <span className="text-brand-accent">تصویر روشن‌تری</span> از
            ثروت خود داشته باشید.
          </h2>

          <p
            className="
              mt-6
              max-w-[660px]

              text-[13px]
              font-medium
              leading-[2.2]

              text-white/48

              sm:text-[14px]
              lg:text-[15px]
            "
          >
            نه یک پاسخ قطعی برای همه‌چیز؛ بلکه درک روشن‌تری از وضعیت فعلی،
            ریسک‌های مهم و مسیرهایی که ارزش بررسی دارند.
          </p>
        </div>

        {/* =======================================================
            Outcome line
        ======================================================== */}

        <div
          className="
            mx-auto
            mt-12
            max-w-[1050px]

            border-y
            border-white/10

            py-6

            sm:mt-14
            sm:py-7
          "
        >
          <div
            className="
              grid
              gap-1

              grid-cols-3
              sm:gap-0
            "
          >
            <Outcome title="وضعیت فعلی" text="ساختار کلی ثروت" />

            <Outcome
              title="نقاط مهم و ریسک‌ها"
              text="آنچه نیازمند توجه بیشتر است"
              divided
            />

            <Outcome
              title="مسیرهای قابل بررسی"
              text="جهت‌های ممکن برای تصمیم بعدی"
              divided
            />
          </div>
        </div>

        {/* =======================================================
            CTA
        ======================================================== */}

        <div
          id="wealth-strategy-cta"
          className="
            mx-auto
            mt-10
            max-w-[1050px]

            scroll-mt-24

            sm:scroll-mt-28
          "
        >
          <div
            className="
              grid
              gap-7

              lg:grid-cols-[1fr_auto]
              lg:items-end
              lg:gap-12
            "
          >
            <div>
              <p
                className="
                  text-[10px]
                  font-black
                  text-brand-accent
                "
              >
                اگر این تصویر هنوز روشن نیست
              </p>

              <p
                className="
                  mt-2
                  max-w-[610px]

                  text-[17px]
                  font-black
                  leading-[1.95]

                  text-white

                  sm:text-[16px]
                "
              >
                نقطه شروع، شناخت بهتر خود مسئله و بررسی تناسب مسیر است.
              </p>
            </div>

            <div
              className="
                flex
                flex-col
                gap-3

                sm:flex-row
                sm:flex-wrap

                lg:justify-end
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

                  shadow-[0_18px_45px_rgba(252,133,2,.18)]

                  hover:-translate-y-0.5
                  hover:bg-[#eb7c01]

                  sm:w-auto
                  sm:min-w-[285px]
                "
              >
                شروع ارزیابی اولیه ساختار ثروت
              </ActionButton>

              <ActionButton
                href="/request-strategic-consultation"
                variant="secondary"
                size="lg"
                icon={ArrowUpLeft}
                className="
                  w-full

                  border-white/16
                  bg-transparent

                  text-white

                  shadow-none

                  hover:-translate-y-0.5
                  hover:border-white/32
                  hover:bg-white/[0.05]
                  hover:text-white

                  sm:w-auto
                  sm:min-w-[230px]
                "
              >
                درخواست مشاوره راهبردی
              </ActionButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   Outcome
============================================================================= */

function Outcome({
  title,
  text,
  divided = false,
}: {
  title: string;
  text: string;
  divided?: boolean;
}) {
  return (
    <div
      className={`
        relative

        px-0

        sm:px-7

        ${divided ? "sm:border-r sm:border-white/10" : ""}
      `}
    >
      <p
        className="
          text-[13px]
          font-black

          text-white

          sm:text-[14px]
        "
      >
        {title}
      </p>

      <p
        className="
          mt-1.5

          text-[11px] lg:text-xs
          font-medium
          leading-[1.9]

          text-white/33
        "
      >
        {text}
      </p>
    </div>
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
            "radial-gradient(circle at 18% 48%,rgba(22,115,148,.16),transparent 28%),linear-gradient(116deg,#022936 0%,#033746 56%,#022b38 100%)",
        }}
      />
    </>
  );
}
