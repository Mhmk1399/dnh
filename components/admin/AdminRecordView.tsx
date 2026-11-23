import { ChevronDown } from "lucide-react";

export type AdminRecordViewItem = {
  label: string;
  value: React.ReactNode;
  code?: string;
  wide?: boolean;
};

export function AdminRecordView({
  title,
  code,
  description,
  items,
  defaultOpen = false,
}: {
  title: React.ReactNode;
  code?: string;
  description?: React.ReactNode;
  items: AdminRecordViewItem[];
  defaultOpen?: boolean;
}) {
  return (
    <details
      className="group overflow-hidden rounded-[24px] border border-line bg-white"
      open={defaultOpen}
    >
      <summary className="cursor-pointer list-none p-4 hover:bg-surface-soft focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-focus sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 [overflow-wrap:anywhere]">
            {code ? (
              <p
                dir="auto"
                className="text-xs font-semibold text-ink-muted"
              >
                {code}
              </p>
            ) : null}
            <h3 className="mt-2 text-sm font-black leading-7 text-ink">
              {title}
            </h3>
            {description ? (
              <p className="mt-2 text-xs leading-6 text-ink-muted">
                {description}
              </p>
            ) : null}
          </div>

          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-surface-soft text-brand-accent">
            <ChevronDown size={18} aria-hidden="true" className="group-open:rotate-180 motion-safe:transition-transform" />
          </span>
        </div>
      </summary>

      <div className="grid gap-px border-t border-line bg-line sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={`${item.label}-${item.code ?? ""}`}
            className={`min-w-0 bg-[#fbfdfd] p-4 [overflow-wrap:anywhere] sm:p-5 ${item.wide ? "sm:col-span-2" : ""}`}
          >
            <p className="text-xs font-bold text-ink-muted">{item.label}</p>
            <div className="mt-2 whitespace-pre-wrap text-sm font-bold leading-7 text-ink">
              {item.value || "—"}
            </div>
            {item.code ? (
              <p
                dir="ltr"
                className="mt-4 text-[11px] font-bold tracking-wider text-ink-muted/70"
              >
                {item.code}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </details>
  );
}
