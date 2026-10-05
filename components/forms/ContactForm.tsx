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
    <main
      dir="rtl"
      className="
        relative
        isolate
        min-h-screen
        overflow-hidden

        bg-[linear-gradient(180deg,var(--dnh-bg-soft),white_38%)]
      "
    >
      <ContactAtmosphere />

      <section
        className="
          relative
          z-10

          mx-auto
          max-w-[1240px]

          px-5
          pb-16
          pt-[132px]

          sm:px-8
          sm:pb-20
          sm:pt-[145px]

          lg:px-12
          lg:pb-24
          lg:pt-[160px]
        "
      >
        <div
          className="
            grid
            gap-10

            lg:grid-cols-[0.76fr_1.24fr]
            lg:gap-16

            xl:gap-20
          "
        >
          {/* ===============================================================
              INTRO
          ================================================================ */}

          <header
            className="
              dnh-contact-intro

              lg:sticky
              lg:top-32
              lg:self-start
            "
          >
            <div
              className="
                mb-6
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
                  tracking-[0.04em]
                  text-brand-primary

                  sm:text-[11px]
                "
              >
                ارتباط محرمانه با DNH
              </span>
            </div>

            <h1
              className="
                max-w-[560px]

                text-[34px]
                font-black
                leading-[1.6]
                tracking-[-0.04em]

                text-ink

                sm:text-[42px]

                lg:text-[48px]
              "
            >
              مسئله را روشن بنویسید؛
              <br />
              <span className="text-brand-primary">
                گفت‌وگو از همین‌جا آغاز می‌شود.
              </span>
            </h1>

            <p
              className="
                mt-6
                max-w-[520px]

                text-[13px]
                font-medium
                leading-[2.15]

                text-ink-muted

                sm:text-[14px]
              "
            >
              این فرم برای شروع یک گفت‌وگوی دقیق درباره تصمیم‌های مالی، ساختار
              سرمایه یا معماری ثروت شماست. اطلاعات فقط برای بررسی اولیه استفاده
              می‌شود.
            </p>

            {/* -------------------------------------------------------------
                TRUST
            -------------------------------------------------------------- */}

            <div
              className="
                mt-8
                grid
                gap-px

                border
                border-line

                bg-line

                sm:grid-cols-2
                lg:grid-cols-1
                xl:grid-cols-2
              "
            >
              <TrustItem
                icon={ShieldCheck}
                title="بررسی محرمانه"
                description="جزئیات درخواست شما عمومی نخواهد شد."
                delay="320ms"
              />

              <TrustItem
                icon={Fingerprint}
                title="ارجاع قابل پیگیری"
                description="پس از ثبت، یک شناسه مرجع دریافت می‌کنید."
                accent
                delay="410ms"
              />
            </div>

            {/* -------------------------------------------------------------
                SIGNATURE
            -------------------------------------------------------------- */}

            <div
              aria-hidden="true"
              className="
                mt-8
                hidden
                items-center
                gap-4

                lg:flex
              "
            >
              <span
                className="
                  h-px
                  flex-1
                  bg-line
                "
              />

              <span
                className="
                  h-2
                  w-2
                  bg-brand-accent
                "
              />

              <span
                className="
                  text-[8px]
                  font-bold
                  tracking-[0.18em]
                  text-brand-primary/40
                "
              >
                DNH
              </span>
            </div>
          </header>

          {/* ===============================================================
              FORM
          ================================================================ */}

          <div
            className="
              dnh-contact-form

              relative

              border
              border-line

              bg-white/[0.92]

              p-5

              shadow-[0_28px_90px_color-mix(in_srgb,var(--dnh-primary)_10%,transparent)]

              backdrop-blur-[14px]

              sm:p-8

              lg:p-10
            "
          >
            {/* top accent */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none

                absolute
                inset-x-0
                top-0

                h-[3px]

                bg-[linear-gradient(90deg,var(--dnh-accent)_0_14%,var(--dnh-primary)_14_100%)]
              "
            />

            {/* corner detail */}
            <span
              aria-hidden="true"
              className="
                pointer-events-none

                absolute
                left-0
                top-0

                h-8
                w-px

                bg-brand-accent
              "
            />

            {/* -------------------------------------------------------------
                FORM HEADER
            -------------------------------------------------------------- */}

            <div
              className="
                mb-8

                flex
                items-start
                justify-between
                gap-6

                border-b
                border-line

                pb-6
              "
            >
              <div>
                <p
                  className="
                    text-[12px]
                    font-black
                    text-brand-primary
                  "
                >
                  فرم ارتباط راهبردی
                </p>

                <p
                  className="
                    mt-2
                    text-[11px]
                    font-medium
                    leading-6
                    text-ink-muted
                  "
                >
                  فیلدهای الزامی را تکمیل کنید.
                </p>
              </div>

              <span
                className="
                  hidden
                  shrink-0

                  text-[9px]
                  font-bold
                  tracking-[0.14em]
                  text-ink-muted/60

                  sm:block
                "
              >
                فرم / ارتباط
              </span>
            </div>

            {/* -------------------------------------------------------------
                FORM — logic unchanged
            -------------------------------------------------------------- */}

            <form
              onSubmit={submit}
              noValidate
              aria-label="فرم تماس با DNH"
              className="space-y-5"
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

              <FormField
                label="شرح درخواست"
                name="message"
                multiline
                required
                minLength={10}
                maxLength={3000}
                placeholder="مسئله، زمینه تصمیم و آنچه از DNH انتظار دارید را بنویسید…"
                error={result?.errors?.message}
              />

              {/* Status */}
              {result?.message ? (
                <div
                  key={`${result.ok}-${result.reference ?? result.message}`}
                  className="
                    dnh-contact-status
                  "
                >
                  <FormStatus
                    kind={result.ok ? "success" : "error"}
                    message={result.message}
                    reference={result.reference}
                  />
                </div>
              ) : null}

              {/* Submit */}
              <div
                className="
                  flex
                  flex-col
                  gap-3

                  pt-2

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

                <span
                  className="
                    text-[10px]
                    font-medium
                    leading-5
                    text-ink-muted
                  "
                >
                  پیش از ارسال، اطلاعات واردشده را بررسی کنید.
                </span>
              </div>
            </form>

            {/* -------------------------------------------------------------
                PRIVACY NOTE
            -------------------------------------------------------------- */}

            <div
              className="
                relative

                mt-8

                border-t
                border-dashed
                border-line

                pt-5
              "
            >
              <span
                aria-hidden="true"
                className="
                  absolute
                  right-0
                  top-[-1px]

                  h-[2px]
                  w-8

                  bg-brand-accent
                "
              />

              <p
                className="
                  text-[11px]
                  font-medium
                  leading-[2]

                  text-ink-muted
                "
              >
                با ثبت این فرم، با تماس کارشناسی DNH درباره همین درخواست موافقت
                می‌کنید. از درج اطلاعات بانکی یا رمزهای شخصی خودداری کنید.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          MOTION
      ==================================================================== */}

      <style>{`
        @keyframes dnhContactIntro {
          from {
            opacity: 0;
            transform: translate3d(14px, 12px, 0);
          }

          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes dnhContactForm {
          from {
            opacity: 0;
            transform: translate3d(-16px, 16px, 0);
          }

          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes dnhContactTrust {
          from {
            opacity: 0;
            transform: translate3d(0, 8px, 0);
          }

          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes dnhContactStatus {
          from {
            opacity: 0;
            transform: translate3d(0, 6px, 0);
          }

          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        .dnh-contact-intro {
          opacity: 0;

          animation:
            dnhContactIntro
            680ms
            90ms
            cubic-bezier(.22, 1, .36, 1)
            forwards;
        }

        .dnh-contact-form {
          opacity: 0;

          animation:
            dnhContactForm
            760ms
            180ms
            cubic-bezier(.22, 1, .36, 1)
            forwards;
        }

        .dnh-contact-trust {
          opacity: 0;

          animation:
            dnhContactTrust
            520ms
            var(--dnh-trust-delay, 320ms)
            cubic-bezier(.22, 1, .36, 1)
            forwards;
        }

        .dnh-contact-status {
          animation:
            dnhContactStatus
            380ms
            cubic-bezier(.22, 1, .36, 1)
            both;
        }

        @media (prefers-reduced-motion: reduce) {
          .dnh-contact-intro,
          .dnh-contact-form,
          .dnh-contact-trust,
          .dnh-contact-status {
            opacity: 1;
            transform: none;
            animation: none;
          }
        }
      `}</style>
    </main>
  );
}

/* =============================================================================
   TRUST
============================================================================= */

function TrustItem({
  icon: Icon,
  title,
  description,
  accent = false,
  delay,
}: {
  icon: typeof ShieldCheck;
  title: string;
  description: string;
  accent?: boolean;
  delay: string;
}) {
  return (
    <div
      className="
        dnh-contact-trust

        group/trust

        bg-white

        p-5

        transition-[background-color,transform]
        duration-300

        hover:-translate-y-px
        hover:bg-surface-soft
      "
      style={
        {
          "--dnh-trust-delay": delay,
        } as React.CSSProperties
      }
    >
      <Icon
        aria-hidden="true"
        className={`
          mb-4
          h-5
          w-5

          transition-transform
          duration-300

          group-hover/trust:-translate-y-0.5

          ${accent ? "text-brand-accent" : "text-brand-primary"}
        `}
        strokeWidth={1.7}
      />

      <p
        className="
          text-[13px]
          font-black
          text-ink
        "
      >
        {title}
      </p>

      <p
        className="
          mt-2

          text-[11px]
          font-medium
          leading-6

          text-ink-muted
        "
      >
        {description}
      </p>
    </div>
  );
}

/* =============================================================================
   BACKGROUND
============================================================================= */

function ContactAtmosphere() {
  return (
    <>
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.34]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              color-mix(in srgb, var(--dnh-primary) 4%, transparent) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              color-mix(in srgb, var(--dnh-primary) 3%, transparent) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "78px 78px",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 72%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, transparent 72%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          right-[7%]
          top-[18%]

          h-[280px]
          w-[280px]

          bg-brand-primary/[0.05]

          blur-[100px]
        "
      />

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-x-0
          top-0

          h-px

          bg-gradient-to-r
          from-transparent
          via-brand-primary/25
          to-transparent
        "
      />
    </>
  );
}
