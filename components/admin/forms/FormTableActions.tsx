"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ClipboardList,
  Eye,
  FilePenLine,
  Globe2,
  Layers3,
  Link2,
  Save,
  type LucideIcon,
} from "lucide-react";

import { AdminModal } from "@/components/admin/AdminModal";
import { adminToast } from "@/components/admin/adminToast";
import { AdminStatusBadge, type AdminStatusTone } from "@/components/admin/AdminStatusBadge";
import { DeleteRecordButton } from "@/components/admin/DeleteRecordButton";
import {
  SERVICE_CATALOG,
  type ServiceKey,
} from "@/lib/services";
import type {
  DynamicFormStatus,
  DynamicFormType,
  DynamicStepDefinition,
} from "@/lib/dynamic-forms";

export type AdminDynamicFormTableRow = {
  id: string;
  title: string;
  slug: string;
  status: DynamicFormStatus;
  formType: DynamicFormType;
  serviceName: string;
  revision: number;
  updatedAt: string;
  submissions: number;
};

type DynamicFormDetails = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  formType: DynamicFormType;
  serviceKey: ServiceKey;
  serviceName: string;
  serviceRoute: string;
  status: DynamicFormStatus;
  steps: DynamicStepDefinition[];
  submitLabel: string;
  successMessage: string;
  revision: number;
  publishedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

type QuickEditState = Pick<
  DynamicFormDetails,
  | "title"
  | "slug"
  | "description"
  | "formType"
  | "serviceKey"
  | "status"
  | "submitLabel"
  | "successMessage"
>;

type FieldErrors = Partial<Record<keyof QuickEditState, string>> & {
  steps?: string;
  fields?: string;
};

const statusLabel: Record<DynamicFormStatus, string> = {
  draft: "پیش‌نویس",
  published: "منتشرشده",
  archived: "بایگانی",
};

const statusTone: Record<DynamicFormStatus, AdminStatusTone> = {
  draft: "accent",
  published: "success",
  archived: "muted",
};

const typeLabel: Record<DynamicFormType, string> = {
  single_step: "تک‌مرحله‌ای",
  multi_step: "چندمرحله‌ای",
  service_assessment: "ارزیابی خدمت",
};

export function FormTableActions({
  form,
  compact = false,
}: {
  form: AdminDynamicFormTableRow;
  compact?: boolean;
}) {
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [details, setDetails] = useState<DynamicFormDetails | null>(null);
  const [draft, setDraft] = useState<QuickEditState | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    if ((!viewOpen && !editOpen) || details || loading || loadError) return;

    let cancelled = false;
    const controller = new AbortController();

    async function loadForm() {
      setLoading(true);
      setLoadError("");

      try {
        const response = await fetch(`/api/admin/forms/${form.id}`, {
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });

        const payload = (await response.json().catch(() => null)) as {
          form?: DynamicFormDetails;
          message?: string;
        } | null;

        if (!response.ok || !payload?.form) {
          throw new Error(payload?.message || "دریافت فرم انجام نشد.");
        }

        if (cancelled) return;

        setDetails(payload.form);
        setDraft(makeDraft(payload.form));
      } catch (error) {
        if (cancelled || controller.signal.aborted) return;

        setLoadError(
          error instanceof Error
            ? error.message
            : "خطای پیش‌بینی‌نشده در دریافت فرم.",
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadForm();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [details, editOpen, form.id, loadError, loading, viewOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setLoadError("");
          setViewOpen(true);
        }}
        title={compact ? "مشاهده" : undefined}
        aria-label={compact ? `مشاهده فرم ${form.title}` : undefined}
        className={tableActionButtonClass({ compact })}
      >
        <Eye size={15} aria-hidden="true" />
        {compact ? null : "مشاهده"}
      </button>

      <button
        type="button"
        onClick={() => {
          setLoadError("");
          setEditOpen(true);
        }}
        title={compact ? "ویرایش سریع" : undefined}
        aria-label={compact ? `ویرایش سریع فرم ${form.title}` : undefined}
        className={tableActionButtonClass({ compact, primary: true })}
      >
        <FilePenLine size={15} aria-hidden="true" />
        {compact ? null : "ویرایش"}
      </button>

      <Link
        href={`/admin/forms/${form.id}/submissions`}
        title={compact ? "پاسخ‌ها" : undefined}
        aria-label={compact ? `پاسخ‌های فرم ${form.title}` : undefined}
        className={tableActionButtonClass({ compact })}
      >
        <ArrowLeft size={15} aria-hidden="true" />
        {compact ? null : "پاسخ‌ها"}
      </Link>

      {form.status === "published" ? (
        <Link
          href={`/forms/${form.slug}`}
          title={compact ? "مشاهده عمومی" : undefined}
          aria-label={compact ? `مشاهده عمومی فرم ${form.title}` : undefined}
          className={tableActionButtonClass({ compact })}
        >
          <Globe2 size={15} aria-hidden="true" />
          {compact ? null : "عمومی"}
        </Link>
      ) : null}

      <DeleteRecordButton
        endpoint={`/api/admin/forms/${form.id}`}
        title={`حذف فرم «${form.title}»`}
        description={`این عملیات فرم /forms/${form.slug} و همه پاسخ‌های ثبت‌شده آن را حذف می‌کند و قابل بازگشت نیست.`}
        compact={compact}
      />

      <AdminModal
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        eyebrow="FORM / VIEW"
        title={`جزئیات فرم «${form.title}»`}
        size="lg"
      >
        <FormViewPanel
          details={details}
          loading={loading}
          error={loadError}
          summary={form}
        />
      </AdminModal>

      <AdminModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        eyebrow="FORM / QUICK EDIT"
        title="ویرایش سریع فرم"
        size="xl"
      >
        <FormQuickEditPanel
          details={details}
          draft={draft}
          setDraft={setDraft}
          loading={loading}
          error={loadError}
          formId={form.id}
          onSaved={(nextDetails) => {
            setDetails(nextDetails);
            setDraft(makeDraft(nextDetails));
          }}
        />
      </AdminModal>
    </>
  );
}

function makeDraft(details: DynamicFormDetails): QuickEditState {
  return {
    title: details.title,
    slug: details.slug,
    description: details.description,
    formType: details.formType,
    serviceKey: details.serviceKey,
    status: details.status,
    submitLabel: details.submitLabel,
    successMessage: details.successMessage,
  };
}

function tableActionButtonClass({
  compact,
  primary = false,
}: {
  compact: boolean;
  primary?: boolean;
}) {
  return `
    inline-flex
    cursor-pointer
    items-center
    justify-center
    gap-2
    rounded-[14px]
    border
    text-xs
    font-black
    transition
    focus-visible:outline-none
    focus-visible:ring-4
    focus-visible:ring-focus/20

    ${
      primary
        ? "border-brand-primary bg-brand-primary text-white hover:bg-brand-secondary"
        : "border-line bg-white text-ink hover:border-brand-accent hover:text-brand-primary"
    }

    ${compact ? "h-9 w-9" : "min-h-10 px-3 py-2"}
  `;
}

function FormViewPanel({
  details,
  loading,
  error,
  summary,
}: {
  details: DynamicFormDetails | null;
  loading: boolean;
  error: string;
  summary: AdminDynamicFormTableRow;
}) {
  if (loading) {
    return <ModalState text="در حال دریافت جزئیات فرم..." />;
  }

  if (error) {
    return <ModalState tone="error" text={error} />;
  }

  const stepCount = details?.steps.length ?? 0;
  const fieldCount =
    details?.steps.reduce((total, step) => total + step.fields.length, 0) ?? 0;

  return (
    <div className="p-5">
      <div className="grid gap-px overflow-hidden rounded-[18px] border border-line bg-line sm:grid-cols-2">
        <ViewItem
          icon={ClipboardList}
          label="عنوان فرم"
          value={details?.title ?? summary.title}
          code={`FRM-${summary.id.slice(-6).toUpperCase()}`}
        />
        <ViewItem
          icon={Link2}
          label="مسیر عمومی"
          value={`/forms/${details?.slug ?? summary.slug}`}
          ltr
        />
        <ViewItem
          icon={Layers3}
          label="نوع و وضعیت"
          value={
            <span className="inline-flex flex-wrap items-center gap-2">
              <AdminStatusBadge tone={statusTone[details?.status ?? summary.status]}>
                {statusLabel[details?.status ?? summary.status]}
              </AdminStatusBadge>
              <span>{typeLabel[details?.formType ?? summary.formType]}</span>
            </span>
          }
        />
        <ViewItem
          icon={ClipboardList}
          label="ساختار"
          value={`${stepCount.toLocaleString("fa-IR")} مرحله · ${fieldCount.toLocaleString("fa-IR")} فیلد · ${summary.submissions.toLocaleString("fa-IR")} پاسخ`}
        />
        <ViewItem
          icon={Globe2}
          label="خدمت مرتبط"
          value={details?.serviceName ?? summary.serviceName}
          wide
        />
        <ViewItem
          icon={ClipboardList}
          label="توضیحات"
          value={details?.description || "—"}
          wide
        />
      </div>

      {details?.steps.length ? (
        <div className="mt-4 space-y-2">
          {details.steps.map((step, index) => (
            <StepSummary key={step.id} step={step} index={index} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function StepSummary({
  step,
  index,
}: {
  step: DynamicStepDefinition;
  index: number;
}) {
  return (
    <article className="rounded-[16px] border border-line bg-[#fbfdfd] p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-black text-brand-primary">
            مرحله {Number(index + 1).toLocaleString("fa-IR")}
          </p>
          <h3 className="mt-1 text-sm font-black text-ink">{step.title}</h3>
        </div>
        <span className="rounded-full border border-line bg-white px-2.5 py-1 text-[10px] font-black text-ink-muted">
          {step.fields.length.toLocaleString("fa-IR")} فیلد
        </span>
      </div>

      {step.description ? (
        <p className="mt-2 text-xs leading-6 text-ink-muted">
          {step.description}
        </p>
      ) : null}

      <div className="mt-3 flex flex-wrap gap-2">
        {step.fields.map((field) => (
          <span
            key={field.id}
            className="rounded-full border border-line bg-white px-2.5 py-1 text-[10px] font-bold text-ink-muted"
          >
            {field.label}
          </span>
        ))}
      </div>
    </article>
  );
}

function FormQuickEditPanel({
  details,
  draft,
  setDraft,
  loading,
  error,
  formId,
  onSaved,
}: {
  details: DynamicFormDetails | null;
  draft: QuickEditState | null;
  setDraft: React.Dispatch<React.SetStateAction<QuickEditState | null>>;
  loading: boolean;
  error: string;
  formId: string;
  onSaved: (details: DynamicFormDetails) => void;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!details || !draft) return;

    setBusy(true);
    setMessage("");
    setSubmitError("");
    setFieldErrors({});

    const selectedService = SERVICE_CATALOG.find(
      (service) => service.key === draft.serviceKey,
    );
    const toastId = adminToast.loading("در حال ذخیره فرم...");

    try {
      const action =
        draft.status === "published"
          ? "publish"
          : draft.status === "archived"
            ? "archive"
            : details.status === "published"
              ? "unpublish"
              : "save";

      const response = await fetch(`/api/admin/forms/${formId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...details,
          ...draft,
          serviceName: selectedService?.name ?? details.serviceName,
          serviceRoute: selectedService?.route ?? details.serviceRoute,
          expectedRevision: details.revision,
          revision: details.revision,
          action,
        }),
      });

      const payload = (await response.json().catch(() => null)) as {
        message?: string;
        revision?: number;
        status?: DynamicFormStatus;
        errors?: FieldErrors;
      } | null;

      if (!response.ok) {
        setFieldErrors(payload?.errors ?? {});
        throw new Error(payload?.message || "ذخیره فرم انجام نشد.");
      }

      const nextDetails: DynamicFormDetails = {
        ...details,
        ...draft,
        serviceName: selectedService?.name ?? details.serviceName,
        serviceRoute: selectedService?.route ?? details.serviceRoute,
        revision: payload?.revision ?? details.revision + 1,
        status: payload?.status ?? draft.status,
      };
      const successMessage = payload?.message ?? "فرم ذخیره شد.";

      adminToast.dismiss(toastId);
      adminToast.success(successMessage);
      setMessage(successMessage);
      onSaved(nextDetails);
      router.refresh();
    } catch (submitErrorValue) {
      const errorMessage =
        submitErrorValue instanceof Error
          ? submitErrorValue.message
          : "خطای پیش‌بینی‌نشده در ذخیره فرم.";

      adminToast.dismiss(toastId);
      adminToast.error(errorMessage);
      setSubmitError(errorMessage);
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return <ModalState text="در حال آماده‌سازی فرم برای ویرایش..." />;
  }

  if (error) {
    return <ModalState tone="error" text={error} />;
  }

  if (!details || !draft) {
    return <ModalState text="جزئیات فرم هنوز آماده نیست." />;
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div className="grid gap-5 p-5 md:grid-cols-2">
        <FormField label="عنوان فرم" error={fieldErrors.title}>
          <input
            value={draft.title}
            onChange={(event) =>
              setDraft((value) =>
                value ? { ...value, title: event.target.value } : value,
              )
            }
            aria-invalid={Boolean(fieldErrors.title)}
            className="mt-2 w-full rounded-[14px] border border-line bg-white px-3.5 py-3 text-sm text-ink outline-none transition focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10"
          />
        </FormField>

        <FormField label="شناسه مسیر" error={fieldErrors.slug}>
          <input
            dir="ltr"
            value={draft.slug}
            onChange={(event) =>
              setDraft((value) =>
                value ? { ...value, slug: event.target.value } : value,
              )
            }
            aria-invalid={Boolean(fieldErrors.slug)}
            className="mt-2 w-full rounded-[14px] border border-line bg-white px-3.5 py-3 text-left text-sm text-ink outline-none transition focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10"
          />
        </FormField>

        <FormField label="خدمت مرتبط" error={fieldErrors.serviceKey}>
          <select
            value={draft.serviceKey}
            onChange={(event) =>
              setDraft((value) =>
                value
                  ? {
                      ...value,
                      serviceKey: event.target.value as ServiceKey,
                    }
                  : value,
              )
            }
            aria-invalid={Boolean(fieldErrors.serviceKey)}
            className="mt-2 w-full rounded-[14px] border border-line bg-white px-3.5 py-3 text-sm text-ink outline-none transition focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10"
          >
            {SERVICE_CATALOG.map((service) => (
              <option key={service.key} value={service.key}>
                {service.name}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="وضعیت" error={fieldErrors.status}>
          <select
            value={draft.status}
            onChange={(event) =>
              setDraft((value) =>
                value
                  ? {
                      ...value,
                      status: event.target.value as DynamicFormStatus,
                    }
                  : value,
              )
            }
            aria-invalid={Boolean(fieldErrors.status)}
            className="mt-2 w-full rounded-[14px] border border-line bg-white px-3.5 py-3 text-sm text-ink outline-none transition focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10"
          >
            <option value="draft">پیش‌نویس</option>
            <option value="published">منتشرشده</option>
            <option value="archived">بایگانی</option>
          </select>
        </FormField>

        <FormField label="نوع فرم" error={fieldErrors.formType}>
          <select
            value={draft.formType}
            onChange={(event) =>
              setDraft((value) =>
                value
                  ? {
                      ...value,
                      formType: event.target.value as DynamicFormType,
                    }
                  : value,
              )
            }
            aria-invalid={Boolean(fieldErrors.formType)}
            className="mt-2 w-full rounded-[14px] border border-line bg-white px-3.5 py-3 text-sm text-ink outline-none transition focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10"
          >
            <option value="single_step">تک‌مرحله‌ای</option>
            <option value="multi_step">چندمرحله‌ای</option>
            <option value="service_assessment">ارزیابی خدمت</option>
          </select>
        </FormField>

        <FormField label="متن دکمه ثبت" error={fieldErrors.submitLabel}>
          <input
            value={draft.submitLabel}
            onChange={(event) =>
              setDraft((value) =>
                value ? { ...value, submitLabel: event.target.value } : value,
              )
            }
            aria-invalid={Boolean(fieldErrors.submitLabel)}
            className="mt-2 w-full rounded-[14px] border border-line bg-white px-3.5 py-3 text-sm text-ink outline-none transition focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10"
          />
        </FormField>

        <FormField
          label="توضیحات فرم"
          error={fieldErrors.description}
          wide
        >
          <textarea
            value={draft.description}
            onChange={(event) =>
              setDraft((value) =>
                value ? { ...value, description: event.target.value } : value,
              )
            }
            aria-invalid={Boolean(fieldErrors.description)}
            className="mt-2 min-h-28 w-full resize-none rounded-[14px] border border-line bg-white px-3.5 py-3 text-sm leading-7 text-ink outline-none transition focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10"
          />
        </FormField>

        <FormField
          label="پیام موفقیت"
          error={fieldErrors.successMessage}
          wide
        >
          <textarea
            value={draft.successMessage}
            onChange={(event) =>
              setDraft((value) =>
                value
                  ? { ...value, successMessage: event.target.value }
                  : value,
              )
            }
            aria-invalid={Boolean(fieldErrors.successMessage)}
            className="mt-2 min-h-24 w-full resize-none rounded-[14px] border border-line bg-white px-3.5 py-3 text-sm leading-7 text-ink outline-none transition focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10"
          />
        </FormField>
      </div>

      {submitError || message || fieldErrors.steps || fieldErrors.fields ? (
        <div className="px-5 pb-5">
          <p
            role={submitError ? "alert" : "status"}
            className={`rounded-[14px] border p-3 text-xs leading-6 ${
              submitError || fieldErrors.steps || fieldErrors.fields
                ? "border-red-200 bg-red-50 text-red-800"
                : "border-emerald-200 bg-emerald-50 text-emerald-800"
            }`}
          >
            {submitError || fieldErrors.steps || fieldErrors.fields || message}
          </p>
        </div>
      ) : null}

      <footer className="sticky bottom-0 flex flex-col-reverse gap-2 border-t border-line bg-white/95 p-4 backdrop-blur-xl sm:flex-row sm:justify-between">
        <Link
          href={`/admin/forms/${formId}/edit`}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[14px] border border-line bg-white px-4 py-2.5 text-xs font-black text-ink transition hover:border-brand-primary hover:text-brand-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus/20"
        >
          <FilePenLine size={15} aria-hidden="true" />
          ویرایش کامل ساختار
        </Link>

        <button
          type="submit"
          disabled={busy}
          className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-[14px] bg-brand-primary px-5 py-2.5 text-xs font-black text-white transition hover:bg-brand-secondary disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus/25"
        >
          <Save size={15} aria-hidden="true" />
          {busy ? "در حال ذخیره..." : "ذخیره تغییرات"}
        </button>
      </footer>
    </form>
  );
}

function ModalState({
  text,
  tone = "default",
}: {
  text: string;
  tone?: "default" | "error";
}) {
  return (
    <div className="p-5">
      <p
        role={tone === "error" ? "alert" : "status"}
        className={`rounded-[16px] border p-4 text-sm leading-7 ${
          tone === "error"
            ? "border-red-200 bg-red-50 text-red-800"
            : "border-line bg-[#fbfdfd] text-ink-muted"
        }`}
      >
        {text}
      </p>
    </div>
  );
}

function ViewItem({
  icon: Icon,
  label,
  value,
  code,
  ltr = false,
  wide = false,
}: {
  icon: LucideIcon;
  label: string;
  value: ReactNode;
  code?: string;
  ltr?: boolean;
  wide?: boolean;
}) {
  return (
    <div className={`bg-white p-4 ${wide ? "sm:col-span-2" : ""}`}>
      <div className="flex items-center gap-2 text-[10px] font-black text-ink-muted">
        <Icon size={14} aria-hidden="true" />
        {label}
      </div>

      <div
        dir={ltr ? "ltr" : "rtl"}
        className={`mt-3 whitespace-pre-wrap text-sm font-black leading-7 text-ink ${ltr ? "text-left" : ""}`}
      >
        {value || "—"}
      </div>

      {code ? (
        <p
          dir="ltr"
          className="mt-3 text-[10px] font-bold tracking-[0.16em] text-ink-muted/70"
        >
          {code}
        </p>
      ) : null}
    </div>
  );
}

function FormField({
  label,
  error,
  wide = false,
  children,
}: {
  label: string;
  error?: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <label className={`block text-xs font-bold text-ink ${wide ? "md:col-span-2" : ""}`}>
      {label}
      {children}
      {error ? (
        <span className="mt-2 block text-[11px] leading-5 text-red-700">
          {error}
        </span>
      ) : null}
    </label>
  );
}
