import Link from "next/link";

import { ArrowLeft, CornerDownLeft } from "lucide-react";

const PROCESS_STAGES = [
  {
    number: "01",
    label: "ارزیابی اولیه",
    description: "شناخت مسئله و بررسی اولیه تناسب درخواست.",
  },
  {
    number: "02",
    label: "دامنه و تناسب",
    description: "بررسی فوریت، پیچیدگی و محدوده موضوع.",
  },
  {
    number: "03",
    label: "گفت‌وگوی تخصصی",
    description: "ورود به جلسه تخصصی پس از روشن شدن دامنه مسئله.",
    active: true,
  },
  {
    number: "04",
    label: "بررسی حرفه‌ای",
    description: "تحلیل دقیق‌تر موضوع و عوامل اثرگذار بر تصمیم.",
  },
  {
    number: "05",
    label: "چارچوب تصمیم",
    description: "ارائه تصویر، گزینه‌ها و مسیرهای قابل بررسی.",
  },
  {
    number: "06",
    label: "پیگیری و بازبینی",
    description: "ادامه مسیر در صورت توافق و نیاز به بازبینی.",
  },
] as const;

export function StrategicConsultationProcessSection() {
  return (
    <section
      id="consultation-process"
      dir="rtl"
      aria-labelledby="consultation-process-title"
      className="
        relative
        isolate
        scroll-mt-24
        overflow-hidden

        bg-[#f7f9f9]

        py-16

        sm:scroll-mt-28
        sm:py-20

        lg:py-20
      "
    >
      <SectionBackground />

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
            INTRO
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
                  w-9
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
                از درخواست تا تصمیم
              </p>
            </div>

            <h2
              id="consultation-process-title"
              className="
                max-w-[700px]

                text-[30px]
                font-black
                leading-[1.72]
                tracking-[-0.045em]

                text-[#10242c]

                sm:text-[36px]

                lg:text-[42px]
                lg:leading-[1.62]
              "
            >
              مشاوره، یک جلسه منفرد نیست؛{" "}
              <span className="text-[#167394]">بخشی از یک مسیر بررسی است.</span>
            </h2>
          </div>

          <p
            className="
              max-w-[610px]

              text-[15px]
              font-medium
              leading-[2]

              text-[#687a80]

              sm:text-[16px]
            "
          >
            هر مرحله برای روشن‌تر شدن مسئله و مشخص شدن مسیر بعدی طراحی شده است؛
            بدون پرش مستقیم از مسئله به یک پاسخ آماده.
          </p>
        </div>

        {/* ===========================================================
            PROCESS LEDGER
        ============================================================ */}

        <div
          className="
            relative
            mt-10

            border
            border-[#167394]/13

            bg-white

            shadow-[0_24px_70px_rgba(3,55,70,.045)]

            lg:mt-12
          "
        >
          {/* ---------------------------------------------------------
              LEDGER HEADER
          ---------------------------------------------------------- */}

          <div
            className="
              grid
              gap-3

              border-b
              border-[#167394]/10

              px-5
              py-5

              sm:px-6

              lg:grid-cols-[100px_230px_1fr]
              lg:items-center
              lg:gap-7
              lg:px-7
            "
          >
            <p
              className="
                text-[12px]
                font-black
                text-[#167394]/40
              "
            >
              مرحله
            </p>

            <p
              className="
                text-[12px]
                font-black
                text-[#167394]/40
              "
            >
              وضعیت پرونده
            </p>

            <p
              className="
                text-[12px]
                font-black
                text-[#167394]/40

                lg:border-r
                lg:border-[#167394]/10
                lg:pr-7
              "
            >
              هدف مرحله
            </p>
          </div>

          {/* ---------------------------------------------------------
              STAGES
          ---------------------------------------------------------- */}

          <div>
            {PROCESS_STAGES.map((stage) => (
              <ProcessRow key={stage.number} {...stage} />
            ))}
          </div>

          {/* ---------------------------------------------------------
              FOOT
          ---------------------------------------------------------- */}

          <div
            className="
              relative

              border-t
              border-[#167394]/10

              bg-[#f9fbfb]

              px-5
              py-5

              sm:px-6
              lg:px-7
            "
          >
            <span
              aria-hidden="true"
              className="
                absolute
                inset-y-0
                right-0

                w-[3px]

                bg-[#fc8502]
              "
            />

            <div
              className="
                flex
                items-start
                gap-3
              "
            >
              <CornerDownLeft
                aria-hidden="true"
                strokeWidth={1.6}
                className="
                  mt-[4px]
                  size-[16px]
                  shrink-0
                  text-[#167394]/60
                "
              />

              <p
                className="
                  max-w-[900px]

                  text-[14px]
                  font-medium
                  leading-7

                  text-[#65777d]
                "
              >
                مرحله مشاوره زمانی وارد مسیر می‌شود که موضوع، دامنه و تناسب
                اولیه آن به‌اندازه کافی روشن شده باشد.
              </p>
            </div>
          </div>
        </div>

        {/* ===========================================================
            NEXT
        ============================================================ */}

        <div
          className="
            mt-8

            flex
            justify-end
          "
        >
          <Link
            href="#consultation-request"
            className="
              group/next

              inline-flex
              items-center
              gap-3

              text-[13px]
              font-black

              text-[#31545e]

              transition-colors
              duration-200

              hover:text-[#167394]

              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-[#fc8502]
            "
          >
            بعدی: ثبت درخواست مشاوره
            <ArrowLeft
              aria-hidden="true"
              strokeWidth={1.7}
              className="
                size-[15px]
                text-[#fc8502]

                transition-transform
                duration-200

                group-hover/next:-translate-x-1
              "
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   PROCESS ROW
============================================================================= */

function ProcessRow({
  number,
  label,
  description,
  active = false,
}: (typeof PROCESS_STAGES)[number] & {
  active?: boolean;
}) {
  return (
    <article
      className={`
        group/row
        relative

        grid
        gap-4

        border-b
        border-[#167394]/[0.075]

        px-5
        py-5

        last:border-b-0

        transition-colors
        duration-200

        sm:px-6

        lg:grid-cols-[100px_230px_1fr]
        lg:items-center
        lg:gap-7
        lg:px-7

        ${active ? "bg-[#167394]/[0.035]" : "hover:bg-[#167394]/[0.018]"}
      `}
    >
      {/* =========================================================
          NUMBER / STATE
      ========================================================== */}

      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        <span
          className={`
            text-[13px]
            font-black
            tabular-nums

            ${active ? "text-[#fc8502]" : "text-[#167394]/30"}
          `}
        >
          {number}
        </span>

        <span
          aria-hidden="true"
          className={`
            h-[11px]
            w-[11px]
            shrink-0

            ${active ? "bg-[#fc8502]" : "border border-[#167394]/25"}
          `}
        />
      </div>

      {/* =========================================================
          LABEL
      ========================================================== */}

      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        <h3
          className={`
            text-[15px]
            font-black
            leading-7

            ${active ? "text-[#167394]" : "text-[#173b45]"}
          `}
        >
          {label}
        </h3>

        {active ? (
          <span
            className="
              border
              border-[#fc8502]/25

              bg-[#fc8502]/[0.055]

              px-2
              py-1

              text-[12px]
              font-black

              text-[#d96f00]
            "
          >
            مرحله این صفحه
          </span>
        ) : null}
      </div>

      {/* =========================================================
          DESCRIPTION
      ========================================================== */}

      <p
        className="
          text-[14px]
          font-medium
          leading-7

          text-[#718187]

          lg:border-r
          lg:border-[#167394]/[0.08]
          lg:pr-7
        "
      >
        {description}
      </p>

      {/* =========================================================
          ACTIVE RAIL
      ========================================================== */}

      <span
        aria-hidden="true"
        className={`
          absolute
          inset-y-0
          right-0

          w-[3px]

          transition-transform
          duration-200

          ${
            active
              ? "scale-y-100 bg-[#fc8502]"
              : "origin-bottom scale-y-0 bg-[#167394] group-hover/row:scale-y-100"
          }
        `}
      />
    </article>
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
          background:
            "radial-gradient(circle at 13% 38%,rgba(22,115,148,.045),transparent 27%),linear-gradient(180deg,#f7f9f9 0%,#ffffff 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.022]
        "
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(22,115,148,.20) 1px,transparent 1px)",
          backgroundSize: "118px 100%",
        }}
      />
    </>
  );
}
