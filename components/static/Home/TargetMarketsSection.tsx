import Image, { getImageProps } from "next/image";
import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   Types
============================================================================= */

type TargetMarket = {
  index: string;
  title: string;
  description: string;
  linkLabel: string;
  href: string;
  image: string;
};

/* =============================================================================
   Data
============================================================================= */

const TARGET_MARKETS: TargetMarket[] = [
  {
    index: "01",
    title: "تصمیم مالی بزرگ",
    description:
      "برای زمانی که یک انتخاب مالی مهم پیشِ رو دارید و به تحلیل چندبعدی، سناریوسازی و ارزیابی ریسک نیاز دارید.",
    linkLabel: "بررسی این مسیر",
    href: "/target-markets/big-financial-decision",
    image: "/assets/images/target-market-big-decision.png",
  },
  {
    index: "02",
    title: "پرتفوی پراکنده و بدون معماری",
    description:
      "برای افرادی که دارایی‌های متنوع دارند اما منطق یکپارچه، تخصیص مناسب و دید روشن نسبت به ریسک و نقدشوندگی ندارند.",
    linkLabel: "بازطراحی پرتفوی",
    href: "/target-markets/unstructured-portfolio",
    image: "/assets/images/target-market-portfolio.png",
  },
  {
    index: "03",
    title: "هلدینگ‌ها و ساختار مالی و سرمایه",
    description:
      "برای هلدینگ‌ها، گروه‌های شرکتی و کسب‌وکارهای خانوادگی که با ساختار سرمایه، نقدینگی، تأمین مالی و تخصیص سرمایه درگیر هستند.",
    linkLabel: "مشاهده راهکار",
    href: "/target-markets/holdings-financial-capital-structure",
    image: "/assets/images/target-market-holding.png",
  },
];

/* =============================================================================
   Responsive background

   Next.js generates optimized srcsets.
   <picture> ensures only the relevant desktop/mobile background is requested.
============================================================================= */

const { props: desktopBackground } = getImageProps({
  src: "/assets/images/target-markets-bg-desktop.png",
  alt: "",
  width: 1672,
  height: 941,
  quality: 84,
  sizes:
    "(min-width: 1536px) 1480px, (min-width: 768px) calc(100vw - 40px), 1px",
  loading: "lazy",
});

const { props: mobileBackground } = getImageProps({
  src: "/assets/images/target-markets-bg-mobile.png",
  alt: "",
  width: 941,
  height: 1672,
  quality: 82,
  sizes: "(max-width: 767px) calc(100vw - 20px), 1px",
  loading: "lazy",
});

/* =============================================================================
   Section
============================================================================= */

export default function TargetMarketsSection() {
  return (
    <section
      id="target-markets"
      dir="rtl"
      aria-labelledby="target-markets-title"
      aria-describedby="target-markets-description"
      className="
        relative
        isolate

        mx-auto
        mt-12

        w-[calc(100%-20px)]
        max-w-[1520px]

        overflow-hidden

        rounded-[28px]

        border
        border-line

        bg-surface-soft

        shadow-[0_22px_70px_color-mix(in_srgb,var(--dnh-primary)_8%,transparent)]

        sm:mt-16
        sm:w-[calc(100%-32px)]
        sm:rounded-[34px]

        lg:mt-20
        lg:w-[calc(100%-48px)]
        lg:rounded-[38px]
      "
    >
      {/* =====================================================================
          BACKGROUND
      ====================================================================== */}

      <picture
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0

          z-[-5]

          block
          h-full
          w-full
        "
      >
        <source
          media="(min-width: 768px)"
          srcSet={desktopBackground.srcSet}
          sizes={desktopBackground.sizes}
        />

        <source
          media="(max-width: 767px)"
          srcSet={mobileBackground.srcSet}
          sizes={mobileBackground.sizes}
        />

        <img
          {...mobileBackground}
          alt=""
          aria-hidden="true"
          className="
            h-full
            w-full

            object-cover
            object-center
          "
        />
      </picture>

      {/* =====================================================================
          VERY LIGHT READABILITY WASH
      ====================================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0

          z-[-4]

          bg-gradient-to-b
          from-page/10
          via-transparent
          to-page/20

          lg:bg-gradient-to-br
          lg:from-transparent
          lg:via-page/[0.04]
          lg:to-page/20
        "
      />

      {/* =====================================================================
          CONTENT
      ====================================================================== */}

      <div
        className="
          relative
          z-10

          px-4
          pb-5
          pt-9

          sm:px-6
          sm:pb-7
          sm:pt-11

          lg:px-[52px]
          lg:pb-[28px]
          lg:pt-[46px]

          xl:px-[56px]
          xl:pt-[52px]
        "
      >
        {/* =================================================================
            TOP CONTENT
        ================================================================== */}

        <header
          className="
            mx-auto

            max-w-[690px]

            text-center

            sm:ml-auto
            sm:mr-0
            sm:text-right

            lg:max-w-[650px]
          "
        >
          {/* ---------------------------------------------------------------
              Eyebrow
          ---------------------------------------------------------------- */}

          <div
            className="
              mx-auto

              inline-flex
              items-center
              gap-[9px]

              rounded-full

              border
              border-line

              bg-page/[0.66]

              px-[18px]
              py-[9px]

              shadow-[0_7px_24px_color-mix(in_srgb,var(--dnh-primary)_5%,transparent)]

              backdrop-blur-[12px]

              sm:mx-0
              sm:mr-auto
            "
          >
            <span
              aria-hidden="true"
              className="
                h-[7px]
                w-[7px]

                shrink-0

                rounded-full

                bg-brand-accent

                shadow-[0_0_0_5px_color-mix(in_srgb,var(--dnh-accent)_9%,transparent)]
              "
            />

            <span
              className="
                text-[11px]
                font-bold

                text-ink-muted

                sm:text-[12px]
              "
            >
              بازارهای هدف
            </span>
          </div>

          {/* ---------------------------------------------------------------
              H2
          ---------------------------------------------------------------- */}

          <h2
            id="target-markets-title"
            className="
              mt-5

              text-[23px]
              font-black

              leading-[1.55]

              tracking-[-0.045em]

              text-ink

              sm:text-[36px]

              lg:mt-6
              lg:text-[43px]
              lg:leading-[1.45]

              
            "
          >
            <span
              dir="ltr"
              className="
                inline-block

                text-brand-primary
              "
            >
              DNH
            </span>{" "}
            برای چه کسانی مناسب است؟
          </h2>

          {/* ---------------------------------------------------------------
              Description
          ---------------------------------------------------------------- */}

          <p
            id="target-markets-description"
            className="
              mx-auto
              mt-4

              max-w-[620px]

              text-[11px]
              font-medium

              leading-[2.1]

              text-ink-muted

              sm:mx-0
              sm:mr-auto
              sm:text-[12px]

              lg:mt-4
              lg:text-[13px]
            "
          >
            اگر مسئله شما در یکی از این سه موقعیت قرار می‌گیرد، DNH می‌تواند
            مسیر تحلیل، تصمیم‌سازی و اقدام را برای شما شفاف‌تر کند.
          </p>
        </header>

        {/* =================================================================
            CARDS
        ================================================================== */}

        <ul
          className="
            mt-9

            grid
            grid-cols-1

            gap-4

            md:grid-cols-2

            lg:mt-[30px]
            lg:grid-cols-3
            lg:gap-[14px]

            xl:gap-[16px]
          "
        >
          {TARGET_MARKETS.map((item) => (
            <li
              key={item.href}
              className="
                h-full

                md:last:col-span-2

                lg:last:col-span-1
              "
            >
              <TargetMarketCard item={item} />
            </li>
          ))}
        </ul>

        {/* =================================================================
            DESKTOP BOTTOM STRIP
        ================================================================== */}

        <div
          dir="ltr"
          className="
            mt-[22px]

            hidden

            grid-cols-[350px_minmax(80px,1fr)_auto]
            items-center

            gap-[22px]

            lg:grid
          "
        >
          {/* CTA on left */}

          <AssessmentButton />

          {/* middle line */}

          <div
            aria-hidden="true"
            className="
              relative

              h-px

              bg-line
            "
          >
            <span
              className="
                absolute
                left-[20%]
                top-1/2

                h-[7px]
                w-[7px]

                -translate-y-1/2

                rounded-full

                bg-brand-accent

                shadow-[0_0_0_4px_color-mix(in_srgb,var(--dnh-accent)_8%,transparent)]
              "
            />
          </div>

          {/* text on right */}

          <p
            dir="rtl"
            className="
              whitespace-nowrap

              text-[11px]
              font-medium

              text-ink-muted

              xl:text-[12px]
            "
          >
            از تحلیل تا اقدام، در کنار شما
          </p>
        </div>

        {/* =================================================================
            MOBILE BOTTOM AREA
        ================================================================== */}

        <div
          className="
            mt-7

            border-t
            border-line

            pt-5

            lg:hidden
          "
        >
          <div
            className="
              mb-4

              flex
              items-center
              justify-center
              gap-[10px]

              text-[10px]
              font-medium

              text-ink-muted
            "
          >
            <span
              aria-hidden="true"
              className="
                h-[5px]
                w-[5px]

                rounded-full

                bg-brand-accent
              "
            />

            <span>از تحلیل تا اقدام، در کنار شما</span>
          </div>

          <AssessmentButton mobile />
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   Card
============================================================================= */

function TargetMarketCard({ item }: { item: TargetMarket }) {
  const titleId = `target-market-${item.index}-title`;
  const descriptionId = `target-market-${item.index}-description`;

  return (
    <article className="h-full">
      <Link
        href={item.href}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="
          group/card

          relative

          flex
          h-full
          min-h-[390px]
          flex-col

          overflow-hidden

          rounded-[25px]

          border
          border-line

          bg-page/[0.1]

          px-5
          pb-5
          pt-4

          text-center

          outline-none

          shadow-[0_10px_35px_color-mix(in_srgb,var(--dnh-primary)_6%,transparent)]

          backdrop-blur-[5px]

          touch-manipulation

          transition-all
          duration-[550ms]
          ease-[cubic-bezier(.22,1,.36,1)]

          hover:-translate-y-[5px]
          hover:scale-[1.006]

          hover:border-line-strong/35
          hover:bg-page/[0.88]

          hover:shadow-[0_24px_60px_color-mix(in_srgb,var(--dnh-primary)_14%,transparent)]

          active:translate-y-[1px]
          active:scale-[0.985]

          active:shadow-[0_8px_24px_color-mix(in_srgb,var(--dnh-primary)_10%,transparent)]

          focus-visible:ring-4
          focus-visible:ring-focus/25

          motion-reduce:transition-none
          motion-reduce:transform-none

          sm:min-h-[405px]
          sm:px-6
          sm:pb-6
          sm:pt-5

          lg:min-h-[410px]
        "
      >
        {/* =================================================================
            HOVER / TAP LIGHT
        ================================================================== */}

        <span
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            -right-[110px]
            -top-[110px]

            h-[250px]
            w-[250px]

            rounded-full

            bg-brand-primary/[0.08]

            opacity-0

            blur-[72px]

            transition-[opacity,transform]
            duration-[650ms]
            ease-[cubic-bezier(.22,1,.36,1)]

            group-hover/card:scale-110
            group-hover/card:opacity-100

            group-active/card:scale-100
            group-active/card:opacity-80

            motion-reduce:transition-none
          "
        />

        <span
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            -left-[80px]
            top-[100px]

            h-[180px]
            w-[180px]

            rounded-full

            bg-brand-accent/[0.06]

            opacity-0

            blur-[65px]

            transition-opacity
            duration-500

            group-hover/card:opacity-100

            group-active/card:opacity-80
          "
        />

        {/* =================================================================
            NUMBER
        ================================================================== */}

        

        {/* =================================================================
            IMAGE
        ================================================================== */}

        <div
          aria-hidden="true"
          className="
            relative

            mx-auto
            mt-[10px]

            h-[165px]
            w-[205px]

            shrink-0

            sm:h-[175px]
            sm:w-[220px]

            lg:h-[180px]
            lg:w-[230px]
          "
        >
          {/* circular visual behind image */}

          <span
            className="
              absolute
              left-1/2
              top-1/2

              h-[140px]
              w-[140px]

              -translate-x-1/2
              -translate-y-1/2

              rounded-full

              border
              border-brand-primary/[0.12]

              transition-[transform,border-color,background-color]
              duration-[650ms]
              ease-[cubic-bezier(.22,1,.36,1)]

              group-hover/card:scale-[1.08]
              group-hover/card:border-brand-primary/[0.22]

              group-active/card:scale-[0.97]
            "
          />

          <span
            className="
              absolute
              left-[12%]
              top-[22%]

              h-[115px]
              w-[115px]

              rounded-full

              bg-brand-primary/[0.08]

              blur-[30px]

              transition-[transform,opacity]
              duration-[650ms]
              ease-[cubic-bezier(.22,1,.36,1)]

              group-hover/card:scale-125
              group-hover/card:opacity-90

              group-active/card:scale-100
            "
          />

          <Image
            src={item.image}
            alt=""
            aria-hidden="true"
            width={420}
            height={420}
            quality={88}
            loading="lazy"
            sizes="
              (min-width: 1280px) 230px,
              (min-width: 640px) 220px,
              205px
            "
            className="
              relative
              z-10

              h-full
              w-full

              object-contain

              drop-shadow-[0_18px_22px_color-mix(in_srgb,var(--dnh-primary)_13%,transparent)]

              transition-[transform,filter]
              duration-[650ms]
              ease-[cubic-bezier(.22,1,.36,1)]

              group-hover/card:-translate-y-[5px]
              group-hover/card:scale-[1.045]

              group-active/card:translate-y-[2px]
              group-active/card:scale-[0.97]

              motion-reduce:transition-none
              motion-reduce:transform-none
            "
          />
        </div>

        {/* =================================================================
            CONTENT
        ================================================================== */}

        <div
          className="
            relative
            z-20

            flex
            flex-1
            flex-col

            pt-[2px]
          "
        >
          <h3
            id={titleId}
            className="
              text-[17px]
              font-black

              leading-[1.75]

              tracking-[-0.025em]

              text-ink

              transition-colors
              duration-[400ms]

              group-hover/card:text-brand-primary

              sm:text-[18px]

              xl:text-[19px]
            "
          >
            {item.title}
          </h3>

          <p
            id={descriptionId}
            className="
              mx-auto
              mt-[9px]

              max-w-[340px]

              text-[10px]
              font-medium

              leading-[2.05]

              text-ink-muted

              sm:text-[11px]

              xl:text-[11.5px]
            "
          >
            {item.description}
          </p>

          {/* ===============================================================
              LINK ROW
          ================================================================ */}

          <div
            dir="rtl"
            className="
              mt-auto

              flex
              items-center
              justify-between

              pt-5
            "
          >
            <span
              className="
                text-[11px]
                font-black

                text-brand-primary

                transition-transform
                duration-[450ms]
                ease-[cubic-bezier(.22,1,.36,1)]

                group-hover/card:-translate-x-[2px]

                group-active/card:translate-x-0

                sm:text-[12px]
              "
            >
              {item.linkLabel}
            </span>

            <span
              className="
                flex
                h-[40px]
                w-[40px]
                shrink-0
                items-center
                justify-center

                rounded-full

                bg-surface-soft

                text-brand-primary

                shadow-[0_5px_16px_color-mix(in_srgb,var(--dnh-primary)_5%,transparent)]

                transition-[transform,background-color,color,box-shadow]
                duration-[450ms]
                ease-[cubic-bezier(.22,1,.36,1)]

                group-hover/card:-translate-x-[3px]

                group-hover/card:bg-brand-primary

                group-hover/card:text-[var(--dnh-text-on-brand)]

                group-hover/card:shadow-[0_10px_24px_color-mix(in_srgb,var(--dnh-primary)_20%,transparent)]

                group-active/card:scale-[0.88]
                group-active/card:translate-x-[-1px]

                motion-reduce:transition-none
                motion-reduce:transform-none
              "
            >
              <ArrowLeft
                aria-hidden="true"
                strokeWidth={1.75}
                className="
                  h-[16px]
                  w-[16px]

                  transition-transform
                  duration-[450ms]

                  group-hover/card:-translate-x-[1px]
                "
              />
            </span>
          </div>
        </div>

        {/* =================================================================
            BOTTOM HOVER LINE
        ================================================================== */}

        <span
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            bottom-0
            right-[22px]

            h-[2px]
            w-0

            rounded-full

            bg-brand-accent

            transition-[width]
            duration-[650ms]
            ease-[cubic-bezier(.22,1,.36,1)]

            group-hover/card:w-[70px]

            group-active/card:w-[48px]
          "
        />
      </Link>
    </article>
  );
}

/* =============================================================================
   Assessment CTA
============================================================================= */

function AssessmentButton({ mobile = false }: { mobile?: boolean }) {
  return (
    <ActionButton
      href="/financial-decision-assessment"
      variant="assessment"
      size="lg"
      icon={ArrowLeft}
      className={mobile ? "w-full" : "w-[350px]"}
    >
      ارزیابی موقعیت شما
    </ActionButton>
  );
}
