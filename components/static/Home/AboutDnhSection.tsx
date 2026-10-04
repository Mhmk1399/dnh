import Image from "next/image";
import { Compass, Database, Layers3, type LucideIcon } from "lucide-react";

const BACKGROUND_IMAGE = "/assets/images/wealth-architecture-background.png";

type FrameworkItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const FRAMEWORK_ITEMS: FrameworkItem[] = [
  {
    title: "هوشمندی داده",
    description:
      "تحلیل داده‌ها و متغیرهای مالی برای شکل‌دادن به تصویری دقیق‌تر از شرایط.",
    icon: Database,
  },
  {
    title: "راهبرد مسیر",
    description:
      "تبدیل تحلیل و سناریوها به مسیرهای تصمیم‌گیری روشن‌تر و منسجم‌تر.",
    icon: Compass,
  },
  {
    title: "معماری افق",
    description:
      "هماهنگی تصمیم‌های امروز با ساختار ثروت، اهداف و افق‌های بلندمدت.",
    icon: Layers3,
  },
];

export function WealthArchitectureSection() {
  return (
    <section
      dir="rtl"
      aria-labelledby="wealth-architecture-title"
      className="
        relative
        isolate
        overflow-hidden
        border-y
        border-line
        bg-page
      "
    >
      {/* ================================================================
          Background image
      ================================================================= */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          z-0
        "
      >
        <Image
          src={BACKGROUND_IMAGE}
          alt=""
          fill
          priority={false}
          sizes="100vw"
          className="
            object-cover

            object-[34%_center]

            sm:object-[30%_center]

            lg:object-left
          "
        />
      </div>

      {/* ================================================================
          Readability overlay - Mobile
      ================================================================= */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          z-[1]
          lg:hidden
        "
        style={{
          background: `
            linear-gradient(
              180deg,
              rgba(255,255,255,0.96) 0%,
              rgba(255,255,255,0.92) 42%,
              rgba(255,255,255,0.76) 72%,
              rgba(255,255,255,0.68) 100%
            )
          `,
        }}
      />

      {/* ================================================================
          Readability overlay - Desktop
      ================================================================= */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          z-[1]
          hidden
          lg:block
        "
        style={{
          background: `
            linear-gradient(
              90deg,
              rgba(255,255,255,0.02) 0%,
              rgba(255,255,255,0.05) 34%,
              rgba(255,255,255,0.56) 54%,
              rgba(255,255,255,0.88) 70%,
              rgba(255,255,255,0.96) 100%
            )
          `,
        }}
      />

      {/* subtle top/bottom fade */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          z-[1]
          bg-gradient-to-b
          from-white/20
          via-transparent
          to-white/45
        "
      />

      {/* ================================================================
          Content
      ================================================================= */}
      <div
        className="
          relative
          z-10
          dnh-site-shell
          mx-auto
          flex
          w-full
          max-w-[1440px]
          flex-col

          px-5
          py-16

          sm:px-8
          sm:py-20

          lg:px-12
          lg:py-24

          xl:px-16
          xl:py-28
        "
      >
        {/* ------------------------------------------------------------
            Main content row
        ------------------------------------------------------------- */}
        <div
          className="
            grid
            items-center
            gap-12

            lg:grid-cols-2
            lg:gap-14

            
          "
        >
          {/* ==========================================================
              RIGHT / TEXT
          =========================================================== */}
          <div
            className="
              order-1
              text-right

              lg:col-start-1
            "
          >
            {/* Eyebrow */}
            <div
              className="
                mb-5
                flex
                items-center
                justify-start
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
                  tracking-[0.06em]
                  text-brand-primary

                  sm:text-[11px]
                "
              >
                دیدگاه DNH
              </span>
            </div>

            {/* Heading */}
            <h2
              id="wealth-architecture-title"
              className="
                max-w-[680px]

                text-[32px]
                font-black
                leading-[1.55]
                tracking-[-0.035em]

                text-ink

                sm:text-[40px]

                lg:text-[48px]
                lg:leading-[1.48]

                xl:text-[56px]
              "
            >
              معماری ثروت؛
              <br />
              <span className="text-brand-primary">
                فراتر از مشاوره سرمایه‌گذاری
              </span>
            </h2>

            {/* Description */}
            <p
              className="
                mt-6
                max-w-[640px]

                text-[14px]
                font-medium
                leading-[2.15]

                text-ink-muted

                sm:text-[15px]

                lg:mt-7
                lg:text-[16px]
              "
            >
              در DNH، تصمیم مالی صرفاً بر پایه یک متغیر یا یک پیشنهاد دیده
              نمی‌شود. هدف، ساختن تصویری منسجم از داده‌ها، ریسک‌ها، سناریوها،
              ساختار مالی و افق زمانی است تا مسیر تصمیم‌گیری روشن‌تر، دقیق‌تر و
              قابل‌دفاع‌تر شود.
            </p>

            {/* Statement */}
            <div
              className="
                mt-8
                max-w-[560px]

                border-r-2
                border-brand-accent

                pr-5

                sm:mt-9
                sm:pr-6
              "
            >
              <p
                className="
                  text-[17px]
                  font-black
                  leading-[1.9]
                  text-ink

                  sm:text-[19px]
                  lg:text-[20px]
                "
              >
                تصمیم مالی خوب، نتیجه دیدن یک متغیر نیست؛
                <br />
                <span className="text-brand-primary">
                  نتیجه دیدن ساختار است.
                </span>
              </p>
            </div>
          </div>

          {/* ==========================================================
              LEFT / RESERVED VISUAL SPACE

              تصویر Background خودش این قسمت را پر می‌کند.
              این div فقط فضای لازم را روی Desktop نگه می‌دارد.
          =========================================================== */}
          <div
            aria-hidden="true"
            className="
              order-2
              hidden

              lg:col-start-2
              lg:row-start-1
              lg:block
              lg:min-h-[360px]

              xl:min-h-[420px]
            "
          />
        </div>

        {/* ================================================================
            Framework strip
        ================================================================= */}
        <div
          className="
            mt-12

            border-t
            border-line/80

            pt-8

            sm:mt-14
            sm:pt-9

            lg:mt-16
            lg:pt-10
          "
        >
          <div
            className="
              grid
              gap-4

              md:grid-cols-3
              md:gap-0
            "
          >
            {FRAMEWORK_ITEMS.map((item, index) => (
              <FrameworkItemView key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* ================================================================
            Bottom signature
        ================================================================= */}
        <div
          className="
            mt-10
            flex
            items-center
            justify-center
            gap-3

            sm:mt-12
          "
        >
          <span
            aria-hidden="true"
            className="
              h-px
              w-7
              bg-brand-accent
            "
          />

          <span
            className="
              text-[9px]
              font-black
              tracking-[0.07em]
              text-ink-muted
            "
          >
            چارچوب تصمیم‌سازی DNH
          </span>

          <span
            aria-hidden="true"
            className="
              h-px
              w-7
              bg-brand-accent
            "
          />
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   Framework item
============================================================================ */

function FrameworkItemView({
  item,
  index,
}: {
  item: FrameworkItem;
  index: number;
}) {
  const Icon = item.icon;

  const isLast = index === FRAMEWORK_ITEMS.length - 1;

  return (
    <article
      className={`
        group
        relative

        flex
        items-start
        gap-4

        rounded-[20px]

        border
        border-line/70

        bg-white/75

        p-4

        shadow-[0_12px_32px_color-mix(in_srgb,var(--dnh-primary)_5%,transparent)]

        backdrop-blur-[8px]

        transition-[transform,border-color,background-color,box-shadow]
        duration-300

        hover:-translate-y-1
        hover:border-line-strong
        hover:bg-white
        hover:shadow-[0_16px_38px_color-mix(in_srgb,var(--dnh-primary)_8%,transparent)]

        sm:p-5

        md:rounded-none
        md:border-y-0
        md:border-r-0
        md:bg-white/35
        md:px-6
        md:py-3
        md:shadow-none
        md:hover:translate-y-0
        md:hover:bg-white/55
        md:hover:shadow-none

        ${
          !isLast
            ? `
              md:border-l
              md:border-line
            `
            : ""
        }
      `}
    >
      <div
        className="
          flex
          h-12
          w-12
          shrink-0
          items-center
          justify-center

          rounded-full

          border
          border-line

          bg-page/90

          text-brand-primary

          shadow-[0_8px_22px_color-mix(in_srgb,var(--dnh-primary)_6%,transparent)]

          transition-[transform,background-color,border-color,color]
          duration-300

          group-hover:-translate-y-0.5
          group-hover:border-brand-primary
          group-hover:bg-brand-primary
          group-hover:text-white
        "
      >
        <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.7} />
      </div>

      <div className="min-w-0 text-right">
        <h3
          className="
            text-[15px]
            font-black
            leading-7
            text-ink

            sm:text-[16px]
          "
        >
          {item.title}
        </h3>

        <p
          className="
            mt-1
            max-w-[330px]

            text-[11px]
            font-medium
            leading-[2]

            text-ink-muted

            sm:text-[12px]
          "
        >
          {item.description}
        </p>
      </div>
    </article>
  );
}
