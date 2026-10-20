"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEventHandler,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  FileText,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { FormField } from "@/components/forms/FormField";
import { FormStatus } from "@/components/forms/FormStatus";
import { ActionButton } from "@/components/ui/ActionButton";
import type { SiteDirection } from "@/lib/site-language";
import type {
  ConsultationFormField,
  ConsultationRequestContent,
} from "./strategicConsultationTypes";
import styles from "./StrategicConsultationRequestSection.module.css";

type StrategicConsultationRequestSectionProps = {
  content: ConsultationRequestContent;
  direction: SiteDirection;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  pending?: boolean;
  result?: {
    ok: boolean;
    message?: string;
    reference?: string;
    errors?: Record<string, string>;
  } | null;
};

type SelectOption = { value: string; label: string };

const NOTE_ICONS: Record<
  ConsultationRequestContent["notes"][number]["icon"],
  LucideIcon
> = {
  document: FileText,
  review: ShieldCheck,
  privacy: LockKeyhole,
};

const preventDefaultSubmit: FormEventHandler<HTMLFormElement> = (event) => {
  event.preventDefault();
};

export function StrategicConsultationRequestSection({
  content,
  direction,
  onSubmit = preventDefaultSubmit,
  pending = false,
  result = null,
}: StrategicConsultationRequestSectionProps) {
  const isRTL = direction === "rtl";
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const formRef = useRef<HTMLFormElement>(null);
  const locale = isRTL ? "fa" : "en";
  const mobileNotesLabel = isRTL
    ? "نکاتی پیش از ارسال درخواست"
    : "Before submitting your request";
  const mobileNotesCount = new Intl.NumberFormat(
    isRTL ? "fa-IR" : "en-US",
  ).format(content.notes.length);

  // On a failed server submission, take mobile users to the first invalid
  // control instead of leaving them at the bottom of a long form.
  useEffect(() => {
    if (
      !result ||
      result.ok ||
      !result.errors ||
      !Object.keys(result.errors).length
    )
      return;
    const control = formRef.current?.querySelector<HTMLElement>(
      '[aria-invalid="true"]',
    );
    if (!control) return;
    const frame = window.requestAnimationFrame(() => {
      control.focus({ preventScroll: true });
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      control.scrollIntoView({
        block: "center",
        behavior: reducedMotion ? "instant" : "smooth",
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [result]);

  return (
    <section
      id={content.id}
      dir={direction}
      lang={locale}
      aria-labelledby="consultation-request-title"
      className="relative isolate scroll-mt-24 overflow-x-clip bg-[#082b3b] py-12 text-white sm:scroll-mt-28 sm:py-18 lg:py-24"
    >
      <SectionBackground />

      <div className="dnh-site-shell relative z-10 min-w-0">
        {/* Quiet editorial index */}
        <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-4">
          <div className="flex min-w-0 items-center gap-3">
            <bdi
              dir="ltr"
              className="text-[12px] font-black tracking-[0.12em] text-brand-accent"
            >
              {content.index.number}
            </bdi>
            <span aria-hidden="true" className="h-4 w-px bg-white/20" />
            <span className="truncate text-[12px] font-bold text-white/75">
              {content.index.label}
            </span>
          </div>
          <span aria-hidden="true" className="flex items-center gap-1.5">
            <span className="size-1.5 bg-white/30" />
            <span className="size-1.5 bg-brand-accent" />
          </span>
        </div>

        <div className="grid min-w-0 items-start gap-x-10 gap-y-8 pt-8 sm:gap-y-10 sm:pt-12 lg:grid-cols-[minmax(0,0.81fr)_minmax(0,1.19fr)] lg:gap-x-12 xl:grid-cols-[minmax(0,0.76fr)_minmax(0,1.24fr)] xl:gap-x-20">
          {/* On desktop, the entire rail stays within the section and centered
              in the usable viewport. On small screens it is regular content. */}
          <aside className="min-w-0 lg:sticky lg:top-28 lg:flex lg:h-[calc(100svh-8rem)] lg:min-h-0 lg:self-start lg:items-center">
            <div
              className={`${styles.stickyCopy} min-w-0 w-full lg:max-h-full lg:overflow-y-auto lg:overscroll-contain`}
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-[2px] w-9 shrink-0 bg-brand-accent"
                />
                <p className="text-[11px] font-black tracking-[0.035em] text-[#96d7e9] sm:text-[12px]">
                  {content.eyebrow}
                </p>
              </div>

              <h2
                id="consultation-request-title"
                className={`mt-5 max-w-[18ch] !text-[clamp(1.65rem,5.2vw,2.25rem)] font-black text-white sm:mt-6 lg:!text-[clamp(1.9rem,2.6vw,2.55rem)] ${
                  isRTL
                    ? "leading-[1.68]"
                    : "leading-[1.23] tracking-[-0.025em]"
                }`}
              >
                <HighlightedHeading
                  text={content.heading}
                  highlight={content.heading_highlight}
                />
              </h2>

              <p
                className={`mt-4 max-w-[56ch] border-s-2 border-brand-accent/70 ps-4 text-[13px] font-normal text-white/73 sm:mt-6 sm:ps-5 sm:text-[14px] ${
                  isRTL ? "leading-[2.05]" : "leading-[1.8]"
                }`}
              >
                {content.intro}
              </p>

              {/* Mobile: show the form quickly; guidance remains discoverable. */}
              <details className={`${styles.mobileGuidance} mt-6 lg:hidden`}>
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 border border-white/20 bg-white/[0.055] px-4 py-3 text-[12px] font-bold text-white/90 [&::-webkit-details-marker]:hidden">
                  <span className="flex min-w-0 items-center gap-2.5">
                    <ShieldCheck
                      aria-hidden="true"
                      className="size-[17px] shrink-0 text-brand-accent"
                    />
                    <span>{mobileNotesLabel}</span>
                    <bdi dir="ltr" className="text-[11px] text-white/40">
                      {mobileNotesCount}
                    </bdi>
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className="size-4 shrink-0 text-white/70 transition-transform duration-300"
                  />
                </summary>
                <div className="border-x border-b border-white/15 bg-white/[0.045] px-4 py-1">
                  {content.notes.map((note) => (
                    <RequestNote
                      key={note.id}
                      icon={NOTE_ICONS[note.icon]}
                      title={note.title}
                      description={note.description}
                      accent={note.accent}
                    />
                  ))}
                </div>
              </details>

              {/* Desktop: small, scannable reassurance cards. */}
              <div className="mt-8 hidden divide-y divide-white/10 border-y border-white/15 lg:block">
                {content.notes.map((note) => (
                  <RequestNote
                    key={note.id}
                    icon={NOTE_ICONS[note.icon]}
                    title={note.title}
                    description={note.description}
                    accent={note.accent}
                  />
                ))}
              </div>
              <div
                aria-hidden="true"
                className="mt-7 hidden items-center gap-3 text-white/30 lg:flex"
              >
                <span className="h-px w-8 bg-brand-accent" />
                <span className="h-px flex-1 bg-white/10" />
                <span className="size-1.5 bg-brand-accent/60" />
              </div>
            </div>
          </aside>

          {/* Form: lighter editorial surface for clarity and faster completion. */}
          <div
            className={`${styles.formCard} relative z-0 min-w-0 border border-white/20 bg-[#fbfcfd] text-[#122c3d] shadow-[0_25px_85px_rgba(0,8,16,.22)]`}
          >
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(90deg,var(--dnh-accent,#fc8502)_0%,var(--dnh-accent,#fc8502)_28%,var(--dnh-primary,#167394)_28%,var(--dnh-primary,#167394)_100%)]"
            />

            <div className="border-b border-[#dbe5ea] px-4 pb-5 pt-6 sm:px-7 sm:pb-6 sm:pt-8 xl:px-9">
              <div className="flex items-start justify-between gap-3 sm:gap-6">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2.5 text-[11px] font-black text-[var(--dnh-primary,#167394)] sm:text-[12px]">
                    <span
                      aria-hidden="true"
                      className="size-1.5 bg-brand-accent"
                    />
                    <span>{content.form.eyebrow}</span>
                  </div>
                  <h3
                    className={`mt-2 text-[18px] font-black text-[#112e40] sm:text-[22px] ${isRTL ? "leading-[1.75]" : "leading-[1.35]"}`}
                  >
                    {content.form.title}
                  </h3>
                </div>
                <span
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center border border-[#d9e5eb] bg-[#f0f5f8] text-[var(--dnh-primary,#167394)] sm:size-12"
                >
                  <Sparkles size={20} strokeWidth={1.5} />
                </span>
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-[#e4eaee] pt-3">
                <bdi
                  dir="ltr"
                  className="text-[10px] font-black tracking-[0.14em] text-[#80929f]"
                >
                  {content.form.code}
                </bdi>
                <span className="text-[11px] font-medium text-[#748491]">
                  {isRTL
                    ? "اطلاعات اولیه برای بررسی درخواست"
                    : "A few details to review your request"}
                </span>
              </div>
            </div>

            <form
              ref={formRef}
              onSubmit={onSubmit}
              noValidate
              aria-label={content.form.aria_label}
              className={`${styles.formSkin} px-4 py-5 sm:px-7 sm:py-8 xl:px-9`}
            >
              {content.form.groups.map((group, index) => (
                <FieldGroup
                  key={group.id}
                  number={group.number}
                  title={group.title}
                  description={group.description}
                  isFirst={index === 0}
                >
                  <div className="grid min-w-0 grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 sm:gap-y-6">
                    {group.fields.map((field) => (
                      <div
                        key={field.id}
                        className={`min-w-0 ${group.id === "initial-picture" || field.kind === "textarea" ? "sm:col-span-2" : ""}`}
                      >
                        <RequestField
                          field={field}
                          direction={direction}
                          error={result?.errors?.[field.name]}
                        />
                      </div>
                    ))}
                  </div>
                </FieldGroup>
              ))}

              {result?.message ? (
                <div className="mt-7" role="status" aria-live="polite">
                  <FormStatus
                    kind={result.ok ? "success" : "error"}
                    message={result.message}
                    reference={result.reference}
                    referenceLabel={content.form.reference_label}
                  />
                </div>
              ) : null}

              <div className="mt-7 flex flex-col gap-4 border-t border-[#dfe7eb] pt-6 sm:mt-9 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <ActionButton
                  type="submit"
                  variant="assessment"
                  size="lg"
                  loading={pending}
                  disabled={pending}
                  className="!min-h-[54px] !w-full !bg-brand-primary !text-white !shadow-none hover:!bg-brand-secondary hover:!shadow-none sm:!w-auto sm:!min-w-[220px]"
                >
                  {pending
                    ? content.form.pending_label
                    : content.form.submit_label}
                </ActionButton>
                <p
                  className={`max-w-[34ch] text-[12px] font-medium text-[#73838d] sm:text-[12px] ${isRTL ? "leading-[1.9]" : "leading-[1.65]"}`}
                >
                  {content.form.submit_note}
                </p>
              </div>
            </form>

            <div className="relative flex items-start gap-3 border-t border-[#dee7ec] bg-[#f0f5f7] px-4 py-4 sm:px-7 sm:py-5 xl:px-9">
              <LockKeyhole
                className="mt-1 size-[17px] shrink-0 text-[var(--dnh-primary,#167394)]"
                aria-hidden="true"
                strokeWidth={1.7}
              />
              <p
                className={`text-[12px] font-medium text-[#627785] ${isRTL ? "leading-[2]" : "leading-[1.8]"}`}
              >
                {content.form.privacy_note}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RequestField({
  field,
  direction,
  error,
}: {
  field: ConsultationFormField;
  direction: SiteDirection;
  error?: string;
}) {
  if (field.kind === "select") {
    return (
      <DesignSelect
        label={field.label}
        name={field.name}
        options={field.options ?? []}
        direction={direction}
        required={field.required}
        error={error}
        hint={field.hint}
      />
    );
  }

  if (field.kind === "textarea") {
    return (
      <FormField
        label={field.label}
        name={field.name}
        hint={field.hint}
        multiline
        required={field.required}
        minLength={field.min_length}
        maxLength={field.max_length}
        placeholder={field.placeholder}
        error={error}
      />
    );
  }

  return (
    <FormField
      label={field.label}
      name={field.name}
      hint={field.hint}
      type={field.type ?? "text"}
      inputMode={field.input_mode}
      dir={field.dir}
      autoComplete={field.auto_complete}
      required={field.required}
      minLength={field.min_length}
      maxLength={field.max_length}
      placeholder={field.placeholder}
      error={error}
    />
  );
}

/**
 * A custom, keyboard-operable listbox. The hidden input intentionally keeps
 * the EXACT name/value contract of the original native <select>, so the
 * existing FormData-based submit handler and server validation still work.
 *
 * As in the original section, the form uses noValidate: required checks must
 * remain in the existing submit handler/API (not in the visual listbox).
 */
function DesignSelect({
  label,
  name,
  options,
  direction,
  required = false,
  error,
  hint,
}: {
  label: string;
  name: string;
  options: SelectOption[];
  direction: SiteDirection;
  required?: boolean;
  error?: string;
  hint?: string;
}) {
  const uid = useId();
  const labelId = `${uid}-label`;
  const triggerId = `${uid}-trigger`;
  const listId = `${uid}-listbox`;
  const errorId = `${uid}-error`;
  const hintId = `${uid}-hint`;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const [isOpen, setIsOpen] = useState(false);
  const [opensAbove, setOpensAbove] = useState(false);
  const [selected, setSelected] = useState("");
  const [focused, setFocused] = useState(0);

  const placeholder =
    options.find((option) => option.value === "")?.label ??
    (direction === "rtl" ? "انتخاب کنید" : "Select an option");
  const choices = options.filter((option) => option.value !== "");
  const selectedLabel = choices.find(
    (option) => option.value === selected,
  )?.label;

  const closeMenu = useCallback((focusTrigger = false) => {
    setIsOpen(false);
    if (focusTrigger) triggerRef.current?.focus({ preventScroll: true });
  }, []);

  const openMenu = (
    initialFocus: "selected" | "first" | "last" = "selected",
  ) => {
    if (!choices.length) return;
    const rect = triggerRef.current?.getBoundingClientRect();
    if (rect) {
      const below = window.innerHeight - rect.bottom;
      const above = rect.top;
      const desiredHeight = Math.min(320, choices.length * 52 + 18);
      setOpensAbove(below < desiredHeight && above > below);
    }
    const selectedIndex = choices.findIndex((item) => item.value === selected);
    setFocused(
      initialFocus === "first"
        ? 0
        : initialFocus === "last"
          ? choices.length - 1
          : Math.max(0, selectedIndex),
    );
    setIsOpen(true);
  };

  const choose = (option: SelectOption) => {
    setSelected(option.value);
    closeMenu(true);
  };

  useEffect(() => {
    if (!isOpen) return;
    const target = optionRefs.current[focused];
    const list = listRef.current;
    target?.focus({ preventScroll: true });
    if (target && list) {
      const optionBounds = target.getBoundingClientRect();
      const listBounds = list.getBoundingClientRect();
      if (optionBounds.bottom > listBounds.bottom) {
        list.scrollTop += optionBounds.bottom - listBounds.bottom + 6;
      } else if (optionBounds.top < listBounds.top) {
        list.scrollTop -= listBounds.top - optionBounds.top + 6;
      }
    }
  }, [isOpen, focused]);

  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) closeMenu();
    };
    const onEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, [isOpen, closeMenu]);

  // Keep state in sync when the parent form is reset.
  useEffect(() => {
    const form = rootRef.current?.closest("form");
    if (!form) return;
    const onReset = () => {
      setSelected("");
      setIsOpen(false);
    };
    form.addEventListener("reset", onReset);
    return () => form.removeEventListener("reset", onReset);
  }, []);

  const handleListKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setFocused((i) => (i + 1) % choices.length);
        break;
      case "ArrowUp":
        event.preventDefault();
        setFocused((i) => (i - 1 + choices.length) % choices.length);
        break;
      case "Home":
        event.preventDefault();
        setFocused(0);
        break;
      case "End":
        event.preventDefault();
        setFocused(choices.length - 1);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (choices[focused]) choose(choices[focused]);
        break;
      case "Tab":
        closeMenu();
        break;
      case "Escape":
        event.preventDefault();
        closeMenu(true);
        break;
    }
  };

  const describedBy =
    [hint ? hintId : "", error ? errorId : ""].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div
      ref={rootRef}
      className={styles.selectRoot}
      style={{ zIndex: isOpen ? 40 : undefined }}
    >
      <label htmlFor={triggerId} id={labelId} className={styles.selectLabel}>
        {label}
        {required && (
          <span aria-hidden="true" className={styles.required}>
            *
          </span>
        )}
      </label>

      {/* Preserve the existing backend contract: field.name -> chosen option.value */}
      <input type="hidden" name={name} value={selected} />

      <button
        ref={triggerRef}
        id={triggerId}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listId : undefined}
        aria-labelledby={`${labelId} ${triggerId}-value`}
        aria-describedby={describedBy}
        aria-invalid={Boolean(error)}
        disabled={choices.length === 0}
        className={styles.selectTrigger}
        data-open={isOpen}
        data-empty={!selected}
        data-invalid={Boolean(error)}
        onClick={() => (isOpen ? closeMenu() : openMenu())}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            openMenu("selected");
          } else if (event.key === "ArrowUp") {
            event.preventDefault();
            openMenu("last");
          } else if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            if (isOpen) closeMenu();
            else openMenu();
          }
        }}
      >
        <span
          id={`${triggerId}-value`}
          className="min-w-0 flex-1 truncate text-start"
        >
          {selectedLabel ?? placeholder}
        </span>
        <span aria-hidden="true" className={styles.selectChevron}>
          {isOpen ? (
            <ChevronUp size={18} strokeWidth={1.7} />
          ) : (
            <ChevronDown size={18} strokeWidth={1.7} />
          )}
        </span>
      </button>

      {isOpen && (
        <div
          ref={listRef}
          id={listId}
          role="listbox"
          aria-labelledby={labelId}
          className={`${styles.selectMenu} ${opensAbove ? styles.selectMenuAbove : styles.selectMenuBelow}`}
          onKeyDown={handleListKeyDown}
          data-lenis-prevent
        >
          {choices.map((option, index) => (
            <button
              key={`${name}-${option.value}`}
              ref={(node) => {
                optionRefs.current[index] = node;
              }}
              type="button"
              role="option"
              tabIndex={index === focused ? 0 : -1}
              aria-selected={selected === option.value}
              data-focused={index === focused}
              className={styles.selectOption}
              onFocus={() => setFocused(index)}
              onClick={() => choose(option)}
            >
              <span className="min-w-0 flex-1 text-start">{option.label}</span>
              <span aria-hidden="true" className={styles.optionCheck}>
                {selected === option.value && (
                  <Check size={17} strokeWidth={2.2} />
                )}
              </span>
            </button>
          ))}
        </div>
      )}

      {hint && (
        <p id={hintId} className={styles.fieldHint}>
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className={styles.fieldError} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function FieldGroup({
  number,
  title,
  description,
  children,
  isFirst,
}: {
  number: string;
  title: string;
  description: string;
  children: ReactNode;
  isFirst: boolean;
}) {
  return (
    <fieldset
      className={`${isFirst ? "" : "mt-7 border-t border-[#dee7eb] pt-7 sm:mt-9 sm:pt-9"} min-w-0`}
    >
      <legend className="w-full min-w-0 pb-5 sm:pb-6">
        <span className="flex min-w-0 items-start gap-3 sm:items-center">
          <span className="min-w-0 flex-1">
            <span className="block text-[14px] font-black leading-7 text-[#153448] sm:text-[15px]">
              {title}
            </span>
            {description && (
              <span className="mt-0.5 block text-[11px] font-medium leading-5 text-[#80919b]">
                {description}
              </span>
            )}
          </span>
        </span>
      </legend>
      {children}
    </fieldset>
  );
}

function RequestNote({
  icon: Icon,
  title,
  description,
  accent = false,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  accent?: boolean;
}) {
  return (
    <div className="grid min-w-0 grid-cols-[36px_minmax(0,1fr)] gap-3 py-4 sm:gap-4 lg:py-4">
      <span
        aria-hidden="true"
        className={`flex size-9 items-center justify-center border ${
          accent
            ? "border-brand-accent/40 bg-brand-accent/10 text-brand-accent"
            : "border-white/15 bg-white/[0.035] text-[#92d3e4]"
        }`}
      >
        <Icon size={17} strokeWidth={1.65} />
      </span>
      <div className="min-w-0">
        <p className="text-[12px] font-black leading-6 text-white/90 sm:text-[13px]">
          {title}
        </p>
        <p className="mt-0.5 text-[11px] font-normal leading-[1.9] text-white/55 sm:text-[12px]">
          {description}
        </p>
      </div>
    </div>
  );
}

function HighlightedHeading({
  text,
  highlight,
}: {
  text: string;
  highlight?: string;
}) {
  const normalized = highlight?.trim() ?? "";
  const index = normalized ? text.indexOf(normalized) : -1;
  if (index < 0) return <>{text}</>;

  return (
    <>
      {text.slice(0, index)}
      <span className="text-brand-accent">
        {text.slice(index, index + normalized.length)}
      </span>
      {text.slice(index + normalized.length)}
    </>
  );
}

function SectionBackground() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 9% 5%,rgba(35,126,150,.24),transparent 38%),radial-gradient(ellipse at 92% 74%,rgba(11,76,103,.5),transparent 43%),linear-gradient(125deg,#031f2b 0%,#073747 54%,#052735 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,.10) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.055) 1px,transparent 1px)",
          backgroundSize: "86px 86px",
          maskImage: "linear-gradient(to bottom,black,transparent 82%)",
        }}
      />
    </>
  );
}
