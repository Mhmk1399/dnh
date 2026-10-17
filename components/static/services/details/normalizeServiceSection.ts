import type {
  NormalizedEntry,
  NormalizedServiceSection,
  ServiceCta,
  ServiceSectionOrder,
} from "./types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => asString(item))
    .filter((item): item is string => Boolean(item));
}

function normalizeObjectEntry(value: unknown): NormalizedEntry | null {
  if (!isRecord(value)) return null;

  const title = asString(value.title);
  if (!title) return null;

  return {
    title,
    description: asString(value.description),
    englishLabel: asString(value.english_label),
    number: typeof value.number === "number" ? value.number : undefined,
    code: asString(value.code),
  };
}

function normalizeEntries(section: Record<string, unknown>): NormalizedEntry[] {
  const candidates = [
    section.items,
    section.questions,
    section.steps,
    section.pillars,
    section.assets,
  ];

  for (const candidate of candidates) {
    if (!Array.isArray(candidate) || candidate.length === 0) continue;

    const entries = candidate
      .map((item, index) => {
        const objectEntry = normalizeObjectEntry(item);
        if (objectEntry) return objectEntry;

        const text = asString(item);
        if (!text) return null;

        return {
          title: text,
          number: index + 1,
        } satisfies NormalizedEntry;
      })
      .filter((item): item is NormalizedEntry => Boolean(item));

    if (entries.length) return entries;
  }

  return [];
}

function normalizeCtas(value: unknown): ServiceCta[] {
  if (!Array.isArray(value)) return [];

  const result: ServiceCta[] = [];

  for (const item of value) {
    if (!isRecord(item)) continue;
    const label = asString(item.label);
    if (!label) continue;

    const cta: ServiceCta = {
      label,
      type: item.type === "secondary" ? "secondary" : "primary",
    };

    const href = asString(item.href);
    if (href) cta.href = href;

    result.push(cta);
  }

  return result;
}

export function normalizeServiceSection(raw: unknown): NormalizedServiceSection | null {
  if (!isRecord(raw)) return null;

  const order = raw.order;
  if (typeof order !== "number" || order < 1 || order > 12) return null;

  const id = asString(raw.id);
  const type = asString(raw.type);
  const eyebrow = asString(raw.eyebrow);
  const heading = asString(raw.heading);

  if (!id || !type || !eyebrow || !heading) return null;

  const closing = [
    asString(raw.closing),
    asString(raw.closing_question),
    ...asStringArray(raw.closing_paragraphs),
  ].filter((item): item is string => Boolean(item));

  return {
    order: order as ServiceSectionOrder,
    id,
    type,
    eyebrow,
    englishLabel: asString(raw.english_label),
    heading,
    intro: asString(raw.intro),
    body: asStringArray(raw.paragraphs),
    entries: normalizeEntries(raw),
    checklist: asStringArray(raw.checklist),
    closing,
    frameworkLogic: asString(raw.framework_logic),
    ctas: normalizeCtas(raw.ctas),
  };
}

export function normalizeServiceSections(rawSections: unknown[]): NormalizedServiceSection[] {
  return rawSections
    .map(normalizeServiceSection)
    .filter((section): section is NormalizedServiceSection => Boolean(section))
    .sort((a, b) => a.order - b.order);
}
