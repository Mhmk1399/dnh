import { FileText } from "lucide-react";

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
      className="group border border-line bg-white"
      open={defaultOpen}
    >
      <summary className="cursor-pointer list-none p-5 focus:outline-none focus:ring-4 focus:ring-brand-accent/10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            {code ? (
              <p
                dir="ltr"
                className="text-[10px] font-black tracking-[0.16em] text-brand-primary"
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

          <span className="grid h-10 w-10 place-items-center bg-surface-soft text-brand-primary transition group-open:bg-brand-primary group-open:text-white">
            <FileText size={17} aria-hidden="true" />
          </span>
        </div>
      </summary>

      <div className="grid gap-px border-t border-line bg-line sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={`${item.label}-${item.code ?? ""}`}
            className={`bg-[#fbfdfd] p-5 ${item.wide ? "sm:col-span-2" : ""}`}
          >
            <p className="text-[10px] font-bold text-ink-muted">{item.label}</p>
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
