import Link from "next/link";

import {
  ArrowDownLeft,
  CircleDot,
  Clock3,
  Droplets,
  Layers3,
  ShieldCheck,
  Target,
  Waypoints,
  type LucideIcon,
} from "lucide-react";

const INPUTS = [
  {
    title: "دارایی‌ها",
    text: "اجزای موجود در ساختار ثروت",
    icon: Layers3,
  },
  {
    title: "اهداف",
    text: "نیازها و جهت‌های مالی و شخصی",
    icon: Target,
  },
  {
    title: "نقدشوندگی",
    text: "دسترسی و انعطاف منابع",
    icon: Droplets,
  },
  {
    title: "ریسک",
    text: "نقاط آسیب‌پذیر و عدم‌قطعیت",
    icon: ShieldCheck,
  },
  {
    title: "افق تصمیم",
    text: "هماهنگی امروز با مسیر بلندمدت",
    icon: Clock3,
  },
] as const;

const OUTPUTS = [
  "وضعیت فعلی ثروت",
  "نقاط مهم و نیازمند توجه",
  "ریسک‌های قابل بررسی",
  "مسیرهای پیش رو",
] as const;

/* =============================================================================
   SECTION — SERVER COMPONENT
============================================================================= */

export function WealthStrategyViewSection() {
  return (
    <section
      id="wealth-strategy-view"
      dir="rtl"
      aria-labelledby="wealth-strategy-view-title"
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
          mx-auto w-full max-w-[1536px]

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
            mx-auto
            max-w-[920px]
            text-center
          "
        >
          <div
            className="
              mb-5
              flex items-center justify-center gap-3
            "
          >
            <span aria-hidden="true" className="h-px w-9 bg-brand-accent" />

            <span
              className="
                text-[10px] font-black text-brand-primary
                sm:text-[11px]
              "
            >
              تصویر یکپارچه ثروت
            </span>

            <span aria-hidden="true" className="h-px w-9 bg-brand-accent" />
          </div>

          <h2
            id="wealth-strategy-view-title"
            className="
              text-[31px]
              font-black
              leading-[1.65]
              tracking-[-0.045em]
              text-ink

              sm:text-[38px]

              lg:text-[46px]
              lg:leading-[1.5]

              xl:text-[51px]
            "
          >
            ارزش اصلی،
            <br />
            در دیدن{" "}
            <span className="text-brand-primary">ارتباط میان اجزاست.</span>
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-[680px]

              text-[13px]
              font-medium
              leading-[2.15]
              text-ink-muted

              sm:text-[14px]
            "
          >
            هر بخش از ثروت به‌تنهایی بخشی از تصویر است؛ نگاه ساختاری زمانی شکل
            می‌گیرد که این اجزا در نسبت با یکدیگر دیده شوند.
          </p>
        </div>

        {/* =======================================================
            SIGNATURE VIEW
        ======================================================== */}

        <div
          className="
            mt-12
            overflow-hidden

            border border-line

            bg-[#032f3f]

            shadow-[0_34px_100px_rgba(3,47,63,.14)]

            sm:mt-14
            lg:mt-16
          "
        >
          <div
            className="
              grid
              lg:grid-cols-[0.92fr_92px_1.08fr]
            "
          >
            {/* ===================================================
                INPUTS
            ==================================================== */}

            <div
              className="
                relative

                border-b border-white/10

                px-5 py-6

                sm:px-7 sm:py-8

                lg:border-b-0
                lg:border-l
                lg:px-8
                lg:py-9
              "
            >
              <div className="mb-6">
                <p
                  className="
                    text-[9px]
                    font-black
                    text-[#82cee4]/72
                  "
                >
                  اجزایی که باید کنار هم دیده شوند
                </p>

                <p
                  className="
                    mt-2
                    max-w-[520px]

                    text-[11px]
                    font-medium
                    leading-[2]

                    text-white/36
                  "
                >
                  هیچ‌کدام از این بخش‌ها به‌تنهایی تعریف کاملی از وضعیت ثروت
                  ارائه نمی‌کنند.
                </p>
              </div>

              <div
                className="
                  divide-y
                  divide-white/10

                  border-y
                  border-white/10
                "
              >
                {INPUTS.map((item) => (
                  <InputRow key={item.title} item={item} />
                ))}
              </div>
            </div>

            {/* ===================================================
                CONVERGENCE
            ==================================================== */}

            <div
              className="
                relative

                hidden

                overflow-hidden

                border-l
                border-white/10

                bg-black/[0.08]

                lg:block
              "
            >
              <span
                aria-hidden="true"
                className="
                  absolute
                  left-1/2
                  top-[12%]

                  h-[76%]
                  w-px

                  -translate-x-1/2

                  bg-gradient-to-b
                  from-[#82cee4]/10
                  via-[#82cee4]/40
                  to-brand-accent/65
                "
              />

              <span
                aria-hidden="true"
                className="
                  absolute
                  left-1/2
                  top-1/2

                  flex
                  h-12
                  w-12

                  -translate-x-1/2
                  -translate-y-1/2

                  items-center
                  justify-center

                  border
                  border-brand-accent/38

                  bg-[#032f3f]

                  shadow-[0_0_0_8px_rgba(3,47,63,.92),0_0_28px_rgba(252,133,2,.08)]
                "
              >
                <Waypoints
                  className="
                    h-5 w-5
                    text-brand-accent
                  "
                  strokeWidth={1.45}
                />
              </span>

              <span
                aria-hidden="true"
                className="
                  wealth-view-pulse

                  absolute
                  left-1/2
                  top-[14%]

                  h-[7px]
                  w-[7px]

                  -translate-x-1/2

                  bg-brand-accent

                  shadow-[0_0_16px_rgba(252,133,2,.65)]
                "
              />
            </div>

            {/* ===================================================
                STRUCTURED VIEW
            ==================================================== */}

            <div
              className="
                relative

                px-5 py-7

                sm:px-7 sm:py-8

                lg:px-9 lg:py-9
              "
            >
              <ViewBackground />

              <div className="relative z-10">
                <div
                  className="
                    flex
                    items-start
                    justify-between
                    gap-6
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
                      نتیجه نگاه یکپارچه
                    </p>

                    <h3
                      className="
                        mt-3
                        max-w-[520px]

                        text-[23px]
                        font-black
                        leading-[1.75]

                        text-white

                        sm:text-[27px]
                      "
                    >
                      یک تصویر ساختاریافته‌تر از وضعیت ثروت.
                    </h3>
                  </div>

                  <span
                    aria-hidden="true"
                    className="
                      mt-1
                      h-[8px]
                      w-[8px]
                      shrink-0

                      bg-brand-accent

                      shadow-[0_0_16px_rgba(252,133,2,.5)]
                    "
                  />
                </div>

                <p
                  className="
                    mt-5
                    max-w-[560px]

                    text-[11px]
                    font-medium
                    leading-[2.05]

                    text-white/42

                    sm:text-[12px]
                  "
                >
                  هدف این نیست که یک عدد یا نسخه واحد تولید شود؛ هدف، روشن‌تر
                  شدن وضعیت، نقاط مهم، ریسک‌ها و مسیرهای قابل بررسی است.
                </p>

                {/* -------------------------------------------------
                    OUTPUT LEDGER
                -------------------------------------------------- */}

                <div
                  className="
                    mt-8

                    border-y
                    border-white/10
                  "
                >
                  {OUTPUTS.map((item, index) => (
                    <OutputRow
                      key={item}
                      label={item}
                      accent={index === OUTPUTS.length - 1}
                    />
                  ))}
                </div>

                {/* -------------------------------------------------
                    STATEMENT
                -------------------------------------------------- */}

                <div
                  className="
                    mt-7

                    border-r-[3px]
                    border-brand-accent

                    bg-brand-accent/[0.075]

                    px-5
                    py-5
                  "
                >
                  <p
                    className="
                      text-[13px]
                      font-black
                      leading-[2]

                      text-white

                      sm:text-[14px]
                    "
                  >
                    ثروت، مجموعه‌ای از دارایی‌های جدا نیست؛ یک ساختار تصمیم‌پذیر
                    است.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =======================================================
            BOTTOM
        ======================================================== */}

        <div
          className="
            mt-8

            flex
            flex-col
            gap-5

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div
            className="
              flex
              items-start
              gap-3
            "
          >
            <CircleDot
              aria-hidden="true"
              className="
                mt-1
                h-4 w-4
                shrink-0

                text-brand-primary
              "
              strokeWidth={1.5}
            />

            <p
              className="
                max-w-[720px]

                text-[9px]
                font-medium
                leading-[2]

                text-ink-muted

                sm:text-[10px]
              "
            >
              دامنه بررسی و نوع خروجی بر اساس مسئله، شرایط و نیاز هر پرونده مشخص
              می‌شود.
            </p>
          </div>

          <Link
            href="#wealth-strategy-outcome"
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
            خروجی این خدمت چیست؟
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

      <Motion />
    </section>
  );
}

/* =============================================================================
   INPUT ROW
============================================================================= */

function InputRow({
  item,
}: {
  item: {
    title: string;
    text: string;
    icon: LucideIcon;
  };
}) {
  const Icon = item.icon;

  return (
    <div
      className="
        group/input

        grid
        gap-4

        py-4

        transition-colors
        duration-300

        hover:bg-white/[0.025]

        sm:grid-cols-[46px_110px_1fr]
        sm:items-center
        sm:px-3
      "
    >
      <span
        className="
          flex
          h-10 w-10
          items-center
          justify-center

          border
          border-[#82cee4]/16

          bg-[#82cee4]/[0.04]

          text-[#82cee4]

          transition-[border-color,background-color,color]
          duration-300

          group-hover/input:border-brand-accent/35
          group-hover/input:bg-brand-accent/[0.08]
          group-hover/input:text-brand-accent
        "
      >
        <Icon
          aria-hidden="true"
          className="h-[18px] w-[18px]"
          strokeWidth={1.45}
        />
      </span>

      <p
        className="
          text-[12px]
          font-black
          text-white/78
        "
      >
        {item.title}
      </p>

      <p
        className="
          text-[9px]
          font-medium
          leading-[1.9]

          text-white/31

          sm:text-[10px]
        "
      >
        {item.text}
      </p>
    </div>
  );
}

/* =============================================================================
   OUTPUT ROW
============================================================================= */

function OutputRow({
  label,
  accent = false,
}: {
  label: string;
  accent?: boolean;
}) {
  return (
    <div
      className="
        group/output

        flex
        items-center
        justify-between
        gap-5

        border-b
        border-white/10

        py-4

        last:border-b-0
      "
    >
      <span
        className="
          text-[11px]
          font-black

          text-white/67

          transition-colors
          duration-300

          group-hover/output:text-white
        "
      >
        {label}
      </span>

      <span
        aria-hidden="true"
        className={`
          h-[6px]
          w-[6px]
          shrink-0

          transition-[transform,box-shadow]
          duration-300

          group-hover/output:scale-125

          ${
            accent
              ? "bg-brand-accent group-hover/output:shadow-[0_0_14px_rgba(252,133,2,.55)]"
              : "bg-[#82cee4]/45"
          }
        `}
      />
    </div>
  );
}

/* =============================================================================
   VIEW BACKGROUND
============================================================================= */

function ViewBackground() {
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
            "radial-gradient(circle at 50% 45%,rgba(22,115,148,.19),transparent 42%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0

          opacity-[0.05]
        "
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,.08) 1px,transparent 1px)",
          backgroundSize: "74px 100%",
        }}
      />
    </>
  );
}

/* =============================================================================
   SECTION BACKGROUND
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
            "linear-gradient(112deg,#f5f9fa 0%,#ffffff 52%,#f8fbfc 100%)",
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
          right-[18%]
          top-0

          h-[6px]
          w-[2px]

          bg-brand-accent
        "
      />
    </>
  );
}

/* =============================================================================
   CSS-ONLY MOTION
============================================================================= */

function Motion() {
  return (
    <style>{`
      .wealth-view-pulse {
        animation:
          dnh-wealth-view-flow
          4.2s
          ease-in-out
          infinite;
      }

      @keyframes dnh-wealth-view-flow {
        0% {
          top: 14%;
          opacity: 0;
        }

        15% {
          opacity: 1;
        }

        78% {
          opacity: 1;
        }

        100% {
          top: 84%;
          opacity: 0;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .wealth-view-pulse {
          animation: none !important;
          top: 50%;
          opacity: .65;
        }
      }
    `}</style>
  );
}
