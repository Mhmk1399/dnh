/* =============================================================================
   UNSTRUCTURED PORTFOLIO — STRUCTURE GAP

   Dark signature section

   Visual idea:
   Multiple assets are not automatically a coherent portfolio.

   Right  = assets exist
   Center = structure gap
   Left   = portfolio can be read as one picture
============================================================================= */

const ASSETS = ["دارایی ۰۱", "دارایی ۰۲", "دارایی ۰۳", "دارایی ۰۴"] as const;

const STRUCTURE_LENSES = [
  "ساختار پرتفوی",
  "تمرکز ریسک",
  "نقدشوندگی",
  "تخصیص دارایی",
] as const;

export function UnstructuredPortfolioStructureSection() {
  return (
    <section
      id="unstructured-portfolio-structure"
      dir="rtl"
      aria-labelledby="unstructured-portfolio-structure-title"
      className="
        relative
        isolate
        scroll-mt-24
        overflow-hidden

        bg-[#022f3e]
        text-white

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
                  text-white/65
                "
              >
                تفاوت اصلی
              </p>
            </div>

            <h2
              id="unstructured-portfolio-structure-title"
              className="
                max-w-[800px]
                [text-wrap:balance]

                text-[29px]
                font-black
                leading-[1.72]
                tracking-[-0.045em]

                text-white

                sm:text-[35px]

                lg:text-[41px]
                lg:leading-[1.58]
              "
            >
              چند دارایی می‌توانند کنار هم باشند؛{" "}
              <span className="text-brand-accent">
                بدون اینکه هنوز یک پرتفوی منسجم ساخته باشند.
              </span>
            </h2>
          </div>

          <p
            className="
              max-w-[610px]

              text-[15px]
              font-medium
              leading-[2]

              text-white/62

              sm:text-[16px]
            "
          >
            تفاوت در تعداد دارایی‌ها نیست؛ تفاوت در این است که آیا می‌توان
            ساختار، ریسک، نقدشوندگی و تخصیص آن‌ها را در یک تصویر واحد دید.
          </p>
        </div>

        {/* ===========================================================
            STRUCTURE GAP VISUAL
        ============================================================ */}

        <div
          className="
            relative

            mt-10

            border
            border-white/13

            bg-white/[0.02]

            shadow-[0_32px_90px_rgba(0,0,0,.18)]

            lg:mt-12
          "
        >
          {/* ---------------------------------------------------------
              DESKTOP
          ---------------------------------------------------------- */}

          <div
            className="
              hidden

              min-h-[400px]

              grid-cols-[1fr_150px_1fr]

              lg:grid
            "
          >
            {/* =======================================================
                RIGHT — ASSET COLLECTION
            ======================================================== */}

            <div
              className="
                flex
                flex-col

                border-l
                border-white/10
              "
            >
              <VisualHeader
                eyebrow="وضعیت اول"
                title="مجموعه‌ای از دارایی‌ها"
              />

              <div
                className="
                  flex
                  flex-1
                  flex-col
                  justify-center

                  px-7
                  py-7
                "
              >
                <p
                  className="
                    mb-5

                    text-[14px]
                    font-medium
                    leading-7

                    text-white/48
                  "
                >
                  هر دارایی جداگانه قابل مشاهده است.
                </p>

                <div className="space-y-3">
                  {ASSETS.map((asset, index) => (
                    <AssetRow key={asset} label={asset} index={index} />
                  ))}
                </div>
              </div>

              <div
                className="
                  border-t
                  border-white/10

                  px-7
                  py-4
                "
              >
                <p
                  className="
                    text-[14px]
                    font-bold

                    text-white/48
                  "
                >
                  دارایی‌ها روشن‌اند؛{" "}
                  <span className="text-white/75">ارتباط میان آن‌ها نه.</span>
                </p>
              </div>
            </div>

            {/* =======================================================
                CENTER — STRUCTURE GAP
            ======================================================== */}

            <div
              className="
                relative

                flex
                flex-col
                items-center
                justify-center

                overflow-hidden

                bg-black/[0.08]
              "
            >
              <span
                aria-hidden="true"
                className="
                  absolute
                  inset-y-0
                  right-1/2

                  w-px

                  bg-white/10
                "
              />

              <div
                className="
                  relative
                  z-10

                  flex
                  flex-col
                  items-center

                  bg-[#063746]

                  px-5
                  py-6
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    h-10
                    w-[2px]

                    bg-brand-accent
                  "
                />

                <p
                  className="
                    mt-4

                    text-[13px]
                    font-black

                    text-brand-accent
                  "
                >
                  چیزی که کم است
                </p>

                <p
                  className="
                    mt-1

                    text-[22px]
                    font-black

                    text-white
                  "
                >
                  ساختار
                </p>

                <span
                  aria-hidden="true"
                  className="
                    mt-4

                    h-10
                    w-[2px]

                    bg-brand-accent
                  "
                />
              </div>
            </div>

            {/* =======================================================
                LEFT — PORTFOLIO VIEW
            ======================================================== */}

            <div className="flex flex-col">
              <VisualHeader
                eyebrow="وضعیت دوم"
                title="یک تصویر قابل‌خواندن از پرتفوی"
                accent
              />

              <div
                className="
                  flex
                  flex-1
                  flex-col
                  justify-center

                  px-7
                  py-7
                "
              >
                <p
                  className="
                    mb-5

                    text-[14px]
                    font-medium
                    leading-7

                    text-white/48
                  "
                >
                  دارایی‌ها در نسبت با کل پرتفوی دیده می‌شوند.
                </p>

                <div
                  className="
                    border-y
                    border-white/10
                  "
                >
                  {STRUCTURE_LENSES.map((item, index) => (
                    <StructureRow
                      key={item}
                      label={item}
                      accent={index === 0}
                    />
                  ))}
                </div>
              </div>

              <div
                className="
                  border-t
                  border-white/10

                  bg-brand-accent/[0.045]

                  px-7
                  py-4
                "
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="
                      h-[7px]
                      w-[7px]

                      bg-brand-accent
                    "
                  />

                  <p
                    className="
                      text-[14px]
                      font-black

                      text-white/78
                    "
                  >
                    حالا تصویر کل قابل بررسی است.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------
              MOBILE
          ---------------------------------------------------------- */}

          <div className="lg:hidden">
            {/* assets */}

            <div>
              <VisualHeader eyebrow="وضعیت فعلی" title="دارایی‌ها وجود دارند" />

              <div
                className="
                  px-5
                  py-5

                  sm:px-6
                "
              >
                <div className="space-y-3">
                  {ASSETS.map((asset, index) => (
                    <AssetRow key={asset} label={asset} index={index} />
                  ))}
                </div>
              </div>
            </div>

            {/* structure gap */}

            <div
              className="
                relative

                flex
                items-center
                gap-4

                border-y
                border-white/10

                bg-black/[0.08]

                px-5
                py-5

                sm:px-6
              "
            >
              <span
                aria-hidden="true"
                className="
                  h-10
                  w-[2px]

                  shrink-0

                  bg-brand-accent
                "
              />

              <div>
                <p
                  className="
                    text-[13px]
                    font-black

                    text-brand-accent
                  "
                >
                  چیزی که باید روشن شود
                </p>

                <p
                  className="
                    mt-1

                    text-[20px]
                    font-black

                    text-white
                  "
                >
                  ساختار میان دارایی‌ها
                </p>
              </div>
            </div>

            {/* portfolio view */}

            <div>
              <VisualHeader
                eyebrow="تصویر موردنیاز"
                title="پرتفوی به‌عنوان یک کل"
                accent
              />

              <div
                className="
                  px-5
                  py-5

                  sm:px-6
                "
              >
                <div
                  className="
                    border-y
                    border-white/10
                  "
                >
                  {STRUCTURE_LENSES.map((item, index) => (
                    <StructureRow
                      key={item}
                      label={item}
                      accent={index === 0}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================
              BOTTOM STATEMENT
          ========================================================== */}

          <div
            className="
              relative

              flex
              items-start
              gap-4

              border-t
              border-white/10

              bg-white/[0.018]

              px-5
              py-5

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
                max-w-[950px]

                text-[14px]
                font-bold
                leading-7

                text-white/62

                sm:text-[15px]
              "
            >
              هدف، اضافه کردن دارایی بیشتر نیست؛{" "}
              <span className="text-white">
                هدف، روشن کردن ساختاری است که دارایی‌های موجود در آن قرار
                گرفته‌اند.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   VISUAL HEADER
============================================================================= */

function VisualHeader({
  eyebrow,
  title,
  accent = false,
}: {
  eyebrow: string;
  title: string;
  accent?: boolean;
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-5

        border-b
        border-white/10

        px-5
        py-4

        sm:px-6
        lg:px-7
      "
    >
      <div>
        <p
          className={`
            text-[13px]
            font-black

            ${accent ? "text-brand-accent" : "text-white/38"}
          `}
        >
          {eyebrow}
        </p>

        <p
          className="
            mt-1

            text-[18px]
            font-black
            leading-8

            text-white
          "
        >
          {title}
        </p>
      </div>

      <span
        aria-hidden="true"
        className={`
          h-[8px]
          w-[8px]

          shrink-0

          ${accent ? "bg-brand-accent" : "bg-white/18"}
        `}
      />
    </div>
  );
}

/* =============================================================================
   ASSET ROW
============================================================================= */

function AssetRow({ label, index }: { label: string; index: number }) {
  const widths = ["w-[76%]", "w-[94%]", "w-[66%]", "w-[84%]"];

  return (
    <div
      className={`
        ${widths[index] ?? "w-full"}

        border
        border-white/10

        bg-white/[0.025]

        px-4
        py-3
      `}
    >
      <div
        className="
          flex
          items-center
          justify-between
          gap-4
        "
      >
        <p
          className="
            text-[14px]
            font-bold

            text-white/65
          "
        >
          {label}
        </p>

        <span
          aria-hidden="true"
          className="
            h-[6px]
            w-[6px]

            bg-[#82cee4]/45
          "
        />
      </div>
    </div>
  );
}

/* =============================================================================
   STRUCTURE ROW
============================================================================= */

function StructureRow({
  label,
  accent = false,
}: {
  label: string;
  accent?: boolean;
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-5

        border-b
        border-white/[0.08]

        py-3.5

        last:border-b-0
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
          className={`
            h-[7px]
            w-[7px]

            shrink-0

            ${accent ? "bg-brand-accent" : "bg-[#82cee4]/50"}
          `}
        />

        <p
          className="
            text-[15px]
            font-black

            text-white/80
          "
        >
          {label}
        </p>
      </div>

      <span
        aria-hidden="true"
        className="
          h-px
          w-8

          bg-white/12
        "
      />
    </div>
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
            "radial-gradient(circle at 68% 44%,rgba(22,115,148,.22),transparent 31%),linear-gradient(116deg,#022936 0%,#033847 52%,#022d3a 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.04]
        "
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,.08) 1px,transparent 1px)",
          backgroundSize: "118px 100%",
        }}
      />
    </>
  );
}
