import Link, { type LinkProps } from "next/link";

import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import type { LucideIcon } from "lucide-react";

export type ActionButtonVariant = "primary" | "secondary" | "assessment";
export type ActionButtonSize = "sm" | "md" | "lg";
export type ActionButtonIconPosition = "start" | "end";
export type ActionButtonContentAlignment = "center" | "between";

type SharedActionButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: ActionButtonVariant;
  size?: ActionButtonSize;
  icon?: LucideIcon;
  iconPosition?: ActionButtonIconPosition;
  contentAlignment?: ActionButtonContentAlignment;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
};

type ActionButtonLinkProps = SharedActionButtonProps &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "children" | "className" | "href"
  > & {
    href: LinkProps["href"];
    replace?: LinkProps["replace"];
    scroll?: LinkProps["scroll"];
    prefetch?: LinkProps["prefetch"];
  };

type ActionButtonNativeProps = SharedActionButtonProps &
  Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "children" | "className" | "disabled"
  > & {
    href?: never;
  };

export type ActionButtonProps =
  | ActionButtonLinkProps
  | ActionButtonNativeProps;

const variantClasses: Record<ActionButtonVariant, string> = {
  primary: `
    gap-[10px]
    bg-brand-primary
    font-bold
    text-[var(--dnh-text-on-brand)]
    shadow-[0_14px_34px_color-mix(in_srgb,var(--dnh-primary)_24%,transparent)]
    hover:-translate-y-px
    hover:bg-brand-secondary
    hover:shadow-[0_17px_38px_color-mix(in_srgb,var(--dnh-primary)_29%,transparent)]
    active:translate-y-0
  `,
  secondary: `
    gap-[10px]
    border
    border-line
    bg-page/70
    font-bold
    text-ink
    shadow-[0_8px_24px_color-mix(in_srgb,var(--dnh-primary)_5%,transparent)]
    hover:border-line-strong
    hover:bg-page
    hover:text-brand-primary
  `,
  assessment: `
    bg-brand-primary
    font-black
    text-[var(--dnh-text-on-brand)]
    shadow-[0_14px_32px_color-mix(in_srgb,var(--dnh-primary)_23%,transparent)]
    hover:-translate-y-[2px]
    hover:bg-brand-secondary
    hover:shadow-[0_18px_40px_color-mix(in_srgb,var(--dnh-primary)_29%,transparent)]
    active:translate-y-[1px]
  `,
};

const sizeClasses: Record<
  ActionButtonVariant,
  Record<ActionButtonSize, string>
> = {
  primary: {
    sm: "min-h-[42px] px-4 py-2 text-[10px]",
    md: "min-h-[52px] px-6 py-3 text-[12px]",
    lg: `
      min-h-[54px]
      px-6
      py-3
      text-[13px]
      lg:min-h-[56px]
      lg:px-7
      lg:text-[14px]
    `,
  },
  secondary: {
    sm: "min-h-[42px] px-4 py-2 text-[10px]",
    md: "min-h-[52px] px-6 py-3 text-[12px]",
    lg: `
      min-h-[52px]
      px-6
      py-3
      text-[13px]
      lg:min-h-[56px]
      lg:text-[14px]
    `,
  },
  assessment: {
    sm: "min-h-[48px] px-[60px] py-2 text-[11px]",
    md: "min-h-[54px] px-[64px] py-3 text-[12px]",
    lg: "min-h-[58px] px-[72px] py-3 text-[12px]",
  },
};

/**
 * CTA مشترک سایت. شعاع، اندازه آیکن و رفتارهای تعاملی عمداً در این
 * کامپوننت ثابت هستند تا همه دکمه‌ها ظاهر یکدستی داشته باشند.
 */
export function ActionButton(props: ActionButtonProps) {
  const {
    children,
    className = "",
    variant = "primary",
    size = "md",
    icon: Icon,
    iconPosition = "end",
    contentAlignment = "center",
    fullWidth = false,
    disabled = false,
    loading = false,
  } = props;

  const unavailable = disabled || loading;

  const classes = `
    group/action
    relative
    inline-flex
    items-center
    overflow-hidden
    outline-none
    touch-manipulation
    transition-[transform,background-color,border-color,color,box-shadow]
    duration-[400ms]
    ease-[cubic-bezier(.22,1,.36,1)]
    focus-visible:ring-4
    focus-visible:ring-focus/25
    active:scale-[0.985]
    motion-reduce:transform-none
    motion-reduce:transition-none
    ${variantClasses[variant]}
    ${sizeClasses[variant][size]}
    ${contentAlignment === "between" ? "justify-between" : "justify-center"}
    ${fullWidth ? "w-full" : ""}
    ${unavailable ? "pointer-events-none opacity-50" : ""}
    ${className}
  `;

  const icon = Icon ? (
    <ActionIcon icon={Icon} variant={variant} loading={loading} />
  ) : null;

  const content = (
    <>
      {variant !== "assessment" && iconPosition === "start" ? icon : null}

      <span className="relative z-10">{children}</span>

      {variant !== "assessment" && iconPosition === "end" ? icon : null}
      {variant === "assessment" ? icon : null}

      {variant !== "secondary" ? <ButtonShine variant={variant} /> : null}
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const linkProps = props as ActionButtonLinkProps;
    const { href } = linkProps;
    const anchorProps = omitKeys(linkProps, [
      "children",
      "className",
      "variant",
      "size",
      "icon",
      "iconPosition",
      "contentAlignment",
      "fullWidth",
      "disabled",
      "loading",
      "href",
    ] as const);

    return (
      <Link
        {...anchorProps}
        href={href}
        className={classes}
        aria-disabled={unavailable || undefined}
        aria-busy={loading || undefined}
        tabIndex={unavailable ? -1 : anchorProps.tabIndex}
      >
        {content}
      </Link>
    );
  }

  const nativeProps = props as ActionButtonNativeProps;
  const type = nativeProps.type ?? "button";
  const buttonProps = omitKeys(nativeProps, [
    "children",
    "className",
    "variant",
    "size",
    "icon",
    "iconPosition",
    "contentAlignment",
    "fullWidth",
    "disabled",
    "loading",
    "href",
    "type",
  ] as const);

  return (
    <button
      {...buttonProps}
      type={type}
      className={classes}
      disabled={unavailable}
      aria-busy={loading || undefined}
    >
      {content}
    </button>
  );
}

function omitKeys<T extends object, K extends keyof T>(
  value: T,
  keys: readonly K[],
): Omit<T, K> {
  const result: Partial<T> = { ...value };

  for (const key of keys) {
    delete result[key];
  }

  return result as Omit<T, K>;
}

function ActionIcon({
  icon: Icon,
  variant,
  loading,
}: {
  icon: LucideIcon;
  variant: ActionButtonVariant;
  loading: boolean;
}) {
  if (variant === "assessment") {
    return (
      <span
        aria-hidden="true"
        className="
          absolute
          left-2
          top-1/2
          z-10
          flex
          h-[42px]
          w-[42px]
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          bg-brand-accent
          text-white
          shadow-[0_8px_20px_color-mix(in_srgb,var(--dnh-accent)_30%,transparent)]
          transition-[transform,box-shadow]
          duration-[450ms]
          ease-[cubic-bezier(.22,1,.36,1)]
          group-hover/action:-translate-x-[2px]
          group-hover/action:-translate-y-1/2
          group-hover/action:scale-[1.04]
          group-active/action:-translate-y-1/2
          group-active/action:scale-[0.9]
          motion-reduce:transition-none
        "
      >
        {loading ? (
          <LoadingIndicator />
        ) : (
          <Icon
            strokeWidth={1.8}
            className="
              h-4
              w-4
              transition-transform
              duration-[400ms]
              group-hover/action:-translate-x-[2px]
            "
          />
        )}
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`
        relative
        z-10
        flex
        h-8
        w-8
        shrink-0
        items-center
        justify-center
        rounded-full
        transition-all
        duration-300
        ${
          variant === "primary"
            ? `
              bg-page/10
              group-hover/action:-translate-x-[2px]
              group-hover/action:bg-page/15
            `
            : `
              bg-surface-soft
              text-brand-primary
              group-hover/action:bg-brand-primary
              group-hover/action:text-[var(--dnh-text-on-brand)]
            `
        }
      `}
    >
      {loading ? (
        <LoadingIndicator />
      ) : (
        <Icon className="h-4 w-4" strokeWidth={1.75} />
      )}
    </span>
  );
}

function ButtonShine({ variant }: { variant: ActionButtonVariant }) {
  return (
    <span
      aria-hidden="true"
      className={`
        pointer-events-none
        absolute
        rotate-[21deg]
        bg-page/[0.13]
        blur-[9px]
        transition-transform
        duration-700
        ease-[cubic-bezier(.22,1,.36,1)]
        motion-reduce:hidden
        ${
          variant === "assessment"
            ? `
              -left-[80px]
              -top-[30px]
              h-[120px]
              w-[34px]
              group-hover/action:translate-x-[380px]
            `
            : `
              -left-[75px]
              -top-[30px]
              h-[110px]
              w-8
              group-hover/action:translate-x-[300px]
            `
        }
      `}
    />
  );
}

function LoadingIndicator() {
  return (
    <span
      className="
        h-4
        w-4
        animate-spin
        rounded-full
        border-2
        border-current/30
        border-t-current
        motion-reduce:animate-none
      "
    />
  );
}
