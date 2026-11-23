import Link from "next/link";

export function AdminTablePagination({ basePath, page, totalPages, filters = {} }: {
  basePath: string;
  page: number;
  totalPages: number;
  filters?: Record<string, string | undefined>;
}) {
  if (totalPages < 2) return null;
  function href(next: number) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) if (value) params.set(key, value);
    params.set("page", String(next));
    return `${basePath}?${params}`;
  }
  const button = "inline-flex min-h-11 items-center border border-line px-4 text-xs font-bold text-ink hover:bg-surface-soft";
  return (
    <nav aria-label="صفحه‌بندی جدول" className="flex flex-wrap items-center justify-between gap-3 border border-line bg-white p-3">
      <span className="text-xs font-bold text-ink-muted">
        صفحه {page.toLocaleString("fa-IR")} از {totalPages.toLocaleString("fa-IR")}
      </span>
      <div className="flex gap-2">
        {page > 1 && <Link href={href(page - 1)} className={button}>قبلی</Link>}
        {page < totalPages && <Link href={href(page + 1)} className={button}>بعدی</Link>}
      </div>
    </nav>
  );
}
