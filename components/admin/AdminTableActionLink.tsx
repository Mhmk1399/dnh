"use client";

import Link from "next/link";
import type { ReactNode } from "react";

export function AdminTableActionLink({
  href,
  label,
  external = false,
  title,
  ariaLabel,
  className,
  children,
}: {
  href: string;
  label: string;
  external?: boolean;
  title?: string;
  ariaLabel?: string;
  className: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      title={title}
      aria-label={ariaLabel ?? label}
      className={className}
    >
      {children}
    </Link>
  );
}
