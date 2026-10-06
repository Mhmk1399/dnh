import {
  FIELD_TYPES, FORM_STATUSES, FORM_TYPES, STEP_TYPES,
  type DynamicFieldDefinition, type DynamicFormDefinition, type DynamicFormStatus, type DynamicStepDefinition,
} from "@/lib/dynamic-forms";
import { getService } from "@/lib/services";
import { cleanText } from "@/lib/validation";

export class FormDefinitionError extends Error {
  constructor(public issues: Record<string, string>) { super("Invalid dynamic form definition"); }
}

const isOneOf = <T extends readonly string[]>(value: unknown, values: T): value is T[number] =>
  typeof value === "string" && values.includes(value as T[number]);

export function normalizeSlug(value: unknown) {
  return cleanText(value, 80).toLowerCase().normalize("NFKD")
    .replace(/[^a-z0-9\s_-]/g, "").replace(/[\s_]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

function integer(value: unknown, fallback: number, min: number, max: number) {
  const parsed = Number(value);
  return Number.isInteger(parsed) ? Math.min(max, Math.max(min, parsed)) : fallback;
}

function stableId(value: unknown, path: string, issues: Record<string, string>) {
  const id = cleanText(value, 100);
  if (!/^(step|field)_[a-zA-Z0-9_-]{4,90}$/.test(id)) issues[path] = "شناسه پایدار معتبر نیست.";
  return id;
}

function parseField(raw: unknown, path: string, issues: Record<string, string>): DynamicFieldDefinition {
  const value = raw && typeof raw === "object" && !Array.isArray(raw) ? raw as Record<string, unknown> : {};
  const type = isOneOf(value.type, FIELD_TYPES) ? value.type : "text";
  const label = cleanText(value.label, 120);
  const choice = type === "select" || type === "radio";
  const options = Array.isArray(value.options)
    ? value.options.slice(0, 51).map((item) => cleanText(item, 100)).filter(Boolean)
    : [];
  if (!label) issues[`${path}.label`] = "عنوان فیلد الزامی است.";
  if (!isOneOf(value.type, FIELD_TYPES)) issues[`${path}.type`] = "نوع فیلد معتبر نیست.";
  if (choice && options.length < 1) issues[`${path}.options`] = "حداقل یک گزینه وارد کنید.";
  if (options.length > 50) issues[`${path}.options`] = "حداکثر ۵۰ گزینه مجاز است.";
  if (new Set(options).size !== options.length) issues[`${path}.options`] = "گزینه‌های تکراری مجاز نیست.";
  const minLength = integer(value.minLength, 0, 0, 5000);
  const maxLength = integer(value.maxLength, type === "textarea" ? 1200 : 200, 1, 5000);
  if (minLength > maxLength) issues[`${path}.length`] = "حداقل طول نمی‌تواند از حداکثر بیشتر باشد.";
  return {
    id: stableId(value.id, `${path}.id`, issues), type, label,
    required: value.required === true,
    placeholder: cleanText(value.placeholder, 180) || undefined,
    helpText: cleanText(value.helpText, 300) || undefined,
    options: choice ? options : undefined,
    minLength, maxLength,
  };
}

function parseStep(raw: unknown, index: number, issues: Record<string, string>): DynamicStepDefinition {
  const path = `steps.${index}`;
  const value = raw && typeof raw === "object" && !Array.isArray(raw) ? raw as Record<string, unknown> : {};
  const fields = Array.isArray(value.fields) ? value.fields : [];
  const title = cleanText(value.title, 120);
  if (!title) issues[`${path}.title`] = "عنوان مرحله الزامی است.";
  if (!isOneOf(value.stepType, STEP_TYPES)) issues[`${path}.stepType`] = "نوع مرحله معتبر نیست.";
  return {
    id: stableId(value.id, `${path}.id`, issues), title,
    description: cleanText(value.description, 400) || undefined,
    stepType: isOneOf(value.stepType, STEP_TYPES) ? value.stepType : "custom",
    fields: fields.map((field, fieldIndex) => parseField(field, `${path}.fields.${fieldIndex}`, issues)),
  };
}

export function validateFormDefinition(raw: unknown, requestedStatus?: DynamicFormStatus): DynamicFormDefinition {
  const issues: Record<string, string> = {};
  const value = raw && typeof raw === "object" && !Array.isArray(raw) ? raw as Record<string, unknown> : {};
  const title = cleanText(value.title, 140);
  const slug = normalizeSlug(value.slug);
  const stepsRaw = Array.isArray(value.steps) ? value.steps : [];
  const service = getService(cleanText(value.serviceKey, 80));
  const formType = isOneOf(value.formType, FORM_TYPES) ? value.formType : "multi_step";
  const status = requestedStatus ?? (isOneOf(value.status, FORM_STATUSES) ? value.status : "draft");
  if (title.length < 3) issues.title = "عنوان باید حداقل ۳ حرف باشد.";
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) issues.slug = "شناسه مسیر باید انگلیسی و با خط تیره باشد.";
  if (!service) issues.serviceKey = "خدمت مرتبط معتبر نیست.";
  if (stepsRaw.length < 1) issues.steps = "حداقل یک مرحله لازم است.";
  if (stepsRaw.length > 10) issues.steps = "حداکثر ۱۰ مرحله مجاز است.";
  if (formType === "single_step" && stepsRaw.length !== 1) issues.steps = "فرم تک‌مرحله‌ای باید دقیقاً یک مرحله داشته باشد.";
  const steps = stepsRaw.slice(0, 10).map((step, index) => parseStep(step, index, issues));
  const fields = steps.flatMap((step) => step.fields);
  if (fields.length > 30) issues.fields = "حداکثر ۳۰ فیلد مجاز است.";
  const ids = [...steps.map((step) => step.id), ...fields.map((field) => field.id)];
  if (ids.some((id, index) => ids.indexOf(id) !== index)) issues.ids = "شناسه مراحل و فیلدها باید یکتا باشد.";
  const submitLabel = cleanText(value.submitLabel, 80) || "ثبت درخواست";
  const successMessage = cleanText(value.successMessage, 500) || "درخواست شما با موفقیت ثبت شد.";
  if (Object.keys(issues).length) throw new FormDefinitionError(issues);
  return {
    title, slug, description: cleanText(value.description, 700), formType,
    serviceKey: service!.key, serviceName: service!.name, serviceRoute: service!.route,
    status, steps, submitLabel, successMessage,
    revision: integer(value.revision, 0, 0, Number.MAX_SAFE_INTEGER),
  };
}

