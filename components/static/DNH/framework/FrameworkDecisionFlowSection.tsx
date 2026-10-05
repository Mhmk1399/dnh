import Link from "next/link";

import { ArrowDownLeft, ArrowLeft, CircleDot } from "lucide-react";

/* =============================================================================
   Public conceptual flow
============================================================================= */

const FLOW = [
  {
    key: "D",
    en: "DATA INTELLIGENCE",
    fa: "محیط تصمیم",
    title: "ابتدا، آنچه بر تصمیم اثر می‌گذارد دیده می‌شود.",
    description:
      "داده‌ها، شرایط مالی، متغیرهای اقتصادی و زمینه خود مسئله کنار هم قرار می‌گیرند تا تصویر اولیه تصمیم روشن‌تر شود.",
    signal: "What shapes the decision?",
    tone: "orange",
  },
  {
    key: "N",
    en: "NAVIGATION STRATEGY",
    fa: "مسیرهای قابل بررسی",
    title: "بعد، عدم‌قطعیت به سناریو و گزینه تبدیل می‌شود.",
    description:
      "تحلیل به سناریوهای قابل بررسی، اولویت‌های ریسک و مسیرهایی تبدیل می‌شود که می‌توان آن‌ها را در تصمیم سنجید.",
    signal: "What paths should be considered?",
    tone: "blue",
  },
  {
    key: "H",
    en: "HORIZON ARCHITECTURE",
    fa: "افق تصمیم",
    title: "در نهایت، تصمیم امروز در نسبت با آینده دیده می‌شود.",
    description:
      "اثر تصمیم بر ساختار ثروت، نقدشوندگی، تاب‌آوری، اهداف و افق زمانی در تصویر بزرگ‌تر قرار می‌گیرد.",
    signal: "What does this mean over time?",
    tone: "white",
  },
] as const;

/* =============================================================================
   Section
============================================================================= */

export function FrameworkDecisionFlowSection() {
  return (
    <section
      id="framework-decision-flow"
      dir="rtl"
      aria-labelledby="framework-decision-flow-title"
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

                  text-white/68

                  sm:text-[11px]
                "
              >
                از اطلاعات تا تصویر تصمیم
              </p>
            </div>

            <h2
              id="framework-decision-flow-title"
              className="
                max-w-[800px]

                text-[32px]
                font-black
                leading-[1.62]
                tracking-[-0.045em]

                text-white

                sm:text-[39px]

                lg:text-[46px]
                lg:leading-[1.52]

                xl:text-[51px]
              "
            >
              هدف، تولید یک جواب فوری نیست؛
              <br />
              هدف، ساختن{" "}
              <span className="text-brand-accent">
                تصویر بهتری برای تصمیم
              </span>{" "}
              است.
            </h2>
          </div>

          <div className="lg:pb-1">
            <p
              className="
                max-w-[700px]

                text-[13px]
                font-medium
                leading-[2.2]

                text-white/58

                sm:text-[14px]

                lg:text-[15px]
              "
            >
              DNH Framework داده و عدم‌قطعیت را در یک ساختار تصمیم‌محور قرار
              می‌دهد؛ تا مسئله فقط به یک متغیر، یک بازار یا یک پاسخ کوتاه تقلیل
              پیدا نکند و مسیرهای قابل بررسی روشن‌تر شوند.
            </p>
          </div>
        </div>

        {/* =======================================================
            Decision corridor
        ======================================================== */}

        <div
          className="
            mt-12

            border
            border-white/12

            bg-white/[0.025]

            sm:mt-14

            lg:mt-16
          "
        >
          {/* -----------------------------------------------------
              top label
          ------------------------------------------------------ */}

          <div
            className="
              flex
              flex-col
              gap-3

              border-b
              border-white/10

              px-5
              py-5

              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:px-7

              lg:px-8
            "
          >
            <div>
              <p
                dir="ltr"
                className="
                  text-[7px]
                  font-black
                  tracking-[0.2em]

                  text-brand-accent
                "
              >
                CONCEPTUAL DECISION FLOW
              </p>

              <p
                className="
                  mt-1.5

                  text-[10px]
                  font-bold

                  text-white/48
                "
              >
                نمایش عمومی منطق چارچوب
              </p>
            </div>

            <p
              className="
                max-w-[470px]

                text-[8px]
                font-medium
                leading-[1.9]

                text-white/30
              "
            >
              این نمایش، توضیح مفهومی Framework است؛ نه ترتیب پردازش، وزن‌دهی یا
              منطق داخلی آن.
            </p>
          </div>

          {/* -----------------------------------------------------
              flow
          ------------------------------------------------------ */}

          <ol>
            {FLOW.map((item, index) => (
              <DecisionStage
                key={item.key}
                item={item}
                index={index}
                last={index === FLOW.length - 1}
              />
            ))}
          </ol>

          {/* -----------------------------------------------------
              Outcome
          ------------------------------------------------------ */}

          <div
            className="
              group/outcome

              relative
              overflow-hidden

              border-t
              border-white/12

              bg-brand-primary

              px-5
              py-7

              sm:px-7

              lg:px-8
              lg:py-8
            "
          >
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

            <div
              className="
                grid
                gap-6

                lg:grid-cols-[0.68fr_0.32fr]
                lg:items-center
              "
            >
              <div>
                <p
                  dir="ltr"
                  className="
                    text-[7px]
                    font-black
                    tracking-[0.19em]

                    text-white/38
                  "
                >
                  DECISION VIEW
                </p>

                <h3
                  className="
                    mt-2

                    text-[18px]
                    font-black
                    leading-[1.8]

                    text-white

                    sm:text-[21px]
                  "
                >
                  نتیجه، یک «تصویر تصمیم» روشن‌تر است.
                </h3>

                <p
                  className="
                    mt-3
                    max-w-[760px]

                    text-[10px]
                    font-medium
                    leading-[2.05]

                    text-white/52

                    sm:text-[11px]
                  "
                >
                  تصویری که در آن شرایط، ریسک‌ها، سناریوها، گزینه‌های قابل بررسی
                  و نسبت تصمیم با افق بلندمدت کنار هم دیده می‌شوند.
                </p>
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-4

                  lg:justify-end
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    h-px
                    flex-1

                    bg-white/15

                    transition-[background-color]
                    duration-300

                    group-hover/outcome:bg-brand-accent/60

                    lg:max-w-[120px]
                  "
                />

                <span
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0

                    items-center
                    justify-center

                    border
                    border-brand-accent/30

                    bg-brand-accent/[0.10]

                    text-brand-accent

                    transition-[background-color,color,border-color,transform]
                    duration-300

                    group-hover/outcome:-translate-x-1
                    group-hover/outcome:border-brand-accent
                    group-hover/outcome:bg-brand-accent
                    group-hover/outcome:text-white
                  "
                >
                  <ArrowLeft className="h-4 w-4" strokeWidth={1.6} />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =======================================================
            Boundary + next
        ======================================================== */}

        <div
          className="
            mt-7

            flex
            flex-col
            gap-6

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

                text-[#79c8df]
              "
              strokeWidth={1.5}
            />

            <p
              className="
                max-w-[750px]

                text-[9px]
                font-medium
                leading-[2]

                text-white/34

                sm:text-[10px]
              "
            >
              آنچه در این صفحه دیده می‌شود، منطق عمومی Framework است. وزن‌دهی
              متغیرها، روابط داخلی، Decision Tree و روش دقیق ساخت سناریو بخشی از
              معماری اختصاصی DNH باقی می‌مانند.
            </p>
          </div>

          <Link
            href="#framework-boundary"
            className="
              group/link

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
            چه چیزی عمومی است و چه چیزی نه؟
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
   Stage
============================================================================= */

function DecisionStage({
  item,
  index,
  last,
}: {
  item: (typeof FLOW)[number];
  index: number;
  last: boolean;
}) {
  const theme = getTheme(item.tone);

  return (
    <li
      className={`
        group/stage

        relative

        grid
        gap-6

        px-5
        py-7

        transition-colors
        duration-300

        hover:bg-white/[0.045]

        sm:px-7

        lg:grid-cols-[120px_0.78fr_1.22fr]
        lg:items-center
        lg:px-8
        lg:py-8

        ${!last ? "border-b border-white/10" : ""}
      `}
    >
      {/* =====================================================
          Identity
      ====================================================== */}

      <div
        className="
          flex
          items-center
          gap-4

          lg:block
        "
      >
        <span
          className={`
            flex
            h-12
            w-12

            shrink-0

            items-center
            justify-center

            border

            font-mono
            text-[17px]
            font-black

            transition-[background-color,border-color,color,transform]
            duration-300

            group-hover/stage:-translate-y-0.5

            ${theme.node}
          `}
        >
          {item.key}
        </span>

        <div className="lg:mt-4">
          <p
            dir="ltr"
            className={`
              text-right
              text-[6px]
              font-black
              tracking-[0.16em]

              ${theme.eyebrow}
            `}
          >
            {item.en}
          </p>

          <p
            className="
              mt-1

              text-[9px]
              font-bold

              text-white/46
            "
          >
            {item.fa}
          </p>
        </div>
      </div>

      {/* =====================================================
          Core question
      ====================================================== */}

      <div>
        <p
          dir="ltr"
          className="
            text-[6px]
            font-bold
            tracking-[0.14em]

            text-white/22
          "
        >
          {item.signal}
        </p>

        <h3
          className="
            mt-2
            max-w-[440px]

            text-[14px]
            font-black
            leading-[1.9]

            text-white

            sm:text-[15px]
          "
        >
          {item.title}
        </h3>
      </div>

      {/* =====================================================
          Explanation
      ====================================================== */}

      <div
        className="
          flex
          items-start
          gap-5
        "
      >
        <span
          aria-hidden="true"
          className={`
            mt-2

            hidden
            h-px
            w-10
            shrink-0

            opacity-45

            transition-[width,opacity]
            duration-300

            group-hover/stage:w-16
            group-hover/stage:opacity-100

            sm:block

            ${theme.line}
          `}
        />

        <p
          className="
            max-w-[620px]

            text-[10px]
            font-medium
            leading-[2.05]

            text-white/42

            sm:text-[11px]
          "
        >
          {item.description}
        </p>
      </div>

      {/* sequence */}

      <span
        aria-hidden="true"
        className="
          absolute
          left-5
          top-5

          text-[8px]
          font-black

          text-white/[0.10]

          sm:left-7

          lg:left-8
        "
      >
        0{index + 1}
      </span>
    </li>
  );
}

/* =============================================================================
   Tone
============================================================================= */

function getTheme(tone: "orange" | "blue" | "white") {
  if (tone === "orange") {
    return {
      node: `
        border-brand-accent/35
        bg-brand-accent/[0.08]
        text-brand-accent

        group-hover/stage:border-brand-accent
        group-hover/stage:bg-brand-accent
        group-hover/stage:text-white
      `,
      eyebrow: "text-brand-accent",
      line: "bg-brand-accent",
    };
  }

  if (tone === "blue") {
    return {
      node: `
        border-[#72c7df]/30
        bg-[#72c7df]/[0.06]
        text-[#8ad1e6]

        group-hover/stage:border-[#72c7df]
        group-hover/stage:bg-[#72c7df]
        group-hover/stage:text-[#032f3f]
      `,
      eyebrow: "text-[#8ad1e6]",
      line: "bg-[#72c7df]",
    };
  }

  return {
    node: `
      border-white/18
      bg-white/[0.04]
      text-white/72

      group-hover/stage:border-white/50
      group-hover/stage:bg-white
      group-hover/stage:text-brand-primary
    `,
    eyebrow: "text-white/58",
    line: "bg-white/55",
  };
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
            "radial-gradient(circle at 16% 38%,rgba(22,115,148,.20),transparent 28%),linear-gradient(114deg,#022b39 0%,#033847 52%,#022e3c 100%)",
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
