"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type AdminDynamicFormField =
  | {
      type: "text" | "search" | "date";
      name: string;
      label: string;
      defaultValue?: string;
      placeholder?: string;
      dir?: "rtl" | "ltr";
    }
  | {
      type: "select";
      name: string;
      label: string;
      defaultValue?: string;
      options: Array<{ label: string; value: string }>;
    }
  | {
      type: "hidden";
      name: string;
      value: string;
    };

export function AdminDynamicForm({
  fields,
  submitLabel = "اعمال",
  resetHref,
  className = "",
}: {
  fields: AdminDynamicFormField[];
  submitLabel?: string;
  resetHref?: string;
  className?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const visibleFields = fields.filter((field) => field.type !== "hidden");
  const gridTemplate =
    visibleFields.length <= 1
      ? "sm:grid-cols-[1fr_auto]"
      : "sm:grid-cols-[minmax(0,1fr)_220px_auto_auto]";

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const params = new URLSearchParams();

        for (const [key, value] of formData.entries()) {
          const normalized = String(value).trim();

          if (normalized) {
            params.set(key, normalized);
          }
        }

        router.push(params.size ? `${pathname}?${params.toString()}` : pathname);
      }}
      className={`
        grid
        gap-3
        rounded-[24px]
        border
        border-line
        bg-white/90
        p-4
        shadow-[0_12px_34px_rgba(3,45,59,0.04)]
        backdrop-blur-xl

        ${gridTemplate}
        ${className}
      `}
    >
      {fields.map((field) => {
        if (field.type === "hidden") {
          return (
            <input key={field.name} type="hidden" name={field.name} value={field.value} />
          );
        }

        return (
          <label key={field.name} className="text-xs font-bold text-ink">
            {field.label}

            {field.type === "select" ? (
              <select
                name={field.name}
                defaultValue={field.defaultValue}
                className="mt-2 w-full rounded-[14px] border border-line bg-white px-3 py-2.5 text-sm outline-none transition focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10"
              >
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                dir={field.dir}
                defaultValue={field.defaultValue}
                placeholder={field.placeholder}
                className="mt-2 w-full rounded-[14px] border border-line bg-white px-3 py-2.5 text-sm outline-none transition focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10"
              />
            )}
          </label>
        );
      })}

      <button className="min-h-11 cursor-pointer self-end rounded-[14px] bg-brand-primary px-5 py-3 text-xs font-black text-white transition hover:bg-brand-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus/25">
        {submitLabel}
      </button>

      {resetHref ? (
        <Link
          href={resetHref}
          className="inline-flex min-h-11 items-center justify-center self-end rounded-[14px] border border-line bg-white px-4 py-3 text-xs font-black text-ink-muted transition hover:border-brand-primary hover:text-brand-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus/20"
        >
          پاک کردن
        </Link>
      ) : null}
    </form>
  );
}
