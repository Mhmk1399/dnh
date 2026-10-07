import {
  Activity,
  CircleDollarSign,
  Droplets,
  Landmark,
  ShieldAlert,
} from "lucide-react";

type RiskType = "inflation" | "currency" | "policy" | "liquidity";

type MacroRiskItem = {
  type: RiskType;
  title: string;
  summary: string;
};

type WeeklyOutlookMacroRiskSectionProps = {
  thesis: string;
  risks: [MacroRiskItem, MacroRiskItem, MacroRiskItem, MacroRiskItem];
};

const RISK_META = {
  inflation: {
    label: "تورم",
    icon: Activity,
  },
  currency: {
    label: "ارز",
    icon: CircleDollarSign,
  },
  policy: {
    label: "سیاست‌گذاری",
    icon: Landmark,
  },
  liquidity: {
    label: "نقدینگی",
    icon: Droplets,
  },
} as const;

export function WeeklyOutlookMacroRiskSection({
  thesis,
  risks,
}: WeeklyOutlookMacroRiskSectionProps) {
  return (
    <section
      id="weekly-outlook-macro-risk"
      dir="rtl"
      aria-labelledby="weekly-outlook-macro-risk-title"
      className="
        relative
        isolate
        scroll-mt-24
        overflow-hidden

        bg-[#f6f8f9]

        py-16

        sm:scroll-mt-28
        sm:py-20
        lg:py-20
      "
    >
      <EngineeringGrid />

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
            HEADER
        ============================================================ */}

        <div
          className="
            grid
            gap-7

            pt-10

            lg:grid-cols-[0.78fr_1.22fr]
            lg:items-end
            lg:gap-16
            lg:pt-12
          "
        >
          <div>
            <p
              className="
                mb-3

                text-[13px]
                font-black

                text-[#167394]
              "
            >
              ریسک‌های کلان اقتصادی
            </p>

            <h2
              id="weekly-outlook-macro-risk-title"
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
              چه ریسک‌هایی این هفته{" "}
              <span className="text-[#167394]">باید در تصمیم دیده شوند؟</span>
            </h2>
          </div>

          <p
            className="
              max-w-[620px]

              text-[15px]
              font-medium
              leading-[2]

              text-[#62767d]

              sm:text-[16px]
            "
          >
            تمرکز روی متغیرهایی است که می‌توانند زمینه تصمیم مالی را تغییر دهند؛
            نه پیش‌بینی جهت بازار.
          </p>
        </div>

        {/* ===========================================================
            RISK REGISTER
        ============================================================ */}

        <div
          className="
            mt-10

            border
            border-[#167394]/14

            bg-white

            shadow-[0_22px_60px_rgba(3,55,70,.045)]

            lg:mt-12
          "
        >
          {/* thesis */}

          <div
            className="
              grid
              gap-5

              border-b
              border-[#167394]/10

              px-5
              py-5

              sm:px-6

              lg:grid-cols-[190px_1fr]
              lg:items-center
              lg:gap-8
              lg:px-7
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <div
                className="
                  grid
                  size-9
                  place-items-center

                  border
                  border-[#167394]/12
                "
              >
                <ShieldAlert
                  aria-hidden="true"
                  strokeWidth={1.6}
                  className="
                    size-[16px]

                    text-[#fc8502]
                  "
                />
              </div>

              <span
                className="
                  text-[13px]
                  font-black

                  text-[#31545e]
                "
              >
                برداشت کلیدی
              </span>
            </div>

            <p
              className="
                text-[16px]
                font-black
                leading-8

                text-[#173b45]

                lg:border-r
                lg:border-[#167394]/10
                lg:pr-7

                sm:text-[17px]
              "
            >
              {thesis}
            </p>
          </div>

          {/* risks */}

          <div
            className="
              grid

              lg:grid-cols-4
            "
          >
            {risks.map((risk, index) => (
              <MacroRiskCell
                key={`${risk.type}-${index}`}
                index={index + 1}
                {...risk}
              />
            ))}
          </div>

          {/* footer */}

          <div
            className="
              flex
              items-center
              gap-3

              border-t
              border-[#167394]/10

              bg-[#fafcfc]

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

                text-[#60737a]
              "
            >
              هدف، شناسایی زمینه ریسک است؛ نه ارائه سیگنال یا پیش‌بینی قطعی.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   RISK CELL
============================================================================= */

function MacroRiskCell({
  index,
  type,
  title,
  summary,
}: MacroRiskItem & {
  index: number;
}) {
  const meta = RISK_META[type];
  const Icon = meta.icon;

  return (
    <article
      className="
        group/risk
        relative

        min-h-[220px]

        border-b
        border-[#167394]/[0.09]

        px-5
        py-5

        transition-colors
        duration-200

        hover:bg-[#fafcfc]

        sm:px-6

        lg:border-b-0
        lg:border-l
        lg:last:border-l-0
        lg:border-[#167394]/[0.09]

        lg:px-6
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          gap-4
        "
      >
        <div
          className="
            grid
            size-9
            place-items-center

            border
            border-[#167394]/10
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

              group-hover/risk:text-[#fc8502]
            "
          />
        </div>

        <span
          className="
            text-[11px]
            font-black
            tabular-nums

            text-[#167394]/28
          "
        >
          0{index}
        </span>
      </div>

      <p
        className="
          mt-5

          text-[12px]
          font-black

          text-[#167394]/55
        "
      >
        {meta.label}
      </p>

      <h3
        className="
          mt-1

          text-[17px]
          font-black
          leading-8

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
          leading-7

          text-[#6c7d83]
        "
      >
        {summary}
      </p>

      <span
        aria-hidden="true"
        className="
          absolute
          bottom-0
          right-5

          h-[2px]
          w-0

          bg-[#fc8502]

          transition-[width]
          duration-200

          group-hover/risk:w-10

          sm:right-6
        "
      />
    </article>
  );
}

/* =============================================================================
   BACKGROUND
============================================================================= */

function EngineeringGrid() {
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
          background: "linear-gradient(180deg,#f7f9fa 0%,#ffffff 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.025]
        "
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(22,115,148,.20) 1px,transparent 1px),linear-gradient(to bottom,rgba(22,115,148,.12) 1px,transparent 1px)",
          backgroundSize: "118px 118px",
        }}
      />
    </>
  );
}
