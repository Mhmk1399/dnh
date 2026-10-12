"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import { ActionButton } from "@/components/ui/ActionButton";
import { ArrowLeft } from "lucide-react";

/* =============================================================================
   CONFIG
============================================================================= */
function InstagramIcon({ size = 17, strokeWidth = 1.65 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      aria-hidden="true"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.5" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon({ size = 17, strokeWidth = 1.65 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      aria-hidden="true"
    >
      <circle cx="6.2" cy="6.3" r="1.3" fill="currentColor" stroke="none" />
      <path
        d="M5 9.5V19M10 19V9.5M10 13.4C10.7 11 12.1 9.5 14.5 9.5C17.2 9.5 19 11.2 19 14.4V19"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type WealthClearerPictureSectionProps = {
  assessmentHref?: string;
  consultationHref?: string;

  /**
   * اگر Footer اصلی پروژه را بلافاصله بعد از این سکشن Render می‌کنی:
   * false بگذار.
   *
   * اگر می‌خواهی دقیقاً Footer کوچک داخل Reference را هم ببینی:
   * true بگذار.
   */
  showReferenceFooterBand?: boolean;
};

const SUMMARY_ITEMS = [
  "دارایی‌ها",
  "ریسک",
  "نقدینگی",
  "اهداف",
  "زمان",
  "تصمیم‌ها",
] as const;

const VISUAL_LABELS = [
  {
    title: "دارایی‌ها",
    left: "8%",
    top: "82%",
  },
  {
    title: "ریسک",
    left: "24%",
    top: "76%",
  },
  {
    title: "نقدینگی",
    left: "35%",
    top: "69%",
  },
  {
    title: "اهداف",
    left: "45%",
    top: "64%",
  },
  {
    title: "زمان",
    left: "54%",
    top: "60%",
  },
  {
    title: "تصمیم‌های مالی",
    left: "63%",
    top: "56%",
  },
] as const;

/* =============================================================================
   COMPONENT
============================================================================= */

export function WealthClearerPictureSection({
  assessmentHref = "/assessment",
  consultationHref = "/consultation",
  showReferenceFooterBand = false,
}: WealthClearerPictureSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;

    if (!node) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotion.matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setVisible(true);
        observer.disconnect();
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="clearer-picture"
      dir="rtl"
      aria-labelledby="clearer-picture-title"
      data-visible={visible}
      className="
        clearer-picture
        relative
        isolate
        scroll-mt-24
        overflow-hidden

        border-t
        border-brand-primary/40

        bg-page
      "
    >
      <SectionBackground />

      {/* =========================================================
          MAIN
      ========================================================== */}

      <div
        className="
          relative
          z-10

          mx-auto
          grid
          w-full
          max-w-[1600px]

          gap-10

          px-5
          pb-24
          pt-14

          sm:px-8
          sm:pb-28
          sm:pt-16

          lg:min-h-[720px]
          lg:grid-cols-[1.12fr_0.88fr]
          lg:items-center
          lg:gap-12
          lg:px-12
          lg:pb-28
          lg:pt-20

          xl:grid-cols-[1.16fr_0.84fr]
          xl:gap-16
          xl:px-16

          2xl:px-20
        "
      >
        {/* =======================================================
            CONTENT
        ======================================================== */}

        <div
          className="
            order-1

            lg:col-start-1
            lg:row-start-1
          "
        >
          {/* eyebrow */}

          <div
            className="
              clearer-content
              clearer-content-1

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
                text-brand-primary

                sm:text-[11px]
              "
            >
              تصویر روشن‌تر
            </span>
          </div>

          {/* title */}

          <h2
            id="clearer-picture-title"
            className="
              clearer-content
              clearer-content-2

              max-w-[650px]

              text-[32px]
              font-black
              leading-[1.62]
              tracking-[-0.045em]

              text-ink

              sm:text-[40px]

              lg:text-[46px]

              xl:text-[52px]
            "
          >
            وقتی اجزا کنار هم دیده شوند،
            <br />
            <span className="text-brand-accent">تصمیم روشن‌تر</span> می‌شود.
          </h2>

          {/* body */}

          <div
            className="
              clearer-content
              clearer-content-3

              mt-6
              max-w-[650px]

              space-y-2

              text-[13px]
              font-medium
              leading-[2.15]

              text-ink-muted

              sm:text-[14px]

              lg:text-[15px]
            "
          >
            <p>
              هدف از معماری ثروت، صرفاً بررسی جداگانه دارایی‌ها نیست؛ بلکه دیدن
              آن‌ها در ارتباط با اهداف، ریسک‌ها، نقدینگی، افق زمانی و تصمیم‌های
              مالی است.
            </p>

            <p>
              این نگاه می‌تواند تصویری منسجم‌تر برای بررسی و انتخاب مسیر
              تصمیم‌های مالی شما ایجاد کند.
            </p>
          </div>

          {/* =====================================================
              SUMMARY RAIL
          ====================================================== */}

          <div
            className="
              clearer-content
              clearer-content-4

              mt-8

              hidden

              lg:block
            "
          >
            <SummaryRail />
          </div>

          {/* =====================================================
              SUPPORT COPY
          ====================================================== */}

          <div
            className="
              clearer-content
              clearer-content-5

              mt-8

              border-t
              border-line

              pt-5
            "
          >
            <p
              className="
                max-w-[630px]

                text-[12px]
                font-medium
                leading-[2]

                text-ink-muted

                sm:text-[13px]
              "
            >
              اگر می‌خواهید ساختار فعلی ثروت و تصمیم‌های مالی خود را از یک زاویه
              منسجم‌تر بررسی کنید، می‌توانید از اینجا شروع کنید.
            </p>
          </div>

          {/* =====================================================
              CTA
          ====================================================== */}

          <div
            className="
              clearer-content
              clearer-content-6

              mt-6
              flex
              flex-col
              gap-3

              sm:flex-row
              sm:flex-wrap
              sm:items-center
            "
          >
            <ActionButton
              href={assessmentHref}
              variant="assessment"
              size="md"
              icon={ArrowLeft}
              className="
                w-full

                bg-brand-accent
                text-white

                shadow-[0_16px_36px_color-mix(in_srgb,var(--dnh-accent)_24%,transparent)]

                hover:bg-[#ec7d01]

                sm:w-auto
                sm:min-w-[245px]
              "
            >
              ارزیابی اولیه ساختار ثروت
            </ActionButton>

            <ActionButton
              href={consultationHref}
              variant="secondary"
              size="md"
              icon={ArrowLeft}
              className="
                w-full

                border-line-strong
                bg-transparent
                text-brand-primary

                shadow-none

                hover:bg-surface-soft

                sm:w-auto
                sm:min-w-[220px]
              "
            >
              درخواست مشاوره راهبردی
            </ActionButton>
          </div>
        </div>

        {/* =======================================================
            VISUAL
        ======================================================== */}

        <div
          className="
            order-2

            lg:col-start-2
            lg:row-start-1
          "
        >
          <ConvergingPictureVisual />
        </div>

        {/* =======================================================
            MOBILE SUMMARY
        ======================================================== */}

        <div
          className="
            order-3

            lg:hidden
          "
        >
          <MobileSummaryRail />
        </div>
      </div>

      {/* =========================================================
          FOOTER FADE
      ========================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-x-0
          bottom-0
          z-[2]

          h-[150px]

          bg-gradient-to-b
          from-transparent
          via-[color-mix(in_srgb,var(--dnh-primary)_10%,transparent)]
          to-[#03405a]
        "
      />

      {showReferenceFooterBand ? <ReferenceFooterBand /> : null}

      <MotionStyles />
    </section>
  );
}

/* =============================================================================
   VISUAL
============================================================================= */

function ConvergingPictureVisual() {
  return (
    <div
      aria-hidden="true"
      className="
        clearer-visual

        group/clearer

        relative
        mx-auto

        aspect-[1.18/1]
        w-full
        max-w-[800px]

        select-none

        lg:max-w-[860px]
      "
    >
      {/* =========================================================
          SVG
      ========================================================== */}

      <svg
        viewBox="0 0 900 720"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="
          absolute
          inset-0

          h-full
          w-full

          overflow-visible
        "
      >
        <defs>
          <linearGradient id="clearer-plane" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a8e9fa" stopOpacity="0.04" />

            <stop offset="52%" stopColor="#60c4e4" stopOpacity="0.14" />

            <stop offset="100%" stopColor="#167394" stopOpacity="0.025" />
          </linearGradient>

          <linearGradient id="clearer-plane-strong" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8cddf4" stopOpacity="0.11" />

            <stop offset="100%" stopColor="#167394" stopOpacity="0.035" />
          </linearGradient>

          <linearGradient id="clearer-edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#167394" stopOpacity="0.18" />

            <stop offset="50%" stopColor="#167394" stopOpacity="0.82" />

            <stop offset="100%" stopColor="#167394" stopOpacity="0.28" />
          </linearGradient>

          <pattern
            id="clearer-grid"
            width="38"
            height="38"
            patternUnits="userSpaceOnUse"
          >
            <path d="M38 0H0V38" stroke="#167394" strokeOpacity="0.035" />
          </pattern>
        </defs>

        {/* =======================================================
            GRID
        ======================================================== */}

        <rect
          x="20"
          y="10"
          width="850"
          height="680"
          fill="url(#clearer-grid)"
          className="clearer-grid"
        />

        {/* =======================================================
            ARCHITECTURAL GUIDE LINES
        ======================================================== */}

        <g
          className="clearer-guides"
          stroke="#167394"
          strokeOpacity="0.085"
          strokeWidth="1"
        >
          <path d="M56 98L451 254L840 96" />
          <path d="M45 174L451 320L855 172" />
          <path d="M32 252L451 390L868 249" />

          <path d="M73 586L451 430L832 585" />
          <path d="M48 510L451 360L854 509" />

          <path d="M88 45L753 671" />
          <path d="M214 29L815 594" />

          <path d="M807 43L179 671" />
          <path d="M874 135L321 668" />
        </g>

        {/* =======================================================
            VERTICAL GUIDES
        ======================================================== */}

        <g stroke="#167394" strokeOpacity="0.11">
          <line x1="105" y1="22" x2="105" y2="642" />
          <line x1="218" y1="18" x2="218" y2="650" />
          <line x1="338" y1="24" x2="338" y2="656" />
          <line x1="451" y1="10" x2="451" y2="665" />
          <line x1="569" y1="26" x2="569" y2="652" />
          <line x1="681" y1="18" x2="681" y2="646" />
        </g>

        {/* =======================================================
            LEFT GHOST FIELD
        ======================================================== */}

        <g className="clearer-ghost-field">
          <polygon
            points="52,244 180,188 180,482 52,538"
            fill="url(#clearer-plane)"
            stroke="#167394"
            strokeOpacity="0.12"
          />

          <polygon
            points="88,230 216,175 216,465 88,521"
            fill="url(#clearer-plane)"
            stroke="#167394"
            strokeOpacity="0.12"
          />
        </g>

        {/* =======================================================
            FRAME 01
        ======================================================== */}

        <g className="clearer-frame clearer-frame-1">
          <polygon
            points="
              110,188
              264,121
              264,511
              110,576
            "
            fill="url(#clearer-plane)"
            stroke="url(#clearer-edge)"
            strokeWidth="2"
          />

          <polygon
            points="
              110,188
              127,195
              127,561
              110,576
            "
            fill="#167394"
            fillOpacity="0.055"
          />

          <line
            x1="264"
            y1="121"
            x2="264"
            y2="511"
            stroke="#167394"
            strokeOpacity="0.72"
            strokeWidth="1.8"
          />
        </g>

        {/* =======================================================
            FRAME 02
        ======================================================== */}

        <g className="clearer-frame clearer-frame-2">
          <polygon
            points="
              230,218
              374,157
              374,483
              230,545
            "
            fill="url(#clearer-plane)"
            stroke="url(#clearer-edge)"
            strokeWidth="1.7"
          />

          <polygon
            points="
              230,218
              247,225
              247,530
              230,545
            "
            fill="#167394"
            fillOpacity="0.045"
          />

          <line
            x1="374"
            y1="157"
            x2="374"
            y2="483"
            stroke="#167394"
            strokeOpacity="0.7"
            strokeWidth="1.6"
          />
        </g>

        {/* =======================================================
            FRAME 03
        ======================================================== */}

        <g className="clearer-frame clearer-frame-3">
          <polygon
            points="
              342,246
              470,193
              470,456
              342,510
            "
            fill="url(#clearer-plane-strong)"
            stroke="url(#clearer-edge)"
            strokeWidth="1.55"
          />

          <line
            x1="470"
            y1="193"
            x2="470"
            y2="456"
            stroke="#167394"
            strokeOpacity="0.74"
            strokeWidth="1.45"
          />
        </g>

        {/* =======================================================
            FRAME 04
        ======================================================== */}

        <g className="clearer-frame clearer-frame-4">
          <polygon
            points="
              435,271
              545,225
              545,430
              435,477
            "
            fill="url(#clearer-plane-strong)"
            stroke="url(#clearer-edge)"
            strokeWidth="1.45"
          />

          <line
            x1="545"
            y1="225"
            x2="545"
            y2="430"
            stroke="#167394"
            strokeOpacity="0.78"
            strokeWidth="1.35"
          />
        </g>

        {/* =======================================================
            CENTER FIELD
        ======================================================== */}

        <g className="clearer-center-field">
          <polygon
            points="
              505,291
              595,253
              595,407
              505,446
            "
            fill="#ffffff"
            fillOpacity="0.16"
            stroke="#167394"
            strokeOpacity="0.3"
          />

          <polygon
            points="
              530,303
              596,275
              596,388
              530,416
            "
            fill="#9de3f5"
            fillOpacity="0.12"
            stroke="#167394"
            strokeOpacity="0.18"
          />
        </g>

        {/* =======================================================
            ORANGE AXIS
        ======================================================== */}

        <line
          className="clearer-axis"
          x1="98"
          y1="347"
          x2="634"
          y2="347"
          stroke="var(--dnh-accent)"
          strokeOpacity="0.72"
          strokeWidth="1.3"
        />

        {/* =======================================================
            FINAL MARKER
        ======================================================== */}

        <g className="clearer-final-marker">
          <rect
            x="624"
            y="334"
            width="26"
            height="26"
            fill="#ffffff"
            stroke="var(--dnh-accent)"
            strokeWidth="2"
          />

          <rect
            x="631"
            y="341"
            width="12"
            height="12"
            fill="var(--dnh-accent)"
          />
        </g>

        {/* marker label line */}

        <line
          x1="650"
          y1="347"
          x2="690"
          y2="347"
          stroke="#167394"
          strokeOpacity="0.34"
        />

        {/* =======================================================
            LOWER CONNECTORS
        ======================================================== */}

        <g stroke="#167394" strokeOpacity="0.36">
          <path d="M133 540V632" />
          <path d="M267 509V603" />
          <path d="M375 483V581" />
          <path d="M470 456V554" />
          <path d="M545 430V526" />
          <path d="M595 407V500" />
        </g>

        {/* nodes */}

        <g fill="#167394">
          <rect x="130" y="627" width="5" height="5" />
          <rect x="264" y="598" width="5" height="5" />
          <rect x="372" y="576" width="5" height="5" />
          <rect x="467" y="549" width="5" height="5" />
          <rect x="542" y="521" width="5" height="5" />
          <rect x="592" y="495" width="5" height="5" />
        </g>
      </svg>

      {/* =========================================================
          FINAL LABEL
      ========================================================== */}

      <div
        className="
          clearer-picture-label

          absolute
          left-[72%]
          top-[46%]

          hidden
          -translate-y-1/2

          items-center
          gap-3

          lg:flex
        "
      >
        <span
          className="
            text-[11px]
            font-black
            leading-5
            text-ink
          "
        >
          تصویر
          <br />
          منسجم‌تر
        </span>
      </div>

      {/* =========================================================
          DESKTOP LABELS
      ========================================================== */}

      {VISUAL_LABELS.map((item, index) => (
        <div
          key={item.title}
          className="
            clearer-visual-label

            absolute
            z-20

            hidden

            lg:block
          "
          style={
            {
              left: item.left,
              top: item.top,

              "--clearer-label-delay": `${650 + index * 60}ms`,
            } as CSSProperties
          }
        >
          <span
            className="
              whitespace-nowrap

              text-[11px]
              font-bold
              text-brand-primary
            "
          >
            {item.title}
          </span>
        </div>
      ))}

      {/* =========================================================
          MOBILE MINI TITLE
      ========================================================== */}

      <div
        className="
          absolute
          bottom-[8%]
          left-1/2

          -translate-x-1/2

          lg:hidden
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <span className="h-2 w-2 bg-brand-accent" />

          <span
            className="
              whitespace-nowrap
              text-[10px]
              font-black
              text-ink
            "
          >
            تصویر منسجم‌تر
          </span>
        </div>
      </div>
    </div>
  );
}

/* =============================================================================
   SUMMARY
============================================================================= */

function SummaryRail() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="
          absolute
          left-1
          right-1
          top-[29px]

          h-px

          bg-brand-primary/30
        "
      />

      <div
        className="
          grid
          grid-cols-[repeat(6,minmax(0,1fr))_1.3fr]
          items-start
          gap-1
        "
      >
        {SUMMARY_ITEMS.map((item, index) => (
          <div
            key={item}
            className="
              group/summary

              relative

              flex
              flex-col
              items-center

              text-center
            "
          >
            <span
              className="
                mb-3

                text-[11px]
                font-black

                text-ink
              "
            >
              {item}
            </span>

            <span
              aria-hidden="true"
              className="
                relative
                z-10

                flex
                h-[12px]
                w-[12px]

                items-center
                justify-center

                border
                border-brand-primary/65

                bg-page

                transition-[border-color,background-color]
                duration-300

                group-hover/summary:border-brand-accent
              "
            >
              <span
                className="
                  h-[4px]
                  w-[4px]

                  bg-brand-primary

                  transition-colors
                  duration-300

                  group-hover/summary:bg-brand-accent
                "
              />
            </span>
          </div>
        ))}

        <div
          className="
            relative
            flex
            flex-col
            items-end

            pr-2
            text-right
          "
        >
          <span className="mb-[10px] h-[18px]" />

          <span
            aria-hidden="true"
            className="
              relative
              z-10

              flex
              h-6
              w-6
              items-center
              justify-center

              bg-brand-accent

              shadow-[0_8px_18px_color-mix(in_srgb,var(--dnh-accent)_23%,transparent)]
            "
          >
            <span className="h-2 w-2 bg-white" />
          </span>

          <span
            className="
              mt-2

              text-[11px]
              font-black
              leading-5

              text-ink
            "
          >
            تصویر
            <br />
            منسجم‌تر
          </span>
        </div>
      </div>
    </div>
  );
}

function MobileSummaryRail() {
  return (
    <div
      className="
        border-y
        border-line

        py-5
      "
    >
      <div
        className="
          grid
          grid-cols-3
          gap-x-3
          gap-y-5
        "
      >
        {SUMMARY_ITEMS.map((item) => (
          <div
            key={item}
            className="
              flex
              flex-col
              items-center
              gap-2
            "
          >
            <span
              className="
                text-[11px]
                font-black
                text-ink
              "
            >
              {item}
            </span>

            <span
              className="
                flex
                h-3
                w-3
                items-center
                justify-center

                border
                border-brand-primary/60
              "
            >
              <span className="h-1 w-1 bg-brand-primary" />
            </span>
          </div>
        ))}
      </div>

      <div
        className="
          mt-5

          flex
          items-center
          justify-center
          gap-3

          border-t
          border-line

          pt-4
        "
      >
        <span
          className="
            flex
            h-5
            w-5
            items-center
            justify-center

            bg-brand-accent
          "
        >
          <span className="h-1.5 w-1.5 bg-white" />
        </span>

        <span
          className="
            text-[11px]
            font-black
            text-ink
          "
        >
          تصویر منسجم‌تر
        </span>
      </div>
    </div>
  );
}

/* =============================================================================
   BACKGROUND
============================================================================= */

function SectionBackground() {
  return (
    <>
      {/* base */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
        "
        style={{
          background: `
            linear-gradient(
              110deg,
              color-mix(
                in srgb,
                var(--dnh-primary) 5%,
                white
              ) 0%,
              #ffffff 45%,
              #ffffff 100%
            )
          `,
        }}
      />

      {/* grid */}

      <div
        aria-hidden="true"
        className="
          clearer-background-grid

          pointer-events-none
          absolute
          inset-0

          opacity-[0.36]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              color-mix(
                in srgb,
                var(--dnh-primary) 5%,
                transparent
              ) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              color-mix(
                in srgb,
                var(--dnh-primary) 3%,
                transparent
              ) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "86px 86px",

          maskImage:
            "linear-gradient(to bottom, black 0%, rgba(0,0,0,.72) 68%, transparent 100%)",

          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, rgba(0,0,0,.72) 68%, transparent 100%)",
        }}
      />

      {/* left atmosphere */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          bottom-[3%]
          left-[2%]

          h-[300px]
          w-[560px]

          bg-brand-primary/[0.07]

          blur-[110px]
        "
      />

      {/* bottom cyan */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-x-0
          bottom-0

          h-[200px]

          bg-[linear-gradient(180deg,transparent,color-mix(in_srgb,var(--dnh-primary)_17%,transparent))]
        "
      />

      {/* top tiny marker */}

      <span
        aria-hidden="true"
        className="
          absolute
          left-[48%]
          top-0

          h-2
          w-[2px]

          bg-brand-accent
        "
      />
    </>
  );
}

/* =============================================================================
   OPTIONAL REFERENCE FOOTER
============================================================================= */

function ReferenceFooterBand() {
  return (
    <footer
      className="
        relative
        z-20

        border-t
        border-white/10

        bg-[#03405a]

        px-5
        py-6

        text-white

        sm:px-8

        lg:px-12

        xl:px-16
      "
    >
      <div
        className="
          mx-auto
          flex
          w-full
          max-w-[1536px]

          flex-col
          gap-6

          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        {/* logo placeholder */}

        <div
          dir="ltr"
          className="
            flex
            items-center
            gap-3
          "
        >
          <span
            className="
              text-[30px]
              font-semibold
              tracking-[-0.04em]
            "
          >
            DNH
          </span>

          <span
            className="
              h-7
              w-px

              bg-white/20
            "
          />

          <span
            className="
              text-[11px]
              font-bold
              uppercase
              leading-[1.7]
              tracking-[0.32em]

              text-white/72
            "
          >
            PRIVATE WEALTH
            <br />
            ARCHITECTURE
          </span>
        </div>

        {/* navigation */}

        <nav
          aria-label="دسترسی سریع"
          className="
            flex
            flex-wrap
            items-center
            gap-x-8
            gap-y-3
          "
        >
          <FooterLink href="/">خانه</FooterLink>

          <FooterLink href="/about">درباره ما</FooterLink>

          <FooterLink href="/services">خدمات</FooterLink>

          <FooterLink href="/knowledge">دانش و بینش</FooterLink>

          <FooterLink href="/contact">تماس با ما</FooterLink>
        </nav>

        {/* socials */}

        <div
          className="
            flex
            items-center
            gap-3

            border-r
            border-white/16

            pr-5
          "
        >
          <a
            href="#"
            aria-label="لینکدین DNH"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center

              text-white/76

              transition-colors
              duration-300

              hover:text-brand-accent

              focus-visible:outline-none
              focus-visible:ring-4
              focus-visible:ring-focus/25
            "
          >
            <LinkedinIcon strokeWidth={1.6} />
          </a>

          <a
            href="#"
            aria-label="اینستاگرام DNH"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center

              text-white/76

              transition-colors
              duration-300

              hover:text-brand-accent

              focus-visible:outline-none
              focus-visible:ring-4
              focus-visible:ring-focus/25
            "
          >
            <InstagramIcon strokeWidth={1.6} />
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="
        text-[10px]
        font-medium

        text-white/70

        transition-colors
        duration-300

        hover:text-white

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-focus/30
      "
    >
      {children}
    </Link>
  );
}

/* =============================================================================
   MOTION
============================================================================= */

function MotionStyles() {
  return (
    <style>{`
      /* ==========================================================
         CONTENT
      =========================================================== */

      .clearer-content {
        opacity: 0;
        transform: translate3d(0, 12px, 0);

        transition:
          opacity 620ms cubic-bezier(.22, 1, .36, 1),
          transform 620ms cubic-bezier(.22, 1, .36, 1);
      }

      .clearer-picture[data-visible="true"] .clearer-content {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }

      .clearer-content-1 {
        transition-delay: 60ms;
      }

      .clearer-content-2 {
        transition-delay: 120ms;
      }

      .clearer-content-3 {
        transition-delay: 190ms;
      }

      .clearer-content-4 {
        transition-delay: 260ms;
      }

      .clearer-content-5 {
        transition-delay: 330ms;
      }

      .clearer-content-6 {
        transition-delay: 400ms;
      }

      /* ==========================================================
         GRID
      =========================================================== */

      .clearer-background-grid,
      .clearer-grid,
      .clearer-guides {
        opacity: 0;

        transition:
          opacity 800ms ease;
      }

      .clearer-picture[data-visible="true"]
      .clearer-background-grid {
        opacity: .36;
      }

      .clearer-picture[data-visible="true"]
      .clearer-grid,
      .clearer-picture[data-visible="true"]
      .clearer-guides {
        opacity: 1;
      }

      /* ==========================================================
         GHOST FIELD
      =========================================================== */

      .clearer-ghost-field {
        opacity: 0;

        transition:
          opacity 650ms ease;
      }

      .clearer-picture[data-visible="true"]
      .clearer-ghost-field {
        opacity: 1;
        transition-delay: 170ms;
      }

      /* ==========================================================
         FRAMES
      =========================================================== */

      .clearer-frame {
        opacity: 0;

        transform-box: fill-box;
        transform-origin: center;

        transition:
          opacity 600ms cubic-bezier(.22, 1, .36, 1),
          transform 600ms cubic-bezier(.22, 1, .36, 1);
      }

      .clearer-frame-1 {
        transform: translate3d(-16px, 0, 0);
      }

      .clearer-frame-2 {
        transform: translate3d(-10px, 0, 0);
      }

      .clearer-frame-3 {
        transform: translate3d(10px, 0, 0);
      }

      .clearer-frame-4 {
        transform: translate3d(16px, 0, 0);
      }

      .clearer-picture[data-visible="true"]
      .clearer-frame {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }

      .clearer-picture[data-visible="true"]
      .clearer-frame-1 {
        transition-delay: 180ms;
      }

      .clearer-picture[data-visible="true"]
      .clearer-frame-2 {
        transition-delay: 260ms;
      }

      .clearer-picture[data-visible="true"]
      .clearer-frame-3 {
        transition-delay: 340ms;
      }

      .clearer-picture[data-visible="true"]
      .clearer-frame-4 {
        transition-delay: 420ms;
      }

      /* ==========================================================
         CENTER FIELD
      =========================================================== */

      .clearer-center-field {
        opacity: 0;

        transform-box: fill-box;
        transform-origin: center;

        transform: scale(.96);

        transition:
          opacity 500ms ease,
          transform 500ms cubic-bezier(.22, 1, .36, 1);
      }

      .clearer-picture[data-visible="true"]
      .clearer-center-field {
        opacity: 1;
        transform: scale(1);

        transition-delay: 480ms;
      }

      /* ==========================================================
         AXIS
      =========================================================== */

      .clearer-axis {
        opacity: 0;

        transform-box: fill-box;
        transform-origin: left center;

        transform: scaleX(0);

        transition:
          opacity 250ms ease,
          transform 720ms cubic-bezier(.22, 1, .36, 1);
      }

      .clearer-picture[data-visible="true"]
      .clearer-axis {
        opacity: 1;
        transform: scaleX(1);

        transition-delay: 480ms;
      }

      /* ==========================================================
         FINAL MARKER
      =========================================================== */

      .clearer-final-marker {
        opacity: 0;

        transform-box: fill-box;
        transform-origin: center;

        transform: scale(.65);

        transition:
          opacity 320ms ease,
          transform 320ms cubic-bezier(.22, 1, .36, 1);
      }

      .clearer-picture[data-visible="true"]
      .clearer-final-marker {
        opacity: 1;
        transform: scale(1);

        transition-delay: 820ms;
      }

      /* ==========================================================
         LABELS
      =========================================================== */

      .clearer-picture-label,
      .clearer-visual-label {
        opacity: 0;

        transform: translate3d(0, 6px, 0);

        transition:
          opacity 420ms ease,
          transform 420ms cubic-bezier(.22, 1, .36, 1);
      }

      .clearer-picture[data-visible="true"]
      .clearer-picture-label {
        opacity: 1;
        transform: translate3d(0, -50%, 0);

        transition-delay: 900ms;
      }

      .clearer-picture[data-visible="true"]
      .clearer-visual-label {
        opacity: 1;
        transform: translate3d(0, 0, 0);

        transition-delay:
          var(--clearer-label-delay);
      }

      /* ==========================================================
         HOVER
      =========================================================== */

      @media (hover: hover) and (pointer: fine) {
        .clearer-visual:hover .clearer-frame-1 {
          transform: translate3d(-2px, 0, 0);
        }

        .clearer-visual:hover .clearer-frame-2 {
          transform: translate3d(-1px, 0, 0);
        }

        .clearer-visual:hover .clearer-frame-3 {
          transform: translate3d(1px, 0, 0);
        }

        .clearer-visual:hover .clearer-frame-4 {
          transform: translate3d(2px, 0, 0);
        }

        .clearer-visual:hover .clearer-axis {
          opacity: 1;
        }

        .clearer-visual:hover .clearer-final-marker {
          transform: scale(1.06);
        }

        .clearer-visual:hover .clearer-guides {
          opacity: .85;
        }
      }

      /* ==========================================================
         MOBILE
      =========================================================== */

      @media (max-width: 1023px) {
        .clearer-visual {
          max-height: 510px;
        }

        .clearer-visual svg {
          transform:
            scale(.9)
            translateX(-2%);

          transform-origin: center;
        }
      }

      @media (max-width: 639px) {
        .clearer-visual {
          aspect-ratio: 1 / .87;
        }

        .clearer-visual svg {
          transform:
            scale(.93)
            translateY(-2%);

          transform-origin: center;
        }
      }

      /* ==========================================================
         REDUCED MOTION
      =========================================================== */

      @media (prefers-reduced-motion: reduce) {
        .clearer-content,
        .clearer-background-grid,
        .clearer-grid,
        .clearer-guides,
        .clearer-ghost-field,
        .clearer-frame,
        .clearer-center-field,
        .clearer-axis,
        .clearer-final-marker,
        .clearer-picture-label,
        .clearer-visual-label {
          opacity: 1 !important;

          transform: none !important;

          animation: none !important;
          transition: none !important;
        }

        .clearer-picture-label {
          transform:
            translateY(-50%) !important;
        }
      }
    `}</style>
  );
}
