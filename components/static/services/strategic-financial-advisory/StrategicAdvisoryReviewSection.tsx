/* =============================================================================
   STRATEGIC FINANCIAL ADVISORY — REVIEW AREAS

   Server Component
   No client JS
   No card grid
============================================================================= */

const REVIEW_AREAS = [
  {
    title: "ساختار سرمایه",
    description:
      "بررسی جایگاه منابع مالی و نحوه قرار گرفتن آن‌ها در ساختار کلی تصمیم.",
  },
  {
    title: "نقدینگی",
    description: "دیدن وضعیت نقدینگی در کنار سایر اجزای مالی و الزامات تصمیم.",
  },
  {
    title: "تأمین مالی",
    description:
      "بررسی گزینه‌های قابل بررسی برای تأمین مالی و ارتباط آن‌ها با ساختار مالی.",
  },
  {
    title: "تخصیص سرمایه",
    description:
      "بررسی نحوه قرار گرفتن منابع در کنار اولویت‌ها، ریسک‌ها و اهداف کسب‌وکار.",
  },
] as const;

export function StrategicAdvisoryReviewSection() {
  return (
    <section
      id="strategic-advisory-review"
      dir="rtl"
      aria-labelledby="strategic-advisory-review-title"
      className="
        relative
        isolate
        scroll-mt-24
        overflow-hidden

        bg-[#f6fafb]

        py-24

        sm:scroll-mt-28
        sm:py-28

        lg:py-32
      "
    >
      <ReviewBackground />

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
        {/* ===============================================================
            HEADER
        ================================================================ */}

        <div
          className="
            grid
            items-end
            gap-8

            lg:grid-cols-[1.08fr_0.92fr]
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

                  text-brand-primary/75

                  sm:text-[11px]
                "
              >
                محورهای بررسی
              </p>
            </div>

            <h2
              id="strategic-advisory-review-title"
              className="
                max-w-[880px]
                [text-wrap:balance]

                text-[30px]
                font-black
                leading-[1.75]
                tracking-[-0.045em]

                text-[#10242c]

                sm:text-[36px]

                lg:text-[42px]
                lg:leading-[1.65]

                xl:text-[46px]
              "
            >
              بررسی مالی، چهار موضوع جدا نیست؛{" "}
              <span className="text-brand-primary">
                ساختار، نقدینگی، تأمین مالی و تخصیص سرمایه باید کنار هم دیده
                شوند.
              </span>
            </h2>
          </div>

          <div
            className="
              lg:pb-1
              lg:pr-8
            "
          >
            <p
              className="
                max-w-[570px]

                text-[13px]
                font-medium
                leading-[2.25]

                text-[#5c7179]

                sm:text-[14px]
                lg:text-[15px]
              "
            >
              مسئله زمانی روشن‌تر می‌شود که هر محور نه به‌صورت مستقل، بلکه در
              ارتباط با شرایط مالی، ریسک‌ها و اهداف کسب‌وکار بررسی شود.
            </p>
          </div>
        </div>

        {/* ===============================================================
            REVIEW FIELD
        ================================================================ */}

        <div
          className="
            relative
            mt-14

            lg:mt-18
          "
        >
          {/* ============================================================
              DESKTOP FIELD
          ============================================================= */}

          <div
            className="
              relative
              hidden

              min-h-[540px]

              border
              border-brand-primary/16

              bg-white

              shadow-[0_24px_70px_rgba(5,62,79,.055)]

              lg:grid
              lg:grid-cols-2
              lg:grid-rows-2
            "
          >
            {/* Main dividing lines */}

            <span
              aria-hidden="true"
              className="
                pointer-events-none

                absolute
                inset-y-0
                left-1/2

                w-px
                -translate-x-1/2

                bg-brand-primary/12
              "
            />

            <span
              aria-hidden="true"
              className="
                pointer-events-none

                absolute
                inset-x-0
                top-1/2

                h-px
                -translate-y-1/2

                bg-brand-primary/12
              "
            />

            {/* Corner architecture */}

            <span
              aria-hidden="true"
              className="
                absolute
                right-[-1px]
                top-[-1px]

                h-8
                w-px

                bg-brand-accent
              "
            />

            <span
              aria-hidden="true"
              className="
                absolute
                right-[-1px]
                top-[-1px]

                h-px
                w-8

                bg-brand-accent
              "
            />

            {/* Areas */}

            {REVIEW_AREAS.map((area, index) => (
              <ReviewArea
                key={area.title}
                title={area.title}
                description={area.description}
                accent={index === 0}
              />
            ))}

            {/* =========================================================
                CENTER JOINT
            ========================================================== */}

            <div
              className="
                pointer-events-none

                absolute
                left-1/2
                top-1/2

                z-20

                flex
                h-[116px]
                w-[190px]

                -translate-x-1/2
                -translate-y-1/2

                flex-col
                items-center
                justify-center

                border
                border-brand-primary/18

                bg-[#f6fafb]

                shadow-[0_15px_50px_rgba(3,55,70,.09)]
              "
            >
              <span
                aria-hidden="true"
                className="
                  absolute
                  right-[-4px]
                  top-1/2

                  h-[11px]
                  w-[11px]

                  -translate-y-1/2

                  bg-brand-accent
                "
              />

              <span
                aria-hidden="true"
                className="
                  absolute
                  left-[-4px]
                  top-1/2

                  h-[11px]
                  w-[11px]

                  -translate-y-1/2

                  bg-brand-primary
                "
              />

              <p
                className="
                  text-[12px]
                  font-black

                  text-[#173843]
                "
              >
                تصویر تصمیم
              </p>

              <div
                aria-hidden="true"
                className="
                  my-3
                  flex
                  items-center
                  gap-2
                "
              >
                <span className="h-px w-5 bg-brand-primary/20" />

                <span className="h-[5px] w-[5px] bg-brand-accent" />

                <span className="h-px w-5 bg-brand-primary/20" />
              </div>

              <p
                className="
                  text-[11px]
                  font-bold

                  text-[#71848a]
                "
              >
                نگاه یکپارچه به مسئله مالی
              </p>
            </div>
          </div>

          {/* ============================================================
              MOBILE FIELD
          ============================================================= */}

          <div
            className="
              border-y
              border-brand-primary/14

              bg-white

              lg:hidden
            "
          >
            <div
              className="
                flex
                items-center
                justify-between

                border-b
                border-brand-primary/10

                px-5
                py-5
              "
            >
              <div>
                <p
                  className="
                    text-[10px]
                    font-black

                    text-[#173843]
                  "
                >
                  تصویر یکپارچه بررسی
                </p>

                <p
                  className="
                    mt-1

                    text-[11px]
                    font-medium

                    text-[#71848a]
                  "
                >
                  چهار محور، یک مسئله تصمیم
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
                <span className="h-[5px] w-[5px] bg-brand-accent" />

                <span className="h-px w-8 bg-brand-primary/20" />
              </div>
            </div>

            <div className="divide-y divide-brand-primary/10">
              {REVIEW_AREAS.map((area) => (
                <MobileReviewArea
                  key={area.title}
                  title={area.title}
                  description={area.description}
                />
              ))}
            </div>

            <div
              className="
                relative

                border-t
                border-brand-primary/10

                bg-brand-primary/[0.025]

                px-5
                py-5
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

              <p
                className="
                  text-[10px]
                  font-black

                  text-[#274a55]
                "
              >
                این محورها در کنار هم، زمینه تصمیم را روشن‌تر می‌کنند.
              </p>
            </div>
          </div>

          
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   DESKTOP AREA
============================================================================= */

function ReviewArea({
  title,
  description,
  accent = false,
}: {
  title: string;
  description: string;
  accent?: boolean;
}) {
  return (
    <article
      className="
        group/area
        relative

        flex
        min-h-[270px]
        flex-col
        justify-between

        p-8

        transition-colors
        duration-300

        hover:bg-brand-primary/[0.018]

        xl:p-10
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          gap-6
        "
      >
        <span
          aria-hidden="true"
          className={`
            h-[6px]
            w-[6px]

            transition-transform
            duration-300

            group-hover/area:scale-125

            ${accent ? "bg-brand-accent" : "bg-brand-primary/45"}
          `}
        />

        <span
          aria-hidden="true"
          className="
            h-px
            w-14

            bg-brand-primary/10

            transition-[width,background-color]
            duration-300

            group-hover/area:w-20
            group-hover/area:bg-brand-primary/20
          "
        />
      </div>

      <div className="max-w-[320px]">
        <h3
          className="
            text-[17px]
            font-black

            text-[#173843]

            transition-colors
            duration-300

            group-hover/area:text-brand-primary

            xl:text-[18px]
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-4

            text-[11px]
            font-medium
            leading-[2.15]

            text-[#687d84]

            xl:text-[12px]
          "
        >
          {description}
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
        <span className="h-px w-5 bg-brand-primary/14" />

        <span className="h-[4px] w-[4px] bg-brand-primary/30" />
      </div>
    </article>
  );
}

/* =============================================================================
   MOBILE AREA
============================================================================= */

function MobileReviewArea({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <article
      className="
        group/mobile-area
        relative

        px-5
        py-6

        transition-colors
        duration-300

        hover:bg-brand-primary/[0.02]
      "
    >
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

          group-hover/mobile-area:scale-y-100
        "
      />

      <div
        className="
          flex
          items-start
          gap-4
        "
      >
        <span
          aria-hidden="true"
          className="
            mt-[11px]

            h-[5px]
            w-[5px]

            shrink-0

            bg-brand-primary/45
          "
        />

        <div>
          <h3
            className="
              text-[12px]
              font-black

              text-[#173843]
            "
          >
            {title}
          </h3>

          <p
            className="
              mt-2.5

              text-[10px]
              font-medium
              leading-[2.1]

              text-[#6c7e84]
            "
          >
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}

/* =============================================================================
   BACKGROUND
============================================================================= */

function ReviewBackground() {
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
            "radial-gradient(circle at 84% 18%,rgba(22,115,148,.055),transparent 27%),linear-gradient(180deg,#f7fbfc 0%,#ffffff 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-[34%]

          h-px

          bg-brand-primary/[0.035]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[18%]
          left-0

          hidden
          h-px
          w-[18%]

          bg-brand-accent/20

          lg:block
        "
      />
    </>
  );
}
