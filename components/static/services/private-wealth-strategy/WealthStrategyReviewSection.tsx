import Link from "next/link";

import {
  ArrowDownLeft,
  Clock3,
  Droplets,
  Landmark,
  ShieldCheck,
  Target,
  type LucideIcon,
} from "lucide-react";

const REVIEW_AREAS = [
  {
    title: "ساختار دارایی‌ها",
    question:
      "دارایی‌ها امروز چگونه در کنار یکدیگر قرار گرفته‌اند و چه نقشی در تصویر کلی ثروت دارند؟",
    icon: Landmark,
  },
  {
    title: "اهداف",
    question: "ثروت قرار است از چه اهداف مالی، شخصی یا خانوادگی پشتیبانی کند؟",
    icon: Target,
  },
  {
    title: "نقدشوندگی",
    question: "چه میزان دسترسی و انعطاف مالی برای تصمیم‌های پیش رو لازم است؟",
    icon: Droplets,
  },
  {
    title: "ریسک",
    question:
      "کدام بخش‌های ساختار می‌توانند در برابر تغییر شرایط آسیب‌پذیرتر باشند؟",
    icon: ShieldCheck,
  },
  {
    title: "افق تصمیم",
    question:
      "تصمیم‌های امروز چگونه با نیازها و جهت بلندمدت ثروت هماهنگ می‌شوند؟",
    icon: Clock3,
  },
] as const;

export function WealthStrategyReviewSection() {
  return (
    <section
      id="wealth-strategy-review"
      dir="rtl"
      aria-labelledby="wealth-strategy-review-title"
      className="
        relative isolate
        scroll-mt-24 overflow-hidden
        bg-[#032f3f] text-white
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
        <div
          className="
            grid gap-12
            lg:grid-cols-[0.82fr_1.18fr]
            lg:items-start
            lg:gap-16
            xl:gap-20
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
                  text-[10px] font-black text-white/62
                  sm:text-[11px]
                "
              >
                چه چیزهایی بررسی می‌شود؟
              </span>
            </div>

            <h2
              id="wealth-strategy-review-title"
              className="
                max-w-[720px]

                text-[31px]
                font-black
                leading-[1.65]
                tracking-[-0.045em]

                text-white

                sm:text-[38px]

                lg:text-[45px]
                lg:leading-[1.55]

                xl:text-[50px]
              "
            >
              برای دیدن تصویر کامل‌تر،
              <br />
              باید چند بخش را{" "}
              <span className="text-brand-accent">کنار هم دید.</span>
            </h2>

            <p
              className="
                mt-6 max-w-[580px]

                text-[13px]
                font-medium
                leading-[2.2]

                text-white/48

                sm:text-[14px]
              "
            >
              بررسی فقط بر ارزش یا تعداد دارایی‌ها متمرکز نیست؛ نقش هر بخش در
              نسبت با اهداف، نقدشوندگی، ریسک و افق تصمیم اهمیت دارد.
            </p>

            {/* quiet statement */}

            <div
              className="
                relative
                mt-9

                border-r border-white/12
                pr-5
              "
            >
              <span
                aria-hidden="true"
                className="
                  absolute
                  -right-[2px]
                  top-0

                  h-12 w-[3px]

                  bg-brand-accent
                "
              />

              <p
                className="
                  max-w-[500px]

                  text-[13px]
                  font-black
                  leading-[2]

                  text-white/78
                "
              >
                سؤال اصلی این نیست که «چه داریم؟» بلکه این است که «اجزای ثروت
                چگونه با هم کار می‌کنند؟»
              </p>
            </div>
          </div>

          {/* =====================================================
              REVIEW LEDGER
          ====================================================== */}

          <div
            className="
              overflow-hidden

              border
              border-white/12

              bg-white/[0.025] grid lg:grid-cols-1

              shadow-[0_34px_100px_rgba(0,0,0,.15)]
            "
          >
            {REVIEW_AREAS.map((item, index) => (
              <ReviewRow
                key={item.title}
                item={item}
                last={index === REVIEW_AREAS.length - 1}
              />
            ))}

            {/* =================================================
                RESULT
            ================================================== */}

            <div
              className="
                border-t
                border-white/10

                bg-brand-accent

                px-5 py-5

                text-[#073142]

                sm:px-7
                sm:py-6
              "
            >
              <div
                className="
                  flex
                  flex-col
                  gap-3

                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <div>
                  <p
                    className="
                      text-[8px]
                      font-black
                      opacity-60
                    "
                  >
                    هدف بررسی
                  </p>

                  <p
                    className="
                      mt-1

                      text-[15px]
                      font-black
                      leading-[1.9]

                      sm:text-[17px]
                    "
                  >
                    رسیدن به تصویری ساختاریافته‌تر از وضعیت ثروت.
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className="
                    hidden
                    h-[8px] w-[8px]

                    bg-[#073142]

                    sm:block
                  "
                />
              </div>
            </div>
          </div>
        </div>

        {/* =======================================================
            BOTTOM
        ======================================================== */}

        <div
          className="
            mt-9

            flex
            flex-col
            gap-5

            border-t
            border-white/10

            pt-6

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p
            className="
              max-w-[720px]

              text-[9px]
              font-medium
              leading-[2]

              text-white/28

              sm:text-[10px]
            "
          >
            دامنه دقیق بررسی بر اساس ماهیت مسئله، شرایط و نیاز هر پرونده مشخص
            می‌شود.
          </p>

          <Link
            href="#wealth-strategy-view"
            className="
              group/link

              inline-flex
              min-h-11
              shrink-0

              items-center
              gap-3

              text-[10px]
              font-black

              text-[#82cee4]

              outline-none

              transition-colors
              duration-300

              hover:text-brand-accent

              focus-visible:ring-2
              focus-visible:ring-focus/50
            "
          >
            این اجزا چگونه به یک تصویر تبدیل می‌شوند؟
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

/* =============================================================================
   REVIEW ROW
============================================================================= */

function ReviewRow({
  item,
  last,
}: {
  item: {
    title: string;
    question: string;
    icon: LucideIcon;
  };
  last: boolean;
}) {
  const Icon = item.icon;

  return (
    <article
      className={`
        group/row
        relative

        grid gap-4

        px-5 py-6

        transition-colors
        duration-300

        hover:bg-white/[0.045]

        sm:grid-cols-[54px_140px_1fr]
        sm:items-center
        sm:gap-6
        sm:px-7
        sm:py-7

        ${!last ? "border-b border-white/10" : ""}
      `}
    >
      {/* icon */}

      <span
        className="
          flex
          h-11 w-11
          shrink-0

          items-center
          justify-center

          border
          border-[#82cee4]/16

          bg-[#82cee4]/[0.04]

          text-[#82cee4]

          transition-[background-color,border-color,color,transform]
          duration-300

          group-hover/row:-translate-y-0.5
          group-hover/row:border-brand-accent/35
          group-hover/row:bg-brand-accent/[0.07]
          group-hover/row:text-brand-accent
        "
      >
        <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.45} />
      </span>

      {/* title */}

      <h3
        className="
          text-[13px]
          font-black

          text-white/82

          sm:text-[14px]
        "
      >
        {item.title}
      </h3>

      {/* question */}

      <p
        className="
          max-w-[600px]

          text-[10px]
          font-medium
          leading-[2]

          text-white/38

          sm:text-[11px]
        "
      >
        {item.question}
      </p>

      {/* interaction signal */}

      <span
        aria-hidden="true"
        className="
          absolute
          inset-y-0
          right-0

          w-[2px]

          origin-bottom
          scale-y-0

          bg-brand-accent

          transition-transform
          duration-300

          group-hover/row:scale-y-100
        "
      />
    </article>
  );
}

/* =============================================================================
   BACKGROUND
============================================================================= */

function Background() {
  return (
    <>
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
        "
        style={{
          background:
            "radial-gradient(circle at 76% 43%,rgba(22,115,148,.20),transparent 30%),linear-gradient(116deg,#022a38 0%,#033746 52%,#022d3a 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0

          opacity-[0.055]
        "
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,.08) 1px,transparent 1px)",
          backgroundSize: "118px 100%",
        }}
      />

      <span
        aria-hidden="true"
        className="
          absolute
          left-[18%]
          top-0

          h-[7px]
          w-[2px]

          bg-brand-accent
        "
      />
    </>
  );
}
