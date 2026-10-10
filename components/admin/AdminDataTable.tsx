import { Fragment } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, Database } from "lucide-react";

import { DeleteRecordButton } from "@/components/admin/DeleteRecordButton";
import { AdminTableActionLink } from "@/components/admin/AdminTableActionLink";

export type AdminTableColumn<T> = {
  key: string;
  header: string;
  cell: (row: T) => React.ReactNode;
  mobileLabel?: string;
  className?: string;
  headerClassName?: string;
  hideOnMobile?: boolean;
};

export type AdminTableLinkAction<T> = {
  type: "link";
  label: string;
  href: (row: T) => string;
  icon?: LucideIcon;
  primary?: boolean;
  external?: boolean;
  hidden?: (row: T) => boolean;
};

export type AdminTableDeleteAction<T> = {
  type: "delete";
  label: string;
  endpoint: (row: T) => string;
  title: (row: T) => string;
  description: (row: T) => string;
  hidden?: (row: T) => boolean;
};

export type AdminTableCustomAction<T> = {
  type: "custom";
  label: string;
  render: (row: T, compact: boolean) => React.ReactNode;
  hidden?: (row: T) => boolean;
};

export type AdminTableAction<T> =
  | AdminTableLinkAction<T>
  | AdminTableDeleteAction<T>
  | AdminTableCustomAction<T>;

export function AdminDataTable<T>({
  title,
  code,
  rows,
  columns,
  getRowId,
  actions = [],
  emptyTitle = "داده‌ای برای نمایش نیست",
  emptyDescription = "هنوز رکوردی ثبت نشده یا فیلتر فعلی نتیجه‌ای ندارد.",
  minWidth = 920,
}: {
  title?: string;
  code?: string;
  rows: T[];
  columns: AdminTableColumn<T>[];
  getRowId: (row: T) => string;
  actions?: AdminTableAction<T>[];
  emptyTitle?: string;
  emptyDescription?: string;
  minWidth?: number;
}) {
  const visibleActionCount = actions.length;

  if (rows.length === 0) {
    return (
      <AdminTableEmptyState
        title={emptyTitle}
        description={emptyDescription}
      />
    );
  }

  return (
    <section className="border border-line bg-white/92 shadow-[0_18px_52px_rgba(3,45,59,0.05)] backdrop-blur-xl">
      {title || code ? (
        <header className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
          <div>
            {code ? (
              <p
                dir="ltr"
                className="text-[10px] font-black tracking-[0.2em] text-brand-primary"
              >
                {code}
              </p>
            ) : null}
            {title ? (
              <h2 className="mt-1 text-base font-black text-ink">{title}</h2>
            ) : null}
          </div>
          <span className="border border-line bg-[#fbfdfd] px-3 py-1.5 text-[10px] font-black text-ink-muted">
            {rows.length.toLocaleString("fa-IR")} رکورد
          </span>
        </header>
      ) : null}

      <div className="hidden overflow-x-auto lg:block">
        <table
          className="w-full border-collapse text-right text-xs"
          style={{ minWidth }}
        >
          <thead>
            <tr className="border-b border-line bg-[#edf5f7] text-ink-muted">
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={`px-5 py-4 font-black ${column.headerClassName ?? ""}`}
                >
                  {column.header}
                </th>
              ))}

              {visibleActionCount > 0 ? (
                <th scope="col" className="px-5 py-4 font-black">
                  عملیات
                </th>
              ) : null}
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr
                key={getRowId(row)}
                className="border-b border-line/70 align-middle last:border-0 hover:bg-[#fbfdfd]"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-5 py-4 align-middle ${column.className ?? ""}`}
                  >
                    {column.cell(row)}
                  </td>
                ))}

                {visibleActionCount > 0 ? (
                  <td className="px-5 py-4 align-middle">
                    <AdminTableActions row={row} actions={actions} compact />
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-line lg:hidden">
        {rows.map((row) => (
          <article key={getRowId(row)} className="bg-white p-4">
            <div className="space-y-3">
              {columns
                .filter((column) => !column.hideOnMobile)
                .map((column) => (
                  <div
                    key={column.key}
                    className="flex items-start justify-between gap-4"
                  >
                    <span className="shrink-0 text-[10px] font-black text-ink-muted">
                      {column.mobileLabel ?? column.header}
                    </span>
                    <div className="min-w-0 text-left text-xs font-bold text-ink">
                      {column.cell(row)}
                    </div>
                  </div>
                ))}
            </div>

            {visibleActionCount > 0 ? (
              <div className="mt-4 border-t border-dashed border-line pt-4">
                <AdminTableActions row={row} actions={actions} />
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

function AdminTableActions<T>({
  row,
  actions,
  compact = false,
}: {
  row: T;
  actions: AdminTableAction<T>[];
  compact?: boolean;
}) {
  const visibleActions = actions.filter((action) => !action.hidden?.(row));

  if (visibleActions.length === 0) return <span className="text-ink-muted">—</span>;

  return (
    <div
      className={`
        flex
        flex-wrap
        items-center
        gap-2

        ${compact ? "justify-start" : "justify-end"}
      `}
    >
      {visibleActions.map((action) => {
        if (action.type === "custom") {
          return (
            <Fragment key={`${action.type}-${action.label}`}>
              {action.render(row, compact)}
            </Fragment>
          );
        }

        if (action.type === "delete") {
          return (
            <DeleteRecordButton
              key={`${action.type}-${action.label}`}
              endpoint={action.endpoint(row)}
              title={action.title(row)}
              description={action.description(row)}
              compact={compact}
            />
          );
        }

        const Icon = action.icon ?? ArrowLeft;

        return (
          <AdminTableActionLink
            key={`${action.type}-${action.label}`}
            href={action.href(row)}
            label={action.label}
            external={action.external}
            title={compact ? action.label : undefined}
            ariaLabel={compact ? action.label : undefined}
            className={`
              inline-flex
              items-center
              justify-center
              gap-2
              border
              text-xs
              font-black
              transition
              focus-visible:outline-none
              focus-visible:ring-4
              focus-visible:ring-focus/20

              ${
                action.primary
                  ? "border-brand-primary bg-brand-primary text-white hover:bg-brand-secondary"
                  : "border-line bg-white text-ink hover:border-brand-accent hover:text-brand-primary"
              }

              ${compact ? "h-9 w-9" : "min-h-10 px-3 py-2"}
            `}
          >
            <Icon size={15} aria-hidden="true" />
            {compact ? null : action.label}
          </AdminTableActionLink>
        );
      })}
    </div>
  );
}

export function AdminTableEmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="border border-dashed border-line bg-white/90 px-6 py-20 text-center shadow-[0_18px_52px_rgba(3,45,59,0.04)]">
      <Database className="mx-auto h-10 w-10 text-brand-primary/30" />
      <h2 className="mt-5 text-lg font-black text-ink">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-ink-muted">
        {description}
      </p>
    </div>
  );
}
