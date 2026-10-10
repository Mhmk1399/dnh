import { ArrowDownLeft, ArrowLeft } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   Framework layers
============================================================================= */

const FRAMEWORK_LAYERS = [
  {
    letter: "D",
    en: "DATA INTELLIGENCE",
    fa: "هوشمندی داده",
    summary: "شناخت محیط تصمیم",
    detail:
      "اقتصاد، تورم، ارز، نقدینگی، بازارها، ساختار مالی و شرایط مرتبط با تصمیم.",
    tone: "accent",
  },
  {
    letter: "N",
    en: "NAVIGATION STRATEGY",
    fa: "راهبرد ناوبری",
    summary: "ساختن مسیرهای قابل بررسی",
    detail: "تبدیل داده و تحلیل به سناریو، اولویت‌های ریسک و گزینه‌های تصمیم.",
    tone: "light",
  },
  {
    letter: "H",
    en: "HORIZON ARCHITECTURE",
    fa: "معماری افق",
    summary: "اتصال تصمیم امروز به آینده",
    detail: "هماهنگی تصمیم با ثروت، نقدینگی، تاب‌آوری، اهداف و افق زمانی.",
    tone: "primary",
  },
] as const;

/* =============================================================================
   Hero
============================================================================= */

export function DnhFrameworkHero() {
  return (
    <section
      id="framework-intro"
      dir="rtl"
      aria-labelledby="framework-hero-title"
      className="
        relative
        isolate

        scroll-mt-24
        overflow-hidden

        bg-[#022f3e]
        text-white

        sm:scroll-mt-28
      "
      style={{
        minHeight: "100dvh",
      }}
    >
      <Background />

      <div
        className="
          dnh-site-shell
          relative
          z-10

          mx-auto
          flex
          min-h-[100dvh]
          w-full
          max-w-[1536px]

          flex-col

          px-5
          pb-10
          pt-[118px]

          sm:px-8
          sm:pb-12
          sm:pt-[128px]

          lg:px-12
          lg:pb-12
          lg:pt-[112px]

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

            lg:grid-cols-[0.91fr_1.09fr]
            lg:gap-16
            lg:py-10

            xl:grid-cols-[0.86fr_1.14fr]
            xl:gap-20
          "
        >
          {/* =====================================================
              COPY
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
            {/* eyebrow */}

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
                چارچوب تصمیم‌سازی DNH
              </p>
            </div>

            {/* H1 */}

            <h1
              id="framework-hero-title"
              className="
                max-w-[790px]

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
              از داده و عدم‌قطعیت،
              <br />
              تا <span className="text-brand-accent">مسیر تصمیم</span> و افق
              بلندمدت.
            </h1>

            {/* body */}

            <p
              className="
                mt-6
                max-w-[690px]

                text-[13px]
                font-medium
                leading-[2.25]

                text-white/60

                sm:text-[14px]

                lg:text-[15px]
              "
            >
              چارچوب DNH برای نگاه ساختاری به تصمیم‌های مالی و ثروت طراحی شده
              است: ابتدا محیط تصمیم روشن‌تر می‌شود، سپس سناریوها و مسیرهای قابل
              بررسی شکل می‌گیرند و در نهایت تصمیم امروز در نسبت با ساختار
              بلندمدت ثروت دیده می‌شود.
            </p>

            </div>

            {/* CTA */}

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
                sm:items-center
              "
            >
              <ActionButton
                href="#framework-layers"
                variant="assessment"
                size="lg"
                icon={ArrowDownLeft}
                className="
                  w-full

                  bg-brand-accent
                  text-white

                  shadow-[0_18px_44px_rgba(252,133,2,.18)]

                  hover:-translate-y-0.5
                  hover:bg-[#eb7c01]

                  sm:w-auto
                  sm:min-w-[245px]
                "
              >
                آشنایی با سه لایه چارچوب
              </ActionButton>

              <ActionButton
                href="/financial-decision-assessment"
                variant="secondary"
                size="lg"
                icon={ArrowLeft}
                className="
                  w-full

                  border-white/22
                  bg-white/[0.035]

                  text-white

                  shadow-none

                  hover:border-white/40
                  hover:bg-white/[0.075]
                  hover:text-white

                  sm:w-auto
                  sm:min-w-[220px]
                "
              >
                ارزیابی تصمیم مالی
              </ActionButton>
            </div>

            {/* boundary */}

            <div
              className="
                hidden

                mt-8
                max-w-[700px]

                border-t
                border-white/11

                pt-5

                lg:block
              "
            >
              <div
                className="
                  flex
                  items-start
                  gap-3
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    mt-[11px]

                    h-[6px]
                    w-[6px]
                    shrink-0

                    bg-[#74c4dc]
                  "
                />

                <p
                  className="
                    text-[11px]
                    font-medium
                    leading-[2]

                    text-white/36

                    sm:text-[10px]
                  "
                >
                  DNH Framework برای تصمیم‌سازی ساختاری طراحی شده است؛ نه برای
                  سیگنال، پیش‌بینی قطعی قیمت یا جایگزینی قضاوت حرفه‌ای.
                </p>
              </div>
            </div>
          </div>

          {/* =====================================================
              SIGNATURE FRAMEWORK
          ====================================================== */}

          <div
            className="
              order-2

              lg:col-start-2
              lg:row-start-1
            "
          >
            <FrameworkArchitecture />
          </div>
        </div>

        {/* =======================================================
            Footer rail
        ======================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-6

            border-t
            border-white/10

            py-4
          "
        >
          <p
            dir="ltr"
            className="
              text-[6px]
              font-bold
              tracking-[0.2em]

              text-white/20

              sm:text-[11px]
            "
          >
            DATA → NAVIGATION → HORIZON
          </p>

          <div
            aria-hidden="true"
            className="
              flex
              items-center
              gap-3
            "
          >
            <span
              className="
                hidden

                h-px
                w-16

                bg-white/12

                sm:block
              "
            />

            <span
              className="
                h-[6px]
                w-[6px]

                bg-brand-accent
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   Framework architecture
============================================================================= */

function FrameworkArchitecture() {
  return (
    <div
      className="
        group/framework

        relative
        mx-auto

        w-full
        max-w-[720px]

        border
        border-white/12

        bg-white/[0.025]

        shadow-[0_36px_110px_rgba(0,0,0,.16)]

        transition-[border-color,box-shadow,transform]
        duration-500

        hover:-translate-y-[3px]
        hover:border-white/22
        hover:shadow-[0_44px_130px_rgba(0,0,0,.22)]
      "
    >
      {/* architectural top */}

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

          sm:px-7
        "
      >
        <div>
          <p
            dir="ltr"
            className="
              text-[11px]
              font-black
              tracking-[0.22em]

              text-brand-accent
            "
          >
            DNH FRAMEWORK
          </p>

          <p
            className="
              mt-1.5

              text-[10px]
              font-bold

              text-white/55
            "
          >
            سه لایه برای دیدن یک تصمیم
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

              bg-white/18
            "
          />

          <span
            className="
              h-px
              w-10

              bg-white/14

              transition-[width,background-color]
              duration-500

              group-hover/framework:w-16
              group-hover/framework:bg-brand-accent/55
            "
          />
        </div>
      </div>

      {/* =========================================================
          Layer stack
      ========================================================== */}

      <ol
        aria-label="سه لایه چارچوب DNH"
        className="
          relative

          divide-y
          divide-white/10
        "
      >
        {/* central spine */}

        <span
          aria-hidden="true"
          className="
            absolute
            bottom-0
            right-[46px]
            top-0

            hidden
            w-px

            bg-white/10

            sm:block
          "
        />

        {FRAMEWORK_LAYERS.map((layer, index) => (
          <FrameworkLayer key={layer.letter} layer={layer} index={index} />
        ))}
      </ol>

      {/* =========================================================
          Bottom
      ========================================================== */}

      <div
        className="
          group/boundary

          relative

          border-t
          border-white/10

          bg-black/[0.08]

          px-5
          py-5

          sm:px-7
        "
      >
        <span
          aria-hidden="true"
          className="
            absolute
            inset-y-0
            right-0

            w-[2px]

            bg-brand-accent
          "
        />

        <div
          className="
            flex
            items-center
            justify-between
            gap-6
          "
        >
          <div>
            <p
              dir="ltr"
              className="
                text-[6px]
                font-black
                tracking-[0.18em]

                text-white/25
              "
            >
              VISIBLE FRAMEWORK
            </p>

            <p
              className="
                mt-1.5

                text-[11px]
                font-bold
                leading-[1.9]

                text-white/48
              "
            >
              مفهوم و خروجی قابل توضیح است؛ منطق اختصاصی درون چارچوب باقی
              می‌ماند.
            </p>
          </div>

          <span
            aria-hidden="true"
            className="
              hidden

              h-px
              w-12

              bg-brand-accent/45

              transition-[width]
              duration-500

              group-hover/boundary:w-20

              sm:block
            "
          />
        </div>
      </div>
    </div>
  );
}

/* =============================================================================
   Layer
============================================================================= */

function FrameworkLayer({
  layer,
  index,
}: {
  layer: (typeof FRAMEWORK_LAYERS)[number];
  index: number;
}) {
  const tone =
    layer.tone === "accent"
      ? {
          letter:
            "border-brand-accent/35 bg-brand-accent/[0.07] text-brand-accent group-hover/layer:bg-brand-accent group-hover/layer:text-white",
          line: "bg-brand-accent",
          title: "text-brand-accent",
        }
      : layer.tone === "light"
        ? {
            letter:
              "border-[#72c7df]/25 bg-[#72c7df]/[0.05] text-[#8bd2e6] group-hover/layer:bg-[#72c7df] group-hover/layer:text-[#032f3f]",
            line: "bg-[#72c7df]",
            title: "text-[#8bd2e6]",
          }
        : {
            letter:
              "border-white/18 bg-white/[0.04] text-white/72 group-hover/layer:bg-white group-hover/layer:text-brand-primary",
            line: "bg-white/55",
            title: "text-white/82",
          };

  return (
    <li
      className="
        group/layer

        relative

        grid
        gap-5

        px-5
        py-6

        transition-[background-color]
        duration-300

        hover:bg-white/[0.045]

        sm:grid-cols-[58px_1fr]
        sm:items-center
        sm:px-7
        sm:py-7

        lg:py-8
      "
    >
      {/* D / N / H */}

      <div
        className="
          relative
          z-10
        "
      >
        <span
          className={`
            flex
            h-12
            w-12

            items-center
            justify-center

            border

            font-mono
            text-[17px]
            font-black

            transition-[background-color,color,border-color,transform]
            duration-300

            group-hover/layer:-translate-y-0.5

            ${tone.letter}
          `}
        >
          {layer.letter}
        </span>
      </div>

      {/* copy */}

      <div>
        <div
          className="
            flex
            flex-wrap
            items-baseline
            gap-x-3
            gap-y-1
          "
        >
          <p
            dir="ltr"
            className="
              text-[11px]
              font-black
              tracking-[0.16em]

              text-white/30
            "
          >
            {layer.en}
          </p>

          <span
            className="
              text-[11px]
              font-bold

              text-white/42
            "
          >
            {layer.fa}
          </span>
        </div>

        <h2
          className={`
            mt-2

            text-[13px]
            font-black

            sm:text-[14px]

            ${tone.title}
          `}
        >
          {layer.summary}
        </h2>

        <p
          className="
            mt-2
            max-w-[520px]

            text-[11px]
            font-medium
            leading-[1.95]

            text-white/40

            sm:text-[10px]
          "
        >
          {layer.detail}
        </p>

        <span
          aria-hidden="true"
          className={`
            mt-4
            block

            h-[2px]
            w-7

            opacity-55

            transition-[width,opacity]
            duration-400

            group-hover/layer:w-16
            group-hover/layer:opacity-100

            ${tone.line}
          `}
        />
      </div>

      {/* sequence marker */}

      <span
        aria-hidden="true"
        className="
          absolute
          left-5
          top-5

          text-[11px]
          font-black

          text-white/[0.12]

          sm:left-7
        "
      >
        0{index + 1}
      </span>
    </li>
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
            "radial-gradient(circle at 77% 37%,rgba(22,115,148,.28),transparent 29%),linear-gradient(116deg,#022936 0%,#033847 50%,#022d3a 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.08]
        "
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,.09) 1px,transparent 1px)",
          backgroundSize: "118px 100%",
        }}
      />

      {/* architectural horizon */}

      <span
        aria-hidden="true"
        className="
          absolute
          bottom-[24%]
          left-0
          right-0

          h-px

          bg-white/[0.055]
        "
      />

      
    </>
  );
}
