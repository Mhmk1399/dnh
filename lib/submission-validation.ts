import type { DynamicFieldDefinition, DynamicFormDefinition } from "@/lib/dynamic-forms";
import { cleanText, isValidEmail, isValidPhone, normalizeDigits, normalizeIranianPhone } from "@/lib/validation";

export class SubmissionError extends Error {
  constructor(public issues: Record<string, string>) { super("Invalid form submission"); }
}

export type AnswerSnapshot = { fieldId: string; label: string; type: DynamicFieldDefinition["type"]; value: string | string[] | boolean };

export function validateSubmission(definition: Pick<DynamicFormDefinition, "steps">, raw: unknown): AnswerSnapshot[] {
  const issues: Record<string, string> = {};
  const payload = raw && typeof raw === "object" && !Array.isArray(raw) ? raw as Record<string, unknown> : {};
  const source = payload.answers && typeof payload.answers === "object" && !Array.isArray(payload.answers)
    ? payload.answers as Record<string, unknown> : {};
  const fields = definition.steps.flatMap((step) => step.fields);
  const allowed = new Set(fields.map((field) => field.id));
  for (const key of Object.keys(source)) if (!allowed.has(key)) issues[key] = "فیلد ناشناخته ارسال شده است.";
  const answers = fields.map((field): AnswerSnapshot => {
    const value = source[field.id];
    const min = field.minLength ?? 0;
    const max = field.maxLength ?? (field.type === "textarea" ? 1200 : 200);
    if (field.type === "checkbox") {
      const checked = value === true;
      if (field.required && !checked) issues[field.id] = "تأیید این مورد الزامی است.";
      return { fieldId: field.id, label: field.label, type: field.type, value: checked };
    }
    let text = cleanText(value, max + 1);
    if (field.type === "phone") text = normalizeIranianPhone(text);
    if (field.type === "number") text = normalizeDigits(text);
    if (field.required && !text) issues[field.id] = "تکمیل این فیلد الزامی است.";
    if (text && text.length < min) issues[field.id] = `حداقل ${min.toLocaleString("fa-IR")} نویسه وارد کنید.`;
    if (text.length > max) issues[field.id] = `حداکثر ${max.toLocaleString("fa-IR")} نویسه مجاز است.`;
    if (field.type === "phone" && text && !isValidPhone(text)) issues[field.id] = "شماره موبایل معتبر وارد کنید.";
    if (field.type === "email" && text && !isValidEmail(text)) issues[field.id] = "ایمیل معتبر وارد کنید.";
    if (field.type === "number" && text && !Number.isFinite(Number(text))) issues[field.id] = "یک عدد معتبر وارد کنید.";
    if ((field.type === "select" || field.type === "radio") && text && !field.options?.includes(text)) issues[field.id] = "گزینه انتخاب‌شده معتبر نیست.";
    return { fieldId: field.id, label: field.label, type: field.type, value: text };
  });
  if (Object.keys(issues).length) throw new SubmissionError(issues);
  return answers;
}

