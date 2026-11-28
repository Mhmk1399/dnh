"use client";

import { useState } from "react";
import { CalendarDays, Eye, Globe2, Hash, UserRound } from "lucide-react";

import { AdminModal } from "@/components/admin/AdminModal";

export type IntakeDetailItem = {
  label: string;
  value: string;
  wide?: boolean;
  direction?: "rtl" | "ltr" | "auto";
};

export type IntakeActionRecord = {
  id: string;
  code: string;
  title: string;
  source: string;
  locale?: "fa" | "en";
  user?: string;
  createdAtLabel: string;
  updatedAtLabel: string;
  details: IntakeDetailItem[];
};

export function IntakeTableActions({
  record,
  compact = false,
}: {
  record: IntakeActionRecord;
  compact?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`مشاهده جزئیات ${record.title}`}
        title={compact ? "مشاهده جزئیات" : undefined}
        className={`inline-flex items-center justify-center gap-2 rounded-[14px] border border-line bg-white text-xs font-black text-ink transition hover:border-brand-accent hover:bg-surface-soft hover:text-brand-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus/20 ${
          compact ? "h-9 w-9" : "min-h-10 px-3 py-2"
        }`}
      >
        <Eye size={15} aria-hidden="true" />
        {compact ? null : "مشاهده"}
      </button>

      <AdminModal
        open={open}
        onClose={() => setOpen(false)}
        eyebrow={record.source}
        title={record.title}
        size="xl"
      >
        <div className="space-y-5 p-5 sm:p-6">
          <div className="grid gap-px overflow-hidden rounded-[18px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            <SummaryItem icon={Hash} label="شناسه" value={record.code} ltr />
            <SummaryItem
              icon={CalendarDays}
              label="زمان ثبت"
              value={record.createdAtLabel}
            />
            <SummaryItem
              icon={Globe2}
              label="زبان فرم"
              value={
                record.locale === "en"
                  ? "انگلیسی"
                  : record.locale === "fa"
                    ? "فارسی"
                    : "ثبت نشده"
              }
            />
            <SummaryItem
              icon={UserRound}
              label="کاربر متصل"
              value={record.user ?? "ارسال عمومی"}
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {record.details.map((item) => (
              <div
                key={item.label}
                className={`min-w-0 rounded-[18px] border border-line bg-[#fbfdfd] p-4 sm:p-5 ${
                  item.wide ? "sm:col-span-2" : ""
                }`}
              >
                <p className="text-[10px] font-black text-ink-muted">
                  {item.label}
                </p>
                <p
                  dir={item.direction ?? "auto"}
                  className="mt-2 whitespace-pre-wrap break-words text-sm font-bold leading-7 text-ink"
                >
                  {item.value || "—"}
                </p>
              </div>
            ))}
          </div>

          <p className="border-t border-line pt-4 text-[10px] leading-6 text-ink-muted">
            آخرین به‌روزرسانی رکورد: {record.updatedAtLabel}
          </p>
        </div>
      </AdminModal>
    </>
  );
}

function SummaryItem({
  icon: Icon,
  label,
  value,
  ltr = false,
}: {
  icon: typeof Hash;
  label: string;
  value: string;
  ltr?: boolean;
}) {
  return (
    <div className="min-w-0 bg-white p-4">
      <div className="flex items-center gap-2 text-brand-primary">
        <Icon size={15} aria-hidden="true" />
        <span className="text-[10px] font-black text-ink-muted">{label}</span>
      </div>
      <p
        dir={ltr ? "ltr" : "auto"}
        className={`mt-2 truncate text-xs font-black text-ink ${ltr ? "text-left" : "text-start"}`}
        title={value}
      >
        {value}
      </p>
    </div>
  );
}
