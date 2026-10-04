import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type BaseProps = {
  label: string;
  name: string;
  hint?: string;
  error?: string;
};

type Props = BaseProps & (
  | ({ multiline?: false } & InputHTMLAttributes<HTMLInputElement>)
  | ({ multiline: true } & TextareaHTMLAttributes<HTMLTextAreaElement>)
);

export function FormField(props: Props) {
  const { label, name, hint, error, multiline, ...fieldProps } = props;
  const describedBy = error ? `${name}-error` : hint ? `${name}-hint` : undefined;
  const fieldClass = `w-full border bg-white px-4 py-3.5 text-sm text-ink outline-none transition placeholder:text-ink-muted/60 focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10 ${error ? "border-red-500" : "border-line"}`;
  return (
    <div>
      <label htmlFor={name} className="mb-2 flex items-center justify-between gap-3 text-[13px] font-bold text-ink">
        <span>{label}</span>
        {hint && <span id={`${name}-hint`} className="text-[10px] font-medium text-ink-muted">{hint}</span>}
      </label>
      {multiline ? (
        <textarea id={name} name={name} aria-invalid={Boolean(error)} aria-describedby={describedBy} className={`${fieldClass} min-h-32 resize-y`} {...(fieldProps as TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : (
        <input id={name} name={name} aria-invalid={Boolean(error)} aria-describedby={describedBy} className={fieldClass} {...(fieldProps as InputHTMLAttributes<HTMLInputElement>)} />
      )}
      {error && <p id={`${name}-error`} role="alert" className="mt-1.5 text-xs font-semibold text-red-700">{error}</p>}
    </div>
  );
}
