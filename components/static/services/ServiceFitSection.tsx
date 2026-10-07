import Link from "next/link";

import {
  ArrowLeft,
  ArrowUpLeft,
  Briefcase,
  Layers3,
  PieChart,
  Presentation,
  ShieldCheck,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   Services
============================================================================= */

const SERVICES = [
  {
    slug: "wealth",
    en: "PRIVATE WEALTH STRATEGY",
    title: "استراتژی ثروت خصوصی",

    problem: "نبود تصویر یکپارچه از ثروت",

    outcome: "تصویری ساختاریافته از وضعیت ثروت، ریسک‌ها و مسیرهای قابل بررسی.",

    labels: ["اهداف", "نقدشوندگی", "ریسک"] as const,

    icon: Layers3,

    href: "/services/private-wealth-strategy",
  },

  {
    slug: "portfolio",
    en: "PORTFOLIO INTELLIGENCE",
    title: "هوشمندی پرتفوی",

    problem: "تمرکز ریسک و ساختار نامتناسب پرتفوی",

    outcome:
      "ارزیابی ساختار پرتفوی، نقاط قابل توجه و حوزه‌های نیازمند بازبینی.",

    labels: ["ساختار", "تمرکز", "نقدشوندگی"] as const,

    icon: PieChart,

    href: "/services/portfolio-intelligence",
  },

  {
    slug: "finance",
    en: "STRATEGIC FINANCIAL ADVISORY",
    title: "مشاوره مالی راهبردی",

    problem: "پیوند سرمایه، نقدینگی و تأمین مالی",

    outcome: "تصویری ساختاریافته از گزینه‌ها، ریسک‌ها و مسیر تصمیم مالی.",

    labels: ["سرمایه", "نقدینگی", "تأمین مالی"] as const,

    icon: Briefcase,

    href: "/services/strategic-financial-advisory",
  },

  {
    slug: "macro",
    en: "MACRO & MARKET ADVISORY",
    title: "مشاوره اقتصاد و بازار",

    problem: "تغییر محیط اقتصادی و بازار",

    outcome: "بررسی شرایط، سناریوهای مرتبط و پیامدهای راهبردی برای تصمیم.",

    labels: ["تورم", "ارز", "سیاست‌گذاری"] as const,

    icon: TrendingUp,

    href: "/services/macro-market-advisory",
  },

  {
    slug: "risk",
    en: "RISK MANAGEMENT & WEALTH PROTECTION",
    title: "مدیریت ریسک و حفاظت از ثروت",

    problem: "ریسک‌های پنهان در ثروت یا کسب‌وکار",

    outcome: "تصویری ساختاریافته از ریسک‌ها و اولویت‌های حفاظتی.",

    labels: ["ریسک", "ساختار", "حفاظت"] as const,

    icon: ShieldCheck,

    href: "/services/risk-management-wealth-protection",
  },

  {
    slug: "executive",
    en: "EXECUTIVE BRIEFINGS",
    title: "نشست‌های تخصصی مدیران",

    problem: "نیاز به بررسی متمرکز در سطح ارشد",

    outcome: "جمع‌بندی حرفه‌ای، سناریوها و مسیرهای قابل بررسی برای تصمیم.",

    labels: ["مسئله", "سناریو", "تصمیم"] as const,

    icon: Presentation,

    href: "/services/executive-briefings",
  },
] as const;

/* =============================================================================
   Section
   Server Component
============================================================================= */

export function ServiceFitSection() {
  return (
    <section
      id="service-fit"
      dir="rtl"
      aria-labelledby="service-fit-title"
      className="
        relative
        isolate

        scroll-mt-24
        overflow-hidden

        border-b
        border-line

        bg-white

        sm:scroll-mt-28
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

            lg:grid-cols-[0.88fr_1.12fr]
            lg:items-end
            lg:gap-16
          "
        >
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
                مسیر مناسب از مسئله شروع می‌شود
              </span>
            </div>

            <h2
              id="service-fit-title"
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
              مسئله را پیدا کنید؛
              <br />
              مسیر مناسب{" "}
              <span className="text-brand-primary">روشن‌تر می‌شود.</span>
            </h2>
          </div>

          <div className="lg:pb-1">
            <p
              className="
                max-w-[640px]

                text-[13px]
                font-medium
                leading-[2.2]

                text-ink-muted

                sm:text-[14px]

                lg:text-[15px]
              "
            >
              لازم نیست از قبل نام خدمت مناسب را بدانید. ببینید کدام مسئله به
              موقعیتی که امروز با آن روبه‌رو هستید نزدیک‌تر است.
            </p>
          </div>
        </div>

        {/* =======================================================
            Cards
        ======================================================== */}

        <div
          className="
            mt-12

            grid
            gap-5

            sm:mt-14

            md:grid-cols-2

            xl:mt-16
            xl:grid-cols-3
            xl:gap-6
          "
        >
          {SERVICES.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>

        {/* =======================================================
            Assessment
        ======================================================== */}

        <div
          className="
            mt-10

            flex
            flex-col
            gap-6

            border-t
            border-line

            pt-7

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div>
            <p
              className="
                text-[10px]
                font-bold

                text-ink-muted
              "
            >
              هنوز مطمئن نیستید کدام مسیر مناسب است؟
            </p>

            <p
              className="
                mt-1.5

                text-[13px]
                font-black

                text-ink
              "
            >
              از مسئله شروع کنید، نه از انتخاب خدمت.
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

              shadow-[0_14px_36px_rgba(22,115,148,.14)]

              hover:-translate-y-0.5

              sm:w-auto
              sm:min-w-[250px]
            "
          >
            ارزیابی اولیه تصمیم مالی
          </ActionButton>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   Service Card
============================================================================= */

function ServiceCard({ service }: { service: (typeof SERVICES)[number] }) {
  return (
    <article
      className="
        group/card

        relative

        overflow-hidden

        border
        border-[#174c5e]

        bg-[#032f3f]

        text-white

        shadow-[0_20px_55px_rgba(2,47,62,.12)]

        transition-[transform,border-color,box-shadow]
        duration-300

        hover:-translate-y-1.5
        hover:border-[#267996]
        hover:shadow-[0_28px_72px_rgba(2,47,62,.20)]
      "
    >
      <Link
        href={service.href}
        aria-labelledby={`service-${service.slug}`}
        className="
          flex
          h-full
          flex-col

          outline-none

          focus-visible:ring-2
          focus-visible:ring-inset
          focus-visible:ring-focus/60
        "
      >
        {/* =====================================================
            Concept visual
        ====================================================== */}

        <ServiceConceptVisual labels={service.labels} icon={service.icon} />

        {/* =====================================================
            Content
        ====================================================== */}

        <div
          className="
            flex
            flex-1
            flex-col

            px-5
            pb-5
            pt-6

            sm:px-6
            sm:pb-6
          "
        >
          <h3
            id={`service-${service.slug}`}
            className="
              mt-2

              text-[19px]
              font-black
              leading-[1.75]

              text-white

              sm:text-[21px]
            "
          >
            {service.title}
          </h3>

          {/* outcome */}

          <div
            className="
              mt-5

              border-r
              border-white/12

              pr-4
            "
          >
            <p
              className="
                text-[8px]
                font-black

                text-brand-accent
              "
            >
              نتیجه مورد انتظار
            </p>

            <p
              className="
                mt-2

                text-[11px]
                font-medium
                leading-[2]

                text-white/55

                sm:text-[12px]
              "
            >
              {service.outcome}
            </p>
          </div>

          {/* link */}

          <div
            className="
              mt-auto
              pt-7
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
                gap-5

                border-t
                border-white/10

                pt-4
              "
            >
              <span
                className="
                  text-[10px]
                  font-black

                  text-[#8dd4e7]

                  transition-colors
                  duration-300

                  group-hover/card:text-brand-accent
                "
              >
                مشاهده جزئیات خدمت
              </span>

              <span
                className="
                  flex
                  h-9
                  w-9
                  shrink-0

                  items-center
                  justify-center

                  border
                  border-white/12

                  bg-white/[0.03]

                  text-white/55

                  transition-[background-color,border-color,color,transform]
                  duration-300

                  group-hover/card:-translate-x-1
                  group-hover/card:border-brand-accent
                  group-hover/card:bg-brand-accent
                  group-hover/card:text-[#073142]
                "
              >
                <ArrowUpLeft
                  aria-hidden="true"
                  className="h-4 w-4"
                  strokeWidth={1.6}
                />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

/* =============================================================================
   Concept Visual

   Everything uses one coordinate system:
   concept labels -> lines -> central service icon
============================================================================= */

function ServiceConceptVisual({
  labels,
  icon: Icon,
}: {
  labels: readonly [string, string, string];
  icon: LucideIcon;
}) {
  return (
    <div
      className="
        relative

        h-[158px]

        overflow-hidden

        bg-[#063747]

        sm:h-[168px]
      "
    >
      {/* atmosphere */}

      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
        "
        style={{
          background:
            "radial-gradient(circle at 50% 48%,rgba(46,151,184,.16),transparent 27%),linear-gradient(135deg,rgba(255,255,255,.025),transparent 70%)",
        }}
      />

      {/* =======================================================
          Unified semantic diagram
      ======================================================== */}

      <svg
        aria-hidden="true"
        viewBox="0 0 360 150"
        preserveAspectRatio="xMidYMid meet"
        className="
          absolute
          inset-0

          h-full
          w-full

          text-[#56b4d0]
        "
        fill="none"
      >
        {/* subtle structure */}

        <circle
          cx="180"
          cy="75"
          r="48"
          stroke="currentColor"
          strokeOpacity=".08"
        />

        <circle
          cx="180"
          cy="75"
          r="38"
          stroke="currentColor"
          strokeOpacity=".05"
        />

        {/* =====================================================
            Lines terminate exactly at central icon box
            box = x150 → 210 / y45 → 105
        ====================================================== */}

        {/* top left */}

        <path
          d="M78 37H118L150 60"
          stroke="currentColor"
          strokeOpacity=".44"
          strokeWidth="1"
          className="
            transition-[stroke-opacity]
            duration-300

            group-hover/card:[stroke-opacity:.8]
          "
        />

        {/* top right */}

        <path
          d="M282 37H242L210 60"
          stroke="currentColor"
          strokeOpacity=".44"
          strokeWidth="1"
          className="
            transition-[stroke-opacity]
            duration-300

            group-hover/card:[stroke-opacity:.8]
          "
        />

        {/* bottom */}

        <path
          d="M180 126V105"
          stroke="#FC8502"
          strokeOpacity=".65"
          strokeWidth="1.4"
        />

        {/* outer quiet rails */}

        <path d="M20 116H108" stroke="currentColor" strokeOpacity=".10" />

        <path d="M252 116H340" stroke="currentColor" strokeOpacity=".10" />

        {/* nodes */}

        <rect
          x="74"
          y="33"
          width="8"
          height="8"
          fill="currentColor"
          fillOpacity=".5"
        />

        <rect
          x="278"
          y="33"
          width="8"
          height="8"
          fill="currentColor"
          fillOpacity=".5"
        />

        <rect x="176" y="122" width="8" height="8" fill="#FC8502" />

        {/* central integrated frame */}

        <rect
          x="150"
          y="45"
          width="60"
          height="60"
          fill="#032F3F"
          stroke="#66BDD5"
          strokeOpacity=".42"
        />

        <rect
          x="156"
          y="51"
          width="48"
          height="48"
          stroke="white"
          strokeOpacity=".06"
        />

        {/* labels */}

        <text
          x="24"
          y="27"
          fill="white"
          fillOpacity=".52"
          fontSize="9"
          fontWeight="700"
        >
          {labels[0]}
        </text>

        <text
          x="336"
          y="27"
          fill="white"
          fillOpacity=".52"
          fontSize="9"
          fontWeight="700"
          textAnchor="end"
        >
          {labels[1]}
        </text>

        <text
          x="180"
          y="145"
          fill="#FC8502"
          fillOpacity=".92"
          fontSize="9"
          fontWeight="800"
          textAnchor="middle"
        >
          {labels[2]}
        </text>
      </svg>

      {/* =======================================================
          Central icon
          Exactly aligned to SVG center (180 / 75)
      ======================================================== */}

      <div
        className="
          absolute
          left-1/2
          top-1/2

          z-10

          flex
          h-[60px]
          w-[60px]

          -translate-x-1/2
          -translate-y-1/2

          items-center
          justify-center

          text-[#82cee4]

          transition-[color,transform,filter]
          duration-300

          group-hover/card:
          -translate-x-1/2
          group-hover/card:
          -translate-y-[54%]

          group-hover/card:text-brand-accent

          group-hover/card:
          drop-shadow-[0_0_10px_rgba(252,133,2,.22)]
        "
      >
        <Icon
          aria-hidden="true"
          className="
            h-7
            w-7
          "
          strokeWidth={1.45}
        />
      </div>

      {/* orange architectural mark */}
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
            "linear-gradient(112deg,#f5f9fa 0%,#ffffff 48%,#f8fbfc 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.065]
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
