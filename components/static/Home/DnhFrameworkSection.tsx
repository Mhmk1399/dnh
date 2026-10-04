import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { ActionButton } from "@/components/ui/ActionButton";

type FrameworkStep = {
  index: "01" | "02" | "03";
  title: string;
  english: string;
  description: string;
};

export function DnhFrameworkSection() {
  return (
    <section
      dir="rtl"
      aria-labelledby="dnh-framework-title"
      className="
        relative
        isolate
        overflow-hidden

        border-y
        border-line

        bg-page
      "
      style={{
        background: `
          linear-gradient(
            135deg,
            #ffffff 0%,
            color-mix(in srgb, var(--dnh-primary) 3%, white) 48%,
            #ffffff 100%
          )
        `,
      }}
    >
      <BackgroundGrid />

      <div
        className="
          relative
          z-10
          dnh-site-shell

          mx-auto
          grid
          w-full
          max-w-[1536px]

          gap-12

          px-5
          py-16

          sm:px-8
          sm:py-20

          lg:min-h-[680px]
          lg:grid-cols-[minmax(0,1.08fr)_minmax(440px,0.92fr)]
          lg:items-center
          lg:gap-10
          lg:px-12
          lg:py-16

          xl:min-h-[700px]
          xl:gap-16
          xl:px-16

          2xl:px-20
        "
      >
        {/* ============================================================
            RIGHT — CONTENT
        ============================================================ */}
        <div
          className="
            order-2
            text-right

            lg:col-start-1
            lg:row-start-1
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
              چارچوب DNH
            </span>
          </div>

          <h2
            id="dnh-framework-title"
            className="
              max-w-[610px]

              text-[32px]
              font-black
              leading-[1.5]
              tracking-[-0.04em]

              text-ink

              sm:text-[40px]

              lg:text-[48px]
              lg:leading-[1.45]

              xl:text-[56px]
            "
          >
            از داده تا تصمیم،
            <br />
            <span className="text-brand-primary">یک مسیر ساختاریافته</span>
          </h2>

          <p
            className="
              mt-6
              max-w-[590px]

              text-[14px]
              font-medium
              leading-[2.15]

              text-ink-muted

              sm:text-[15px]

              lg:text-[16px]
            "
          >
            در DNH، داده به‌تنهایی تصمیم نمی‌سازد. ارزش زمانی شکل می‌گیرد که
            داده‌ها، ریسک‌ها، سناریوها، اهداف و ساختار مالی در یک مسیر منسجم
            قرار بگیرند و به تصمیمی روشن، قابل‌دفاع و هم‌راستا با افق شما منتهی
            شوند.
          </p>

          {/* Key statement */}
          <div
            className="
              mt-7
              max-w-[520px]

              border-r-2
              border-brand-accent

              pr-5
            "
          >
            <p
              className="
                text-[14px]
                font-bold
                leading-[2]
                text-ink

                sm:text-[15px]
              "
            >
              تحلیل وقتی ارزشمند می‌شود که بتواند
              <span className="text-brand-primary">
                {" "}
                مسیر تصمیم را روشن کند.
              </span>
            </p>
          </div>

          {/* CTA */}
          <div className="mt-8">
            <ActionButton
              href="/dnh/framework"
              variant="primary"
              size="md"
              icon={ArrowLeft}
              className="
                w-full
                sm:w-auto
                sm:min-w-[210px]
              "
            >
              آشنایی با چارچوب DNH
            </ActionButton>
          </div>
        </div>

        {/* ============================================================
            LEFT — ARCHITECTURAL SYSTEM
        ============================================================ */}
        <div
          className="
            order-1

            lg:col-start-2
            lg:row-start-1
          "
        >
          <FrameworkVisual />
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   Visual
============================================================================= */

function FrameworkVisual() {
  return (
    <div
      className="
        relative

        mx-auto
        w-full
        max-w-[780px]

        border
        border-line

        bg-white/55

        lg:h-[540px]
      "
    >
      {/* Architectural SVG */}
      <Image
        alt="چارچوب DNH"
        src="/assets/images/Translucent Data City in Perspective.png"
        width={780}
        height={540}
        className="
          h-auto
          w-full "
      />

      {/* ================================================================
          Mobile visual spacer
      ================================================================= */}
    </div>
  );
}

/* =============================================================================
   Desktop Step
============================================================================= */

function DesktopStep({
  step,
  isLast,
}: {
  step: FrameworkStep;
  isLast: boolean;
}) {
  return (
    <article
      className={`
        relative

        min-h-[186px]

        p-5

        text-right

        transition-[background-color]
        duration-300

        hover:bg-surface-soft/70

        xl:p-6

        ${!isLast ? "border-l border-line" : ""}
      `}
    >
      <div
        className="
          flex
          items-start
          justify-between
          gap-3
        "
      >
        <div>
          <h3
            className="
              text-[16px]
              font-black
              leading-7
              text-ink

              xl:text-[17px]
            "
          >
            {step.title}
          </h3>

          <p
            dir="ltr"
            className="
              mt-0.5

              text-right
              text-[8px]
              font-bold
              uppercase
              tracking-[0.09em]

              text-ink-muted
            "
          >
            {step.english}
          </p>
        </div>

        <span
          dir="ltr"
          className="
            shrink-0

            text-[28px]
            font-black
            leading-none
            tracking-[-0.05em]

            text-brand-primary
          "
        >
          {step.index}
        </span>
      </div>

      <span
        aria-hidden="true"
        className="
          mt-4
          block
          h-px
          w-8
          bg-brand-accent
        "
      />

      <p
        className="
          mt-4

          text-[10px]
          font-medium
          leading-[2]

          text-ink-muted

          xl:text-[11px]
        "
      >
        {step.description}
      </p>
    </article>
  );
}

/* =============================================================================
   Mobile Step
============================================================================= */

function MobileStep({
  step,
  isLast,
}: {
  step: FrameworkStep;
  isLast: boolean;
}) {
  return (
    <article
      className={`
        relative

        bg-white/88

        px-5
        py-5

        text-right

        backdrop-blur-[8px]

        sm:px-6

        ${!isLast ? "border-b border-line" : ""}
      `}
    >
      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div className="min-w-0">
          <h3
            className="
              text-[17px]
              font-black
              leading-7
              text-ink
            "
          >
            {step.title}
          </h3>

          <p
            dir="ltr"
            className="
              mt-1

              text-right
              text-[9px]
              font-bold
              tracking-[0.08em]

              text-ink-muted
            "
          >
            {step.english}
          </p>
        </div>

        <span
          dir="ltr"
          className="
            shrink-0

            text-[34px]
            font-black
            leading-none

            text-brand-primary
          "
        >
          {step.index}
        </span>
      </div>

      <div
        className="
          mt-4
          flex
          items-center
          gap-3
        "
      >
        <span className="h-px w-8 bg-brand-accent" />
        <span className="h-px flex-1 bg-line" />
      </div>

      <p
        className="
          mt-4

          text-[12px]
          font-medium
          leading-[2]

          text-ink-muted
        "
      >
        {step.description}
      </p>
    </article>
  );
}

/* =============================================================================
   Page background grid
============================================================================= */

function BackgroundGrid() {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        inset-0
        z-0
        opacity-[0.5]
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
        backgroundSize: "72px 72px",
        maskImage: "linear-gradient(90deg, rgba(0,0,0,.55), transparent 58%)",
        WebkitMaskImage:
          "linear-gradient(90deg, rgba(0,0,0,.55), transparent 58%)",
      }}
    />
  );
}
