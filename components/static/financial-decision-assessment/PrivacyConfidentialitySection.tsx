"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import {
  ArrowLeft,
  Check,
  Clock3,
  EyeOff,
  FileText,
  Layers3,
  LockKeyhole,
  LucideIcon,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   What is useful in the first assessment
============================================================================= */

const NEEDED_ITEMS = [
  {
    title: "اطلاعات پایه",
    description: "نام، نوع مخاطب و روش ترجیحی ارتباط برای شناخت اولیه درخواست.",
    icon: UserRound,
  },
  {
    title: "موضوع تصمیم",
    description:
      "مسئله اصلی، وضعیت فعلی و توضیح کوتاهی از موقعیتی که با آن روبه‌رو هستید.",
    icon: Layers3,
  },
  {
    title: "زمان و فوریت",
    description:
      "افق زمانی تصمیم و میزان فوریتی که در حال حاضر برای شما وجود دارد.",
    icon: Clock3,
  },
  {
    title: "دامنه تقریبی",
    description:
      "در صورت مرتبط بودن، یک تصویر کلی از اندازه تصمیم یا سرمایه؛ بدون ورود به جزئیات کامل.",
    icon: FileText,
  },
] as const;

/* =============================================================================
   What should NOT be sent initially
============================================================================= */

const NOT_NEEDED_ITEMS = [
  {
    title: "اطلاعات کامل بانکی",
    description: "شماره حساب، اطلاعات ورود، رمز یا سایر اطلاعات حساس بانکی.",
  },
  {
    title: "اسناد هویتی غیرضروری",
    description:
      "تصویر مدارک هویتی یا مستنداتی که برای شناخت اولیه مسئله لازم نیستند.",
  },
  {
    title: "قراردادهای محرمانه",
    description:
      "قراردادها و اسناد محرمانه کسب‌وکار در مرحله اولیه Assessment نیاز نیستند.",
  },
  {
    title: "جزئیات کامل دارایی‌ها",
    description:
      "لیست کامل دارایی‌ها، حساب‌ها و اطلاعات جزئی مالی در این مرحله ضروری نیست.",
  },
  {
    title: "اطلاعات حساس شرکا",
    description: "اطلاعات خصوصی یا محرمانه شرکا، سهام‌داران یا سایر اشخاص.",
  },
  {
    title: "فایل‌های مالی گسترده",
    description:
      "صورت‌های مالی گسترده و مجموعه فایل‌های تحلیلی در مرحله آغازین درخواست نمی‌شوند.",
  },
] as const;

/* =============================================================================
   Section
============================================================================= */

export function PrivacyConfidentialitySection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;

    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        setVisible(true);
        observer.disconnect();
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="privacy-confidentiality"
      dir="rtl"
      aria-labelledby="privacy-confidentiality-title"
      className="
        relative
        isolate
        overflow-hidden

        bg-[#032f3f]
        text-white
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
            Header
        ======================================================== */}

        <div
          className="
            grid
            gap-8

            lg:grid-cols-[0.84fr_1.16fr]
            lg:items-end
            lg:gap-16
          "
        >
          <Reveal visible={visible} delay={40}>
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

                <span
                  className="
                    text-[10px]
                    font-black

                    text-white/70

                    sm:text-[11px]
                  "
                >
                  حریم اطلاعات و محرمانگی
                </span>
              </div>

              <h2
                id="privacy-confidentiality-title"
                className="
                  max-w-[720px]

                  text-[32px]
                  font-black
                  leading-[1.62]
                  tracking-[-0.045em]

                  text-white

                  sm:text-[39px]

                  lg:text-[46px]
                  lg:leading-[1.5]

                  xl:text-[51px]
                "
              >
                برای شناخت مسئله،
                <br />
                لازم نیست{" "}
                <span className="text-brand-accent">
                  همه‌چیز را به اشتراک بگذارید.
                </span>
              </h2>
            </div>
          </Reveal>

          <Reveal visible={visible} delay={110}>
            <div className="lg:pb-1">
              <p
                className="
                  max-w-[690px]

                  text-[13px]
                  font-medium
                  leading-[2.2]

                  text-white/60

                  sm:text-[14px]

                  lg:text-[15px]
                "
              >
                مرحله اول Assessment فقط برای شناخت موقعیت، مسئله و تناسب اولیه
                طراحی شده است. اطلاعات دقیق‌تر زمانی مطرح می‌شوند که دامنه
                همکاری روشن شده باشد و واقعاً برای بررسی پرونده ضرورت داشته
                باشند.
              </p>

              <div
                className="
                  mt-6

                  flex
                  items-start
                  gap-3
                "
              >
                <ShieldCheck
                  aria-hidden="true"
                  className="
                    mt-1
                    h-4
                    w-4
                    shrink-0

                    text-[#83cce3]
                  "
                  strokeWidth={1.5}
                />

                <p
                  className="
                    max-w-[590px]

                    text-[10px]
                    font-medium
                    leading-[2]

                    text-white/40
                  "
                >
                  محرمانگی اطلاعات مالی و تجاری از اصول همکاری است و اطلاعات در
                  چارچوب توافق و نیاز حرفه‌ای پرونده مدیریت می‌شوند.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* =======================================================
            Confidentiality boundary
        ======================================================== */}

        <div
          className="
            mt-12

            sm:mt-14

            lg:mt-16
          "
        >
          <div
            className={`
              group/boundary

              relative
              overflow-hidden

              border
              border-white/12

              bg-white/[0.035]

              shadow-[0_30px_90px_rgba(0,0,0,.14)]

              transition-[opacity,transform,border-color,box-shadow]
              duration-700
              ease-[cubic-bezier(.22,1,.36,1)]

              hover:-translate-y-[3px]
              hover:border-white/22
              hover:shadow-[0_38px_110px_rgba(0,0,0,.20)]

              ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }

              motion-reduce:translate-y-0
              motion-reduce:opacity-100
              motion-reduce:transition-none
            `}
            style={{
              transitionDelay: "170ms",
            }}
          >
            {/* top accent */}

            <div
              aria-hidden="true"
              className="
                absolute
                inset-x-0
                top-0

                flex
                h-[3px]
              "
            >
              <span
                className="
                  w-1/2

                  bg-[#70c4dd]
                "
              />

              <span
                className="
                  w-1/2

                  bg-brand-accent
                "
              />
            </div>

            {/* ===================================================
                Top legend
            ==================================================== */}

            <div
              className="
                grid
                gap-px

                border-b
                border-white/12

                bg-white/10

                md:grid-cols-[1fr_94px_1fr]
              "
            >
              <BoundaryHeader
                type="needed"
                title="برای شروع مفید است"
                en="USEFUL AT THIS STAGE"
              />

              <div
                className="
                  hidden

                  items-center
                  justify-center

                  bg-[#043849]

                  md:flex
                "
              >
                <LockKeyhole
                  className="
                    h-4
                    w-4

                    text-white/40
                  "
                  strokeWidth={1.5}
                />
              </div>

              <BoundaryHeader
                type="avoid"
                title="در این مرحله ارسال نکنید"
                en="NOT REQUIRED NOW"
              />
            </div>

            {/* ===================================================
                Main body
            ==================================================== */}

            <div
              className="
                relative

                grid

                md:grid-cols-[1fr_94px_1fr]
              "
            >
              {/* -------------------------------------------------
                  Needed
              -------------------------------------------------- */}

              <div
                className="
                  divide-y
                  divide-white/10
                "
              >
                {NEEDED_ITEMS.map((item, index) => (
                  <NeededRow
                    key={item.title}
                    item={item}
                    index={index}
                    visible={visible}
                  />
                ))}
              </div>

              {/* -------------------------------------------------
                  Boundary
              -------------------------------------------------- */}

              <BoundaryRail />

              {/* -------------------------------------------------
                  Not needed
              -------------------------------------------------- */}

              <div
                className="
                  divide-y
                  divide-white/10

                  border-t
                  border-white/12

                  md:border-t-0
                "
              >
                {NOT_NEEDED_ITEMS.map((item, index) => (
                  <NotNeededRow
                    key={item.title}
                    item={item}
                    index={index}
                    visible={visible}
                  />
                ))}
              </div>
            </div>

            {/* ===================================================
                Bottom statement
            ==================================================== */}

            <div
              className="
                group/statement

                flex
                flex-col
                gap-5

                border-t
                border-white/12

                bg-black/[0.08]

                px-5
                py-6

                sm:flex-row
                sm:items-center
                sm:justify-between
                sm:px-7

                lg:px-8
              "
            >
              <div
                className="
                  flex
                  items-start
                  gap-4
                "
              >
                <span
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0

                    items-center
                    justify-center

                    bg-brand-primary

                    text-white
                  "
                >
                  <EyeOff className="h-4 w-4" strokeWidth={1.5} />
                </span>

                <div>
                  <p
                    dir="ltr"
                    className="
                      text-right
                      text-[7px]
                      font-black
                      tracking-[0.18em]

                      text-brand-accent
                    "
                  >
                    PRIVACY BY NECESSITY
                  </p>

                  <p
                    className="
                      mt-2
                      max-w-[720px]

                      text-[11px]
                      font-black
                      leading-[2]

                      text-white

                      sm:text-[12px]
                    "
                  >
                    اصل ساده است: در هر مرحله فقط اطلاعاتی درخواست شود که برای
                    همان مرحله واقعاً لازم است.
                  </p>
                </div>
              </div>

              <span
                aria-hidden="true"
                className="
                  hidden

                  h-px
                  w-20
                  shrink-0

                  bg-brand-accent/50

                  transition-[width]
                  duration-500

                  group-hover/statement:w-28

                  sm:block
                "
              />
            </div>
          </div>
        </div>

        {/* =======================================================
            Confidence strip
        ======================================================== */}

        <Reveal visible={visible} delay={620}>
          <div
            className="
              mt-6

              grid
              gap-px

              border
              border-white/12

              bg-white/10

              sm:grid-cols-3
            "
          >
            <TrustPoint
              icon={LockKeyhole}
              title="حداقل اطلاعات لازم"
              text="فرم اولیه برای شناخت مسئله است، نه جمع‌آوری پرونده کامل."
            />

            <TrustPoint
              icon={EyeOff}
              title="اطلاعات حساس بعداً"
              text="فقط در صورت ضرورت حرفه‌ای و روشن‌شدن دامنه بررسی."
            />

            <TrustPoint
              icon={ShieldCheck}
              title="محرمانگی به‌عنوان اصل"
              text="مدیریت اطلاعات در چارچوب همکاری و نیاز پرونده."
            />
          </div>
        </Reveal>

        {/* =======================================================
            Navigation
        ======================================================== */}

        <Reveal visible={visible} delay={690}>
          <div
            className="
              mt-8

              flex
              flex-col
              gap-5

              border-t
              border-white/12

              pt-6

              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div>
              <p
                className="
                  text-[10px]
                  font-medium

                  text-white/35
                "
              >
                هنوز Assessment را تکمیل نکرده‌اید؟
              </p>

              <a
                href="#assessment-form"
                className="
                  mt-2
                  inline-flex
                  items-center
                  gap-2

                  text-[10px]
                  font-black

                  text-[#83cce3]

                  outline-none

                  transition-colors

                  hover:text-brand-accent

                  focus-visible:ring-2
                  focus-visible:ring-focus/50
                "
              >
                بازگشت به فرم ارزیابی
                <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.6} />
              </a>
            </div>

            <ActionButton
              href="#after-submission"
              variant="secondary"
              size="md"
              icon={ArrowLeft}
              className="
                w-full

                border-white/25
                bg-white/[0.05]

                text-white

                shadow-none

                hover:border-brand-accent/45
                hover:bg-brand-accent/[0.09]
               

                sm:w-auto
                sm:min-w-[225px]
              "
            >
              بعد از ارسال چه می‌شود؟
            </ActionButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =============================================================================
   Boundary Header
============================================================================= */

function BoundaryHeader({
  type,
  title,
  en,
}: {
  type: "needed" | "avoid";
  title: string;
  en: string;
}) {
  return (
    <div
      className="
        bg-[#043849]

        px-5
        py-5

        sm:px-7

        lg:px-8
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
          className={`
            flex
            h-8
            w-8

            items-center
            justify-center

            border

            ${
              type === "needed"
                ? "border-[#70c4dd]/30 bg-[#70c4dd]/[0.08] text-[#8bd3e7]"
                : "border-brand-accent/30 bg-brand-accent/[0.08] text-brand-accent"
            }
          `}
        >
          {type === "needed" ? (
            <Check className="h-3.5 w-3.5" strokeWidth={2} />
          ) : (
            <X className="h-3.5 w-3.5" strokeWidth={2} />
          )}
        </span>

        <div>
          <p
            className="
              text-[11px]
              font-black

              text-white
            "
          >
            {title}
          </p>

          <p
            dir="ltr"
            className="
              mt-1

              text-right
              text-[6px]
              font-bold
              tracking-[0.16em]

              text-white/27
            "
          >
            {en}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =============================================================================
   Needed Row
============================================================================= */

function NeededRow({
  item,
  index,
  visible,
}: {
  item: {
    title: string;
    description: string;
    icon: LucideIcon;
  };
  index: number;
  visible: boolean;
}) {
  const Icon = item.icon;

  return (
    <div
      className={`
        group/needed

        relative

        flex
        items-start
        gap-4

        bg-white/[0.025]

        px-5
        py-5

        transition-[opacity,transform,background-color]
        duration-700
        ease-[cubic-bezier(.22,1,.36,1)]

        hover:bg-[#67bad3]/[0.07]

        sm:px-7

        lg:px-8

        ${visible ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"}
      `}
      style={{
        transitionDelay: `${250 + index * 65}ms`,
      }}
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

          bg-[#70c4dd]

          transition-transform
          duration-400

          group-hover/needed:scale-y-100
        "
      />

      <span
        className="
          flex
          h-10
          w-10
          shrink-0

          items-center
          justify-center

          border
          border-[#70c4dd]/20

          bg-[#70c4dd]/[0.055]

          text-[#86cfe4]

          transition-[background-color,border-color,color,transform]
          duration-300

          group-hover/needed:-translate-y-0.5
          group-hover/needed:border-[#70c4dd]
          group-hover/needed:bg-[#70c4dd]
          group-hover/needed:text-[#032f3f]
        "
      >
        <Icon className="h-4 w-4" strokeWidth={1.5} />
      </span>

      <div>
        <h3
          className="
            text-[11px]
            font-black

            text-white
          "
        >
          {item.title}
        </h3>

        <p
          className="
            mt-2

            text-[9px]
            font-medium
            leading-[1.95]

            text-white/42

            sm:text-[10px]
          "
        >
          {item.description}
        </p>
      </div>
    </div>
  );
}

/* =============================================================================
   Not needed row
============================================================================= */

function NotNeededRow({
  item,
  index,
  visible,
}: {
  item: {
    title: string;
    description: string;
  };
  index: number;
  visible: boolean;
}) {
  return (
    <div
      className={`
        group/avoid

        relative

        flex
        items-start
        gap-4

        bg-white/[0.018]

        px-5
        py-5

        transition-[opacity,transform,background-color]
        duration-700
        ease-[cubic-bezier(.22,1,.36,1)]

        hover:bg-brand-accent/[0.055]

        sm:px-7

        lg:px-8

        ${visible ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"}
      `}
      style={{
        transitionDelay: `${290 + index * 55}ms`,
      }}
    >
      <span
        aria-hidden="true"
        className="
          absolute
          inset-y-0
          left-0

          w-[2px]

          origin-bottom
          scale-y-0

          bg-brand-accent

          transition-transform
          duration-400

          group-hover/avoid:scale-y-100
        "
      />

      <span
        className="
          flex
          h-8
          w-8
          shrink-0

          items-center
          justify-center

          border
          border-brand-accent/20

          bg-brand-accent/[0.055]

          text-brand-accent

          transition-[background-color,border-color,color,transform]
          duration-300

          group-hover/avoid:-translate-y-0.5
          group-hover/avoid:border-brand-accent
          group-hover/avoid:bg-brand-accent
          group-hover/avoid:text-white
        "
      >
        <X className="h-3.5 w-3.5" strokeWidth={1.8} />
      </span>

      <div>
        <h3
          className="
            text-[10px]
            font-black

            text-white/82
          "
        >
          {item.title}
        </h3>

        <p
          className="
            mt-1.5

            text-[9px]
            font-medium
            leading-[1.9]

            text-white/36
          "
        >
          {item.description}
        </p>
      </div>
    </div>
  );
}

/* =============================================================================
   Boundary rail
============================================================================= */

function BoundaryRail() {
  return (
    <div
      aria-hidden="true"
      className="
        relative

        hidden

        border-x
        border-white/10

        bg-black/[0.08]

        md:block
      "
    >
      <span
        className="
          absolute
          bottom-0
          left-1/2
          top-0

          w-px

          -translate-x-1/2

          bg-white/12
        "
      />

      <span
        className="
          absolute
          left-1/2
          top-1/2

          flex
          h-12
          w-12

          -translate-x-1/2
          -translate-y-1/2

          items-center
          justify-center

          border
          border-white/14

          bg-[#06394a]

          text-brand-accent

          shadow-[0_0_0_8px_rgba(3,47,63,.75)]

          transition-[border-color,transform]
          duration-300

          group-hover/boundary:border-brand-accent/45
          group-hover/boundary:scale-105
        "
      >
        <LockKeyhole className="h-4 w-4" strokeWidth={1.5} />
      </span>

      <span
        className="
          absolute
          left-1/2
          top-[18%]

          h-[6px]
          w-[6px]

          -translate-x-1/2

          bg-[#70c4dd]
        "
      />

      <span
        className="
          absolute
          bottom-[18%]
          left-1/2

          h-[6px]
          w-[6px]

          -translate-x-1/2

          bg-brand-accent
        "
      />
    </div>
  );
}

/* =============================================================================
   Trust point
============================================================================= */

function TrustPoint({
  icon: Icon,
  title,
  text,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <div
      className="
        group/trust

        bg-[#043647]

        px-5
        py-5

        transition-colors
        duration-300

        hover:bg-[#064055]

        sm:px-6
      "
    >
      <div
        className="
          flex
          items-start
          gap-4
        "
      >
        <span
          className="
            flex
            h-9
            w-9
            shrink-0

            items-center
            justify-center

            border
            border-white/12

            text-[#82cbe2]

            transition-[background-color,border-color,color,transform]
            duration-300

            group-hover/trust:-translate-y-0.5
            group-hover/trust:border-brand-primary
            group-hover/trust:bg-brand-primary
            group-hover/trust:text-white
          "
        >
          <Icon className="h-4 w-4" strokeWidth={1.5} />
        </span>

        <div>
          <h3
            className="
              text-[10px]
              font-black

              text-white
            "
          >
            {title}
          </h3>

          <p
            className="
              mt-2

              text-[9px]
              font-medium
              leading-[1.9]

              text-white/38
            "
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =============================================================================
   Reveal
============================================================================= */

function Reveal({
  children,
  visible,
  delay,
}: {
  children: ReactNode;
  visible: boolean;
  delay: number;
}) {
  return (
    <div
      className={`
        transition-[opacity,transform]
        duration-700
        ease-[cubic-bezier(.22,1,.36,1)]

        ${visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}

        motion-reduce:translate-y-0
        motion-reduce:opacity-100
        motion-reduce:transition-none
      `}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* =============================================================================
   Background
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
            "radial-gradient(circle at 18% 38%,rgba(22,115,148,.22),transparent 29%),linear-gradient(115deg,#022b39 0%,#033747 50%,#022f3e 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.08]
        "
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,.09) 1px,transparent 1px)",
          backgroundSize: "118px 100%",
        }}
      />

      <span
        aria-hidden="true"
        className="
          absolute
          right-[17%]
          top-0

          h-[7px]
          w-[2px]

          bg-brand-accent
        "
      />
    </>
  );
}
