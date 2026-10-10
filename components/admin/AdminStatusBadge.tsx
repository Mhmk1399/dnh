export type AdminStatusTone =
  | "brand"
  | "accent"
  | "success"
  | "muted"
  | "danger"
  | "warning";

const toneClassName: Record<AdminStatusTone, string> = {
  brand: "border-teal-200 bg-teal-50 text-teal-800",
  accent: "border-orange-200 bg-orange-50 text-orange-800",
  success: "border-emerald-200 bg-emerald-50 text-emerald-800",
  muted: "border-slate-200 bg-slate-100 text-slate-700",
  danger: "border-red-200 bg-red-50 text-red-800",
  warning: "border-amber-200 bg-amber-50 text-amber-800",
};

export function AdminStatusBadge({
  tone = "brand",
  children,
}: {
  tone?: AdminStatusTone;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`
        inline-flex
        min-h-7
        shrink-0
        items-center
        border
        px-2.5
        py-1
        text-[10px]
        font-black

        ${toneClassName[tone]}
      `}
    >
      {children}
    </span>
  );
}
