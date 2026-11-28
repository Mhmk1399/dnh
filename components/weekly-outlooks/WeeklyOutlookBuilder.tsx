"use client";

import { BuilderSectionPicker } from "@/components/admin/BuilderSectionPicker";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import {
  Activity,
  ArrowDown,
  ArrowUp,
  Banknote,
  BarChart3,
  Eye,
  FileText,
  Image as ImageIcon,
  Landmark,
  ListChecks,
  Link2,
  LineChart,
  Plus,
  Quote,
  Save,
  Send,
  ShieldAlert,
  Sparkles,
  Target,
  TrendingUp,
  Trash2,
  TriangleAlert,
  WalletCards,
  Clock3,
  CircleDollarSign,
  Layers3,
  type LucideIcon,
} from "lucide-react";
import { adminToast, adminToastMessage } from "@/components/admin/adminToast";
import {
  createWeeklyOutlookTemplate,
  makeWeeklyOutlookStableId,
  type WeeklyOutlookBlock,
  type WeeklyOutlookBlockType,
  type WeeklyOutlookButtonVariant,
  type WeeklyOutlookCalloutTone,
  type WeeklyOutlookDateCalendar,
  type WeeklyOutlookEnglishEdition,
  type WeeklyOutlookReportDefinition,
  type WeeklyOutlookSectionDefinition,
  type WeeklyOutlookSectionIcon,
  type WeeklyOutlookSectionTone,
  type WeeklyOutlookSectionVisual,
  type WeeklyOutlookStatus,
} from "@/lib/weekly-outlook";
import {
  formatWeeklyOutlookDate,
  gregorianToJalaliDateParts,
  jalaliMonthLength,
  jalaliMonthNames,
  jalaliToGregorianDateString,
  todayIsoDate,
  weeklyOutlookDateCalendarLabels,
} from "@/lib/weekly-outlook-date";
import { normalizeWeeklyOutlookSlug } from "@/lib/weekly-outlook-validation";
import { getLocalizedSiteHref, SITE_LANGUAGES, type SiteLocale } from "@/lib/site-language";

type Props = {
  initial?: WeeklyOutlookReportDefinition;
  reportId?: string;
};

type Notice = {
  kind: "success" | "error";
  message: string;
} | null;

const sectionToneLabels: Record<WeeklyOutlookSectionTone, string> = {
  light: "روشن",
  soft: "نرم",
  dark: "تیره",
  teal: "نفتی",
  accent: "تأکیدی",
};

const sectionVisualLabels: Record<WeeklyOutlookSectionVisual, string> = {
  plain: "ساده و آرام",
  grid: "شبکه تحلیلی",
  gradient: "گرادیانت مدیریتی",
  blueprint: "نقشه معماری",
  market: "خطوط بازار",
  spotlight: "نور متمرکز",
  glass: "لایه‌های شیشه‌ای",
  accent: "خط تأکیدی",
};

const sectionVisualDescriptions: Record<WeeklyOutlookSectionVisual, string> = {
  plain: "برای گزارش‌های متنی و رسمی با کمترین تزئین.",
  grid: "پس‌زمینه شبکه‌ای سبک برای حس تحلیل و داده.",
  gradient: "عمق نرم و مدیریتی با گرادیانت برند.",
  blueprint: "حس نقشه و معماری تصمیم برای بخش‌های ساختاری.",
  market: "خطوط روند و ریتم بازار برای تحلیل‌های اقتصادی.",
  spotlight: "تمرکز روی جمع‌بندی یا پیام اصلی سکشن.",
  glass: "لایه‌های شفاف و مدرن برای روایت‌های چندلایه.",
  accent: "یک خط نارنجی کنترل‌شده برای بخش‌های مهم.",
};

const sectionIconLabels: Record<WeeklyOutlookSectionIcon, string> = {
  overview: "نمای کلی",
  risk: "ریسک",
  market: "بازار",
  policy: "سیاست پولی",
  asset: "دارایی",
  watch: "رصد",
  conclusion: "نتیجه‌گیری",
  trend: "روند",
  liquidity: "نقدینگی",
  currency: "ارز",
  inflation: "تورم",
  portfolio: "پرتفوی",
  timeline: "افق زمانی",
  target: "هدف",
  warning: "هشدار",
  opportunity: "فرصت",
};

const sectionIconMap = {
  overview: FileText,
  risk: ShieldAlert,
  market: BarChart3,
  policy: Landmark,
  asset: CircleDollarSign,
  watch: Eye,
  conclusion: Layers3,
  trend: TrendingUp,
  liquidity: WalletCards,
  currency: Banknote,
  inflation: LineChart,
  portfolio: Activity,
  timeline: Clock3,
  target: Target,
  warning: TriangleAlert,
  opportunity: Sparkles,
} satisfies Record<WeeklyOutlookSectionIcon, LucideIcon>;

const calloutToneLabels: Record<WeeklyOutlookCalloutTone, string> = {
  info: "اطلاعات",
  risk: "ریسک",
  opportunity: "فرصت",
  neutral: "خنثی",
};

const blockLabels: Record<WeeklyOutlookBlockType, string> = {
  paragraph: "پاراگراف",
  heading: "تیتر",
  list: "لیست",
  callout: "نکته",
  quote: "نقل‌قول",
  image: "تصویر",
  button: "دکمه",
  divider: "جداکننده",
};

const buttonVariantLabels: Record<WeeklyOutlookButtonVariant, string> = {
  primary: "اصلی نفتی",
  secondary: "تأکیدی نارنجی",
  outline: "خطی ساده",
};

const inputClass =
  "mt-2 min-h-11 w-full min-w-0 rounded-[14px] border border-line bg-white px-3.5 py-3 text-base text-ink outline-none transition focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10 sm:text-sm";

const dateCalendarOptions: WeeklyOutlookDateCalendar[] = [
  "jalali",
  "gregorian",
];

type EditionContent = Omit<WeeklyOutlookEnglishEdition, "ready">;

const emptyEnglish: WeeklyOutlookEnglishEdition = {
  ready: false, title: "", edition: "", excerpt: "", sections: [],
};
const languageNames = { fa: "فارسی", en: "انگلیسی" } as const;

// Reuse layout and media for translators while keeping every editorial field independent.
function translationOutline(sections: WeeklyOutlookSectionDefinition[]): WeeklyOutlookSectionDefinition[] {
  return sections.map((section) => ({
    ...section, eyebrow: "", title: "", summary: "",
    blocks: section.blocks.map((block): WeeklyOutlookBlock => {
      switch (block.type) {
        case "image": return { ...block, alt: "", caption: "" };
        case "button": return { ...block, label: "", note: "" };
        case "quote": return { ...block, text: "", cite: "" };
        case "callout": return { ...block, text: "", title: "" };
        case "list": return { ...block, items: [] };
        case "divider": return { ...block };
        default: return { ...block, text: "" };
      }
    }),
  }));
}

function buildJalaliYearOptions(selectedYear: number) {
  const currentYear = gregorianToJalaliDateParts(todayIsoDate()).year;
  const min = Math.min(currentYear - 10, selectedYear - 2);
  const max = Math.max(currentYear + 4, selectedYear + 2);

  return Array.from({ length: max - min + 1 }, (_, index) => max - index);
}

export function WeeklyOutlookBuilder({ initial, reportId }: Props) {
  const router = useRouter();
  const [report, setReport] = useState<WeeklyOutlookReportDefinition>(
    () => initial ?? createWeeklyOutlookTemplate(),
  );
  const [language, setLanguage] = useState<SiteLocale>("fa");
  const [sectionIndices, setSectionIndices] = useState({ fa: 0, en: 0 });
  const [busy, setBusy] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);
  const sectionEditorRef = useRef<HTMLElement | null>(null);
  const sharedSettings = useRef<HTMLDetailsElement>(null);
  const isEnglish = language === "en";
  const contentDir = SITE_LANGUAGES[language].direction;
  const english = report.english ?? emptyEnglish;
  const content: EditionContent = isEnglish ? english : report;
  const activeSection = sectionIndices[language];
  const publicHref = getLocalizedSiteHref(`/knowledge/weekly-outlook/${report.slug || "report-slug"}`, language);

  const current = content.sections[activeSection] ?? null;
  const CurrentSectionIcon = current ? sectionIconMap[current.icon] : FileText;
  const blockCount = useMemo(
    () =>
      content.sections.reduce(
        (total, section) => total + section.blocks.length,
        0,
      ),
    [content.sections],
  );

  function update(patch: Partial<WeeklyOutlookReportDefinition>) {
    setReport((value) => ({ ...value, ...patch }));
    setDirty(true);
    setNotice(null);
  }

  function updateContent(patch: Partial<EditionContent>) {
    if (isEnglish) update({ english: { ...english, ...patch } });
    else update(patch);
  }

  function setActiveSection(index: number) {
    setSectionIndices((value) => ({ ...value, [language]: index }));
  }

  function selectSection(index: number, scrollToEditor = true) {
    setActiveSection(index);

    if (!scrollToEditor) return;

    window.requestAnimationFrame(() => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      sectionEditorRef.current?.focus({ preventScroll: true });
      sectionEditorRef.current?.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  }

  function updateSection(
    index: number,
    patch: Partial<WeeklyOutlookSectionDefinition>,
  ) {
    updateContent({
      sections: content.sections.map((section, sectionIndex) =>
        sectionIndex === index ? { ...section, ...patch } : section,
      ),
    });
  }

  function updateBlock(
    sectionIndex: number,
    blockIndex: number,
    patch: Partial<WeeklyOutlookBlock>,
  ) {
    const section = content.sections[sectionIndex];

    if (!section) return;

    updateSection(sectionIndex, {
      blocks: section.blocks.map((block, index) =>
        index === blockIndex
          ? ({ ...block, ...patch } as WeeklyOutlookBlock)
          : block,
      ),
    });
  }

  function move<T>(items: T[], index: number, direction: -1 | 1) {
    const target = index + direction;

    if (target < 0 || target >= items.length) return items;

    const copy = [...items];
    [copy[index], copy[target]] = [copy[target], copy[index]];

    return copy;
  }

  function addSection() {
    if (content.sections.length >= 24) {
      const message = "حداکثر ۲۴ سکشن مجاز است.";

      adminToast.error(message);
      setNotice({ kind: "error", message });
      return;
    }

    const section: WeeklyOutlookSectionDefinition = {
      id: makeWeeklyOutlookStableId("section"),
      eyebrow: "",
      title: "",
      summary: "",
      icon: "overview",
      tone: "light",
      visual: "grid",
      blocks: [
        {
          id: makeWeeklyOutlookStableId("block"),
          type: "paragraph",
          text: "",
        },
      ],
    };

    updateContent({ sections: [...content.sections, section] });
    adminToast.success("سکشن جدید اضافه شد.");
    selectSection(content.sections.length);
  }

  function removeSection(index: number) {
    if (!isEnglish && content.sections.length === 1) {
      const message = "حداقل یک سکشن باید باقی بماند.";

      adminToast.error(message);
      setNotice({ kind: "error", message });
      return;
    }

    updateContent({
      sections: content.sections.filter(
        (_, sectionIndex) => sectionIndex !== index,
      ),
    });
    adminToast.success("سکشن حذف شد.");
    setActiveSection(Math.max(0, index - 1));
  }

  function addBlock(type: WeeklyOutlookBlockType) {
    if (!current) return;

    if (blockCount >= 220) {
      const message = "حداکثر ۲۲۰ بلوک مجاز است.";

      adminToast.error(message);
      setNotice({ kind: "error", message });
      return;
    }

    const id = makeWeeklyOutlookStableId("block");
    let block: WeeklyOutlookBlock;

    if (type === "heading") {
      block = { id, type, level: "h3", text: "" };
    } else if (type === "list") {
      block = { id, type, items: [] };
    } else if (type === "callout") {
      block = {
        id,
        type,
        tone: "info",
        title: "",
        text: "",
      };
    } else if (type === "quote") {
      block = {
        id,
        type,
        text: "",
        cite: "",
      };
    } else if (type === "image") {
      block = {
        id,
        type,
        src: "",
        alt: "",
        caption: "",
      };
    } else if (type === "button") {
      block = {
        id,
        type,
        label: "",
        href: "",
        variant: "primary",
        note: "",
      };
    } else if (type === "divider") {
      block = { id, type };
    } else {
      block = {
        id,
        type: "paragraph",
        text: "",
      };
    }

    updateSection(activeSection, {
      blocks: [...current.blocks, block],
    });
    adminToast.success("بلوک جدید اضافه شد.");
  }

  async function save(action: "save" | "publish" | "unpublish" | "archive") {
    setBusy(true);
    setNotice(null);
    const toastId = adminToast.loading(
      action === "publish"
        ? "در حال انتشار گزارش..."
        : action === "unpublish"
          ? "در حال توقف انتشار گزارش..."
          : action === "archive"
            ? "در حال بایگانی گزارش..."
            : reportId
              ? "در حال ذخیره گزارش..."
              : "در حال ساخت گزارش...",
    );

    try {
      const response = await fetch(
        reportId
          ? `/api/admin/weekly-outlooks/${reportId}`
          : "/api/admin/weekly-outlooks",
        {
          method: reportId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            reportId
              ? {
                  ...report,
                  action,
                  expectedRevision: report.revision,
                }
              : report,
          ),
        },
      );
      const payload = (await response.json()) as {
        message?: string;
        id?: string;
        revision?: number;
        status?: WeeklyOutlookStatus;
        errors?: Record<string, string>;
      };

      if (!response.ok) {
        let detail: string | undefined;
        const issue = Object.entries(payload.errors ?? {})[0];
        if (issue) {
          const [field, message] = issue;
          const shared = ["slug", "reportDate", "dateCalendar", "coverImage"].includes(field);
          const issueLanguage = field === "english" || field.startsWith("english.") ? "en" : "fa";
          const section = field.match(/(?:^|\.)sections\.(\d+)/);
          const block = field.match(/\.blocks\.(\d+)/);
          const sectionIndex = section ? Number(section[1]) : null;
          if (shared) {
            if (sharedSettings.current) sharedSettings.current.open = true;
          } else {
            setLanguage(issueLanguage);
            if (sectionIndex !== null) {
              setSectionIndices((value) => ({ ...value, [issueLanguage]: sectionIndex }));
            }
          }
          const location = [
            shared ? "تنظیمات مشترک" : `نسخهٔ ${languageNames[issueLanguage]}`,
            sectionIndex !== null ? `بخش ${(sectionIndex + 1).toLocaleString("fa-IR")}` : "",
            block ? `بلوک ${(Number(block[1]) + 1).toLocaleString("fa-IR")}` : "",
          ].filter(Boolean).join("، ");
          detail = `${location} — ${message.replace(/^نسخه انگلیسی — /, "")}`;
        }

        throw new Error(
          [payload.message, detail].filter(Boolean).join(" ") ||
            "ذخیره انجام نشد.",
        );
      }

      if (!reportId && payload.id) {
        adminToast.dismiss(toastId);
        adminToast.success(payload.message ?? "گزارش جدید ساخته شد.");
        router.replace(`/admin/weekly-outlooks/${payload.id}/edit`);
        router.refresh();
        return;
      }

      setReport((value) => ({
        ...value,
        revision: payload.revision ?? value.revision,
        status: payload.status ?? value.status,
      }));
      setDirty(false);
      adminToast.dismiss(toastId);
      adminToast.success(payload.message ?? "ذخیره شد.");
      setNotice({
        kind: "success",
        message: payload.message ?? "ذخیره شد.",
      });
      router.refresh();
    } catch (error) {
      const message = adminToastMessage(error, "خطای پیش‌بینی‌نشده");

      adminToast.dismiss(toastId);
      adminToast.error(message);
      setNotice({
        kind: "error",
        message,
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      dir="rtl"
      className="@container/builder mx-auto max-w-[1600px] py-3 pb-28 sm:py-5 sm:pb-28 xl:pb-10"
    >
      <header className="border-b border-line pb-7">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <Link
              href="/admin/weekly-outlooks"
              className="inline-flex min-h-11 items-center text-sm font-bold text-brand-accent hover:underline"
            >
              گزارش‌های هفتگی / بازگشت
            </Link>

            <h1 className="mt-2 text-3xl font-black tracking-[-.04em] text-ink">
              {reportId ? "ویرایش گزارش هفتگی" : "گزارش هفتگی جدید"}
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              disabled={busy || report.status === "archived"}
              onClick={() => save("save")}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-[14px] border border-brand-accent bg-white px-4 py-2.5 text-sm font-bold text-brand-accent transition hover:bg-surface-soft disabled:pointer-events-none disabled:opacity-50"
            >
              <Save size={16} />
              ذخیره
            </button>

            {reportId && report.status === "published" ? (
              <button
                disabled={busy}
                onClick={() => save("unpublish")}
                className="min-h-11 cursor-pointer rounded-[14px] border border-line bg-white px-4 py-2.5 text-xs font-black text-ink transition hover:border-brand-primary disabled:pointer-events-none disabled:opacity-50"
              >
                توقف انتشار
              </button>
            ) : null}

            {reportId && report.status === "draft" ? (
              <button
                disabled={busy}
                onClick={() => save("publish")}
                className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-[14px] bg-brand-accent px-5 py-2.5 text-xs font-black text-white transition hover:bg-[#ec7d01] disabled:pointer-events-none disabled:opacity-50"
              >
                <Send size={16} />
                انتشار
              </button>
            ) : null}

            {reportId && report.status !== "archived" ? (
              <button
                disabled={busy}
                onClick={() => save("archive")}
                className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-[14px] border border-red-200 bg-white px-4 py-2.5 text-xs font-black text-red-700 transition hover:border-red-400 disabled:pointer-events-none disabled:opacity-50"
              >
                بایگانی
              </button>
            ) : null}
          </div>
        </div>

        <div className="mt-4 flex min-h-8 flex-wrap items-center gap-3 text-xs">
          <span
            className={`rounded-full border px-2 py-1 font-bold ${
              !reportId || dirty
                ? "border-orange-200 bg-orange-50 text-orange-800"
                : "border-emerald-200 bg-emerald-50 text-emerald-800"
            }`}
          >
            {!reportId
              ? "گزارش جدید · ذخیره‌نشده"
              : dirty
                ? "تغییرات ذخیره‌نشده"
                : "ذخیره‌شده"}
          </span>

          <span className="rounded-full border border-line bg-white px-2 py-1 font-bold text-ink-muted">
            {report.status === "published"
              ? "منتشرشده"
              : report.status === "archived"
                ? "بایگانی‌شده"
                : "پیش‌نویس"}
          </span>

          {notice ? (
            <span
              role={notice.kind === "error" ? "alert" : "status"}
              className={
                notice.kind === "error" ? "text-red-700" : "text-emerald-700"
              }
            >
              {notice.message}
            </span>
          ) : null}
        </div>
      </header>

      <fieldset disabled={busy} className="m-0 min-w-0 border-0 p-0">
      <details ref={sharedSettings} open={!reportId} className="mt-5 rounded-[18px] border border-line bg-white">
        <summary className="cursor-pointer px-5 py-4 text-sm font-black text-ink">
          تنظیمات مشترک دو زبان
          <span className="ms-2 inline-block text-xs font-normal text-ink-muted">نشانی، تاریخ و تصویر جلد</span>
        </summary>
        <div className="grid gap-4 border-t border-line p-5 md:grid-cols-2">
          <Label text="شناسه مسیر انگلیسی" help="در نشانی فارسی و انگلیسی یکسان است.">
            <input dir="ltr" className={inputClass} value={report.slug}
              onChange={(event) => update({ slug: event.target.value })}
              onBlur={(event) => {
                const slug = normalizeWeeklyOutlookSlug(event.target.value);
                if (slug !== event.target.value) update({ slug });
              }} />
          </Label>
          <Label text="تصویر اصلی گزارش">
            <input dir="ltr" className={inputClass} placeholder="/assets/images/report-cover.jpg"
              value={report.coverImage ?? ""} onChange={(event) => update({ coverImage: event.target.value })} />
          </Label>
          <Label text="بازار گزارش">
            <select className={inputClass} value={report.market ?? (report.dateCalendar === "jalali" ? "iran" : "global")}
              onChange={(event) => update({ market: event.target.value === "iran" ? "iran" : "global" })}>
              <option value="iran">ایران</option>
              <option value="global">جهان</option>
            </select>
          </Label>
          <ReportDateField reportDate={report.reportDate} dateCalendar={report.dateCalendar} onChange={update} />
        </div>
      </details>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-[18px] border border-line bg-white p-4">
        <div>
          <h2 className="text-sm font-black text-ink">زبان محتوای گزارش</h2>
          <p className="mt-1 text-xs leading-6 text-ink-muted">متن و بخش‌های هر نسخه را جداگانه ویرایش کنید. دکمهٔ ذخیره تغییرات هر دو نسخه را ثبت می‌کند.</p>
        </div>
        <div role="group" aria-label="زبان محتوای گزارش" className="flex gap-1 rounded-xl border border-line bg-surface-soft p-1">
          {(["fa", "en"] as const).map((item) => (
            <button key={item} type="button" aria-pressed={language === item} onClick={() => setLanguage(item)}
              className={`min-h-11 cursor-pointer rounded-lg px-4 py-1 text-sm font-bold focus-visible:outline-focus ${language === item ? "bg-brand-secondary text-white" : "text-ink hover:bg-white"}`}>
              {languageNames[item]}
              {item === "en" && <span className="ms-1.5 text-[10px] font-normal">
                {english.ready ? "آماده" : report.english ? "پیش‌نویس" : "شروع‌نشده"}
              </span>}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 grid grid-cols-[minmax(0,1fr)] items-start gap-4 @min-[50rem]/builder:grid-cols-[13rem_minmax(0,1fr)] @min-[78rem]/builder:grid-cols-[14rem_minmax(0,1fr)_19rem]">
        <aside className="min-w-0 overflow-hidden rounded-[20px] border border-line bg-[#f6fbfc] @min-[50rem]/builder:sticky @min-[50rem]/builder:top-20">
          <div className="hidden border-b border-line p-4 @min-[50rem]/builder:block">
            <div className="mt-2 flex items-center justify-between gap-4">
              <h2 className="font-black">سکشن‌های گزارش</h2>

              <span className="text-xs text-ink-muted">
                {content.sections.length.toLocaleString("fa-IR")} / ۲۴
              </span>
            </div>
          </div>

          <BuilderSectionPicker label={`انتخاب بخش نسخهٔ ${languageNames[language]}`} items={content.sections} selectedIndex={activeSection} onSelect={selectSection} />
          <ol className="hidden max-h-[55dvh] overflow-auto overscroll-contain @min-[50rem]/builder:block">
            {content.sections.map((section, index) => (
              <li
                key={section.id}
                className="border-b border-line last:border-0"
              >
                <button
                  type="button"
                  onClick={() => selectSection(index)}
                  aria-current={activeSection === index ? "true" : undefined}
                  className={`w-full cursor-pointer px-4 py-4 text-right transition ${
                    activeSection === index
                      ? "bg-brand-secondary text-white"
                      : "hover:bg-white"
                  }`}
                >
                  <span
                    className={`text-xs font-bold ${
                      activeSection === index
                        ? "text-white/70"
                        : "text-ink-muted"
                    }`}
                  >
                    بخش {(index + 1).toLocaleString("fa-IR")}
                  </span>

                  <span dir={section.title ? contentDir : "rtl"} className="mt-1 block text-start text-sm font-black">
                    {section.title || "بدون عنوان"}
                  </span>

                  <span
                    className={`mt-1 block text-[10px] ${
                      activeSection === index
                        ? "text-white/70"
                        : "text-ink-muted"
                    }`}
                  >
                    {section.blocks.length.toLocaleString("fa-IR")} بلوک ·{" "}
                    {sectionToneLabels[section.tone]} ·{" "}
                    {sectionVisualLabels[section.visual ?? "grid"]}
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <button
            type="button"
            onClick={addSection}
            className="flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 border-t border-dashed border-line p-3 text-sm font-bold text-brand-accent transition hover:bg-white"
          >
            <Plus size={15} />
            افزودن سکشن
          </button>
        </aside>

        <div className="min-w-0 space-y-5">
          <section className="overflow-hidden rounded-[24px] border border-line bg-white">
            <SectionHeader code={`نسخهٔ ${languageNames[language]}`} title="مشخصات گزارش" />

            {isEnglish && (
              <label className="flex items-start gap-3 border-b border-line bg-surface-soft px-5 py-4">
                <input type="checkbox" className="mt-0.5 size-5 shrink-0 accent-brand-accent" checked={english.ready}
                  onChange={(event) => update({ english: { ...english, ready: event.target.checked } })} />
                <span className="text-sm font-bold text-ink">نسخهٔ انگلیسی آمادهٔ انتشار است
                  <span className="mt-1 block text-xs font-normal leading-6 text-ink-muted">
                    با ذخیرهٔ این گزینه، نسخهٔ انگلیسی همراه گزارش منتشر می‌شود. برای ادامهٔ ترجمه در پیش‌نویس، گزینه را غیرفعال بگذارید.
                  </span>
                </span>
              </label>
            )}

            <div className="grid gap-5 p-5 md:grid-cols-2">
              <Label text="عنوان گزارش">
                <input
                  className={inputClass}
                  dir={contentDir} lang={language} value={content.title}
                  onChange={(event) => updateContent({ title: event.target.value })}
                />
              </Label>

              <Label text="نام نسخه">
                <input
                  className={inputClass}
                  dir={contentDir} lang={language} value={content.edition}
                  onChange={(event) => updateContent({ edition: event.target.value })}
                />
              </Label>

              <div className="md:col-span-2">
                <Label text="توضیح کوتاه لیست گزارش‌ها">
                  <textarea
                    className={`${inputClass} min-h-28 resize-none leading-7`}
                    dir={contentDir} lang={language} value={content.excerpt}
                    onChange={(event) =>
                      updateContent({ excerpt: event.target.value })
                    }
                  />
                </Label>
              </div>

              <Label text="متن جایگزین تصویر اصلی">
                <input
                  className={inputClass}
                  dir={contentDir} lang={language} value={content.coverImageAlt ?? ""}
                  onChange={(event) =>
                    updateContent({ coverImageAlt: event.target.value })
                  }
                />
              </Label>

              <Label text="عنوان سئو">
                <input
                  className={inputClass}
                  dir={contentDir} lang={language} value={content.seoTitle ?? ""}
                  onChange={(event) => updateContent({ seoTitle: event.target.value })}
                />
              </Label>

              <Label text="توضیح سئو">
                <input
                  className={inputClass}
                  dir={contentDir} lang={language} value={content.seoDescription ?? ""}
                  onChange={(event) =>
                    updateContent({ seoDescription: event.target.value })
                  }
                />
              </Label>
            </div>
          </section>

          {isEnglish && <PersianSource
            key={current?.id ?? "report"}
            source={report}
            selectedId={current?.id}
          />}

          {isEnglish && !content.sections.length && (
            <div className="rounded-[18px] border border-dashed border-line bg-white p-5">
              <h3 className="text-sm font-black text-ink">بخش‌های نسخهٔ انگلیسی</h3>
              <p className="mt-2 text-xs leading-6 text-ink-muted">برای ترجمه، چیدمان و تصاویر بخش‌های فارسی را بیاورید یا یک بخش تازه بسازید.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button type="button" className="min-h-11 rounded-lg bg-brand-secondary px-4 text-xs font-bold text-white" onClick={() => {
                  updateContent({ sections: translationOutline(report.sections) });
                  selectSection(0);
                }}>استفاده از ساختار فارسی</button>
                <button type="button" className="min-h-11 rounded-lg border border-line px-4 text-xs font-bold text-ink" onClick={addSection}>ساخت بخش خالی</button>
              </div>
            </div>
          )}
          {current ? (
            <section
              ref={sectionEditorRef}
              tabIndex={-1}
              aria-label="تنظیم بخش گزارش"
              className="scroll-mt-36 overflow-hidden rounded-[24px] border border-line bg-white sm:scroll-mt-24"
            >
              <SectionHeader
                code={`بخش ${(activeSection + 1).toLocaleString("fa-IR")}`}
                title="تنظیم سکشن"
                actions={
                  <div className="flex gap-1">
                    <IconButton
                      label="انتقال به بالا"
                      disabled={activeSection === 0}
                      onClick={() => {
                        updateContent({
                          sections: move(content.sections, activeSection, -1),
                        });
                        setActiveSection(activeSection - 1);
                      }}
                    >
                      <ArrowUp size={15} />
                    </IconButton>

                    <IconButton
                      label="انتقال به پایین"
                      disabled={activeSection === content.sections.length - 1}
                      onClick={() => {
                        updateContent({
                          sections: move(content.sections, activeSection, 1),
                        });
                        setActiveSection(activeSection + 1);
                      }}
                    >
                      <ArrowDown size={15} />
                    </IconButton>

                    <IconButton
                      label="حذف سکشن"
                      onClick={() => removeSection(activeSection)}
                    >
                      <Trash2 size={15} />
                    </IconButton>
                  </div>
                }
              />

              <div className="grid gap-5 p-5 md:grid-cols-2">
                <Label text="عنوان سکشن">
                  <input
                    className={inputClass}
                    dir={contentDir} lang={language} value={current.title}
                    onChange={(event) =>
                      updateSection(activeSection, {
                        title: event.target.value,
                      })
                    }
                  />
                </Label>

                <Label text="برچسب بالای سکشن">
                  <input
                    className={inputClass}
                    dir={contentDir} lang={language} value={current.eyebrow ?? ""}
                    onChange={(event) =>
                      updateSection(activeSection, {
                        eyebrow: event.target.value,
                      })
                    }
                  />
                </Label>

                <div>
                  <p className="text-xs font-bold text-ink">آیکن سکشن</p>

                  <div className="mt-2 grid gap-3 sm:grid-cols-[52px_1fr]">
                    <span className="grid h-[50px] w-[52px] place-items-center rounded-[16px] border border-brand-primary/15 bg-[#eef8fb] text-brand-primary">
                      <CurrentSectionIcon aria-hidden="true" size={20} />
                    </span>

                    <select
                      className="w-full rounded-[14px] border border-line bg-white px-3.5 py-3 text-sm text-ink outline-none transition focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10"
                      value={current.icon}
                      onChange={(event) =>
                        updateSection(activeSection, {
                          icon: event.target.value as WeeklyOutlookSectionIcon,
                        })
                      }
                    >
                      {Object.entries(sectionIconLabels).map(
                        ([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ),
                      )}
                    </select>
                  </div>
                </div>

                <Label text="پس‌زمینه سکشن">
                  <select
                    className={inputClass}
                    value={current.tone}
                    onChange={(event) =>
                      updateSection(activeSection, {
                        tone: event.target.value as WeeklyOutlookSectionTone,
                      })
                    }
                  >
                    {Object.entries(sectionToneLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </Label>

                <div className="md:col-span-2">
                  <p className="text-xs font-bold text-ink">نمای بصری سکشن</p>

                  <div className="mt-2 grid gap-3 lg:grid-cols-[168px_1fr]">
                    <SectionVisualPreview visual={current.visual ?? "grid"} />

                    <div>
                      <select
                        className="w-full rounded-[14px] border border-line bg-white px-3.5 py-3 text-sm text-ink outline-none transition focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10"
                        value={current.visual ?? "grid"}
                        onChange={(event) =>
                          updateSection(activeSection, {
                            visual: event.target
                              .value as WeeklyOutlookSectionVisual,
                          })
                        }
                      >
                        {Object.entries(sectionVisualLabels).map(
                          ([value, label]) => (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          ),
                        )}
                      </select>

                      <p className="mt-2 text-[10px] leading-5 text-ink-muted">
                        {sectionVisualDescriptions[current.visual ?? "grid"]}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <Label text="خلاصه سکشن">
                    <textarea
                      className={`${inputClass} min-h-24 resize-none leading-7`}
                      dir={contentDir} lang={language} value={current.summary ?? ""}
                      onChange={(event) =>
                        updateSection(activeSection, {
                          summary: event.target.value,
                        })
                      }
                    />
                  </Label>
                </div>
              </div>
            </section>
          ) : null}

          {current ? (
            <section className="overflow-hidden rounded-[24px] border border-line bg-white">
              <SectionHeader
                code={`${blockCount.toLocaleString("fa-IR")} بلوک`}
                title="ادیتور محتوای سکشن"
              />

              <div className="flex flex-wrap gap-2 border-b border-line bg-[#f8fbfc] p-4">
                {(
                  [
                    "paragraph",
                    "heading",
                    "list",
                    "callout",
                    "quote",
                    "image",
                    "button",
                    "divider",
                  ] as WeeklyOutlookBlockType[]
                ).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => addBlock(type)}
                    className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-[14px] border border-line bg-white px-3 py-2 text-[11px] font-black text-ink transition hover:border-brand-primary hover:text-brand-primary"
                  >
                    <BlockMiniIcon type={type} />
                    {blockLabels[type]}
                  </button>
                ))}
              </div>

              {current.blocks.length === 0 ? (
                <div className="p-12 text-center">
                  <FileText className="mx-auto h-8 w-8 text-brand-primary/30" />
                  <p className="mt-4 text-sm font-bold">
                    این سکشن هنوز محتوایی ندارد.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-line">
                  {current.blocks.map((block, index) => (
                    <BlockEditor
                      key={block.id}
                      language={language}
                      block={block}
                      index={index}
                      onChange={(patch) =>
                        updateBlock(activeSection, index, patch)
                      }
                      onMove={(direction) =>
                        updateSection(activeSection, {
                          blocks: move(current.blocks, index, direction),
                        })
                      }
                      onRemove={() => {
                        adminToast.success("بلوک حذف شد.");
                        updateSection(activeSection, {
                          blocks: current.blocks.filter(
                            (_, blockIndex) => blockIndex !== index,
                          ),
                        });
                      }}
                    />
                  ))}
                </div>
              )}
            </section>
          ) : null}
        </div>

        <aside id="builder-preview" className="min-w-0 scroll-mt-36 [overflow-wrap:anywhere] sm:scroll-mt-24 @min-[50rem]/builder:col-start-2 @min-[78rem]/builder:sticky @min-[78rem]/builder:top-20 @min-[78rem]/builder:col-start-3">
          <div className="rounded-t-[24px] border border-[#0c526a] bg-[#0d607b] p-5 text-white">
            <div className="flex items-center justify-between gap-4">
              <p
                className="text-[11px] font-black tracking-[.2em] text-white/60"
              >
                پیش‌نمایش نسخهٔ {languageNames[language]}
              </p>
            </div>

            <h2 dir={content.title ? contentDir : "rtl"} className="mt-5 text-start text-xl font-black leading-8">
              {content.title || "عنوان گزارش شما"}
            </h2>

            <p dir={content.excerpt ? contentDir : "rtl"} className="mt-3 text-start text-xs leading-6 text-white/80">
              {content.excerpt || "توضیح کوتاه گزارش"}
            </p>

            <div
              dir="ltr"
              className="mt-5 border-t border-white/20 pt-3 text-left text-[11px] tracking-wider text-white/60"
            >
              {publicHref}
              <br />
              {formatWeeklyOutlookDate(
                report.reportDate,
                report.dateCalendar,
                "medium",
                language,
              )}
            </div>
          </div>

          <div className="rounded-b-[24px] border-x border-b border-line bg-white p-5">
            <p className="text-[11px] font-black text-brand-primary">
              ساختار صفحه
            </p>

            <ol className="mt-4 space-y-3">
              {content.sections.map((section, index) => (
                <li
                  key={section.id}
                  className="overflow-hidden rounded-[14px] border border-line bg-[#fbfdfd]"
                >
                  <button
                    type="button"
                    onClick={() => selectSection(index)}
                    aria-current={activeSection === index ? "true" : undefined}
                    className={`
                      group
                      flex
                      w-full
                      cursor-pointer
                      items-start
                      gap-3
                      p-3
                      text-right
                      transition
                      hover:border-brand-primary
                      hover:bg-[#f3fbfd]
                      focus-visible:outline-none
                      focus-visible:ring-4
                      focus-visible:ring-brand-accent/15

                      ${
                        activeSection === index
                          ? "bg-[#edf8fb] shadow-[inset_3px_0_0_var(--dnh-accent)]"
                          : ""
                      }
                    `}
                  >
                    <span
                      dir="ltr"
                      className={`
                        shrink-0
                        text-[10px]
                        font-black
                        transition

                        ${
                          activeSection === index
                            ? "text-brand-accent"
                            : "text-brand-primary/50 group-hover:text-brand-primary"
                        }
                      `}
                    >
                      {(index + 1).toLocaleString("fa-IR", { minimumIntegerDigits: 2 })}
                    </span>

                    <span className="min-w-0">
                      <span dir={section.title ? contentDir : "rtl"} className="block text-start text-xs font-black text-ink">
                        {section.title || "بدون عنوان"}
                      </span>
                      <span className="mt-1 block text-[10px] leading-5 text-ink-muted">
                        {section.blocks.length.toLocaleString("fa-IR")} بلوک ·{" "}
                        {sectionToneLabels[section.tone]} ·{" "}
                        {sectionVisualLabels[section.visual ?? "grid"]}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          {reportId && !dirty && report.status === "published" && (!isEnglish || english.ready) ? (
            <Link
              href={publicHref}
              className="mt-3 flex min-h-12 items-center justify-center gap-2 rounded-[14px] border border-line bg-white p-3 text-[11px] font-bold transition hover:border-brand-primary"
            >
              <Eye size={14} />
              مشاهده گزارش {languageNames[language]}
            </Link>
          ) : null}
        </aside>
      </div>
      </fieldset>

      {report.status !== "archived" ? (
        <div className="fixed bottom-3 left-3 right-3 z-40 flex items-center justify-between gap-2 rounded-[22px] border border-line bg-white/95 p-2 shadow-[0_12px_40px_rgba(16,24,32,.18)] backdrop-blur-xl xl:hidden">
          <div className="min-w-0">
            <p className="truncate text-[10px] font-black text-ink">
              نسخهٔ {languageNames[language]}{content.title && <> · <bdi>{content.title}</bdi></>}
            </p>

            <p
              className={`mt-0.5 text-[11px] ${
                !reportId || dirty ? "text-orange-700" : "text-emerald-700"
              }`}
            >
              {!reportId
                ? "هنوز ذخیره نشده"
                : dirty
                  ? "تغییرات ذخیره‌نشده"
                  : "ذخیره‌شده"}
            </p>
          </div>

          <div className="flex shrink-0 gap-1.5">
            <button
              disabled={busy}
              onClick={() => save("save")}
              className="inline-flex min-h-11 cursor-pointer items-center gap-1 rounded-[14px] border border-brand-accent px-3 py-2 text-xs font-bold text-brand-accent disabled:pointer-events-none disabled:opacity-50"
            >
              <Save size={13} />
              ذخیره
            </button>

            {reportId && report.status === "draft" ? (
              <button
                disabled={busy}
                onClick={() => save("publish")}
                className="inline-flex min-h-11 cursor-pointer items-center gap-1 rounded-[14px] bg-brand-accent px-3 py-2 text-xs font-bold text-white disabled:pointer-events-none disabled:opacity-50"
              >
                <Send size={13} />
                انتشار
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function PersianSource({ source, selectedId }: {
  source: EditionContent;
  selectedId?: string;
}) {
  const [sectionId, setSectionId] = useState(
    source.sections.find((section) => section.id === selectedId)?.id ?? "",
  );
  const section = source.sections.find((item) => item.id === sectionId);
  const fields = section
    ? [section.eyebrow, section.summary, ...section.blocks.flatMap((block) => {
        switch (block.type) {
          case "divider": return [];
          case "image": return [block.alt, block.caption];
          case "list": return block.items;
          case "callout": return [block.title, block.text];
          case "quote": return [block.text, block.cite];
          case "button": return [block.note, block.label];
          default: return [block.text];
        }
      })]
    : [source.title, source.edition, source.excerpt, source.coverImageAlt, source.seoTitle, source.seoDescription];

  return (
    <details className="rounded-[18px] border border-line bg-surface-soft">
      <summary className="cursor-pointer px-5 py-4 text-sm font-bold text-ink">مشاهده متن فارسی هنگام ترجمه</summary>
      <div className="border-t border-line p-4">
        <Label text="متن مرجع">
          <select className={inputClass} value={sectionId} onChange={(event) => setSectionId(event.target.value)}>
            <option value="">مشخصات گزارش</option>
            {source.sections.map((item, index) => (
              <option key={item.id} value={item.id}>بخش {(index + 1).toLocaleString("fa-IR")} · {item.title}</option>
            ))}
          </select>
        </Label>
        <div dir="rtl" lang="fa" className="mt-3 max-h-64 space-y-2 overflow-y-auto overscroll-contain whitespace-pre-line border-s-2 border-brand-accent ps-3 text-sm leading-7 text-ink">
          {fields.map((text, index) => text && <p key={index}>{text}</p>)}
        </div>
      </div>
    </details>
  );
}

function ReportDateField({
  reportDate,
  dateCalendar,
  onChange,
}: {
  reportDate: string;
  dateCalendar: WeeklyOutlookDateCalendar;
  onChange: (patch: Partial<Pick<WeeklyOutlookReportDefinition, "reportDate" | "dateCalendar">>) => void;
}) {
  const calendar = dateCalendar ?? "jalali";
  const jalaliDate = gregorianToJalaliDateParts(reportDate);
  const jalaliYears = buildJalaliYearOptions(jalaliDate.year);
  const days = Array.from(
    { length: jalaliMonthLength(jalaliDate.year, jalaliDate.month) },
    (_, index) => index + 1,
  );

  function updateJalaliDate(patch: Partial<JalaliDateControls>) {
    const next = {
      year: patch.year ?? jalaliDate.year,
      month: patch.month ?? jalaliDate.month,
      day: patch.day ?? jalaliDate.day,
    };
    const day = Math.min(next.day, jalaliMonthLength(next.year, next.month));

    onChange({
      reportDate: jalaliToGregorianDateString(next.year, next.month, day),
    });
  }

  return (
    <div className="md:col-span-2">
      <div className="rounded-[18px] border border-line bg-[#fbfdfd] p-4">
        <div className="grid gap-4 md:grid-cols-[180px_1fr] md:items-start">
          <Label text="نوع تقویم" help="نوع نمایش تاریخ در سایت و پنل ادمین">
            <select
              className={inputClass}
              value={calendar}
              onChange={(event) =>
                onChange({
                  dateCalendar: event.target.value as WeeklyOutlookDateCalendar,
                })
              }
            >
              {dateCalendarOptions.map((option) => (
                <option key={option} value={option}>
                  {weeklyOutlookDateCalendarLabels[option]}
                </option>
              ))}
            </select>
          </Label>

          {calendar === "gregorian" ? (
            <Label
              text="تاریخ میلادی"
              help="برای مرتب‌سازی، مقدار استاندارد تاریخ همزمان ذخیره می‌شود."
            >
              <input
                type="date"
                className={inputClass}
                value={reportDate}
                onChange={(event) =>
                  onChange({
                    reportDate: event.target.value || todayIsoDate(),
                  })
                }
              />
            </Label>
          ) : (
            <div>
              <p className="text-xs font-bold text-ink">تاریخ شمسی گزارش</p>

              <div className="mt-2 grid gap-3 sm:grid-cols-3">
                <select
                  aria-label="روز تاریخ شمسی"
                  className={inputClass}
                  value={jalaliDate.day}
                  onChange={(event) =>
                    updateJalaliDate({ day: Number(event.target.value) })
                  }
                >
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day.toLocaleString("fa-IR")}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="ماه تاریخ شمسی"
                  className={inputClass}
                  value={jalaliDate.month}
                  onChange={(event) =>
                    updateJalaliDate({ month: Number(event.target.value) })
                  }
                >
                  {jalaliMonthNames.map((month, index) => (
                    <option key={month} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="سال تاریخ شمسی"
                  className={inputClass}
                  value={jalaliDate.year}
                  onChange={(event) =>
                    updateJalaliDate({ year: Number(event.target.value) })
                  }
                >
                  {jalaliYears.map((year) => (
                    <option key={year} value={year}>
                      {year.toLocaleString("fa-IR", {
                        useGrouping: false,
                      })}
                    </option>
                  ))}
                </select>
              </div>

              <p className="mt-2 text-[10px] leading-5 text-ink-muted">
                برای مرتب‌سازی و لینک‌دهی، معادل میلادی تاریخ همزمان ذخیره
                می‌شود.
              </p>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-3 text-[11px] font-bold text-ink-muted">
          <span className="text-brand-primary">نمایش عمومی:</span>
          <span>{formatWeeklyOutlookDate(reportDate, calendar, "long")}</span>
          <span dir="ltr" className="text-brand-primary/60">
            تاریخ ذخیره‌شده / {reportDate}
          </span>
        </div>
      </div>
    </div>
  );
}

type JalaliDateControls = {
  year: number;
  month: number;
  day: number;
};

function BlockEditor({
  language,
  block,
  index,
  onChange,
  onMove,
  onRemove,
}: {
  language: SiteLocale;
  block: WeeklyOutlookBlock;
  index: number;
  onChange: (patch: Partial<WeeklyOutlookBlock>) => void;
  onMove: (direction: -1 | 1) => void;
  onRemove: () => void;
}) {
  const textInputProps = { dir: SITE_LANGUAGES[language].direction, lang: language };
  return (
    <article className="p-5">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <span
            dir="ltr"
            className="text-[11px] font-black tracking-[.16em] text-ink-muted"
          >
            بلوک {(index + 1).toLocaleString("fa-IR", { minimumIntegerDigits: 2 })}
          </span>

          <h3 className="mt-1 text-sm font-black">{blockLabels[block.type]}</h3>
        </div>

        <div className="flex">
          <IconButton
            label="بالا"
            disabled={index === 0}
            onClick={() => onMove(-1)}
          >
            <ArrowUp size={14} />
          </IconButton>

          <IconButton label="پایین" onClick={() => onMove(1)}>
            <ArrowDown size={14} />
          </IconButton>

          <IconButton label="حذف بلوک" onClick={onRemove}>
            <Trash2 size={14} />
          </IconButton>
        </div>
      </div>

      {block.type === "paragraph" ? (
        <Label text="متن پاراگراف">
          <textarea
            className={`${inputClass} min-h-36 resize-none leading-8`}
            {...textInputProps}
            value={block.text}
            onChange={(event) => onChange({ text: event.target.value })}
          />
        </Label>
      ) : null}

      {block.type === "heading" ? (
        <div className="grid gap-4 md:grid-cols-[180px_1fr]">
          <Label text="سطح تیتر">
            <select
              className={inputClass}
              value={block.level}
              onChange={(event) =>
                onChange({ level: event.target.value as "h2" | "h3" })
              }
            >
              <option value="h2">تیتر اصلی سکشن</option>
              <option value="h3">زیربخش</option>
            </select>
          </Label>

          <Label text="متن تیتر">
            <input
              className={inputClass}
              value={block.text}
              {...textInputProps}
              onChange={(event) => onChange({ text: event.target.value })}
            />
          </Label>
        </div>
      ) : null}

      {block.type === "list" ? (
        <Label text="آیتم‌های لیست">
          <textarea
            className={`${inputClass} min-h-44 resize-none leading-8`}
            value={block.items.join("\n")}
            {...textInputProps}
            onChange={(event) => onChange({ items: event.target.value.split("\n") })}
          />
        </Label>
      ) : null}

      {block.type === "callout" ? (
        <div className="grid gap-4 md:grid-cols-[180px_1fr]">
          <Label text="رنگ نکته">
            <select
              className={inputClass}
              value={block.tone}
              onChange={(event) =>
                onChange({
                  tone: event.target.value as WeeklyOutlookCalloutTone,
                })
              }
            >
              {Object.entries(calloutToneLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </Label>

          <Label text="عنوان نکته">
            <input
              className={inputClass}
              value={block.title ?? ""}
              {...textInputProps}
              onChange={(event) => onChange({ title: event.target.value })}
            />
          </Label>

          <div className="md:col-span-2">
            <Label text="متن نکته">
              <textarea
                className={`${inputClass} min-h-32 resize-none leading-8`}
                value={block.text}
                {...textInputProps}
                onChange={(event) => onChange({ text: event.target.value })}
              />
            </Label>
          </div>
        </div>
      ) : null}

      {block.type === "quote" ? (
        <div className="grid gap-4">
          <Label text="متن نقل‌قول">
            <textarea
              className={`${inputClass} min-h-32 resize-none leading-8`}
              value={block.text}
              {...textInputProps}
              onChange={(event) => onChange({ text: event.target.value })}
            />
          </Label>

          <Label text="منبع یا توضیح کوتاه">
            <input
              className={inputClass}
              value={block.cite ?? ""}
              {...textInputProps}
              onChange={(event) => onChange({ cite: event.target.value })}
            />
          </Label>
        </div>
      ) : null}

      {block.type === "image" ? (
        <div className="grid gap-4 md:grid-cols-2">
          <Label text="آدرس تصویر">
            <input
              dir="ltr"
              className={`${inputClass} text-left`}
              placeholder="/assets/images/report.jpg یا https://..."
              value={block.src}
              onChange={(event) => onChange({ src: event.target.value })}
            />
          </Label>

          <Label text="متن جایگزین">
            <input
              className={inputClass}
              value={block.alt}
              {...textInputProps}
              onChange={(event) => onChange({ alt: event.target.value })}
            />
          </Label>

          <div className="md:col-span-2">
            <Label text="کپشن تصویر">
              <input
                className={inputClass}
                value={block.caption ?? ""}
                {...textInputProps}
                onChange={(event) => onChange({ caption: event.target.value })}
              />
            </Label>
          </div>
        </div>
      ) : null}

      {block.type === "button" ? (
        <div className="grid gap-4 md:grid-cols-[190px_1fr]">
          <Label text="حالت دکمه">
            <select
              className={inputClass}
              value={block.variant}
              onChange={(event) =>
                onChange({
                  variant: event.target.value as WeeklyOutlookButtonVariant,
                })
              }
            >
              {Object.entries(buttonVariantLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </Label>

          <Label text="متن دکمه">
            <input
              className={inputClass}
              value={block.label}
              {...textInputProps}
              onChange={(event) => onChange({ label: event.target.value })}
            />
          </Label>

          <div className="md:col-span-2">
            <Label
              text="آدرس لینک"
              help="مسیر داخلی مثل /services، لینک داخل صفحه مثل #summary یا لینک امن https"
            >
              <input
                dir="ltr"
                className={`${inputClass} text-left`}
                placeholder="/request-strategic-consultation"
                value={block.href}
                onChange={(event) => onChange({ href: event.target.value })}
              />
            </Label>
          </div>

          <div className="md:col-span-2">
            <Label text="توضیح کوتاه بالای دکمه">
              <input
                className={inputClass}
                value={block.note ?? ""}
                {...textInputProps}
                onChange={(event) => onChange({ note: event.target.value })}
              />
            </Label>
          </div>
        </div>
      ) : null}

      {block.type === "divider" ? (
        <div className="rounded-[16px] border border-dashed border-line bg-[#fbfdfd] p-6 text-center text-xs font-bold text-ink-muted">
          جداکننده بصری در صفحه گزارش نمایش داده می‌شود.
        </div>
      ) : null}
    </article>
  );
}

function SectionVisualPreview({
  visual,
}: {
  visual: WeeklyOutlookSectionVisual;
}) {
  return (
    <div className="relative min-h-[96px] overflow-hidden rounded-[18px] border border-brand-primary/12 bg-[#f7fbfc]">
      {visual === "plain" ? (
        <>
          <span className="absolute inset-x-5 top-1/2 h-px bg-brand-primary/14" />
          <span className="absolute right-5 top-5 h-2 w-2 bg-brand-accent" />
        </>
      ) : null}

      {visual === "grid" ? (
        <>
          <span
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "linear-gradient(to right,rgba(22,115,148,.12) 1px,transparent 1px),linear-gradient(to bottom,rgba(22,115,148,.1) 1px,transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          <span className="absolute bottom-5 right-6 h-2 w-2 bg-brand-accent" />
        </>
      ) : null}

      {visual === "gradient" ? (
        <>
          <span className="absolute inset-0 bg-[radial-gradient(circle_at_75%_28%,rgba(252,133,2,.28),transparent_30%),linear-gradient(135deg,rgba(22,115,148,.22),rgba(255,255,255,.8))]" />
          <span className="absolute bottom-5 left-5 h-px w-20 bg-brand-primary/30" />
        </>
      ) : null}

      {visual === "blueprint" ? (
        <>
          <span
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right,rgba(22,115,148,.14) 1px,transparent 1px),linear-gradient(to bottom,rgba(22,115,148,.1) 1px,transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />
          <span className="absolute left-8 top-5 h-12 w-16 border border-brand-primary/25" />
          <span className="absolute left-14 top-4 h-14 w-px rotate-[32deg] bg-brand-primary/20" />
          <span className="absolute right-7 bottom-6 h-2 w-2 bg-brand-accent" />
        </>
      ) : null}

      {visual === "market" ? (
        <svg
          viewBox="0 0 160 96"
          className="absolute inset-0 h-full w-full text-brand-primary"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M18 66C34 56 42 68 56 51C70 34 83 48 97 35C112 21 125 33 144 20"
            stroke="currentColor"
            strokeOpacity=".38"
            strokeWidth="2"
          />
          <path
            d="M18 74H144M34 18V78M70 18V78M106 18V78"
            stroke="currentColor"
            strokeOpacity=".1"
          />
          <rect x="96" y="31" width="7" height="7" fill="var(--dnh-accent)" />
        </svg>
      ) : null}

      {visual === "spotlight" ? (
        <>
          <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(252,133,2,.34),transparent_28%),radial-gradient(circle_at_50%_45%,rgba(22,115,148,.20),transparent_48%)]" />
          <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 bg-brand-accent" />
        </>
      ) : null}

      {visual === "glass" ? (
        <>
          <span className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-white" />
          <span className="absolute right-6 top-4 h-16 w-12 border border-brand-primary/16 bg-white/45" />
          <span className="absolute right-16 top-8 h-16 w-12 border border-brand-primary/18 bg-white/35" />
          <span className="absolute left-7 bottom-6 h-px w-16 bg-brand-accent/75" />
        </>
      ) : null}

      {visual === "accent" ? (
        <>
          <span className="absolute inset-y-5 right-7 w-px bg-brand-accent" />
          <span className="absolute bottom-6 right-7 h-px w-24 bg-brand-primary/22" />
          <span className="absolute right-[23px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 bg-brand-accent" />
        </>
      ) : null}

      <span className="absolute bottom-3 right-3 text-[10px] font-black text-brand-primary/70">
        {sectionVisualLabels[visual]}
      </span>
    </div>
  );
}

function BlockMiniIcon({ type }: { type: WeeklyOutlookBlockType }) {
  const className = "h-3.5 w-3.5";

  if (type === "list") return <ListChecks className={className} />;
  if (type === "quote") return <Quote className={className} />;
  if (type === "image") return <ImageIcon className={className} />;
  if (type === "button") return <Link2 className={className} />;
  if (type === "heading") return <FileText className={className} />;

  return <Plus className={className} />;
}

function Label({
  text,
  help,
  children,
}: {
  text: string;
  help?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-xs font-bold text-ink">
      {text}
      {children}
      {help ? (
        <span className="mt-1 block text-[10px] font-normal leading-5 text-ink-muted">
          {help}
        </span>
      ) : null}
    </label>
  );
}

function SectionHeader({
  code,
  title,
  actions,
}: {
  code: string;
  title: string;
  actions?: React.ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
      <div>
        <p className="text-xs font-bold text-ink-muted">
          {code}
        </p>

        <h2 className="mt-1 text-base font-black">{title}</h2>
      </div>

      {actions}
    </header>
  );
}

function IconButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-xl border border-line bg-white text-ink transition hover:border-brand-accent hover:text-brand-accent disabled:pointer-events-none disabled:opacity-25"
    >
      {children}
    </button>
  );
}
