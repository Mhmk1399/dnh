import Link from "next/link";

import {
  ArrowDownLeft,
  ArrowUpLeft,
  Droplets,
  Layers3,
  ShieldCheck,
  Target,
  type LucideIcon,
} from "lucide-react";

/* =============================================================================
   Problem dimensions
============================================================================= */

const FRAGMENTS = [
  {
    title: "دارایی‌ها",
    text: "چه چیزهایی در اختیار دارید؟",
    icon: Layers3,
  },
  {
    title: "اهداف",
    text: "این ثروت قرار است چه نقشی داشته باشد؟",
    icon: Target,
  },
  {
    title: "نقدشوندگی",
    text: "چه میزان انعطاف و دسترسی لازم است؟",
    icon: Droplets,
  },
  {
    title: "ریسک",
    text: "کدام بخش‌ها آسیب‌پذیرترند؟",
    icon: ShieldCheck,
  },
] as const;

/* =============================================================================
   SECTION — Server Component
============================================================================= */

export function WealthStrategyProblemSection() {
  return (
    <section
      id="wealth-strategy-problem"
      dir="rtl"
      aria-labelledby="wealth-strategy-problem-title"
      className="
        relative
        isolate

        scroll-mt-24
        overflow-hidden

        border-b
        border-line

        bg-[#f7fafb]

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
            HEADER
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
            <div className="mb-5 flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-10 bg-brand-accent" />

              <span
                className="
                  text-[10px]
                  font-black

                  text-brand-primary

                  sm:text-[11px]
                "
              >
                مسئله اصلی
              </span>
            </div>

            <h2
              id="wealth-strategy-problem-title"
              className="
                max-w-[800px]

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
              داشتن دارایی،
              <br />
              همیشه به معنای داشتن{" "}
              <span className="text-brand-primary">ساختار ثروت نیست.</span>
            </h2>
          </div>

          <div className="lg:pb-1">
            <p
              className="
                max-w-[650px]

                text-[13px]
                font-medium
                leading-[2.2]

                text-ink-muted

                sm:text-[14px]
                lg:text-[15px]
              "
            >
              چالش زمانی شکل می‌گیرد که دارایی‌ها، اهداف، نقدشوندگی و ریسک
              هرکدام جدا دیده شوند و ارتباط میان آن‌ها برای تصمیم‌های مهم روشن
              نباشد.
            </p>
          </div>
        </div>

        {/* =======================================================
            MAIN VISUAL
        ======================================================== */}

        <div
          className="
            mt-12

            grid
            overflow-hidden

            border
            border-line

            bg-white

            shadow-[0_20px_70px_rgba(19,74,94,.055)]

            sm:mt-14

            lg:mt-16
            lg:grid-cols-[1.12fr_0.88fr]
          "
        >
          {/* =====================================================
              FRAGMENTS
          ====================================================== */}

          <div
            className="
              border-b
              border-line

              lg:border-b-0
              lg:border-l
            "
          >
            <div
              className="
                border-b
                border-line

                px-5
                py-5

                sm:px-7
              "
            >
              <p
                className="
                  text-[10px]
                  font-black

                  text-ink
                "
              >
                وقتی اجزا جدا از هم دیده می‌شوند
              </p>

              <p
                className="
                  mt-1.5

                  text-[10px]
                  font-medium

                  text-ink-muted
                "
              >
                هر سؤال پاسخ خودش را دارد؛ اما تصویر کل هنوز روشن نیست.
              </p>
            </div>

            <div className="divide-y divide-line">
              {FRAGMENTS.map((item) => (
                <FragmentRow key={item.title} item={item} />
              ))}
            </div>
          </div>

          {/* =====================================================
              STRUCTURE
          ====================================================== */}

          <div
            className="
              relative

              flex
              min-h-[420px]
              flex-col
              justify-between

              bg-[#032f3f]

              px-5
              py-7

              text-white

              sm:px-7
              sm:py-8

              lg:min-h-full
              lg:px-8
              lg:py-9
            "
          >
            <StructureBackground />

            <div className="relative z-10">
              <p
                className="
                  text-[9px]
                  font-black

                  text-brand-accent
                "
              >
                زمانی که ارتباط میان اجزا دیده می‌شود
              </p>

              <h3
                className="
                  mt-4
                  max-w-[470px]

                  text-[22px]
                  font-black
                  leading-[1.8]

                  text-white

                  sm:text-[25px]
                "
              >
                سؤال دیگر فقط این نیست که «چه دارایی‌هایی داریم؟»
              </h3>

              <p
                className="
                  mt-5
                  max-w-[490px]

                  text-[11px]
                  font-medium
                  leading-[2.1]

                  text-white/46

                  sm:text-[12px]
                "
              >
                باید دید هر بخش چه نقشی در اهداف، نقدشوندگی، ریسک و تصمیم‌های
                بلندمدت دارد.
              </p>
            </div>

            {/* ---------------------------------------------------
                RELATIONSHIP MAP
            ---------------------------------------------------- */}

            <div
              className="
                relative
                z-10

                my-10

                border-y
                border-white/10

                py-6
              "
            >
              <div className="grid grid-cols-2 gap-3">
                <MiniNode label="دارایی" />
                <MiniNode label="اهداف" />
                <MiniNode label="نقدشوندگی" />
                <MiniNode label="ریسک" />
              </div>

              <div
                aria-hidden="true"
                className="
                  mx-auto
                  h-9
                  w-px

                  bg-gradient-to-b
                  from-[#82cee4]/35
                  to-brand-accent
                "
              />

              <div
                className="
                  border-r-[3px]
                  border-brand-accent

                  bg-brand-accent/[0.08]

                  px-4
                  py-4
                "
              >
                <p
                  className="
                    text-[9px]
                    font-black

                    text-brand-accent
                  "
                >
                  تصویر یکپارچه
                </p>

                <p
                  className="
                    mt-1.5

                    text-[14px]
                    font-black
                    leading-[1.8]

                    text-white
                  "
                >
                  ارتباط میان اجزای ثروت، نه صرفاً فهرست دارایی‌ها.
                </p>
              </div>
            </div>
 
          </div>
        </div>

        {/* =======================================================
            BOTTOM
        ======================================================== */}

        <div
          className="
            mt-8

            flex
            flex-col
            gap-5

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <Link
            href="/dnh/wealth-architecture"
            className="
              group/concept

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
            درباره مفهوم معماری ثروت بیشتر بدانید
            <ArrowUpLeft
              aria-hidden="true"
              className="
                h-4
                w-4

                transition-transform
                duration-300

                group-hover/concept:-translate-x-1
                group-hover/concept:-translate-y-1
              "
              strokeWidth={1.6}
            />
          </Link>

          <Link
            href="#wealth-strategy-review"
            className="
              group/next

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
            در این خدمت چه چیزهایی بررسی می‌شود؟
            <ArrowDownLeft
              aria-hidden="true"
              className="
                h-4
                w-4

                transition-transform
                duration-300

                group-hover/next:translate-y-1
                group-hover/next:-translate-x-1
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
   FRAGMENT ROW
============================================================================= */

function FragmentRow({
  item,
}: {
  item: {
    title: string;
    text: string;
    icon: LucideIcon;
  };
}) {
  const Icon = item.icon;

  return (
    <div
      className="
        group/row

        grid
        gap-4

        px-5
        py-5

        transition-colors
        duration-300

        hover:bg-surface-soft/50

        sm:grid-cols-[48px_120px_1fr]
        sm:items-center
        sm:px-7
        sm:py-6
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
          border-brand-primary/14

          bg-brand-primary/[0.035]

          text-brand-primary

          transition-[background-color,border-color,color]
          duration-300

          group-hover/row:border-brand-primary
          group-hover/row:bg-brand-primary
          group-hover/row:text-white
        "
      >
        <Icon
          aria-hidden="true"
          className="h-[18px] w-[18px]"
          strokeWidth={1.45}
        />
      </span>

      <h3
        className="
          text-[14px]
          font-black

          text-ink
        "
      >
        {item.title}
      </h3>

      <p
        className="
          text-[10px]
          font-medium
          leading-[1.95]

          text-ink-muted

          sm:text-[11px]
        "
      >
        {item.text}
      </p>
    </div>
  );
}

/* =============================================================================
   MINI NODE
============================================================================= */

function MiniNode({ label }: { label: string }) {
  return (
    <div
      className="
        flex
        min-h-[52px]

        items-center
        justify-between
        gap-4

        border
        border-white/10

        bg-white/[0.035]

        px-4
        py-3
      "
    >
      <span
        className="
          text-[10px]
          font-black

          text-white/62
        "
      >
        {label}
      </span>

      <span
        aria-hidden="true"
        className="
          h-[5px]
          w-[5px]

          bg-[#82cee4]/55
        "
      />
    </div>
  );
}

/* =============================================================================
   STRUCTURE BACKGROUND
============================================================================= */

function StructureBackground() {
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
            "radial-gradient(circle at 50% 52%,rgba(22,115,148,.20),transparent 38%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.055]
        "
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,.08) 1px,transparent 1px)",
          backgroundSize: "72px 100%",
        }}
      />
    </>
  );
}

/* =============================================================================
   SECTION BACKGROUND
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
            "linear-gradient(112deg,#f4f9fa 0%,#ffffff 54%,#f8fbfc 100%)",
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
