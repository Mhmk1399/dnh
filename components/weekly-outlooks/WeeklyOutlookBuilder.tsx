"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Eye,
  FileText,
  Image as ImageIcon,
  ListChecks,
  Plus,
  Quote,
  Save,
  Send,
  Trash2,
} from "lucide-react";
import { adminToast, adminToastMessage } from "@/components/admin/adminToast";
import {
  createWeeklyOutlookTemplate,
  makeWeeklyOutlookStableId,
  type WeeklyOutlookBlock,
  type WeeklyOutlookBlockType,
  type WeeklyOutlookCalloutTone,
  type WeeklyOutlookReportDefinition,
  type WeeklyOutlookSectionDefinition,
  type WeeklyOutlookSectionIcon,
  type WeeklyOutlookSectionTone,
  type WeeklyOutlookStatus,
} from "@/lib/weekly-outlook";
import { normalizeWeeklyOutlookSlug } from "@/lib/weekly-outlook-validation";

type Props = {
  initial?: WeeklyOutlookReportDefinition;
  reportId?: string;
};

type Notice =
  | {
      kind: "success" | "error";
      message: string;
    }
  | null;

const sectionToneLabels: Record<WeeklyOutlookSectionTone, string> = {
  light: "روشن",
  soft: "نرم",
  dark: "تیره",
  teal: "نفتی",
  accent: "تأکیدی",
};

const sectionIconLabels: Record<WeeklyOutlookSectionIcon, string> = {
  overview: "نمای کلی",
  risk: "ریسک",
  market: "بازار",
  policy: "سیاست پولی",
  asset: "دارایی",
  watch: "رصد",
  conclusion: "نتیجه‌گیری",
};

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
  divider: "جداکننده",
};

const inputClass =
  "mt-2 w-full rounded-[14px] border border-line bg-white px-3.5 py-3 text-sm text-ink outline-none transition focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10";

export function WeeklyOutlookBuilder({ initial, reportId }: Props) {
  const router = useRouter();
  const [report, setReport] = useState<WeeklyOutlookReportDefinition>(
    () => initial ?? createWeeklyOutlookTemplate(),
  );
  const [activeSection, setActiveSection] = useState(0);
  const [busy, setBusy] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);
  const sectionEditorRef = useRef<HTMLElement | null>(null);

  const current =
    report.sections[activeSection] ?? report.sections[0] ?? null;
  const blockCount = useMemo(
    () =>
      report.sections.reduce(
        (total, section) => total + section.blocks.length,
        0,
      ),
    [report.sections],
  );

  function update(patch: Partial<WeeklyOutlookReportDefinition>) {
    setReport((value) => ({ ...value, ...patch }));
    setDirty(true);
    setNotice(null);
  }

  function selectSection(index: number, scrollToEditor = true) {
    setActiveSection(index);

    if (!scrollToEditor) return;

    window.requestAnimationFrame(() => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

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
    update({
      sections: report.sections.map((section, sectionIndex) =>
        sectionIndex === index ? { ...section, ...patch } : section,
      ),
    });
  }

  function updateBlock(
    sectionIndex: number,
    blockIndex: number,
    patch: Partial<WeeklyOutlookBlock>,
  ) {
    const section = report.sections[sectionIndex];

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
    if (report.sections.length >= 24) {
      const message = "حداکثر ۲۴ سکشن مجاز است.";

      adminToast.error(message);
      setNotice({ kind: "error", message });
      return;
    }

    const section: WeeklyOutlookSectionDefinition = {
      id: makeWeeklyOutlookStableId("section"),
      eyebrow: "سکشن جدید",
      title: `سکشن ${report.sections.length + 1}`,
      summary: "",
      icon: "overview",
      tone: "light",
      blocks: [
        {
          id: makeWeeklyOutlookStableId("block"),
          type: "paragraph",
          text: "متن این سکشن را وارد کنید.",
        },
      ],
    };

    update({ sections: [...report.sections, section] });
    adminToast.success("سکشن جدید اضافه شد.");
    selectSection(report.sections.length);
  }

  function removeSection(index: number) {
    if (report.sections.length === 1) {
      const message = "حداقل یک سکشن باید باقی بماند.";

      adminToast.error(message);
      setNotice({ kind: "error", message });
      return;
    }

    update({
      sections: report.sections.filter((_, sectionIndex) => sectionIndex !== index),
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
      block = { id, type, level: "h3", text: "تیتر جدید" };
    } else if (type === "list") {
      block = { id, type, items: ["آیتم اول", "آیتم دوم"] };
    } else if (type === "callout") {
      block = {
        id,
        type,
        tone: "info",
        title: "نکته",
        text: "متن نکته یا برداشت کلیدی را وارد کنید.",
      };
    } else if (type === "quote") {
      block = {
        id,
        type,
        text: "متن نقل‌قول یا گزاره برجسته را وارد کنید.",
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
    } else if (type === "divider") {
      block = { id, type };
    } else {
      block = {
        id,
        type: "paragraph",
        text: "متن پاراگراف را وارد کنید.",
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
        reportId ? `/api/admin/weekly-outlooks/${reportId}` : "/api/admin/weekly-outlooks",
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
        const detail = payload.errors
          ? Object.values(payload.errors)[0]
          : undefined;

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
      className="mx-auto max-w-[1600px] px-4 py-8 pb-28 sm:px-7 lg:px-10 xl:pb-10"
    >
      <header className="border-b border-line pb-7">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <Link
              href="/admin/weekly-outlooks"
              className="text-xs font-bold text-brand-primary hover:text-brand-accent"
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
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-[14px] border border-brand-primary bg-white px-4 py-2.5 text-xs font-black text-brand-primary transition hover:bg-brand-primary hover:text-white disabled:pointer-events-none disabled:opacity-50"
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

            {reportId && report.status !== "archived" ? (
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

      <div className="mt-7 grid items-start gap-6 xl:grid-cols-[300px_minmax(0,1fr)_390px]">
        <aside className="overflow-hidden rounded-[24px] border border-line bg-[#f6fbfc] xl:sticky xl:top-28">
          <div className="border-b border-line p-4">
            <p
              dir="ltr"
              className="text-[11px] font-black tracking-[.2em] text-brand-primary"
            >
              REPORT / SECTIONS
            </p>

            <div className="mt-2 flex items-center justify-between gap-4">
              <h2 className="font-black">سکشن‌های گزارش</h2>

              <span className="text-xs text-ink-muted">
                {report.sections.length.toLocaleString("fa-IR")} / ۲۴
              </span>
            </div>
          </div>

          <ol>
            {report.sections.map((section, index) => (
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
                      ? "bg-brand-primary text-white"
                      : "hover:bg-white"
                  }`}
                >
                  <span
                    dir="ltr"
                    className={`text-[11px] font-black tracking-[.16em] ${
                      activeSection === index
                        ? "text-white/70"
                        : "text-ink-muted"
                    }`}
                  >
                    SECTION / {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="mt-1 block text-sm font-black">
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
                    {sectionToneLabels[section.tone]}
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <button
            type="button"
            onClick={addSection}
            className="flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 border-t border-dashed border-brand-primary/30 p-4 text-xs font-black text-brand-primary transition hover:bg-white"
          >
            <Plus size={15} />
            افزودن سکشن
          </button>
        </aside>

        <main className="space-y-6">
          <section className="overflow-hidden rounded-[24px] border border-line bg-white">
            <SectionHeader code="01 / IDENTITY" title="مشخصات گزارش" />

            <div className="grid gap-5 p-5 md:grid-cols-2">
              <Label text="عنوان گزارش">
                <input
                  className={inputClass}
                  value={report.title}
                  onChange={(event) =>
                    update({ title: event.target.value })
                  }
                />
              </Label>

              <Label
                text="شناسه مسیر انگلیسی"
                help={`/knowledge/weekly-outlook/${report.slug || "report-slug"}`}
              >
                <input
                  dir="ltr"
                  className={`${inputClass} text-left`}
                  value={report.slug}
                  onChange={(event) =>
                    update({
                      slug: normalizeWeeklyOutlookSlug(event.target.value),
                    })
                  }
                />
              </Label>

              <Label text="نام نسخه">
                <input
                  className={inputClass}
                  value={report.edition}
                  onChange={(event) =>
                    update({ edition: event.target.value })
                  }
                />
              </Label>

              <Label text="تاریخ گزارش">
                <input
                  type="date"
                  className={inputClass}
                  value={report.reportDate}
                  onChange={(event) =>
                    update({ reportDate: event.target.value })
                  }
                />
              </Label>

              <div className="md:col-span-2">
                <Label text="توضیح کوتاه لیست گزارش‌ها">
                  <textarea
                    className={`${inputClass} min-h-28 resize-none leading-7`}
                    value={report.excerpt}
                    onChange={(event) =>
                      update({ excerpt: event.target.value })
                    }
                  />
                </Label>
              </div>

              <Label text="تصویر اصلی گزارش">
                <input
                  dir="ltr"
                  className={`${inputClass} text-left`}
                  placeholder="/assets/images/report-cover.jpg یا https://..."
                  value={report.coverImage ?? ""}
                  onChange={(event) =>
                    update({ coverImage: event.target.value })
                  }
                />
              </Label>

              <Label text="متن جایگزین تصویر اصلی">
                <input
                  className={inputClass}
                  value={report.coverImageAlt ?? ""}
                  onChange={(event) =>
                    update({ coverImageAlt: event.target.value })
                  }
                />
              </Label>

              <Label text="عنوان سئو">
                <input
                  className={inputClass}
                  value={report.seoTitle ?? ""}
                  onChange={(event) =>
                    update({ seoTitle: event.target.value })
                  }
                />
              </Label>

              <Label text="توضیح سئو">
                <input
                  className={inputClass}
                  value={report.seoDescription ?? ""}
                  onChange={(event) =>
                    update({ seoDescription: event.target.value })
                  }
                />
              </Label>
            </div>
          </section>

          {current ? (
            <section
              ref={sectionEditorRef}
              className="scroll-mt-28 overflow-hidden rounded-[24px] border border-line bg-white"
            >
              <SectionHeader
                code={`SECTION / ${String(activeSection + 1).padStart(2, "0")}`}
                title="تنظیم سکشن"
                actions={
                  <div className="flex gap-1">
                    <IconButton
                      label="انتقال به بالا"
                      disabled={activeSection === 0}
                      onClick={() => {
                        update({
                          sections: move(report.sections, activeSection, -1),
                        });
                        setActiveSection(activeSection - 1);
                      }}
                    >
                      <ArrowUp size={15} />
                    </IconButton>

                    <IconButton
                      label="انتقال به پایین"
                      disabled={activeSection === report.sections.length - 1}
                      onClick={() => {
                        update({
                          sections: move(report.sections, activeSection, 1),
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
                    value={current.title}
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
                    value={current.eyebrow ?? ""}
                    onChange={(event) =>
                      updateSection(activeSection, {
                        eyebrow: event.target.value,
                      })
                    }
                  />
                </Label>

                <Label text="آیکن سکشن">
                  <select
                    className={inputClass}
                    value={current.icon}
                    onChange={(event) =>
                      updateSection(activeSection, {
                        icon: event.target.value as WeeklyOutlookSectionIcon,
                      })
                    }
                  >
                    {Object.entries(sectionIconLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </Label>

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
                  <Label text="خلاصه سکشن">
                    <textarea
                      className={`${inputClass} min-h-24 resize-none leading-7`}
                      value={current.summary ?? ""}
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
                code={`${blockCount.toString().padStart(2, "0")} BLOCKS`}
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
        </main>

        <aside className="xl:sticky xl:top-28">
          <div className="rounded-t-[24px] border border-[#0c526a] bg-[#0d607b] p-5 text-white">
            <div className="flex items-center justify-between gap-4">
              <p
                dir="ltr"
                className="text-[11px] font-black tracking-[.2em] text-white/60"
              >
                LIVE / REPORT PREVIEW
              </p>

              <Eye size={16} />
            </div>

            <h2 className="mt-5 text-xl font-black leading-8">
              {report.title || "عنوان گزارش شما"}
            </h2>

            <p className="mt-3 text-xs leading-6 text-white/70">
              {report.excerpt || "توضیح کوتاه گزارش"}
            </p>

            <div
              dir="ltr"
              className="mt-5 border-t border-white/20 pt-3 text-left text-[11px] tracking-wider text-white/60"
            >
              /knowledge/weekly-outlook/{report.slug || "report-slug"}
              <br />
              {report.reportDate}
            </div>
          </div>

          <div className="rounded-b-[24px] border-x border-b border-line bg-white p-5">
            <p className="text-[11px] font-black text-brand-primary">
              ساختار صفحه
            </p>

            <ol className="mt-4 space-y-3">
              {report.sections.map((section, index) => (
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
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="min-w-0">
                      <span className="block truncate text-xs font-black text-ink">
                        {section.title || "بدون عنوان"}
                      </span>
                      <span className="mt-1 block text-[10px] leading-5 text-ink-muted">
                        {section.blocks.length.toLocaleString("fa-IR")} بلوک ·{" "}
                        {sectionToneLabels[section.tone]}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          {reportId && report.status === "published" ? (
            <Link
              href={`/knowledge/weekly-outlook/${report.slug}`}
              className="mt-3 flex min-h-12 items-center justify-center gap-2 rounded-[14px] border border-line bg-white p-3 text-[11px] font-bold transition hover:border-brand-primary"
            >
              <Eye size={14} />
              مشاهده صفحه عمومی
            </Link>
          ) : null}
        </aside>
      </div>

      {report.status !== "archived" ? (
        <div className="fixed bottom-3 left-3 right-3 z-40 flex items-center justify-between gap-2 rounded-[22px] border border-line bg-white/95 p-2 shadow-[0_12px_40px_rgba(16,24,32,.18)] backdrop-blur-xl xl:hidden">
          <div className="min-w-0">
            <p className="truncate text-[10px] font-black text-ink">
              {report.title || "گزارش جدید"}
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
              className="inline-flex min-h-10 cursor-pointer items-center gap-1 rounded-[14px] border border-brand-primary px-3 py-2 text-[10px] font-black text-brand-primary disabled:pointer-events-none disabled:opacity-50"
            >
              <Save size={13} />
              ذخیره
            </button>

            {reportId ? (
              <button
                disabled={busy}
                onClick={() => save("publish")}
                className="inline-flex min-h-10 cursor-pointer items-center gap-1 rounded-[14px] bg-brand-accent px-3 py-2 text-[10px] font-black text-white disabled:pointer-events-none disabled:opacity-50"
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

function BlockEditor({
  block,
  index,
  onChange,
  onMove,
  onRemove,
}: {
  block: WeeklyOutlookBlock;
  index: number;
  onChange: (patch: Partial<WeeklyOutlookBlock>) => void;
  onMove: (direction: -1 | 1) => void;
  onRemove: () => void;
}) {
  return (
    <article className="p-5">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <span
            dir="ltr"
            className="text-[11px] font-black tracking-[.16em] text-ink-muted"
          >
            BLOCK / {String(index + 1).padStart(2, "0")}
          </span>

          <h3 className="mt-1 text-sm font-black">
            {blockLabels[block.type]}
          </h3>
        </div>

        <div className="flex">
          <IconButton label="بالا" disabled={index === 0} onClick={() => onMove(-1)}>
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
            onChange={(event) =>
              onChange({
                items: event.target.value
                  .split("\n")
                  .map((item) => item.trim())
                  .filter(Boolean),
              })
            }
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
              onChange={(event) => onChange({ title: event.target.value })}
            />
          </Label>

          <div className="md:col-span-2">
            <Label text="متن نکته">
              <textarea
                className={`${inputClass} min-h-32 resize-none leading-8`}
                value={block.text}
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
              onChange={(event) => onChange({ text: event.target.value })}
            />
          </Label>

          <Label text="منبع یا توضیح کوتاه">
            <input
              className={inputClass}
              value={block.cite ?? ""}
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
              onChange={(event) => onChange({ alt: event.target.value })}
            />
          </Label>

          <div className="md:col-span-2">
            <Label text="کپشن تصویر">
              <input
                className={inputClass}
                value={block.caption ?? ""}
                onChange={(event) =>
                  onChange({ caption: event.target.value })
                }
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

function BlockMiniIcon({ type }: { type: WeeklyOutlookBlockType }) {
  const className = "h-3.5 w-3.5";

  if (type === "list") return <ListChecks className={className} />;
  if (type === "quote") return <Quote className={className} />;
  if (type === "image") return <ImageIcon className={className} />;
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
        <span
          dir="ltr"
          className="mt-1 block text-left text-[10px] font-normal text-ink-muted"
        >
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
    <header className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
      <div>
        <p
          dir="ltr"
          className="text-[11px] font-black tracking-[.18em] text-brand-primary"
        >
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
      disabled={disabled}
      onClick={onClick}
      className="grid h-9 w-9 cursor-pointer place-items-center rounded-xl border border-line bg-white text-ink transition hover:border-brand-accent hover:text-brand-primary disabled:pointer-events-none disabled:opacity-25"
    >
      {children}
    </button>
  );
}
