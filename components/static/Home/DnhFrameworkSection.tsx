import Image from "next/image";
import { ArrowDown, ArrowLeft, ChevronLeft, Play } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   Types
============================================================================= */

type FrameworkStep = {
  key: "d" | "n" | "h";
  letter: string;
  english: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

type FrameworkFeature = {
  title: string;
  description: string;
  icon: "d" | "n" | "h";
};

/* =============================================================================
   Content
============================================================================= */

const FRAMEWORK_STEPS: FrameworkStep[] = [
  {
    key: "d",
    letter: "D",
    english: "Data Intelligence",
    title: "هوشمندی داده",
    description: "تحلیل داده‌ها، ریسک‌ها، روندها و واقعیت‌های موقعیت شما",
    image: "/assets/images/glass_orb_analytics_chart_icon.png",
    imageAlt: "نماد هوشمندی داده DNH",
  },
  {
    key: "n",
    letter: "N",
    english: "Navigation Strategy",
    title: "مسیریابی راهبردی",
    description: "تعریف گزینه‌ها، سناریوها و انتخاب مسیر مناسب برای تصمیم",
    image: "/assets/images/glassy_compass_orb_icon.png",
    imageAlt: "نماد مسیریابی راهبردی DNH",
  },
  {
    key: "h",
    letter: "H",
    english: "Horizon Architecture",
    title: "معماری افق",
    description: "هماهنگ‌سازی تصمیم امروز با اهداف بلندمدت و ساختار آینده",
    image: "/assets/images/glassy_orb_layered_tech_icon.png",
    imageAlt: "نماد معماری افق DNH",
  },
];

const FRAMEWORK_FEATURES: FrameworkFeature[] = [
  {
    title: "تصمیم‌سازی روشن‌تر",
    description: "با تکیه بر داده و تحلیل دقیق",
    icon: "n",
  },
  {
    title: "انتخاب مسیر مناسب‌تر",
    description: "با ارزیابی سناریوها و ریسک‌ها",
    icon: "d",
  },
  {
    title: "نگاه بلندمدت",
    description: "هماهنگ با اهداف و ساختار آینده",
    icon: "h",
  },
];

/* =============================================================================
   Helpers
============================================================================= */

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getFeatureIconPath(icon: FrameworkFeature["icon"]) {
  switch (icon) {
    case "d":
      return "/assets/images/glass_orb_analytics_chart_icon.png";
    case "n":
      return "/assets/images/glassy_compass_orb_icon.png";
    case "h":
      return "/assets/images/glassy_orb_layered_tech_icon.png";
    default:
      return "/assets/images/glass_orb_analytics_chart_icon.png";
  }
}

/* =============================================================================
   Section
============================================================================= */

export default function DnhFrameworkSection() {
  return (
    <section
      id="dnh-framework"
      dir="rtl"
      aria-labelledby="dnh-framework-title"
      aria-describedby="dnh-framework-description"
      className="
        relative
        isolate

        mx-auto
        mt-12

        w-[calc(100%-20px)]
        max-w-[1520px]

        overflow-hidden

        rounded-[30px]

        border
        border-line

        bg-page

        shadow-[0_24px_80px_color-mix(in_srgb,var(--dnh-primary)_8%,transparent)]

        sm:mt-16
        sm:w-[calc(100%-32px)]
        sm:rounded-[34px]

        lg:mt-20
        lg:w-[calc(100%-48px)]
        lg:rounded-[40px]
      "
    >
      {/* ===================================================================
          THEME BACKGROUND
      ==================================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0

          z-[-8]
        "
        style={{
          background: `
            radial-gradient(circle at 8% 18%, color-mix(in srgb, var(--dnh-primary) 8%, transparent) 0%, transparent 28%),
            radial-gradient(circle at 88% 20%, color-mix(in srgb, var(--dnh-primary) 7%, transparent) 0%, transparent 25%),
            radial-gradient(circle at 14% 88%, color-mix(in srgb, var(--dnh-accent) 4%, transparent) 0%, transparent 20%),
            linear-gradient(
              135deg,
              color-mix(in srgb, var(--dnh-primary) 5%, var(--dnh-bg-page)) 0%,
              var(--dnh-bg-page) 42%,
              color-mix(in srgb, var(--dnh-primary) 3.5%, var(--dnh-bg-page)) 100%
            )
          `,
        }}
      />

      {/* dotted pattern */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0

          z-[-7]

          opacity-55
        "
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in srgb, var(--dnh-primary) 13%, transparent) 0.8px, transparent 0.8px)",
          backgroundSize: "22px 22px",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
        }}
      />

      {/* arcs */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -right-[180px]
          top-[90px]

          z-[-6]

          h-[430px]
          w-[430px]

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
          -right-[60px]
          top-[155px]

          z-[-6]

          h-[280px]
          w-[280px]

          rounded-full

          border
          border-brand-primary/[0.06]
        "
      />
      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -left-[180px]
          bottom-[-40px]

          z-[-6]

          h-[400px]
          w-[400px]

          rounded-full

          border
          border-brand-primary/[0.06]
        "
      />
      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -left-[40px]
          bottom-[10px]

          z-[-6]

          h-[250px]
          w-[250px]

          rounded-full

          border
          border-brand-primary/[0.05]
        "
      />

      {/* glow blobs */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          left-[10%]
          top-[18%]

          z-[-5]

          h-[140px]
          w-[140px]

          rounded-full

          bg-brand-primary/[0.07]

          blur-[45px]
        "
      />
      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          right-[18%]
          top-[24%]

          z-[-5]

          h-[160px]
          w-[160px]

          rounded-full

          bg-brand-accent/[0.06]

          blur-[55px]
        "
      />

      {/* floating dots */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          left-[12%]
          top-[20%]

          z-[-4]

          h-[8px]
          w-[8px]

          rounded-full

          bg-brand-accent

          shadow-[0_0_0_6px_color-mix(in_srgb,var(--dnh-accent)_10%,transparent)]
        "
      />
      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          right-[19%]
          top-[26%]

          z-[-4]

          h-[8px]
          w-[8px]

          rounded-full

          bg-brand-primary

          shadow-[0_0_0_6px_color-mix(in_srgb,var(--dnh-primary)_10%,transparent)]
        "
      />
      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          left-[24%]
          bottom-[15%]

          z-[-4]

          h-[7px]
          w-[7px]

          rounded-full

          bg-brand-accent
        "
      />

      {/* top reflection */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-x-[8%]
          top-0

          h-px

          bg-gradient-to-r
          from-transparent
          via-page
          to-transparent

          opacity-85
        "
      />

      <div
        className="
          relative
          z-10

          px-4
          pb-5
          pt-9

          sm:px-6
          sm:pb-7
          sm:pt-11

          lg:px-[42px]
          lg:pb-[28px]
          lg:pt-[42px]

          xl:px-[54px]
          xl:pt-[48px]
        "
      >
        {/* ===============================================================
            HEADER
        ================================================================ */}

        <header
          className="
            mx-auto

            max-w-[760px]

            text-center
          "
        >
          <div
            className="
              mx-auto

              inline-flex
              items-center
              gap-[8px]

              rounded-full

              border
              border-line

              bg-page/[0.68]

              px-[14px]
              py-[8px]

              text-[9px]
              font-bold

              text-brand-primary

              shadow-[0_7px_24px_color-mix(in_srgb,var(--dnh-primary)_6%,transparent)]

              backdrop-blur-[14px]

              sm:text-[10px]
            "
          >
            <span>چارچوب DNH</span>

            <span
              aria-hidden="true"
              className="
                h-[6px]
                w-[6px]

                rounded-full

                bg-brand-accent

                shadow-[0_0_0_5px_color-mix(in_srgb,var(--dnh-accent)_9%,transparent)]
              "
            />
          </div>

          <h2
            id="dnh-framework-title"
            className="
              mt-5

              text-[28px]
              font-black

              leading-[1.55]

              tracking-[-0.045em]

              text-ink

              sm:text-[36px]

              lg:text-[46px]
              lg:leading-[1.42]
            "
          >
            چارچوب{" "}
            <span dir="ltr" className="inline-block text-brand-primary">
              DNH
            </span>{" "}
            چگونه کار می‌کند؟
          </h2>

          <p
            className="
              mt-3

              text-[14px]
              font-black

              leading-[1.9]

              text-ink

              sm:text-[15px]

              lg:text-[18px]
            "
          >
            از داده و تحلیل تا مسیریابی و معماری افق
          </p>

          <p
            id="dnh-framework-description"
            className="
              mx-auto
              mt-4

              max-w-[690px]

              text-[10px]
              font-medium

              leading-[2.1]

              text-ink-muted

              sm:text-[11px]

              lg:text-[12px]
            "
          >
            چارچوب DNH سه لایه به‌هم‌پیوسته برای تصمیم‌سازی مالی به کار می‌گیرد؛
            از تحلیل وضعیت امروز تا انتخاب مسیر مناسب و هماهنگی آن با افق
            بلندمدت.
          </p>
        </header>

        {/* ===============================================================
            DESKTOP FLOW
        ================================================================ */}

        <div className="mt-8 hidden lg:block">
          <div
            className="
              grid
              grid-cols-[1fr_74px_1fr_74px_1fr]
              items-start
              gap-0
            "
          >
            <FrameworkStepCard step={FRAMEWORK_STEPS[0]} />
            <ConnectorArrow />
            <FrameworkStepCard step={FRAMEWORK_STEPS[1]} />
            <ConnectorArrow />
            <FrameworkStepCard step={FRAMEWORK_STEPS[2]} />
          </div>
        </div>

        {/* ===============================================================
            MOBILE FLOW
        ================================================================ */}

        <div className="mt-8 space-y-3 lg:hidden">
          {FRAMEWORK_STEPS.map((step, index) => (
            <div key={step.key}>
              <MobileFrameworkStepCard step={step} index={index + 1} />

              {index < FRAMEWORK_STEPS.length - 1 && (
                <div className="flex justify-center py-1">
                  <span
                    aria-hidden="true"
                    className="
                      flex
                      h-[30px]
                      w-[30px]
                      items-center
                      justify-center

                      rounded-full

                      border
                      border-line

                      bg-page/85

                      text-brand-primary

                      shadow-[0_6px_18px_color-mix(in_srgb,var(--dnh-primary)_6%,transparent)]
                    "
                  >
                    <ArrowDown
                      strokeWidth={1.8}
                      className="h-[14px] w-[14px]"
                    />
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ===============================================================
            FEATURE STRIP
        ================================================================ */}

        <div
          className="
            mt-7

            grid
            grid-cols-1
            gap-3

            rounded-[24px]

            border
            border-line

            bg-page/[0.62]

            p-3

            shadow-[0_14px_36px_color-mix(in_srgb,var(--dnh-primary)_5%,transparent)]

            backdrop-blur-[16px]

            sm:grid-cols-3
            sm:gap-0
            sm:p-0

            lg:mt-8
          "
        >
          {FRAMEWORK_FEATURES.map((feature, index) => (
            <FeaturePill
              key={feature.title}
              feature={feature}
              showBorder={index !== FRAMEWORK_FEATURES.length - 1}
            />
          ))}
        </div>

        {/* ===============================================================
            ACTIONS DESKTOP
        ================================================================ */}

        <div
          className="
            mt-7

            hidden
            items-center
            gap-5

            lg:flex
          "
        >
          <div
            aria-hidden="true"
            className="
              relative

              h-px
              flex-1

              bg-line
            "
          >
            <span
              className="
                absolute
                left-[35%]
                top-1/2

                h-[7px]
                w-[7px]

                -translate-y-1/2

                rounded-full

                bg-brand-accent
              "
            />
          </div>

          <FrameworkWatchLink />

          <FrameworkPrimaryButton />
        </div>

        {/* ===============================================================
            ACTIONS MOBILE
        ================================================================ */}

        <div className="mt-6 space-y-3 lg:hidden">
          <FrameworkPrimaryButton mobile />

          <div className="flex justify-center">
            <FrameworkWatchLink />
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   Desktop step card
============================================================================= */

function FrameworkStepCard({ step }: { step: FrameworkStep }) {
  return (
    <article
      className="
        group/step

        relative

        flex
        min-h-[430px]
        flex-col
        items-center

        rounded-[28px]

        border
        border-line

        bg-page/[0.70]

        px-6
        pb-6
        pt-6

        text-center

        shadow-[0_14px_36px_color-mix(in_srgb,var(--dnh-primary)_6%,transparent)]

        backdrop-blur-[16px]

        transition-[transform,box-shadow,border-color,background-color]
        duration-[550ms]
        ease-[cubic-bezier(.22,1,.36,1)]

        hover:-translate-y-[4px]
        hover:border-line-strong/30
        hover:bg-page/[0.88]
        hover:shadow-[0_24px_54px_color-mix(in_srgb,var(--dnh-primary)_12%,transparent)]

        active:translate-y-[1px]
        active:scale-[0.99]

        motion-reduce:transition-none
        motion-reduce:transform-none
      "
    >
      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -top-[55px]
          left-1/2

          h-[160px]
          w-[160px]

          -translate-x-1/2

          rounded-full

          bg-brand-primary/[0.06]

          blur-[45px]

          opacity-0

          transition-opacity
          duration-500

          group-hover/step:opacity-100
        "
      />

      <div
        className="
          relative

          flex
          h-[190px]
          w-[190px]
          items-center
          justify-center
        "
      >
        <div
          aria-hidden="true"
          className="
            absolute
            inset-0

            rounded-full

            border
            border-brand-primary/[0.12]
          "
        />

        <div
          aria-hidden="true"
          className="
            absolute
            left-1/2
            top-1/2

            h-[110px]
            w-[110px]

            -translate-x-1/2
            -translate-y-1/2

            rounded-full

            bg-brand-primary/[0.08]

            blur-[34px]
          "
        />

        <Image
          src={step.image}
          alt={step.imageAlt}
          width={190}
          height={190}
          sizes="190px"
          className="
            relative
            z-10

            h-[190px]
            w-[190px]

            object-contain

            transition-transform
            duration-[600ms]
            ease-[cubic-bezier(.22,1,.36,1)]

            group-hover/step:scale-[1.03]
            group-hover/step:-translate-y-[4px]
          "
        />
      </div>

      <div className="mt-3">
        <p
          dir="ltr"
          className="
            text-[14px]
            font-medium

            text-brand-primary/70
          "
        >
          {step.english}
        </p>

        <p
          className="
            mt-1

            text-[34px]
            font-black

            leading-none

            tracking-[-0.05em]

            text-brand-primary
          "
        >
          {step.letter}
        </p>

        <h3
          className="
            mt-3

            text-[18px]
            font-black

            leading-[1.8]

            text-ink
          "
        >
          {step.title}
        </h3>

        <p
          className="
            mx-auto
            mt-2

            max-w-[260px]

            text-[11px]
            font-medium

            leading-[2]

            text-ink-muted
          "
        >
          {step.description}
        </p>
      </div>
    </article>
  );
}

/* =============================================================================
   Mobile step card
============================================================================= */

function MobileFrameworkStepCard({
  step,
  index,
}: {
  step: FrameworkStep;
  index: number;
}) {
  return (
    <article
      className="
        group/mobile-step

        relative

        overflow-hidden

        rounded-[22px]

        border
        border-line

        bg-page/[0.72]

        px-3
        py-3

        shadow-[0_10px_28px_color-mix(in_srgb,var(--dnh-primary)_5%,transparent)]

        backdrop-blur-[14px]

        touch-manipulation

        transition-[transform,box-shadow,border-color,background-color]
        duration-[500ms]
        ease-[cubic-bezier(.22,1,.36,1)]

        hover:-translate-y-[2px]
        hover:border-line-strong/25
        hover:bg-page/[0.86]

        active:translate-y-[1px]
        active:scale-[0.985]

        motion-reduce:transition-none
        motion-reduce:transform-none
      "
    >
      <div className="flex items-center gap-3">
        <div
          className="
            relative

            flex
            h-[68px]
            w-[68px]
            shrink-0
            items-center
            justify-center
          "
        >
          <div
            aria-hidden="true"
            className="
              absolute
              inset-0

              rounded-full

              bg-brand-primary/[0.07]

              blur-[18px]
            "
          />

          <Image
            src={step.image}
            alt={step.imageAlt}
            width={68}
            height={68}
            sizes="68px"
            className="
              relative
              z-10

              h-[68px]
              w-[68px]

              object-contain
            "
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p
                dir="ltr"
                className="
                  text-[10px]
                  font-medium

                  text-brand-primary/70
                "
              >
                {step.english}
              </p>

              <h3
                className="
                  mt-[2px]

                  text-[17px]
                  font-black

                  text-ink
                "
              >
                {step.title}
              </h3>
            </div>

            <span
              className="
                inline-flex
                h-[26px]
                min-w-[26px]
                items-center
                justify-center

                rounded-full

                bg-surface-soft

                px-2

                text-[11px]
                font-black

                text-brand-primary
              "
            >
              {index}
            </span>
          </div>

          <p
            className="
              mt-[5px]

              text-[9px]
              font-medium

              leading-[1.9]

              text-ink-muted
            "
          >
            {step.description}
          </p>
        </div>
      </div>
    </article>
  );
}

/* =============================================================================
   Connector arrow desktop
============================================================================= */

function ConnectorArrow() {
  return (
    <div
      className="
        relative

        flex
        h-[250px]
        items-center
        justify-center
      "
      aria-hidden="true"
    >
      <span
        className="
          absolute
          left-1/2
          top-1/2

          h-px
          w-[72px]

          -translate-x-1/2
          -translate-y-1/2

          bg-gradient-to-r
          from-brand-primary/20
          via-brand-primary/35
          to-brand-accent/35
        "
      />

      <span
        className="
          absolute
          left-[12px]
          top-[calc(50%-4px)]

          h-[8px]
          w-[8px]

          rounded-full

          bg-brand-accent
        "
      />
      <span
        className="
          absolute
          right-[12px]
          top-[calc(50%-4px)]

          h-[8px]
          w-[8px]

          rounded-full

          bg-brand-primary
        "
      />

      <span
        className="
          relative
          z-10

          flex
          h-[44px]
          w-[44px]
          items-center
          justify-center

          rounded-full

          border
          border-line

          bg-page/85

          text-brand-primary

          shadow-[0_8px_24px_color-mix(in_srgb,var(--dnh-primary)_7%,transparent)]

          backdrop-blur-[14px]
        "
      >
        <ChevronLeft strokeWidth={1.8} className="h-[18px] w-[18px]" />
      </span>
    </div>
  );
}

/* =============================================================================
   Feature pill
============================================================================= */

function FeaturePill({
  feature,
  showBorder,
}: {
  feature: FrameworkFeature;
  showBorder: boolean;
}) {
  return (
    <div
      className={cn(
        `
          group/feature

          flex
          items-center
          gap-[12px]

          rounded-[18px]

          px-3
          py-3

          transition-[transform,background-color]
          duration-[450ms]
          ease-[cubic-bezier(.22,1,.36,1)]

          hover:bg-page/70
          hover:-translate-y-[1px]

          active:translate-y-[1px]
          active:scale-[0.99]

          motion-reduce:transition-none
          motion-reduce:transform-none

          sm:rounded-none
          sm:px-5
          sm:py-4
        `,
        showBorder &&
          `
            sm:border-l
            sm:border-line
          `,
      )}
    >
      <div
        className="
          flex
          h-[44px]
          w-[44px]
          shrink-0
          items-center
          justify-center

          rounded-full

          

           
        "
      >
        <Image
          src={getFeatureIconPath(feature.icon)}
          alt=""
          aria-hidden="true"
          width={26}
          height={26}
          sizes="26px"
          className="h-[46px] w-[46px] object-contain"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h3
          className="
            text-[11px]
            font-black

            text-ink

            sm:text-[12px]
          "
        >
          {feature.title}
        </h3>

        <p
          className="
            mt-[2px]

            text-[8.5px]
            font-medium

            leading-[1.9]

            text-ink-muted

            sm:text-[9px]
          "
        >
          {feature.description}
        </p>
      </div>
    </div>
  );
}

/* =============================================================================
   Primary CTA
============================================================================= */

function FrameworkPrimaryButton({ mobile = false }: { mobile?: boolean }) {
  return (
    <ActionButton
      href="/dnh/framework"
      variant="primary"
      size="md"
      icon={ArrowLeft}
      iconPosition="end"
      fullWidth={mobile}
      className={mobile ? "" : "min-w-[220px]"}
    >
      بیشتر درباره چارچوب DNH
    </ActionButton>
  );
}

/* =============================================================================
   Watch link
============================================================================= */

function FrameworkWatchLink() {
  return (
    <ActionButton
      href="/dnh/framework"
      variant="secondary"
      size="sm"
      icon={Play}
      iconPosition="end"
    >
      مشاهده DNH
    </ActionButton>
  );
}
