import {
  ArrowLeft,
  ArrowUpLeft,
  BriefcaseBusiness,
  Gem,
  PieChart,
  Route,
  ScanSearch,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   FINAL CTA
   Server Component
============================================================================= */

export function ServicesFinalCtaSection() {
  return (
    <section
      id="services-cta"
      dir="rtl"
      aria-labelledby="services-cta-title"
      className="
        relative
        isolate

        scroll-mt-24
        overflow-hidden

        bg-[#022f3e]
        text-white

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
          grid
          min-h-[650px]
          w-full
          max-w-[1536px]

          items-center
          gap-12

          px-5
          py-16

          sm:min-h-[700px]
          sm:px-8
          sm:py-20

          lg:grid-cols-[0.86fr_1.14fr]
          lg:gap-20
          lg:px-12
          lg:py-24

          xl:min-h-[730px]
          xl:px-16

          2xl:px-20
        "
      >
        {/* =======================================================
            VISUAL
        ======================================================== */}

        <div
          className="
            order-2

            lg:order-2
          "
        >
          <DecisionField />
        </div>

        {/* =======================================================
            COPY
        ======================================================== */}

        <div
          className="
            order-1

            lg:order-1
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

                text-white/62

                sm:text-[11px]
              "
            >
              نقطه شروع
            </span>
          </div>

          <h2
            id="services-cta-title"
            className="
              max-w-[850px]

              text-[35px]
              font-black
              leading-[1.68]
              tracking-[-0.05em]

              text-white

              sm:text-[44px]

              lg:text-[54px]
              lg:leading-[1.55]

              xl:text-[60px]
            "
          >
            خدمت مناسب،
            <br />
            از تعریف درست <span className="text-brand-accent">مسئله</span> شروع
            می‌شود.
          </h2>

          <p
            className="
              mt-6
              max-w-[690px]

              text-[13px]
              font-medium
              leading-[2.25]

              text-white/52

              sm:text-[14px]

              lg:text-[15px]
            "
          >
            اگر با یک تصمیم مالی مهم، ساختار ثروت، پرتفوی، ریسک یا مسئله مالی
            کسب‌وکار روبه‌رو هستید، ابتدا مسئله و شرایط آن را روشن کنیم؛ مسیر
            مناسب بعد از آن مشخص‌تر می‌شود.
          </p>

          {/* =====================================================
              ACTIONS
          ====================================================== */}

          <div
            className="
              mt-8

              flex
              flex-col
              gap-3

              sm:flex-row
              sm:flex-wrap
            "
          >
            <ActionButton
              href="/fa/financial-decision-assessment"
              variant="assessment"
              size="lg"
              icon={ArrowLeft}
              className="
                w-full

                bg-brand-accent
                text-white

                shadow-[0_20px_52px_rgba(252,133,2,.20)]

                hover:-translate-y-0.5
                hover:bg-[#eb7c01]
                hover:shadow-[0_26px_68px_rgba(252,133,2,.28)]

                sm:w-auto
                sm:min-w-[300px]
              "
            >
              شروع ارزیابی اولیه تصمیم مالی
            </ActionButton>

            <ActionButton
              href="/fa/request-strategic-consultation"
              variant="secondary"
              size="lg"
              icon={ArrowUpLeft}
              className="
                w-full

                border-white/18
                bg-white/[0.025]

                text-white

                shadow-none

                hover:-translate-y-0.5
                hover:border-white/35
                hover:bg-white/[0.065]
                hover:text-white

                sm:w-auto
                sm:min-w-[245px]
              "
            >
              درخواست مشاوره راهبردی
            </ActionButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   DECISION FIELD
============================================================================= */

function DecisionField() {
  return (
    <div
      className="
        group/map

        relative
        mx-auto
        w-full
        max-w-[580px]

        overflow-hidden

        border
        border-white/12

        bg-[#063746]/80

        shadow-[0_38px_110px_rgba(0,0,0,.22)]
      "
    >
      <MapAtmosphere />

      {/* =======================================================
          Header
      ======================================================== */}

      <div
        className="
          relative
          z-20

          flex
          items-center
          justify-between
          gap-5

          border-b
          border-white/10

          px-5
          py-5

          sm:px-6
        "
      >
        <div>
          <p
            className="
              text-[10px]
              font-black

              text-white/74
            "
          >
            از مسئله تا مسیر مناسب
          </p>

          <p
            className="
              mt-1

              text-[8px]
              font-medium

              text-white/28
            "
          >
            خدمت از روی مسئله انتخاب می‌شود، نه برعکس.
          </p>
        </div>

        <div
          aria-hidden="true"
          className="
            flex
            items-center
            gap-2
          "
        >
          <span
            className="
              h-[6px]
              w-[6px]

              bg-brand-accent

              shadow-[0_0_14px_rgba(252,133,2,.55)]
            "
          />

          <span
            className="
              h-px
              w-9

              bg-white/14

              transition-[width,background-color]
              duration-500

              group-hover/map:w-14
              group-hover/map:bg-brand-accent/50
            "
          />
        </div>
      </div>

      {/* =======================================================
          DESKTOP / TABLET MAP
      ======================================================== */}

      <div
        className="
          relative
          z-10

          hidden

          px-5
          pb-7
          pt-8

          sm:block
          sm:px-6
        "
      >
        {/* =====================================================
            SOURCE LABEL
        ====================================================== */}

        <p
          className="
            mb-4

            text-[8px]
            font-black

            text-[#82cee4]/48
          "
        >
          مسئله از کجا شروع شده است؟
        </p>

        {/* =====================================================
            4 INPUT NODES
        ====================================================== */}

        <div
          className="
            relative

            grid
            grid-cols-4
            gap-3

            pb-12
          "
        >
          <InputNode icon={Gem} label="ساختار ثروت" />

          <InputNode icon={PieChart} label="پرتفوی" />

          <InputNode icon={BriefcaseBusiness} label="کسب‌وکار" />

          <InputNode icon={ShieldCheck} label="ریسک" />

          {/* ---------------------------------------------------
              Vertical stems
          ---------------------------------------------------- */}

          <span
            aria-hidden="true"
            className="
              absolute
              bottom-[25px]
              right-[12.5%]

              h-[25px]
              w-px

              bg-[#75c6dd]/24
            "
          />

          <span
            aria-hidden="true"
            className="
              absolute
              bottom-[25px]
              right-[37.5%]

              h-[25px]
              w-px

              bg-[#75c6dd]/24
            "
          />

          <span
            aria-hidden="true"
            className="
              absolute
              bottom-[25px]
              left-[37.5%]

              h-[25px]
              w-px

              bg-[#75c6dd]/24
            "
          />

          <span
            aria-hidden="true"
            className="
              absolute
              bottom-[25px]
              left-[12.5%]

              h-[25px]
              w-px

              bg-[#75c6dd]/24
            "
          />

          {/* ---------------------------------------------------
              Common bus
          ---------------------------------------------------- */}

          <span
            aria-hidden="true"
            className="
              absolute
              bottom-[24px]
              left-[12.5%]
              right-[12.5%]

              h-px

              bg-gradient-to-r
              from-[#75c6dd]/10
              via-[#75c6dd]/50
              to-[#75c6dd]/10
            "
          />

          {/* center exit */}

          <span
            aria-hidden="true"
            className="
              absolute
              bottom-0
              left-1/2

              h-[25px]
              w-px

              -translate-x-1/2

              bg-[#75c6dd]/42
            "
          />

          <span
            aria-hidden="true"
            className="
              routing-pulse
              absolute
              bottom-[20px]
              left-1/2

              h-[6px]
              w-[6px]

              -translate-x-1/2

              bg-[#82cee4]

              shadow-[0_0_16px_rgba(130,206,228,.65)]
            "
          />
        </div>

        {/* =====================================================
            STEP 01
        ====================================================== */}

        <RoutingStep
          icon={ScanSearch}
          eyebrow="اول"
          title="تعریف مسئله"
          description="موضوع، شرایط و عوامل مؤثر باید ابتدا روشن شوند."
        />

        <VerticalConnector />

        {/* =====================================================
            STEP 02
        ====================================================== */}

        <RoutingStep
          icon={Route}
          eyebrow="بعد"
          title="بررسی تناسب"
          description="نوع مسئله، سطح پیچیدگی و مسیر مناسب بررسی می‌شود."
          secondary
        />

        <OrangeConnector />

        {/* =====================================================
            RESULT
        ====================================================== */}

        <div
          className="
            relative

            overflow-hidden

            bg-brand-accent

            px-5
            py-5

            text-[#073142]

            shadow-[0_18px_50px_rgba(252,133,2,.14)]
          "
        >
          <span
            aria-hidden="true"
            className="
              absolute
              inset-y-0
              right-0

              w-[5px]

              bg-white/35
            "
          />

          <div
            className="
              flex
              items-center
              justify-between
              gap-5
            "
          >
            <div>
              <p
                className="
                  text-[8px]
                  font-black

                  opacity-60
                "
              >
                نتیجه
              </p>

              <p
                className="
                  mt-1

                  text-[16px]
                  font-black

                  sm:text-[17px]
                "
              >
                مسیر مناسب خدمت
              </p>
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
                  h-px
                  w-12

                  bg-[#073142]/25
                "
              />

              <span
                className="
                  flex
                  h-10
                  w-10

                  items-center
                  justify-center

                  border
                  border-[#073142]/18

                  bg-[#073142]/8
                "
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =======================================================
          MOBILE
      ======================================================== */}

      <div
        className="
          relative
          z-10

          px-5
          py-6

          sm:hidden
        "
      >
        <p
          className="
            mb-4

            text-[9px]
            font-black

            text-white/48
          "
        >
          مسئله می‌تواند از بخش‌های مختلف شروع شود:
        </p>

        <div className="grid grid-cols-2 gap-2">
          <InputNodeMobile icon={Gem} label="ساختار ثروت" />

          <InputNodeMobile icon={PieChart} label="پرتفوی" />

          <InputNodeMobile icon={BriefcaseBusiness} label="کسب‌وکار" />

          <InputNodeMobile icon={ShieldCheck} label="ریسک" />
        </div>

        <MobileLine />

        <RoutingStep
          icon={ScanSearch}
          eyebrow="اول"
          title="تعریف مسئله"
          description="شناخت مسئله و شرایط آن"
          compact
        />

        <MobileLine />

        <RoutingStep
          icon={Route}
          eyebrow="بعد"
          title="بررسی تناسب"
          description="تشخیص مسیر مناسب بررسی"
          secondary
          compact
        />

        <MobileOrangeLine />

        <div
          className="
            bg-brand-accent

            px-4
            py-4

            text-[#073142]
          "
        >
          <p className="text-[8px] font-black opacity-60">نتیجه</p>

          <p
            className="
              mt-1

              text-[15px]
              font-black
            "
          >
            مسیر مناسب خدمت
          </p>
        </div>
      </div>

      <RoutingMotion />
    </div>
  );
}

/* =============================================================================
   INPUT NODE
============================================================================= */

function InputNode({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div
      className="
        group/node

        relative
        z-10

        flex
        min-h-[92px]

        flex-col
        items-center
        justify-center
        gap-3

        border
        border-white/10

        bg-white/[0.035]

        px-2
        py-4

        text-center

        transition-[background-color,border-color,transform,box-shadow]
        duration-300

        hover:-translate-y-1
        hover:border-[#82cee4]/30
        hover:bg-[#82cee4]/[0.06]
        hover:shadow-[0_12px_32px_rgba(0,0,0,.12)]
      "
    >
      <span
        className="
          flex
          h-9
          w-9

          items-center
          justify-center

          border
          border-[#82cee4]/18

          bg-[#82cee4]/[0.055]

          text-[#82cee4]

          transition-[border-color,background-color,color]
          duration-300

          group-hover/node:border-brand-accent/35
          group-hover/node:bg-brand-accent/[0.08]
          group-hover/node:text-brand-accent
        "
      >
        <Icon className="h-4 w-4" strokeWidth={1.5} />
      </span>

      <span
        className="
          text-[9px]
          font-black

          text-white/62
        "
      >
        {label}
      </span>

      <span
        aria-hidden="true"
        className="
          absolute
          -bottom-[4px]
          left-1/2

          h-[7px]
          w-[7px]

          -translate-x-1/2

          bg-[#82cee4]/55

          transition-[background-color,box-shadow]
          duration-300

          group-hover/node:bg-brand-accent
          group-hover/node:shadow-[0_0_12px_rgba(252,133,2,.5)]
        "
      />
    </div>
  );
}

/* =============================================================================
   MOBILE NODE
============================================================================= */

function InputNodeMobile({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) {
  return (
    <div
      className="
        flex
        min-h-[58px]

        items-center
        gap-3

        border
        border-white/10

        bg-white/[0.035]

        px-3
        py-3
      "
    >
      <Icon
        className="
          h-4
          w-4
          shrink-0

          text-[#82cee4]
        "
        strokeWidth={1.5}
      />

      <span
        className="
          text-[9px]
          font-black

          text-white/62
        "
      >
        {label}
      </span>
    </div>
  );
}

/* =============================================================================
   ROUTING STEP
============================================================================= */

function RoutingStep({
  icon: Icon,
  eyebrow,
  title,
  description,
  secondary = false,
  compact = false,
}: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  secondary?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={`
        relative

        mx-auto
        w-full

        border

        ${
          secondary
            ? "border-[#82cee4]/20 bg-[#82cee4]/[0.055]"
            : "border-white/12 bg-white/[0.04]"
        }

        ${compact ? "px-4 py-4" : "max-w-[370px] px-5 py-5"}
      `}
    >
      <div
        className="
          flex
          items-center
          gap-4
        "
      >
        <span
          className="
            flex
            h-11
            w-11
            shrink-0

            items-center
            justify-center

            border
            border-[#82cee4]/18

            bg-[#82cee4]/[0.055]

            text-[#82cee4]
          "
        >
          <Icon className="h-5 w-5" strokeWidth={1.45} />
        </span>

        <div>
          <p
            className="
              text-[8px]
              font-black

              text-brand-accent
            "
          >
            {eyebrow}
          </p>

          <p
            className="
              mt-0.5

              text-[14px]
              font-black

              text-white
            "
          >
            {title}
          </p>
        </div>
      </div>

      <p
        className="
          mt-3

          text-[9px]
          font-medium
          leading-[1.9]

          text-white/37
        "
      >
        {description}
      </p>
    </div>
  );
}

/* =============================================================================
   CONNECTORS
============================================================================= */

function VerticalConnector() {
  return (
    <div
      aria-hidden="true"
      className="
        relative

        mx-auto
        h-12
        w-px

        bg-[#82cee4]/28
      "
    >
      <span
        className="
          routing-flow

          absolute
          left-1/2
          top-0

          h-8
          w-[2px]

          -translate-x-1/2

          bg-gradient-to-b
          from-transparent
          via-[#82cee4]
          to-transparent
        "
      />
    </div>
  );
}

function OrangeConnector() {
  return (
    <div
      aria-hidden="true"
      className="
        relative

        mx-auto
        h-14
        w-px

        bg-brand-accent/45
      "
    >
      <span
        className="
          orange-routing-flow

          absolute
          left-1/2
          top-0

          h-8
          w-[3px]

          -translate-x-1/2

          bg-gradient-to-b
          from-transparent
          via-brand-accent
          to-transparent

          shadow-[0_0_12px_rgba(252,133,2,.35)]
        "
      />
    </div>
  );
}

function MobileLine() {
  return (
    <div
      aria-hidden="true"
      className="
        mx-auto
        h-8
        w-px

        bg-[#82cee4]/25
      "
    />
  );
}

function MobileOrangeLine() {
  return (
    <div
      aria-hidden="true"
      className="
        mx-auto
        h-8
        w-px

        bg-brand-accent/60
      "
    />
  );
}

/* =============================================================================
   ATMOSPHERE
============================================================================= */

function MapAtmosphere() {
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
            "radial-gradient(circle at 50% 42%,rgba(22,115,148,.20),transparent 34%),linear-gradient(135deg,rgba(255,255,255,.02),transparent 64%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.075]
        "
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,.08) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.06) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <span
        aria-hidden="true"
        className="
          absolute
          right-0
          top-0

          h-[3px]
          w-16

          bg-brand-accent
        "
      />
    </>
  );
}

/* =============================================================================
   MOTION
============================================================================= */

function RoutingMotion() {
  return (
    <style>{`
      .routing-pulse {
        animation:
          dnh-routing-node
          2.6s
          ease-in-out
          infinite;
      }

      .routing-flow {
        animation:
          dnh-routing-flow
          2.8s
          ease-in-out
          infinite;
      }

      .orange-routing-flow {
        animation:
          dnh-orange-routing-flow
          2.2s
          ease-in-out
          infinite;
      }

      @keyframes dnh-routing-node {
        0%,
        100% {
          opacity: .35;
          transform:
            translateX(-50%)
            scale(.85);
        }

        50% {
          opacity: 1;
          transform:
            translateX(-50%)
            scale(1.15);
        }
      }

      @keyframes dnh-routing-flow {
        0% {
          top: -25%;
          opacity: 0;
        }

        20% {
          opacity: .8;
        }

        80% {
          opacity: .8;
        }

        100% {
          top: 75%;
          opacity: 0;
        }
      }

      @keyframes dnh-orange-routing-flow {
        0% {
          top: -20%;
          opacity: 0;
        }

        20% {
          opacity: 1;
        }

        80% {
          opacity: 1;
        }

        100% {
          top: 70%;
          opacity: 0;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .routing-pulse,
        .routing-flow,
        .orange-routing-flow {
          animation: none !important;
        }
      }
    `}</style>
  );
}

/* =============================================================================
   FIELD LABEL
============================================================================= */

function FieldLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <span
      className={`
        absolute
        ${className}

        text-[9px]
        font-black

        text-white/30
      `}
    >
      {children}
    </span>
  );
}

/* =============================================================================
   RAIL
============================================================================= */

function RailItem({
  children,
  active = false,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <span
      className={`
        text-[9px]
        font-black

        ${active ? "text-brand-accent" : "text-white/28"}
      `}
    >
      {children}
    </span>
  );
}

function RailDot() {
  return (
    <span
      aria-hidden="true"
      className="
        h-[4px]
        w-[4px]

        bg-white/14
      "
    />
  );
}

/* =============================================================================
   BACKGROUND
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
            "radial-gradient(circle at 22% 48%,rgba(22,115,148,.24),transparent 30%),linear-gradient(116deg,#022936 0%,#033746 52%,#022b38 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.055]
        "
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,.08) 1px,transparent 1px)",
          backgroundSize: "118px 100%",
        }}
      />

   

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -bottom-[65px]
          -left-[20px]

          select-none

          text-[145px]
          font-black
          leading-none

          text-white/[0.015]

          sm:text-[210px]

          lg:text-[270px]
        "
      >
        DNH
      </span>
    </>
  );
}

/* =============================================================================
   CSS MOTION
============================================================================= */

function Motion() {
  return (
    <style>{`
      .decision-pulse {
        animation:
          dnh-decision-pulse
          2.8s
          ease-in-out
          infinite;
      }

      @keyframes dnh-decision-pulse {
        0%,
        100% {
          opacity: .55;
          transform: translateY(-50%) scale(1);
          box-shadow:
            0 0 10px rgba(252,133,2,.25);
        }

        50% {
          opacity: 1;
          transform: translateY(-50%) scale(1.2);
          box-shadow:
            0 0 24px rgba(252,133,2,.65);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .decision-pulse {
          animation: none !important;
        }
      }
    `}</style>
  );
}
