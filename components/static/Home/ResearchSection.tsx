"use client";

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
  BarChart3,
  FileText,
  Landmark,
  ShieldCheck,
} from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   Research preview

   این آیتم‌ها فعلاً Format Preview هستند،
   نه گزارش منتشرشده واقعی.

   بعداً باید از CMS جایگزین شوند.
============================================================================= */

const RESEARCH_FORMATS = [
  {
    key: "macro",
    en: "MACRO REPORT",
    title: "گزارش‌های کلان",
    description:
      "مرور ساختاری متغیرهای اقتصاد کلان و پیامدهای آن‌ها برای محیط تصمیم.",
    icon: Landmark,
    tone: "teal",
  },
  {
    key: "note",
    en: "RESEARCH NOTE",
    title: "یادداشت‌های پژوهشی",
    description:
      "تمرکز عمیق‌تر روی یک مسئله، رابطه یا متغیر مؤثر در ساختار ثروت و تصمیم.",
    icon: FileText,
    tone: "blue",
  },
  {
    key: "protection",
    en: "WEALTH PROTECTION BRIEF",
    title: "یادداشت‌های حفاظت از ثروت",
    description:
      "بررسی ریسک‌ها، آسیب‌پذیری‌ها و حوزه‌هایی که نیازمند توجه ساختاری هستند.",
    icon: ShieldCheck,
    tone: "orange",
  },
] as const;

/* =============================================================================
   Demo values

   داده‌ها فقط برای Preview بصری استفاده می‌شوند.
============================================================================= */

const DEMO_BARS = [42, 56, 49, 63, 58, 72, 68, 78] as const;

const RESEARCH_TAGS = [
  "Macro",
  "Risk",
  "Liquidity",
  "Wealth Architecture",
  "Asset Allocation",
] as const;

/* =============================================================================
   Section
============================================================================= */

export function ResearchSection() {
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
      id="research"
      dir="rtl"
      aria-labelledby="research-title"
      className="
        relative
        isolate
        overflow-hidden

        border-b
        border-line

        bg-page
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

            lg:grid-cols-[0.86fr_1.14fr]
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
                  پژوهش DNH
                </span>
              </div>

              <h2
                id="research-title"
                className="
                  max-w-[720px]

                  text-[32px]
                  font-black
                  leading-[1.6]
                  tracking-[-0.045em]

                  text-ink

                  sm:text-[39px]

                  lg:text-[46px]
                  lg:leading-[1.5]

                  xl:text-[51px]
                "
              >
                وقتی مسئله پیچیده‌تر است،
                <br />
                پاسخ به{" "}
                <span className="text-brand-primary">تحلیل عمیق‌تر</span> نیاز
                دارد.
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

                  text-ink-muted

                  sm:text-[14px]

                  lg:text-[15px]
                "
              >
                بخش Research جایی برای گزارش‌های کلان، Research Noteها، نمودارها
                و Briefهای تحلیلی است؛ محتواهایی که عمق بررسی DNH را نشان
                می‌دهند، بدون اینکه منطق اختصاصی یا مدل‌های داخلی آن افشا شوند.
              </p>

              <div className="mt-7">
                <ActionButton
                  href="/knowledge/research"
                  variant="primary"
                  size="md"
                  icon={ArrowLeft}
                  className="
                    w-full

                    sm:w-auto
                    sm:min-w-[220px]
                  "
                >
                  مشاهده پژوهش‌های DNH
                </ActionButton>
              </div>
            </div>
          </Reveal>
        </div>

        {/* =======================================================
            Research desk
        ======================================================== */}

        <div
          className="
            mt-12

            grid
            gap-5

            sm:mt-14

            lg:mt-16
            lg:grid-cols-[1.28fr_0.72fr]
            lg:gap-6
          "
        >
          {/* =====================================================
              Featured research document
          ====================================================== */}

          <article
            className={`
              group/document

              relative
              overflow-hidden

              border
              border-line

              bg-white

              shadow-[0_30px_90px_rgba(10,70,94,0.08)]

              transition-[opacity,transform,box-shadow,border-color]
              duration-700
              ease-[cubic-bezier(.22,1,.36,1)]

              hover:-translate-y-[3px]
              hover:border-brand-primary/30
              hover:shadow-[0_38px_110px_rgba(10,70,94,0.13)]

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
              transitionDelay: "160ms",
            }}
          >
            {/* accent */}

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
              <span className="w-[17%] bg-brand-accent" />
              <span className="flex-1 bg-brand-primary" />
            </div>

            {/* ===============================================
                document header
            ================================================ */}

            <div
              className="
                flex
                flex-col
                gap-5

                border-b
                border-line

                px-5
                pb-5
                pt-7

                sm:flex-row
                sm:items-start
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

                    text-brand-primary
                  "
                >
                  RESEARCH NOTE / PREVIEW
                </p>

                <h3
                  className="
                    mt-3

                    max-w-[580px]

                    text-[18px]
                    font-black
                    leading-[1.8]

                    text-ink

                    sm:text-[21px]
                  "
                >
                  نمونه ساختار یک Research Note در DNH
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
                  className="
                    border
                    border-brand-accent/25

                    bg-brand-accent/[0.06]

                    px-3
                    py-2

                    text-[11px]
                    font-black

                    text-brand-accent
                  "
                >
                  نمونه نمایشی
                </span>

                <FileText
                  className="
                    h-4
                    w-4

                    text-brand-primary/45
                  "
                  strokeWidth={1.5}
                />
              </div>
            </div>

            {/* ===============================================
                document body
            ================================================ */}

            <div
              className="
                grid

                lg:grid-cols-[0.64fr_1.36fr]
              "
            >
              {/* ---------------------------------------------
                  Summary
              ---------------------------------------------- */}

              <div
                className="
                  border-b
                  border-line

                  px-5
                  py-6

                  sm:px-7

                  lg:border-b-0
                  lg:border-l
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
                  RESEARCH QUESTION
                </p>

                <p
                  className="
                    mt-4

                    text-[15px]
                    font-black
                    leading-[2]

                    text-ink
                  "
                >
                  چه چیزی باید بررسی شود تا یک متغیر اقتصادی به یک پیامد تصمیمی
                  تبدیل شود؟
                </p>

                <p
                  className="
                    mt-5

                    text-[10px]
                    font-medium
                    leading-[2]

                    text-ink-muted
                  "
                >
                  Research در DNH از مشاهده داده شروع می‌شود، اما هدفش صرفاً
                  توصیف داده نیست؛ مسئله اصلی، فهم ارتباط آن با ساختار ثروت و
                  تصمیم است.
                </p>

                {/* tags */}

                <div
                  className="
                    mt-7

                    flex
                    flex-wrap
                    gap-2
                  "
                >
                  {RESEARCH_TAGS.map((tag) => (
                    <span
                      key={tag}
                      className="
                          border
                          border-line

                          bg-surface-soft/45

                          px-3
                          py-2

                          text-[11px]
                          font-bold

                          text-brand-primary/70

                          transition-[background-color,border-color,color]
                          duration-300

                          hover:border-brand-primary/30
                          hover:bg-brand-primary
                          hover:text-white
                        "
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* ---------------------------------------------
                  research visual
              ---------------------------------------------- */}

              <ResearchChart visible={visible} />
            </div>

            {/* ===============================================
                document sections
            ================================================ */}

            <div
              className="
                grid
                gap-px

                border-t
                border-line

                bg-line

                sm:grid-cols-3
              "
            >
              <DocumentSection
                eyebrow="CONTEXT"
                title="زمینه"
                text="متغیر در چه محیط و ساختاری معنا پیدا می‌کند؟"
              />

              <DocumentSection
                eyebrow="EVIDENCE"
                title="شواهد"
                text="کدام داده یا روند برای مسئله مورد بررسی اهمیت دارد؟"
              />

              <DocumentSection
                eyebrow="IMPLICATION"
                title="پیامد راهبردی"
                text="این شرایط چه چیزی را در مسیر تصمیم تغییر می‌دهد؟"
              />
            </div>

            {/* ===============================================
                bottom
            ================================================ */}

            <div
              className="
                group/footer

                flex
                flex-col
                gap-4

                border-t
                border-line

                bg-surface-soft/55

                px-5
                py-5

                sm:flex-row
                sm:items-center
                sm:justify-between
                sm:px-7

                lg:px-8
              "
            >
              <p
                className="
                  max-w-[660px]

                  text-[12px]
                  font-medium
                  leading-[1.9]

                  text-ink-muted
                "
              >
                نتیجه Research باید قابل فهم و قابل استفاده در تصمیم باشد؛ بدون
                انتشار فرمول، وزن‌دهی یا منطق داخلی قابل بازسازی.
              </p>

              <ArrowUpLeft
                aria-hidden="true"
                className="
                  hidden
                  h-4
                  w-4

                  text-brand-primary

                  transition-transform
                  duration-300

                  group-hover/footer:-translate-x-1
                  group-hover/footer:-translate-y-1

                  sm:block
                "
                strokeWidth={1.5}
              />
            </div>
          </article>

          {/* =====================================================
              Research formats
          ====================================================== */}

          <aside
            aria-label="انواع محتوای پژوهشی DNH"
            className="
              border-x
              border-t
              border-line
            "
          >
            {RESEARCH_FORMATS.map((item, index) => (
              <ResearchFormatCard
                key={item.key}
                item={item}
                index={index}
                visible={visible}
              />
            ))}
          </aside>
        </div>

        {/* =======================================================
            Library rail
        ======================================================== */}

        <Reveal visible={visible} delay={560}>
          <div
            className="
              mt-5

              grid
              gap-px

              border
              border-line

              bg-line

              sm:grid-cols-3
            "
          >
            <LibraryMetric
              en="RESEARCH NOTES"
              title="یادداشت پژوهشی"
              description="بررسی عمیق یک مسئله یا متغیر مشخص."
            />

            <LibraryMetric
              en="MACRO REPORTS"
              title="گزارش‌های کلان"
              description="تصویری ساختاری از محیط اقتصادی و ریسک‌ها."
            />

            <LibraryMetric
              en="PDF / CHARTS"
              title="گزارش و نمودار"
              description="محتوای قابل انتشار برای نمایش داده و تحلیل."
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =============================================================================
   Research chart
============================================================================= */

function ResearchChart({ visible }: { visible: boolean }) {
  return (
    <div
      className="
        group/chart

        relative
        overflow-hidden

        px-5
        py-6

        sm:px-7

        lg:px-8
      "
    >
      {/* grid */}

      <div
        aria-hidden="true"
        className="
          absolute
          inset-0

          opacity-[0.25]
        "
        style={{
          backgroundImage:
            "linear-gradient(to bottom,color-mix(in srgb,var(--dnh-primary) 7%,transparent) 1px,transparent 1px)",
          backgroundSize: "100% 25%",
        }}
      />

      {/* top */}

      <div
        className="
          relative
          z-10

          flex
          items-start
          justify-between
          gap-5
        "
      >
        <div>
          <p
            dir="ltr"
            className="
              text-[11px]
              font-black
              tracking-[0.18em]

              text-brand-primary/55
            "
          >
            RESEARCH VISUAL
          </p>

          <p
            className="
              mt-2

              text-[12px]
              font-black

              text-ink
            "
          >
            نمونه فرم ارائه داده و روند
          </p>
        </div>

        <BarChart3
          aria-hidden="true"
          className="
            h-4
            w-4

            text-brand-primary/45
          "
          strokeWidth={1.5}
        />
      </div>

      {/* chart */}

      <div
        className="
          relative
          z-10

          mt-8

          flex
          h-[220px]

          items-end
          gap-3

          border-b
          border-line

          pb-px
        "
      >
        {DEMO_BARS.map((value, index) => (
          <div
            key={index}
            className="
                group/bar

                flex
                h-full
                flex-1

                items-end
              "
          >
            <span
              className={`
                  relative
                  block
                  w-full

                  transition-[height,background-color,transform]
                  duration-700
                  ease-[cubic-bezier(.22,1,.36,1)]

                  group-hover/bar:-translate-y-1

                  ${
                    index === DEMO_BARS.length - 1
                      ? "bg-brand-accent"
                      : "bg-brand-primary/22 group-hover/bar:bg-brand-primary/45"
                  }
                `}
              style={
                {
                  height: visible ? `${value}%` : "5%",
                  transitionDelay: `${260 + index * 50}ms`,
                } as CSSProperties
              }
            >
              <span
                className="
                    absolute
                    inset-x-0
                    top-0

                    h-[2px]

                    bg-brand-primary/50
                  "
              />
            </span>
          </div>
        ))}
      </div>

      {/* axis */}

      <div
        className="
          relative
          z-10

          mt-4

          flex
          items-center
          justify-between
        "
      >
        <span
          className="
            text-[11px]
            font-bold

            text-ink-muted/45
          "
        >
          مشاهده
        </span>

        <span
          className="
            text-[11px]
            font-bold

            text-ink-muted/45
          "
        >
          مقایسه
        </span>

        <span
          className="
            text-[11px]
            font-bold

            text-ink-muted/45
          "
        >
          روند
        </span>

        <span
          className="
            text-[11px]
            font-bold

            text-brand-accent
          "
        >
          پیامد
        </span>
      </div>

      <p
        className="
          relative
          z-10

          mt-6

          border-r-2
          border-brand-accent

          pr-4

          text-[11px]
          font-medium
          leading-[1.9]

          text-ink-muted
        "
      >
        داده‌های این Preview صرفاً نمایشی‌اند و تحلیل واقعی بازار محسوب
        نمی‌شوند.
      </p>
    </div>
  );
}

/* =============================================================================
   Research format
============================================================================= */

function ResearchFormatCard({
  item,
  index,
  visible,
}: {
  item: (typeof RESEARCH_FORMATS)[number];
  index: number;
  visible: boolean;
}) {
  const Icon = item.icon;

  const theme = getResearchTheme(item.tone);

  return (
    <div
      className={`
        group/format

        relative
        min-h-[205px]
        overflow-hidden

        border-b
        border-line

        bg-white

        px-5
        py-6

        transition-[opacity,transform,background-color]
        duration-700
        ease-[cubic-bezier(.22,1,.36,1)]

        hover:bg-surface-soft/60

        sm:px-6

        ${visible ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"}

        motion-reduce:translate-x-0
        motion-reduce:opacity-100
        motion-reduce:transition-none
      `}
      style={{
        transitionDelay: `${250 + index * 80}ms`,
      }}
    >
      <span
        aria-hidden="true"
        className={`
          absolute
          inset-y-0
          right-0

          w-[3px]

          origin-bottom
          scale-y-[0.18]

          transition-transform
          duration-500

          group-hover/format:scale-y-100

          ${theme.bar}
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
            h-10
            w-10

            items-center
            justify-center

            border

            transition-[background-color,color,border-color,transform]
            duration-300

            group-hover/format:-translate-y-0.5

            ${theme.icon}
          `}
        >
          <Icon className="h-4 w-4" strokeWidth={1.5} />
        </span>

        <ArrowUpLeft
          aria-hidden="true"
          className="
            h-4
            w-4

            text-ink-muted/25

            transition-[color,transform]
            duration-300

            group-hover/format:-translate-x-1
            group-hover/format:-translate-y-1
            group-hover/format:text-brand-accent
          "
          strokeWidth={1.5}
        />
      </div>

      <p
        dir="ltr"
        className="
          mt-6

          text-right
          text-[11px]
          font-black
          tracking-[0.17em]

          text-brand-primary/50
        "
      >
        {item.en}
      </p>

      <h3
        className="
          mt-2

          text-[14px]
          font-black

          text-ink
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

          text-ink-muted
        "
      >
        {item.description}
      </p>

      <span
        aria-hidden="true"
        className="
          absolute
          bottom-5
          left-5

          h-px
          w-8

          bg-brand-primary/14

          transition-[width,background-color]
          duration-400

          group-hover/format:w-16
          group-hover/format:bg-brand-accent/65
        "
      />
    </div>
  );
}

/* =============================================================================
   Document sections
============================================================================= */

function DocumentSection({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <div
      className="
        group/section

        min-h-[155px]

        bg-white

        px-5
        py-5

        transition-colors
        duration-300

        hover:bg-surface-soft/60

        sm:px-6
      "
    >
      <p
        dir="ltr"
        className="
          text-[11px]
          font-black
          tracking-[0.17em]

          text-brand-primary/48
        "
      >
        {eyebrow}
      </p>

      <h4
        className="
          mt-3

          text-[12px]
          font-black

          text-ink
        "
      >
        {title}
      </h4>

      <p
        className="
          mt-3

          text-[11px]
          font-medium
          leading-[1.9]

          text-ink-muted
        "
      >
        {text}
      </p>

      <span
        aria-hidden="true"
        className="
          mt-5
          block

          h-[2px]
          w-6

          bg-brand-primary/16

          transition-[width,background-color]
          duration-300

          group-hover/section:w-12
          group-hover/section:bg-brand-accent
        "
      />
    </div>
  );
}

/* =============================================================================
   Library metric
============================================================================= */

function LibraryMetric({
  en,
  title,
  description,
}: {
  en: string;
  title: string;
  description: string;
}) {
  return (
    <div
      className="
        group/library

        bg-white

        px-5
        py-5

        transition-colors
        duration-300

        hover:bg-surface-soft/60

        sm:px-6

        lg:px-7
      "
    >
      <p
        dir="ltr"
        className="
          text-[11px]
          font-black
          tracking-[0.17em]

          text-brand-primary/48
        "
      >
        {en}
      </p>

      <div
        className="
          mt-3

          flex
          items-start
          justify-between
          gap-5
        "
      >
        <div>
          <h3
            className="
              text-[12px]
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
            {description}
          </p>
        </div>

        <ArrowUpLeft
          aria-hidden="true"
          className="
            mt-1
            h-4
            w-4
            shrink-0

            text-ink-muted/25

            transition-[color,transform]
            duration-300

            group-hover/library:-translate-x-1
            group-hover/library:-translate-y-1
            group-hover/library:text-brand-accent
          "
          strokeWidth={1.5}
        />
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
   Theme
============================================================================= */

function getResearchTheme(tone: "teal" | "blue" | "orange") {
  switch (tone) {
    case "orange":
      return {
        bar: "bg-brand-accent",

        icon: `
          border-brand-accent/25
          bg-brand-accent/[0.06]
          text-brand-accent

          group-hover/format:border-brand-accent
          group-hover/format:bg-brand-accent
          group-hover/format:text-white
        `,
      };

    case "blue":
      return {
        bar: "bg-[#439bbd]",

        icon: `
          border-[#439bbd]/25
          bg-[#439bbd]/[0.07]
          text-[#267fa0]

          group-hover/format:border-[#267fa0]
          group-hover/format:bg-[#267fa0]
          group-hover/format:text-white
        `,
      };

    default:
      return {
        bar: "bg-brand-primary",

        icon: `
          border-brand-primary/25
          bg-brand-primary/[0.06]
          text-brand-primary

          group-hover/format:border-brand-primary
          group-hover/format:bg-brand-primary
          group-hover/format:text-white
        `,
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
            "linear-gradient(115deg,color-mix(in srgb,var(--dnh-primary) 5%,white) 0%,white 44%,white 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.15]
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
          right-[20%]
          top-0

          h-[6px]
          w-[2px]

          bg-brand-accent
        "
      />
    </>
  );
}
