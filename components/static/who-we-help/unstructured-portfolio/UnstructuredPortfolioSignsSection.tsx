/* =============================================================================
   UNSTRUCTURED PORTFOLIO — WARNING SIGNS

   Light / quick scan / highly readable

   Goal:
   Let the user recognize their situation in seconds.

   No card grid
   No diagram
   No fake metrics
============================================================================= */

const PORTFOLIO_SIGNS = [
  {
    title: "دارایی‌ها پراکنده‌اند",
    description:
      "دارایی‌های مختلف وجود دارند، اما نقش هرکدام در تصویر کلی پرتفوی روشن نیست.",
  },
  {
    title: "تمرکز ریسک دیده نمی‌شود",
    description:
      "تنوع ظاهری دارایی‌ها ممکن است باعث شود وابستگی واقعی به بعضی ریسک‌ها کمتر دیده شود.",
  },
  {
    title: "نقدشوندگی با نیاز شما هماهنگ نیست",
    description:
      "ارزش دارایی‌ها ممکن است بالا باشد، اما دسترسی به منابع در زمان موردنیاز محدود باشد.",
  },
  {
    title: "تصمیم‌ها با خبر و شرایط لحظه‌ای تغییر می‌کنند",
    description:
      "تصمیم‌گیری بیشتر واکنشی است تا اینکه بر یک منطق مشخص برای کل پرتفوی تکیه کند.",
  },
] as const;

export function UnstructuredPortfolioSignsSection() {
  return (
    <section
      id="unstructured-portfolio-signs"
      dir="rtl"
      aria-labelledby="unstructured-portfolio-signs-title"
      className="
        relative
        isolate

        scroll-mt-24
        overflow-hidden

        bg-white

        py-16

        sm:scroll-mt-28
        sm:py-20

        lg:py-20
      "
    >
      <SectionBackground />

      <div
        className="
          dnh-site-shell
          relative
          z-10

          mx-auto
          w-full
          max-w-[1536px]

          px-5
          sm:px-8
          lg:px-12
          xl:px-16
          2xl:px-20
        "
      >
        {/* ===========================================================
            HEADER
        ============================================================ */}

        <div
          className="
            grid
            gap-6

            lg:grid-cols-[0.9fr_1.1fr]
            lg:items-end
            lg:gap-14
          "
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-9 bg-brand-accent" />

              <p
                className="
                  text-[13px]
                  font-black

                  text-brand-primary/70
                "
              >
                نشانه‌های قابل توجه
              </p>
            </div>

            <h2
              id="unstructured-portfolio-signs-title"
              className="
                max-w-[760px]
                [text-wrap:balance]

                text-[29px]
                font-black
                leading-[1.72]
                tracking-[-0.04em]

                text-[#10242c]

                sm:text-[35px]

                lg:text-[41px]
                lg:leading-[1.58]
              "
            >
              تنوع دارایی کافی نیست؛{" "}
              <span className="text-brand-primary">
                ساختار باید قابل دیدن باشد.
              </span>
            </h2>
          </div>

          <p
            className="
              max-w-[590px]

              text-[15px]
              font-medium
              leading-[2]

              text-[#5e7279]

              sm:text-[16px]
            "
          >
            بعضی پرتفوی‌ها در ظاهر متنوع‌اند، اما وقتی دقیق‌تر نگاه می‌کنید،
            نشانه‌هایی دیده می‌شود که می‌گویند تصویر کلی هنوز نیاز به بازبینی
            دارد.
          </p>
        </div>

        {/* ===========================================================
            QUICK SCAN
        ============================================================ */}

        <div
          className="
            relative

            mt-10

            border-y
            border-brand-primary/14

            bg-[#f8fbfc]

            shadow-[0_18px_55px_rgba(4,61,78,.04)]

            lg:mt-12
          "
        >
          {/* heading strip */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-5

              border-b
              border-brand-primary/10

              px-5
              py-4

              sm:px-6
              lg:px-7
            "
          >
            <p
              className="
                text-[14px]
                font-black

                text-[#31545e]
              "
            >
              آیا این نشانه‌ها در پرتفوی شما دیده می‌شوند؟
            </p>

            <span
              aria-hidden="true"
              className="
                h-[8px]
                w-[8px]

                shrink-0

                bg-brand-accent
              "
            />
          </div>

          {/* signs */}

          <div>
            {PORTFOLIO_SIGNS.map((item, index) => (
              <PortfolioSignRow
                key={item.title}
                index={index + 1}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>

          {/* closing */}

          <div
            className="
              flex
              items-start
              gap-4

              border-t
              border-brand-primary/10

              bg-white

              px-5
              py-4

              sm:px-6
              lg:px-7
            "
          >
            <span
              aria-hidden="true"
              className="
                mt-[9px]

                h-[7px]
                w-[7px]

                shrink-0

                bg-brand-accent
              "
            />

            <p
              className="
                max-w-[900px]

                text-[14px]
                font-bold
                leading-7

                text-[#526c74]

                sm:text-[15px]
              "
            >
              مسئله فقط تعداد دارایی‌ها نیست؛{" "}
              <span className="text-brand-primary">
                باید مشخص باشد دارایی‌ها در کنار هم چه ساختاری ساخته‌اند.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   SIGN ROW
============================================================================= */

function PortfolioSignRow({
  index,
  title,
  description,
}: {
  index: number;
  title: string;
  description: string;
}) {
  return (
    <article
      className="
        group/sign
        relative

        grid
        gap-3

        border-b
        border-brand-primary/[0.09]

        px-5
        py-5

        last:border-b-0

        transition-colors
        duration-300

        hover:bg-white

        sm:px-6

        lg:grid-cols-[70px_290px_1fr]
        lg:items-center
        lg:gap-7
        lg:px-7
      "
    >
      {/* index */}

      <span
        className="
          text-[13px]
          font-black

          text-brand-primary/45
        "
      >
        {String(index).padStart(2, "0")}
      </span>

      {/* title */}

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
            h-[7px]
            w-[7px]

            shrink-0

            bg-brand-primary/28

            transition-colors
            duration-300

            group-hover/sign:bg-brand-accent
          "
        />

        <h3
          className="
            text-[14px]
            font-black
            leading-7

            text-[#173b45]
          "
        >
          {title}
        </h3>
      </div>

      {/* explanation */}

      <p
        className="
          pr-[19px]

          text-[14px]
          font-medium
          leading-7

          text-[#667a81]

          lg:border-r
          lg:border-brand-primary/[0.08]
          lg:pr-6
        "
      >
        {description}
      </p>

      {/* hover rail */}

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
          duration-300

          group-hover/sign:scale-y-100
        "
      />
    </article>
  );
}

/* =============================================================================
   BACKGROUND
============================================================================= */

function SectionBackground() {
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
            "radial-gradient(circle at 82% 24%,rgba(22,115,148,.045),transparent 24%),linear-gradient(180deg,#ffffff 0%,#fafcfd 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-y-0
          left-[10%]

          hidden
          w-px

          bg-brand-primary/[0.025]

          lg:block
        "
      />
    </>
  );
}
