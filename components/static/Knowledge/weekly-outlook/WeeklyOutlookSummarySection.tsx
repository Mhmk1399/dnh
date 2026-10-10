import {
  Activity,
  ArrowLeft,
  CalendarDays,
  Radar,
  ShieldAlert,
} from "lucide-react";

type SummaryItem = {
  type: "change" | "risk" | "watch";
  title: string;
  text: string;
};

type WeeklyOutlookSummarySectionProps = {
  edition?: string;
  headline: string;
  summary: string;
  items: [SummaryItem, SummaryItem, SummaryItem];
};

const ITEM_META = {
  change: {
    label: "تغییر مهم",
    icon: Activity,
  },
  risk: {
    label: "ریسک قابل توجه",
    icon: ShieldAlert,
  },
  watch: {
    label: "موضوع قابل رصد",
    icon: Radar,
  },
} as const;

export function WeeklyOutlookSummarySection({
  edition,
  headline,
  summary,
  items,
}: WeeklyOutlookSummarySectionProps) {
  return (
    <section
      id="weekly-outlook-summary"
      dir="rtl"
      aria-labelledby="weekly-outlook-summary-title"
      className="
        relative
        isolate
        scroll-mt-24
        overflow-hidden

        bg-white

        py-16

        sm:scroll-mt-28
        sm:py-20
        lg:py-20
      "
    >
      <SectionGrid />

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
        

        {/* ===========================================================
            MAIN
        ============================================================ */}

        <div
          className="
            grid
            gap-10

            pt-10

            lg:grid-cols-[0.72fr_1.28fr]
            lg:gap-16
            lg:pt-12

            xl:gap-20
          "
        >
          {/* =========================================================
              INTRO
          ========================================================== */}

          <div>
            <div
              className="
                mb-4

                flex
                items-center
                gap-3
              "
            >
              <span
                aria-hidden="true"
                className="
                  h-[11px]
                  w-[11px]

                  bg-[#fc8502]
                "
              />

              <p
                className="
                  text-[13px]
                  font-black

                  text-[#167394]
                "
              >
                تصویر هفته در یک نگاه
              </p>
            </div>

            <h2
              id="weekly-outlook-summary-title"
              className="
                max-w-[720px]
                [text-wrap:balance]

                text-[29px]
                font-black
                leading-[1.7]
                tracking-[-0.04em]

                text-[#10242c]

                sm:text-[35px]

                lg:text-[40px]
                lg:leading-[1.58]
              "
            >
              جمع‌بندی هفتگی{" "}
              <span className="text-[#167394]">اقتصاد، ریسک و بازارها</span>
            </h2>

            <p
              className="
                mt-5
                max-w-[570px]

                text-[15px]
                font-medium
                leading-[2]

                text-[#62767d]

                sm:text-[16px]
              "
            >
              مهم‌ترین تغییرات و ریسک‌هایی که برای تصمیم‌گیری مالی در این هفته
              باید دیده شوند.
            </p>

            <a
              href="#weekly-outlook-macro-risk"
              className="
                group/link

                mt-7
                inline-flex
                items-center
                gap-3

                text-[14px]
                font-black

                text-[#167394]

                transition-colors
                duration-200

                hover:text-[#fc8502]

                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-[#fc8502]
              "
            >
              نمای ریسک‌های کلان
              <ArrowLeft
                aria-hidden="true"
                strokeWidth={1.8}
                className="
                  size-[16px]

                  transition-transform
                  duration-200

                  group-hover/link:-translate-x-1
                "
              />
            </a>
          </div>

          {/* =========================================================
              EXECUTIVE BRIEF
          ========================================================== */}

          <article
            aria-label="جمع‌بندی اجرایی نسخه هفتگی"
            className="
              relative

              border
              border-[#167394]/14

              bg-[#f9fbfc]

              shadow-[0_22px_60px_rgba(3,55,70,.045)]
            "
          >
            {/* -------------------------------------------------------
                REPORT HEADER
            -------------------------------------------------------- */}

            <div
              className="
                grid
                gap-4

                border-b
                border-[#167394]/10

                px-5
                py-5

                sm:px-6

                md:grid-cols-[auto_1fr]
                md:items-start
                md:gap-6

                lg:px-7
              "
            >
              <div
                aria-hidden="true"
                className="
                  grid
                  size-10
                  place-items-center

                  border
                  border-[#167394]/12

                  bg-white
                "
              >
                <Activity
                  strokeWidth={1.6}
                  className="
                    size-[18px]

                    text-[#167394]
                  "
                />
              </div>

              <div>
                <p
                  className="
                    text-[12px]
                    font-black

                    text-[#167394]/48
                  "
                >
                  نکته محوری این نسخه
                </p>

                <h3
                  className="
                    mt-1

                    max-w-[720px]

                    text-[19px]
                    font-black
                    leading-[1.85]

                    text-[#173b45]

                    sm:text-[21px]
                  "
                >
                  {headline}
                </h3>

                <p
                  className="
                    mt-3

                    max-w-[760px]

                    text-[14px]
                    font-medium
                    leading-7

                    text-[#667a81]

                    sm:text-[15px]
                  "
                >
                  {summary}
                </p>
              </div>
            </div>

            {/* -------------------------------------------------------
                THREE READS
            -------------------------------------------------------- */}

            <div>
              {items.map((item, index) => (
                <SummaryRow
                  key={`${item.type}-${index}`}
                  index={index + 1}
                  {...item}
                />
              ))}
            </div>

            {/* -------------------------------------------------------
                FOOT
            -------------------------------------------------------- */}

            <div
              className="
                flex
                items-center
                gap-3

                border-t
                border-[#167394]/10

                bg-white

                px-5
                py-4

                sm:px-6
                lg:px-7
              "
            >
              <span
                aria-hidden="true"
                className="
                  h-[6px]
                  w-[6px]

                  shrink-0

                  bg-[#fc8502]
                "
              />

              <p
                className="
                  text-[13px]
                  font-bold
                  leading-6

                  text-[#61757c]
                "
              >
                این بخش جمع‌بندی تحلیلی است؛ نه پیش‌بینی قطعی و نه توصیه خرید یا
                فروش.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   SUMMARY ROW
============================================================================= */

function SummaryRow({
  index,
  type,
  title,
  text,
}: SummaryItem & {
  index: number;
}) {
  const meta = ITEM_META[type];
  const Icon = meta.icon;

  return (
    <div
      className="
        group/row
        relative

        grid
        gap-4

        border-b
        border-[#167394]/[0.085]

        px-5
        py-5

        last:border-b-0

        transition-colors
        duration-200

        hover:bg-white

        sm:px-6

        md:grid-cols-[40px_145px_1fr]
        md:items-center
        md:gap-5

        lg:px-7
      "
    >
      {/* icon */}

      <div
        className="
          grid
          size-9
          place-items-center

          border
          border-[#167394]/10

          bg-white
        "
      >
        <Icon
          aria-hidden="true"
          strokeWidth={1.6}
          className="
            size-[16px]

            text-[#167394]/65

            transition-colors
            duration-200

            group-hover/row:text-[#fc8502]
          "
        />
      </div>

      {/* label */}

      <div>
        <span
          className="
            text-[11px]
            font-black
            tabular-nums

            text-[#167394]/32
          "
        >
          0{index}
        </span>

        <p
          className="
            mt-0.5

            text-[14px]
            font-black

            text-[#31545e]
          "
        >
          {meta.label}
        </p>
      </div>

      {/* content */}

      <div
        className="
          md:border-r
          md:border-[#167394]/[0.08]
          md:pr-5
        "
      >
        <h4
          className="
            text-[15px]
            font-black
            leading-7

            text-[#173b45]
          "
        >
          {title}
        </h4>

        <p
          className="
            mt-1

            text-[14px]
            font-medium
            leading-7

            text-[#718187]
          "
        >
          {text}
        </p>
      </div>

      {/* hover rail */}

      <span
        aria-hidden="true"
        className="
          absolute
          inset-y-0
          right-0

          w-[2px]

          origin-bottom
          scale-y-0

          bg-[#fc8502]

          transition-transform
          duration-200

          group-hover/row:scale-y-100
        "
      />
    </div>
  );
}

/* =============================================================================
   BACKGROUND GRID
============================================================================= */

function SectionGrid() {
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
          background: "linear-gradient(180deg,#ffffff 0%,#fbfcfd 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.028]
        "
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(22,115,148,.22) 1px,transparent 1px)",
          backgroundSize: "118px 100%",
        }}
      />
    </>
  );
}
