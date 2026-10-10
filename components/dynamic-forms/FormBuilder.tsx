"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Archive, ArrowDown, ArrowUp, ChevronLeft, ChevronRight, Copy, Eye, FileText, Plus, Save, Send, Trash2 } from "lucide-react";
import { adminToast, adminToastMessage } from "@/components/admin/adminToast";
import { createFormTemplate, makeStableId, type DynamicFieldDefinition, type DynamicFormDefinition, type DynamicFormStatus, type DynamicStepDefinition } from "@/lib/dynamic-forms";
import { normalizeSlug } from "@/lib/dynamic-form-validation";
import { SERVICE_CATALOG } from "@/lib/services";

type Props = { initial?: DynamicFormDefinition; formId?: string };
type Notice = { kind: "success" | "error"; message: string } | null;
type Confirmation =
  | {
      title: string;
      description: string;
      actionLabel: string;
      intent: "warning" | "danger";
      onConfirm: () => void;
    }
  | null;

const fieldLabels: Record<DynamicFieldDefinition["type"], string> = { text: "متن کوتاه", textarea: "متن بلند", phone: "موبایل", email: "ایمیل", number: "عدد", select: "فهرست", radio: "گزینه‌ای", checkbox: "تأیید" };
const stepLabels: Record<DynamicStepDefinition["stepType"], string> = { identity: "هویت", contact: "تماس", questions: "پرسش‌ها", confirmation: "تأیید", custom: "سفارشی" };

export function FormBuilder({ initial, formId }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<DynamicFormDefinition>(() => initial ?? createFormTemplate());
  const [activeStep, setActiveStep] = useState(0);
  const [previewStep, setPreviewStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);
  const [confirmation, setConfirmation] = useState<Confirmation>(null);
  const fieldCount = useMemo(() => form.steps.reduce((total, step) => total + step.fields.length, 0), [form.steps]);
  const current = form.steps[activeStep] ?? form.steps[0];

  function update(patch: Partial<DynamicFormDefinition>) { setForm((value) => ({ ...value, ...patch })); setDirty(true); setNotice(null); }
  function updateStep(index: number, patch: Partial<DynamicStepDefinition>) { update({ steps: form.steps.map((step, i) => i === index ? { ...step, ...patch } : step) }); }
  function updateField(stepIndex: number, fieldIndex: number, patch: Partial<DynamicFieldDefinition>) {
    updateStep(stepIndex, { fields: form.steps[stepIndex].fields.map((field, i) => i === fieldIndex ? { ...field, ...patch } : field) });
  }
  function move<T>(items: T[], index: number, direction: -1 | 1) { const target = index + direction; if (target < 0 || target >= items.length) return items; const copy = [...items]; [copy[index], copy[target]] = [copy[target], copy[index]]; return copy; }
  function addStep() {
    if (form.steps.length >= 10) {
      const message = "حداکثر ۱۰ مرحله مجاز است.";
      adminToast.error(message);
      return setNotice({ kind: "error", message });
    }
    const step: DynamicStepDefinition = { id: makeStableId("step"), title: `مرحله ${form.steps.length + 1}`, stepType: "custom", fields: [] };
    adminToast.success("مرحله جدید اضافه شد.");
    update({ steps: [...form.steps, step] }); setActiveStep(form.steps.length); setPreviewStep(form.steps.length);
  }
  function removeStep(index: number) {
    if (form.steps.length === 1) {
      const message = "حداقل یک مرحله باید باقی بماند.";
      adminToast.error(message);
      return setNotice({ kind: "error", message });
    }
    setConfirmation({
      title: "حذف مرحله",
      description: "این مرحله و تمام فیلدهای داخل آن از ساختار فرم حذف می‌شود.",
      actionLabel: "حذف مرحله",
      intent: "danger",
      onConfirm: () => {
        adminToast.success("مرحله حذف شد.");
        update({ steps: form.steps.filter((_, i) => i !== index) }); setActiveStep(Math.max(0, index - 1)); setPreviewStep(0);
      },
    });
  }
  function addField() {
    if (fieldCount >= 30) {
      const message = "حداکثر ۳۰ فیلد در هر فرم مجاز است.";
      adminToast.error(message);
      return setNotice({ kind: "error", message });
    }
    const field: DynamicFieldDefinition = { id: makeStableId("field"), type: "text", label: "فیلد جدید", required: false, minLength: 0, maxLength: 200 };
    adminToast.success("فیلد جدید اضافه شد.");
    updateStep(activeStep, { fields: [...current.fields, field] });
  }

  function save(action: "save" | "publish" | "unpublish" | "archive") {
    if (action === "archive") {
      setConfirmation({
        title: "بایگانی فرم",
        description: "با بایگانی، لینک عمومی فرم از دسترس خارج می‌شود و کاربران دیگر نمی‌توانند آن را ارسال کنند.",
        actionLabel: "بایگانی فرم",
        intent: "warning",
        onConfirm: () => {
          void persist(action);
        },
      });
      return;
    }

    void persist(action);
  }

  async function persist(action: "save" | "publish" | "unpublish" | "archive") {
    setBusy(true); setNotice(null);
    const toastId = adminToast.loading(
      action === "publish"
        ? "در حال انتشار فرم..."
        : action === "unpublish"
          ? "در حال توقف انتشار فرم..."
          : action === "archive"
            ? "در حال بایگانی فرم..."
            : formId
              ? "در حال ذخیره فرم..."
              : "در حال ساخت فرم...",
    );
    try {
      const response = await fetch(formId ? `/api/admin/forms/${formId}` : "/api/admin/forms", {
        method: formId ? "PATCH" : "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formId ? { ...form, action, expectedRevision: form.revision } : form),
      });
      const payload = await response.json() as { message?: string; id?: string; revision?: number; status?: DynamicFormStatus; errors?: Record<string, string> };
      if (!response.ok) {
        const detail = payload.errors ? Object.values(payload.errors)[0] : undefined;
        throw new Error([payload.message, detail].filter(Boolean).join(" ") || "ذخیره انجام نشد.");
      }
      if (!formId && payload.id) {
        adminToast.dismiss(toastId);
        adminToast.success(payload.message ?? "فرم جدید ساخته شد.");
        router.replace(`/admin/forms/${payload.id}/edit`);
        router.refresh();
        return;
      }
      setForm((value) => ({ ...value, revision: payload.revision ?? value.revision, status: payload.status ?? value.status }));
      setDirty(false);
      adminToast.dismiss(toastId);
      adminToast.success(payload.message ?? "ذخیره شد.");
      setNotice({ kind: "success", message: payload.message ?? "ذخیره شد." }); router.refresh();
    } catch (error) {
      const message = adminToastMessage(error, "خطای پیش‌بینی‌نشده");
      adminToast.dismiss(toastId);
      adminToast.error(message);
      setNotice({ kind: "error", message });
    }
    finally { setBusy(false); }
  }

  const input = "mt-2 w-full border border-line bg-white px-3.5 py-3 text-sm text-ink outline-none transition focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10";
  return (
    <div className="mx-auto max-w-[1600px] px-4 py-8 pb-28 sm:px-7 lg:px-10 xl:pb-8" dir="rtl">
      <header className="border-b border-line pb-7">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div><Link href="/admin/forms" className="text-xs font-bold text-brand-primary hover:text-brand-accent">فرم‌های پویا / بازگشت</Link><p dir="ltr" className="mt-5 text-[10px] font-black tracking-[.22em] text-ink-muted">PROTOCOL BUILDER / REV {form.revision.toString().padStart(2, "0")}</p><h1 className="mt-2 text-3xl font-black tracking-[-.04em] text-ink">{formId ? "ویرایش پروتکل دریافت سرنخ" : "پروتکل دریافت سرنخ جدید"}</h1></div>
          <div className="flex flex-wrap gap-2">
            <button disabled={busy || form.status === "archived"} onClick={() => save("save")} className="inline-flex items-center gap-2 border border-brand-primary bg-white px-4 py-2.5 text-xs font-black text-brand-primary disabled:opacity-50"><Save size={16}/>ذخیره پیش‌نویس</button>
            {formId && form.status === "published" && <button disabled={busy} onClick={() => save("unpublish")} className="border border-line bg-white px-4 py-2.5 text-xs font-black text-ink">توقف انتشار</button>}
            {formId && form.status !== "archived" && <button disabled={busy} onClick={() => save("publish")} className="inline-flex items-center gap-2 bg-brand-accent px-5 py-2.5 text-xs font-black text-white disabled:opacity-50"><Send size={16}/>انتشار</button>}
            {formId && form.status !== "archived" && <button disabled={busy} onClick={() => save("archive")} aria-label="بایگانی" className="border border-red-200 px-3 text-red-700"><Archive size={16}/></button>}
          </div>
        </div>
        <div className="mt-4 flex min-h-8 flex-wrap items-center gap-3 text-xs"><span className={`border px-2 py-1 font-bold ${!formId || dirty ? "border-orange-200 bg-orange-50 text-orange-800" : "border-emerald-200 bg-emerald-50 text-emerald-800"}`}>{!formId ? "فرم جدید · ذخیره‌نشده" : dirty ? "تغییرات ذخیره‌نشده" : "ذخیره‌شده"}</span>{form.status === "archived" && <span className="border border-slate-200 bg-slate-100 px-2 py-1 font-bold text-slate-700">بایگانی‌شده · فقط خواندنی</span>}{notice && <span role={notice.kind === "error" ? "alert" : "status"} className={notice.kind === "error" ? "text-red-700" : "text-emerald-700"}>{notice.message}</span>}</div>
      </header>

      <div className="mt-7 grid items-start gap-6 xl:grid-cols-[300px_minmax(0,1fr)_390px]">
        <aside className="border border-line bg-[#f6fbfc] xl:sticky xl:top-28">
          <div className="border-b border-line p-4"><p dir="ltr" className="text-[11px] font-black tracking-[.2em] text-brand-primary">DOSSIER / STRUCTURE</p><div className="mt-2 flex items-center justify-between"><h2 className="font-black">مراحل فرم</h2><span className="text-xs text-ink-muted">{form.steps.length.toLocaleString("fa-IR")} / ۱۰</span></div></div>
          <ol>{form.steps.map((step, index) => <li key={step.id} className="border-b border-line last:border-0"><button onClick={() => setActiveStep(index)} className={`w-full px-4 py-4 text-right transition ${activeStep === index ? "bg-brand-primary text-white" : "hover:bg-white"}`}><span dir="ltr" className={`text-[11px] font-black tracking-[.16em] ${activeStep === index ? "text-white/70" : "text-ink-muted"}`}>STEP / {String(index + 1).padStart(2, "0")}</span><span className="mt-1 block text-sm font-black">{step.title || "بدون عنوان"}</span><span className={`mt-1 block text-[10px] ${activeStep === index ? "text-white/70" : "text-ink-muted"}`}>{step.fields.length.toLocaleString("fa-IR")} فیلد · {stepLabels[step.stepType]}</span></button></li>)}</ol>
          <button onClick={addStep} className="flex w-full items-center justify-center gap-2 border-t border-dashed border-brand-primary/30 p-4 text-xs font-black text-brand-primary hover:bg-white"><Plus size={15}/>افزودن مرحله</button>
        </aside>

        <main className="space-y-6">
          <section className="border border-line bg-white">
            <SectionHeader code="01 / IDENTITY" title="مشخصات فرم" />
            <div className="grid gap-5 p-5 md:grid-cols-2">
              <Label text="عنوان فرم"><input className={input} value={form.title} onChange={(e) => update({ title: e.target.value })}/></Label>
              <Label text="شناسه مسیر انگلیسی" help={`/forms/${form.slug || "form-slug"}`}><input dir="ltr" className={`${input} text-left`} value={form.slug} onChange={(e) => update({ slug: normalizeSlug(e.target.value) })}/></Label>
              <Label text="نوع فرم"><select className={input} value={form.formType} onChange={(e) => update({ formType: e.target.value as DynamicFormDefinition["formType"] })}><option value="single_step">تک‌مرحله‌ای</option><option value="multi_step">چندمرحله‌ای</option><option value="service_assessment">ارزیابی خدمت</option></select></Label>
              <Label text="خدمت مرتبط"><select className={input} value={form.serviceKey} onChange={(e) => { const service = SERVICE_CATALOG.find((item) => item.key === e.target.value)!; update({ serviceKey: service.key, serviceName: service.name, serviceRoute: service.route }); }}>{SERVICE_CATALOG.map((service) => <option key={service.key} value={service.key}>{service.name}</option>)}</select></Label>
              <div className="md:col-span-2"><Label text="توضیح فرم"><textarea className={`${input} min-h-24 resize-none`} value={form.description} onChange={(e) => update({ description: e.target.value })}/></Label></div>
              <Label text="متن دکمه ثبت"><input className={input} value={form.submitLabel} onChange={(e) => update({ submitLabel: e.target.value })}/></Label>
              <Label text="پیام موفقیت"><input className={input} value={form.successMessage} onChange={(e) => update({ successMessage: e.target.value })}/></Label>
            </div>
            {form.formType === "single_step" && form.steps.length > 1 && <p role="alert" className="mx-5 mb-5 border-r-2 border-brand-accent bg-orange-50 px-4 py-3 text-xs leading-6 text-orange-900">تغییر نوع، مراحل شما را حذف نکرده است. برای ذخیره فرم تک‌مرحله‌ای، مراحل اضافی را پس از بررسی حذف کنید.</p>}
          </section>

          <section className="border border-line bg-white">
            <SectionHeader code={`STEP / ${String(activeStep + 1).padStart(2, "0")}`} title="تنظیم مرحله" actions={<div className="flex gap-1"><IconButton label="انتقال به بالا" disabled={activeStep === 0} onClick={() => { update({ steps: move(form.steps, activeStep, -1) }); setActiveStep(activeStep - 1); }}><ArrowUp size={15}/></IconButton><IconButton label="انتقال به پایین" disabled={activeStep === form.steps.length - 1} onClick={() => { update({ steps: move(form.steps, activeStep, 1) }); setActiveStep(activeStep + 1); }}><ArrowDown size={15}/></IconButton><IconButton label="حذف مرحله" onClick={() => removeStep(activeStep)}><Trash2 size={15}/></IconButton></div>} />
            <div className="grid gap-5 p-5 md:grid-cols-2"><Label text="عنوان مرحله"><input className={input} value={current.title} onChange={(e) => updateStep(activeStep, { title: e.target.value })}/></Label><Label text="نوع مرحله"><select className={input} value={current.stepType} onChange={(e) => updateStep(activeStep, { stepType: e.target.value as DynamicStepDefinition["stepType"] })}>{Object.entries(stepLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></Label><div className="md:col-span-2"><Label text="راهنمای مرحله"><input className={input} value={current.description ?? ""} onChange={(e) => updateStep(activeStep, { description: e.target.value })}/></Label></div></div>
          </section>

          <section className="border border-line bg-white">
            <SectionHeader code={`${fieldCount.toString().padStart(2, "0")} / 30 FIELDS`} title="فیلدهای این مرحله" actions={<button onClick={addField} className="inline-flex items-center gap-1.5 bg-brand-primary px-3 py-2 text-[11px] font-black text-white"><Plus size={14}/>فیلد جدید</button>} />
            {current.fields.length === 0 ? <div className="p-12 text-center"><FileText className="mx-auto h-8 w-8 text-brand-primary/30"/><p className="mt-4 text-sm font-bold">این مرحله هنوز فیلدی ندارد.</p><p className="mt-2 text-xs text-ink-muted">یک فیلد متنی، انتخابی یا تأیید اضافه کنید.</p></div> : <div className="divide-y divide-line">{current.fields.map((field, index) => <FieldEditor key={field.id} field={field} index={index} input={input} onChange={(patch) => updateField(activeStep, index, patch)} onMove={(direction) => updateStep(activeStep, { fields: move(current.fields, index, direction) })} onRemove={() => setConfirmation({ title: "حذف فیلد", description: "این فیلد از مرحله فعلی حذف می‌شود.", actionLabel: "حذف فیلد", intent: "danger", onConfirm: () => { adminToast.success("فیلد حذف شد."); updateStep(activeStep, { fields: current.fields.filter((_, i) => i !== index) }); } })}/>)}</div>}
          </section>
        </main>

        <aside className="xl:sticky xl:top-28">
          <div className="border border-[#0c526a] bg-[#0d607b] p-5 text-white"><div className="flex items-center justify-between"><p dir="ltr" className="text-[11px] font-black tracking-[.2em] text-white/60">LIVE / PUBLIC VIEW</p><Eye size={16}/></div><h2 className="mt-5 text-xl font-black">{form.title || "عنوان فرم شما"}</h2><p className="mt-2 text-xs leading-6 text-white/70">{form.serviceName}</p><div dir="ltr" className="mt-5 border-t border-white/20 pt-3 text-[11px] tracking-wider text-white/60">/forms/{form.slug || "form-slug"}<br/>{form.serviceRoute}</div></div>
          <div className="border-x border-b border-line bg-[#fbfdfd] p-5"><div className="flex gap-1">{form.steps.map((_, index) => <button key={index} onClick={() => setPreviewStep(index)} aria-label={`پیش‌نمایش مرحله ${index + 1}`} className={`h-1.5 flex-1 ${index <= previewStep ? "bg-brand-accent" : "bg-line"}`}/>)}</div><div className="mt-7"><p dir="ltr" className="text-[11px] font-black tracking-[.18em] text-brand-primary">STEP / {String(previewStep + 1).padStart(2, "0")}</p><h3 className="mt-2 text-lg font-black">{form.steps[previewStep]?.title}</h3><p className="mt-2 text-xs leading-6 text-ink-muted">{form.steps[previewStep]?.description}</p><div className="mt-6 space-y-5">{form.steps[previewStep]?.fields.map((field) => <PreviewField key={field.id} field={field}/>)}</div><div className="mt-7 flex justify-between"><button disabled={previewStep === 0} onClick={() => setPreviewStep((value) => value - 1)} className="inline-flex items-center gap-1 text-xs font-bold text-ink disabled:opacity-30"><ChevronRight size={15}/>قبلی</button><button onClick={() => setPreviewStep((value) => Math.min(form.steps.length - 1, value + 1))} className="inline-flex items-center gap-1 bg-brand-accent px-4 py-2.5 text-xs font-black text-white">{previewStep === form.steps.length - 1 ? form.submitLabel : "مرحله بعد"}<ChevronLeft size={15}/></button></div></div></div>
          {formId && <div className="mt-3 grid grid-cols-2 gap-2">{form.status === "published" ? <Link href={`/forms/${form.slug}`} className="flex items-center justify-center gap-2 border border-line bg-white p-3 text-[11px] font-bold"><Eye size={14}/>صفحه عمومی</Link> : <div className="flex items-center justify-center border border-dashed border-line bg-white p-3 text-center text-[10px] leading-5 text-ink-muted">انتشار، نشانی عمومی را فعال می‌کند</div>}<Link href={`/admin/forms/${formId}/submissions`} className="flex items-center justify-center gap-2 border border-line bg-white p-3 text-[11px] font-bold"><Copy size={14}/>پاسخ‌ها</Link></div>}
        </aside>
      </div>
      <ConfirmationDialog confirmation={confirmation} onClose={() => setConfirmation(null)} />
      {form.status !== "archived" && <div className="fixed bottom-3 left-3 right-3 z-40 flex items-center justify-between gap-2 border border-line bg-white/95 p-2 shadow-[0_12px_40px_rgba(16,24,32,.18)] backdrop-blur-xl xl:hidden"><div className="min-w-0"><p className="truncate text-[10px] font-black text-ink">{form.title || "فرم جدید"}</p><p className={`mt-0.5 text-[11px] ${!formId || dirty ? "text-orange-700" : "text-emerald-700"}`}>{!formId ? "هنوز ذخیره نشده" : dirty ? "تغییرات ذخیره‌نشده" : "ذخیره‌شده"}</p></div><div className="flex shrink-0 gap-1.5"><button disabled={busy} onClick={() => save("save")} className="inline-flex items-center gap-1 border border-brand-primary px-3 py-2 text-[10px] font-black text-brand-primary disabled:opacity-50"><Save size={13}/>ذخیره</button>{formId && form.status === "published" ? <button disabled={busy} onClick={() => save("unpublish")} className="border border-line px-3 py-2 text-[10px] font-black text-ink disabled:opacity-50">توقف</button> : formId ? <button disabled={busy} onClick={() => save("publish")} className="inline-flex items-center gap-1 bg-brand-accent px-3 py-2 text-[10px] font-black text-white disabled:opacity-50"><Send size={13}/>انتشار</button> : null}</div></div>}
    </div>
  );
}

function FieldEditor({ field, index, input, onChange, onMove, onRemove }: { field: DynamicFieldDefinition; index: number; input: string; onChange: (patch: Partial<DynamicFieldDefinition>) => void; onMove: (direction: -1 | 1) => void; onRemove: () => void }) {
  const choice = field.type === "select" || field.type === "radio";
  return <article className="p-5"><div className="mb-5 flex items-center justify-between"><div><span dir="ltr" className="text-[11px] font-black tracking-[.16em] text-ink-muted">FIELD / {String(index + 1).padStart(2, "0")}</span><h3 className="mt-1 text-sm font-black">{field.label || "بدون عنوان"}</h3></div><div className="flex"><IconButton label="بالا" disabled={index === 0} onClick={() => onMove(-1)}><ArrowUp size={14}/></IconButton><IconButton label="پایین" onClick={() => onMove(1)}><ArrowDown size={14}/></IconButton><IconButton label="حذف" onClick={onRemove}><Trash2 size={14}/></IconButton></div></div><div className="grid gap-4 md:grid-cols-2"><Label text="عنوان"><input className={input} value={field.label} onChange={(e) => onChange({ label: e.target.value })}/></Label><Label text="نوع"><select className={input} value={field.type} onChange={(e) => { const type = e.target.value as DynamicFieldDefinition["type"]; onChange({ type, options: type === "select" || type === "radio" ? field.options ?? ["گزینه اول"] : undefined }); }}>{Object.entries(fieldLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></Label><Label text="متن راهنما"><input className={input} value={field.placeholder ?? ""} onChange={(e) => onChange({ placeholder: e.target.value })}/></Label><Label text="توضیح کمکی"><input className={input} value={field.helpText ?? ""} onChange={(e) => onChange({ helpText: e.target.value })}/></Label><Label text="حداقل طول"><input type="number" min="0" max="5000" className={input} value={field.minLength ?? 0} onChange={(e) => onChange({ minLength: Number(e.target.value) })}/></Label><Label text="حداکثر طول"><input type="number" min="1" max="5000" className={input} value={field.maxLength ?? 200} onChange={(e) => onChange({ maxLength: Number(e.target.value) })}/></Label>{choice && <div className="md:col-span-2"><Label text="گزینه‌ها" help="هر گزینه در یک خط"><textarea className={`${input} min-h-28`} value={(field.options ?? []).join("\n")} onChange={(e) => onChange({ options: e.target.value.split("\n").slice(0, 50) })}/></Label></div>}<label className="flex items-center gap-2 text-xs font-bold"><input type="checkbox" checked={field.required} onChange={(e) => onChange({ required: e.target.checked })} className="h-4 w-4 accent-[#fc8502]"/>تکمیل این فیلد الزامی است</label></div></article>;
}

function PreviewField({ field }: { field: DynamicFieldDefinition }) { const className = "mt-2 w-full border border-line bg-white px-3 py-2.5 text-xs outline-none"; return <div><label className="text-xs font-bold">{field.label}{field.required && <span className="mr-1 text-brand-accent">*</span>}</label>{field.type === "textarea" ? <textarea disabled placeholder={field.placeholder} className={`${className} min-h-20 resize-none`}/> : field.type === "select" ? <select disabled className={className}><option>{field.placeholder || "انتخاب کنید"}</option>{field.options?.map((option, optionIndex) => <option key={`${field.id}-option-${optionIndex}`}>{option}</option>)}</select> : field.type === "radio" ? <div className="mt-2 space-y-2">{field.options?.map((option, optionIndex) => <label key={`${field.id}-option-${optionIndex}`} className="flex gap-2 text-xs"><input disabled type="radio"/>{option}</label>)}</div> : field.type === "checkbox" ? <label className="mt-2 flex gap-2 text-xs"><input disabled type="checkbox"/>{field.placeholder || "تأیید می‌کنم"}</label> : <input disabled type={field.type === "email" ? "email" : field.type === "number" ? "number" : "text"} placeholder={field.placeholder} className={className}/>} {field.helpText && <p className="mt-1 text-[10px] text-ink-muted">{field.helpText}</p>}</div>; }
function ConfirmationDialog({ confirmation, onClose }: { confirmation: Confirmation; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!confirmation || !dialog) return;

    dialog.showModal();
    cancelRef.current?.focus({ preventScroll: true });

    return () => {
      if (dialog.open) dialog.close();
    };
  }, [confirmation]);

  if (!confirmation) return null;

  return (
    <dialog
      ref={dialogRef}
      dir="rtl"
      aria-labelledby="dynamic-form-confirmation-title"
      aria-describedby="dynamic-form-confirmation-description"
      className="
        fixed
        inset-0
        m-auto
        h-fit
        max-h-[calc(100dvh-32px)]
        w-[min(440px,calc(100vw-32px))]
        max-w-none
        overflow-y-auto
        border
        border-line
        bg-white
        p-0
        text-ink
        shadow-[0_28px_90px_rgba(3,45,59,0.26)]
        backdrop:bg-[#02151d]/45
        backdrop:backdrop-blur-[7px]
      "
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <div className="border-b border-line p-5">
        <p
          dir="ltr"
          className="text-[10px] font-black tracking-[0.18em] text-brand-primary"
        >
          CONFIRM ACTION
        </p>
        <h2
          id="dynamic-form-confirmation-title"
          className="mt-2 text-lg font-black"
        >
          {confirmation.title}
        </h2>
        <p
          id="dynamic-form-confirmation-description"
          className="mt-3 text-xs leading-7 text-ink-muted"
        >
          {confirmation.description}
        </p>
      </div>
      <div className="flex flex-col-reverse gap-2 p-4 sm:flex-row sm:justify-end">
        <button
          ref={cancelRef}
          type="button"
          onClick={onClose}
          className="min-h-11 cursor-pointer border border-line bg-white px-5 text-xs font-black text-ink transition hover:border-brand-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus/20"
        >
          انصراف
        </button>
        <button
          type="button"
          onClick={() => {
            confirmation.onConfirm();
            onClose();
          }}
          className={`min-h-11 cursor-pointer px-5 text-xs font-black text-white transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus/25 ${
            confirmation.intent === "danger"
              ? "bg-red-700 hover:bg-red-800"
              : "bg-brand-accent hover:bg-[#ec7d01]"
          }`}
        >
          {confirmation.actionLabel}
        </button>
      </div>
    </dialog>
  );
}
function Label({ text, help, children }: { text: string; help?: string; children: React.ReactNode }) { return <label className="text-xs font-bold text-ink"><span className="flex justify-between gap-2"><span>{text}</span>{help && <span dir="ltr" className="font-normal text-ink-muted">{help}</span>}</span>{children}</label>; }
function IconButton({ label, disabled, onClick, children }: { label: string; disabled?: boolean; onClick: () => void; children: React.ReactNode }) { return <button type="button" aria-label={label} title={label} disabled={disabled} onClick={onClick} className="border border-line bg-white p-2 text-ink transition hover:border-brand-accent hover:text-brand-accent disabled:opacity-25">{children}</button>; }
function SectionHeader({ code, title, actions }: { code: string; title: string; actions?: React.ReactNode }) { return <header className="flex items-center justify-between gap-4 border-b border-line px-5 py-4"><div><p dir="ltr" className="text-[11px] font-black tracking-[.18em] text-brand-primary">{code}</p><h2 className="mt-1 text-base font-black">{title}</h2></div>{actions}</header>; }
