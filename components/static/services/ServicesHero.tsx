import Link from "next/link";

import { ArrowDownLeft, ArrowLeft, ArrowUpLeft } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   Services
============================================================================= */

const SERVICES = [
  {
    en: "PRIVATE WEALTH",
    title: "استراتژی ثروت خصوصی",
    href: "/fa/services/private-wealth-strategy",
  },
  {
    en: "PORTFOLIO",
    title: "هوشمندی پرتفوی",
    href: "/fa/services/portfolio-intelligence",
  },
  {
    en: "STRATEGIC FINANCE",
    title: "مشاوره مالی راهبردی",
    href: "/fa/services/strategic-financial-advisory",
  },
  {
    en: "MACRO & MARKET",
    title: "مشاوره اقتصاد و بازار",
    href: "/fa/services/macro-market-advisory",
  },
  {
    en: "RISK & PROTECTION",
    title: "مدیریت ریسک و حفاظت از ثروت",
    href: "/fa/services/risk-management-wealth-protection",
  },
  {
    en: "EXECUTIVE",
    title: "نشست‌های تخصصی مدیران",
    href: "/fa/services/executive-briefings",
  },
] as const;

/* =============================================================================
   HERO — SERVER COMPONENT

   No use client
   No hydration logic
   No JS animation
   No image dependency
============================================================================= */

export function ServicesHero() {
  return (
    <section
      id="services-intro"
      dir="rtl"
      aria-labelledby="services-hero-title"
      className="
        relative
        isolate

        min-h-[100svh]
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
          flex
          min-h-[100svh]
          w-full
          max-w-[1536px]

          flex-col

          px-5
          pb-8
          pt-[116px]

          sm:px-8
          sm:pb-10
          sm:pt-[126px]

          lg:px-12
          lg:pb-10
          lg:pt-[108px]

          xl:px-16

          2xl:px-20
        "
      >
        {/* =======================================================
            Main viewport
        ======================================================== */}

        <div
          className="
            grid
            flex-1

            items-center
            gap-12

            py-12

            lg:grid-cols-[0.98fr_1.02fr]
            lg:gap-16
            lg:py-9

            xl:grid-cols-[1.02fr_0.98fr]
            xl:gap-20
          "
        >
          {/* =====================================================
              SERVICE INDEX — LEFT
          ====================================================== */}

          <div
            className="
              order-2

              lg:col-start-2
              lg:row-start-1
            "
          >
            <ServiceIndex />
          </div>

          {/* =====================================================
              COPY — RIGHT
          ====================================================== */}

          <div
            className="
              contents

              lg:block
              lg:col-start-1
              lg:row-start-1
            "
          >
            <div className="order-1">
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

              <p
                className="
                  text-[10px]
                  font-black

                  text-white/68

                  sm:text-[11px]
                "
              >
                خدمات راهبردی DNH
              </p>
            </div>

            {/* ===================================================
                SEO H1
            ==================================================== */}

            <h1
              id="services-hero-title"
              className="
                max-w-[820px]

                text-[36px]
                font-black
                leading-[1.62]
                tracking-[-0.05em]

                text-white

                sm:text-[44px]

                lg:text-[52px]
                lg:leading-[1.52]

                xl:text-[59px]
              "
            >
              خدمات راهبردی،
              <br />
              برای{" "}
              <span className="text-brand-accent">
                تصمیم‌های مالی پیچیده‌تر.
              </span>
            </h1>

            <p
              className="
                mt-6
                max-w-[680px]

                text-[13px]
                font-medium
                leading-[2.2]

                text-white/57

                sm:text-[14px]

                lg:text-[15px]
              "
            >
              از معماری ثروت و پرتفوی تا ریسک، تصمیم‌های کسب‌وکار و محیط
              اقتصادی؛ مسیر مناسب بر اساس نوع مسئله و شرایط تصمیم انتخاب می‌شود.
            </p>

            </div>

            {/* ===================================================
                Actions
            ==================================================== */}

            <div
              className="
                order-3
                mt-0

                flex
                flex-col
                gap-3

                lg:order-none
                lg:mt-8

                sm:flex-row
                sm:flex-wrap
              "
            >
              <ActionButton
                href="#service-fit"
                variant="assessment"
                size="lg"
                icon={ArrowDownLeft}
                className="
                  w-full

                  bg-brand-accent
                  text-white

                  shadow-[0_18px_48px_rgba(252,133,2,.18)]

                  hover:-translate-y-0.5
                  hover:bg-[#eb7c01]

                  sm:w-auto
                  sm:min-w-[245px]
                "
              >
                مشاهده مسیرهای خدمات
              </ActionButton>

              <ActionButton
                href="/fa/financial-decision-assessment"
                variant="secondary"
                size="lg"
                icon={ArrowLeft}
                className="
                  w-full

                  border-white/20
                  bg-white/[0.025]

                  text-white

                  shadow-none

                  hover:border-white/38
                  hover:bg-white/[0.065]
                  hover:text-white

                  sm:w-auto
                  sm:min-w-[235px]
                "
              >
                ارزیابی تصمیم مالی
              </ActionButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   Service Index
============================================================================= */

function ServiceIndex() {
  return (
    <div
      className="
        group/index

        relative

        mx-auto
        w-full
        max-w-[690px]

        overflow-hidden

        border
        border-white/12

        bg-white/[0.025]

        shadow-[0_38px_110px_rgba(0,0,0,.17)]

        transition-[border-color,box-shadow,transform]
        duration-500

        hover:-translate-y-[2px]
        hover:border-white/20
        hover:shadow-[0_46px_130px_rgba(0,0,0,.22)]
      "
    >
      {/* =========================================================
          Header
      ========================================================== */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-6

          border-b
          border-white/10

          px-5
          py-5

          sm:px-6
        "
      >
        <div>
          <p
            dir="ltr"
            className="
              text-[7px]
              font-black
              tracking-[0.19em]

              text-brand-accent
            "
          >
            ADVISORY INDEX
          </p>

          <p
            className="
              mt-1.5

              text-[10px]
              font-bold

              text-white/50
            "
          >
            مسیر را از مسئله انتخاب کنید
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
              h-[5px]
              w-[5px]

              bg-brand-accent
            "
          />

          <span
            className="
              h-px
              w-8

              bg-white/16

              transition-[width,background-color]
              duration-500

              group-hover/index:w-14
              group-hover/index:bg-brand-accent/55
            "
          />
        </div>
      </div>

      {/* =========================================================
          Service Links
      ========================================================== */}

      <div className="divide-y divide-white/10">
        {SERVICES.map((service) => (
          <ServiceLink key={service.href} service={service} />
        ))}
      </div>

      {/* =========================================================
          Footer
      ========================================================== */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-5

          border-t
          border-white/10

          bg-black/[0.07]

          px-5
          py-4

          sm:px-6
        "
      >
        <p
          className="
            text-[8px]
            font-medium

            text-white/30
          "
        >
          مطمئن نیستید کدام مسیر مناسب است؟
        </p>

        <Link
          href="#service-fit"
          className="
            group/fit

            inline-flex
            items-center
            gap-2

            text-[8px]
            font-black

            text-[#82cee4]

            outline-none

            transition-colors
            duration-300

            hover:text-brand-accent

            focus-visible:ring-2
            focus-visible:ring-focus/50
          "
        >
          تشخیص مسیر مناسب
          <ArrowDownLeft
            aria-hidden="true"
            className="
              h-3.5
              w-3.5

              transition-transform
              duration-300

              group-hover/fit:translate-y-0.5
              group-hover/fit:-translate-x-0.5
            "
            strokeWidth={1.6}
          />
        </Link>
      </div>
    </div>
  );
}

/* =============================================================================
   Service Link
============================================================================= */

function ServiceLink({ service }: { service: (typeof SERVICES)[number] }) {
  return (
    <Link
      href={service.href}
      className="
        group/service

        relative

        grid
        min-h-[72px]

        items-center
        gap-4

        px-5
        py-4

        outline-none

        transition-[background-color]
        duration-300

        hover:bg-white/[0.045]

        focus-visible:bg-white/[0.055]
        focus-visible:ring-2
        focus-visible:ring-inset
        focus-visible:ring-focus/50

        sm:grid-cols-2
        sm:px-6
      "
    >
      {/* English context */}

   

      {/* Title */}

      <span
        className="
          text-[12px]
          font-black
          leading-[1.8]

          text-white/78

          transition-colors
          duration-300

          group-hover/service:text-white

          sm:text-[13px]
        "
      >
        {service.title}
      </span>

      {/* Arrow */}

      <span
        className="
          flex
          h-8
          w-8

          items-center
          justify-center

          border
          border-white/10

          text-white/34

          transition-[border-color,background-color,color,transform]
          duration-300

          group-hover/service:-translate-x-1
          group-hover/service:border-brand-accent/35
          group-hover/service:bg-brand-accent/[0.08]
          group-hover/service:text-brand-accent
        "
      >
        <ArrowUpLeft
          aria-hidden="true"
          className="h-3.5 w-3.5"
          strokeWidth={1.5}
        />
      </span>

      {/* Hover signal */}

      <span
        aria-hidden="true"
        className="
          absolute
          inset-y-0
          right-0

          w-[2px]

          origin-bottom
          scale-y-0

          bg-brand-accent

          transition-transform
          duration-300

          group-hover/service:scale-y-100
          group-focus-visible/service:scale-y-100
        "
      />
    </Link>
  );
}

/* =============================================================================
   Context link
============================================================================= */

function ContextLink({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className="
        text-[9px]
        font-bold

        text-white/35

        outline-none

        transition-colors
        duration-200

        hover:text-white

        focus-visible:ring-2
        focus-visible:ring-focus/50
      "
    >
      {children}
    </Link>
  );
}

function SmallDot() {
  return (
    <span
      aria-hidden="true"
      className="
        h-[4px]
        w-[4px]

        bg-brand-primary
      "
    />
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
            "radial-gradient(circle at 24% 46%,rgba(22,115,148,.24),transparent 30%),linear-gradient(116deg,#022936 0%,#033847 52%,#022d3a 100%)",
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
            "linear-gradient(to right,rgba(255,255,255,.08) 1px,transparent 1px)",
          backgroundSize: "118px 100%",
        }}
      />

      {/* large quiet SERVICES mark */}

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          -bottom-[40px]
          -left-[10px]

          select-none

          font-mono
          text-[100px]
          font-black
          leading-none
          tracking-[-0.07em]

          text-white/[0.015]

          sm:text-[150px]

          lg:-bottom-[65px]
          lg:text-[205px]
        "
      >
        SERVICES
      </span>

   
    </>
  );
}
