"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";

import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Check,
  Clock3,
  Mail,
  ShieldCheck,
  UserRound,
  UsersRound,
  WalletCards,
} from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";

/* =============================================================================
   Types
============================================================================= */

type AssessmentData = {
  audience: string;
  decisionTopic: string;
  currentSituation: string;
  decisionSize: string;
  horizon: string;
  urgency: string;
  name: string;
  email: string;
  contactMethod: string;
  shortDescription: string;
};

type Step = {
  key: string;
  title: string;
  eyebrow: string;
};

const STEPS: Step[] = [
  {
    key: "profile",
    title: "موقعیت شما",
    eyebrow: "PROFILE",
  },
  {
    key: "decision",
    title: "موضوع تصمیم",
    eyebrow: "DECISION",
  },
  {
    key: "timing",
    title: "زمان و فوریت",
    eyebrow: "HORIZON",
  },
  {
    key: "contact",
    title: "اطلاعات ارتباطی",
    eyebrow: "CONTACT",
  },
];

const AUDIENCE_OPTIONS = [
  {
    value: "individual",
    title: "فرد / سرمایه‌گذار",
    description: "برای تصمیم‌های مالی یا ساختار دارایی شخصی",
    icon: UserRound,
  },
  {
    value: "family",
    title: "خانواده / صاحبان سرمایه",
    description: "برای مسائل مربوط به ساختار ثروت و تصمیم‌های خانوادگی",
    icon: UsersRound,
  },
  {
    value: "business-owner",
    title: "صاحب کسب‌وکار",
    description: "برای تصمیم‌های مرتبط با سرمایه، نقدینگی یا کسب‌وکار",
    icon: BriefcaseBusiness,
  },
  {
    value: "company",
    title: "شرکت / هلدینگ",
    description: "برای ساختار مالی، سرمایه و تصمیم‌های سازمانی",
    icon: Building2,
  },
] as const;

const DECISION_TOPICS = [
  "ساختار ثروت و دارایی‌ها",
  "پرتفوی و تخصیص دارایی",
  "تصمیم مالی مهم",
  "نقدینگی و ساختار سرمایه",
  "ریسک و حفاظت از ثروت",
  "تصمیم مالی کسب‌وکار",
  "اقتصاد و محیط تصمیم",
  "موضوع دیگر",
] as const;

const HORIZON_OPTIONS = [
  "در حال حاضر / فوری",
  "۱ تا ۳ ماه آینده",
  "۳ تا ۱۲ ماه آینده",
  "بیش از یک سال",
  "هنوز مشخص نیست",
] as const;

const URGENCY_OPTIONS = [
  {
    value: "normal",
    title: "عادی",
    description: "موضوع مهم است اما محدودیت زمانی فوری ندارم.",
  },
  {
    value: "important",
    title: "مهم",
    description: "در ماه‌های آینده باید درباره آن تصمیم بگیرم.",
  },
  {
    value: "urgent",
    title: "فوری",
    description: "تصمیم یا رویداد مهمی در زمان نزدیک پیش رو دارم.",
  },
] as const;

const DECISION_SIZE_OPTIONS = [
  "در این مسئله مرتبط نیست",
  "ترجیح می‌دهم در این مرحله اعلام نکنم",
  "کمتر از ۵ میلیارد تومان",
  "۵ تا ۲۰ میلیارد تومان",
  "۲۰ تا ۱۰۰ میلیارد تومان",
  "بیش از ۱۰۰ میلیارد تومان",
] as const;

const INITIAL_DATA: AssessmentData = {
  audience: "",
  decisionTopic: "",
  currentSituation: "",
  decisionSize: "",
  horizon: "",
  urgency: "",
  name: "",
  email: "",
  contactMethod: "",
  shortDescription: "",
};

/* =============================================================================
   Component
============================================================================= */

export function AssessmentFormSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [visible, setVisible] = useState(false);

  const [step, setStep] = useState(0);

  const [data, setData] = useState<AssessmentData>(INITIAL_DATA);

  const [submitted, setSubmitted] = useState(false);

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
        threshold: 0.08,
        rootMargin: "0px 0px -6% 0px",
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const progress = ((step + 1) / STEPS.length) * 100;

  const currentStepValid = useMemo(() => {
    switch (step) {
      case 0:
        return Boolean(data.audience);

      case 1:
        return Boolean(
          data.decisionTopic && data.currentSituation.trim().length >= 10,
        );

      case 2:
        return Boolean(data.horizon && data.urgency);

      case 3:
        return Boolean(
          data.name.trim() &&
          data.email.trim() &&
          data.contactMethod &&
          data.shortDescription.trim().length >= 10,
        );

      default:
        return false;
    }
  }, [data, step]);

  function updateField<K extends keyof AssessmentData>(
    field: K,
    value: AssessmentData[K],
  ) {
    setData((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function nextStep() {
    if (!currentStepValid) return;

    setStep((current) => Math.min(current + 1, STEPS.length - 1));
  }

  function previousStep() {
    setStep((current) => Math.max(current - 1, 0));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!currentStepValid) return;

    /*
      TODO:
      اینجا بعداً Submission واقعی شما قرار می‌گیرد:

      await submitAssessment(data)

      و سپس:
      router.push("/financial-decision-assessment/success")

      فعلاً برای طراحی UI فقط Success State محلی داریم.
    */

    setSubmitted(true);
  }

  return (
    <section
      ref={sectionRef}
      id="assessment-form"
      dir="rtl"
      aria-labelledby="assessment-form-title"
      className="
        relative
        isolate
        overflow-hidden

        border-b
        border-line

        bg-page
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

          py-16

          sm:py-20

          lg:py-24

          xl:py-28

        "
      >
        {/* =======================================================
            Header
        ======================================================== */}

        <div
          className="
            grid
            gap-8

            lg:grid-cols-[0.78fr_1.22fr]
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

                    text-brand-primary

                    sm:text-[11px]
                  "
                >
                  شروع ارزیابی
                </span>
              </div>

              <h2
                id="assessment-form-title"
                className="
                  max-w-[720px]

                  text-[31px]
                  font-black
                  leading-[1.62]
                  tracking-[-0.045em]

                  text-ink

                  sm:text-[38px]

                  lg:text-[45px]
                  lg:leading-[1.5]

                  xl:text-[50px]
                "
              >
                چند سؤال کوتاه،
                <br />
                برای{" "}
                <span className="text-brand-primary">
                  شناخت بهتر موقعیت شما.
                </span>
              </h2>
            </div>
          </Reveal>

          <Reveal visible={visible} delay={100}>
            <p
              className="
                max-w-[680px]

                text-[13px]
                font-medium
                leading-[2.2]

                text-ink-muted

                sm:text-[14px]

                lg:text-[15px]
              "
            >
              لازم نیست در این مرحله همه اطلاعات مالی خود را آماده کنید. هدف فقط
              این است که مسئله، شرایط و مسیر مناسب اولیه را بهتر بشناسیم.
            </p>
          </Reveal>
        </div>

        {/* =======================================================
            Form environment
        ======================================================== */}

        <div
          className="
            mt-12

            grid
            gap-6

            sm:mt-14

            lg:mt-16
            lg:grid-cols-[0.31fr_0.69fr]
            lg:gap-7
          "
        >
          {/* =====================================================
              Sidebar
          ====================================================== */}

          <Reveal visible={visible} delay={150}>
            <aside
              className="
                lg:sticky
                lg:top-28
                lg:self-start
              "
            >
              <div
                className="
                  overflow-hidden

                  border
                  border-line

                  bg-white
                "
              >
                <div
                  className="
                    border-b
                    border-line

                    bg-brand-primary

                    px-5
                    py-6

                    text-white

                    sm:px-6
                  "
                >
                  <p
                    dir="ltr"
                    className="
                      text-[7px]
                      font-black
                      tracking-[0.18em]

                      text-white/45
                    "
                  >
                    ASSESSMENT PROGRESS
                  </p>

                  <p
                    className="
                      mt-2

                      text-[15px]
                      font-black
                    "
                  >
                    ارزیابی اولیه
                  </p>

                  <p
                    className="
                      mt-2

                      text-[9px]
                      font-medium
                      leading-[1.9]

                      text-white/50
                    "
                  >
                    اطلاعات این مرحله فقط برای شناخت اولیه مسئله استفاده
                    می‌شوند.
                  </p>
                </div>

                {/* steps */}

                <div>
                  {STEPS.map((item, index) => (
                    <ProgressStep
                      key={item.key}
                      item={item}
                      index={index}
                      current={step}
                    />
                  ))}
                </div>

                {/* privacy */}

                <div
                  className="
                    border-t
                    border-line

                    bg-surface-soft/60

                    px-5
                    py-5

                    sm:px-6
                  "
                >
                  <div
                    className="
                      flex
                      items-start
                      gap-3
                    "
                  >
                    <ShieldCheck
                      className="
                        mt-0.5
                        h-4
                        w-4
                        shrink-0

                        text-brand-primary
                      "
                      strokeWidth={1.5}
                    />

                    <div>
                      <p
                        className="
                          text-[10px]
                          font-black

                          text-ink
                        "
                      >
                        بدون اطلاعات حساس
                      </p>

                      <p
                        className="
                          mt-1

                          text-[8px]
                          font-medium
                          leading-[1.9]

                          text-ink-muted
                        "
                      >
                        اطلاعات بانکی، اسناد هویتی یا جزئیات کامل دارایی‌ها در
                        این مرحله نیاز نیست.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* next anchors */}

              <div
                className="
                  mt-4

                  hidden

                  border
                  border-line

                  bg-white

                  px-5
                  py-4

                  lg:block
                "
              >
                <p
                  className="
                    text-[8px]
                    font-bold

                    text-ink-muted
                  "
                >
                  اطلاعات بیشتر
                </p>

                <div
                  className="
                    mt-3

                    flex
                    flex-wrap
                    gap-x-4
                    gap-y-2
                  "
                >
                  <a
                    href="#privacy-confidentiality"
                    className="
                      text-[9px]
                      font-bold

                      text-brand-primary

                      transition-colors

                      hover:text-brand-accent
                    "
                  >
                    محرمانگی
                  </a>

                  <a
                    href="#after-submission"
                    className="
                      text-[9px]
                      font-bold

                      text-brand-primary

                      transition-colors

                      hover:text-brand-accent
                    "
                  >
                    بعد از ارسال
                  </a>
                </div>
              </div>
            </aside>
          </Reveal>

          {/* =====================================================
              Form
          ====================================================== */}

          <div
            className={`
              relative
              overflow-hidden

              border
              border-line

              bg-white

              shadow-[0_28px_80px_rgba(13,79,104,.08)]

              transition-[opacity,transform,box-shadow,border-color]
              duration-700
              ease-[cubic-bezier(.22,1,.36,1)]

              hover:border-brand-primary/20
              hover:shadow-[0_34px_96px_rgba(13,79,104,.11)]

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
              transitionDelay: "200ms",
            }}
          >
            {/* progress */}

            <div
              className="
                absolute
                inset-x-0
                top-0

                h-[3px]

                bg-brand-primary/[0.08]
              "
            >
              <span
                aria-hidden="true"
                className="
                  block
                  h-full

                  bg-brand-accent

                  transition-[width]
                  duration-500
                  ease-[cubic-bezier(.22,1,.36,1)]
                "
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit}>
                {/* form header */}

                <div
                  className="
                    flex
                    flex-col
                    gap-4

                    border-b
                    border-line

                    px-5
                    pb-5
                    pt-7

                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    sm:px-7

                    lg:px-8
                  "
                >
                  <div>
                    <p
                      dir="ltr"
                      className="
                        text-[7px]
                        font-black
                        tracking-[0.18em]

                        text-brand-primary/50
                      "
                    >
                      {STEPS[step]?.eyebrow}
                    </p>

                    <h3
                      className="
                        mt-2

                        text-[17px]
                        font-black

                        text-ink

                        sm:text-[19px]
                      "
                    >
                      {STEPS[step]?.title}
                    </h3>
                  </div>

                  <p
                    className="
                      text-[9px]
                      font-bold

                      text-ink-muted
                    "
                  >
                    مرحله {step + 1} از {STEPS.length}
                  </p>
                </div>

                {/* step */}

                <div
                  className="
                    min-h-[520px]

                    px-5
                    py-7

                    sm:px-7
                    sm:py-8

                    lg:px-8
                    lg:py-9
                  "
                >
                  {step === 0 && (
                    <ProfileStep
                      value={data.audience}
                      onChange={(value) => updateField("audience", value)}
                    />
                  )}

                  {step === 1 && (
                    <DecisionStep data={data} updateField={updateField} />
                  )}

                  {step === 2 && (
                    <TimingStep data={data} updateField={updateField} />
                  )}

                  {step === 3 && (
                    <ContactStep data={data} updateField={updateField} />
                  )}
                </div>

                {/* navigation */}

                <div
                  className="
                    flex
                    flex-col-reverse
                    gap-3

                    border-t
                    border-line

                    bg-surface-soft/40

                    px-5
                    py-5

                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    sm:px-7

                    lg:px-8
                  "
                >
                  {step > 0 ? (
                    <ActionButton
                      type="button"
                      onClick={previousStep}
                      variant="secondary"
                      size="md"
                      icon={ArrowRight}
                      className="
                        w-full

                        border-line
                        bg-white

                        shadow-none

                        sm:w-auto
                      "
                    >
                      مرحله قبل
                    </ActionButton>
                  ) : (
                    <span />
                  )}

                  {step < STEPS.length - 1 ? (
                    <ActionButton
                      type="button"
                      onClick={nextStep}
                      disabled={!currentStepValid}
                      variant="primary"
                      size="md"
                      icon={ArrowLeft}
                      className="
                        w-full

                        sm:w-auto
                        sm:min-w-[170px]

                        disabled:pointer-events-none
                        disabled:opacity-40
                      "
                    >
                      ادامه
                    </ActionButton>
                  ) : (
                    <ActionButton
                      type="submit"
                      disabled={!currentStepValid}
                      variant="assessment"
                      size="md"
                      icon={ArrowLeft}
                      className="
                        w-full

                        bg-brand-accent

                        text-white

                        sm:w-auto
                        sm:min-w-[210px]

                        disabled:pointer-events-none
                        disabled:opacity-40
                      "
                    >
                      ثبت ارزیابی اولیه
                    </ActionButton>
                  )}
                </div>
              </form>
            ) : (
              <SuccessState />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   STEP 01
============================================================================= */

function ProfileStep({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend
        className="
          text-[15px]
          font-black
          leading-[1.9]

          text-ink
        "
      >
        این ارزیابی را برای چه موقعیتی شروع می‌کنید؟
      </legend>

      <p
        className="
          mt-2
          max-w-[600px]

          text-[10px]
          font-medium
          leading-[2]

          text-ink-muted
        "
      >
        نزدیک‌ترین گزینه را انتخاب کنید. این انتخاب فقط برای تشخیص بهتر مسیر
        اولیه است.
      </p>

      <div
        className="
          mt-7

          grid
          gap-3

          sm:grid-cols-2
        "
      >
        {AUDIENCE_OPTIONS.map((option) => {
          const Icon = option.icon;

          const checked = value === option.value;

          return (
            <label
              key={option.value}
              className={`
                  group/option

                  relative
                  cursor-pointer

                  border

                  p-5

                  transition-[border-color,background-color,transform,box-shadow]
                  duration-300

                  hover:-translate-y-0.5

                  ${
                    checked
                      ? "border-brand-primary bg-brand-primary/[0.055] shadow-[0_12px_32px_rgba(16,103,136,.08)]"
                      : "border-line bg-white hover:border-brand-primary/35 hover:bg-surface-soft/40"
                  }
                `}
            >
              <input
                type="radio"
                name="audience"
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />

              <div
                className="
                    flex
                    items-start
                    justify-between
                    gap-4
                  "
              >
                <span
                  className={`
                      flex
                      h-10
                      w-10

                      items-center
                      justify-center

                      border

                      transition-colors

                      ${
                        checked
                          ? "border-brand-primary bg-brand-primary text-white"
                          : "border-line bg-surface-soft/60 text-brand-primary group-hover/option:border-brand-primary/30"
                      }
                    `}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </span>

                <span
                  className={`
                      flex
                      h-5
                      w-5

                      items-center
                      justify-center

                      border

                      ${
                        checked
                          ? "border-brand-accent bg-brand-accent text-white"
                          : "border-line text-transparent"
                      }
                    `}
                >
                  <Check className="h-3 w-3" strokeWidth={2} />
                </span>
              </div>

              <h4
                className="
                    mt-5

                    text-[12px]
                    font-black

                    text-ink
                  "
              >
                {option.title}
              </h4>

              <p
                className="
                    mt-2

                    text-[9px]
                    font-medium
                    leading-[1.9]

                    text-ink-muted
                  "
              >
                {option.description}
              </p>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/* =============================================================================
   STEP 02
============================================================================= */

function DecisionStep({
  data,
  updateField,
}: {
  data: AssessmentData;
  updateField: <K extends keyof AssessmentData>(
    field: K,
    value: AssessmentData[K],
  ) => void;
}) {
  return (
    <div>
      <StepTitle
        title="موضوع اصلی تصمیم شما چیست؟"
        description="نزدیک‌ترین موضوع را انتخاب کنید و در چند جمله وضعیت فعلی را توضیح دهید."
      />

      <div
        className="
          mt-7

          grid
          gap-3

          sm:grid-cols-2
        "
      >
        {DECISION_TOPICS.map((topic) => (
          <Choice
            key={topic}
            name="decisionTopic"
            label={topic}
            checked={data.decisionTopic === topic}
            onChange={() => updateField("decisionTopic", topic)}
          />
        ))}
      </div>

      <div className="mt-7">
        <FieldLabel
          htmlFor="currentSituation"
          title="وضعیت فعلی"
          helper="در چند جمله توضیح دهید الان در چه موقعیتی هستید."
        />

        <textarea
          id="currentSituation"
          name="currentSituation"
          rows={5}
          value={data.currentSituation}
          onChange={(event) =>
            updateField("currentSituation", event.target.value)
          }
          placeholder="برای مثال: مجموعه‌ای از دارایی‌ها دارم اما نسبت نقدینگی، ریسک و تخصیص آن‌ها برایم روشن نیست..."
          className={inputClassName}
        />
      </div>

      <div className="mt-7">
        <FieldLabel
          htmlFor="decisionSize"
          title="اندازه تقریبی سرمایه یا تصمیم"
          helper="اختیاری — فقط در صورتی که برای موضوع شما مرتبط باشد."
        />

        <select
          id="decisionSize"
          name="decisionSize"
          value={data.decisionSize}
          onChange={(event) => updateField("decisionSize", event.target.value)}
          className={inputClassName}
        >
          <option value="">انتخاب کنید</option>

          {DECISION_SIZE_OPTIONS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

/* =============================================================================
   STEP 03
============================================================================= */

function TimingStep({
  data,
  updateField,
}: {
  data: AssessmentData;
  updateField: <K extends keyof AssessmentData>(
    field: K,
    value: AssessmentData[K],
  ) => void;
}) {
  return (
    <div>
      <StepTitle
        title="این تصمیم چه افق زمانی و چه سطح فوریتی دارد؟"
        description="زمان تصمیم می‌تواند روی نوع بررسی و مسیر پیشنهادی اثر بگذارد."
      />

      <div className="mt-7">
        <FieldLabel
          title="افق زمانی"
          helper="چه زمانی احتمالاً نیاز دارید درباره این مسئله تصمیم بگیرید؟"
        />

        <div
          className="
            mt-3

            grid
            gap-3

            sm:grid-cols-2
          "
        >
          {HORIZON_OPTIONS.map((option) => (
            <Choice
              key={option}
              name="horizon"
              label={option}
              checked={data.horizon === option}
              onChange={() => updateField("horizon", option)}
            />
          ))}
        </div>
      </div>

      <div className="mt-8">
        <FieldLabel title="فوریت" helper="نزدیک‌ترین وضعیت را انتخاب کنید." />

        <div
          className="
            mt-3
            grid
            gap-3
          "
        >
          {URGENCY_OPTIONS.map((option) => (
            <label
              key={option.value}
              className={`
                  group/urgency

                  cursor-pointer

                  border
                  p-4

                  transition-[border-color,background-color,transform]
                  duration-300

                  hover:-translate-y-0.5

                  ${
                    data.urgency === option.value
                      ? "border-brand-primary bg-brand-primary/[0.05]"
                      : "border-line hover:border-brand-primary/30 hover:bg-surface-soft/45"
                  }
                `}
            >
              <input
                type="radio"
                name="urgency"
                value={option.value}
                checked={data.urgency === option.value}
                onChange={() => updateField("urgency", option.value)}
                className="sr-only"
              />

              <div
                className="
                    flex
                    items-start
                    gap-4
                  "
              >
                <span
                  className={`
                      mt-1
                      flex
                      h-5
                      w-5
                      shrink-0

                      items-center
                      justify-center

                      border

                      ${
                        data.urgency === option.value
                          ? "border-brand-accent bg-brand-accent text-white"
                          : "border-line text-transparent"
                      }
                    `}
                >
                  <Check className="h-3 w-3" />
                </span>

                <div>
                  <p
                    className="
                        text-[11px]
                        font-black

                        text-ink
                      "
                  >
                    {option.title}
                  </p>

                  <p
                    className="
                        mt-1

                        text-[9px]
                        font-medium
                        leading-[1.9]

                        text-ink-muted
                      "
                  >
                    {option.description}
                  </p>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =============================================================================
   STEP 04
============================================================================= */

function ContactStep({
  data,
  updateField,
}: {
  data: AssessmentData;
  updateField: <K extends keyof AssessmentData>(
    field: K,
    value: AssessmentData[K],
  ) => void;
}) {
  return (
    <div>
      <StepTitle
        title="برای ادامه مسیر، چطور با شما در ارتباط باشیم؟"
        description="فقط اطلاعات لازم برای بررسی اولیه درخواست شما دریافت می‌شود."
      />

      <div
        className="
          mt-7

          grid
          gap-5

          sm:grid-cols-2
        "
      >
        <div>
          <FieldLabel htmlFor="assessment-name" title="نام و نام خانوادگی" />

          <input
            id="assessment-name"
            name="name"
            autoComplete="name"
            value={data.name}
            onChange={(event) => updateField("name", event.target.value)}
            className={inputClassName}
          />
        </div>

        <div>
          <FieldLabel htmlFor="assessment-email" title="ایمیل" />

          <div className="relative">
            <input
              id="assessment-email"
              type="email"
              name="email"
              autoComplete="email"
              dir="ltr"
              value={data.email}
              onChange={(event) => updateField("email", event.target.value)}
              className={`${inputClassName} pl-11`}
            />

            <Mail
              aria-hidden="true"
              className="
                absolute
                left-4
                top-1/2

                h-4
                w-4

                -translate-y-1/2

                text-ink-muted/45
              "
              strokeWidth={1.5}
            />
          </div>
        </div>
      </div>

      <div className="mt-7">
        <FieldLabel title="روش ترجیحی ارتباط" />

        <div
          className="
            mt-3

            grid
            gap-3

            sm:grid-cols-3
          "
        >
          {["ایمیل", "تماس تلفنی", "پیام‌رسان"].map((option) => (
            <Choice
              key={option}
              name="contactMethod"
              label={option}
              checked={data.contactMethod === option}
              onChange={() => updateField("contactMethod", option)}
            />
          ))}
        </div>
      </div>

      <div className="mt-7">
        <FieldLabel
          htmlFor="shortDescription"
          title="توضیح کوتاه مسئله"
          helper="مهم‌ترین نکته‌ای که فکر می‌کنید باید پیش از بررسی بدانیم چیست؟"
        />

        <textarea
          id="shortDescription"
          name="shortDescription"
          rows={5}
          value={data.shortDescription}
          onChange={(event) =>
            updateField("shortDescription", event.target.value)
          }
          placeholder="موضوع یا تصمیمی که در حال حاضر بیشترین ابهام یا اهمیت را برای شما دارد..."
          className={inputClassName}
        />
      </div>

      <div
        className="
          mt-7

          flex
          items-start
          gap-3

          border
          border-brand-primary/15

          bg-surface-soft/55

          p-4
        "
      >
        <ShieldCheck
          aria-hidden="true"
          className="
            mt-0.5
            h-4
            w-4
            shrink-0

            text-brand-primary
          "
          strokeWidth={1.5}
        />

        <p
          className="
            text-[9px]
            font-medium
            leading-[1.9]

            text-ink-muted
          "
        >
          لطفاً در این فرم اطلاعات بانکی، رمز، اسناد هویتی، قراردادهای محرمانه
          یا جزئیات حساس طرف‌های دیگر را ارسال نکنید.
        </p>
      </div>
    </div>
  );
}

/* =============================================================================
   Success
============================================================================= */

function SuccessState() {
  return (
    <div
      className="
        flex
        min-h-[680px]
        flex-col
        items-center
        justify-center

        px-5
        py-16

        text-center

        sm:px-10
      "
    >
      <span
        className="
          flex
          h-16
          w-16

          items-center
          justify-center

          bg-brand-primary

          text-white
        "
      >
        <Check className="h-6 w-6" strokeWidth={1.7} />
      </span>

      <p
        dir="ltr"
        className="
          mt-7

          text-[7px]
          font-black
          tracking-[0.2em]

          text-brand-primary/50
        "
      >
        ASSESSMENT RECEIVED
      </p>

      <h3
        className="
          mt-3

          text-[23px]
          font-black

          text-ink

          sm:text-[28px]
        "
      >
        اطلاعات اولیه ثبت شد.
      </h3>

      <p
        className="
          mt-4
          max-w-[560px]

          text-[11px]
          font-medium
          leading-[2.1]

          text-ink-muted

          sm:text-[12px]
        "
      >
        مرحله بعد، بررسی اولیه موضوع، دامنه و تناسب درخواست است. جزئیات این مسیر
        در بخش بعدی توضیح داده شده است.
      </p>

      <div
        className="
          mt-8

          flex
          flex-col
          gap-3

          sm:flex-row
        "
      >
        <ActionButton
          href="#after-submission"
          variant="primary"
          size="md"
          icon={ArrowLeft}
        >
          بعد از ارسال چه می‌شود؟
        </ActionButton>

        <ActionButton
          href="#privacy-confidentiality"
          variant="secondary"
          size="md"
          icon={ShieldCheck}
        >
          محرمانگی اطلاعات
        </ActionButton>
      </div>
    </div>
  );
}

/* =============================================================================
   UI
============================================================================= */

function ProgressStep({
  item,
  index,
  current,
}: {
  item: Step;
  index: number;
  current: number;
}) {
  const active = index === current;

  const completed = index < current;

  return (
    <div
      className={`
        relative

        flex
        items-center
        gap-4

        border-b
        border-line

        px-5
        py-4

        transition-colors

        sm:px-6

        ${active ? "bg-brand-primary/[0.045]" : "bg-white"}
      `}
    >
      <span
        className={`
          flex
          h-8
          w-8
          shrink-0

          items-center
          justify-center

          border

          text-[9px]
          font-black

          ${
            completed
              ? "border-brand-primary bg-brand-primary text-white"
              : active
                ? "border-brand-accent bg-brand-accent text-white"
                : "border-line text-ink-muted/45"
          }
        `}
      >
        {completed ? <Check className="h-3.5 w-3.5" /> : <>0{index + 1}</>}
      </span>

      <div>
        <p
          className={`
            text-[10px]
            font-black

            ${active || completed ? "text-ink" : "text-ink-muted/55"}
          `}
        >
          {item.title}
        </p>

        <p
          dir="ltr"
          className="
            mt-1

            text-right
            text-[6px]
            font-bold
            tracking-[0.14em]

            text-ink-muted/30
          "
        >
          {item.eyebrow}
        </p>
      </div>
    </div>
  );
}

function StepTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <>
      <h4
        className="
          text-[15px]
          font-black
          leading-[1.9]

          text-ink

          sm:text-[17px]
        "
      >
        {title}
      </h4>

      <p
        className="
          mt-2
          max-w-[620px]

          text-[10px]
          font-medium
          leading-[2]

          text-ink-muted

          sm:text-[11px]
        "
      >
        {description}
      </p>
    </>
  );
}

function FieldLabel({
  htmlFor,
  title,
  helper,
}: {
  htmlFor?: string;
  title: string;
  helper?: string;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="
          text-[10px]
          font-black

          text-ink
        "
      >
        {title}
      </label>

      {helper ? (
        <p
          className="
            mt-1

            text-[8px]
            font-medium
            leading-[1.8]

            text-ink-muted
          "
        >
          {helper}
        </p>
      ) : null}
    </div>
  );
}

function Choice({
  name,
  label,
  checked,
  onChange,
}: {
  name: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className={`
        group/choice

        flex
        cursor-pointer

        items-center
        gap-3

        border

        px-4
        py-4

        transition-[border-color,background-color,transform]
        duration-300

        hover:-translate-y-0.5

        ${
          checked
            ? "border-brand-primary bg-brand-primary/[0.05]"
            : "border-line bg-white hover:border-brand-primary/30 hover:bg-surface-soft/45"
        }
      `}
    >
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />

      <span
        className={`
          flex
          h-5
          w-5
          shrink-0

          items-center
          justify-center

          border

          ${
            checked
              ? "border-brand-accent bg-brand-accent text-white"
              : "border-line text-transparent"
          }
        `}
      >
        <Check className="h-3 w-3" strokeWidth={2} />
      </span>

      <span
        className="
          text-[10px]
          font-bold

          text-ink
        "
      >
        {label}
      </span>
    </label>
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
   Shared field style
============================================================================= */

const inputClassName = `
  mt-3
  min-h-12
  w-full

  border
  border-line

  bg-white

  px-4
  py-3

  text-[11px]
  font-medium
  leading-[1.9]

  text-ink

  outline-none

  transition-[border-color,box-shadow,background-color]
  duration-300

  placeholder:text-ink-muted/35

  hover:border-brand-primary/30

  focus:border-brand-primary
  focus:bg-surface-soft/20
  focus:ring-4
  focus:ring-brand-primary/[0.07]
`;

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
            "linear-gradient(115deg,color-mix(in srgb,var(--dnh-primary) 5%,white) 0%,white 46%,white 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.13]
        "
        style={{
          backgroundImage:
            "linear-gradient(to right,color-mix(in srgb,var(--dnh-primary) 4%,transparent) 1px,transparent 1px)",
          backgroundSize: "118px 100%",
        }}
      />

      <span
        aria-hidden="true"
        className="
          absolute
          right-[20%]
          top-0

          h-[6px]
          w-[2px]

          bg-brand-accent
        "
      />
    </>
  );
}
