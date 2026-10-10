import Link from "next/link";

import {
  ArrowDownLeft,
  ArrowUpLeft,
  Landmark,
  Network,
  Radar,
  type LucideIcon,
} from "lucide-react";

/* =============================================================================
   منطق مشترک خدمات
============================================================================= */

const FOUNDATIONS = [
  {
    title: "معماری ثروت",
    description:
      "دیدن دارایی، نقدشوندگی، ریسک، اهداف و افق زمانی در یک تصویر منسجم‌تر.",
    href: "/dnh/wealth-architecture",
    linkLabel: "آشنایی با معماری ثروت",
    icon: Landmark,
  },

  {
    title: "چارچوب DNH",
    description:
      "ساختار دادن به مسئله، سناریوها و مسیرهای قابل بررسی پیش از تصمیم.",
    href: "/dnh/framework",
    linkLabel: "آشنایی با چارچوب DNH",
    icon: Network,
  },

  {
    title: "میز هوشمندی DNH",
    description:
      "دیدن اقتصاد، بازار، نقدشوندگی و ریسک به‌عنوان بخشی از محیط تصمیم.",
    href: "/dnh/intelligence-desk",
    linkLabel: "آشنایی با میز هوشمندی",
    icon: Radar,
  },
] as const;

/* =============================================================================
   سکشن — کاملاً سمت سرور
============================================================================= */

export function ServicesMethodSection() {
  return (
    <section
      id="services-method"
      dir="rtl"
      aria-labelledby="services-method-title"
      className="
        relative
        isolate

        scroll-mt-24
        overflow-hidden

        border-b
        border-line

        bg-[#f8fbfc]

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
            mx-auto
            max-w-[900px]

            text-center
          "
        >
          <div
            className="
              mb-5

              flex
              items-center
              justify-center
              gap-3
            "
          >
            <span
              aria-hidden="true"
              className="
                h-px
                w-9

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
              منطق مشترک خدمات DNH
            </span>

            <span
              aria-hidden="true"
              className="
                h-px
                w-9

                bg-brand-accent
              "
            />
          </div>

          <h2
            id="services-method-title"
            className="
              text-[31px]
              font-black
              leading-[1.65]
              tracking-[-0.045em]

              text-ink

              sm:text-[38px]

              lg:text-[46px]
              lg:leading-[1.5]

              xl:text-[51px]
            "
          >
            شش خدمت متفاوت؛
            <br />
            یک نگاه <span className="text-brand-primary">منسجم به تصمیم.</span>
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-[660px]

              text-[13px]
              font-medium
              leading-[2.15]

              text-ink-muted

              sm:text-[14px]
            "
          >
            مسئله‌ها متفاوت‌اند؛ اما در DNH، ساختار ثروت، روش تصمیم‌سازی و محیط
            تصمیم جدا از یکدیگر دیده نمی‌شوند.
          </p>
        </div>

        {/* =======================================================
            سه نگاه مکمل
        ======================================================== */}

        <div
          className="
            relative

            mt-12

            border-y
            border-line

            sm:mt-14

            lg:mt-16
          "
        >
          {/* خط مشترک دسکتاپ */}

          <span
            aria-hidden="true"
            className="
              absolute
              left-[16%]
              right-[16%]
              top-[58px]

              hidden
              h-px

              bg-brand-primary/12

              lg:block
            "
          />

          <div
            className="
              grid

              lg:grid-cols-3
            "
          >
            {FOUNDATIONS.map((item, index) => (
              <Foundation
                key={item.href}
                item={item}
                last={index === FOUNDATIONS.length - 1}
              />
            ))}
          </div>
        </div>

        {/* =======================================================
            خروجی مشترک
        ======================================================== */}

        <div
          className="
            mx-auto
            mt-9
            max-w-[1040px]

            border-r-[3px]
            border-brand-accent

            bg-white

            px-5
            py-6

            shadow-[0_16px_50px_rgba(14,74,94,.055)]

            sm:px-7

            lg:px-8
            lg:py-7
          "
        >
          <div
            className="
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
                  text-[11px]
                  font-black

                  text-brand-accent
                "
              >
                نتیجه این نگاه
              </p>

              <p
                className="
                  mt-2

                  text-[16px]
                  font-black
                  leading-[1.9]

                  text-ink

                  sm:text-[18px]
                "
              >
                خدمت بر اساس مسئله انتخاب می‌شود؛ نه مسئله بر اساس خدمت.
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
                aria-hidden="true"
                className="
                  hidden
                  h-px
                  w-12

                  bg-brand-primary/18

                  sm:block
                "
              />

              <span
                aria-hidden="true"
                className="
                  h-[11px]
                  w-[11px]

                  bg-brand-accent
                "
              />
            </div>
          </div>
        </div>

        {/* =======================================================
            مسیر بعد
        ======================================================== */}

        <div
          className="
            mt-8

            flex
            justify-center

            border-t
            border-line

            pt-6
          "
        >
          <Link
            href="#services-cta"
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
            قدم بعدی برای شروع چیست؟
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
   پایه مشترک
============================================================================= */

function Foundation({
  item,
  last,
}: {
  item: {
    title: string;
    description: string;
    href: string;
    linkLabel: string;
    icon: LucideIcon;
  };
  last: boolean;
}) {
  const Icon = item.icon;

  return (
    <article
      className={`
        group/foundation

        relative

        px-5
        py-8

        transition-colors
        duration-300

        hover:bg-white/75

        sm:px-7
        sm:py-9

        lg:px-8
        lg:py-10

        ${!last ? "border-b border-line lg:border-b-0 lg:border-l" : ""}
      `}
    >
      <Link
        href={item.href}
        className="
          block

          outline-none

          focus-visible:ring-2
          focus-visible:ring-focus/40
        "
      >
        {/* آیکون */}

        <div
          className="
            relative
            z-10

            mb-6

            flex
            h-14
            w-14

            items-center
            justify-center

            border
            border-brand-primary/15

            bg-white

            text-brand-primary

            shadow-[0_10px_30px_rgba(22,115,148,.05)]

            transition-[background-color,border-color,color,transform,box-shadow]
            duration-300

            group-hover/foundation:-translate-y-1
            group-hover/foundation:border-brand-primary
            group-hover/foundation:bg-brand-primary
            group-hover/foundation:text-white
            group-hover/foundation:shadow-[0_16px_38px_rgba(22,115,148,.13)]
          "
        >
          <Icon
            aria-hidden="true"
            className="
              h-6
              w-6
            "
            strokeWidth={1.45}
          />

          <span
            aria-hidden="true"
            className="
              absolute
              -bottom-[4px]
              -left-[4px]

              h-[11px]
              w-[11px]

              bg-brand-accent
            "
          />
        </div>

        {/* متن */}

        <h3
          className="
            text-[18px]
            font-black

            text-ink

            transition-colors
            duration-300

            group-hover/foundation:text-brand-primary

            sm:text-[20px]
          "
        >
          {item.title}
        </h3>

        <p
          className="
            mt-3
            max-w-[340px]

            text-[11px]
            font-medium
            leading-[2.05]

            text-ink-muted

            sm:text-[12px]
          "
        >
          {item.description}
        </p>

        {/* لینک داخلی */}

        <div
          className="
            mt-6

            flex
            items-center
            gap-3
          "
        >
          <span
            className="
              text-[11px]
              font-black

              text-brand-primary

              transition-colors
              duration-300

              group-hover/foundation:text-brand-accent
            "
          >
            {item.linkLabel}
          </span>

          <ArrowUpLeft
            aria-hidden="true"
            className="
              h-3.5
              w-3.5

              text-brand-accent

              transition-transform
              duration-300

              group-hover/foundation:-translate-x-1
              group-hover/foundation:-translate-y-1
            "
            strokeWidth={1.5}
          />
        </div>
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
            "linear-gradient(112deg,#f4f9fa 0%,#ffffff 52%,#f7fbfc 100%)",
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
    </>
  );
}
