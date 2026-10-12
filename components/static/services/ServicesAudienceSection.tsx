import Link from "next/link";

import {
  ArrowDownLeft,
  ArrowUpLeft,
  Building2,
  CircleDollarSign,
  PieChart,
  type LucideIcon,
} from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   مسیرهای مخاطب
============================================================================= */

const AUDIENCES = [
  {
    title: "تصمیم مالی بزرگ",
    audience: "برای افراد، خانواده‌ها، سرمایه‌گذاران و صاحبان کسب‌وکار",
    description:
      "وقتی یک انتخاب مهم مالی پیش روست و مسئله، ریسک، نقدشوندگی، افق زمانی و مسیرهای قابل بررسی باید پیش از تصمیم روشن شوند.",
    linkLabel: "مسیر تصمیم مالی بزرگ",
    href: "/who-we-help/big-financial-decision",
    icon: CircleDollarSign,
  },

  {
    title: "پرتفوی پراکنده و بدون معماری",
    audience: "برای افرادی که دارایی‌ها یا سرمایه‌گذاری‌های متنوع دارند",
    description:
      "وقتی دارایی‌های متعدد وجود دارند، اما ارتباط میان آن‌ها، تمرکز ریسک، نقدشوندگی و منطق کلی پرتفوی روشن نیست.",
    linkLabel: "بررسی مسئله پرتفوی",
    href: "/who-we-help/unstructured-portfolio",
    icon: PieChart,
  },

  {
    title: "هلدینگ‌ها و ساختار مالی و سرمایه",
    audience: "برای صاحبان کسب‌وکار، هلدینگ‌ها و گروه‌های شرکتی",
    description:
      "وقتی ساختار مالی، نقدینگی، تأمین مالی و تخصیص سرمایه باید در کنار ریسک و اهداف مجموعه بررسی شوند.",
    linkLabel: "بررسی مسیر کسب‌وکار و سرمایه",
    href: "/who-we-help/holdings-financial-capital-structure",
    icon: Building2,
  },
] as const;

/* =============================================================================
   سکشن — کاملاً سمت سرور
============================================================================= */

export function ServicesAudienceSection() {
  return (
    <section
      id="services-audience"
      dir="rtl"
      aria-labelledby="services-audience-title"
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
            عنوان
        ======================================================== */}

        <div
          className="
            grid
            gap-8

            lg:grid-cols-[0.86fr_1.14fr]
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
                خدمات متناسب با موقعیت شما
              </span>
            </div>

            <h2
              id="services-audience-title"
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
              مسئله‌ها یکسان نیستند؛
              <br />
              مسیر بررسی هم{" "}
              <span className="text-brand-primary">نباید یکسان باشد.</span>
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
              نوع دارایی، ساختار مالی، سطح تصمیم و شرایط هر پرونده متفاوت است.
              به همین دلیل، نقطه شروع باید با موقعیت واقعی مخاطب هماهنگ باشد.
            </p>
          </div>
        </div>

        {/* =======================================================
            مسیرهای مخاطب
        ======================================================== */}

        <div
          className="
            mt-12

            border-y
            border-line 

            sm:mt-14

            lg:mt-16
          "
        >
          {AUDIENCES.map((item, index) => (
            <AudienceRow
              key={item.title}
              item={item}
              last={index === AUDIENCES.length - 1}
            />
          ))}
        </div>

        {/* =======================================================
            پایین سکشن
        ======================================================== */}

        <div
          className="
            mt-8

            flex
            flex-col
            gap-6

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
              موقعیت شما دقیقاً در یکی از این دسته‌ها قرار نمی‌گیرد؟
            </p>

            <p
              className="
                mt-1.5

                text-[13px]
                font-black
                leading-[1.9]

                text-ink
              "
            >
              ارزیابی اولیه می‌تواند نقطه شروع مناسب‌تری باشد.
            </p>
          </div>

          <ActionButton
            href="/financial-decision-assessment"
            variant="primary"
            size="md"
            icon={ArrowUpLeft}
            className="
              w-full

              bg-brand-primary
              text-white

              shadow-[0_14px_36px_rgba(22,115,148,.14)]

              hover:-translate-y-0.5

              sm:w-auto
              sm:min-w-[245px]
            "
          >
            شروع ارزیابی اولیه
          </ActionButton>
        </div>

        {/* =======================================================
            مسیر سکشن بعد
        ======================================================== */}

        <div
          className="
            mt-8

            flex
            justify-end

            border-t
            border-line

            pt-5
          "
        >
          <Link
            href="#services-method"
            className="
              group/link

              inline-flex
              min-h-11

              items-center
              gap-3

              text-[10px]
              font-black

              text-brand-primary

              outline-none

              transition-colors
              duration-300

              hover:text-brand-accent

              focus-visible:ring-2
              focus-visible:ring-focus/40
            "
          >
            خدمات DNH چگونه به یک روش مشترک متصل می‌شوند؟
            <ArrowDownLeft
              aria-hidden="true"
              className="
                h-4
                w-4

                transition-transform
                duration-300

                group-hover/link:translate-y-1
                group-hover/link:-translate-x-1
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
   ردیف مخاطب
============================================================================= */

function AudienceRow({
  item,
  last,
}: {
  item: {
    title: string;
    audience: string;
    description: string;
    linkLabel: string;
    href: string;
    icon: LucideIcon;
  };
  last: boolean;
}) {
  const Icon = item.icon;

  return (
    <article
      className={`
        group/row

        relative

        overflow-hidden

        transition-colors
        duration-300

        hover:bg-surface-soft/50

        ${!last ? "border-b border-line" : ""}
      `}
    >
      <Link
        href={item.href}
        className="
          grid
          gap-5

          px-5
          py-7

          outline-none

          sm:px-7

          lg:grid-cols-[74px_0.82fr_1.18fr_auto]
          lg:items-center
          lg:gap-8
          lg:px-8
          lg:py-8

          focus-visible:ring-2
          focus-visible:ring-inset
          focus-visible:ring-focus/40
        "
      >
        {/* آیکون */}

        <span
          className="
            flex
            h-14
            w-14

            items-center
            justify-center

            border
            border-brand-primary/15

            bg-brand-primary/[0.045]

            text-brand-primary

            transition-[background-color,border-color,color,transform]
            duration-300

            group-hover/row:-translate-y-0.5
            group-hover/row:border-brand-primary
            group-hover/row:bg-brand-primary
            group-hover/row:text-white
          "
        >
          <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.45} />
        </span>

        {/* عنوان */}

        <div>
          <h3
            className="
              text-[17px]
              font-black
              leading-[1.8]

              text-ink

              transition-colors
              duration-300

              group-hover/row:text-brand-primary

              sm:text-[19px]
            "
          >
            {item.title}
          </h3>

          <p
            className="
              mt-1.5

              text-[10px]
              font-bold
              leading-[1.9]

              text-brand-primary/65

              sm:text-[11px]
            "
          >
            {item.audience}
          </p>
        </div>

        {/* توضیح */}

        <div
          className="
            border-r
            border-line

            pr-5

            lg:pr-7
          "
        >
          <p
            className="
              max-w-[620px]

              text-[11px]
              font-medium
              leading-[2.05]

              text-ink-muted

              sm:text-[12px]
            "
          >
            {item.description}
          </p>
        </div>

        {/* لینک */}

        <div
          className="
            flex
            items-center
            gap-3

            lg:justify-end
          "
        >
          <span
            className="
              hidden

              text-[11px]
              font-black

              text-brand-primary

              xl:inline
            "
          >
            {item.linkLabel}
          </span>

          <span
            className="
              flex
              h-10
              w-10
              shrink-0

              items-center
              justify-center

              border
              border-line

              bg-white

              text-brand-primary

              transition-[background-color,border-color,color,transform]
              duration-300

              group-hover/row:-translate-x-1
              group-hover/row:border-brand-accent
              group-hover/row:bg-brand-accent
              group-hover/row:text-white
            "
          >
            <ArrowUpLeft
              aria-hidden="true"
              className="h-4 w-4"
              strokeWidth={1.5}
            />
          </span>
        </div>

        {/* خط نارنجی */}

        <span
          aria-hidden="true"
          className="
            absolute
            inset-y-0
            right-0

            w-[3px]

            origin-bottom
            scale-y-0

            bg-brand-accent

            transition-transform
            duration-300

            group-hover/row:scale-y-100
          "
        />
      </Link>
    </article>
  );
}

/* =============================================================================
   پس‌زمینه
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
            "linear-gradient(112deg,#f7fafb 0%,#ffffff 50%,#ffffff 100%)",
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
