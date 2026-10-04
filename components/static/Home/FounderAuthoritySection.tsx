import {
  ArrowLeft,
  ChartNoAxesCombined,
  Landmark,
  Network,
  type LucideIcon,
} from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

type AuthorityItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const AUTHORITY_ITEMS: AuthorityItem[] = [
  {
    title: "معماری ثروت",
    description: "نگاه ساختاریافته به ثروت و تصمیم‌های مالی",
    icon: Landmark,
  },
  {
    title: "مشاوره راهبردی",
    description: "برای تصمیم‌های مالی پیچیده‌تر و چندوجهی",
    icon: ChartNoAxesCombined,
  },
  {
    title: "چارچوب DNH",
    description: "هوشمندی داده، راهبرد مسیر و معماری افق",
    icon: Network,
  },
];

export function FounderAuthoritySection() {
  return (
    <section
      dir="rtl"
      aria-labelledby="founder-authority-title"
      className="
        relative
        isolate
        overflow-hidden
        border-y
        border-white/10
      "
      style={{
        background: `
          linear-gradient(
            105deg,
            color-mix(in srgb, var(--dnh-secondary) 66%, #010d14) 0%,
            color-mix(in srgb, var(--dnh-primary) 48%, #031c28) 44%,
            color-mix(in srgb, var(--dnh-secondary) 68%, #010c13) 100%
          )
        `,
      }}
    >
      <GlobalBackground />

      <div
        className="
          relative
          z-10
          dnh-site-shell
          mx-auto
          grid
          w-full
          max-w-[1536px]

          lg:min-h-[760px]
          lg:grid-cols-[minmax(0,0.93fr)_88px_minmax(0,1.07fr)]

          xl:min-h-[800px]
          xl:grid-cols-[minmax(0,0.95fr)_96px_minmax(0,1.05fr)]
        "
      >
        {/* ============================================================
            RIGHT — TEXT
        ============================================================ */}

        <div
          className="
            order-1
            flex
            flex-col
            justify-center

            px-5
            py-16

            text-right

            sm:px-8
            sm:py-20

            lg:col-start-3
            lg:row-start-1
            lg:px-10
            lg:py-16

            xl:px-14
            xl:py-20
          "
        >
          {/* Eyebrow */}
          <div
            className="
              mb-6
              flex
              items-center
              gap-3
            "
          >
            <span
              aria-hidden="true"
              className="
                h-px
                w-11
                bg-brand-accent
              "
            />

            <span
              className="
                text-[10px]
                font-black
                tracking-[0.05em]

                text-white/70

                sm:text-[11px]
              "
            >
              نگاه پشت DNH
            </span>
          </div>

          {/* Main heading */}
          <h2
            id="founder-authority-title"
            className="
              max-w-[760px]

              text-[32px]
              font-black
              leading-[1.65]
              tracking-[-0.04em]

              text-white

              sm:text-[40px]

              lg:text-[46px]
              lg:leading-[1.55]

              xl:text-[54px]
            "
          >
            DNH از یک پرسش ساده آغاز شد:
            <br />
            چطور می‌توان تصمیم مالی را{" "}
            <span className="text-brand-accent">کامل‌تر</span> دید؟
          </h2>

          {/* Intro */}
          <p
            className="
              mt-6
              max-w-[700px]

              text-[14px]
              font-medium
              leading-[2.2]

              text-white/68

              sm:text-[15px]

              lg:mt-7
              lg:text-[16px]
            "
          >
            در شکل‌گیری DNH، تمرکز بر این بوده است که تصمیم مالی صرفاً به یک
            متغیر، یک دارایی یا یک پاسخ کوتاه محدود نشود؛ بلکه داده، ریسک،
            سناریو، ساختار مالی و افق تصمیم در کنار یکدیگر دیده شوند تا مسیر
            تصمیم‌گیری روشن‌تر و منسجم‌تر شکل بگیرد.
          </p>

          {/* Philosophy */}
          <div
            className="
              mt-9
              border-t
              border-white/10
              pt-7
            "
          >
            <div
              className="
                mb-4
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  text-[10px]
                  font-black
                  text-white/52
                "
              >
                نگاه DNH
              </span>

              <span
                aria-hidden="true"
                className="
                  h-px
                  w-8
                  bg-brand-accent
                "
              />
            </div>

            <p
              className="
                max-w-[690px]

                text-[22px]
                font-black
                leading-[1.9]
                tracking-[-0.025em]

                text-white

                sm:text-[25px]

                lg:text-[28px]
              "
            >
              تصمیم مالی فقط انتخاب یک گزینه نیست؛
              <br />
              <span className="text-white/84">
                دیدن تصویر کامل‌تر، پیش از تصمیم است.
              </span>
            </p>
          </div>

          {/* Authority strip */}
          <div
            className="
              mt-9

              grid

              border-y
              border-white/10

              sm:grid-cols-3
            "
          >
            {AUTHORITY_ITEMS.map((item, index) => (
              <AuthorityItemView
                key={item.title}
                item={item}
                hasDivider={index < AUTHORITY_ITEMS.length - 1}
              />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8">
            <ActionButton
              href="/about"
              variant="primary"
              size="md"
              icon={ArrowLeft}
              className="
                w-full

                bg-brand-accent
                text-white

                shadow-[0_18px_42px_color-mix(in_srgb,var(--dnh-accent)_24%,transparent)]

                hover:bg-[#ec7d01]
                hover:shadow-[0_22px_48px_color-mix(in_srgb,var(--dnh-accent)_32%,transparent)]

                sm:w-auto
                sm:min-w-[285px]
              "
            >
              آشنایی با دکتر نسیم محمدحسنی
            </ActionButton>
          </div>
        </div>

        {/* ============================================================
            CENTER AXIS
        ============================================================ */}

        <FounderAxis />

        {/* ============================================================
            LEFT — VISUAL
        ============================================================ */}

      
      </div>
    </section>
  );
}

/* =============================================================================
   AUTHORITY ITEM
============================================================================= */

function AuthorityItemView({
  item,
  hasDivider,
}: {
  item: AuthorityItem;
  hasDivider: boolean;
}) {
  const Icon = item.icon;

  return (
    <div
      className={`
        relative

        py-5

        text-right

        sm:px-5

        ${hasDivider ? "sm:border-l sm:border-white/10" : ""}

        max-sm:border-b
        max-sm:border-white/10
        max-sm:last:border-b-0
      `}
    >
      <Icon
        aria-hidden="true"
        className="
          mb-3
          h-5
          w-5
          text-brand-accent
        "
        strokeWidth={1.55}
      />

      <h3
        className="
          text-[13px]
          font-black
          text-white

          lg:text-[14px]
        "
      >
        {item.title}
      </h3>

      <p
        className="
          mt-2

          text-[10px]
          font-medium
          leading-[1.9]

          text-white/48

          lg:text-[11px]
        "
      >
        {item.description}
      </p>
    </div>
  );
}

/* =============================================================================
   CENTER AXIS
============================================================================= */

function FounderAxis() {
  return (
    <div
      aria-hidden="true"
      className="
        relative

        hidden

        lg:col-start-2
        lg:row-start-1
        lg:flex
        lg:items-center
        lg:justify-center
      "
    >
      <span
        className="
          absolute
          inset-y-[8%]
          left-1/2

          w-px
          -translate-x-1/2

          bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.45)_12%,rgba(255,255,255,0.45)_88%,transparent)]
        "
      />

      <span
        className="
          absolute
          left-1/2
          top-[8%]

          h-2
          w-2

          -translate-x-1/2

          bg-white/55
        "
      />

      <div
        className="
          relative
          z-10

          flex
          h-[72%]
          flex-col
          items-center
          justify-between
        "
      >
        <AxisLabel label="FOUNDER" />

        <div
          className="
            flex
            flex-col
            items-center
            gap-3
          "
        >
          <span className="h-10 w-px bg-brand-accent" />

          <span
            dir="ltr"
            className="
              [writing-mode:vertical-rl]

              text-[10px]
              font-black
              tracking-[0.16em]

              text-white
            "
          >
            DNH
          </span>

          <span className="h-10 w-px bg-brand-accent" />
        </div>

        <AxisLabel label="ADVISORY" />
      </div>
    </div>
  );
}

function AxisLabel({ label }: { label: string }) {
  return (
    <span
      dir="ltr"
      className="
        [writing-mode:vertical-rl]

        text-[8px]
        font-bold
        tracking-[0.28em]

        text-white/36
      "
    >
      {label}
    </span>
  );
}

/* =============================================================================
   ARCHITECTURE VISUAL
============================================================================= */

function ArchitectureVisual() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 760 820"
      preserveAspectRatio="xMidYMid slice"
      className="
        absolute
        inset-0
        h-full
        w-full
      "
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="architecture-plane-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--dnh-primary)" stopOpacity="0.06" />

          <stop
            offset="100%"
            stopColor="var(--dnh-primary)"
            stopOpacity="0.38"
          />
        </linearGradient>

        <linearGradient id="architecture-plane-b" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.16" />

          <stop
            offset="100%"
            stopColor="var(--dnh-primary)"
            stopOpacity="0.04"
          />
        </linearGradient>

        <linearGradient id="architecture-orange" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--dnh-accent)" stopOpacity="0" />

          <stop offset="48%" stopColor="var(--dnh-accent)" stopOpacity="1" />

          <stop offset="100%" stopColor="var(--dnh-accent)" stopOpacity="0" />
        </linearGradient>

        <pattern
          id="architecture-grid"
          width="38"
          height="38"
          patternUnits="userSpaceOnUse"
        >
          <path d="M38 0H0V38" stroke="white" strokeOpacity="0.035" />
        </pattern>
      </defs>

      {/* Base */}
      <rect width="760" height="820" fill="#031923" fillOpacity="0.28" />

      <rect width="760" height="820" fill="url(#architecture-grid)" />

      {/* Long architectural guides */}
      <path d="M0 128L760 92" stroke="white" strokeOpacity="0.06" />

      <path d="M0 300L760 300" stroke="white" strokeOpacity="0.055" />

      <path d="M0 646L760 646" stroke="white" strokeOpacity="0.08" />

      <path d="M76 0V820" stroke="white" strokeOpacity="0.04" />

      <path d="M244 0V820" stroke="white" strokeOpacity="0.04" />

      <path d="M470 0V820" stroke="white" strokeOpacity="0.04" />

      {/* Main architectural slabs */}
      <polygon
        points="160,238 358,142 358,668 160,620"
        fill="url(#architecture-plane-a)"
        stroke="#5db4d3"
        strokeOpacity="0.34"
      />

      <polygon
        points="360,214 538,132 538,584 360,668"
        fill="url(#architecture-plane-b)"
        stroke="#5db4d3"
        strokeOpacity="0.27"
      />

      <polygon
        points="538,312 678,248 678,528 538,584"
        fill="var(--dnh-primary)"
        fillOpacity="0.08"
        stroke="#5db4d3"
        strokeOpacity="0.20"
      />

      {/* Strong vertical spines */}
      <rect
        x="354"
        y="142"
        width="5"
        height="526"
        fill="#67bdd9"
        fillOpacity="0.45"
      />

      <rect
        x="536"
        y="132"
        width="3"
        height="452"
        fill="#67bdd9"
        fillOpacity="0.26"
      />

      {/* orange axis */}
      <rect
        x="430"
        y="58"
        width="2"
        height="610"
        fill="url(#architecture-orange)"
      />

      {/* Perspective lines */}
      <path d="M0 200L358 428" stroke="#74c7e2" strokeOpacity="0.32" />

      <path d="M0 410L358 428" stroke="#74c7e2" strokeOpacity="0.16" />

      <path d="M0 720L358 428" stroke="#74c7e2" strokeOpacity="0.20" />

      <path d="M358 428L760 710" stroke="#74c7e2" strokeOpacity="0.12" />

      <path d="M358 428L760 492" stroke="#74c7e2" strokeOpacity="0.10" />

      {/* floor perspective */}
      <path d="M0 646H760" stroke="#74c7e2" strokeOpacity="0.18" />

      <path d="M104 646L458 820" stroke="#74c7e2" strokeOpacity="0.08" />

      <path d="M276 646L602 820" stroke="#74c7e2" strokeOpacity="0.08" />

      <path d="M470 646L710 820" stroke="#74c7e2" strokeOpacity="0.07" />

      {/* Micro markers */}
      <rect x="351" y="422" width="14" height="14" fill="var(--dnh-accent)" />

      <rect x="427" y="286" width="6" height="6" fill="var(--dnh-accent)" />

      <rect x="590" y="552" width="5" height="5" fill="#e53935" />

      {/* small architectural accents */}
      <path
        d="M104 646H196"
        stroke="var(--dnh-accent)"
        strokeOpacity="0.85"
        strokeWidth="2"
      />

      <path d="M446 524H486" stroke="var(--dnh-accent)" strokeOpacity="0.65" />
    </svg>
  );
}

/* =============================================================================
   BACKGROUND
============================================================================= */

function GlobalBackground() {
  return (
    <>
      {/* background grid */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.22]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(255,255,255,0.035) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(255,255,255,0.025) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "96px 96px",
        }}
      />

      {/* light depth */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[18%]
          top-[14%]

          h-[340px]
          w-[340px]

          bg-brand-primary/[0.10]

          blur-[120px]
        "
      />

      {/* accent depth */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[-100px]
          right-[36%]

          h-[240px]
          w-[240px]

          bg-brand-accent/[0.04]

          blur-[100px]
        "
      />

      {/* top border glow */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0

          h-px

          bg-gradient-to-r
          from-transparent
          via-brand-primary/80
          to-transparent
        "
      />
    </>
  );
}
