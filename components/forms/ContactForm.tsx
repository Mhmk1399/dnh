"use client";

import { ArrowLeft, Fingerprint, ShieldCheck } from "lucide-react";
import { useState, type FormEvent } from "react";

import { ActionButton } from "@/components/ui/ActionButton";
import { FormField } from "@/components/forms/FormField";
import { FormStatus } from "@/components/forms/FormStatus";

type ApiResult = {
  message?: string;
  reference?: string;
  errors?: Record<string, string>;
};

export function ContactForm() {
  const [pending, setPending] = useState(false);

  const [result, setResult] = useState<(ApiResult & { ok: boolean }) | null>(
    null,
  );

  /* ========================================================================
     SUBMIT
     منطق فعلی بدون تغییر
  ======================================================================== */

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setPending(true);
    setResult(null);

    const form = event.currentTarget;

    const data = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const payload = (await response.json()) as ApiResult;

      setResult({
        ...payload,
        ok: response.ok,
      });

      if (response.ok) {
        form.reset();
      }
    } catch {
      setResult({
        ok: false,
        message: "ارتباط با سامانه برقرار نشد. لطفاً اتصال خود را بررسی کنید.",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <section
      id="contact-form"
      dir="rtl"
      aria-labelledby="contact-form-title"
      className="
        relative
        isolate
        scroll-mt-24
        overflow-hidden

        bg-[#f6f8f8]

        py-16

        sm:scroll-mt-28
        sm:py-20
        lg:py-24
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
            MAIN LAYOUT
        ============================================================ */}

        <div
          className="
            grid
            gap-10

            pt-10

            lg:grid-cols-[0.7fr_1.3fr]
            lg:items-start
            lg:gap-14
            lg:pt-12

            xl:gap-20
          "
        >
          {/* =========================================================
              INTRO
          ========================================================== */}

          <div
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
                  text-[#167394]
                "
              >
                شروع ارتباط
              </p>
            </div>

            <h2
              id="contact-form-title"
              className="
                max-w-[600px]

                text-[30px]
                font-black
                leading-[1.72]
                tracking-[-0.045em]

                text-[#10242c]

                sm:text-[36px]

                lg:text-[42px]
                lg:leading-[1.62]
              "
            >
              موضوع را روشن بنویسید؛{" "}
              <span className="text-[#167394]">
                ادامه مسیر از همین‌جا مشخص می‌شود.
              </span>
            </h2>

            <p
              className="
                mt-5
                max-w-[520px]

                text-[15px]
                font-medium
                leading-[2]

                text-[#687a80]
              "
            >
              اطلاعات اولیه کمک می‌کند موضوع شما قبل از برقراری ارتباط مستقیم،
              در چارچوب مناسب بررسی شود.
            </p>

            {/* =======================================================
                TRUST REGISTER
            ======================================================== */}

            <div
              className="
                mt-8

                border-y
                border-[#167394]/10
              "
            >
              <TrustRow
                icon={ShieldCheck}
                title="بررسی محرمانه"
                description="اطلاعات این فرم فقط برای بررسی اولیه درخواست استفاده می‌شود."
              />

              <TrustRow
                icon={Fingerprint}
                title="شناسه پیگیری"
                description="در صورت ثبت موفق، شناسه مرجع درخواست نمایش داده می‌شود."
                accent
              />
            </div>

            {/* reference marker */}

            <div
              className="
                mt-6
                flex
                items-center
                gap-3
              "
            >
              <span
                aria-hidden="true"
                className="
                  h-[6px]
                  w-[6px]
                  bg-[#fc8502]
                "
              />

              <p
                className="
                  text-[13px]
                  font-medium
                  leading-6
                  text-[#718187]
                "
              >
                از درج اطلاعات بانکی، رمزها یا داده‌های حساس غیرضروری خودداری
                کنید.
              </p>
            </div>
          </div>

          {/* =========================================================
              FORM SHEET
          ========================================================== */}

          <div
            className="
              relative
              overflow-hidden

              border
              border-[#167394]/14

              bg-white

              shadow-[0_28px_80px_rgba(3,55,70,.065)]
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

                bg-[linear-gradient(90deg,#fc8502_0_18%,#167394_18%_100%)]
              "
            />



            {/* =======================================================
                FORM
            ======================================================== */}

            <form
              onSubmit={submit}
              noValidate
              aria-label="فرم تماس با DNH"
              className="
                px-5
                py-6

                sm:px-7
                sm:py-7

                lg:px-8
                lg:py-8
              "
            >
              {/* -----------------------------------------------------
                  IDENTITY
              ------------------------------------------------------ */}

              <fieldset>
                <legend
                  className="
                    mb-5
                    flex
                    items-center
                    gap-3

                    text-[13px]
                    font-black
                    text-[#31545e]
                  "
                >
                  <span
                    aria-hidden="true"
                    className="
                      h-[6px]
                      w-[6px]
                      bg-[#fc8502]
                    "
                  />
                  اطلاعات تماس
                </legend>

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
                    placeholder="مثلاً آرمان احمدی"
                    error={result?.errors?.name}
                  />

                  <FormField
                    label="شماره موبایل"
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

                  <FormField
                    label="موضوع"
                    name="subject"
                    autoComplete="off"
                    hint="اختیاری"
                    placeholder="موضوع درخواست"
                    error={result?.errors?.subject}
                  />
                </div>
              </fieldset>

              {/* -----------------------------------------------------
                  MESSAGE
              ------------------------------------------------------ */}

              <fieldset
                className="
                  mt-7
                  border-t
                  border-[#167394]/10
                  pt-6
                "
              >
                <legend
                  className="
                    mb-5

                    bg-white
                    pl-3

                    text-[13px]
                    font-black
                    text-[#31545e]
                  "
                >
                  شرح درخواست
                </legend>

                <FormField
                  label="توضیح کوتاه درباره موضوع"
                  name="message"
                  multiline
                  required
                  minLength={10}
                  maxLength={3000}
                  placeholder="مسئله، زمینه تصمیم و آنچه از DNH انتظار دارید را بنویسید…"
                  error={result?.errors?.message}
                />
              </fieldset>

              {/* =====================================================
                  STATUS
              ====================================================== */}

              {result?.message ? (
                <div className="mt-6">
                  <FormStatus
                    kind={result.ok ? "success" : "error"}
                    message={result.message}
                    reference={result.reference}
                  />
                </div>
              ) : null}

              {/* =====================================================
                  SUBMIT AREA
              ====================================================== */}

              <div
                className="
                  mt-7

                  flex
                  flex-col
                  gap-4

                  border-t
                  border-[#167394]/10

                  pt-6

                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <ActionButton
                  type="submit"
                  variant="primary"
                  size="md"
                  icon={ArrowLeft}
                  loading={pending}
                  disabled={pending}
                  className="
                    w-full

                    sm:w-auto
                    sm:min-w-[220px]
                  "
                >
                  {pending ? "در حال ثبت…" : "ثبت درخواست محرمانه"}
                </ActionButton>

                <p
                  className="
                    max-w-[320px]

                    text-[13px]
                    font-medium
                    leading-6

                    text-[#718187]
                  "
                >
                  پیش از ارسال، اطلاعات واردشده را یک‌بار بررسی کنید.
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
                border-[#167394]/10

                bg-[#f9fbfb]

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
                  bottom-0
                  right-0
                  top-0

                  w-[3px]

                  bg-[#fc8502]
                "
              />

              <p
                className="
                  text-[13px]
                  font-medium
                  leading-7

                  text-[#65777d]
                "
              >
                با ثبت این فرم، با تماس DNH درباره همین درخواست موافقت می‌کنید.
                از ارسال رمز، اطلاعات بانکی یا اطلاعات حساس غیرمرتبط خودداری
                کنید.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   TRUST ROW
============================================================================= */

function TrustRow({
  icon: Icon,
  title,
  description,
  accent = false,
}: {
  icon: typeof ShieldCheck;
  title: string;
  description: string;
  accent?: boolean;
}) {
  return (
    <div
      className="
        group/trust

        grid
        grid-cols-[38px_1fr]
        gap-4

        border-b
        border-[#167394]/[0.08]

        py-5

        last:border-b-0
      "
    >
      <span
        aria-hidden="true"
        className="
          grid
          size-9
          place-items-center

          border
          border-[#167394]/10

          bg-white
        "
      >
        <Icon
          strokeWidth={1.6}
          className={`
            size-[16px]

            ${accent ? "text-[#fc8502]" : "text-[#167394]"}
          `}
        />
      </span>

      <div>
        <p
          className="
            text-[14px]
            font-black
            text-[#31545e]
          "
        >
          {title}
        </p>

        <p
          className="
            mt-1
            max-w-[430px]

            text-[13px]
            font-medium
            leading-6

            text-[#718187]
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
          background:
            "radial-gradient(circle at 12% 35%,rgba(22,115,148,.045),transparent 25%),linear-gradient(180deg,#f6f8f8 0%,#ffffff 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.025]
        "
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(22,115,148,.22) 1px,transparent 1px)",
          backgroundSize: "118px 100%",
        }}
      />
    </>
  );
}
