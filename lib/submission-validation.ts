import type {
  DynamicFieldDefinition,
  DynamicFormDefinition,
} from "@/lib/dynamic-forms";
import {
  isValidEmail,
  isValidPhone,
  normalizeDigits,
  normalizeIranianPhone,
} from "@/lib/validation";

export class SubmissionError extends Error {
  constructor(public issues: Record<string, string>) {
    super("Invalid form submission");
  }
}

export type AnswerSnapshot = {
  fieldId: string;
  label: string;
  type: DynamicFieldDefinition["type"];
  value: string | string[] | boolean;
};

export function validateSubmission(
  definition: Pick<DynamicFormDefinition, "steps">,
  raw: unknown,
  locale: "fa" | "en" = "fa",
): AnswerSnapshot[] {
  const fa = locale === "fa";
  const issues: Record<string, string> = {};
  const payload =
    raw && typeof raw === "object" && !Array.isArray(raw)
      ? (raw as Record<string, unknown>)
      : {};
  const source =
    payload.answers &&
    typeof payload.answers === "object" &&
    !Array.isArray(payload.answers)
      ? (payload.answers as Record<string, unknown>)
      : {};
  const fields = definition.steps.flatMap((step) => step.fields);
  const allowed = new Set(fields.map((field) => field.id));
  for (const key of Object.keys(source))
    if (!allowed.has(key)) issues[key] = fa ? "فیلد ناشناخته ارسال شده است." : "Unknown field.";
  const answers = fields.map((field): AnswerSnapshot => {
    const value = source[field.id];
    const min = field.minLength ?? 0;
    const max = field.maxLength ?? (field.type === "textarea" ? 1200 : 200);
    if (field.type === "checkbox") {
      const checked = value === true;
      if (field.required && !checked)
        issues[field.id] = fa ? "تأیید این مورد الزامی است." : "Confirm this item to continue.";
      return {
        fieldId: field.id,
        label: field.label,
        type: field.type,
        value: checked,
      };
    }
    if (field.type === "radio" || field.type === "select") {
      const selection = typeof value === "string" ? value : "";
      if (selection && !field.options?.includes(selection)) {
        issues[field.id] = fa ? "گزینه انتخاب‌شده معتبر نیست." : "Choose one of the listed options.";
      } else if (field.required && !selection) {
        issues[field.id] = fa ? "تکمیل این فیلد الزامی است." : "This field is required.";
      }
      return { fieldId: field.id, label: field.label, type: field.type, value: selection };
    }
    let text = typeof value === "string" ? value.trim() : "";
    if (field.type === "phone") text = normalizeIranianPhone(text);
    if (field.type === "number") text = normalizeDigits(text).replace(/٫/g, ".");
    if (field.required && !text)
      issues[field.id] = fa ? "تکمیل این فیلد الزامی است." : "This field is required.";
    if (text && text.length < min)
      issues[field.id] = fa ? `حداقل ${min.toLocaleString(locale)} نویسه وارد کنید.` : `Enter at least ${min} characters.`;
    if (text.length > max)
      issues[field.id] = fa ? `حداکثر ${max.toLocaleString(locale)} نویسه مجاز است.` : `Use up to ${max} characters.`;
    if (field.type === "phone" && text && !isValidPhone(text))
      issues[field.id] = fa ? "شماره موبایل معتبر وارد کنید." : "Enter a valid Iranian mobile number.";
    if (field.type === "email" && text && !isValidEmail(text))
      issues[field.id] = fa ? "ایمیل معتبر وارد کنید." : "Enter a valid email address.";
    if (field.type === "number" && text && !Number.isFinite(Number(text)))
      issues[field.id] = fa ? "یک عدد معتبر وارد کنید." : "Enter a valid number.";
    return {
      fieldId: field.id,
      label: field.label,
      type: field.type,
      value: text,
    };
  });
  if (Object.keys(issues).length) throw new SubmissionError(issues);
  return answers;
}
