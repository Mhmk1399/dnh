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

  return (
    <form
      noValidate
      key={JSON.stringify(
        fields.map((field) =>
          field.type === "hidden" ? field.value : field.defaultValue,
        ),
      )}
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

        router.push(
          params.size ? `${pathname}?${params.toString()}` : pathname,
        );
      }}
      className={`
        flex flex-wrap items-end
        gap-3
        rounded-[24px]
        border
        border-line
        bg-white/90
        p-4
        shadow-[0_12px_34px_rgba(3,45,59,0.04)]
        backdrop-blur-xl

        ${className}
      `}
    >
      {fields.map((field) => {
        if (field.type === "hidden") {
          return (
            <input
              key={field.name}
              type="hidden"
              name={field.name}
              value={field.value}
            />
          );
        }

        return (
          <label
            key={field.name}
            className={`min-w-0 basis-full text-sm font-bold text-ink ${field.type === "search" ? "sm:flex-[2_1_17rem]" : "sm:flex-[1_1_11rem]"}`}
          >
            {field.label}

            {field.type === "select" ? (
              <select
                name={field.name}
                defaultValue={field.defaultValue}
                className="mt-2 min-h-11 w-full rounded-xl border border-line bg-white px-3 py-2.5 text-base outline-none transition focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10 sm:text-sm"
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
                className="mt-2 min-h-11 w-full rounded-xl border border-line bg-white px-3 py-2.5 text-base outline-none transition focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10 sm:text-sm"
              />
            )}
          </label>
        );
      })}

      <button
        type="submit"
        className="min-h-11 flex-1 cursor-pointer rounded-xl bg-brand-accent px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus/25 sm:flex-none"
      >
        {submitLabel}
      </button>

      {resetHref ? (
        <Link
          href={resetHref}
          className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl border border-line bg-white px-4 py-3 text-sm font-bold text-ink-muted transition hover:border-brand-accent hover:text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-focus/20 sm:flex-none"
        >
          پاک کردن
        </Link>
      ) : null}
    </form>
  );
}
