import Link from "next/link";

import {
  ArrowDownLeft,
  ArrowLeft,
  Landmark,
  UsersRound,
  Waypoints,
  type LucideIcon,
} from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   Fit states
============================================================================= */

const FIT_ITEMS = [
  {
    title: "افراد و صاحبان سرمایه",
    description:
      "دارایی دارید، اما تصویر واحدی از وضعیت ثروت، نقدشوندگی، ریسک و اولویت‌های مالی خود ندارید.",
    icon: Landmark,
  },
  {
    title: "خانواده‌ها",
    description:
      "اهداف مالی و شخصی متعددی دارید و لازم است دارایی‌ها، نقدینگی و ریسک در کنار یکدیگر دیده شوند.",
    icon: UsersRound,
  },
  {
    title: "ثروت با اجزای متعدد",
    description:
      "می‌خواهید تصمیم‌ها را فراتر از یک دارایی یا سرمایه‌گذاری منفرد و در سطح کل ساختار ثروت بررسی کنید.",
    icon: Waypoints,
  },
] as const;

/* =============================================================================
   SECTION — Server Component
============================================================================= */

export function WealthStrategyFitSection() {
  return (
    <section
      id="wealth-strategy-fit"
      dir="rtl"
      aria-labelledby="wealth-strategy-fit-title"
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
            HEADER
        ======================================================== */}

        <div
          className="
            grid gap-8

            lg:grid-cols-[0.82fr_1.18fr]
            lg:items-end
            lg:gap-16
          "
        >
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-10 bg-brand-accent" />

              <span
                className="
                  text-[10px]
                  font-black
                  text-brand-primary

                  sm:text-[11px]
                "
              >
                این خدمت برای چه کسانی مناسب است؟
              </span>
            </div>

            <h2
              id="wealth-strategy-fit-title"
              className="
                max-w-[760px]

                text-[31px]
                font-black
                leading-[1.65]
                tracking-[-0.045em]

                text-ink

                sm:text-[38px]

                lg:text-[45px]
                lg:leading-[1.55]

                xl:text-[50px]
              "
            >
              وقتی ثروت دارید،
              <br />
              اما هنوز{" "}
              <span className="text-brand-primary">
                تصویر کاملی از آن ندارید.
              </span>
            </h2>
          </div>

          <div className="lg:pb-1">
            <p
              className="
                max-w-[610px]

                text-[13px]
                font-medium
                leading-[2.15]

                text-ink-muted

                sm:text-[14px]
                lg:text-[15px]
              "
            >
              این خدمت زمانی معنا پیدا می‌کند که اجزای ثروت وجود دارند، اما
              ارتباط میان دارایی‌ها، اهداف، نقدشوندگی و ریسک هنوز به‌صورت
              یکپارچه دیده نشده است.
            </p>
          </div>
        </div>

        {/* =======================================================
            FIT LEDGER
        ======================================================== */}

        <div
          className="
            mt-12

            border-y
            border-line lg:grid-cols-3 grid

            sm:mt-14
            lg:mt-16
          "
        >
          {FIT_ITEMS.map((item, index) => (
            <FitRow
              key={item.title}
              item={item}
              last={index === FIT_ITEMS.length - 1}
            />
          ))}
        </div>

        {/* =======================================================
            QUICK CONFIRMATION
        ======================================================== */}

        <div
          className="
            mt-8

            grid gap-6

            border-r-[3px]
            border-brand-accent

            bg-surface-soft/55

            px-5 py-6

            sm:px-7

            lg:grid-cols-[1fr_auto]
            lg:items-center
            lg:gap-10
          "
        >
          <div>
            <p
              className="
                text-[9px]
                font-black
                text-brand-accent
              "
            >
              نشانه اصلی
            </p>

            <p
              className="
                mt-2
                max-w-[760px]

                text-[15px]
                font-black
                leading-[1.9]

                text-ink

                sm:text-[17px]
              "
            >
              مسئله، کمبود دارایی نیست؛ نداشتن تصویر منسجم از کل ساختار است.
            </p>
          </div>

          <ActionButton
            href="/financial-decision-assessment"
            variant="primary"
            size="md"
            icon={ArrowLeft}
            className="
              w-full

              bg-brand-primary
              text-white

              shadow-[0_14px_36px_rgba(22,115,148,.13)]

              hover:-translate-y-0.5

              lg:w-auto
              lg:min-w-[245px]
            "
          >
            بررسی تناسب اولیه
          </ActionButton>
        </div>

        {/* =======================================================
            NEXT
        ======================================================== */}

        <div
          className="
            mt-7

            flex
            flex-col
            gap-4

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
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
            اگر مسئله شما بیشتر به ساختار یک پرتفوی مشخص مربوط است، مسیر هوشمندی
            پرتفوی نیز می‌تواند مرتبط باشد.
          </p>

          <Link
            href="#wealth-strategy-problem"
            className="
              group/link

              inline-flex
              min-h-11
              shrink-0

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
            مسئله اصلی چیست؟
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
   FIT ROW
============================================================================= */

function FitRow({
  item,
  last,
}: {
  item: {
    title: string;
    description: string;
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

        grid gap-5 

        px-5 py-6

        transition-colors duration-300

        hover:bg-surface-soft/45

        sm:px-7
        sm:py-7

        lg:grid-cols-2
        lg:items-center
        lg:gap-9
        lg:px-8
        lg:py-8

        ${!last ? "border-b border-line" : ""}
      `}
    >
      {" "}
      {/* Title */}
      <h3
        className="
          text-[16px]
          font-black
          leading-[1.8]

          text-ink

          sm:text-[18px]
        "
      >
        {item.title}
      </h3>
      {/* Icon */}
      <span
        className="
          lg:flex lg:mr-auto hidden
          h-13 w-13

          items-center
          justify-center

          border
          border-brand-primary/14

          bg-brand-primary/[0.035]

          text-brand-primary

          transition-[background-color,border-color,color,transform]
          duration-300

          group-hover/row:-translate-y-0.5
          group-hover/row:border-brand-primary
          group-hover/row:bg-brand-primary
          group-hover/row:text-white
        "
      >
        <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.45} />
      </span>
      {/* Description */}
      <p
        className="
          min-w-[380px]

          text-[11px]
          font-medium
          leading-[2.05]

          text-ink-muted

          sm:text-[12px]
        "
      >
        {item.description}
      </p>
      {/* Accent */}
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
            "linear-gradient(112deg,#f7fafb 0%,#ffffff 48%,#ffffff 100%)",
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
            "linear-gradient(to right,color-mix(in srgb,var(--dnh-primary) 4%,transparent) 1px,transparent 1px)",
          backgroundSize: "118px 100%",
        }}
      />

      <span
        aria-hidden="true"
        className="
          absolute
          left-[18%]
          top-0

          h-[6px]
          w-[2px]

          bg-brand-accent
        "
      />
    </>
  );
}
