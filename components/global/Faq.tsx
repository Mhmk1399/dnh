"use client";

import { useId, useState } from "react";
import {
  BarChart3,
  Layers3,
  Plus,
  UserRound,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

export type FaqIconName = "layers" | "users" | "user" | "chart";

type FaqProps = {
  question: string;
  answer: string;
  icon: FaqIconName;
};

const icons: Record<FaqIconName, LucideIcon> = {
  layers: Layers3,
  users: UsersRound,
  user: UserRound,
  chart: BarChart3,
};

export default function Faq({ question, answer, icon }: FaqProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const Icon = icons[icon];
  const triggerId = `faq-trigger-${id}`;
  const panelId = `faq-panel-${id}`;

  return (
    <article
      className={`
        group/faq
        relative
        overflow-hidden
        rounded-[18px]
        border
        bg-page/[0.72]
        shadow-[0_8px_25px_color-mix(in_srgb,var(--dnh-primary)_5%,transparent)]
        transition-[border-color,background-color,transform]
        duration-[450ms]
        ease-[cubic-bezier(.22,1,.36,1)]
        hover:-translate-y-px
        hover:border-line-strong/30
        hover:bg-page/[0.92]
        active:scale-[0.995]
        motion-reduce:transform-none
        motion-reduce:transition-none
        ${
          open
            ? `
              border-line-strong/25
              bg-page/[0.90]
            `
            : "border-line"
        }
      `}
    >
      <button
        id={triggerId}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
        className="
          relative
          z-10
          flex
          min-h-[62px]
          w-full
          touch-manipulation
          select-none
          items-center
          gap-[10px]
          px-[11px]
          py-[11px]
          text-right
          outline-none
          focus-visible:ring-4
          focus-visible:ring-inset
          focus-visible:ring-focus/20
          sm:min-h-[66px]
          sm:px-[10px]
        "
      >
        <span
          aria-hidden="true"
          className={`
            flex
            h-[43px]
            w-[43px]
            shrink-0
            items-center
            justify-center
            rounded-full
            shadow-[0_5px_16px_color-mix(in_srgb,var(--dnh-primary)_6%,transparent)]
            transition-[transform,background-color,color]
            duration-[450ms]
            ease-[cubic-bezier(.22,1,.36,1)]
            group-hover/faq:scale-[1.035]
            group-active/faq:scale-[0.9]
            motion-reduce:transform-none
            motion-reduce:transition-none
            sm:h-[47px]
            sm:w-[47px]
            ${
              open
                ? "bg-brand-primary text-[var(--dnh-text-on-brand)]"
                : "bg-surface-soft text-brand-primary"
            }
          `}
        >
          <Icon
            strokeWidth={1.6}
            className="h-[18px] w-[18px] sm:h-5 sm:w-5"
          />
        </span>

        <span
          className="
            flex-1
            text-[10px]
            font-black
            leading-[1.9]
            text-ink
            transition-colors
            duration-300
            group-hover/faq:text-brand-primary
            sm:text-[11px]
            lg:text-[12px]
          "
        >
          {question}
        </span>

        <span
          aria-hidden="true"
          className={`
            relative
            flex
            h-[38px]
            w-[38px]
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            bg-page
            text-brand-primary
            shadow-[0_5px_16px_color-mix(in_srgb,var(--dnh-primary)_5%,transparent)]
            transition-[transform,background-color,color,border-color]
            duration-[450ms]
            ease-[cubic-bezier(.22,1,.36,1)]
            group-hover/faq:border-line-strong/30
            group-active/faq:scale-[0.88]
            motion-reduce:transform-none
            motion-reduce:transition-none
            sm:h-[42px]
            sm:w-[42px]
            ${
              open
                ? `
                  rotate-45
                  border-brand-primary
                  bg-brand-primary
                  text-[var(--dnh-text-on-brand)]
                `
                : "border-line"
            }
          `}
        >
          <Plus strokeWidth={1.7} className="h-[15px] w-[15px]" />
        </span>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!open}
        className={`
          relative
          z-10
          grid
          transition-[grid-template-rows,opacity]
          duration-500
          ease-[cubic-bezier(.22,1,.36,1)]
          motion-reduce:transition-none
          ${
            open
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }
        `}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className="
              mr-[62px]
              border-t
              border-line
              px-1
              pb-4
              pt-3
              sm:mr-[67px]
              sm:pb-5
            "
          >
            <p
              className="
                max-w-[540px]
                text-[11px]
                font-medium
                leading-[2.1]
                text-ink-muted
                sm:text-[10px]
                lg:text-[10.5px]
              "
            >
              {answer}
            </p>
          </div>
        </div>
      </div>

    </article>
  );
}
