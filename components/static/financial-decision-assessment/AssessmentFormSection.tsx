"use client";

import { useMemo, useState, type FormEvent, type ReactNode } from "react";
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
  shortDescription: "",
};

const PROFILE_ICONS: Record<AssessmentFormContent["profile"]["options"][number]["icon"], LucideIcon> = {
  individual: UserRound,
  family: UsersRound,
  business: BriefcaseBusiness,
  company: Building2,
};

export function AssessmentFormSection({ content, direction }: { content: AssessmentFormContent; direction: SiteDirection }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<AssessmentData>(INITIAL_DATA);
  const [submitted, setSubmitted] = useState(false);
  const NextArrow = direction === "rtl" ? ArrowLeft : ArrowRight;
  const PreviousArrow = direction === "rtl" ? ArrowRight : ArrowLeft;
  const progress = ((step + 1) / content.steps.length) * 100;

  const currentStepValid = useMemo(() => {
    if (step === 0) return Boolean(data.audience);
    if (step === 1) return Boolean(data.decisionTopic && data.currentSituation.trim().length >= 10);
    if (step === 2) return Boolean(data.horizon && data.urgency);
    if (step === 3) return Boolean(data.name.trim() && data.email.trim() && data.contactMethod && data.shortDescription.trim().length >= 10);
    return false;
  }, [data, step]);

  function updateField<K extends keyof AssessmentData>(field: K, value: AssessmentData[K]) {
    setData((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (currentStepValid) setSubmitted(true);
  }

  const counter = content.step_counter
    .replace("{current}", String(step + 1))
    .replace("{total}", String(content.steps.length));

  return (
    <section id={content.id} dir={direction} aria-labelledby="assessment-form-title" className="relative isolate overflow-hidden border-b border-line bg-page py-16 sm:py-20 lg:py-24 xl:py-28">
      <GridBackground />
      <div className="dnh-site-shell relative z-10">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end lg:gap-16">
          <div>
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h2 id="assessment-form-title" className="max-w-[720px] text-[31px] font-black leading-[1.62] tracking-[-0.045em] text-ink sm:text-[38px] lg:text-[45px] lg:leading-[1.5] xl:text-[50px]">
              <Highlight text={content.heading} highlight={content.heading_highlight} />
            </h2>
          </div>
          <p className="max-w-[680px] text-[13px] font-medium leading-[2.2] text-ink-muted sm:text-[14px] lg:text-[15px]">{content.intro}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:mt-14 lg:mt-16 lg:grid-cols-[0.31fr_0.69fr] lg:gap-7">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden border border-line bg-white">
              <div className="border-b border-line bg-brand-secondary px-5 py-6 text-white sm:px-6">
                <bdi dir="ltr" className="text-[11px] font-black tracking-[0.18em] text-white/45">{content.progress_label}</bdi>
                <p className="mt-2 text-[15px] font-black">{content.progress_title}</p>
                <p className="mt-2 text-[11px] font-medium leading-[1.9] text-white/50">{content.progress_description}</p>
              </div>
              <div>
                {content.steps.map((item, index) => <ProgressStep key={item.id} item={item} index={index} current={step} />)}
              </div>
              <div className="border-t border-line bg-surface-soft/60 px-5 py-5 sm:px-6">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand-primary" strokeWidth={1.5} aria-hidden="true" />
                  <div><p className="text-[10px] font-black text-ink">{content.privacy_title}</p><p className="mt-1 text-[11px] font-medium leading-[1.9] text-ink-muted">{content.privacy_description}</p></div>
                </div>
              </div>
            </div>
            <div className="mt-4 hidden border border-line bg-white px-5 py-4 lg:block">
              <p className="text-[11px] font-bold text-ink-muted">{content.more_label}</p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                <a href={content.privacy_link.href} className="text-[11px] font-bold text-brand-primary hover:text-brand-accent">{content.privacy_link.label}</a>
                <a href={content.after_link.href} className="text-[11px] font-bold text-brand-primary hover:text-brand-accent">{content.after_link.label}</a>
              </div>
            </div>
          </aside>

          <div className="relative overflow-hidden border border-line bg-white shadow-[0_28px_80px_rgba(13,79,104,.08)]">
            <div className="absolute inset-x-0 top-0 h-[3px] bg-brand-primary/[0.08]"><span className="block h-full bg-brand-accent transition-[width] duration-500 motion-reduce:transition-none" style={{ width: `${progress}%` }} /></div>
            {!submitted ? (
              <form onSubmit={handleSubmit} noValidate>
                <div className="flex flex-col gap-4 border-b border-line px-5 pb-5 pt-7 sm:flex-row sm:items-center sm:justify-between sm:px-7 lg:px-8">
                  <div><bdi dir="ltr" className="text-[11px] font-black tracking-[0.18em] text-brand-primary/50">{content.steps[step]?.eyebrow}</bdi><h3 className="mt-2 text-[17px] font-black text-ink sm:text-[19px]">{content.steps[step]?.title}</h3></div>
                  <p className="text-[11px] font-bold text-ink-muted">{counter}</p>
                </div>

                <div className="min-h-[520px] px-5 py-7 sm:px-7 sm:py-8 lg:px-8 lg:py-9">
                  {step === 0 && <ProfileStep content={content.profile} value={data.audience} onChange={(value) => updateField("audience", value)} />}
                  {step === 1 && <DecisionStep content={content.decision} data={data} updateField={updateField} />}
                  {step === 2 && <TimingStep content={content.timing} data={data} updateField={updateField} />}
                  {step === 3 && <ContactStep content={content.contact} data={data} updateField={updateField} />}
                </div>

                <div className="flex flex-col-reverse gap-3 border-t border-line bg-surface-soft/40 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7 lg:px-8">
                  {step > 0 ? <ActionButton type="button" onClick={() => setStep((current) => Math.max(current - 1, 0))} variant="secondary" size="md" shape="square" icon={PreviousArrow} className="w-full border-line bg-white shadow-none sm:w-auto">{content.previous_label}</ActionButton> : <span />}
                  {step < content.steps.length - 1 ? (
                    <ActionButton type="button" onClick={() => currentStepValid && setStep((current) => Math.min(current + 1, content.steps.length - 1))} disabled={!currentStepValid} variant="primary" size="md" shape="square" icon={NextArrow} className="w-full sm:w-auto sm:min-w-[170px] disabled:pointer-events-none disabled:opacity-40">{content.next_label}</ActionButton>
                  ) : (
                    <ActionButton type="submit" disabled={!currentStepValid} variant="assessment" size="md" shape="square" icon={NextArrow} className="w-full bg-brand-accent text-white sm:w-auto sm:min-w-[210px] disabled:pointer-events-none disabled:opacity-40">{content.submit_label}</ActionButton>
                  )}
                </div>
              </form>
            ) : <SuccessState content={content.success} Arrow={NextArrow} />}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProfileStep({ content, value, onChange }: { content: AssessmentFormContent["profile"]; value: string; onChange: (value: string) => void }) {
  return <fieldset><legend className="text-[15px] font-black leading-[1.9] text-ink">{content.title}</legend><p className="mt-2 max-w-[600px] text-[10px] font-medium leading-[2] text-ink-muted">{content.description}</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{content.options.map((option) => { const Icon = PROFILE_ICONS[option.icon]; return <ChoiceCard key={option.id} name="audience" value={option.value} checked={value === option.value} onChange={() => onChange(option.value)} icon={Icon} title={option.title} description={option.description} />; })}</div></fieldset>;
}

function DecisionStep({ content, data, updateField }: { content: AssessmentFormContent["decision"]; data: AssessmentData; updateField: UpdateField }) {
  return <div><StepTitle title={content.title} description={content.description} /><div className="mt-7 grid gap-3 sm:grid-cols-2">{content.topics.map((topic) => <Choice key={topic.id} name="decisionTopic" value={topic.value} label={topic.label} checked={data.decisionTopic === topic.value} onChange={() => updateField("decisionTopic", topic.value)} />)}</div><div className="mt-7"><FieldLabel htmlFor="currentSituation" title={content.situation_label} helper={content.situation_helper} /><textarea id="currentSituation" name="currentSituation" rows={5} value={data.currentSituation} onChange={(event) => updateField("currentSituation", event.target.value)} placeholder={content.situation_placeholder} className={inputClassName} /></div><div className="mt-7"><FieldLabel htmlFor="decisionSize" title={content.size_label} helper={content.size_helper} /><select id="decisionSize" name="decisionSize" value={data.decisionSize} onChange={(event) => updateField("decisionSize", event.target.value)} className={inputClassName}><option value="">{content.size_placeholder}</option>{content.sizes.map((item) => <option key={item.id} value={item.value}>{item.label}</option>)}</select></div></div>;
}

function TimingStep({ content, data, updateField }: { content: AssessmentFormContent["timing"]; data: AssessmentData; updateField: UpdateField }) {
  return <div><StepTitle title={content.title} description={content.description} /><div className="mt-7"><FieldLabel title={content.horizon_label} helper={content.horizon_helper} /><div className="mt-3 grid gap-3 sm:grid-cols-2">{content.horizons.map((option) => <Choice key={option.id} name="horizon" value={option.value} label={option.label} checked={data.horizon === option.value} onChange={() => updateField("horizon", option.value)} />)}</div></div><div className="mt-8"><FieldLabel title={content.urgency_label} helper={content.urgency_helper} /><div className="mt-3 grid gap-3">{content.urgencies.map((option) => <ChoiceCard key={option.id} name="urgency" value={option.value} checked={data.urgency === option.value} onChange={() => updateField("urgency", option.value)} title={option.title} description={option.description} />)}</div></div></div>;
}

function ContactStep({ content, data, updateField }: { content: AssessmentFormContent["contact"]; data: AssessmentData; updateField: UpdateField }) {
  return <div><StepTitle title={content.title} description={content.description} /><div className="mt-7 grid gap-5 sm:grid-cols-2"><div><FieldLabel htmlFor="assessment-name" title={content.name_label} /><input id="assessment-name" name="name" autoComplete="name" value={data.name} onChange={(event) => updateField("name", event.target.value)} className={inputClassName} /></div><div><FieldLabel htmlFor="assessment-email" title={content.email_label} /><div className="relative"><input id="assessment-email" type="email" name="email" autoComplete="email" dir="ltr" value={data.email} onChange={(event) => updateField("email", event.target.value)} className={`${inputClassName} pe-11`} /><Mail aria-hidden="true" className="absolute end-4 top-1/2 size-4 -translate-y-1/2 text-ink-muted/45" strokeWidth={1.5} /></div></div></div><div className="mt-7"><FieldLabel title={content.method_label} /><div className="mt-3 grid gap-3 sm:grid-cols-3">{content.methods.map((option) => <Choice key={option.id} name="contactMethod" value={option.value} label={option.label} checked={data.contactMethod === option.value} onChange={() => updateField("contactMethod", option.value)} />)}</div></div><div className="mt-7"><FieldLabel htmlFor="shortDescription" title={content.summary_label} helper={content.summary_helper} /><textarea id="shortDescription" name="shortDescription" rows={5} value={data.shortDescription} onChange={(event) => updateField("shortDescription", event.target.value)} placeholder={content.summary_placeholder} className={inputClassName} /></div><div className="mt-7 flex items-start gap-3 border border-brand-primary/15 bg-surface-soft/55 p-4"><ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-primary" /><p className="text-[11px] font-medium leading-[1.9] text-ink-muted">{content.privacy_note}</p></div></div>;
}

type UpdateField = <K extends keyof AssessmentData>(field: K, value: AssessmentData[K]) => void;

function ProgressStep({ item, index, current }: { item: AssessmentFormContent["steps"][number]; index: number; current: number }) {
  const active = index === current; const completed = index < current;
  return <div className={`relative flex items-center gap-4 border-b border-line px-5 py-4 sm:px-6 ${active ? "bg-brand-primary/[0.045]" : ""}`}><span className={`grid size-8 place-items-center border text-[10px] font-black ${active || completed ? "border-brand-primary bg-brand-primary text-white" : "border-line text-ink-muted"}`}>{completed ? <Check size={14} /> : String(index + 1).padStart(2,"0")}</span><div><bdi dir="ltr" className="text-[8px] font-black tracking-[0.16em] text-brand-primary/45">{item.eyebrow}</bdi><p className={`mt-1 text-[11px] font-black ${active ? "text-brand-primary" : "text-ink"}`}>{item.title}</p></div>{active ? <span aria-hidden="true" className="absolute inset-y-0 start-0 w-[3px] bg-brand-accent" /> : null}</div>;
}

function Choice({ name, value, label, checked, onChange }: { name: string; value: string; label: string; checked: boolean; onChange: () => void }) { return <label className={`flex min-h-12 cursor-pointer items-center gap-3 border px-4 py-3 text-[11px] font-bold transition-colors ${checked ? "border-brand-primary bg-brand-primary/[0.05] text-brand-primary" : "border-line text-ink hover:border-brand-primary/35"}`}><input className="sr-only" type="radio" name={name} value={value} checked={checked} onChange={onChange} /><span className={`grid size-5 place-items-center border ${checked ? "border-brand-accent bg-brand-accent text-white" : "border-line text-transparent"}`}><Check size={12} /></span>{label}</label>; }

function ChoiceCard({ name, value, title, description, checked, onChange, icon: Icon }: { name: string; value: string; title: string; description: string; checked: boolean; onChange: () => void; icon?: LucideIcon }) { return <label className={`group cursor-pointer border p-5 transition-colors ${checked ? "border-brand-primary bg-brand-primary/[0.055]" : "border-line bg-white hover:border-brand-primary/35"}`}><input type="radio" className="sr-only" name={name} value={value} checked={checked} onChange={onChange} /><div className="flex items-start justify-between gap-4"><span className={`grid size-10 place-items-center border ${checked ? "border-brand-primary bg-brand-primary text-white" : "border-line bg-surface-soft text-brand-primary"}`}>{Icon ? <Icon size={17} aria-hidden="true" /> : <Check size={16} />}</span><span className={`grid size-5 place-items-center border ${checked ? "border-brand-accent bg-brand-accent text-white" : "border-line text-transparent"}`}><Check size={12} /></span></div><p className="mt-5 text-[12px] font-black text-ink">{title}</p><p className="mt-2 text-[11px] font-medium leading-[1.9] text-ink-muted">{description}</p></label>; }

function StepTitle({ title, description }: { title: string; description: string }) { return <div><h4 className="text-[15px] font-black leading-[1.9] text-ink">{title}</h4><p className="mt-2 max-w-[620px] text-[10px] font-medium leading-[2] text-ink-muted">{description}</p></div>; }
function FieldLabel({ title, helper, htmlFor }: { title: string; helper?: string; htmlFor?: string }) { return <label htmlFor={htmlFor} className="mb-3 block"><span className="text-[11px] font-black text-ink">{title}</span>{helper ? <span className="mt-1 block text-[10px] font-medium leading-5 text-ink-muted">{helper}</span> : null}</label>; }

function SuccessState({ content, Arrow }: { content: AssessmentFormContent["success"]; Arrow: LucideIcon }) { return <div className="flex min-h-[680px] flex-col items-center justify-center px-5 py-16 text-center sm:px-10"><span className="grid size-16 place-items-center bg-brand-secondary text-brand-primary"><Check size={25} /></span><bdi dir="ltr" className="mt-7 text-[11px] font-black tracking-[0.2em] text-brand-primary/50">{content.eyebrow}</bdi><h3 className="mt-3 text-[23px] font-black text-ink sm:text-[28px]">{content.title}</h3><p className="mt-4 max-w-[560px] text-[11px] font-medium leading-[2.1] text-ink-muted sm:text-[12px]">{content.description}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><ActionButton href={content.after_cta.href} variant="primary" size="md" shape="square" icon={Arrow}>{content.after_cta.label}</ActionButton><ActionButton href={content.privacy_cta.href} variant="secondary" size="md" shape="square" icon={ShieldCheck}>{content.privacy_cta.label}</ActionButton></div></div>; }

const inputClassName = "w-full border border-line bg-white px-4 py-3.5 text-[12px] text-ink outline-none transition placeholder:text-ink-muted/45 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10";
function Eyebrow({ children }: { children: string }) { return <div className="mb-5 flex items-center gap-3"><span aria-hidden="true" className="h-px w-10 bg-brand-accent" /><span className="text-[10px] font-black text-brand-primary sm:text-[11px]">{children}</span></div>; }
function Highlight({ text, highlight }: { text: string; highlight: string }) { const index = text.indexOf(highlight); if (index < 0) return text; return <>{text.slice(0,index)}<span className="text-brand-primary">{highlight}</span>{text.slice(index + highlight.length)}</>; }
function GridBackground() { return <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(to right,var(--dnh-primary) 1px,transparent 1px)", backgroundSize: "118px 100%" }} />; }
