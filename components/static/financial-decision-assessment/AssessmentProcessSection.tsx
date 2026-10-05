"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import {
  ArrowLeft,
  FileText,
  LucideIcon,
  MessageSquare,
  RefreshCw,
  Route,
  Search,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   Process

   این مراحل Sequence واقعی هستند؛
   بنابراین شماره‌گذاری اینجا معنای ساختاری دارد.
============================================================================= */

type ProcessTone = "qualification" | "review" | "decision";

type ProcessStep = {
  number: string;
  en: string;
  title: string;
  description: string;
  outcome: string;
  tone: ProcessTone;
  icon: LucideIcon;
};

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    en: "ASSESSMENT",
    title: "شناخت اولیه مسئله",
    description:
      "موضوع تصمیم، شرایط فعلی و دلیل مراجعه در سطح اولیه روشن می‌شود تا مشخص شود مسئله واقعاً چیست.",
    outcome: "شناخت اولیه",
    tone: "qualification",
    icon: Search,
  },
  {
    number: "02",
    en: "FIT & SCOPE",
    title: "بررسی تناسب و دامنه",
    description:
      "فوریت، افق زمانی، سطح پیچیدگی و تناسب پرونده با دامنه خدمات DNH بررسی می‌شود.",
    outcome: "تناسب و دامنه",
    tone: "qualification",
    icon: SlidersHorizontal,
  },
  {
    number: "03",
    en: "CONSULTATION / BRIEFING",
    title: "جلسه تخصصی یا Briefing",
    description:
      "در صورت تناسب، مسیر می‌تواند به جلسه تخصصی، مشاوره راهبردی یا Executive Briefing هدایت شود.",
    outcome: "گفت‌وگوی تخصصی",
    tone: "review",
    icon: MessageSquare,
  },
  {
    number: "04",
    en: "ANALYSIS",
    title: "بررسی حرفه‌ای پرونده",
    description:
      "مسئله با توجه به دامنه توافق‌شده، اطلاعات مرتبط و متغیرهای مؤثر به‌صورت حرفه‌ای بررسی می‌شود.",
    outcome: "تحلیل مسئله",
    tone: "review",
    icon: FileText,
  },
  {
    number: "05",
    en: "DECISION FRAMEWORK",
    title: "ساخت تصویر تصمیم",
    description:
      "گزینه‌ها، سناریوها و مسیرهای قابل بررسی در یک تصویر ساختاریافته‌تر کنار هم قرار می‌گیرند.",
    outcome: "سناریو و مسیر",
    tone: "decision",
    icon: Route,
  },
  {
    number: "06",
    en: "FOLLOW-UP",
    title: "پیگیری و بازبینی",
    description:
      "در صورت توافق و نیاز پرونده، مسیر تصمیم می‌تواند در ادامه بازبینی یا پیگیری شود.",
    outcome: "بازبینی",
    tone: "decision",
    icon: RefreshCw,
  },
];

/* =============================================================================
   Section
============================================================================= */

export function AssessmentProcessSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;

    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        setVisible(true);
        observer.disconnect();
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="assessment-process"
      dir="rtl"
      aria-labelledby="assessment-process-title"
      className="
        relative
        isolate
        overflow-hidden

        bg-[#032f3f]
        text-white
      "
    >
      <Background />

      <div
        className="
          dnh-site-shell
          relative
          z-10

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
          xl:py-28

          2xl:px-20
        "
      >
        {/* =======================================================
            Header
        ======================================================== */}

        <div
          className="
            grid
            gap-8

            lg:grid-cols-[0.82fr_1.18fr]
            lg:items-end
            lg:gap-16
          "
        >
          <Reveal visible={visible} delay={40}>
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
                    w-10

                    bg-brand-accent
                  "
                />

                <span
                  className="
                    text-[10px]
                    font-black

                    text-white/70

                    sm:text-[11px]
                  "
                >
                  مسیر ارزیابی و همکاری
                </span>
              </div>

              <h2
                id="assessment-process-title"
                className="
                  max-w-[720px]

                  text-[32px]
                  font-black
                  leading-[1.62]
                  tracking-[-0.045em]

                  text-white

                  sm:text-[39px]

                  lg:text-[46px]
                  lg:leading-[1.5]

                  xl:text-[51px]
                "
              >
                ارزیابی فقط یک فرم نیست؛
                <br />
                <span className="text-brand-accent">
                  نقطه آغاز یک مسیر روشن‌تر است.
                </span>
              </h2>
            </div>
          </Reveal>

          <Reveal visible={visible} delay={110}>
            <div className="lg:pb-1">
              <p
                className="
                  max-w-[680px]

                  text-[13px]
                  font-medium
                  leading-[2.2]

                  text-white/60

                  sm:text-[14px]

                  lg:text-[15px]
                "
              >
                هدف مرحله اول این نیست که بلافاصله وارد تحلیل کامل یا پیشنهاد
                راه‌حل شویم. ابتدا باید تناسب، دامنه و پیچیدگی مسئله روشن شود و
                سپس، در صورت نیاز، مسیر حرفه‌ای مناسب شکل بگیرد.
              </p>

              <div
                className="
                  mt-7

                  flex
                  flex-col
                  gap-4

                  sm:flex-row
                  sm:items-center
                "
              >
                <ActionButton
                  href="#assessment-form"
                  variant="assessment"
                  size="md"
                  icon={ArrowLeft}
                  className="
                    w-full

                    bg-brand-accent
                    text-white

                    shadow-[0_16px_38px_rgba(252,133,2,.18)]

                    hover:bg-[#eb7c01]

                    sm:w-auto
                    sm:min-w-[220px]
                  "
                >
                  شروع ارزیابی
                </ActionButton>

                <p
                  className="
                    text-[9px]
                    font-medium
                    leading-[1.9]

                    text-white/36

                    sm:max-w-[250px]
                  "
                >
                  مسیر نهایی هر پرونده بر اساس تناسب و نیاز واقعی آن مشخص
                  می‌شود.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* =======================================================
            Process composition
        ======================================================== */}

        <div
          className="
            mt-12

            grid
            gap-6

            sm:mt-14

            lg:mt-16
            lg:grid-cols-[0.34fr_0.66fr]
            lg:gap-7
          "
        >
          {/* =====================================================
              Left context panel
          ====================================================== */}

          <Reveal visible={visible} delay={170}>
            <aside
              className="
                group/context

                relative
                h-full
                min-h-[420px]
                overflow-hidden

                border
                border-white/12

                bg-white/[0.035]

                px-5
                py-6

                transition-[background-color,border-color,transform]
                duration-300

                hover:-translate-y-1
                hover:border-white/22
                hover:bg-white/[0.055]

                sm:px-7
                sm:py-7

                lg:px-8
                lg:py-8
              "
            >
              <span
                aria-hidden="true"
                className="
                  absolute
                  right-0
                  top-0

                  h-[3px]
                  w-14

                  bg-brand-accent

                  transition-[width]
                  duration-500

                  group-hover/context:w-full
                "
              />

              <p
                dir="ltr"
                className="
                  text-[7px]
                  font-black
                  tracking-[0.2em]

                  text-[#78c7df]
                "
              >
                THE DECISION PATH
              </p>

              <p
                className="
                  mt-7

                  text-[22px]
                  font-black
                  leading-[1.95]

                  text-white

                  sm:text-[25px]
                "
              >
                از شناخت مسئله،
                <br />
                تا ساختن یک{" "}
                <span className="text-brand-accent">مسیر تصمیم.</span>
              </p>

              <p
                className="
                  mt-6
                  max-w-[440px]

                  text-[11px]
                  font-medium
                  leading-[2.1]

                  text-white/47
                "
              >
                همه پرونده‌ها الزاماً به یک شکل یا با یک دامنه ادامه پیدا
                نمی‌کنند. Assessment کمک می‌کند مرحله بعد بر اساس خود مسئله
                تعیین شود.
              </p>

              {/* phase map */}

              <div
                className="
                  mt-10

                  border-t
                  border-white/12

                  pt-6
                "
              >
                <PhaseLine label="شناخت و تناسب" en="QUALIFY" tone="orange" />

                <PhaseLine label="گفت‌وگو و بررسی" en="REVIEW" tone="blue" />

                <PhaseLine
                  label="مسیر تصمیم و بازبینی"
                  en="FRAME & FOLLOW"
                  tone="teal"
                  last
                />
              </div>

              {/* note */}

              <div
                className="
                  mt-8

                  flex
                  items-start
                  gap-3

                  border-t
                  border-white/12

                  pt-5
                "
              >
                <ShieldCheck
                  aria-hidden="true"
                  className="
                    mt-1
                    h-4
                    w-4
                    shrink-0

                    text-[#7bc7df]
                  "
                  strokeWidth={1.5}
                />

                <p
                  className="
                    text-[9px]
                    font-medium
                    leading-[1.9]

                    text-white/38
                  "
                >
                  شروع Assessment به معنی تعهد به ادامه همکاری نیست؛ ابتدا تناسب
                  مسیر بررسی می‌شود.
                </p>
              </div>
            </aside>
          </Reveal>

          {/* =====================================================
              Process rail
          ====================================================== */}

          <div
            className="
              border-x
              border-t
              border-white/12

              bg-black/[0.05]
            "
          >
            {PROCESS_STEPS.map((step, index) => (
              <ProcessRow
                key={step.en}
                step={step}
                index={index}
                visible={visible}
                last={index === PROCESS_STEPS.length - 1}
              />
            ))}
          </div>
        </div>

        {/* =======================================================
            Next section cue
        ======================================================== */}

        <Reveal visible={visible} delay={700}>
          <div
            className="
              mt-6

              flex
              flex-col
              gap-5

              border-t
              border-white/12

              pt-6

              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div>
              <p
                dir="ltr"
                className="
                  text-[7px]
                  font-black
                  tracking-[0.18em]

                  text-brand-accent
                "
              >
                READY TO START?
              </p>

              <p
                className="
                  mt-2

                  text-[11px]
                  font-bold

                  text-white/65
                "
              >
                قدم بعدی، پاسخ به چند سؤال اولیه درباره موقعیت شماست.
              </p>
            </div>

            <ActionButton
              href="#assessment-form"
              variant="secondary"
              size="md"
              icon={ArrowLeft}
              className="
                w-full

                border-white/25
                bg-white/[0.045]

                text-white

                shadow-none

                hover:border-brand-accent/55
                hover:bg-brand-accent/[0.10]
 
                sm:w-auto
                sm:min-w-[210px]
              "
            >
              رفتن به فرم ارزیابی
            </ActionButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =============================================================================
   Process row
============================================================================= */

function ProcessRow({
  step,
  index,
  visible,
  last,
}: {
  step: ProcessStep;
  index: number;
  visible: boolean;
  last: boolean;
}) {
  const Icon = step.icon;
  const theme = getTone(step.tone);

  return (
    <article
      className={`
        group/step

        relative

        grid
        gap-5

        border-b
        border-white/12

        bg-white/[0.025]

        px-5
        py-6

        transition-[opacity,transform,background-color]
        duration-700
        ease-[cubic-bezier(.22,1,.36,1)]

        hover:bg-white/[0.065]

        sm:grid-cols-[72px_1fr_130px]
        sm:items-center
        sm:px-7

        lg:px-8
        lg:py-7

        ${visible ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}

        motion-reduce:translate-x-0
        motion-reduce:opacity-100
        motion-reduce:transition-none
      `}
      style={{
        transitionDelay: `${230 + index * 70}ms`,
      }}
    >
      {/* node */}

      <div
        className="
          relative

          flex
          items-center
          gap-3

          sm:block
        "
      >
        <span
          className={`
            relative
            z-10

            flex
            h-12
            w-12
            shrink-0

            items-center
            justify-center

            border

            text-[10px]
            font-black

            transition-[background-color,border-color,color,transform]
            duration-300

            group-hover/step:-translate-y-0.5

            ${theme.node}
          `}
        >
          {step.number}
        </span>

        <span
          className="
            text-[7px]
            font-black
            tracking-[0.14em]

            text-white/28

            sm:hidden
          "
          dir="ltr"
        >
          {step.en}
        </span>

        {!last && (
          <span
            aria-hidden="true"
            className="
              absolute
              right-[23px]
              top-12

              hidden
              h-[calc(100%+28px)]
              w-px

              bg-white/10

              transition-colors
              duration-300

              group-hover/step:bg-brand-accent/35

              sm:block
            "
          />
        )}
      </div>

      {/* content */}

      <div>
        <div
          className="
            flex
            flex-wrap
            items-center
            gap-x-3
            gap-y-1
          "
        >
          <span
            className={`
              flex
              h-8
              w-8
              items-center
              justify-center

              border

              transition-[background-color,color,border-color]
              duration-300

              ${theme.icon}
            `}
          >
            <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
          </span>

          <h3
            className="
              text-[13px]
              font-black

              text-white

              sm:text-[14px]
            "
          >
            {step.title}
          </h3>

          <span
            dir="ltr"
            className="
              hidden

              text-[6px]
              font-bold
              tracking-[0.16em]

              text-white/26

              sm:inline
            "
          >
            {step.en}
          </span>
        </div>

        <p
          className="
            mt-3
            max-w-[620px]

            text-[10px]
            font-medium
            leading-[2]

            text-white/45

            sm:text-[11px]
          "
        >
          {step.description}
        </p>
      </div>

      {/* outcome */}

      <div
        className="
          border-r
          border-white/12

          pr-4

          sm:text-left
        "
      >
        <p
          className="
            text-[7px]
            font-bold

            text-white/26
          "
        >
          خروجی مرحله
        </p>

        <p
          className={`
            mt-1.5

            text-[10px]
            font-black

            ${theme.text}
          `}
        >
          {step.outcome}
        </p>

        <span
          aria-hidden="true"
          className={`
            mt-3
            block

            h-[2px]
            w-6

            transition-[width]
            duration-300

            group-hover/step:w-12

            ${theme.line}
          `}
        />
      </div>
    </article>
  );
}

/* =============================================================================
   Phase line
============================================================================= */

function PhaseLine({
  label,
  en,
  tone,
  last = false,
}: {
  label: string;
  en: string;
  tone: "orange" | "blue" | "teal";
  last?: boolean;
}) {
  const colors = {
    orange: "bg-brand-accent",
    blue: "bg-[#69bdd7]",
    teal: "bg-[#3e93b1]",
  };

  return (
    <div
      className={`
        group/phase

        flex
        items-center
        justify-between
        gap-4

        py-4

        ${last ? "" : "border-b border-white/10"}
      `}
    >
      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        <span
          aria-hidden="true"
          className={`
            h-2
            w-2
            shrink-0

            transition-transform
            duration-300

            group-hover/phase:scale-125

            ${colors[tone]}
          `}
        />

        <span
          className="
            text-[10px]
            font-bold

            text-white/65
          "
        >
          {label}
        </span>
      </div>

      <span
        dir="ltr"
        className="
          text-[6px]
          font-bold
          tracking-[0.15em]

          text-white/25
        "
      >
        {en}
      </span>
    </div>
  );
}

/* =============================================================================
   Theme
============================================================================= */

function getTone(tone: ProcessTone) {
  switch (tone) {
    case "qualification":
      return {
        node: `
          border-brand-accent/35
          bg-brand-accent/[0.08]
          text-brand-accent

          group-hover/step:border-brand-accent
          group-hover/step:bg-brand-accent
          group-hover/step:text-white
        `,
        icon: `
          border-brand-accent/20
          text-brand-accent

          group-hover/step:border-brand-accent/50
          group-hover/step:bg-brand-accent/[0.10]
        `,
        text: "text-brand-accent",
        line: "bg-brand-accent",
      };

    case "review":
      return {
        node: `
          border-[#6abbd5]/30
          bg-[#6abbd5]/[0.06]
          text-[#87d0e6]

          group-hover/step:border-[#69bdd7]
          group-hover/step:bg-[#69bdd7]
          group-hover/step:text-[#032f3f]
        `,
        icon: `
          border-[#6abbd5]/20
          text-[#87d0e6]

          group-hover/step:border-[#6abbd5]/50
          group-hover/step:bg-[#6abbd5]/[0.10]
        `,
        text: "text-[#87d0e6]",
        line: "bg-[#69bdd7]",
      };

    default:
      return {
        node: `
          border-white/20
          bg-white/[0.04]
          text-white/70

          group-hover/step:border-white/50
          group-hover/step:bg-white
          group-hover/step:text-brand-primary
        `,
        icon: `
          border-white/15
          text-white/58

          group-hover/step:border-white/35
          group-hover/step:bg-white/[0.08]
          group-hover/step:text-white
        `,
        text: "text-white/78",
        line: "bg-white/55",
      };
  }
}

/* =============================================================================
   Reveal
============================================================================= */

function Reveal({
  children,
  visible,
  delay,
}: {
  children: ReactNode;
  visible: boolean;
  delay: number;
}) {
  return (
    <div
      className={`
        transition-[opacity,transform]
        duration-700
        ease-[cubic-bezier(.22,1,.36,1)]

        ${visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}

        motion-reduce:translate-y-0
        motion-reduce:opacity-100
        motion-reduce:transition-none
      `}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* =============================================================================
   Background
============================================================================= */

function Background() {
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
            "radial-gradient(circle at 14% 30%,rgba(22,115,148,.22),transparent 28%),linear-gradient(112deg,#022b39 0%,#033849 52%,#022f3e 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.09]
        "
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,.09) 1px,transparent 1px)",
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
