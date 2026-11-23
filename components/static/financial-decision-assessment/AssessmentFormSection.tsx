"use client";

import { useMemo, useRef, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Check,
  Mail,
  ShieldCheck,
  UserRound,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import { LocalizedLink as Link } from "@/components/providers/LanguageProvider";
import feedback from "@/config/intake-feedback.json";
import { FormStatus } from "@/components/forms/FormStatus";
import { siteToast } from "@/components/ui/siteToast";
import { ActionButton } from "@/components/ui/ActionButton";
import type { SiteDirection } from "@/lib/site-language";
import type { AssessmentFormContent } from "./assessmentTypes";

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
  contactDetail: string;
  shortDescription: string;
};

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
  contactDetail: "",
  shortDescription: "",
};

const PROFILE_ICONS: Record<
  AssessmentFormContent["profile"]["options"][number]["icon"],
  LucideIcon
> = {
  individual: UserRound,
  family: UsersRound,
  business: BriefcaseBusiness,
  company: Building2,
};

export function AssessmentFormSection({
  content,
  direction,
}: {
  content: AssessmentFormContent;
  direction: SiteDirection;
}) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<AssessmentData>(INITIAL_DATA);
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<{ok: boolean; message: string; reference?: string; errors?: Record<string,string>} | null>(null);
  const locale = direction === "rtl" ? "fa" : "en";
  const headingRef = useRef<HTMLHeadingElement>(null);
  const NextArrow = direction === "rtl" ? ArrowLeft : ArrowRight;
  const PreviousArrow = direction === "rtl" ? ArrowRight : ArrowLeft;
  const progress = ((step + 1) / content.steps.length) * 100;

  const currentStepValid = useMemo(() => {
    if (step === 0) return Boolean(data.audience);
    if (step === 1)
      return Boolean(
        data.decisionTopic && data.currentSituation.trim().length >= 10,
      );
    if (step === 2) return Boolean(data.horizon && data.urgency);
    return step === 3;
  }, [data, step]);

  function updateField<K extends keyof AssessmentData>(
    field: K,
    value: AssessmentData[K],
  ) {
    setData((current) => ({ ...current, [field]: value }));
    setResult(null);
  }

  function changeStep(next: number) {
    setStep(next);
    requestAnimationFrame(() => headingRef.current?.focus());
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!currentStepValid || pending) return;
    if (step < content.steps.length - 1) {
      changeStep(step + 1);
      return;
    }
    const form = event.currentTarget;
    setPending(true);
    setResult(null);
    try {
      const response = await fetch("/api/financial-decision-assessments", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept-Language": locale },
        body: JSON.stringify(data),
      });
      const payload = await response.json();
      const message = payload.message || (response.ok ? content.success.title : feedback[locale].unavailable);
      setResult({ ...payload, message, ok: response.ok });
      if (response.ok) {
        siteToast.success(message);
        setData(INITIAL_DATA);
      } else {
        siteToast.error(message);
        if (!payload.errors) return;
        const field = Object.keys(payload.errors)[0];
        const fieldStep = [["audience"], ["decisionTopic","currentSituation","decisionSize"], ["horizon","urgency"]]
          .findIndex(keys => keys.includes(field));
        if (fieldStep >= 0) changeStep(fieldStep);
        requestAnimationFrame(() => form.querySelector<HTMLElement>(`[name="${CSS.escape(field)}"]`)?.focus());
      }
    } catch {
      siteToast.error(feedback[locale].unavailable);
      setResult({ ok: false, message: feedback[locale].unavailable });
    } finally {
      setPending(false);
    }
  }

  const counter = content.step_counter
    .replace("{current}", (step + 1).toLocaleString(direction === "rtl" ? "fa-IR" : "en-US"))
    .replace("{total}", content.steps.length.toLocaleString(direction === "rtl" ? "fa-IR" : "en-US"));

  return (
    <section
      id={content.id}
      dir={direction}
      aria-labelledby="assessment-form-title"
      className="relative isolate overflow-hidden border-b border-line bg-page py-16 sm:py-20 lg:py-24 xl:py-28"
    >
      <GridBackground />
      <div className="dnh-site-shell relative z-10">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end lg:gap-16">
          <div>
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h2
              id="assessment-form-title"
              className="max-w-[720px] text-[31px] font-black leading-[1.62] tracking-[-0.045em] text-ink sm:text-[38px] lg:text-[45px] lg:leading-[1.5] xl:text-[50px]"
            >
              <Highlight
                text={content.heading}
                highlight={content.heading_highlight}
              />
            </h2>
          </div>
          <p className="max-w-[680px] text-[13px] font-medium leading-[2.2] text-ink-muted sm:text-[14px] lg:text-[15px]">
            {content.intro}
          </p>
        </div>

        <details className="mt-4 border border-line bg-white px-4 lg:hidden">
          <summary className="cursor-pointer py-3 text-sm font-bold leading-6 text-ink">{content.progress_title}</summary>
          <p className="pb-3 text-sm leading-7 text-ink-muted">{content.progress_description}</p>
          <ol className="list-inside list-decimal space-y-1 border-y border-line py-3 text-sm leading-7">
            {content.steps.map((item, index) => (
              <li key={item.id} aria-current={index === step ? "step" : undefined} className={index === step ? "font-bold text-brand-accent" : "text-ink-muted"}>{item.title}</li>
            ))}
          </ol>
          <p className="py-3 text-sm leading-7 text-ink-muted">{content.privacy_description}</p>
        </details>
        <div className="mt-5 grid gap-6 sm:mt-14 lg:mt-16 lg:grid-cols-[0.31fr_0.69fr] lg:gap-7">
          <aside className="hidden lg:block lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden border border-line bg-white">
              <div className="border-b border-line bg-brand-secondary px-5 py-6 text-white sm:px-6">
                <p className="mt-2 text-[15px] font-black">
                  {content.progress_title}
                </p>
                <p className="mt-2 text-[11px] font-medium leading-[1.9] text-white/50">
                  {content.progress_description}
                </p>
              </div>
              <div>
                {content.steps.map((item, index) => (
                  <ProgressStep
                    key={item.id}
                    item={item}
                    index={index}
                    current={step}
                  />
                ))}
              </div>
              <div className="border-t border-line bg-surface-soft/60 px-5 py-5 sm:px-6">
                <div className="flex items-start gap-3">
                  <ShieldCheck
                    className="mt-0.5 size-4 shrink-0 text-brand-primary"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-[10px] font-black text-ink">
                      {content.privacy_title}
                    </p>
                    <p className="mt-1 text-[11px] font-medium leading-[1.9] text-ink-muted">
                      {content.privacy_description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 hidden border border-line bg-white px-5 py-4 lg:block">
              <p className="text-[11px] font-bold text-ink-muted">
                {content.more_label}
              </p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                <Link
                  href={content.privacy_link.href}
                  className="text-[11px] font-bold text-brand-primary hover:text-brand-accent"
                >
                  {content.privacy_link.label}
                </Link>
                <Link
                  href={content.after_link.href}
                  className="text-[11px] font-bold text-brand-primary hover:text-brand-accent"
                >
                  {content.after_link.label}
                </Link>
              </div>
            </div>
          </aside>

          <div className="relative overflow-hidden border border-line bg-white shadow-[0_28px_80px_rgba(13,79,104,.08)]">
            <div className="absolute inset-x-0 top-0 h-[3px] bg-brand-primary/[0.08]">
              <span
                className="block h-full bg-brand-accent transition-[width] duration-500 motion-reduce:transition-none"
                style={{ width: `${progress}%` }}
              />
            </div>
              {result?.ok ? (
                <div className="space-y-4 p-5 sm:p-8">
                  <FormStatus kind="success" message={result.message} reference={result.reference} referenceLabel={feedback[locale].reference} />
                  <p className="text-sm leading-7 text-ink-muted">{content.success.description}</p>
                  <Link href={content.success.after_cta.href} className="inline-flex min-h-11 items-center font-bold text-brand-accent underline">{content.success.after_cta.label}</Link>
                </div>
              ) : <form method="post" onSubmit={handleSubmit} noValidate>
                <div className="flex flex-col gap-4 border-b border-line px-5 pb-5 pt-7 sm:flex-row sm:items-center sm:justify-between sm:px-7 lg:px-8">
                  <div>
                    <bdi
                      dir={direction}
                      className="text-xs font-bold text-brand-accent"
                    >
                      {counter}
                    </bdi>
                    <h3 ref={headingRef} tabIndex={-1} className="mt-2 scroll-mt-32 text-[17px] font-black text-ink sm:text-[19px]">
                      {content.steps[step]?.title}
                    </h3>
                  </div>
              
                </div>

                <fieldset disabled={pending} className="min-w-0 px-5 py-7 sm:px-7 sm:py-8 lg:px-8 lg:py-9">
                  {step === 0 && (
                    <ProfileStep
                      content={content.profile}
                      value={data.audience}
                      onChange={(value) => updateField("audience", value)}
                    />
                  )}
                  {step === 1 && (
                    <DecisionStep
                      content={content.decision}
                      data={data}
                      updateField={updateField}
                    />
                  )}
                  {step === 2 && (
                    <TimingStep
                      content={content.timing}
                      data={data}
                      updateField={updateField}
                    />
                  )}
                  {step === 3 && (
                    <ContactStep
                      content={content.contact}
                      locale={locale}
                      errors={result?.errors}
                      data={data}
                      updateField={updateField}
                    />
                  )}
                </fieldset>
                {result && <div className="px-5 pb-4"><FormStatus kind="error" message={result.message} /></div>}

                <div className="flex flex-col-reverse gap-3 border-t border-line bg-surface-soft/40 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7 lg:px-8">
                  {step > 0 ? (
                    <ActionButton
                      type="button"
                      disabled={pending}
                      onClick={() =>
                        changeStep(step - 1)
                      }
                      variant="secondary"
                      size="md"
                      shape="square"
                      icon={PreviousArrow}
                      className="w-full border-line bg-white shadow-none sm:w-auto"
                    >
                      {content.previous_label}
                    </ActionButton>
                  ) : (
                    <span />
                  )}
                  {step < content.steps.length - 1 ? (
                    <ActionButton
                      type="submit"
                      disabled={!currentStepValid}
                      variant="primary"
                      size="md"
                      shape="square"
                      icon={NextArrow}
                      className="w-full sm:w-auto sm:min-w-[170px] disabled:pointer-events-none disabled:opacity-40"
                    >
                      {content.next_label}
                    </ActionButton>
                  ) : (
                    <ActionButton
                      type="submit"
                      disabled={pending}
                      loading={pending}
                      variant="assessment"
                      size="md"
                      shape="square"
                      icon={NextArrow}
                      className="w-full bg-brand-accent text-white sm:w-auto sm:min-w-[210px] disabled:pointer-events-none disabled:opacity-40"
                    >
                      {pending ? feedback[locale].pending : content.submit_label}
                    </ActionButton>
                  )}
                </div>
              </form>}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProfileStep({
  content,
  value,
  onChange,
}: {
  content: AssessmentFormContent["profile"];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-[15px] font-black leading-[1.9] text-ink">
        {content.title}
      </legend>
      <p className="mt-2 max-w-[600px] text-sm font-medium leading-7 text-ink-muted">
        {content.description}
      </p>
      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        {content.options.map((option) => {
          const Icon = PROFILE_ICONS[option.icon];
          return (
            <ChoiceCard
              key={option.id}
              name="audience"
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              icon={Icon}
              title={option.title}
              description={option.description}
            />
          );
        })}
      </div>
    </fieldset>
  );
}

function DecisionStep({
  content,
  data,
  updateField,
}: {
  content: AssessmentFormContent["decision"];
  data: AssessmentData;
  updateField: UpdateField;
}) {
  return (
    <div>
      <StepTitle title={content.title} description={content.description} />
      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        {content.topics.map((topic) => (
          <Choice
            key={topic.id}
            name="decisionTopic"
            value={topic.value}
            label={topic.label}
            checked={data.decisionTopic === topic.value}
            onChange={() => updateField("decisionTopic", topic.value)}
          />
        ))}
      </div>
      <div className="mt-7">
        <FieldLabel
          htmlFor="currentSituation"
          title={content.situation_label}
          helper={content.situation_helper}
        />
        <textarea
          id="currentSituation"
          name="currentSituation"
          maxLength={2500}
          rows={5}
          value={data.currentSituation}
          onChange={(event) =>
            updateField("currentSituation", event.target.value)
          }
          placeholder={content.situation_placeholder}
          className={inputClassName}
        />
      </div>
      <div className="mt-7">
        <FieldLabel
          htmlFor="decisionSize"
          title={content.size_label}
          helper={content.size_helper}
        />
        <select
          id="decisionSize"
          name="decisionSize"
          value={data.decisionSize}
          onChange={(event) => updateField("decisionSize", event.target.value)}
          className={inputClassName}
        >
          <option value="">{content.size_placeholder}</option>
          {content.sizes.map((item) => (
            <option key={item.id} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function TimingStep({
  content,
  data,
  updateField,
}: {
  content: AssessmentFormContent["timing"];
  data: AssessmentData;
  updateField: UpdateField;
}) {
  return (
    <div>
      <StepTitle title={content.title} description={content.description} />
      <div className="mt-7">
        <FieldLabel
          title={content.horizon_label}
          helper={content.horizon_helper}
        />
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {content.horizons.map((option) => (
            <Choice
              key={option.id}
              name="horizon"
              value={option.value}
              label={option.label}
              checked={data.horizon === option.value}
              onChange={() => updateField("horizon", option.value)}
            />
          ))}
        </div>
      </div>
      <div className="mt-8">
        <FieldLabel
          title={content.urgency_label}
          helper={content.urgency_helper}
        />
        <div className="mt-3 grid gap-3">
          {content.urgencies.map((option) => (
            <ChoiceCard
              key={option.id}
              name="urgency"
              value={option.value}
              checked={data.urgency === option.value}
              onChange={() => updateField("urgency", option.value)}
              title={option.title}
              description={option.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactStep({
  content,
  locale,
  errors,
  data,
  updateField,
}: {
  content: AssessmentFormContent["contact"];
  locale: "fa" | "en";
  errors?: Record<string,string>;
  data: AssessmentData;
  updateField: UpdateField;
}) {
  return (
    <div>
      <StepTitle title={content.title} description={content.description} />
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="assessment-name" title={content.name_label} />
          <input
            id="assessment-name"
            name="name"
            required
            aria-invalid={Boolean(errors?.name)}
            maxLength={100}
            autoComplete="name"
            value={data.name}
            onChange={(event) => updateField("name", event.target.value)}
            className={inputClassName}
          />
          {errors?.name && <p className="mt-1 text-sm text-red-700">{errors.name}</p>}
        </div>
        <div>
          <FieldLabel htmlFor="assessment-email" title={content.email_label} />
          <div className="relative">
            <input
              id="assessment-email"
              type="email"
              name="email"
              required
              aria-invalid={Boolean(errors?.email)}
              maxLength={160}
              autoComplete="email"
              dir="ltr"
              value={data.email}
              onChange={(event) => updateField("email", event.target.value)}
              className={`${inputClassName} pe-11`}
            />
            <Mail
              aria-hidden="true"
              className="absolute end-4 top-1/2 size-4 -translate-y-1/2 text-ink-muted/45"
              strokeWidth={1.5}
            />
          </div>
          {errors?.email && <p className="mt-1 text-sm text-red-700">{errors.email}</p>}
        </div>
      </div>
      <div className="mt-7">
        <FieldLabel title={content.method_label} />
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {content.methods.map((option) => (
            <Choice
              key={option.id}
              name="contactMethod"
              value={option.value}
              label={option.label}
              checked={data.contactMethod === option.value}
              onChange={() => updateField("contactMethod", option.value)}
            />
          ))}
        </div>
        {errors?.contactMethod && <p className="mt-1 text-sm text-red-700">{errors.contactMethod}</p>}
        {data.contactMethod && data.contactMethod !== "email" && (
          <div className="mt-4">
            <FieldLabel htmlFor="assessment-contact-detail" title={data.contactMethod === "phone" ? feedback[locale].phoneLabel : feedback[locale].messengerLabel} />
            <input id="assessment-contact-detail" type={data.contactMethod === "phone" ? "tel" : "text"} dir="auto" name="contactDetail"
              required maxLength={160} aria-invalid={Boolean(errors?.contactDetail)} value={data.contactDetail}
              onChange={event => updateField("contactDetail", event.target.value)} className={inputClassName} />
            {errors?.contactDetail && <p className="mt-1 text-sm text-red-700">{errors.contactDetail}</p>}
          </div>
        )}
      </div>
      <div className="mt-7">
        <FieldLabel
          htmlFor="shortDescription"
          title={content.summary_label}
          helper={content.summary_helper}
        />
        <textarea
          id="shortDescription"
          name="shortDescription"
          required
          maxLength={2500}
          aria-invalid={Boolean(errors?.shortDescription)}
          rows={5}
          value={data.shortDescription}
          onChange={(event) =>
            updateField("shortDescription", event.target.value)
          }
          placeholder={content.summary_placeholder}
          className={inputClassName}
        />
        {errors?.shortDescription && <p className="mt-1 text-sm text-red-700">{errors.shortDescription}</p>}
      </div>
      <div className="mt-7 flex items-start gap-3 border border-brand-primary/15 bg-surface-soft/55 p-4">
        <ShieldCheck
          aria-hidden="true"
          className="mt-0.5 size-4 shrink-0 text-brand-primary"
        />
        <p className="text-[11px] font-medium leading-[1.9] text-ink-muted">
          {content.privacy_note}
        </p>
      </div>
    </div>
  );
}

type UpdateField = <K extends keyof AssessmentData>(
  field: K,
  value: AssessmentData[K],
) => void;

function ProgressStep({
  item,
  index,
  current,
}: {
  item: AssessmentFormContent["steps"][number];
  index: number;
  current: number;
}) {
  const active = index === current;
  const completed = index < current;
  return (
    <div
      className={`relative flex items-center gap-4 border-b border-line px-5 py-4 sm:px-6 ${active ? "bg-brand-primary/[0.045]" : ""}`}
    >
      <div className="shrink-0">
        <span
          aria-hidden="true"
          className={`grid size-7 place-items-center border text-[9px] font-black ${
            completed
              ? "border-brand-primary bg-brand-primary text-white"
              : active
                ? "border-brand-accent bg-brand-accent text-white"
                : "border-line bg-surface-soft text-ink-muted"
          }`}
        >
          {completed ? <Check size={13} strokeWidth={2.2} /> : index + 1}
        </span>
      </div>
      <div>
        <p
          className={`mt-1 text-[11px] font-black ${active ? "text-brand-primary" : "text-ink"}`}
        >
          {item.title}
        </p>
      </div>
      {active ? (
        <span
          aria-hidden="true"
          className="absolute inset-y-0 start-0 w-[3px] bg-brand-accent"
        />
      ) : null}
    </div>
  );
}

function Choice({
  name,
  value,
  label,
  checked,
  onChange,
}: {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className={`flex min-h-12 cursor-pointer focus-within:outline-2 focus-within:outline-focus items-center gap-3 border px-4 py-3 text-[11px] font-bold transition-colors ${checked ? "border-brand-accent bg-brand-accent/5 text-ink" : "border-line text-ink hover:border-brand-primary/35"}`}
    >
      <input
        className="sr-only"
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span
        className={`grid size-5 place-items-center border ${checked ? "border-brand-accent bg-brand-accent text-white" : "border-line text-transparent"}`}
      >
        <Check size={12} />
      </span>
      {label}
    </label>
  );
}

function ChoiceCard({
  name,
  value,
  title,
  description,
  checked,
  onChange,
  icon: Icon,
}: {
  name: string;
  value: string;
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
  icon?: LucideIcon;
}) {
  return (
    <label
      className={`group cursor-pointer border p-4 focus-within:outline-2 focus-within:outline-focus transition-colors ${checked ? "border-brand-primary bg-brand-primary/[0.055]" : "border-line bg-white hover:border-brand-primary/35"}`}
    >
      <input
        type="radio"
        className="sr-only"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <div className="flex items-start justify-between gap-4">
        <span
          className={`grid size-10 place-items-center border ${checked ? "border-brand-primary bg-brand-primary text-white" : "border-line bg-surface-soft text-brand-primary"}`}
        >
          {Icon ? <Icon size={17} aria-hidden="true" /> : <Check size={16} />}
        </span>
        <span
          className={`grid size-5 place-items-center border ${checked ? "border-brand-accent bg-brand-accent text-white" : "border-line text-transparent"}`}
        >
          <Check size={12} />
        </span>
      </div>
      <p className="mt-5 text-[12px] font-black text-ink">{title}</p>
      <p className="mt-2 text-[11px] font-medium leading-[1.9] text-ink-muted">
        {description}
      </p>
    </label>
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
    <div>
      <h4 className="text-[15px] font-black leading-[1.9] text-ink">{title}</h4>
      <p className="mt-2 max-w-[620px] text-sm font-medium leading-7 text-ink-muted">
        {description}
      </p>
    </div>
  );
}
function FieldLabel({
  title,
  helper,
  htmlFor,
}: {
  title: string;
  helper?: string;
  htmlFor?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-3 block">
      <span className="text-sm font-bold text-ink">{title}</span>
      {helper ? (
        <span className="mt-1 block text-xs font-medium leading-6 text-ink-muted">
          {helper}
        </span>
      ) : null}
    </label>
  );
}

const inputClassName =
  "w-full border border-line bg-white px-4 py-3.5 text-base sm:text-sm text-ink outline-none transition placeholder:text-ink-muted/45 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10";
function Eyebrow({ children }: { children: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span aria-hidden="true" className="h-px w-10 bg-brand-accent" />
      <span className="text-xs font-bold text-brand-accent sm:text-[11px]">
        {children}
      </span>
    </div>
  );
}
function Highlight({ text, highlight }: { text: string; highlight: string }) {
  const index = text.indexOf(highlight);
  if (index < 0) return text;
  return (
    <>
      {text.slice(0, index)}
      <span className="text-brand-accent">{highlight}</span>
      {text.slice(index + highlight.length)}
    </>
  );
}
function GridBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.025]"
      style={{
        backgroundImage:
          "linear-gradient(to right,var(--dnh-primary) 1px,transparent 1px)",
        backgroundSize: "118px 100%",
      }}
    />
  );
}
