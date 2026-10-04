import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

type CaseStage = {
  title: string;
  description: string;
};

type CaseStudy = {
  index: string;
  title: string;
  english: string;
  href: string;
  featured?: boolean;
  stages: CaseStage[];
};

const CASES: CaseStudy[] = [
  {
    index: "01",
    title: "پرونده ثروت خصوصی",
    english: "WEALTH",
    href: "/case-studies/private-wealth",
    stages: [
      {
        title: "مسئله اولیه",
        description: "تعریف دقیق مسئله و اهداف",
      },
      {
        title: "محدودیت‌ها",
        description: "بررسی محدودیت‌های اثرگذار",
      },
      {
        title: "ریسک‌ها",
        description: "شناسایی و ارزیابی ریسک‌های کلیدی",
      },
      {
        title: "سناریوها",
        description: "تحلیل گزینه‌ها و مسیرهای ممکن",
      },
      {
        title: "مسیر تصمیم",
        description: "طراحی مسیر تصمیم‌گیری",
      },
    ],
  },
  {
    index: "02",
    title: "پرونده پرتفوی",
    english: "PORTFOLIO",
    href: "/case-studies/portfolio",
    featured: true,
    stages: [
      {
        title: "مسئله اولیه",
        description: "بررسی پراکندگی دارایی‌ها",
      },
      {
        title: "ساختار و تمرکز",
        description: "تحلیل ساختار و تمرکز دارایی‌ها",
      },
      {
        title: "ریسک‌ها",
        description: "ارزیابی ریسک‌های اصلی",
      },
      {
        title: "سناریوها",
        description: "بررسی مسیرها و سناریوهای ممکن",
      },
      {
        title: "مسیر تصمیم",
        description: "طراحی مسیر تصمیم‌گیری",
      },
    ],
  },
  {
    index: "03",
    title: "پرونده شرکت / هلدینگ",
    english: "COMPANY / HOLDING",
    href: "/case-studies/company-holding",
    stages: [
      {
        title: "مسئله اولیه",
        description: "تعریف مسئله و ساختار موجود",
      },
      {
        title: "ساختار سرمایه",
        description: "بررسی سرمایه و منابع مالی",
      },
      {
        title: "نقدینگی",
        description: "تحلیل وضعیت نقدینگی",
      },
      {
        title: "ریسک‌ها",
        description: "شناسایی ریسک‌های ساختاری",
      },
      {
        title: "مسیر تصمیم",
        description: "تدوین مسیر تصمیم‌گیری",
      },
    ],
  },
];

export function CaseStudiesSection() {
  return (
    <section
      dir="rtl"
      aria-labelledby="case-studies-title"
      className="
        relative
        isolate
        overflow-hidden
        border-y
        border-line
        bg-page
      "
    >
      <SectionBackground />

      <div
        className="
          relative
          z-10
          dnh-site-shell
          mx-auto
          w-full
          max-w-[1536px]

          px-5
          py-16

          sm:px-8
          sm:py-20

          lg:px-12
          lg:py-24

          xl:px-16
          2xl:px-20
        "
      >
        {/* ==========================================================
            TOP
        ========================================================== */}

        <div
          className="
            grid
            gap-12

            lg:grid-cols-[minmax(0,0.9fr)_minmax(460px,1.1fr)]
            lg:items-center
            lg:gap-16
          "
        >
          {/* Right — Intro */}
          <header
            className="
              order-1
              text-right

              lg:col-start-1
            "
          >
            <div
              className="
                mb-5
                flex
                items-center
                gap-3
              "
            >
              <span
                aria-hidden="true"
                className="
                  h-px
                  w-10
                  bg-brand-accent
                "
              />

              <span
                className="
                  text-[10px]
                  font-black
                  tracking-[0.05em]
                  text-brand-primary

                  sm:text-[11px]
                "
              >
                پرونده‌های تصمیم
              </span>
            </div>

            <h2
              id="case-studies-title"
              className="
                max-w-[720px]

                text-[31px]
                font-black
                leading-[1.55]
                tracking-[-0.04em]

                text-ink

                sm:text-[38px]

                lg:text-[44px]

                xl:text-[50px]
              "
            >
              اعتماد،
              <br />
              از نتیجه‌گیری سریع ساخته نمی‌شود؛
              <br />
              <span className="text-brand-primary">
                از مسیر تحلیل ساخته می‌شود.
              </span>
            </h2>

            <p
              className="
                mt-5
                max-w-[680px]

                text-[13px]
                font-medium
                leading-[2.15]

                text-ink-muted

                sm:text-[14px]

                lg:text-[15px]
              "
            >
              در DNH هر تصمیم مهم، از یک فرآیند ساختاریافته عبور می‌کند؛ از
              شناسایی مسئله و محدودیت‌ها تا بررسی ریسک‌ها، سناریوها و طراحی مسیر
              تصمیم.
            </p>
          </header>

          {/* Left — architectural visual */}
          <div
            className="
              order-2
              relative

              h-[220px]

              lg:col-start-2
              lg:row-start-1
              lg:h-[260px]
            "
          >
            <HeaderArchitecture />
          </div>
        </div>

        {/* ==========================================================
            CASE LEDGER
        ========================================================== */}

        <div
          className="
            mt-12

            border
            border-line

            bg-white/50

            shadow-[0_22px_60px_color-mix(in_srgb,var(--dnh-primary)_5%,transparent)]

            lg:mt-14
          "
        >
          {CASES.map((item, index) => (
            <CaseRow
              key={item.index}
              item={item}
              isLast={index === CASES.length - 1}
            />
          ))}
        </div>

        {/* ==========================================================
            FOOTER
        ========================================================== */}

        <div
          className="
            mt-6

            flex
            flex-col
            gap-6

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <ActionButton
            href="/case-studies"
            variant="primary"
            size="md"
            icon={ArrowLeft}
            className="
              w-full

              sm:w-auto
              sm:min-w-[230px]
            "
          >
            مشاهده همه پرونده‌های تصمیم
          </ActionButton>

          <div
            aria-hidden="true"
            dir="ltr"
            className="
              hidden
              items-center
              gap-4

              lg:flex
            "
          >
            <span className="h-px w-14 bg-line-strong/30" />

            <span
              className="
                text-[8px]
                font-bold
                uppercase
                tracking-[0.28em]
                text-brand-primary/45
              "
            >
              Evidence
              <br />
              Led by Method
            </span>

            <span className="h-2 w-1 bg-brand-accent" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   CASE ROW
============================================================================= */

function CaseRow({ item, isLast }: { item: CaseStudy; isLast: boolean }) {
  return (
    <article
      className={`
        group/case
        relative

        transition-[background-color,border-color,box-shadow]
        duration-300

        ${
          item.featured
            ? `
              bg-[color-mix(in_srgb,var(--dnh-primary)_5%,white)]
            `
            : `
              bg-white/55
              hover:bg-[color-mix(in_srgb,var(--dnh-primary)_2.5%,white)]
            `
        }

        ${!isLast ? "border-b border-line" : ""}
      `}
    >
      {item.featured ? (
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
      ) : null}

      {/* Desktop */}
      <div
        className="
          hidden

          min-h-[130px]

          grid-cols-[220px_minmax(0,1fr)_145px]
          items-stretch

          md:grid
        "
      >
        {/* Case identity */}
        <div
          className="
            flex
            items-center
            gap-4

            border-l
            border-line

            px-5
            py-5
          "
        >
          <span
            dir="ltr"
            className={`
              shrink-0

              text-[30px]
              font-light
              leading-none
              tracking-[-0.06em]

              ${item.featured ? "text-brand-accent" : "text-brand-primary/28"}
            `}
          >
            {item.index}
          </span>

          <div className="min-w-0">
           

            <h3
              className="
                mt-1

                text-[15px]
                font-black
                leading-7

                text-ink
text-nowrap
                lg:text-[14px]
              "
            >
              {item.title}
            </h3>

         
          </div>
        </div>

        {/* Stages */}
        <div
          className="
            relative
            grid
            grid-cols-5
            items-center

            px-3
            py-5

            lg:px-6
          "
        >
          {/* horizontal path */}
          <span
            aria-hidden="true"
            className="
              absolute
              left-[9%]
              right-[9%]
              top-[39px]

              h-px

              bg-line
            "
          />

          {item.stages.map((stage, stageIndex) => (
            <CaseStageItem
              key={`${item.index}-${stage.title}`}
              stage={stage}
              active={Boolean(item.featured)}
              isLast={stageIndex === item.stages.length - 1}
            />
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div
        className="
          px-5
          py-6

          md:hidden
        "
      >
        <div
          className="
            flex
            items-start
            justify-between
            gap-5
          "
        >
          <div>
            <span
              dir="ltr"
              className="
                text-[8px]
                font-black
                uppercase
                tracking-[0.18em]

                text-brand-primary/50
              "
            >
              CASE {item.index}
            </span>

            <h3
              className="
                mt-2

                text-[19px]
                font-black
                leading-8

                text-ink
              "
            >
              {item.title}
            </h3>

            <span
              dir="ltr"
              className="
                mt-1
                block

                text-[8px]
                font-bold
                tracking-[0.14em]

                text-brand-primary/45
              "
            >
              {item.english}
            </span>
          </div>

          <span
            dir="ltr"
            aria-hidden="true"
            className={`
              text-[46px]
              font-light
              leading-none

              ${item.featured ? "text-brand-accent" : "text-brand-primary/22"}
            `}
          >
            {item.index}
          </span>
        </div>

        {/* Mobile process */}
        <div
          className="
            relative

            mt-7
            pr-5
          "
        >
          <span
            aria-hidden="true"
            className="
              absolute
              bottom-4
              right-[4px]
              top-4

              w-px
              bg-line
            "
          />

          <div className="space-y-5">
            {item.stages.map((stage) => (
              <div
                key={stage.title}
                className="
                  relative
                  pr-4
                "
              >
                <span
                  aria-hidden="true"
                  className={`
                    absolute
                    right-[-20px]
                    top-[7px]

                    h-2
                    w-2

                    ${item.featured ? "bg-brand-accent" : "bg-brand-primary/45"}
                  `}
                />

                <h4
                  className="
                    text-[12px]
                    font-black
                    text-ink
                  "
                >
                  {stage.title}
                </h4>

                <p
                  className="
                    mt-1

                    text-[11px]
                    font-medium
                    leading-[1.9]

                    text-ink-muted
                  "
                >
                  {stage.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      
      </div>
    </article>
  );
}

/* =============================================================================
   CASE STAGE
============================================================================= */

function CaseStageItem({
  stage,
  active,
}: {
  stage: CaseStage;
  active: boolean;
  isLast: boolean;
}) {
  return (
    <div
      className="
        relative
        z-10

        px-2

        text-center
      "
    >
      <span
        aria-hidden="true"
        className={`
          mx-auto
          block

          h-[8px]
          w-[8px]

          border
          border-page

          shadow-[0_0_0_1px_color-mix(in_srgb,var(--dnh-primary)_18%,transparent)]

          ${active ? "bg-brand-accent" : "bg-brand-primary/65"}
        `}
      />

      <h4
        className="
          mt-3

          text-[9px]
          font-black
          leading-5

          text-ink

          lg:text-[10px]
        "
      >
        {stage.title}
      </h4>

      <p
        className="
          mx-auto
          mt-1
          max-w-[110px]

          text-[8px]
          font-medium
          leading-[1.7]

          text-ink-muted

          lg:text-[9px]
        "
      >
        {stage.description}
      </p>
    </div>
  );
}

/* =============================================================================
   MINI VISUAL
============================================================================= */

function CaseMiniVisual({ index, active }: { index: string; active: boolean }) {
  const heights =
    index === "01"
      ? [28, 50, 38]
      : index === "02"
        ? [22, 54, 42, 28]
        : [52, 42, 62];

  return (
    <div
      aria-hidden="true"
      className="
        flex
        h-[72px]
        w-[72px]
        shrink-0
        items-end
        justify-center
        gap-[3px]

        overflow-hidden
      "
    >
      {heights.map((height, index) => (
        <span
          key={index}
          className={`
            block
            w-3

            border
            border-brand-primary/10

            ${active ? "bg-brand-primary/12" : "bg-brand-primary/[0.06]"}
          `}
          style={{
            height,
            transform: `translateY(${index * 3}px)`,
          }}
        />
      ))}

      {active ? (
        <span
          className="
            absolute
            bottom-[43%]
            right-[42%]

            h-1.5
            w-1.5

            bg-brand-accent
          "
        />
      ) : null}
    </div>
  );
}

/* =============================================================================
   HEADER ARCHITECTURE
============================================================================= */

function HeaderArchitecture() {
  return (
    <div
      aria-hidden="true"
      className="
        absolute
        inset-0
        overflow-hidden
      "
    >
      {/* Building planes */}
      <div
        className="
          absolute
          bottom-0
          left-[4%]

          h-[45%]
          w-[19%]

          border
          border-brand-primary/15

          bg-brand-primary/[0.025]
        "
      />

      <div
        className="
          absolute
          bottom-0
          left-[25%]

          h-[74%]
          w-[23%]

          border
          border-brand-primary/20

          bg-[linear-gradient(180deg,color-mix(in_srgb,var(--dnh-primary)_8%,transparent),color-mix(in_srgb,var(--dnh-primary)_2%,transparent))]
        "
      />

      <div
        className="
          absolute
          bottom-0
          left-[50%]

          h-[54%]
          w-[19%]

          border
          border-brand-primary/15

          bg-brand-primary/[0.03]
        "
      />

      <div
        className="
          absolute
          bottom-0
          left-[71%]

          h-[34%]
          w-[16%]

          border
          border-brand-primary/10

          bg-brand-primary/[0.025]
        "
      />

      {/* perspective */}
      <svg
        viewBox="0 0 720 260"
        preserveAspectRatio="none"
        className="
          absolute
          inset-0
          h-full
          w-full
        "
        fill="none"
      >
        <path
          d="M0 235L720 235"
          stroke="var(--dnh-primary)"
          strokeOpacity="0.13"
        />

        <path
          d="M70 235L318 18"
          stroke="var(--dnh-primary)"
          strokeOpacity="0.15"
        />

        <path
          d="M240 235L318 18"
          stroke="var(--dnh-primary)"
          strokeOpacity="0.1"
        />

        <path
          d="M318 18L660 235"
          stroke="var(--dnh-primary)"
          strokeOpacity="0.09"
        />

        <path
          d="M318 18V235"
          stroke="var(--dnh-primary)"
          strokeOpacity="0.14"
        />

        <path d="M92 72H670" stroke="var(--dnh-primary)" strokeOpacity="0.05" />

        <path
          d="M48 136H700"
          stroke="var(--dnh-primary)"
          strokeOpacity="0.05"
        />
      </svg>

      {/* markers */}
      <span
        className="
          absolute
          left-[25%]
          top-[25%]

          h-2
          w-2
          bg-brand-accent
        "
      />

      <span
        className="
          absolute
          left-[52%]
          top-[43%]

          h-2
          w-2
          bg-brand-primary
        "
      />

      <span
        className="
          absolute
          bottom-[18%]
          left-[5%]

          h-10
          w-px
          bg-brand-accent
        "
      />

      <div
        dir="ltr"
        className="
          absolute
          left-0
          top-2

          text-left

          text-[7px]
          font-bold
          uppercase
          tracking-[0.28em]

          text-brand-primary/38
        "
      >
        Decisions
        <br />
        Through
        <br />
        Structure
      </div>
    </div>
  );
}

/* =============================================================================
   BACKGROUND
============================================================================= */

function SectionBackground() {
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
          background: `
            linear-gradient(
              180deg,
              #ffffff 0%,
              color-mix(in srgb, var(--dnh-primary) 2%, white) 48%,
              #ffffff 100%
            )
          `,
        }}
      />

      {/* Grid */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.42]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              color-mix(in srgb, var(--dnh-primary) 5%, transparent) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              color-mix(in srgb, var(--dnh-primary) 4%, transparent) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "64px 64px",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,.7), transparent 75%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,.7), transparent 75%)",
        }}
      />

      {/* Top axis */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0

          h-px

          bg-gradient-to-r
          from-transparent
          via-brand-primary/35
          to-transparent
        "
      />
    </>
  );
}
