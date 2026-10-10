"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import {
  ArrowLeft,
  Check,
  ClipboardCheck,
  FileSearch,
  MessageSquare,
  Presentation,
  Route,
  ShieldCheck,
  LucideIcon,
} from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   After submission flow
============================================================================= */

const REVIEW_STEPS = [
  {
    number: "01",
    en: "RECEIVED",
    title: "درخواست ثبت می‌شود",
    description:
      "اطلاعات اولیه‌ای که در Assessment وارد کرده‌اید، مبنای شناخت اولیه موضوع قرار می‌گیرد.",
    icon: ClipboardCheck,
  },
  {
    number: "02",
    en: "FIT & SCOPE",
    title: "تناسب و دامنه بررسی می‌شود",
    description:
      "موضوع تصمیم، فوریت، افق زمانی و سطح پیچیدگی در سطح اولیه بررسی می‌شوند.",
    icon: FileSearch,
  },
  {
    number: "03",
    en: "NEXT PATH",
    title: "مسیر بعدی مشخص می‌شود",
    description:
      "در صورت تناسب، شکل مناسب ادامه گفت‌وگو یا بررسی حرفه‌ای پیشنهاد می‌شود.",
    icon: Route,
  },
] as const;

const NEXT_PATHS = [
  {
    en: "STRATEGIC CONSULTATION",
    title: "جلسه تخصصی",
    description:
      "برای مسئله‌ای که نیازمند گفت‌وگوی عمیق‌تر، روشن‌شدن دامنه و بررسی حرفه‌ای است.",
    icon: MessageSquare,
    tone: "teal",
  },
  {
    en: "EXECUTIVE BRIEFING",
    title: "Executive Briefing",
    description:
      "برای موضوعی متمرکز که نیازمند جمع‌بندی در سطح مدیر، صاحب سرمایه یا تصمیم‌گیرنده کلیدی است.",
    icon: Presentation,
    tone: "orange",
  },
] as const;

/* =============================================================================
   Section
============================================================================= */

export function AfterSubmissionSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;

    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        setVisible(true);
        observer.disconnect();
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="after-submission"
      dir="rtl"
      aria-labelledby="after-submission-title"
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

          py-16

          sm:py-20

          lg:py-24

          xl:py-28

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
          <Reveal visible={visible} delay={40}>
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
                  بعد از ارسال Assessment
                </span>
              </div>

              <h2
                id="after-submission-title"
                className="
                  max-w-[720px]

                  text-[31px]
                  font-black
                  leading-[1.62]
                  tracking-[-0.045em]

                  text-ink

                  sm:text-[38px]

                  lg:text-[45px]
                  lg:leading-[1.5]

                  xl:text-[50px]
                "
              >
                درخواست ارسال شد؛
                <br />
                حالا <span className="text-brand-primary">مسیر مناسب</span>{" "}
                بررسی می‌شود.
              </h2>
            </div>
          </Reveal>

          <Reveal visible={visible} delay={110}>
            <p
              className="
                max-w-[690px]

                text-[13px]
                font-medium
                leading-[2.2]

                text-ink-muted

                sm:text-[14px]

                lg:text-[15px]
              "
            >
              ارسال Assessment به‌معنی ورود مستقیم به یک خدمت مشخص نیست. ابتدا
              درخواست از نظر موضوع، دامنه، فوریت و پیچیدگی بررسی می‌شود تا ادامه
              مسیر با خود مسئله متناسب باشد.
            </p>
          </Reveal>
        </div>

        {/* =======================================================
            Routing board
        ======================================================== */}

        <div
          className="
            mt-12

            sm:mt-14

            lg:mt-16
          "
        >
          <div
            className={`
              group/board

              relative
              overflow-hidden

              border
              border-line

              bg-white

              shadow-[0_30px_90px_rgba(11,76,101,.08)]

              transition-[opacity,transform,border-color,box-shadow]
              duration-700
              ease-[cubic-bezier(.22,1,.36,1)]

              hover:-translate-y-[3px]
              hover:border-brand-primary/25
              hover:shadow-[0_38px_110px_rgba(11,76,101,.12)]

              ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }

              motion-reduce:translate-y-0
              motion-reduce:opacity-100
              motion-reduce:transition-none
            `}
            style={{
              transitionDelay: "170ms",
            }}
          >
            {/* top accent */}

            <div
              aria-hidden="true"
              className="
                absolute
                inset-x-0
                top-0

                flex
                h-[3px]
              "
            >
              <span className="w-[20%] bg-brand-accent" />
              <span className="flex-1 bg-brand-primary" />
            </div>

            {/* ===================================================
                Board header
            ==================================================== */}

            <div
              className="
                flex
                flex-col
                gap-4

                border-b
                border-line

                px-5
                pb-5
                pt-7

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
                    text-[11px]
                    font-black
                    tracking-[0.19em]

                    text-brand-primary/55
                  "
                >
                  REQUEST ROUTING
                </p>

                <h3
                  className="
                    mt-2

                    text-[16px]
                    font-black

                    text-ink

                    sm:text-[18px]
                  "
                >
                  مسیر بررسی درخواست
                </h3>
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
                    h-[11px]
                    w-[11px]

                    bg-brand-primary
                  "
                />

                <span
                  className="
                    text-[11px]
                    font-bold

                    text-ink-muted
                  "
                >
                  بررسی اولیه، قبل از تعیین خدمت
                </span>
              </div>
            </div>

            {/* ===================================================
                Main routing
            ==================================================== */}

            <div
              className="
                grid

                lg:grid-cols-[0.63fr_0.37fr]
              "
            >
              {/* -------------------------------------------------
                  Sequence
              -------------------------------------------------- */}

              <ol
                className="
                  border-b
                  border-line

                  lg:border-b-0
                  lg:border-l
                "
              >
                {REVIEW_STEPS.map((item, index) => (
                  <ReviewStep
                    key={item.en}
                    item={item}
                    index={index}
                    visible={visible}
                    last={index === REVIEW_STEPS.length - 1}
                  />
                ))}
              </ol>

              {/* -------------------------------------------------
                  Routing destination
              -------------------------------------------------- */}

              <div
                className="
                  bg-surface-soft/45

                  px-5
                  py-6

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

                    text-brand-primary/55
                  "
                >
                  POSSIBLE NEXT STEP
                </p>

                <h3
                  className="
                    mt-2

                    text-[15px]
                    font-black
                    leading-[1.9]

                    text-ink
                  "
                >
                  در صورت تناسب،
                  <br />
                  ادامه مسیر می‌تواند شکل متفاوتی داشته باشد.
                </h3>

                <div
                  className="
                    mt-6
                    space-y-3
                  "
                >
                  {NEXT_PATHS.map((path) => (
                    <PathCard key={path.en} path={path} />
                  ))}
                </div>

                <div
                  className="
                    mt-6

                    border-r-2
                    border-brand-accent

                    pr-4
                  "
                >
                  <p
                    className="
                      text-[11px]
                      font-medium
                      leading-[1.9]

                      text-ink-muted
                    "
                  >
                    اگر مسئله در دامنه مناسب همکاری قرار نگیرد، Assessment
                    الزاماً به جلسه یا پروژه مشاوره منتهی نمی‌شود.
                  </p>
                </div>
              </div>
            </div>

            {/* ===================================================
                Closing statement
            ==================================================== */}

            <div
              className="
                group/close

                flex
                flex-col
                gap-5

                border-t
                border-line

                bg-brand-primary

                px-5
                py-6

                text-white

                sm:flex-row
                sm:items-center
                sm:justify-between
                sm:px-7

                lg:px-8
              "
            >
              <div
                className="
                  flex
                  items-start
                  gap-4
                "
              >
                <span
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0

                    items-center
                    justify-center

                    border
                    border-white/15

                    bg-white/[0.07]

                    text-brand-accent
                  "
                >
                  <Route className="h-4 w-4" strokeWidth={1.5} />
                </span>

                <div>
                  <p
                    dir="ltr"
                    className="
                      text-right
                      text-[11px]
                      font-black
                      tracking-[0.18em]

                      text-white/40
                    "
                  >
                    THE PRINCIPLE
                  </p>

                  <p
                    className="
                      mt-2

                      text-[11px]
                      font-black
                      leading-[2]

                      text-white

                      sm:text-[12px]
                    "
                  >
                    اول مسئله و تناسب روشن می‌شود؛ بعد نوع همکاری.
                  </p>
                </div>
              </div>

              <span
                aria-hidden="true"
                className="
                  hidden

                  h-px
                  w-20

                  bg-white/20

                  transition-[width,background-color]
                  duration-500

                  group-hover/close:w-28
                  group-hover/close:bg-brand-accent

                  sm:block
                "
              />
            </div>
          </div>
        </div>

        {/* =======================================================
            Reassurance strip
        ======================================================== */}

        <Reveal visible={visible} delay={580}>
          <div
            className="
              mt-6

              grid
              gap-px

              border
              border-line

              bg-line

              sm:grid-cols-3
            "
          >
            <Reassurance
              icon={ClipboardCheck}
              title="ثبت درخواست"
              text="Assessment نقطه شروع شناخت مسئله است."
            />

            <Reassurance
              icon={FileSearch}
              title="بررسی تناسب"
              text="دامنه، پیچیدگی و مسیر مناسب اولیه بررسی می‌شود."
            />

            <Reassurance
              icon={ShieldCheck}
              title="بدون وعده از پیش"
              text="نوع ادامه همکاری قبل از بررسی اولیه فرض نمی‌شود."
            />
          </div>
        </Reveal>

        {/* =======================================================
            Navigation
        ======================================================== */}

        <Reveal visible={visible} delay={650}>
          <div
            className="
              mt-8

              flex
              flex-col
              gap-5

              border-t
              border-line

              pt-6

              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div>
              <p
                className="
                  text-[11px]
                  font-medium

                  text-ink-muted
                "
              >
                هنوز فرم را ارسال نکرده‌اید؟
              </p>

              <a
                href="#assessment-form"
                className="
                  mt-2

                  inline-flex
                  items-center
                  gap-2

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
                بازگشت به Assessment
                <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.6} />
              </a>
            </div>

            <ActionButton
              href="#assessment-contact"
              variant="secondary"
              size="md"
              icon={ArrowLeft}
              className="
                w-full

                border-line-strong
                bg-white

                text-ink

                shadow-none

                hover:bg-brand-primary
 
                sm:w-auto
                sm:min-w-[235px]
              "
            >
              سؤال دیگری درباره مسیر دارید؟
            </ActionButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =============================================================================
   Review step
============================================================================= */

function ReviewStep({
  item,
  index,
  visible,
  last,
}: {
  item: (typeof REVIEW_STEPS)[number];
  index: number;
  visible: boolean;
  last: boolean;
}) {
  const Icon = item.icon;

  return (
    <li
      className={`
        group/step

        relative

        grid
        gap-5

        px-5
        py-7

        transition-[opacity,transform,background-color]
        duration-700
        ease-[cubic-bezier(.22,1,.36,1)]

        hover:bg-surface-soft/55

        sm:grid-cols-[70px_1fr_auto]
        sm:items-center
        sm:px-7

        lg:px-8

        ${!last ? "border-b border-line" : ""}

        ${visible ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"}

        motion-reduce:translate-x-0
        motion-reduce:opacity-100
        motion-reduce:transition-none
      `}
      style={{
        transitionDelay: `${230 + index * 90}ms`,
      }}
    >
      {/* number */}

      <div
        className="
          relative

          flex
          items-center
          gap-3

          sm:block
        "
      >
        <span
          className="
            relative
            z-10

            flex
            h-12
            w-12

            items-center
            justify-center

            border
            border-brand-primary/20

            bg-brand-primary/[0.05]

            text-[10px]
            font-black

            text-brand-primary

            transition-[background-color,border-color,color,transform]
            duration-300

            group-hover/step:-translate-y-0.5
            group-hover/step:border-brand-primary
            group-hover/step:bg-brand-primary
            group-hover/step:text-white
          "
        >
          {item.number}
        </span>

        {!last ? (
          <span
            aria-hidden="true"
            className="
              absolute
              right-[23px]
              top-12

              hidden
              h-[calc(100%+29px)]
              w-px

              bg-brand-primary/12

              transition-colors
              duration-300

              group-hover/step:bg-brand-accent/40

              sm:block
            "
          />
        ) : null}
      </div>

      {/* content */}

      <div>
        <div
          className="
            flex
            flex-wrap
            items-center
            gap-3
          "
        >
          <span
            className="
              flex
              h-8
              w-8

              items-center
              justify-center

              border
              border-line

              bg-surface-soft/50

              text-brand-primary

              transition-[background-color,border-color,color]
              duration-300

              group-hover/step:border-brand-accent/30
              group-hover/step:bg-brand-accent/[0.07]
              group-hover/step:text-brand-accent
            "
          >
            <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
          </span>

          <h3
            className="
              text-[13px]
              font-black

              text-ink

              sm:text-[14px]
            "
          >
            {item.title}
          </h3>

          <span
            dir="ltr"
            className="
              text-[6px]
              font-bold
              tracking-[0.16em]

              text-brand-primary/35
            "
          >
            {item.en}
          </span>
        </div>

        <p
          className="
            mt-3
            max-w-[610px]

            text-[10px]
            font-medium
            leading-[2]

            text-ink-muted

            sm:text-[11px]
          "
        >
          {item.description}
        </p>
      </div>

      <div
        aria-hidden="true"
        className="
          hidden
          items-center
          gap-2

          sm:flex
        "
      >
        <span
          className="
            h-px
            w-8

            bg-brand-primary/14

            transition-[width,background-color]
            duration-300

            group-hover/step:w-14
            group-hover/step:bg-brand-accent/60
          "
        />

        <span
          className="
            h-[6px]
            w-[6px]

            bg-brand-primary/25

            transition-colors
            duration-300

            group-hover/step:bg-brand-accent
          "
        />
      </div>
    </li>
  );
}

/* =============================================================================
   Path card
============================================================================= */

function PathCard({ path }: { path: (typeof NEXT_PATHS)[number] }) {
  const Icon = path.icon;

  const orange = path.tone === "orange";

  return (
    <div
      className="
        group/path

        relative
        overflow-hidden

        border
        border-line

        bg-white

        p-5

        transition-[transform,border-color,box-shadow]
        duration-300

        hover:-translate-y-0.5
        hover:border-brand-primary/30
        hover:shadow-[0_14px_34px_rgba(12,76,101,.07)]
      "
    >
      <span
        aria-hidden="true"
        className={`
          absolute
          inset-y-0
          right-0

          w-[3px]

          origin-bottom
          scale-y-[0.25]

          transition-transform
          duration-400

          group-hover/path:scale-y-100

          ${orange ? "bg-brand-accent" : "bg-brand-primary"}
        `}
      />

      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <span
          className={`
            flex
            h-9
            w-9

            items-center
            justify-center

            border

            transition-[background-color,border-color,color,transform]
            duration-300

            group-hover/path:-translate-y-0.5

            ${
              orange
                ? `
                  border-brand-accent/20
                  bg-brand-accent/[0.05]
                  text-brand-accent

                  group-hover/path:border-brand-accent
                  group-hover/path:bg-brand-accent
                  group-hover/path:text-white
                `
                : `
                  border-brand-primary/20
                  bg-brand-primary/[0.05]
                  text-brand-primary

                  group-hover/path:border-brand-primary
                  group-hover/path:bg-brand-primary
                  group-hover/path:text-white
                `
            }
          `}
        >
          <Icon className="h-4 w-4" strokeWidth={1.5} />
        </span>

        <Check
          aria-hidden="true"
          className="
            h-4
            w-4

            text-ink-muted/18

            transition-colors
            duration-300

            group-hover/path:text-brand-primary
          "
          strokeWidth={1.5}
        />
      </div>

      <p
        dir="ltr"
        className="
          mt-5

          text-right
          text-[6px]
          font-black
          tracking-[0.16em]

          text-brand-primary/40
        "
      >
        {path.en}
      </p>

      <h4
        className="
          mt-2

          text-[12px]
          font-black

          text-ink
        "
      >
        {path.title}
      </h4>

      <p
        className="
          mt-2

          text-[11px]
          font-medium
          leading-[1.9]

          text-ink-muted
        "
      >
        {path.description}
      </p>
    </div>
  );
}

/* =============================================================================
   Reassurance
============================================================================= */

function Reassurance({
  icon: Icon,
  title,
  text,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <div
      className="
        group/reassurance

        bg-white

        px-5
        py-5

        transition-colors
        duration-300

        hover:bg-surface-soft/60

        sm:px-6
      "
    >
      <div
        className="
          flex
          items-start
          gap-4
        "
      >
        <span
          className="
            flex
            h-9
            w-9
            shrink-0

            items-center
            justify-center

            border
            border-line

            text-brand-primary

            transition-[background-color,border-color,color,transform]
            duration-300

            group-hover/reassurance:-translate-y-0.5
            group-hover/reassurance:border-brand-primary
            group-hover/reassurance:bg-brand-primary
            group-hover/reassurance:text-white
          "
        >
          <Icon className="h-4 w-4" strokeWidth={1.5} />
        </span>

        <div>
          <h3
            className="
              text-[10px]
              font-black

              text-ink
            "
          >
            {title}
          </h3>

          <p
            className="
              mt-2

              text-[11px]
              font-medium
              leading-[1.9]

              text-ink-muted
            "
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =============================================================================
   Reveal
============================================================================= */

function Reveal({
  children,
  visible,
  delay,
}: {
  children: ReactNode;
  visible: boolean;
  delay: number;
}) {
  return (
    <div
      className={`
        transition-[opacity,transform]
        duration-700
        ease-[cubic-bezier(.22,1,.36,1)]

        ${visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}

        motion-reduce:translate-y-0
        motion-reduce:opacity-100
        motion-reduce:transition-none
      `}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
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
            "linear-gradient(115deg,color-mix(in srgb,var(--dnh-primary) 5%,white) 0%,white 46%,white 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.13]
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
