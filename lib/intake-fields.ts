import feedback from "@/config/intake-feedback.json";
import type { SiteLocale } from "@/lib/site-language";
import type { FieldErrors } from "@/lib/validation";

export function intakeFields(body: Record<string, unknown>, locale: SiteLocale) {
  const copy = feedback[locale];
  const errors: FieldErrors = {};
  const digits = new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US", { useGrouping: false });
  function text(key: string, min: number, max: number) {
    const raw = body[key];
    const value = typeof raw === "string" ? raw.trim() : "";
    if (!value && min > 0) errors[key] = copy.required;
    else if (value.length < min || value.length > max) {
      errors[key] = copy.length.replace("{min}", digits.format(min)).replace("{max}", digits.format(max));
    }
    return value;
  }
  function choice(key: string, options: { value: string }[], optional = false) {
    const value = text(key, optional ? 0 : 1, 100);
    if (value && !options.some((option) => option.value === value)) errors[key] = copy.choice;
    return value;
  }
  return { text, choice, errors, copy };
}
