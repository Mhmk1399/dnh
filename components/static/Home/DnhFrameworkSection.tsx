import type { ReactNode } from "react";

type StepItem = {
  index: "01" | "02" | "03";
  title: string;
  english: string;
  description: string;
  glyph: ReactNode;
};

const STEPS: StepItem[] = [
  {
    index: "01",
    title: "هوشمندی داده",
    english: "DATA INTELLIGENCE",
    description:
      "شناخت دقیق شرایط از طریق داده‌ها، متغیرها، ریسک‌ها و اطلاعات مالی.",
    glyph: <DataGlyph />,
  },
  {
    index: "02",
    title: "راهبرد مسیر",
    english: "NAVIGATION STRATEGY",
    description:
      "تبدیل تحلیل و سناریوها به مسیر تصمیم‌گیری منسجم‌تر و قابل‌دفاع.",
    glyph: <NavigationGlyph />,
  },
  {
    index: "03",
    title: "معماری افق",
    english: "HORIZON ARCHITECTURE",
    description:
      "قرار دادن تصمیم‌های امروز در ساختار ثروت، اهداف و افق بلندمدت شما.",
    glyph: <HorizonGlyph />,
  },
];

export function DnhFrameworkSection() {
  return (
    <section
      dir="rtl"
      aria-labelledby="dnh-framework-title"
      className="
        relative
        isolate
        overflow-hidden
        border-t
        border-line
        bg-page
      "
      style={{
        background: `
          linear-gradient(
            180deg,
            #ffffff 0%,
            color-mix(in srgb, var(--dnh-primary) 4%, white) 58%,
            #ffffff 100%
          )
        `,
      }}
    >
      <FrameworkBackground />

      <div
        className="
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
          2xl:px-20
        "
      >
        {/* ============================================================
            Header / Intro
        ============================================================ */}
        <div className="ml-auto max-w-[620px] text-right">
          <div
            className="
              mb-5
              flex
              items-center
              gap-3
            "
          >
            <span aria-hidden="true" className="h-px w-10 bg-brand-accent" />

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
              max-w-[560px]
              text-[32px]
              font-black
              leading-[1.5]
              tracking-[-0.04em]
              text-ink
              sm:text-[40px]
              lg:text-[54px]
              lg:leading-[1.38]
              xl:text-[64px]
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
            در DNH، داده به‌تنهایی تصمیم نمی‌سازد؛ ارزش زمانی شکل می‌گیرد که
            داده‌ها، ریسک‌ها، سناریوها، اهداف و ساختار مالی در یک مسیر منسجم
            قرار بگیرند و به تصمیمی روشن، قابل‌دفاع و هم‌راستا با افق شما منتهی
            شوند.
          </p>
        </div>

        {/* ============================================================
            Structured process
        ============================================================ */}
        <div
          className="
            relative
            mt-14
            border-t
            border-line
            pt-8
            sm:mt-16
            sm:pt-10
            lg:mt-20
            lg:pt-12
          "
        >
          {/* desktop axis */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-0
              right-0
              top-[92px]
              hidden
              h-px
              bg-line
              lg:block
            "
          />

          {/* desktop orange direction markers */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-[33.333%]
              top-[92px]
              hidden
              h-px
              w-[56px]
              -translate-x-1/2
              bg-brand-accent
              lg:block
            "
          />
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-[66.666%]
              top-[92px]
              hidden
              h-px
              w-[56px]
              -translate-x-1/2
              bg-brand-accent
              lg:block
            "
          />

          <div
            className="
              flex
              flex-col
              gap-6
              lg:flex-row
              lg:gap-0
            "
          >
            {STEPS.map((step, index) => (
              <StepBlock
                key={step.index}
                step={step}
                isLast={index === STEPS.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   Step block
============================================================================= */

function StepBlock({ step, isLast }: { step: StepItem; isLast: boolean }) {
  return (
    <article
      className={`
        relative
        border
        border-line
        bg-white/70
        px-4
        py-5
        backdrop-blur-[2px]

        sm:px-5
        sm:py-6

        lg:min-h-[250px]
        lg:flex-1
        lg:border-y-0
        lg:border-r-0
        lg:bg-transparent
        lg:px-8
        lg:py-0

        ${!isLast ? "lg:border-l" : ""}
      `}
    >
      {/* mobile connector */}
      {!isLast ? (
        <div
          aria-hidden="true"
          className="
            mt-5
            flex
            items-center
            gap-3
            lg:hidden
          "
        >
          <span className="h-px flex-1 bg-line" />
          <span className="h-px w-10 bg-brand-accent" />
        </div>
      ) : null}

      <div className="text-right">
        <div
          className="
            flex
            items-end
            justify-between
            gap-4
          "
        >
          <div className="shrink-0">{step.glyph}</div>

          <div className="min-w-0">
            <div
              dir="ltr"
              className="
                text-right
                text-[38px]
                font-black
                leading-none
                tracking-[-0.04em]
                text-brand-primary
                sm:text-[44px]
                lg:text-[50px]
              "
            >
              {step.index}
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h3
            className="
              text-[22px]
              font-black
              leading-[1.6]
              tracking-[-0.025em]
              text-ink
              sm:text-[24px]
            "
          >
            {step.title}
          </h3>

          <p
            dir="ltr"
            className="
              mt-1
              text-[11px]
              font-bold
              uppercase
              tracking-[0.08em]
              text-ink-muted
              sm:text-[12px]
            "
          >
            {step.english}
          </p>

          <div
            aria-hidden="true"
            className="
              mt-4
              h-8
              w-px
              bg-brand-accent
            "
          />

          <p
            className="
              mt-4
              max-w-[320px]
              text-[13px]
              font-medium
              leading-[2]
              text-ink-muted
              sm:text-[14px]
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
   Background
============================================================================= */

function FrameworkBackground() {
  return (
    <>
      {/* main architectural svg */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          overflow-hidden
        "
      >
        <svg
          viewBox="0 0 1600 920"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="dnh-fw-surface" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(22,115,148,0.08)" />
              <stop offset="100%" stopColor="rgba(22,115,148,0.02)" />
            </linearGradient>

            <linearGradient id="dnh-fw-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(21,114,147,0.00)" />
              <stop offset="30%" stopColor="rgba(21,114,147,0.22)" />
              <stop offset="70%" stopColor="rgba(21,114,147,0.10)" />
              <stop offset="100%" stopColor="rgba(21,114,147,0.00)" />
            </linearGradient>

            <pattern
              id="dnh-fw-grid"
              width="18"
              height="18"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M18 0H0V18"
                stroke="rgba(21,114,147,0.05)"
                strokeWidth="1"
              />
            </pattern>
          </defs>

          {/* background zones */}
          <rect
            x="0"
            y="0"
            width="1600"
            height="920"
            fill="rgba(255,255,255,0.45)"
          />
          <rect
            x="0"
            y="0"
            width="920"
            height="500"
            fill="url(#dnh-fw-grid)"
            opacity="0.45"
          />

          {/* large structural planes */}
          <path
            d="M0 130L1600 80"
            stroke="url(#dnh-fw-line)"
            strokeWidth="1.5"
          />
          <path
            d="M0 290L1600 255"
            stroke="url(#dnh-fw-line)"
            strokeWidth="1"
          />
          <path
            d="M0 540H1600"
            stroke="rgba(21,114,147,0.10)"
            strokeWidth="1"
          />

          {/* left architecture cluster */}
          <rect
            x="150"
            y="110"
            width="50"
            height="390"
            fill="url(#dnh-fw-surface)"
            stroke="rgba(21,114,147,0.34)"
            strokeWidth="1.2"
          />
          <rect
            x="215"
            y="145"
            width="86"
            height="355"
            fill="url(#dnh-fw-surface)"
            stroke="rgba(21,114,147,0.28)"
            strokeWidth="1.1"
          />
          <rect
            x="334"
            y="210"
            width="120"
            height="290"
            fill="url(#dnh-fw-surface)"
            stroke="rgba(21,114,147,0.24)"
            strokeWidth="1.1"
          />
          <rect
            x="485"
            y="252"
            width="68"
            height="248"
            fill="url(#dnh-fw-surface)"
            stroke="rgba(21,114,147,0.20)"
            strokeWidth="1.1"
          />
          <rect
            x="585"
            y="286"
            width="148"
            height="214"
            fill="url(#dnh-fw-surface)"
            stroke="rgba(21,114,147,0.18)"
            strokeWidth="1.1"
          />

          {/* floor lines */}
          <path
            d="M0 500H1600"
            stroke="rgba(21,114,147,0.14)"
            strokeWidth="1"
          />
          <path
            d="M170 500L1600 500"
            stroke="rgba(252,133,2,0.30)"
            strokeWidth="1.2"
          />
          <path
            d="M140 500L1550 760"
            stroke="rgba(21,114,147,0.12)"
            strokeWidth="1"
          />
          <path
            d="M235 500L1600 675"
            stroke="rgba(21,114,147,0.10)"
            strokeWidth="1"
          />

          {/* light frame lines */}
          <path d="M200 0V500" stroke="rgba(21,114,147,0.12)" strokeWidth="1" />
          <path d="M470 0V500" stroke="rgba(21,114,147,0.08)" strokeWidth="1" />
          <path d="M710 0V500" stroke="rgba(21,114,147,0.08)" strokeWidth="1" />
          <path d="M920 0V500" stroke="rgba(21,114,147,0.06)" strokeWidth="1" />

          {/* accent square markers */}
          <rect
            x="165"
            y="132"
            width="10"
            height="10"
            fill="rgba(252,133,2,0.95)"
          />
          <rect
            x="338"
            y="267"
            width="8"
            height="8"
            fill="rgba(252,133,2,0.92)"
          />
          <rect
            x="570"
            y="324"
            width="7"
            height="7"
            fill="rgba(252,133,2,0.92)"
          />
          <rect
            x="930"
            y="685"
            width="7"
            height="7"
            fill="rgba(227,48,48,0.90)"
          />

          {/* right calm panel tone */}
          <rect
            x="960"
            y="0"
            width="640"
            height="500"
            fill="rgba(255,255,255,0.58)"
          />

          {/* process line band behind steps */}
          <rect
            x="0"
            y="570"
            width="1600"
            height="260"
            fill="rgba(255,255,255,0.35)"
          />
          <path
            d="M120 660H1480"
            stroke="rgba(21,114,147,0.10)"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* soft overlay for readability */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
        "
        style={{
          background: `
            linear-gradient(
              90deg,
              rgba(255,255,255,0.28) 0%,
              rgba(255,255,255,0.16) 36%,
              rgba(255,255,255,0.64) 64%,
              rgba(255,255,255,0.92) 100%
            )
          `,
        }}
      />
    </>
  );
}

/* =============================================================================
   Mini glyphs
============================================================================= */

function DataGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 76 44"
      className="h-11 w-[76px]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 40V4" stroke="rgba(21,114,147,0.18)" strokeWidth="1" />
      <path d="M18 40V12" stroke="rgba(21,114,147,0.28)" strokeWidth="1.3" />
      <path d="M32 40V18" stroke="rgba(21,114,147,0.36)" strokeWidth="1.5" />
      <path d="M46 40V7" stroke="rgba(21,114,147,0.40)" strokeWidth="1.6" />
      <path d="M60 40V22" stroke="rgba(21,114,147,0.24)" strokeWidth="1.3" />
      <path d="M72 40V15" stroke="rgba(21,114,147,0.20)" strokeWidth="1.2" />
      <rect x="16" y="29" width="4" height="4" fill="rgba(252,133,2,0.95)" />
      <rect x="44" y="19" width="4" height="4" fill="rgba(252,133,2,0.95)" />
      <rect x="68" y="27" width="4" height="4" fill="rgba(252,133,2,0.95)" />
    </svg>
  );
}

function NavigationGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 84 44"
      className="h-11 w-[84px]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 34H68" stroke="rgba(21,114,147,0.18)" strokeWidth="1.2" />
      <path d="M20 8H80" stroke="rgba(21,114,147,0.26)" strokeWidth="1.1" />
      <path
        d="M4 34L30 21L52 26L80 10"
        stroke="rgba(21,114,147,0.44)"
        strokeWidth="1.5"
      />
      <path d="M70 10H80V20" stroke="rgba(252,133,2,0.95)" strokeWidth="1.4" />
      <rect x="27" y="19" width="5" height="5" fill="rgba(252,133,2,0.95)" />
    </svg>
  );
}

function HorizonGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 86 44"
      className="h-11 w-[86px]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="12"
        y="25"
        width="50"
        height="11"
        fill="rgba(21,114,147,0.10)"
        stroke="rgba(21,114,147,0.26)"
      />
      <rect
        x="20"
        y="16"
        width="50"
        height="11"
        fill="rgba(21,114,147,0.08)"
        stroke="rgba(21,114,147,0.24)"
      />
      <rect
        x="28"
        y="7"
        width="50"
        height="11"
        fill="rgba(21,114,147,0.06)"
        stroke="rgba(21,114,147,0.22)"
      />
      <path d="M4 38H82" stroke="rgba(21,114,147,0.18)" strokeWidth="1" />
      <rect x="58" y="3" width="5" height="5" fill="rgba(252,133,2,0.95)" />
    </svg>
  );
}
