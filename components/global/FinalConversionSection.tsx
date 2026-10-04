import {
  ArrowLeft,
  BarChart3,
  CalendarDays,
  FileText,
  MessageCircle,
  SearchCheck,
  type LucideIcon,
} from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   Types
============================================================================= */

type ConversionStep = {
  index: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

/* =============================================================================
   Data
============================================================================= */

const CONVERSION_STEPS: ConversionStep[] = [
  {
    index: "01",
    title: "ثبت درخواست",
    description: "اطلاعات اولیه و موضوع تصمیم مالی خود را ثبت کنید.",
    icon: FileText,
  },
  {
    index: "02",
    title: "ارزیابی دقیق",
    description: "شرایط، اهداف و مسئله مالی شما بررسی می‌شود.",
    icon: SearchCheck,
  },
  {
    index: "03",
    title: "ارائه پیشنهاد",
    description: "مسیر و راهکار متناسب با شرایط شما تعریف می‌شود.",
    icon: BarChart3,
  },
  {
    index: "04",
    title: "جلسه مشاوره",
    description: "گفت‌وگوی تخصصی برای بررسی مسیر و گام بعدی.",
    icon: MessageCircle,
  },
];

/* =============================================================================
   Helpers
============================================================================= */

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* =============================================================================
   Main Section
============================================================================= */

export default function FinalConversionSection() {
  return (
    <section
      id="assessment-consultation"
      dir="rtl"
      aria-labelledby="final-conversion-title"
      aria-describedby="final-conversion-description"
      className="
        relative
        isolate
        dnh-site-shell

        mx-auto
        mt-12

        scroll-mt-28

        w-[calc(100%-20px)]
        max-w-[1520px]

        overflow-hidden

        rounded-[30px]

        border
        border-line

        bg-page

        shadow-[0_24px_80px_color-mix(in_srgb,var(--dnh-primary)_8%,transparent)]

        [content-visibility:auto]
        [contain-intrinsic-size:560px]

        sm:mt-16
        sm:w-[calc(100%-32px)]
        sm:rounded-[34px]

        lg:mt-20
        lg:w-[calc(100%-48px)]
        lg:rounded-[40px]
      "
    >
      {/* ===================================================================
          BACKGROUND
      ==================================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[-10]
        "
        style={{
          background: `
            radial-gradient(
              circle at 18% 30%,
              color-mix(
                in srgb,
                var(--dnh-primary) 9%,
                transparent
              ) 0%,
              transparent 28%
            ),

            radial-gradient(
              circle at 82% 18%,
              color-mix(
                in srgb,
                var(--dnh-primary) 5%,
                transparent
              ) 0%,
              transparent 28%
            ),

            radial-gradient(
              circle at 44% 94%,
              color-mix(
                in srgb,
                var(--dnh-accent) 5%,
                transparent
              ) 0%,
              transparent 25%
            ),

            linear-gradient(
              135deg,
              color-mix(
                in srgb,
                var(--dnh-primary) 5%,
                var(--dnh-bg-page)
              ) 0%,

              var(--dnh-bg-page) 48%,

              color-mix(
                in srgb,
                var(--dnh-primary) 4%,
                var(--dnh-bg-page)
              ) 100%
            )
          `,
        }}
      />

      {/* ===================================================================
          DOT TEXTURE
      ==================================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[-9]

          opacity-45
        "
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in srgb,var(--dnh-primary) 16%,transparent) 0.75px,transparent 0.75px)",
          backgroundSize: "23px 23px",
          maskImage:
            "linear-gradient(90deg,black 0%,transparent 32%,transparent 68%,black 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg,black 0%,transparent 32%,transparent 68%,black 100%)",
        }}
      />

      {/* ===================================================================
          AMBIENT GLOWS
      ==================================================================== */}

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -left-[120px]
          top-[25%]

          z-[-8]

          h-[330px]
          w-[330px]

          rounded-full

          bg-brand-primary/[0.08]

          blur-[90px]
        "
      />

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          left-[36%]
          bottom-[-140px]

          z-[-8]

          h-[320px]
          w-[420px]

          rounded-full

          bg-brand-accent/[0.055]

          blur-[100px]
        "
      />

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -right-[100px]
          -top-[120px]

          z-[-8]

          h-[340px]
          w-[340px]

          rounded-full

          bg-brand-primary/[0.06]

          blur-[100px]
        "
      />

      {/* ===================================================================
          DECORATIVE ORBITS
      ==================================================================== */}

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -left-[170px]
          -top-[260px]

          z-[-7]

          h-[620px]
          w-[620px]

          rounded-full

          border
          border-brand-primary/[0.07]
        "
      />

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -right-[260px]
          top-[45px]

          z-[-7]

          h-[560px]
          w-[560px]

          rounded-full

          border
          border-brand-primary/[0.055]
        "
      />

      {/* ===================================================================
          BOTTOM WAVES
      ==================================================================== */}

      <svg
        aria-hidden="true"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        className="
          pointer-events-none

          absolute
          inset-x-0
          bottom-0

          z-[-6]

          h-[150px]
          w-full

          sm:h-[180px]

          lg:h-[200px]
        "
      >
        <path
          d="M0 165 C180 90 320 205 490 142 C650 83 775 205 940 135 C1100 66 1230 173 1440 95 L1440 220 L0 220 Z"
          fill="var(--dnh-primary)"
          fillOpacity="0.035"
        />

        <path
          d="M0 195 C230 128 350 208 540 165 C740 120 835 203 1040 155 C1200 117 1330 154 1440 132 L1440 220 L0 220 Z"
          fill="var(--dnh-accent)"
          fillOpacity="0.035"
        />
      </svg>

      {/* ===================================================================
          FLOATING DOTS
      ==================================================================== */}

      <span
        aria-hidden="true"
        className="
          absolute
          left-[16%]
          top-[22%]

          z-[-5]

          h-[7px]
          w-[7px]

          rounded-full

          bg-brand-accent

          shadow-[0_0_0_5px_color-mix(in_srgb,var(--dnh-accent)_9%,transparent)]
        "
      />

      <span
        aria-hidden="true"
        className="
          absolute
          left-[32%]
          top-[47%]

          z-[-5]

          h-[7px]
          w-[7px]

          rounded-full

          bg-brand-primary
        "
      />

      <span
        aria-hidden="true"
        className="
          absolute
          right-[10%]
          top-[30%]

          z-[-5]

          h-[8px]
          w-[8px]

          rounded-full

          bg-brand-primary
        "
      />

      {/* ===================================================================
          MAIN GRID
      ==================================================================== */}

      <div
        dir="ltr"
        className="
          relative
          z-10

          grid

          gap-8

          px-4
          py-9

          sm:px-7
          sm:py-11

          lg:min-h-[470px]
          lg:grid-cols-[1.08fr_.92fr]
          lg:items-center
          lg:gap-12

          lg:px-10
          lg:py-12

          xl:gap-16
          xl:px-14

          2xl:px-16
        "
      >
        {/* =================================================================
            PROCESS

            Mobile / Tablet -> second
            Desktop -> left
        ================================================================== */}

        <div
          dir="rtl"
          className="
            order-2

            relative

            lg:order-1
          "
        >
          <ConversionProcess />
        </div>

        {/* =================================================================
            CONTENT

            Mobile / Tablet -> first
            Desktop -> right
        ================================================================== */}

        <div
          dir="rtl"
          className="
            order-1

            mx-auto
            w-full
            max-w-[650px]

            text-center

            lg:order-2
            lg:mx-0
            lg:text-right
          "
        >
          {/* ---------------------------------------------------------------
              Eyebrow
          ---------------------------------------------------------------- */}

         

          {/* ---------------------------------------------------------------
              Heading
          ---------------------------------------------------------------- */}

          <h2
            id="final-conversion-title"
            className="
              mt-5

              font-black

              leading-[1.4]

              tracking-[-0.05em]

              text-ink
            "
          >
            <span
              lang="en"
              dir="ltr"
              className="
                block

                text-[29px]

                sm:text-[38px]

                lg:text-[45px]

                xl:text-[49px]
              "
            >
              ارزیابی 
              <span className="text-brand-primary"> / مشاوره</span>
            </span>

            <span
              className="
                mt-2
                block

                text-[17px]
                leading-[1.8]

                sm:text-[20px]

                lg:text-[22px]
              "
            >
              از تحلیل تا راهکار، در یک گفت‌وگوی تخصصی
            </span>
          </h2>

          {/* ---------------------------------------------------------------
              Description
          ---------------------------------------------------------------- */}

          <p
            id="final-conversion-description"
            className="
              mx-auto
              mt-4

              max-w-[610px]

              text-[10px]
              font-medium

              leading-[2.15]

              text-ink-muted

              sm:text-[11px]

              lg:mx-0
              lg:mt-5

              lg:text-[12px]
            "
          >
            با یک ارزیابی دقیق از شرایط مالی، اهداف و مسئله پیشِ روی شما، مسیر
            مناسب شناسایی می‌شود و در جلسه‌ای تخصصی، گزینه‌ها و راهکارهای متناسب
            با شرایط شما بررسی خواهند شد.
          </p>

          {/* ---------------------------------------------------------------
              CTAs
          ---------------------------------------------------------------- */}

          <div
            className="
              mt-6

              flex
              flex-col

              gap-[10px]

              sm:flex-row
              sm:items-center
              sm:justify-center

              lg:mt-7
              lg:justify-start
            "
          >
            {/* Primary */}

            <ActionButton
              href="/request-strategic-consultation"
              variant="primary"
              size="md"
              icon={ArrowLeft}
              iconPosition="end"
              className="w-full sm:w-auto sm:min-w-[270px] lg:min-w-[290px]"
            >
              درخواست مشاوره راهبردی
            </ActionButton>

            {/* Secondary */}

            <ActionButton
              href="/financial-decision-assessment"
              variant="secondary"
              size="md"
              icon={CalendarDays}
              iconPosition="start"
              className="w-full sm:w-auto sm:min-w-[215px]"
            >
              مشاهده مراحل ارزیابی
            </ActionButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   Conversion Process
============================================================================= */

function ConversionProcess() {
  return (
    <div
      className="
        relative

        mx-auto

        w-full
        max-w-[720px]

        lg:max-w-none
      "
    >
      {/* =================================================================
          DESKTOP / TABLET CONNECTOR
      ================================================================== */}

      <svg
        aria-hidden="true"
        viewBox="0 0 1000 240"
        preserveAspectRatio="none"
        className="
          pointer-events-none

          absolute
          left-[4%]
          top-[30px]

          hidden

          h-[180px]
          w-[92%]

          md:block

          lg:top-[50px]
          lg:h-[210px]
        "
      >
        <defs>
          <linearGradient
            id="final-conversion-line"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
          >
            <stop
              offset="0%"
              stopColor="var(--dnh-accent)"
              stopOpacity="0.55"
            />

            <stop
              offset="46%"
              stopColor="var(--dnh-primary)"
              stopOpacity="0.75"
            />

            <stop
              offset="100%"
              stopColor="var(--dnh-accent)"
              stopOpacity="0.55"
            />
          </linearGradient>
        </defs>

        <path
          d="
            M30 95
            C155 18 230 178 360 112
            C475 55 540 40 625 99
            C720 165 805 32 965 77
          "
          fill="none"
          stroke="url(#final-conversion-line)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <circle cx="210" cy="110" r="6" fill="var(--dnh-accent)" />

        <circle cx="442" cy="78" r="6" fill="var(--dnh-primary)" />

        <circle cx="690" cy="112" r="6" fill="var(--dnh-accent)" />

        <circle cx="882" cy="69" r="6" fill="var(--dnh-primary)" />
      </svg>

      {/* =================================================================
          STEPS
      ================================================================== */}

      <ol
        dir="ltr"
        aria-label="مراحل ارزیابی و مشاوره DNH"
        className="
          relative
          z-10

          grid
          grid-cols-2

          gap-3

          md:grid-cols-4
          md:gap-4

          lg:gap-5
        "
      >
        {CONVERSION_STEPS.map((step, index) => (
          <li
            key={step.index}
            className={cn(
              `
                  min-w-0
                `,

              index === 0 &&
                `
                    lg:mt-[28px]
                  `,

              index === 1 &&
                `
                    lg:mt-[70px]
                  `,

              index === 2 &&
                `
                    lg:mt-[42px]
                  `,

              index === 3 &&
                `
                    lg:mt-0
                  `,
            )}
          >
            <ConversionStepCard step={step} />
          </li>
        ))}
      </ol>
    </div>
  );
}

/* =============================================================================
   Step Card
============================================================================= */

function ConversionStepCard({ step }: { step: ConversionStep }) {
  const Icon = step.icon;

  return (
    <article
      dir="rtl"
      className="
        group/step

        relative

        flex
        min-h-[168px]
        flex-col
        items-center

        overflow-hidden

        rounded-[22px]

        border
        border-line

        bg-page/70

        px-3
        pb-4
        pt-4

        text-center

        shadow-[0_12px_32px_color-mix(in_srgb,var(--dnh-primary)_6%,transparent)]

        backdrop-blur-[15px]

        touch-manipulation

        transition-[transform,box-shadow,border-color,background-color]
        duration-[500ms]
        ease-[cubic-bezier(.22,1,.36,1)]

        hover:-translate-y-[4px]
        hover:border-line-strong/30
        hover:bg-page/90

        hover:shadow-[0_20px_46px_color-mix(in_srgb,var(--dnh-primary)_12%,transparent)]

        active:translate-y-[1px]
        active:scale-[0.975]

        motion-reduce:transition-none
        motion-reduce:transform-none

        sm:min-h-[180px]

        md:min-h-[188px]

        lg:min-h-[205px]
        lg:rounded-[25px]
        lg:px-4
        lg:pt-5
      "
    >
      {/* =================================================================
          NUMBER
      ================================================================== */}

      <span
        className="
          absolute
          left-[12px]
          top-[12px]

          inline-flex
          h-[25px]
          min-w-[25px]
          items-center
          justify-center

          rounded-full

          bg-brand-accent/[0.09]

          px-[6px]

          text-[8px]
          font-black

          text-brand-accent

          lg:left-[14px]
          lg:top-[14px]
        "
      >
        {step.index}
      </span>

      {/* =================================================================
          ICON
      ================================================================== */}

      <span
        aria-hidden="true"
        className="
          relative

          flex
          h-[54px]
          w-[54px]
          shrink-0
          items-center
          justify-center

          rounded-full

          bg-surface-soft

          text-brand-primary

          shadow-[0_8px_24px_color-mix(in_srgb,var(--dnh-primary)_8%,transparent)]

          transition-[transform,background-color,color,box-shadow]
          duration-[500ms]
          ease-[cubic-bezier(.22,1,.36,1)]

          group-hover/step:-translate-y-[3px]
          group-hover/step:scale-[1.045]

          group-hover/step:bg-brand-primary
          group-hover/step:text-[var(--dnh-text-on-brand)]

          group-hover/step:shadow-[0_12px_28px_color-mix(in_srgb,var(--dnh-primary)_20%,transparent)]

          group-active/step:scale-[0.9]

          motion-reduce:transition-none
          motion-reduce:transform-none

          sm:h-[58px]
          sm:w-[58px]
        "
      >
        <Icon
          strokeWidth={1.6}
          className="
            h-[22px]
            w-[22px]

            sm:h-[24px]
            sm:w-[24px]
          "
        />
      </span>

      {/* =================================================================
          TITLE
      ================================================================== */}

      <h3
        className="
          mt-4

          text-[11px]
          font-black

          leading-[1.8]

          text-ink

          transition-colors
          duration-[350ms]

          group-hover/step:text-brand-primary

          sm:text-[12px]

          lg:text-[13px]
        "
      >
        {step.title}
      </h3>

      {/* =================================================================
          DESCRIPTION
      ================================================================== */}

      <p
        className="
          mt-[5px]

          max-w-[145px]

          text-[8px]
          font-medium

          leading-[1.9]

          text-ink-muted

          sm:text-[8.5px]

          lg:text-[9px]
        "
      >
        {step.description}
      </p>

      {/* =================================================================
          HOVER GLOW
      ================================================================== */}

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -bottom-[90px]
          left-1/2

          h-[170px]
          w-[170px]

          -translate-x-1/2

          rounded-full

          bg-brand-primary/[0.09]

          opacity-0

          blur-[55px]

          transition-opacity
          duration-500

          group-hover/step:opacity-100
          group-active/step:opacity-70
        "
      />

      {/* bottom accent */}

      <span
        aria-hidden="true"
        className="
          absolute
          bottom-0
          left-1/2

          h-[2px]
          w-0

          -translate-x-1/2

          rounded-full

          bg-brand-accent

          transition-[width]
          duration-[550ms]
          ease-[cubic-bezier(.22,1,.36,1)]

          group-hover/step:w-[55px]

          group-active/step:w-[36px]
        "
      />
    </article>
  );
}
