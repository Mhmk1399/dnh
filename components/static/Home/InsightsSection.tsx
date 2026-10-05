"use client";

import Link from "next/link";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import {
  ArrowLeft,
  ArrowUpLeft,
  BrainCircuit,
  Layers3,
  ShieldCheck,
  WalletCards,
} from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   Insight directions

   تا زمان دریافت مقالات واقعی از CMS،
   این‌ها «حوزه‌های تحلیلی» هستند، نه مقاله منتشرشده.
============================================================================= */

const INSIGHT_LENSES = [
  {
    en: "RISK",
    title: "ریسک فقط نوسان نیست",
    description:
      "ریسک می‌تواند از تمرکز دارایی، نقدینگی، ساختار مالی یا خودِ فرآیند تصمیم ایجاد شود.",
    icon: ShieldCheck,
  },
  {
    en: "LIQUIDITY",
    title: "نقدینگی بخشی از معماری تصمیم است",
    description:
      "انعطاف مالی و نیازهای آینده باید در کنار دارایی‌ها و اهداف دیده شوند.",
    icon: WalletCards,
  },
  {
    en: "DECISION-MAKING",
    title: "کیفیت تصمیم، فقط به حجم اطلاعات بستگی ندارد",
    description:
      "زمینه، سناریو، افق زمانی و نحوه تفسیر اطلاعات هم بخشی از تصویر هستند.",
    icon: BrainCircuit,
  },
] as const;

const CONTENT_FLOW = [
  {
    en: "CONTEXT",
    fa: "زمینه",
  },
  {
    en: "RISK",
    fa: "ریسک",
  },
  {
    en: "SCENARIO",
    fa: "سناریو",
  },
  {
    en: "IMPLICATION",
    fa: "پیامد",
  },
] as const;

const TOPICS = [
  "معماری ثروت",
  "ریسک",
  "تخصیص دارایی",
  "تصمیم‌گیری مالی",
  "مالی رفتاری",
  "تورم",
  "ارز",
  "نقدینگی",
  "مالی کسب‌وکار",
] as const;

/* =============================================================================
   Section
============================================================================= */

export function InsightsSection() {
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
        threshold: 0.14,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="insights"
      dir="rtl"
      aria-labelledby="insights-title"
      className="
        relative
        isolate
        overflow-hidden

        bg-[#032f3f]
        text-white
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

            lg:grid-cols-[0.85fr_1.15fr]
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

                    text-white/70

                    sm:text-[11px]
                  "
                >
                  بینش‌های DNH
                </span>
              </div>

              <h2
                id="insights-title"
                className="
                  max-w-[700px]

                  text-[32px]
                  font-black
                  leading-[1.6]
                  tracking-[-0.045em]

                  text-white

                  sm:text-[39px]

                  lg:text-[46px]
                  lg:leading-[1.5]

                  xl:text-[51px]
                "
              >
                برای تصمیم بهتر،
                <br />
                باید مسئله را از{" "}
                <span className="text-brand-accent">زاویه درست</span> دید.
              </h2>
            </div>
          </Reveal>

          <Reveal visible={visible} delay={110}>
            <div className="lg:pb-1">
              <p
                className="
                  max-w-[670px]

                  text-[13px]
                  font-medium
                  leading-[2.2]

                  text-white/62

                  sm:text-[14px]

                  lg:text-[15px]
                "
              >
                Insights در DNH قرار نیست مجموعه‌ای از خبرها یا آموزش‌های عمومی
                باشد. این بخش به مسئله‌هایی می‌پردازد که می‌توانند نحوه دیدن
                ثروت، ریسک، نقدینگی و تصمیم‌های مالی را تغییر دهند.
              </p>

              <div className="mt-7">
                <ActionButton
                  href="/fa/knowledge/insights"
                  variant="secondary"
                  size="md"
                  icon={ArrowLeft}
                  className="
                    w-full

                    border-white/25
                    bg-white/[0.055]

                    text-white

                    shadow-none

                    hover:border-white/50
                    hover:bg-white/[0.10]
                    hover:text-white

                    sm:w-auto
                    sm:min-w-[220px]
                  "
                >
                  مشاهده همه بینش‌ها
                </ActionButton>
              </div>
            </div>
          </Reveal>
        </div>

        {/* =======================================================
            Editorial composition
        ======================================================== */}

        <div
          className="
            mt-12

            grid
            gap-5

            sm:mt-14

            lg:mt-16
            lg:grid-cols-[1.22fr_0.78fr]
            lg:gap-6
          "
        >
          {/* =====================================================
              FEATURED THOUGHT
          ====================================================== */}

          <article
            className={`
              group/featured

              relative
              overflow-hidden

              border
              border-white/14

              bg-white/[0.045]

              transition-[opacity,transform,border-color,background-color,box-shadow]
              duration-700
              ease-[cubic-bezier(.22,1,.36,1)]

              hover:-translate-y-[3px]
              hover:border-white/25
              hover:bg-white/[0.065]
              hover:shadow-[0_28px_80px_rgba(0,0,0,.13)]

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

            <span
              aria-hidden="true"
              className="
                absolute
                inset-x-0
                top-0

                h-[2px]

                origin-right
                scale-x-[0.16]

                bg-brand-accent

                transition-transform
                duration-700
                ease-[cubic-bezier(.22,1,.36,1)]

                group-hover/featured:scale-x-100
              "
            />

            <div
              className="
                px-5
                py-7

                sm:px-7
                sm:py-8

                lg:px-9
                lg:py-10
              "
            >
              {/* utility */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-5
                "
              >
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
                      border-white/14

                      text-brand-accent

                      transition-[background-color,border-color,color,transform]
                      duration-300

                      group-hover/featured:-translate-y-0.5
                      group-hover/featured:border-brand-accent
                      group-hover/featured:bg-brand-accent
                      group-hover/featured:text-white
                    "
                  >
                    <Layers3 className="h-4 w-4" strokeWidth={1.5} />
                  </span>

                  <div>
                    <p
                      dir="ltr"
                      className="
                        text-right
                        text-[7px]
                        font-black
                        tracking-[0.19em]

                        text-brand-accent
                      "
                    >
                      INSIGHT LENS
                    </p>

                    <p
                      className="
                        mt-1
                        text-[9px]
                        font-medium

                        text-white/40
                      "
                    >
                      زاویه دید DNH
                    </p>
                  </div>
                </div>

                <ArrowUpLeft
                  aria-hidden="true"
                  className="
                    h-4
                    w-4

                    text-white/25

                    transition-[color,transform]
                    duration-300

                    group-hover/featured:-translate-x-1
                    group-hover/featured:-translate-y-1
                    group-hover/featured:text-brand-accent
                  "
                  strokeWidth={1.5}
                />
              </div>

              {/* main thought */}

              <div
                className="
                  mt-12
                  max-w-[760px]

                  sm:mt-14
                "
              >
                <p
                  className="
                    text-[12px]
                    font-bold

                    text-white/43
                  "
                >
                  پرسش محوری
                </p>

                <h3
                  className="
                    mt-4

                    text-[24px]
                    font-black
                    leading-[1.8]
                    tracking-[-0.035em]

                    text-white

                    sm:text-[29px]

                    lg:text-[34px]
                  "
                >
                  مسئله فقط داشتن اطلاعات بیشتر نیست؛
                  <br />
                  <span className="text-[#7cc3dc]">
                    مهم است اطلاعات چگونه در زمینه تصمیم معنا پیدا می‌کنند.
                  </span>
                </h3>

                <p
                  className="
                    mt-6
                    max-w-[680px]

                    text-[11px]
                    font-medium
                    leading-[2.1]

                    text-white/52

                    sm:text-[12px]
                  "
                >
                  یک داده ممکن است به‌تنهایی مهم به نظر برسد، اما معنای آن زمانی
                  روشن‌تر می‌شود که ریسک، سناریو، ساختار مالی و افق زمانی نیز
                  کنار آن دیده شوند.
                </p>
              </div>

              {/* =================================================
                  Analysis lens
              ================================================== */}

              <div
                className="
                  mt-10

                  border-y
                  border-white/12

                  py-5
                "
              >
                <p
                  dir="ltr"
                  className="
                    mb-4

                    text-[7px]
                    font-black
                    tracking-[0.18em]

                    text-white/35
                  "
                >
                  FROM INFORMATION TO INSIGHT
                </p>

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-px

                    overflow-hidden

                    bg-white/10

                    sm:grid-cols-4
                  "
                >
                  {CONTENT_FLOW.map((item, index) => (
                    <div
                      key={item.en}
                      className="
                          group/flow

                          relative

                          bg-[#06394a]

                          px-4
                          py-4

                          transition-colors
                          duration-300

                          hover:bg-[#07485d]
                        "
                    >
                      <span
                        aria-hidden="true"
                        className={`
                            absolute
                            right-0
                            top-0

                            h-[2px]

                            transition-[width]
                            duration-500

                            ${
                              index === 0
                                ? "w-full bg-brand-accent"
                                : "w-5 bg-white/18 group-hover/flow:w-full"
                            }
                          `}
                      />

                      <p
                        className="
                            text-[11px]
                            font-black

                            text-white
                          "
                      >
                        {item.fa}
                      </p>

                      <p
                        dir="ltr"
                        className="
                            mt-1

                            text-right
                            text-[6px]
                            font-bold
                            tracking-[0.15em]

                            text-white/32
                          "
                      >
                        {item.en}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* footer */}

              <div
                className="
                  mt-6

                  flex
                  items-center
                  justify-between
                  gap-5
                "
              >
                <p
                  className="
                    max-w-[560px]

                    text-[9px]
                    font-medium
                    leading-[1.9]

                    text-white/38
                  "
                >
                  Insights برای کمک به فهم مسئله طراحی می‌شود؛ نه ارائه نسخه
                  عمومی برای هر تصمیم.
                </p>

                <span
                  aria-hidden="true"
                  className="
                    h-px
                    w-16
                    shrink-0

                    bg-brand-accent/55

                    transition-[width]
                    duration-500

                    group-hover/featured:w-24
                  "
                />
              </div>
            </div>
          </article>

          {/* =====================================================
              THREE LENSES
          ====================================================== */}

          <div
            className="
              border-x
              border-t
              border-white/12
            "
          >
            {INSIGHT_LENSES.map((item, index) => (
              <InsightLens
                key={item.en}
                item={item}
                index={index}
                visible={visible}
              />
            ))}
          </div>
        </div>

        {/* =======================================================
            Topic rail
        ======================================================== */}

        <Reveal visible={visible} delay={560}>
          <div
            className="
              mt-5

              border
              border-white/12

              bg-white/[0.025]
            "
          >
            <div
              className="
                flex
                flex-col
                gap-5

                px-5
                py-5

                sm:px-7

                lg:flex-row
                lg:items-center
                lg:justify-between
              "
            >
              <div className="shrink-0">
                <p
                  dir="ltr"
                  className="
                    text-[7px]
                    font-black
                    tracking-[0.2em]

                    text-brand-accent
                  "
                >
                  INSIGHT TERRITORIES
                </p>

                <p
                  className="
                    mt-1

                    text-[10px]
                    font-bold

                    text-white/65
                  "
                >
                  حوزه‌های تحلیلی DNH
                </p>
              </div>

              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-x-0
                  gap-y-3

                  lg:justify-end
                "
              >
                {TOPICS.map((topic, index) => (
                  <div
                    key={topic}
                    className="
                        group/topic

                        flex
                        items-center
                      "
                  >
                    <span
                      className="
                          px-3

                          text-[9px]
                          font-medium

                          text-white/42

                          transition-colors
                          duration-300

                          group-hover/topic:text-white

                          sm:text-[10px]
                        "
                    >
                      {topic}
                    </span>

                    {index < TOPICS.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="
                            h-[4px]
                            w-[4px]

                            bg-white/15

                            transition-colors
                            duration-300

                            group-hover/topic:bg-brand-accent
                          "
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* =======================================================
            bottom action
        ======================================================== */}

        <Reveal visible={visible} delay={620}>
          <div
            className="
              mt-8

              flex
              flex-col
              gap-5

              border-t
              border-white/12

              pt-6

              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <p
              className="
                max-w-[680px]

                text-[10px]
                font-medium
                leading-[2]

                text-white/42

                sm:text-[11px]
              "
            >
              محتوای نهایی این بخش بعد از دریافت و تأیید یادداشت‌ها و تحلیل‌های
              قابل انتشار DNH از طریق CMS جایگزین خواهد شد.
            </p>

            <Link
              href="/fa/knowledge/insights"
              className="
                group/link

                inline-flex
                shrink-0
                items-center
                gap-3

                text-[10px]
                font-black

                text-white

                outline-none

                transition-colors
                duration-300

                hover:text-brand-accent

                focus-visible:ring-2
                focus-visible:ring-focus/50
              "
            >
              ورود به مرکز بینش‌ها
              <ArrowLeft
                className="
                  h-4
                  w-4

                  transition-transform
                  duration-300

                  group-hover/link:-translate-x-1
                "
                strokeWidth={1.6}
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =============================================================================
   Lens
============================================================================= */

function InsightLens({
  item,
  index,
  visible,
}: {
  item: (typeof INSIGHT_LENSES)[number];
  index: number;
  visible: boolean;
}) {
  const Icon = item.icon;

  return (
    <article
      className={`
        group/lens

        relative
        overflow-hidden

        border-b
        border-white/12

        bg-white/[0.025]

        px-5
        py-6

        transition-[opacity,transform,background-color]
        duration-700
        ease-[cubic-bezier(.22,1,.36,1)]

        hover:bg-white/[0.065]

        sm:px-6
        sm:py-7

        ${visible ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"}

        motion-reduce:translate-x-0
        motion-reduce:opacity-100
        motion-reduce:transition-none
      `}
      style={
        {
          transitionDelay: `${250 + index * 80}ms`,
        } as CSSProperties
      }
    >
      {/* accent */}

      <span
        aria-hidden="true"
        className="
          absolute
          inset-y-0
          right-0

          w-[2px]

          origin-bottom
          scale-y-0

          bg-brand-accent

          transition-transform
          duration-500

          group-hover/lens:scale-y-100
        "
      />

      <div
        className="
          flex
          items-start
          justify-between
          gap-5
        "
      >
        <span
          className="
            flex
            h-10
            w-10
            shrink-0

            items-center
            justify-center

            border
            border-white/14

            text-[#79c5df]

            transition-[background-color,border-color,color,transform]
            duration-300

            group-hover/lens:-translate-y-0.5
            group-hover/lens:border-brand-primary
            group-hover/lens:bg-brand-primary
            group-hover/lens:text-white
          "
        >
          <Icon className="h-4 w-4" strokeWidth={1.5} />
        </span>

        <ArrowUpLeft
          aria-hidden="true"
          className="
            h-4
            w-4

            text-white/20

            transition-[color,transform]
            duration-300

            group-hover/lens:-translate-x-1
            group-hover/lens:-translate-y-1
            group-hover/lens:text-brand-accent
          "
          strokeWidth={1.5}
        />
      </div>

      <p
        dir="ltr"
        className="
          mt-7

          text-right
          text-[7px]
          font-black
          tracking-[0.17em]

          text-brand-accent/85
        "
      >
        {item.en}
      </p>

      <h3
        className="
          mt-2

          text-[14px]
          font-black
          leading-[1.9]

          text-white

          sm:text-[15px]
        "
      >
        {item.title}
      </h3>

      <p
        className="
          mt-3

          text-[10px]
          font-medium
          leading-[2]

          text-white/46

          sm:text-[11px]
        "
      >
        {item.description}
      </p>

      <div
        aria-hidden="true"
        className="
          mt-6

          flex
          items-center
          gap-2
        "
      >
        <span
          className="
            h-px
            w-7

            bg-white/14

            transition-[width,background-color]
            duration-400

            group-hover/lens:w-14
            group-hover/lens:bg-brand-accent/70
          "
        />

        <span
          className="
            h-[4px]
            w-[4px]

            bg-white/20

            transition-colors
            duration-300

            group-hover/lens:bg-brand-accent
          "
        />
      </div>
    </article>
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
            "radial-gradient(circle at 18% 28%,rgba(22,115,148,.20),transparent 28%),linear-gradient(115deg,#022b39 0%,#033647 48%,#022f3e 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.11]
        "
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,.10) 1px,transparent 1px)",
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
