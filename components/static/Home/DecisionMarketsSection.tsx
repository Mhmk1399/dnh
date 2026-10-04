import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

import { ActionButton } from "@/components/ui/ActionButton";

type MarketItem = {
  index: string;
  title: string;
  audience: string;
  description: string;
  href: string;
  cta: string;

  image: string;
  imageAlt: string;

  /**
   * برای تنظیم Crop هر عکس به صورت جداگانه.
   * مثال:
   * "center"
   * "50% 35%"
   * "left center"
   */
  imagePosition?: string;

  featured?: boolean;
};

const MARKETS: MarketItem[] = [
  {
    index: "01",
    title: "تصمیم مالی بزرگ",
    audience: "برای افراد یا کسب‌وکارها",
    description:
      "وقتی در آستانه یک تصمیم مالی مهم قرار دارید و لازم است پیش از اقدام، ریسک‌ها و مسیر تصمیم با دقت بیشتری دیده شوند.",
    href: "/target-markets/big-financial-decision",
    cta: "ارزیابی اولیه تصمیم مالی",

    image: "/assets/images/big-financial-decision.png",
    imageAlt: "تصویری مفهومی از یک تصمیم مالی بزرگ",
    imagePosition: "center",
  },

  {
    index: "02",
    title: "پرتفوی پراکنده و بدون معماری",
    audience: "برای صاحبان دارایی‌های متنوع",
    description:
      "زمانی که مجموعه‌ای از دارایی‌ها وجود دارد، اما ساختار منسجم، منطق یکپارچه و چارچوب تصمیم‌گیری آن روشن نیست.",
    href: "/target-markets/unstructured-portfolio",
    cta: "ارزیابی ساختار پرتفوی",

    image: "/assets/images/unstructured-portfolio.png",
    imageAlt: "تصویری مفهومی از دارایی‌های پراکنده و ساختار پرتفوی",
    imagePosition: "center",

    featured: true,
  },

  {
    index: "03",
    title: "ساختار مالی پیچیده",
    audience: "برای هلدینگ‌ها و گروه‌های شرکتی",
    description:
      "وقتی تصمیم میان سرمایه، نقدینگی، تأمین مالی و ریسک‌های ساختار سرمایه به نگاه راهبردی‌تر و چندلایه نیاز دارد.",
    href: "/target-markets/holdings-financial-capital-structure",
    cta: "ارزیابی مالی راهبردی",

    image: "/assets/images/complex-financial-structure.png",
    imageAlt: "تصویری مفهومی از ساختار مالی و سرمایه در مجموعه‌های پیچیده",
    imagePosition: "center",
  },
];

export function DecisionMarketsSection() {
  return (
    <section
      dir="rtl"
      aria-labelledby="decision-markets-title"
      className="
        relative
        isolate
        overflow-hidden
        border-y
        border-line
        bg-page
      "
    >
      <SectionBackground />

      <div
        className="
          relative
          z-10
          dnh-site-shell
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
        {/* =============================================================
            INTRO
        ============================================================= */}

        <header
          className="
           
            max-w-[760px]
            text-right
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
                h-2
                w-2
                bg-brand-accent
              "
            />

            <span
              className="
                text-[10px]
                font-black
                tracking-[0.05em]
                text-brand-primary

                sm:text-[11px]
              "
            >
              موقعیت‌های تصمیم
            </span>

            <span
              aria-hidden="true"
              className="
                h-px
                w-10
                bg-line-strong/30
              "
            />
          </div>

          <h2
            id="decision-markets-title"
            className="
              max-w-[720px]

              text-[32px]
              font-black
              leading-[1.55]
              tracking-[-0.04em]

              text-ink

              sm:text-[40px]

              lg:text-[48px]
              lg:leading-[1.45]

       
            "
          >
            سه موقعیت متفاوت؛
            <br />
            <span className="text-brand-primary">
              یک نیاز مشترک: دیدن تصویر کامل‌تر.
            </span>
          </h2>

          <p
            className="
              mt-5
              max-w-[690px]

              text-[13px]
              font-medium
              leading-[2.15]

              text-ink-muted

              sm:text-[14px]
              lg:text-[15px]
            "
          >
            مخاطبان DNH الزاماً مسئله مشابهی ندارند؛ اما نقطه مشترک آن‌ها
            موقعیتی است که در آن پیچیدگی دارایی، ریسک، سرمایه یا ساختار تصمیم،
            پاسخ‌های ساده را ناکافی می‌کند.
          </p>
        </header>

        {/* =============================================================
            MARKET LANDSCAPE
        ============================================================= */}

        <div
          className="
            mt-12

            grid

            border-t
            border-r
            border-line

            md:grid-cols-3

            lg:mt-16
          "
        >
          {MARKETS.map((market) => (
            <MarketPanel key={market.index} market={market} />
          ))}
        </div>

        {/* =============================================================
            BOTTOM LINK
        ============================================================= */}

        <div
          className="
            flex
            justify-end

            border-t
            border-line

            pt-6
          "
        >
          <Link
            href="/target-markets"
            className="
              group/all
              inline-flex
              items-center
              gap-4

              text-[11px]
              font-black
              text-brand-primary

              outline-none

              transition-colors
              duration-300

              hover:text-brand-secondary

              focus-visible:ring-4
              focus-visible:ring-focus/20
            "
          >
            <span>مشاهده بازارهای هدف</span>

            <span
              aria-hidden="true"
              className="
                h-px
                w-12
                bg-brand-accent

                transition-[width]
                duration-300

                group-hover/all:w-16
              "
            />

            <ArrowLeft
              aria-hidden="true"
              className="
                h-4
                w-4

                transition-transform
                duration-300

                group-hover/all:-translate-x-1
              "
              strokeWidth={1.7}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   MARKET PANEL
============================================================================ */
function MarketImage({
  src,
  alt,
  position = "center",
}: {
  src: string;
  alt: string;
  position?: string;
}) {
  return (
    <div
      className="
        relative
        h-[220px]
        overflow-hidden

        border-b
        border-line

        bg-surface-soft

        sm:h-[250px]
        md:h-[280px]
        lg:h-[310px]
      "
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="
          (max-width: 767px) 100vw,
          (max-width: 1536px) 33vw,
          480px
        "
        className="
          object-cover

          transition-[transform,filter]
          duration-700
          ease-[cubic-bezier(.22,1,.36,1)]

          group-hover/market:scale-[1.035]

          motion-reduce:transform-none
          motion-reduce:transition-none
        "
        style={{
          objectPosition: position,
        }}
      />

      {/* لایه بسیار ظریف برای هماهنگی عکس‌ها با برند */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          bg-[linear-gradient(180deg,transparent_45%,rgba(255,255,255,0.34)_78%,var(--dnh-bg-page)_100%)]
        "
      />

      {/* Brand wash */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          bg-brand-primary/[0.025]

          transition-colors
          duration-500

          group-hover/market:bg-transparent
        "
      />

      {/* خط عمودی Accent */}
      <span
        aria-hidden="true"
        className="
          absolute
          bottom-0
          right-5

          h-12
          w-[2px]

          origin-bottom
          bg-brand-accent

          transition-[height,opacity]
          duration-500

          group-hover/market:h-16
        "
      />

      {/* Marker */}
      <span
        aria-hidden="true"
        className="
          absolute
          bottom-[46px]
          right-[17px]

          h-2
          w-2

          bg-brand-accent

          transition-transform
          duration-500

          group-hover/market:-translate-y-4
        "
      />
    </div>
  );
}

function MarketPanel({ market }: { market: MarketItem }) {
  return (
    <article
      className={`
        group/market
        relative
        overflow-hidden

        border-b
        border-l
        border-line

        transition-[background-color,border-color,box-shadow]
        duration-500
        ease-[cubic-bezier(.22,1,.36,1)]

        ${
          market.featured
            ? `
              bg-[color-mix(in_srgb,var(--dnh-primary)_5%,white)]
              md:border-t-2
              md:border-t-brand-primary
            `
            : `
              bg-page
              hover:bg-[color-mix(in_srgb,var(--dnh-primary)_3%,white)]
            `
        }

        hover:border-[color-mix(in_srgb,var(--dnh-primary)_32%,transparent)]

        focus-within:border-brand-primary
      `}
    >
      {/* Image */}
      <MarketImage
        src={market.image}
        alt={market.imageAlt}
        position={market.imagePosition}
      />

      {/* Content */}
      <div
        className="
          relative
          min-h-[310px]

          px-5
          py-7

          sm:px-6

          lg:min-h-[330px]
          lg:px-7
          lg:py-8
        "
      >
        <span
          dir="ltr"
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-5
            top-6

            select-none

            text-[52px]
            font-light
            leading-none
            tracking-[-0.06em]

            text-brand-primary/20

            lg:text-[64px]
          "
        >
          {market.index}
        </span>

        <div className="relative z-10">
          <h3
            className="
              max-w-[330px]

              text-[21px]
              font-black
              leading-[1.7]
              tracking-[-0.025em]

              text-ink

              transition-colors
              duration-300

              group-hover/market:text-brand-primary

              lg:text-[23px]
            "
          >
            {market.title}
          </h3>

          <span
            aria-hidden="true"
            className="
              mt-3
              block
              h-px
              w-full
              bg-line

              transition-colors
              duration-300

              group-hover/market:bg-brand-primary/25
            "
          />

          <p
            className="
              mt-4
              text-[11px]
              font-bold
              text-ink-muted

              sm:text-[12px]
            "
          >
            {market.audience}
          </p>

          <p
            className="
              mt-3
              max-w-[360px]

              text-[12px]
              font-medium
              leading-[2.05]

              text-ink-muted

              sm:text-[13px]
            "
          >
            {market.description}
          </p>
        </div>

        <div className="relative z-10 mt-7">
          {market.featured ? (
            <ActionButton
              href={market.href}
              variant="primary"
              size="sm"
              icon={ArrowLeft}
              className="
                min-w-[205px]
                bg-brand-accent
                text-white
                shadow-[0_14px_32px_color-mix(in_srgb,var(--dnh-accent)_20%,transparent)]
                hover:bg-[#e97c02]
              "
            >
              {market.cta}
            </ActionButton>
          ) : (
            <Link
              href={market.href}
              className="
                group/link
                inline-flex
                min-h-11
                items-center
                gap-3

                text-[11px]
                font-black
                text-brand-primary

                outline-none

                transition-colors
                duration-300

                hover:text-brand-secondary

                focus-visible:ring-4
                focus-visible:ring-focus/20
              "
            >
              <ArrowLeft
                aria-hidden="true"
                className="
                  h-4
                  w-4

                  transition-transform
                  duration-300

                  group-hover/link:-translate-x-1
                "
                strokeWidth={1.7}
              />

              <span>{market.cta}</span>
            </Link>
          )}
        </div>

        {market.featured ? (
          <span
            aria-hidden="true"
            className="
              absolute
              inset-y-0
              right-0
              w-[3px]
              bg-brand-accent
            "
          />
        ) : null}
      </div>
    </article>
  );
}

function SectionBackground() {
  return (
    <>
      {/* pale gradient */}
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
              180deg,
              #ffffff 0%,
              color-mix(in srgb, var(--dnh-primary) 2.5%, white) 48%,
              #ffffff 100%
            )
          `,
        }}
      />

      {/* vertical architectural lines */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-70
        "
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              color-mix(in srgb, var(--dnh-primary) 7%, transparent) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "25% 100%",
        }}
      />

      {/* subtle top axis */}
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
          via-brand-primary/35
          to-transparent
        "
      />
    </>
  );
}
