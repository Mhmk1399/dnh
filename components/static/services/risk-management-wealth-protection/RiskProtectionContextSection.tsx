/* =============================================================================
   RISK MANAGEMENT & WEALTH PROTECTION — CONTEXT

   Compact light section
   Meaning:
   Risk may exist inside the structure itself.

   Server Component
   No tiny microcopy
============================================================================= */

const STRUCTURAL_RISKS = [
  {
    title: "تمرکز بالا",
    description:
      "وقتی بخش مهمی از ساختار به یک حوزه، دارایی یا منبع محدود متکی باشد، ریسک می‌تواند در همان نقطه جمع شود.",
  },
  {
    title: "نقدشوندگی محدود",
    description:
      "داشتن دارایی لزوماً به معنی دسترسی سریع به نقدینگی در زمان نیاز نیست.",
  },
  {
    title: "حساسیت به ارز و تورم",
    description:
      "تغییرات ارز و تورم می‌توانند ارزش واقعی، قدرت خرید و کیفیت بعضی تصمیم‌ها را تحت فشار قرار دهند.",
  },
] as const;

export function RiskProtectionContextSection() {
  return (
    <section
      id="risk-protection-context"
      dir="rtl"
      aria-labelledby="risk-protection-context-title"
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
      <ContextBackground />

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
            gap-6

            lg:grid-cols-[1.08fr_0.92fr]
            lg:items-end
            lg:gap-14
          "
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-9 bg-brand-accent" />

              <p
                className="
                  text-[12px]
                  font-black

                  text-brand-primary/75
                "
              >
                ریسک درون ساختار
              </p>
            </div>

            <h2
              id="risk-protection-context-title"
              className="
                max-w-[860px]
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
              داشتن دارایی یا کسب‌وکار قوی،{" "}
              <span className="text-brand-primary">
                به معنی نداشتن ریسک نیست.
              </span>
            </h2>
          </div>

          <p
            className="
              max-w-[580px]

              text-[15px]
              font-medium
              leading-[2.05]

              text-[#5e7279]

              sm:text-[16px]
            "
          >
            بعضی ریسک‌ها از بیرون وارد ساختار نمی‌شوند؛ داخل نحوه توزیع
            دارایی‌ها، سطح نقدشوندگی یا حساسیت به شرایط اقتصادی شکل می‌گیرند.
          </p>
        </div>

        {/* ===============================================================
            STRUCTURAL RISK BAND
        ================================================================ */}

        <div
          className="
            relative

            mt-10

            border
            border-brand-primary/14

            bg-white

            shadow-[0_18px_50px_rgba(5,62,79,.045)]

            lg:mt-12
          "
        >
          {/* architectural corner */}

          <span
            aria-hidden="true"
            className="
              absolute
              right-[-1px]
              top-[-1px]

              h-7
              w-[2px]

              bg-brand-accent
            "
          />

          <span
            aria-hidden="true"
            className="
              absolute
              right-[-1px]
              top-[-1px]

              h-[2px]
              w-7

              bg-brand-accent
            "
          />

          {/* =============================================================
              DESKTOP
          ============================================================== */}

          <div
            className="
              hidden

              grid-cols-3

              divide-x
              divide-x-reverse
              divide-brand-primary/10

              lg:grid
            "
          >
            {STRUCTURAL_RISKS.map((item, index) => (
              <DesktopRiskItem
                key={item.title}
                title={item.title}
                description={item.description}
                accent={index === 0}
              />
            ))}
          </div>

          {/* =============================================================
              MOBILE / TABLET
          ============================================================== */}

          <div
            className="
              divide-y
              divide-brand-primary/10

              lg:hidden
            "
          >
            {STRUCTURAL_RISKS.map((item, index) => (
              <MobileRiskItem
                key={item.title}
                title={item.title}
                description={item.description}
                accent={index === 0}
              />
            ))}
          </div>

          {/* =============================================================
              CLOSING STATEMENT
          ============================================================== */}

          <div
            className="
              flex
              items-start
              gap-4

              border-t
              border-brand-primary/11

              bg-brand-primary/[0.025]

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
                text-[14px]
                font-bold
                leading-7

                text-[#355761]

                sm:text-[15px]
              "
            >
              برای شناخت ریسک، فقط ارزش دارایی‌ها مهم نیست؛{" "}
              <span className="text-brand-primary">
                نحوه قرار گرفتن آن‌ها در ساختار هم باید دیده شود.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   DESKTOP ITEM
============================================================================= */

function DesktopRiskItem({
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
        group/item
        relative

        min-h-[175px]

        px-6
        py-6

        transition-colors
        duration-300

        hover:bg-brand-primary/[0.018]

        xl:px-7
      "
    >
      <div
        className="
          mb-4
          flex
          items-center
          justify-between
          gap-4
        "
      >
        <span
          aria-hidden="true"
          className={`
            h-[7px]
            w-[7px]

            ${accent ? "bg-brand-accent" : "bg-brand-primary/32"}
          `}
        />

        <span
          aria-hidden="true"
          className="
            h-px
            w-8

            bg-brand-primary/12

            transition-[width,background-color]
            duration-300

            group-hover/item:w-11
            group-hover/item:bg-brand-primary/24
          "
        />
      </div>

      <h3
        className="
          text-[17px]
          font-black
          leading-7

          text-[#173b45]

          transition-colors
          duration-300

          group-hover/item:text-brand-primary
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-3

          text-[14px]
          font-medium
          leading-[1.95]

          text-[#697c82]
        "
      >
        {description}
      </p>

      <span
        aria-hidden="true"
        className="
          absolute
          inset-x-6
          bottom-0

          h-[2px]

          origin-right
          scale-x-0

          bg-brand-accent

          transition-transform
          duration-300

          group-hover/item:scale-x-100

          xl:inset-x-7
        "
      />
    </article>
  );
}

/* =============================================================================
   MOBILE ITEM
============================================================================= */

function MobileRiskItem({
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
        flex
        items-start
        gap-4

        px-5
        py-5

        sm:px-6
      "
    >
      <span
        aria-hidden="true"
        className={`
          mt-[9px]

          h-[7px]
          w-[7px]

          shrink-0

          ${accent ? "bg-brand-accent" : "bg-brand-primary/32"}
        `}
      />

      <div>
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

        <p
          className="
            mt-2

            text-[14px]
            font-medium
            leading-[1.95]

            text-[#697c82]
          "
        >
          {description}
        </p>
      </div>
    </article>
  );
}

/* =============================================================================
   BACKGROUND
============================================================================= */

function ContextBackground() {
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
            "radial-gradient(circle at 84% 24%,rgba(22,115,148,.045),transparent 24%),linear-gradient(180deg,#ffffff 0%,#f9fcfd 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-x-0
          top-[52%]

          h-px

          bg-brand-primary/[0.025]
        "
      />
    </>
  );
}
