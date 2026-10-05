import Link from "next/link";

import { ArrowDownLeft, CircleDot } from "lucide-react";

/* =============================================================================
   Public framework layers
============================================================================= */

const FRAMEWORK_LAYERS = [
  {
    letter: "D",
    en: "DATA INTELLIGENCE",
    fa: "هوشمندی داده",
    question: "چه چیزهایی محیط تصمیم را شکل می‌دهند؟",
    description:
      "در این لایه، داده‌ها و متغیرهایی که بر تصمیم اثر می‌گذارند در کنار هم دیده می‌شوند؛ از اقتصاد، تورم و ارز تا نقدینگی، بازارها، ساختار مالی و شرایط مرتبط با خود تصمیم.",
    keywords: ["اقتصاد", "تورم", "ارز", "نقدینگی", "بازارها", "ساختار مالی"],
    accent: "orange",
  },
  {
    letter: "N",
    en: "NAVIGATION STRATEGY",
    fa: "راهبرد ناوبری",
    question: "از این تصویر، چه مسیرهایی باید بررسی شوند؟",
    description:
      "داده و تحلیل به سناریو، مسیرهای قابل بررسی، اولویت‌های ریسک و گزینه‌های تصمیم تبدیل می‌شوند؛ نه برای ساختن یک پاسخ قطعی، بلکه برای روشن‌تر کردن انتخاب‌های پیش رو.",
    keywords: ["سناریو", "مسیر تصمیم", "اولویت ریسک", "گزینه‌ها"],
    accent: "teal",
  },
  {
    letter: "H",
    en: "HORIZON ARCHITECTURE",
    fa: "معماری افق",
    question: "این تصمیم با افق بلندمدت چه نسبتی دارد؟",
    description:
      "تصمیم امروز در ارتباط با ساختار بلندمدت ثروت، نقدشوندگی، تاب‌آوری، اهداف و افق زمانی بررسی می‌شود تا تصمیم فقط برای امروز معنا نداشته باشد.",
    keywords: ["ثروت", "نقدشوندگی", "تاب‌آوری", "اهداف", "افق زمانی"],
    accent: "deep",
  },
] as const;

/* =============================================================================
   Section
============================================================================= */

export function FrameworkLayersSection() {
  return (
    <section
      id="framework-layers"
      dir="rtl"
      aria-labelledby="framework-layers-title"
      className="
        relative
        isolate

        scroll-mt-24
        overflow-hidden

        border-b
        border-line

        bg-page

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

            lg:grid-cols-[0.82fr_1.18fr]
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

              <p
                className="
                  text-[10px]
                  font-black

                  text-brand-primary

                  sm:text-[11px]
                "
              >
                سه لایه چارچوب DNH
              </p>
            </div>

            <h2
              id="framework-layers-title"
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
              سه لایه،
              <br />
              برای دیدن <span className="text-brand-primary">یک تصمیم</span> از
              سه زاویه.
            </h2>
          </div>

          <div className="lg:pb-1">
            <p
              className="
                max-w-[700px]

                text-[13px]
                font-medium
                leading-[2.2]

                text-ink-muted

                sm:text-[14px]

                lg:text-[15px]
              "
            >
              DNH Framework مسئله مالی را فقط از زاویه بازار یا یک دارایی نگاه
              نمی‌کند. ابتدا محیط تصمیم روشن‌تر می‌شود، سپس مسیرهای قابل بررسی
              شکل می‌گیرند و در نهایت تصمیم با افق بلندمدت سنجیده می‌شود.
            </p>
          </div>
        </div>

        {/* =======================================================
            Layers
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
          {FRAMEWORK_LAYERS.map((layer, index) => (
            <FrameworkLayer
              key={layer.letter}
              layer={layer}
              index={index}
              last={index === FRAMEWORK_LAYERS.length - 1}
            />
          ))}
        </div>

        {/* =======================================================
            Closing
        ======================================================== */}

        <div
          className="
            mt-7

            flex
            flex-col
            gap-5

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div
            className="
              flex
              items-start
              gap-3
            "
          >
            <CircleDot
              aria-hidden="true"
              className="
                mt-1
                h-4
                w-4
                shrink-0

                text-brand-primary
              "
              strokeWidth={1.5}
            />

            <p
              className="
                max-w-[760px]

                text-[10px]
                font-medium
                leading-[2]

                text-ink-muted

                sm:text-[11px]
              "
            >
              این سه لایه یک نگاه ساختاری به تصمیم می‌سازند؛ نه یک فرمول عمومی
              برای تولید پاسخ قطعی.
            </p>
          </div>

          <Link
            href="#framework-decision-flow"
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
            این سه لایه چگونه به تصمیم می‌رسند؟
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
   Layer row
============================================================================= */

function FrameworkLayer({
  layer,
  index,
  last,
}: {
  layer: (typeof FRAMEWORK_LAYERS)[number];
  index: number;
  last: boolean;
}) {
  const theme = getTheme(layer.accent);

  return (
    <article
      className={`
        group/layer

        relative

        grid
        gap-6

        py-7

        transition-colors
        duration-300

        hover:bg-surface-soft/55

        sm:py-8

        lg:grid-cols-[0.22fr_0.78fr]
        lg:items-stretch
        lg:gap-0
        lg:py-0

        ${!last ? "border-b border-line" : ""}
      `}
    >
      {/* =====================================================
          Letter
      ====================================================== */}

      <div
        className="
          relative

          flex
          items-center
          justify-between

          px-5

          sm:px-7

          lg:min-h-[260px]
          lg:flex-col
          lg:items-start
          lg:justify-between
          lg:border-l
          lg:border-line
          lg:px-8
          lg:py-8
        "
      >
        <span
          className={`
            font-mono
            text-[58px]
            font-black
            leading-none
            tracking-[-0.08em]

            transition-[color,transform]
            duration-400

            group-hover/layer:-translate-y-1

            sm:text-[70px]

            lg:text-[86px]

            ${theme.letter}
          `}
        >
          {layer.letter}
        </span>

        <span
          className="
            text-[8px]
            font-black

            text-ink-muted/30
          "
        >
          0{index + 1}
        </span>

        <span
          aria-hidden="true"
          className={`
            absolute
            bottom-0
            right-0

            hidden
            h-[3px]
            w-10

            transition-[width]
            duration-500

            group-hover/layer:w-full

            lg:block

            ${theme.line}
          `}
        />
      </div>

      {/* =====================================================
          Content
      ====================================================== */}

      <div
        className="
          grid
          gap-7

          px-5

          sm:px-7

          lg:min-h-[260px]
          lg:grid-cols-[0.92fr_1.08fr]
          lg:items-center
          lg:gap-12
          lg:px-10
          lg:py-8

          xl:px-12
        "
      >
        {/* title */}

        <div>
          <p
            dir="ltr"
            className={`
              text-right
              text-[7px]
              font-black
              tracking-[0.18em]

              ${theme.eyebrow}
            `}
          >
            {layer.en}
          </p>

          <p
            className="
              mt-2

              text-[10px]
              font-bold

              text-ink-muted
            "
          >
            {layer.fa}
          </p>

          <h3
            className="
              mt-4
              max-w-[440px]

              text-[18px]
              font-black
              leading-[1.85]

              text-ink

              sm:text-[21px]
            "
          >
            {layer.question}
          </h3>
        </div>

        {/* description */}

        <div>
          <p
            className="
              max-w-[650px]

              text-[11px]
              font-medium
              leading-[2.15]

              text-ink-muted

              sm:text-[12px]

              lg:text-[13px]
            "
          >
            {layer.description}
          </p>

          <div
            className="
              mt-5

              flex
              flex-wrap
              gap-x-4
              gap-y-2
            "
          >
            {layer.keywords.map((keyword) => (
              <span
                key={keyword}
                className="
                    relative

                    pr-3

                    text-[9px]
                    font-bold

                    text-ink-muted

                    before:absolute
                    before:right-0
                    before:top-1/2

                    before:h-[5px]
                    before:w-[5px]

                    before:-translate-y-1/2

                    before:bg-brand-primary/30
                  "
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

/* =============================================================================
   Theme
============================================================================= */

function getTheme(tone: "orange" | "teal" | "deep") {
  switch (tone) {
    case "orange":
      return {
        letter: "text-brand-accent",
        eyebrow: "text-brand-accent",
        line: "bg-brand-accent",
      };

    case "teal":
      return {
        letter: "text-[#4a9fbd]",
        eyebrow: "text-[#3187a6]",
        line: "bg-[#4a9fbd]",
      };

    default:
      return {
        letter: "text-brand-primary",
        eyebrow: "text-brand-primary",
        line: "bg-brand-primary",
      };
  }
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
            "linear-gradient(112deg,color-mix(in srgb,var(--dnh-primary) 4%,white) 0%,white 45%,white 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.12]
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
          right-[18%]
          top-0

          h-[6px]
          w-[2px]

          bg-brand-accent
        "
      />
    </>
  );
}
