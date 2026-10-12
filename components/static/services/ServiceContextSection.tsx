import Link from "next/link";

import {
  ArrowDownLeft,
  ArrowUpLeft,
  Layers3,
  Network,
  Route,
} from "lucide-react";

/* =============================================================================
   Contexts
============================================================================= */

const CONTEXTS = [
  {
    eyebrow: "CONNECTED VARIABLES",
    title: "وقتی چند متغیر به هم متصل‌اند",
    description:
      "ثروت، نقدینگی، ریسک، اهداف یا ساختار مالی دیگر نمی‌توانند جدا از هم دیده شوند.",
    icon: Network,
  },
  {
    eyebrow: "WIDER VIEW",
    title: "وقتی یک زاویه برای تصمیم کافی نیست",
    description:
      "پرتفوی، کسب‌وکار، بازار و شرایط اقتصادی ممکن است هم‌زمان بر یک تصمیم اثر بگذارند.",
    icon: Layers3,
  },
  {
    eyebrow: "DECISION PATH",
    title: "وقتی فقط اطلاعات بیشتر کافی نیست",
    description:
      "مسئله به سناریو، شناخت ریسک، گزینه‌های قابل بررسی و مسیر روشن‌تری برای تصمیم نیاز دارد.",
    icon: Route,
  },
] as const;

/* =============================================================================
   Section — Server Component
============================================================================= */

export function ServiceContextSection() {
  return (
    <section
      id="service-context"
      dir="rtl"
      aria-labelledby="service-context-title"
      className="
        relative
        isolate

        scroll-mt-24
        overflow-hidden

        bg-[#032f3f]
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
            Main
        ======================================================== */}

        <div
          className="
            grid
            gap-12

            lg:grid-cols-[0.92fr_1.08fr]
            lg:items-stretch
            lg:gap-16

            xl:gap-20
          "
        >
          {/* =====================================================
              Statement
          ====================================================== */}

          <div
            className="
              flex
              flex-col
              justify-between
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

                    text-white/62

                    sm:text-[11px]
                  "
                >
                  زمینه استفاده از خدمات
                </span>
              </div>

              <h2
                id="service-context-title"
                className="
                  max-w-[720px]

                  text-[31px]
                  font-black
                  leading-[1.65]
                  tracking-[-0.045em]

                  text-white

                  sm:text-[38px]

                  lg:text-[45px]
                  lg:leading-[1.55]

                  xl:text-[50px]
                "
              >
                بعضی تصمیم‌ها،
                <br />
                دیگر یک <span className="text-brand-accent">
                  مسئله منفرد
                </span>{" "}
                نیستند.
              </h2>

              <p
                className="
                  mt-6
                  max-w-[620px]

                  text-[13px]
                  font-medium
                  leading-[2.2]

                  text-white/50

                  sm:text-[14px]

                  lg:text-[15px]
                "
              >
                وقتی چند عامل مالی، کسب‌وکاری یا محیطی هم‌زمان بر نتیجه اثر
                می‌گذارند، ارزش یک نگاه ساختاری بیشتر می‌شود.
              </p>
            </div>

            {/* ---------------------------------------------------
                editorial statement
            ---------------------------------------------------- */}

            <div
              className="
                relative

                mt-10

                border-r
                border-white/12

                pr-5

                sm:pr-7

                lg:mt-16
              "
            >
              <span
                aria-hidden="true"
                className="
                  absolute
                  -right-[2px]
                  top-0

                  h-14
                  w-[3px]

                  bg-brand-accent
                "
              />

              <p
                className="
                  mt-3
                  max-w-[540px]

                  text-[16px]
                  font-black
                  leading-[1.95]

                  text-white/82

                  sm:text-[18px]
                "
              >
                جایی که «دانستن اطلاعات» دیگر به‌تنهایی برای تصمیم کافی نیست.
              </p>
            </div>
          </div>

          {/* =====================================================
              Context ledger
          ====================================================== */}

          <div
            className="
              relative

              overflow-hidden

              border
              border-white/12

              bg-white/[0.025]

              shadow-[0_34px_100px_rgba(0,0,0,.16)]
            "
          >
            {/* top */}
            <div
              className="
                flex
                items-center
                justify-between
                gap-5

                border-b
                border-white/10

                px-5
                py-5

                sm:px-7
              "
            >
              <div>
                

                <p
                  className="
                    mt-1.5

                    text-[10px]
                    font-bold

                    text-white/43
                  "
                >
                  سه نشانه برای پیچیده‌تر شدن مسئله
                </p>
              </div>

              <span
                aria-hidden="true"
                className="
                  h-[11px]
                  w-[11px]

                  bg-brand-accent

                  shadow-[0_0_16px_rgba(252,133,2,.38)]
                "
              />
            </div>

            {/* rows */}
            <div
              className="
                divide-y
                divide-white/10
              "
            >
              {CONTEXTS.map((context) => (
                <ContextRow key={context.eyebrow} context={context} />
              ))}
            </div>
          </div>
        </div>

        {/* =======================================================
            Bottom navigation
        ======================================================== */}

        <div
          className="
            mt-10

            flex
            flex-col
            gap-6

            border-t
            border-white/10

            pt-6

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          {/* internal contextual links */}

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-x-5
              gap-y-3
            "
          >
            <ContextLink href="/dnh/framework">
              چارچوب تصمیم‌سازی DNH
            </ContextLink>

            <Dot />

            <ContextLink href="/dnh/intelligence-desk">
              میز هوشمندی DNH
            </ContextLink>
          </div>

          {/* next section */}

          <Link
            href="#services-audience"
            className="
              group/next

              inline-flex
              min-h-11
              shrink-0

              items-center
              gap-3

              text-[10px]
              font-black

              text-[#83cee4]

              outline-none

              transition-colors
              duration-300

              hover:text-brand-accent

              focus-visible:ring-2
              focus-visible:ring-focus/50
            "
          >
            این خدمات برای چه کسانی طراحی شده‌اند؟
            <ArrowDownLeft
              aria-hidden="true"
              className="
                h-4
                w-4

                transition-transform
                duration-300

                group-hover/next:translate-y-1
                group-hover/next:-translate-x-1
              "
              strokeWidth={1.6}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   Context Row
============================================================================= */

function ContextRow({ context }: { context: (typeof CONTEXTS)[number] }) {
  const Icon = context.icon;

  return (
    <article
      className="
        group/row

        relative

        grid
        gap-5

        px-5
        py-6

        transition-colors
        duration-300

        hover:bg-white/[0.045]

        sm:grid-cols-[56px_1fr]
        sm:items-start
        sm:px-7
        sm:py-7
      "
    >
      {/* Icon */}

      <span
        className="
          flex
          h-12
          w-12

          items-center
          justify-center

          border
          border-[#74c4dc]/18

          bg-[#74c4dc]/[0.045]

          text-[#86cee3]

          transition-[background-color,border-color,color,transform]
          duration-300

          group-hover/row:-translate-y-0.5
          group-hover/row:border-brand-accent/35
          group-hover/row:bg-brand-accent/[0.08]
          group-hover/row:text-brand-accent
        "
      >
        <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.45} />
      </span>

      {/* Text */}

      <div>
        <h3
          className="
            mt-2

            text-[15px]
            font-black
            leading-[1.9]

            text-white

            sm:text-[16px]
          "
        >
          {context.title}
        </h3>

        <p
          className="
            mt-2
            max-w-[560px]

            text-[10px]
            font-medium
            leading-[2]

            text-white/38

            sm:text-[11px]
          "
        >
          {context.description}
        </p>
      </div>
    </article>
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
        group/link

        inline-flex
        items-center
        gap-2

        text-[11px]
        font-bold

        text-white/34

        outline-none

        transition-colors
        duration-300

        hover:text-white

        focus-visible:ring-2
        focus-visible:ring-focus/50
      "
    >
      {children}

      <ArrowUpLeft
        aria-hidden="true"
        className="
          h-3
          w-3

          text-brand-accent/65

          transition-transform
          duration-300

          group-hover/link:-translate-x-0.5
          group-hover/link:-translate-y-0.5
        "
        strokeWidth={1.5}
      />
    </Link>
  );
}

function Dot() {
  return (
    <span
      aria-hidden="true"
      className="
        h-[4px]
        w-[4px]

        bg-white/16
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
            "radial-gradient(circle at 78% 45%,rgba(22,115,148,.19),transparent 31%),linear-gradient(116deg,#022a38 0%,#033746 52%,#022d3a 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.06]
        "
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,.08) 1px,transparent 1px)",
          backgroundSize: "118px 100%",
        }}
      />

     
    </>
  );
}
