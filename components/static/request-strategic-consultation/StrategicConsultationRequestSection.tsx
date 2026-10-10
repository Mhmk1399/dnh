"use client";

import {
  ArrowLeft,
  FileText,
  LockKeyhole,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import type { FormEventHandler } from "react";

import { ActionButton } from "@/components/ui/ActionButton";
import { FormField } from "@/components/forms/FormField";
import { FormStatus } from "@/components/forms/FormStatus";

type StrategicConsultationRequestSectionProps = {
  onSubmit?: FormEventHandler<HTMLFormElement>;
  pending?: boolean;

  result?: {
    ok: boolean;
    message?: string;
    reference?: string;
    errors?: Record<string, string>;
  } | null;
};

const preventDefaultSubmit: FormEventHandler<HTMLFormElement> = (event) => {
  event.preventDefault();
};

export function StrategicConsultationRequestSection({
  onSubmit = preventDefaultSubmit,
  pending = false,
  result = null,
}: StrategicConsultationRequestSectionProps) {
  return (
    <section
      id="consultation-request"
      dir="rtl"
      aria-labelledby="consultation-request-title"
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
            INDEX
        ============================================================ */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-5

            border-y
            border-white/[0.08]

            py-3
          "
        >
          <div className="flex items-center gap-3">
            <span
              className="
                text-[12px]
                font-black
                tabular-nums
                text-white/28
              "
            >
              05
            </span>

            <span aria-hidden="true" className="h-4 w-px bg-white/10" />

            <span
              className="
                text-[12px]
                font-black
                text-white/62
              "
            >
              ثبت درخواست
            </span>
          </div>

          <span
            aria-hidden="true"
            className="
              h-[11px]
              w-[11px]
              bg-[#fc8502]
            "
          />
        </div>

        {/* ===========================================================
            MAIN
        ============================================================ */}

        <div
          className="
            grid
            gap-10

            pt-10

            lg:grid-cols-[0.68fr_1.32fr]
            lg:items-start
            lg:gap-14
            lg:pt-12

            xl:gap-20
          "
        >
          {/* =========================================================
              INTRO
          ========================================================== */}

          <aside
            className="
              lg:sticky
              lg:top-28
            "
          >
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
                  w-9
                  bg-[#fc8502]
                "
              />

              <p
                className="
                  text-[13px]
                  font-black
                  text-[#82cee4]
                "
              >
                درخواست مشاوره راهبردی
              </p>
            </div>

            <h2
              id="consultation-request-title"
              className="
                max-w-[620px]

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
              برای شروع،{" "}
              <span className="text-[#fc8502]">
                مسئله را در حد لازم روشن کنید.
              </span>
            </h2>

            <p
              className="
                mt-5
                max-w-[510px]

                text-[15px]
                font-medium
                leading-[2]

                text-white/48
              "
            >
              این اطلاعات برای شناخت اولیه موضوع و بررسی تناسب درخواست استفاده
              می‌شوند؛ نه برای تحلیل کامل پرونده.
            </p>

            {/* =======================================================
                PRINCIPLES
            ======================================================== */}

            <div
              className="
                mt-8
                border-y
                border-white/[0.09]
              "
            >
              <RequestNote
                icon={FileText}
                title="اطلاعات اولیه کافی است"
                description="در این مرحله نیازی به ارسال پرونده کامل مالی نیست."
              />

              <RequestNote
                icon={ShieldCheck}
                title="بررسی پیش از جلسه"
                description="دامنه و تناسب درخواست پیش از ادامه مسیر بررسی می‌شود."
              />

              <RequestNote
                icon={LockKeyhole}
                title="اطلاعات حساس ارسال نکنید"
                description="از ارسال رمز، اطلاعات بانکی یا اسناد محرمانه غیرضروری خودداری کنید."
                accent
              />
            </div>
          </aside>

          {/* =========================================================
              REQUEST SHEET
          ========================================================== */}

          <div
            className="
              relative
              overflow-hidden

              border
              border-white/[0.11]

              bg-white/[0.035]

              shadow-[0_30px_90px_rgba(0,0,0,.12)]
            "
          >
            {/* top rail */}

            <span
              aria-hidden="true"
              className="
                absolute
                inset-x-0
                top-0

                h-[3px]

                bg-[linear-gradient(90deg,#fc8502_0_22%,rgba(130,206,228,.55)_22%_100%)]
              "
            />

            {/* =======================================================
                FORM HEADER
            ======================================================== */}

            <div
              className="
                flex
                items-start
                justify-between
                gap-6

                border-b
                border-white/[0.09]

                px-5
                pb-5
                pt-7

                sm:px-7
                sm:pb-6
                sm:pt-8

                lg:px-8
              "
            >
              <div>
                <p
                  className="
                    text-[13px]
                    font-black
                    text-[#82cee4]
                  "
                >
                  اطلاعات درخواست
                </p>

                <h3
                  className="
                    mt-2

                    text-[19px]
                    font-black
                    leading-8

                    text-white

                    sm:text-[21px]
                  "
                >
                  اطلاعات پایه برای بررسی اولیه
                </h3>
              </div>

              <span
                className="
                  hidden

                  border
                  border-white/[0.1]

                  px-3
                  py-2

                  text-[12px]
                  font-black
                  text-white/30

                  sm:block
                "
              >
                REQUEST / 05
              </span>
            </div>

            {/* =======================================================
                FORM
            ======================================================== */}

            <form
              onSubmit={onSubmit}
              noValidate
              aria-label="فرم درخواست مشاوره راهبردی"
              className="
                px-5
                py-6

                sm:px-7
                sm:py-7

                lg:px-8
                lg:py-8
              "
            >
              {/* =====================================================
                  CONTACT INFORMATION
              ====================================================== */}

              <FieldGroup
                number="01"
                title="اطلاعات ارتباط"
                description="برای پیگیری درخواست"
              >
                <div
                  className="
                    grid
                    gap-5
                    sm:grid-cols-2
                  "
                >
                  <FormField
                    label="نام و نام خانوادگی"
                    name="name"
                    autoComplete="name"
                    required
                    placeholder="نام و نام خانوادگی"
                    error={result?.errors?.name}
                  />

                  <FormField
                    label="شماره تماس"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    dir="ltr"
                    autoComplete="tel"
                    required
                    placeholder="09xxxxxxxxx"
                    error={result?.errors?.phone}
                  />

                  <FormField
                    label="ایمیل"
                    name="email"
                    type="email"
                    dir="ltr"
                    autoComplete="email"
                    hint="اختیاری"
                    placeholder="name@example.com"
                    error={result?.errors?.email}
                  />

                  <SelectField
                    label="روش ارتباط ترجیحی"
                    name="communicationMethod"
                    required
                    error={result?.errors?.communicationMethod}
                    options={[
                      {
                        value: "",
                        label: "انتخاب کنید",
                      },
                      {
                        value: "phone",
                        label: "تماس تلفنی",
                      },
                      {
                        value: "whatsapp",
                        label: "واتساپ",
                      },
                      {
                        value: "email",
                        label: "ایمیل",
                      },
                    ]}
                  />
                </div>
              </FieldGroup>

              {/* =====================================================
                  CONTEXT
              ====================================================== */}

              <FieldGroup
                number="02"
                title="زمینه درخواست"
                description="برای شناخت دامنه اولیه موضوع"
              >
                <div
                  className="
                    grid
                    gap-5

                    sm:grid-cols-2
                  "
                >
                  <SelectField
                    label="نوع مخاطب"
                    name="audienceType"
                    required
                    error={result?.errors?.audienceType}
                    options={[
                      {
                        value: "",
                        label: "انتخاب کنید",
                      },
                      {
                        value: "individual",
                        label: "فرد / سرمایه‌گذار",
                      },
                      {
                        value: "family",
                        label: "خانواده",
                      },
                      {
                        value: "executive",
                        label: "مدیر یا تصمیم‌گیر ارشد",
                      },
                      {
                        value: "business-owner",
                        label: "صاحب کسب‌وکار",
                      },
                      {
                        value: "company",
                        label: "شرکت / هلدینگ",
                      },
                      {
                        value: "other",
                        label: "سایر",
                      },
                    ]}
                  />

                  <FormField
                    label="موضوع تصمیم یا مسئله"
                    name="decisionTopic"
                    required
                    autoComplete="off"
                    placeholder="مثلاً ساختار سرمایه یا تصمیم سرمایه‌گذاری"
                    error={result?.errors?.decisionTopic}
                  />

                  <SelectField
                    label="افق زمانی"
                    name="timeHorizon"
                    required
                    error={result?.errors?.timeHorizon}
                    options={[
                      {
                        value: "",
                        label: "انتخاب کنید",
                      },
                      {
                        value: "immediate",
                        label: "کوتاه‌مدت",
                      },
                      {
                        value: "medium",
                        label: "میان‌مدت",
                      },
                      {
                        value: "long",
                        label: "بلندمدت",
                      },
                      {
                        value: "unclear",
                        label: "هنوز مشخص نیست",
                      },
                    ]}
                  />

                  <SelectField
                    label="فوریت موضوع"
                    name="urgency"
                    required
                    error={result?.errors?.urgency}
                    options={[
                      {
                        value: "",
                        label: "انتخاب کنید",
                      },
                      {
                        value: "normal",
                        label: "عادی",
                      },
                      {
                        value: "near-term",
                        label: "نیازمند بررسی در آینده نزدیک",
                      },
                      {
                        value: "time-sensitive",
                        label: "وابسته به زمان",
                      },
                    ]}
                  />
                </div>
              </FieldGroup>

              {/* =====================================================
                  CURRENT SITUATION
              ====================================================== */}

              <FieldGroup
                number="03"
                title="تصویر اولیه مسئله"
                description="بدون ورود به جزئیات محرمانه"
              >
                <div className="space-y-5">
                  <FormField
                    label="وضعیت فعلی"
                    name="currentSituation"
                    multiline
                    required
                    minLength={10}
                    maxLength={1500}
                    placeholder="به‌اختصار توضیح دهید اکنون در چه شرایطی هستید…"
                    error={result?.errors?.currentSituation}
                  />

                  <FormField
                    label="اندازه تقریبی تصمیم یا سرمایه مرتبط"
                    name="approximateSize"
                    hint="در صورت مرتبط بودن"
                    autoComplete="off"
                    placeholder="می‌توانید به‌صورت حدودی یا بازه‌ای بنویسید"
                    error={result?.errors?.approximateSize}
                  />

                  <FormField
                    label="توضیح کوتاه درخواست"
                    name="message"
                    multiline
                    required
                    minLength={10}
                    maxLength={2500}
                    placeholder="چه چیزی باید در گفت‌وگوی تخصصی روشن‌تر شود؟"
                    error={result?.errors?.message}
                  />
                </div>
              </FieldGroup>

              {/* =====================================================
                  RESULT
              ====================================================== */}

              {result?.message ? (
                <div className="mt-7">
                  <FormStatus
                    kind={result.ok ? "success" : "error"}
                    message={result.message}
                    reference={result.reference}
                  />
                </div>
              ) : null}

              {/* =====================================================
                  SUBMIT
              ====================================================== */}

              <div
                className="
                  mt-8

                  flex
                  flex-col
                  gap-4

                  border-t
                  border-white/[0.09]

                  pt-6

                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <ActionButton
                  type="submit"
                  variant="assessment"
                  size="lg"
                  icon={ArrowLeft}
                  loading={pending}
                  disabled={pending}
                  className="
                    w-full

                    bg-[#fc8502]
                    text-white

                    hover:bg-[#ec7d01]

                    sm:w-auto
                    sm:min-w-[240px]
                  "
                >
                  {pending ? "در حال ثبت…" : "ثبت درخواست مشاوره"}
                </ActionButton>

                <p
                  className="
                    max-w-[330px]

                    text-[13px]
                    font-medium
                    leading-6

                    text-white/36
                  "
                >
                  ثبت درخواست به‌معنای تأیید خودکار جلسه نیست.
                </p>
              </div>
            </form>

            {/* =======================================================
                PRIVACY FOOTER
            ======================================================== */}

            <div
              className="
                relative

                border-t
                border-white/[0.09]

                bg-black/[0.09]

                px-5
                py-4

                sm:px-7
                lg:px-8
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
                  text-[13px]
                  font-medium
                  leading-7

                  text-white/40
                "
              >
                از ارسال اطلاعات بانکی، رمز، قرارداد محرمانه، اسناد هویتی
                غیرضروری یا فایل‌های مالی گسترده در این مرحله خودداری کنید.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   FIELD GROUP
============================================================================= */

function FieldGroup({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset
      className="
        border-b
        border-white/[0.09]

        pb-7

        [&+fieldset]:pt-7

        last:border-b-0
      "
    >
      <legend className="mb-5 w-full">
        <span
          className="
            flex
            items-center
            justify-between
            gap-5
          "
        >
          <span className="flex items-center gap-3">
            <span
              className="
                text-[12px]
                font-black
                tabular-nums

                text-[#fc8502]
              "
            >
              {number}
            </span>

            <span
              aria-hidden="true"
              className="
                h-4
                w-px
                bg-white/10
              "
            />

            <span
              className="
                text-[14px]
                font-black
                text-white
              "
            >
              {title}
            </span>
          </span>

          <span
            className="
              hidden

              text-[12px]
              font-medium
              text-white/30

              sm:block
            "
          >
            {description}
          </span>
        </span>
      </legend>

      {children}
    </fieldset>
  );
}

/* =============================================================================
   SELECT FIELD
============================================================================= */

function SelectField({
  label,
  name,
  options,
  required = false,
  error,
}: {
  label: string;
  name: string;
  options: {
    value: string;
    label: string;
  }[];
  required?: boolean;
  error?: string;
}) {
  const id = `consultation-${name}`;

  return (
    <div>
      <label
        htmlFor={id}
        className="
          mb-2
          flex
          items-center
          gap-1.5

          text-[13px]
          font-black

          text-white/72
        "
      >
        {label}

        {required ? (
          <span aria-hidden="true" className="text-[#fc8502]">
            *
          </span>
        ) : null}
      </label>

      <div className="relative">
        <select
          id={id}
          name={name}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`
            min-h-[50px]
            w-full
            appearance-none

            border

            bg-white/[0.035]

            px-4
            pl-10

            text-[14px]
            font-medium

            text-white

            outline-none

            transition-[border-color,background-color,box-shadow]
            duration-200

            focus:bg-white/[0.05]
            focus:ring-4
            focus:ring-[#167394]/15

            ${
              error
                ? "border-red-400/60"
                : "border-white/[0.11] focus:border-[#82cee4]/45"
            }
          `}
        >
          {options.map((option) => (
            <option
              key={`${name}-${option.value}`}
              value={option.value}
              className="
                bg-[#022f3e]
                text-white
              "
            >
              {option.label}
            </option>
          ))}
        </select>

        <span
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            left-4
            top-1/2

            -translate-y-1/2

            text-[12px]
            text-white/35
          "
        >
          ↓
        </span>
      </div>

      {error ? (
        <p
          id={`${id}-error`}
          className="
            mt-2
            text-[12px]
            font-medium
            leading-5
            text-red-300
          "
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

/* =============================================================================
   REQUEST NOTE
============================================================================= */

function RequestNote({
  icon: Icon,
  title,
  description,
  accent = false,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  accent?: boolean;
}) {
  return (
    <div
      className="
        grid
        grid-cols-[38px_1fr]
        gap-4

        border-b
        border-white/[0.075]

        py-5

        last:border-b-0
      "
    >
      <span
        aria-hidden="true"
        className={`
          grid
          size-9
          place-items-center

          border

          ${
            accent
              ? "border-[#fc8502]/30 text-[#fc8502]"
              : "border-white/[0.1] text-[#82cee4]/70"
          }
        `}
      >
        <Icon strokeWidth={1.6} className="size-[16px]" />
      </span>

      <div>
        <p
          className="
            text-[14px]
            font-black
            leading-7
            text-white/74
          "
        >
          {title}
        </p>

        <p
          className="
            mt-1
            text-[13px]
            font-medium
            leading-6
            text-white/38
          "
        >
          {description}
        </p>
      </div>
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
              circle at 77% 28%,
              rgba(22,115,148,.19),
              transparent 28%
            ),
            linear-gradient(
              116deg,
              #021f2a 0%,
              #033746 52%,
              #022631 100%
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
