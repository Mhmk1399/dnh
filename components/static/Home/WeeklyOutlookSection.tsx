"use client";

import { useEffect, useRef, useState } from "react";

import {
  ArrowLeft,
  ArrowUpLeft,
  Eye,
  ShieldAlert,
  TrendingUp,
  WalletCards,
} from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   IMPORTANT

   تمام داده‌های عددی این کامپوننت فعلاً نمایشی هستند.
   بعداً باید از CMS / Weekly Outlook واقعی جایگزین شوند.
============================================================================= */

const WEEKLY_VALUES = [38, 42, 47, 45, 52, 57, 54, 61, 65, 63, 71, 68] as const;

const WEEK_LABELS = [
  "W30",
  "W31",
  "W32",
  "W33",
  "W34",
  "W35",
  "W36",
  "W37",
  "W38",
  "W39",
  "W40",
  "W41",
] as const;

const METRICS = [
  {
    title: "فشار ریسک‌های کلان",
    en: "MACRO RISK",
    value: 72,
    label: "بالا",
    tone: "orange",
    icon: ShieldAlert,
  },
  {
    title: "شرایط نقدینگی",
    en: "LIQUIDITY",
    value: 54,
    label: "میانه",
    tone: "teal",
    icon: WalletCards,
  },
  {
    title: "محیط دارایی‌ها",
    en: "ASSET VIEW",
    value: 63,
    label: "نیازمند توجه",
    tone: "blue",
    icon: TrendingUp,
  },
] as const;

const WEEKLY_FOCUS = [
  {
    eyebrow: "WHAT CHANGED",
    title: "چه چیزی تغییر کرده؟",
    text: "فشار متغیرهای ارزی و ریسک‌های محیطی در تصویر این هفته پررنگ‌تر شده است.",
  },
  {
    eyebrow: "WHY IT MATTERS",
    title: "چرا اهمیت دارد؟",
    text: "تغییر محیط می‌تواند نقدینگی، رفتار دارایی‌ها و سناریوی تصمیم را تحت تأثیر قرار دهد.",
  },
  {
    eyebrow: "WHAT TO WATCH",
    title: "چه چیزی را زیر نظر بگیریم؟",
    text: "رفتار نقدینگی و شدت نوسانات، دو متغیری هستند که باید در ادامه دیده شوند.",
  },
] as const;

/* =============================================================================
   Chart geometry
============================================================================= */

const CHART_WIDTH = 720;
const CHART_HEIGHT = 230;
const CHART_PADDING_X = 18;
const CHART_PADDING_Y = 20;

const chartPoints = WEEKLY_VALUES.map((value, index) => {
  const usableWidth = CHART_WIDTH - CHART_PADDING_X * 2;

  const x =
    CHART_PADDING_X + (index / (WEEKLY_VALUES.length - 1)) * usableWidth;

  const y =
    CHART_HEIGHT -
    CHART_PADDING_Y -
    (value / 100) * (CHART_HEIGHT - CHART_PADDING_Y * 2);

  return {
    x,
    y,
    value,
  };
});

const linePath = chartPoints
  .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
  .join(" ");

const areaPath = [
  linePath,
  `L ${chartPoints.at(-1)?.x ?? 0} ${CHART_HEIGHT}`,
  `L ${chartPoints[0]?.x ?? 0} ${CHART_HEIGHT}`,
  "Z",
].join(" ");

/* =============================================================================
   Component
============================================================================= */

export function WeeklyOutlookSection() {
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
        threshold: 0.14,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="weekly-outlook"
      dir="rtl"
      aria-labelledby="weekly-outlook-title"
      className="
        relative
        isolate
        overflow-hidden

        border-b
        border-line

        bg-page
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

          py-16

          sm:py-20

          lg:py-24

          xl:py-28

        "
      >
        {/* =======================================================
            Intro
        ======================================================== */}

        <div
          className="
            grid
            gap-8

            lg:grid-cols-[0.74fr_1.26fr]
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

                    text-brand-primary

                    sm:text-[11px]
                  "
                >
                  DNH Weekly Outlook
                </span>
              </div>

              <h2
                id="weekly-outlook-title"
                className="
                  max-w-[700px]

                  text-[32px]
                  font-black
                  leading-[1.58]
                  tracking-[-0.045em]

                  text-ink

                  sm:text-[39px]

                  lg:text-[47px]
                  lg:leading-[1.5]

                  xl:text-[52px]
                "
              >
                این هفته،
                <br />
                <span className="text-brand-primary">
                  چه چیزی در محیط تصمیم
                </span>
                <br />
                مهم‌تر شده است؟
              </h2>
            </div>
          </Reveal>

          <Reveal visible={visible} delay={110}>
            <div className="lg:pb-1">
              <p
                className="
                  max-w-[670px]

                  text-[13px]
                  font-medium
                  leading-[2.2]

                  text-ink-muted

                  sm:text-[14px]

                  lg:text-[15px]
                "
              >
                DNH Weekly Outlook مهم‌ترین تغییرات محیط اقتصادی، ریسک‌ها و
                شرایط دارایی‌ها را در یک تصویر فشرده کنار هم قرار می‌دهد؛ نه
                برای پیش‌بینی بازار، بلکه برای شناخت بهتر زمینه‌ای که تصمیم در
                آن گرفته می‌شود.
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
                  href="/knowledge/weekly-outlook"
                  variant="primary"
                  size="md"
                  icon={ArrowLeft}
                  className="
                    w-full

                    sm:w-auto
                    sm:min-w-[235px]
                  "
                >
                  مشاهده Weekly Outlook
                </ActionButton>

                
               
              </div>
            </div>
          </Reveal>
        </div>

        {/* =======================================================
            Main intelligence board
        ======================================================== */}

        <article
          aria-label="نمونه نمایشی DNH Weekly Outlook"
          className={`
            group/board

            relative

            mt-12
            overflow-hidden

            border
            border-line

            bg-white

            shadow-[0_30px_90px_rgba(11,73,96,0.09)]

            transition-[opacity,transform,box-shadow,border-color]
            duration-700
            ease-[cubic-bezier(.22,1,.36,1)]

            hover:-translate-y-[3px]
            hover:border-brand-primary/30
            hover:shadow-[0_38px_110px_rgba(11,73,96,0.14)]

            sm:mt-14

            lg:mt-16

            ${visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}

            motion-reduce:translate-y-0
            motion-reduce:opacity-100
            motion-reduce:transition-none
          `}
          style={{
            transitionDelay: "150ms",
          }}
        >
          {/* accent */}

          <div
            aria-hidden="true"
            className="
              absolute
              inset-x-0
              top-0

              flex
              h-[3px]
            "
          >
            <span className="w-[18%] bg-brand-accent" />
            <span className="flex-1 bg-brand-primary" />
          </div>

          {/* =====================================================
              Board header
          ====================================================== */}

          <header
            className="
              flex
              flex-col
              gap-5

              border-b
              border-line

              px-5
              pb-5
              pt-7

              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:px-7

              lg:px-8
            "
          >
            <div>
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
                    h-2
                    w-2

                    bg-brand-accent
                  "
                />

                <span
                  dir="ltr"
                  className="
                    text-[8px]
                    font-black
                    tracking-[0.2em]

                    text-brand-primary
                  "
                >
                  DNH WEEKLY OUTLOOK
                </span>
              </div>

              <h3
                className="
                  mt-2

                  text-[16px]
                  font-black

                  text-ink

                  sm:text-[18px]
                "
              >
                نمای فشرده محیط تصمیم
              </h3>
            </div>

            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  border
                  border-brand-accent/25

                  bg-brand-accent/[0.06]

                  px-3
                  py-2

                  text-[8px]
                  font-black

                  text-brand-accent
                "
              >
                نمونه نمایشی
              </span>

              <span
                dir="ltr"
                className="
                  text-[7px]
                  font-bold
                  tracking-[0.16em]

                  text-ink-muted/45
                "
              >
                WEEK 41
              </span>
            </div>
          </header>

          {/* =====================================================
              Metric rail
          ====================================================== */}

          <div
            className="
              grid

              border-b
              border-line

              md:grid-cols-3
            "
          >
            {METRICS.map((metric, index) => (
              <Metric
                key={metric.en}
                metric={metric}
                index={index}
                visible={visible}
              />
            ))}
          </div>

          {/* =====================================================
              Chart + Context
          ====================================================== */}

          <div
            className="
              grid

              lg:grid-cols-[1.42fr_0.58fr]
            "
          >
            <WeeklyChart visible={visible} />

            <WeeklySummary />
          </div>

          {/* =====================================================
              Understand in 3 seconds
          ====================================================== */}

          <div
            className="
              grid
              gap-px

              border-t
              border-line

              bg-line

              md:grid-cols-3
            "
          >
            {WEEKLY_FOCUS.map((item, index) => (
              <FocusCard key={item.eyebrow} item={item} index={index} />
            ))}
          </div>

          {/* =====================================================
              Note
          ====================================================== */}

          <div
            className="
              group/note

              flex
              flex-col
              gap-5

              border-t
              border-line

              bg-surface-soft/65

              px-5
              py-5

              transition-colors
              duration-300

              hover:bg-surface-soft

              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:px-7

              lg:px-8
            "
          >
            <div
              className="
                flex
                items-start
                gap-4
              "
            >
              <span
                className="
                  flex
                  h-10
                  w-10
                  shrink-0

                  items-center
                  justify-center

                  bg-brand-primary

                  text-white
                "
              >
                <Eye className="h-4 w-4" strokeWidth={1.5} />
              </span>

              <div>
                <p
                  dir="ltr"
                  className="
                    text-right
                    text-[7px]
                    font-black
                    tracking-[0.2em]

                    text-brand-accent
                  "
                >
                  DNH NOTE
                </p>

                <p
                  className="
                    mt-1
                    max-w-[760px]

                    text-[10px]
                    font-bold
                    leading-[2]

                    text-ink

                    sm:text-[11px]
                  "
                >
                  تغییر یک متغیر به‌تنهایی تصمیم را تعیین نمی‌کند؛ اهمیت آن
                  زمانی روشن می‌شود که در کنار ساختار ثروت، نقدینگی، ریسک و افق
                  زمانی دیده شود.
                </p>
              </div>
            </div>

            <ArrowUpLeft
              aria-hidden="true"
              className="
                hidden
                h-4
                w-4
                shrink-0

                text-brand-primary

                transition-transform
                duration-300

                group-hover/note:-translate-x-1
                group-hover/note:-translate-y-1

                sm:block
              "
              strokeWidth={1.5}
            />
          </div>
        </article>
      </div>
    </section>
  );
}

/* =============================================================================
   Metric
============================================================================= */

function Metric({
  metric,
  index,
  visible,
}: {
  metric: (typeof METRICS)[number];
  index: number;
  visible: boolean;
}) {
  const Icon = metric.icon;

  const theme = getMetricTheme(metric.tone);

  return (
    <div
      className={`
        group/metric

        relative
        overflow-hidden

        border-line

        bg-white

        px-5
        py-5

        transition-[opacity,transform,background-color]
        duration-700
        ease-[cubic-bezier(.22,1,.36,1)]

        hover:bg-surface-soft/45

        sm:px-6

        md:border-l
        md:last:border-l-0

        ${index < 2 ? "border-b md:border-b-0" : ""}

        ${visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}
      `}
      style={{
        transitionDelay: `${240 + index * 70}ms`,
      }}
    >
      <span
        aria-hidden="true"
        className={`
          absolute
          inset-y-0
          right-0

          w-[3px]

          origin-bottom
          scale-y-[0.25]

          transition-transform
          duration-300

          group-hover/metric:scale-y-100

          ${theme.bar}
        `}
      />

      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <span
          className={`
            flex
            h-10
            w-10

            items-center
            justify-center

            border

            transition-[background-color,color,border-color,transform]
            duration-300

            group-hover/metric:-translate-y-0.5

            ${theme.icon}
          `}
        >
          <Icon className="h-4 w-4" strokeWidth={1.5} />
        </span>

        <div className="text-left">
          <p
            dir="ltr"
            className="
              text-[7px]
              font-black
              tracking-[0.17em]

              text-ink-muted/45
            "
          >
            {metric.en}
          </p>

          <p
            className={`
              mt-1
              text-[13px]
              font-black

              ${theme.text}
            `}
          >
            {metric.label}
          </p>
        </div>
      </div>

      <p
        className="
          mt-5

          text-[11px]
          font-black

          text-ink
        "
      >
        {metric.title}
      </p>

      <div
        className="
          mt-4

          h-[5px]

          overflow-hidden

          bg-brand-primary/[0.07]
        "
      >
        <span
          aria-hidden="true"
          className={`
            block
            h-full

            transition-[width]
            duration-1000
            ease-[cubic-bezier(.22,1,.36,1)]

            ${theme.bar}
          `}
          style={{
            width: visible ? `${metric.value}%` : "0%",
            transitionDelay: `${400 + index * 80}ms`,
          }}
        />
      </div>

      <div
        className="
          mt-2

          flex
          items-center
          justify-between
        "
      >
        <span className="text-[7px] font-bold text-ink-muted/40">LOW</span>

        <span
          className={`
            text-[10px]
            font-black

            ${theme.text}
          `}
        >
          {metric.value}
        </span>

        <span className="text-[7px] font-bold text-ink-muted/40">HIGH</span>
      </div>
    </div>
  );
}

/* =============================================================================
   Chart
============================================================================= */

function WeeklyChart({ visible }: { visible: boolean }) {
  return (
    <figure
      className="
        group/chart

        relative
        overflow-hidden

        border-b
        border-line

        px-5
        py-6

        sm:px-7

        lg:border-b-0
        lg:border-l
        lg:px-8
      "
    >
      <div
        aria-hidden="true"
        className="
          absolute
          inset-0

          opacity-[0.3]
        "
        style={{
          backgroundImage:
            "linear-gradient(to bottom,color-mix(in srgb,var(--dnh-primary) 7%,transparent) 1px,transparent 1px)",
          backgroundSize: "100% 25%",
        }}
      />

      <div
        className="
          relative
          z-10

          flex
          items-start
          justify-between
          gap-5
        "
      >
        <div>
          <p
            dir="ltr"
            className="
              text-[7px]
              font-black
              tracking-[0.18em]

              text-brand-primary/55
            "
          >
            DECISION ENVIRONMENT
          </p>

          <h4
            className="
              mt-2

              text-[13px]
              font-black

              text-ink
            "
          >
            فشار محیط تصمیم
          </h4>
        </div>

        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <span
            className="
              h-2
              w-2

              bg-brand-primary
            "
          />

          <span className="text-[8px] font-bold text-ink-muted">
            شاخص نمایشی
          </span>
        </div>
      </div>

      <div
        className="
          relative
          z-10

          mt-5

          overflow-hidden
        "
      >
        <svg
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          role="img"
          aria-label="نمودار نمایشی فشار محیط تصمیم در دوازده هفته"
          className="
            h-auto
            w-full
            overflow-visible
          "
        >
          <defs>
            <linearGradient id="weekly-area" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--dnh-primary)"
                stopOpacity="0.22"
              />

              <stop
                offset="100%"
                stopColor="var(--dnh-primary)"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>

          {/* risk zone */}

          <rect
            x="0"
            y="0"
            width={CHART_WIDTH}
            height="52"
            fill="var(--dnh-accent)"
            opacity="0.035"
          />

          <line
            x1="0"
            y1="52"
            x2={CHART_WIDTH}
            y2="52"
            stroke="var(--dnh-accent)"
            strokeOpacity="0.25"
            strokeDasharray="5 7"
          />

          {/* area */}

          <path
            d={areaPath}
            fill="url(#weekly-area)"
            className={`
              transition-opacity
              duration-700

              ${visible ? "opacity-100" : "opacity-0"}
            `}
          />

          {/* line */}

          <path
            d={linePath}
            fill="none"
            stroke="var(--dnh-primary)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="
              transition-[stroke-width]
              duration-300

              group-hover/chart:[stroke-width:4]
            "
          />

          {/* dots */}

          {chartPoints.map((point, index) => (
            <g
              key={index}
              className={`
                  transition-opacity
                  duration-500

                  ${visible ? "opacity-100" : "opacity-0"}
                `}
            >
              <circle
                cx={point.x}
                cy={point.y}
                r={index === chartPoints.length - 1 ? 6 : 3}
                fill={
                  index === chartPoints.length - 1
                    ? "var(--dnh-accent)"
                    : "white"
                }
                stroke={
                  index === chartPoints.length - 1
                    ? "var(--dnh-accent)"
                    : "var(--dnh-primary)"
                }
                strokeWidth="2"
              />

              {index === chartPoints.length - 1 && (
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="13"
                  fill="none"
                  stroke="var(--dnh-accent)"
                  strokeOpacity="0.18"
                  strokeWidth="5"
                />
              )}
            </g>
          ))}
        </svg>

        {/* week labels */}

        <div
          dir="ltr"
          className="
            mt-3

            grid
            grid-cols-6
            gap-2

            sm:grid-cols-12
          "
        >
          {WEEK_LABELS.map((week, index) => (
            <span
              key={week}
              className={`
                  text-center
                  text-[6px]
                  font-bold

                  ${
                    index === WEEK_LABELS.length - 1
                      ? "text-brand-accent"
                      : "text-ink-muted/40"
                  }

                  ${index % 2 !== 0 ? "hidden sm:block" : ""}
                `}
            >
              {week}
            </span>
          ))}
        </div>
      </div>

      <figcaption
        className="
          relative
          z-10

          mt-5

          flex
          items-start
          gap-3

          border-t
          border-line

          pt-4
        "
      >
        <span
          aria-hidden="true"
          className="
            mt-[6px]

            h-[6px]
            w-[6px]
            shrink-0

            bg-brand-accent
          "
        />

        <p
          className="
            text-[9px]
            font-medium
            leading-[1.9]

            text-ink-muted
          "
        >
          این نمودار فقط برای نمایش ساختار بصری Weekly Outlook ساخته شده و داده
          واقعی بازار نیست.
        </p>
      </figcaption>
    </figure>
  );
}

/* =============================================================================
   Summary
============================================================================= */

function WeeklySummary() {
  return (
    <div
      className="
        flex
        flex-col

        px-5
        py-6

        sm:px-7

        lg:px-8
      "
    >
      <p
        dir="ltr"
        className="
          text-[7px]
          font-black
          tracking-[0.18em]

          text-brand-primary/55
        "
      >
        EXECUTIVE SUMMARY
      </p>

      <h4
        className="
          mt-2

          text-[15px]
          font-black
          leading-[1.9]

          text-ink
        "
      >
        تصویر این هفته در یک نگاه
      </h4>

      <p
        className="
          mt-3

          text-[10px]
          font-medium
          leading-[2]

          text-ink-muted
        "
      >
        شدت برخی ریسک‌های محیطی افزایش یافته و همین موضوع اهمیت نقدینگی و
        سناریوهای جایگزین را بیشتر می‌کند.
      </p>

      <div
        className="
          mt-6
          space-y-4
        "
      >
        <SummaryRow label="ریسک غالب" value="ارز و محیط کلان" tone="orange" />

        <SummaryRow label="نیاز تصمیمی" value="حفظ انعطاف" tone="teal" />

        <SummaryRow label="متغیر تحت نظر" value="نقدینگی" tone="blue" />
      </div>

      <div
        className="
          mt-auto
          pt-7
        "
      >
        <div
          className="
            border-r-2
            border-brand-accent

            pr-4
          "
        >
          <p
            className="
              text-[10px]
              font-black
              leading-[2]

              text-ink
            "
          >
            نتیجه گزارش، «پیش‌بینی» نیست؛
            <br />
            <span className="text-brand-primary">
              روشن‌ترشدن زمینه تصمیم است.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

/* =============================================================================
   Focus cards
============================================================================= */

function FocusCard({
  item,
  index,
}: {
  item: (typeof WEEKLY_FOCUS)[number];
  index: number;
}) {
  const themes = [
    {
      line: "bg-brand-accent",
      number: "text-brand-accent",
    },
    {
      line: "bg-brand-primary",
      number: "text-brand-primary",
    },
    {
      line: "bg-[#48a2c3]",
      number: "text-[#267fa0]",
    },
  ];

  const theme = themes[index];

  return (
    <div
      className="
        group/focus

        relative
        min-h-[205px]

        bg-white

        px-5
        py-6

        transition-[background-color,transform]
        duration-300

        hover:-translate-y-0.5
        hover:bg-surface-soft/60

        sm:px-6

        lg:px-7
      "
    >
      <span
        aria-hidden="true"
        className={`
          absolute
          inset-x-0
          top-0

          h-[2px]

          origin-right
          scale-x-[0.16]

          transition-transform
          duration-500

          group-hover/focus:scale-x-100

          ${theme?.line}
        `}
      />

      <div
        className="
          flex
          items-center
          justify-between
          gap-4
        "
      >
        <p
          dir="ltr"
          className="
            text-[7px]
            font-black
            tracking-[0.17em]

            text-ink-muted/48
          "
        >
          {item.eyebrow}
        </p>

        <ArrowUpLeft
          className="
            h-4
            w-4

            text-ink-muted/25

            transition-[color,transform]
            duration-300

            group-hover/focus:-translate-x-1
            group-hover/focus:-translate-y-1
            group-hover/focus:text-brand-accent
          "
          strokeWidth={1.5}
        />
      </div>

      <h4
        className={`
          mt-7

          text-[14px]
          font-black

          ${theme?.number}
        `}
      >
        {item.title}
      </h4>

      <p
        className="
          mt-3

          text-[10px]
          font-medium
          leading-[2]

          text-ink-muted
        "
      >
        {item.text}
      </p>
    </div>
  );
}

/* =============================================================================
   Small pieces
============================================================================= */

function SummaryRow({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "orange" | "teal" | "blue";
}) {
  const theme = getMetricTheme(tone);

  return (
    <div
      className="
        group/summary

        flex
        items-center
        justify-between
        gap-4

        border-b
        border-line

        pb-3

        last:border-b-0
      "
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

            transition-transform
            duration-300

            group-hover/summary:scale-125

            ${theme.bar}
          `}
        />

        <span
          className="
            text-[9px]
            font-medium

            text-ink-muted
          "
        >
          {label}
        </span>
      </div>

      <span
        className={`
          text-[10px]
          font-black

          ${theme.text}
        `}
      >
        {value}
      </span>
    </div>
  );
}

function Reveal({
  children,
  visible,
  delay,
}: {
  children: React.ReactNode;
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

function getMetricTheme(tone: "orange" | "teal" | "blue") {
  switch (tone) {
    case "orange":
      return {
        bar: "bg-brand-accent",
        text: "text-brand-accent",
        icon: `
          border-brand-accent/25
          bg-brand-accent/[0.06]
          text-brand-accent

          group-hover/metric:border-brand-accent
          group-hover/metric:bg-brand-accent
          group-hover/metric:text-white
        `,
      };

    case "blue":
      return {
        bar: "bg-[#48a2c3]",
        text: "text-[#267fa0]",
        icon: `
          border-[#48a2c3]/25
          bg-[#48a2c3]/[0.07]
          text-[#267fa0]

          group-hover/metric:border-[#267fa0]
          group-hover/metric:bg-[#267fa0]
          group-hover/metric:text-white
        `,
      };

    default:
      return {
        bar: "bg-brand-primary",
        text: "text-brand-primary",
        icon: `
          border-brand-primary/25
          bg-brand-primary/[0.06]
          text-brand-primary

          group-hover/metric:border-brand-primary
          group-hover/metric:bg-brand-primary
          group-hover/metric:text-white
        `,
      };
  }
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
            "linear-gradient(180deg,color-mix(in srgb,var(--dnh-primary) 4%,white) 0%,white 36%,white 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.13]
        "
        style={{
          backgroundImage:
            "linear-gradient(to right,color-mix(in srgb,var(--dnh-primary) 5%,transparent) 1px,transparent 1px)",
          backgroundSize: "112px 100%",
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
