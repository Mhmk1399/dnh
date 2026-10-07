import Link from "next/link";

import {
  ArrowLeft,
  ClipboardList,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

const REQUIRED_INFORMATION = [
  "نام و روش ارتباط",
  "نوع مخاطب",
  "موضوع تصمیم یا مسئله",
  "افق زمانی",
  "وضعیت فعلی",
  "اندازه تقریبی تصمیم، در صورت مرتبط بودن",
  "میزان فوریت",
  "توضیح کوتاه مسئله",
] as const;

const NOT_REQUIRED_INFORMATION = [
  "اطلاعات کامل حساب بانکی",
  "اسناد هویتی غیرضروری",
  "قراردادهای محرمانه",
  "جزئیات کامل همه دارایی‌ها",
  "اطلاعات حساس شرکا",
  "فایل‌های مالی گسترده",
] as const;

export function StrategicConsultationPreparationSection() {
  return (
    <section
      id="consultation-preparation"
      dir="rtl"
      aria-labelledby="consultation-preparation-title"
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
            gap-7

            pt-10

            lg:grid-cols-[0.8fr_1.2fr]
            lg:items-end
            lg:gap-16
            lg:pt-12
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
              <span aria-hidden="true" className="h-px w-9 bg-[#fc8502]" />

              <p
                className="
                  text-[13px]
                  font-black
                  text-[#82cee4]
                "
              >
                پیش از ثبت درخواست
              </p>
            </div>

            <h2
              id="consultation-preparation-title"
              className="
                max-w-[700px]

                text-[30px]
                font-black
                leading-[1.72]
                tracking-[-0.045em]

                text-white

                sm:text-[36px]

                lg:text-[42px]
                lg:leading-[1.62]
              "
            >
              برای شروع، فقط{" "}
              <span className="text-[#fc8502]">تصویر اولیه مسئله</span> کافی
              است.
            </h2>
          </div>

          <p
            className="
              max-w-[610px]

              text-[15px]
              font-medium
              leading-[2]

              text-white/48

              sm:text-[16px]
            "
          >
            در این مرحله نیازی به ارسال پرونده کامل مالی نیست؛ فقط اطلاعاتی لازم
            است که به شناخت موضوع و دامنه اولیه آن کمک کند.
          </p>
        </div>

        {/* ===========================================================
            INTAKE BOUNDARY
        ============================================================ */}

        <div
          className="
            relative
            mt-10

            border
            border-white/[0.11]

            bg-white/[0.018]

            lg:mt-12
          "
        >
          {/* top accent */}

          <div
            aria-hidden="true"
            className="
              absolute
              inset-x-0
              top-0
              h-[3px]

              bg-[linear-gradient(90deg,#fc8502_0_36%,rgba(255,255,255,.08)_36%_100%)]
            "
          />

          {/* ---------------------------------------------------------
              REGISTER HEADER
          ---------------------------------------------------------- */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-5

              border-b
              border-white/[0.09]

              px-5
              pb-5
              pt-7

              sm:px-6
              lg:px-7
            "
          >
            <div>
              <p
                className="
                  text-[12px]
                  font-black
                  text-[#82cee4]/65
                "
              >
                مرز اطلاعات اولیه
              </p>

              <p
                className="
                  mt-1

                  text-[16px]
                  font-black
                  leading-7

                  text-white
                "
              >
                چه چیزی لازم است و چه چیزی فعلاً لازم نیست؟
              </p>
            </div>

            <ClipboardList
              aria-hidden="true"
              strokeWidth={1.5}
              className="
                size-5
                shrink-0
                text-white/28
              "
            />
          </div>

          {/* ---------------------------------------------------------
              TWO SIDES
          ---------------------------------------------------------- */}

          <div
            className="
              grid

              lg:grid-cols-2
            "
          >
            {/* =======================================================
                REQUIRED
            ======================================================== */}

            <div
              className="
                border-b
                border-white/[0.09]

                lg:border-b-0
                lg:border-l
                lg:border-white/[0.09]
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-3

                  border-b
                  border-white/[0.08]

                  px-5
                  py-5

                  sm:px-6
                  lg:px-7
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    grid
                    size-9
                    place-items-center

                    border
                    border-[#fc8502]/30

                    text-[#fc8502]
                  "
                >
                  <ShieldCheck strokeWidth={1.6} className="size-[16px]" />
                </span>

                <div>
                  <p
                    className="
                      text-[13px]
                      font-black
                      text-[#fc8502]
                    "
                  >
                    برای شروع کافی است
                  </p>

                  <p
                    className="
                      mt-1
                      text-[13px]
                      font-medium
                      text-white/38
                    "
                  >
                    اطلاعات موردنیاز برای شناخت اولیه
                  </p>
                </div>
              </div>

              <div>
                {REQUIRED_INFORMATION.map((item, index) => (
                  <InformationRow
                    key={item}
                    index={index + 1}
                    label={item}
                    active
                  />
                ))}
              </div>
            </div>

            {/* =======================================================
                NOT REQUIRED
            ======================================================== */}

            <div>
              <div
                className="
                  flex
                  items-center
                  gap-3

                  border-b
                  border-white/[0.08]

                  px-5
                  py-5

                  sm:px-6
                  lg:px-7
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    grid
                    size-9
                    place-items-center

                    border
                    border-white/[0.11]

                    text-[#82cee4]/65
                  "
                >
                  <LockKeyhole strokeWidth={1.6} className="size-[16px]" />
                </span>

                <div>
                  <p
                    className="
                      text-[13px]
                      font-black
                      text-white/74
                    "
                  >
                    فعلاً ارسال نکنید
                  </p>

                  <p
                    className="
                      mt-1
                      text-[13px]
                      font-medium
                      text-white/36
                    "
                  >
                    جزئیات حساس یا پرونده کامل مالی
                  </p>
                </div>
              </div>

              <div>
                {NOT_REQUIRED_INFORMATION.map((item, index) => (
                  <InformationRow key={item} index={index + 1} label={item} />
                ))}
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------
              FOOT
          ---------------------------------------------------------- */}

          <div
            className="
              relative

              border-t
              border-white/[0.09]

              bg-black/[0.08]

              px-5
              py-5

              sm:px-6
              lg:px-7
            "
          >
            <span
              aria-hidden="true"
              className="
                absolute
                inset-y-0
                right-0
                w-[3px]
                bg-[#fc8502]
              "
            />

            <p
              className="
                max-w-[900px]

                text-[14px]
                font-medium
                leading-7

                text-white/46
              "
            >
              هدف این مرحله، شناخت اولیه موضوع است؛ نه دریافت همه اسناد و جزئیات
              مالی از همان ابتدا.
            </p>
          </div>
        </div>

        {/* ===========================================================
            NEXT
        ============================================================ */}

        <div
          className="
            mt-8
            flex
            justify-end
          "
        >
          <Link
            href="#consultation-process"
            className="
              group/next

              inline-flex
              items-center
              gap-3

              text-[13px]
              font-black

              text-white/55

              transition-colors
              duration-200

              hover:text-white

              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-[#fc8502]
            "
          >
            بعدی: درخواست چگونه بررسی می‌شود؟
            <ArrowLeft
              aria-hidden="true"
              strokeWidth={1.7}
              className="
                size-[15px]
                text-[#fc8502]

                transition-transform
                duration-200

                group-hover/next:-translate-x-1
              "
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   INFORMATION ROW
============================================================================= */

function InformationRow({
  index,
  label,
  active = false,
}: {
  index: number;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className="
        group/item
        relative

        flex
        min-h-[58px]
        items-center
        gap-4

        border-b
        border-white/[0.065]

        px-5
        py-3.5

        last:border-b-0

        transition-colors
        duration-200

        hover:bg-white/[0.02]

        sm:px-6
        lg:px-7
      "
    >
      <span
        className="
          w-7
          shrink-0

          text-[12px]
          font-black
          tabular-nums

          text-white/22
        "
      >
        {String(index).padStart(2, "0")}
      </span>

      <span
        aria-hidden="true"
        className={`
          h-[6px]
          w-[6px]
          shrink-0

          ${active ? "bg-[#fc8502]" : "border border-white/20"}
        `}
      />

      <p
        className={`
          text-[14px]
          font-medium
          leading-7

          ${active ? "text-white/72" : "text-white/43"}
        `}
      >
        {label}
      </p>

      <span
        aria-hidden="true"
        className="
          absolute
          inset-y-0
          right-0

          w-[2px]

          origin-bottom
          scale-y-0

          bg-[#fc8502]

          transition-transform
          duration-200

          group-hover/item:scale-y-100
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
          background: `
            radial-gradient(
              circle at 82% 34%,
              rgba(22,115,148,.17),
              transparent 27%
            ),
            linear-gradient(
              115deg,
              #022631 0%,
              #033746 50%,
              #021f2a 100%
            )
          `,
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.035]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(255,255,255,.075) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "118px 100%",
        }}
      />
    </>
  );
}
