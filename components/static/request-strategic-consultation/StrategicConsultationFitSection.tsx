import Link from "next/link";

import {
  ArrowLeft,
  ClipboardCheck,
  Focus,
  GitBranch,
  MessageSquareText,
} from "lucide-react";

const FIT_SIGNALS = [
  {
    number: "01",
    icon: Focus,
    title: "موضوع مشخصی برای بررسی دارید",
    description:
      "یک تصمیم، مسئله یا موقعیت مالی وجود دارد که نیازمند بررسی دقیق‌تر است.",
  },
  {
    number: "02",
    icon: GitBranch,
    title: "مسئله بیش از یک عامل دارد",
    description:
      "دامنه، فوریت یا پیچیدگی موضوع باعث می‌شود یک پاسخ ساده کافی نباشد.",
  },
  {
    number: "03",
    icon: MessageSquareText,
    title: "به گفت‌وگوی تخصصی نیاز دارید",
    description:
      "هدف فقط دریافت اطلاعات نیست؛ موضوع باید در یک چارچوب حرفه‌ای بررسی شود.",
  },
] as const;

export function StrategicConsultationFitSection() {
  return (
    <section
      id="consultation-fit"
      dir="rtl"
      aria-labelledby="consultation-fit-title"
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
            MAIN
        ============================================================ */}

        <div
          className="
            grid
            gap-10

            pt-10

            lg:grid-cols-[0.78fr_1.22fr]
            lg:items-start
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
                قبل از ثبت درخواست
              </p>
            </div>

            <h2
              id="consultation-fit-title"
              className="
                max-w-[650px]

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
              آیا مشاوره راهبردی،{" "}
              <span className="text-[#167394]">مسیر مناسب موضوع شماست؟</span>
            </h2>

            <p
              className="
                mt-5
                max-w-[550px]

                text-[15px]
                font-medium
                leading-[2]

                text-[#687a80]
              "
            >
              این مسیر زمانی معنا پیدا می‌کند که موضوع، پیش از تصمیم به بررسی
              دقیق‌تر دامنه و پیچیدگی نیاز داشته باشد.
            </p>

            {/* -------------------------------------------------------
                ALTERNATIVE PATH
            -------------------------------------------------------- */}

            <div
              className="
                mt-8

                border-r-2
                border-[#fc8502]

                pr-5
              "
            >
              <div
                className="
                  flex
                  items-start
                  gap-3
                "
              >
                <ClipboardCheck
                  aria-hidden="true"
                  strokeWidth={1.6}
                  className="
                    mt-[4px]
                    size-[17px]
                    shrink-0

                    text-[#167394]
                  "
                />

                <div>
                  <p
                    className="
                      text-[14px]
                      font-black
                      leading-7

                      text-[#31545e]
                    "
                  >
                    هنوز خود مسئله کاملاً روشن نیست؟
                  </p>

                  <p
                    className="
                      mt-1

                      text-[13px]
                      font-medium
                      leading-6

                      text-[#718187]
                    "
                  >
                    ارزیابی اولیه تصمیم مالی می‌تواند نقطه شروع مناسب‌تری باشد.
                  </p>

                  <Link
                    href="/financial-decision-assessment"
                    className="
                      group/link

                      mt-3
                      inline-flex
                      items-center
                      gap-2

                      text-[13px]
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
                    شروع ارزیابی اولیه
                    <ArrowLeft
                      aria-hidden="true"
                      strokeWidth={1.7}
                      className="
                        size-[14px]

                        transition-transform
                        duration-200

                        group-hover/link:-translate-x-1
                      "
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================
              FIT REGISTER
          ========================================================== */}

          <div
            className="
              border
              border-[#167394]/13

              bg-white

              shadow-[0_24px_65px_rgba(3,55,70,.045)]
            "
          >
            {/* HEADER */}

            <div
              className="
                flex
                items-center
                justify-between
                gap-5

                border-b
                border-[#167394]/10

                px-5
                py-5

                sm:px-6
                lg:px-7
              "
            >
              <div>
                <p
                  className="
                    text-[12px]
                    font-black
                    text-[#167394]/45
                  "
                >
                  نشانه‌های اولیه تناسب
                </p>

                <p
                  className="
                    mt-1

                    text-[16px]
                    font-black
                    leading-7

                    text-[#173b45]
                  "
                >
                  اگر این شرایط به موضوع شما نزدیک است
                </p>
              </div>

              <span
                aria-hidden="true"
                className="
                  h-[9px]
                  w-[9px]
                  bg-[#fc8502]
                "
              />
            </div>

            {/* ROWS */}

            <div>
              {FIT_SIGNALS.map((item) => (
                <FitRow key={item.number} {...item} />
              ))}
            </div>

            {/* FOOT */}

            <div
              className="
                relative

                border-t
                border-[#167394]/10

                bg-[#f9fbfb]

                px-5
                py-4

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

              <p
                className="
                  text-[13px]
                  font-medium
                  leading-6

                  text-[#65777d]
                "
              >
                تناسب نهایی پس از بررسی اولیه درخواست مشخص می‌شود.
              </p>
            </div>
          </div>
        </div>

        {/* ===========================================================
            NEXT
        ============================================================ */}

        <div
          className="
            mt-10

            flex
            justify-end

            border-t
            border-[#167394]/10

            pt-5
          "
        >
          <Link
            href="#consultation-preparation"
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
            "
          >
            بعدی: چه اطلاعاتی برای درخواست لازم است؟
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
   FIT ROW
============================================================================= */

function FitRow({
  number,
  icon: Icon,
  title,
  description,
}: (typeof FIT_SIGNALS)[number]) {
  return (
    <article
      className="
        group/fit
        relative

        grid
        gap-4

        border-b
        border-[#167394]/[0.08]

        px-5
        py-6

        last:border-b-0

        transition-colors
        duration-200

        hover:bg-[#fafcfc]

        sm:px-6

        lg:grid-cols-[58px_190px_1fr]
        lg:items-center
        lg:gap-6
        lg:px-7
      "
    >
      {/* NUMBER */}

      <span
        className="
          text-[13px]
          font-black
          tabular-nums

          text-[#167394]/28
        "
      >
        {number}
      </span>

      {/* TITLE */}

      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        <span
          aria-hidden="true"
          className="
            grid
            size-9
            shrink-0
            place-items-center

            border
            border-[#167394]/10

            text-[#167394]

            transition-[border-color,color]
            duration-200

            group-hover/fit:border-[#fc8502]/35
            group-hover/fit:text-[#fc8502]
          "
        >
          <Icon strokeWidth={1.6} className="size-[16px]" />
        </span>

        <h3
          className="
            text-[15px]
            font-black
            leading-7

            text-[#173b45]
          "
        >
          {title}
        </h3>
      </div>

      {/* DESCRIPTION */}

      <p
        className="
          text-[14px]
          font-medium
          leading-7

          text-[#718187]

          lg:border-r
          lg:border-[#167394]/[0.08]
          lg:pr-6
        "
      >
        {description}
      </p>

      {/* HOVER RAIL */}

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

          group-hover/fit:scale-y-100
        "
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
            "radial-gradient(circle at 86% 22%,rgba(22,115,148,.045),transparent 26%),linear-gradient(180deg,#f7f9f9 0%,#ffffff 100%)",
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
