import { ArrowDownLeft, CircleDot } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   Conceptual example
============================================================================= */

const QUESTIONS = [
  {
    key: "D",
    en: "DATA INTELLIGENCE",
    title: "چه چیزی بر این تصمیم اثر می‌گذارد؟",
    text: "شرایط اقتصادی، نقدینگی، ساختار مالی، بازار و وضعیت خود تصمیم در کنار هم دیده می‌شوند.",
  },
  {
    key: "N",
    en: "NAVIGATION STRATEGY",
    title: "چه مسیرهایی باید بررسی شوند؟",
    text: "سناریوها، ریسک‌ها و گزینه‌های قابل بررسی روشن‌تر می‌شوند؛ بدون فرض یک پاسخ قطعی.",
  },
  {
    key: "H",
    en: "HORIZON ARCHITECTURE",
    title: "این تصمیم در بلندمدت چه معنایی دارد؟",
    text: "اثر آن بر ساختار ثروت، نقدشوندگی، تاب‌آوری، اهداف و افق زمانی دیده می‌شود.",
  },
] as const;

/* =============================================================================
   Section
============================================================================= */

export function FrameworkInPracticeSection() {
  return (
    <section
      id="framework-in-practice"
      dir="rtl"
      aria-labelledby="framework-in-practice-title"
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
                Framework در عمل
              </p>
            </div>

            <h2
              id="framework-in-practice-title"
              className="
                max-w-[740px]

                text-[31px]
                font-black
                leading-[1.65]
                tracking-[-0.045em]

                text-ink

                sm:text-[38px]

                lg:text-[44px]
                lg:leading-[1.55]

                xl:text-[49px]
              "
            >
              یک تصمیم،
              <br />
              از <span className="text-brand-primary">سه پرسش</span> دیده
              می‌شود.
            </h2>
          </div>

          <div className="lg:pb-1">
            <p
              className="
                max-w-[680px]

                text-[13px]
                font-medium
                leading-[2.2]

                text-ink-muted

                sm:text-[14px]

                lg:text-[15px]
              "
            >
              فرض کنید یک تصمیم مالی مهم پیش روست. Framework به‌جای شروع از یک
              پاسخ آماده، ابتدا کمک می‌کند مسئله از سه زاویه متفاوت دیده شود.
            </p>

            <p
              className="
                mt-3

                text-[11px]
                font-medium

                text-ink-muted/60
              "
            >
              نمونه مفهومی — نه Case Study واقعی
            </p>
          </div>
        </div>

        {/* =======================================================
            Example
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
          {/* -----------------------------------------------------
              Situation
          ------------------------------------------------------ */}

          <div
            className="
              grid
              gap-6

              py-7

              lg:grid-cols-[0.34fr_0.66fr]
              lg:items-center
              lg:py-8
            "
          >
            <div
              className="
                px-5

                sm:px-7

                lg:px-8
              "
            >
              <p
                dir="ltr"
                className="
                  text-[11px]
                  font-black
                  tracking-[0.18em]

                  text-brand-accent
                "
              >
                THE DECISION
              </p>

              <h3
                className="
                  mt-2

                  text-[17px]
                  font-black

                  text-ink

                  sm:text-[19px]
                "
              >
                یک تصمیم مالی مهم پیش روست.
              </h3>
            </div>

            <div
              className="
                border-r
                border-line

                px-5

                sm:px-7

                lg:px-10
              "
            >
              <p
                className="
                  max-w-[720px]

                  text-[11px]
                  font-medium
                  leading-[2.1]

                  text-ink-muted

                  sm:text-[12px]
                "
              >
                سؤال اولیه ممکن است ساده باشد: «چه تصمیمی بگیرم؟» اما پیش از
                پاسخ، باید روشن شود چه متغیرهایی مهم‌اند، چه مسیرهایی وجود دارند
                و این انتخاب در افق بلندمدت چه اثری خواهد داشت.
              </p>
            </div>
          </div>

          {/* -----------------------------------------------------
              Three questions
          ------------------------------------------------------ */}

          <div
            className="
              border-t
              border-line
            "
          >
            {QUESTIONS.map((item, index) => (
              <QuestionRow
                key={item.key}
                item={item}
                last={index === QUESTIONS.length - 1}
              />
            ))}
          </div>

          {/* -----------------------------------------------------
              Result
          ------------------------------------------------------ */}

          <div
            className="
              group/result

              relative

              border-t
              border-line

              bg-surface-soft/55

              px-5
              py-7

              sm:px-7

              lg:px-8
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
                flex
                flex-col
                gap-5

                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <div>
                <p
                  dir="ltr"
                  className="
                    text-[11px]
                    font-black
                    tracking-[0.18em]

                    text-brand-primary/50
                  "
                >
                  A CLEARER DECISION VIEW
                </p>

                <p
                  className="
                    mt-2

                    text-[15px]
                    font-black
                    leading-[1.9]

                    text-ink

                    sm:text-[17px]
                  "
                >
                  از «چه کاری انجام دهم؟»
                  <br className="sm:hidden" /> به «چه چیزی باید بررسی شود؟»
                </p>
              </div>

              <span
                aria-hidden="true"
                className="
                  hidden

                  h-px
                  w-14

                  bg-brand-primary/20

                  transition-[width,background-color]
                  duration-400

                  group-hover/result:w-24
                  group-hover/result:bg-brand-accent

                  sm:block
                "
              />
            </div>
          </div>
        </div>

        {/* =======================================================
            Bottom
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

                text-brand-primary
              "
              strokeWidth={1.5}
            />

            <p
              className="
                max-w-[730px]

                text-[11px]
                font-medium
                leading-[2]

                text-ink-muted

                sm:text-[10px]
              "
            >
              Framework قرار نیست یک تصمیم را به نسخه‌ای از پیش تعیین‌شده تبدیل
              کند؛ نقش آن ساختار دادن به مسئله و روشن‌تر کردن مسیرهای قابل بررسی
              است.
            </p>
          </div>

          <ActionButton
            href="#framework-cta"
            variant="secondary"
            size="md"
            icon={ArrowDownLeft}
            className="
              w-full

              border-line-strong
              bg-white

              text-ink

              shadow-none

              hover:border-brand-primary
              hover:bg-brand-primary
 
              sm:w-auto
              sm:min-w-[215px]
            "
          >
            قدم بعدی
          </ActionButton>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   Question row
============================================================================= */

function QuestionRow({
  item,
  last,
}: {
  item: (typeof QUESTIONS)[number];
  last: boolean;
}) {
  return (
    <article
      className={`
        group/question

        grid
        gap-5

        px-5
        py-6

        transition-colors
        duration-300

        hover:bg-surface-soft/50

        sm:px-7

        lg:grid-cols-[100px_0.78fr_1.22fr]
        lg:items-center
        lg:px-8
        lg:py-7

        ${!last ? "border-b border-line" : ""}
      `}
    >
      {/* identity */}

      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        <span
          className="
            flex
            h-10
            w-10

            items-center
            justify-center

            border
            border-brand-primary/15

            bg-brand-primary/[0.04]

            font-mono
            text-[14px]
            font-black

            text-brand-primary

            transition-[background-color,color,border-color,transform]
            duration-300

            group-hover/question:-translate-y-0.5
            group-hover/question:border-brand-primary
            group-hover/question:bg-brand-primary
            group-hover/question:text-white
          "
        >
          {item.key}
        </span>

        <span
          dir="ltr"
          className="
            text-[6px]
            font-black
            tracking-[0.13em]

            text-brand-primary/35

            lg:hidden
          "
        >
          {item.en}
        </span>
      </div>

      {/* question */}

      <div>
        <p
          dir="ltr"
          className="
            hidden

            text-[6px]
            font-black
            tracking-[0.15em]

            text-brand-primary/35

            lg:block
          "
        >
          {item.en}
        </p>

        <h3
          className="
            mt-1

            max-w-[430px]

            text-[12px]
            font-black
            leading-[1.9]

            text-ink

            sm:text-[13px]
          "
        >
          {item.title}
        </h3>
      </div>

      {/* answer */}

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

            text-[10px]
            font-medium
            leading-[2]

            text-ink-muted

            sm:text-[11px]
          "
        >
          {item.text}
        </p>
      </div>
    </article>
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
            "linear-gradient(112deg,color-mix(in srgb,var(--dnh-primary) 3%,white) 0%,white 52%,white 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.10]
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
