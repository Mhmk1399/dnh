/* =============================================================================
   EXECUTIVE BRIEFINGS — FIT SECTION

   Meaning:
   Important issue
   + Senior decision level
   + Need for focused review
   = Executive Briefing fit

   Light / editorial / compact
   Server Component
============================================================================= */

const FIT_CRITERIA = [
  {
    label: "موضوع",
    title: "یک موضوع مشخص",
    description:
      "مسئله‌ای که نیاز دارد جدا از حاشیه‌ها و اطلاعات پراکنده، به‌صورت متمرکز بررسی شود.",
  },
  {
    label: "سطح تصمیم",
    title: "تصمیم‌گیرنده ارشد",
    description:
      "مدیر ارشد، هیئت‌مدیره، صاحب سرمایه یا فردی که مستقیماً در تصمیم نقش دارد.",
  },
  {
    label: "نیاز",
    title: "جمع‌بندی متمرکز",
    description:
      "نیاز به دیدن نکات کلیدی، سناریوها و مسیرهای قابل بررسی در یک تصویر فشرده و حرفه‌ای.",
  },
] as const;

export function ExecutiveBriefingsFitSection() {
  return (
    <section
      id="executive-briefings-fit"
      dir="rtl"
      aria-labelledby="executive-briefings-fit-title"
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
      <FitBackground />

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
        <div
          className="
            grid
            gap-10

            lg:grid-cols-[0.88fr_1.12fr]
            lg:items-center
            lg:gap-16

            xl:gap-20
          "
        >
          {/* ===========================================================
              COPY
          ============================================================ */}

          <div>
            <div
              className="
                mb-4
                flex
                items-center
                gap-3
              "
            >
              <span aria-hidden="true" className="h-px w-9 bg-brand-accent" />

              <p
                className="
                  text-[13px]
                  font-black
                  text-brand-primary/75
                "
              >
                چه زمانی این خدمت مناسب است؟
              </p>
            </div>

            <h2
              id="executive-briefings-fit-title"
              className="
                max-w-[700px]
                [text-wrap:balance]

                text-[28px]
                font-black
                leading-[1.72]
                tracking-[-0.04em]

                text-[#10242c]

                sm:text-[34px]

                lg:text-[40px]
                lg:leading-[1.6]
              "
            >
              وقتی یک موضوع مهم باید در سطح تصمیم‌گیرنده ارشد دیده شود،{" "}
              <span className="text-brand-primary">
                تمرکز از حجم اطلاعات مهم‌تر می‌شود.
              </span>
            </h2>

            <p
              className="
                mt-5
                max-w-[630px]

                text-[15px]
                font-medium
                leading-[2.05]

                text-[#60737a]

                sm:text-[16px]
              "
            >
              Executive Briefing برای زمانی طراحی شده که مسئله مشخص است،
              تصمیم‌گیرندگان مشخص‌اند و نیاز به یک بررسی متمرکز و قابل استفاده
              برای تصمیم وجود دارد.
            </p>

            <div
              className="
                mt-7

                border-r-2
                border-brand-accent

                pr-4
              "
            >
              <p
                className="
                  max-w-[590px]

                  text-[14px]
                  font-bold
                  leading-7

                  text-[#365963]

                  sm:text-[15px]
                "
              >
                هدف، اضافه کردن یک جلسه دیگر نیست؛{" "}
                <span className="text-brand-primary">
                  هدف، متمرکز کردن نگاه روی همان مسئله‌ای است که باید روشن شود.
                </span>
              </p>
            </div>
          </div>

          {/* ===========================================================
              FIT FIELD
          ============================================================ */}

          <div
            role="img"
            aria-label="زمانی که یک موضوع مهم، در سطح تصمیم‌گیرنده ارشد و با نیاز به بررسی متمرکز مطرح است، Executive Briefing می‌تواند مسیر مناسب باشد."
            className="
              relative

              border-y
              border-brand-primary/14

              bg-[#f8fbfc]

              shadow-[0_18px_50px_rgba(5,62,79,.035)]
            "
          >
            {/* ---------------------------------------------------------
                DESKTOP
            ---------------------------------------------------------- */}

            <div className="hidden lg:block">
              {FIT_CRITERIA.map((item, index) => (
                <FitRow
                  key={item.label}
                  label={item.label}
                  title={item.title}
                  description={item.description}
                  accent={index === 1}
                />
              ))}

              {/* RESULT */}

              <div
                className="
                  relative

                  flex
                  items-center
                  justify-between
                  gap-8

                  border-t
                  border-brand-primary/12

                  bg-brand-primary/[0.035]

                  px-7
                  py-5
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
                    aria-hidden="true"
                    className="
                      h-[11px]
                      w-[11px]

                      shrink-0

                      bg-brand-accent
                    "
                  />

                  <p
                    className="
                      text-[14px]
                      font-black

                      text-[#31545e]
                    "
                  >
                    وقتی این سه شرط کنار هم قرار می‌گیرند
                  </p>
                </div>

                <div
                  className="
                    border-r-2
                    border-brand-accent

                    pr-4
                  "
                >
                  <p
                    className="
                      text-[17px]
                      font-black

                      text-brand-primary
                    "
                  >
                    بریفینگ اجرایی معنا پیدا می‌کند.
                  </p>
                </div>
              </div>
            </div>

            {/* ---------------------------------------------------------
                MOBILE / TABLET
            ---------------------------------------------------------- */}

            <div
              className="
                divide-y
                divide-brand-primary/10

                lg:hidden
              "
            >
              {FIT_CRITERIA.map((item, index) => (
                <MobileFitItem
                  key={item.label}
                  label={item.label}
                  title={item.title}
                  description={item.description}
                  accent={index === 1}
                />
              ))}

              <div
                className="
                  bg-brand-primary/[0.035]

                  px-5
                  py-5

                  sm:px-6
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
                    aria-hidden="true"
                    className="
                      h-[11px]
                      w-[11px]

                      shrink-0

                      bg-brand-accent
                    "
                  />

                  <p
                    className="
                      text-[15px]
                      font-black
                      leading-7

                      text-brand-primary
                    "
                  >
                    کنار هم قرار گرفتن این سه شرط، زمان مناسب برای یک بریفینگ
                    اجرایی را نشان می‌دهد.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   DESKTOP FIT ROW
============================================================================= */

function FitRow({
  label,
  title,
  description,
  accent = false,
}: {
  label: string;
  title: string;
  description: string;
  accent?: boolean;
}) {
  return (
    <div
      className="
        group/fit
        relative

        grid
        min-h-[96px]

        grid-cols-[110px_190px_1fr]
        items-center

        border-b
        border-brand-primary/10

        px-7

        last:border-b-0

        transition-colors
        duration-300

        hover:bg-white
      "
    >
      {/* TYPE */}

      <p
        className="
          text-[14px]
          font-black

          text-brand-primary/55
        "
      >
        {label}
      </p>

      {/* TITLE */}

      <div
        className="
          flex
          items-center
          gap-3

          border-x
          border-brand-primary/[0.08]

          px-5
          py-4
        "
      >
        <span
          aria-hidden="true"
          className={`
            h-[11px]
            w-[11px]

            shrink-0

            ${accent ? "bg-brand-accent" : "bg-brand-primary/28"}
          `}
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

      {/* DESCRIPTION */}

      <p
        className="
          pr-5

          text-[14px]
          font-medium
          leading-7

          text-[#687b81]
        "
      >
        {description}
      </p>

      {/* HOVER MARKER */}

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

          group-hover/fit:scale-y-100
        "
      />
    </div>
  );
}

/* =============================================================================
   MOBILE FIT ITEM
============================================================================= */

function MobileFitItem({
  label,
  title,
  description,
  accent = false,
}: {
  label: string;
  title: string;
  description: string;
  accent?: boolean;
}) {
  return (
    <article
      className="
        px-5
        py-5

        sm:px-6
      "
    >
      <p
        className="
          text-[14px]
          font-black

          text-brand-primary/55
        "
      >
        {label}
      </p>

      <div
        className="
          mt-2

          flex
          items-center
          gap-3
        "
      >
        <span
          aria-hidden="true"
          className={`
            h-[11px]
            w-[11px]

            shrink-0

            ${accent ? "bg-brand-accent" : "bg-brand-primary/28"}
          `}
        />

        <h3
          className="
            text-[16px]
            font-black
            leading-7

            text-[#173b45]
          "
        >
          {title}
        </h3>
      </div>

      <p
        className="
          mt-2

          pr-[19px]

          text-[14px]
          font-medium
          leading-7

          text-[#687b81]
        "
      >
        {description}
      </p>
    </article>
  );
}

/* =============================================================================
   BACKGROUND
============================================================================= */

function FitBackground() {
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
          left-[12%]

          hidden
          w-px

          bg-brand-primary/[0.025]

          lg:block
        "
      />
    </>
  );
}
