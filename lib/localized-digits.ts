import type { SiteLocale } from "@/lib/site-language";

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const ARABIC_INDIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

export function toLatinDigits(value: string) {
  return value
    .replace(/[۰-۹]/g, (digit) => String(PERSIAN_DIGITS.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String(ARABIC_INDIC_DIGITS.indexOf(digit)));
}

export function toPersianDigits(value: string) {
  return toLatinDigits(value).replace(
    /[0-9]/g,
    (digit) => PERSIAN_DIGITS[Number(digit)],
  );
}

export function localizeDigits(value: string, locale: SiteLocale) {
  return locale === "fa" ? toPersianDigits(value) : toLatinDigits(value);
}

const NON_CONTENT_KEYS = new Set([
  "id",
  "_id",
  "slug",
  "href",
  "src",
  "coverImage",
  "url",
  "path",
  "route",
  "reportDate",
  "createdAt",
  "updatedAt",
  "publishedAt",
]);

export function localizeContentDigits<T>(
  value: T,
  locale: SiteLocale,
  key = "",
): T {
  if (typeof value === "string") {
    return (
      NON_CONTENT_KEYS.has(key) ? value : localizeDigits(value, locale)
    ) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => localizeContentDigits(item, locale)) as T;
  }

  if (value && typeof value === "object" && !(value instanceof Date)) {
    return Object.fromEntries(
      Object.entries(value).map(([entryKey, entryValue]) => [
        entryKey,
        localizeContentDigits(entryValue, locale, entryKey),
      ]),
    ) as T;
  }

  return value;
}
