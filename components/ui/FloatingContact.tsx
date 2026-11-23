"use client";

import { MessageCircleMore } from "lucide-react";
import { useSyncExternalStore } from "react";
import { LocalizedLink, useLanguage } from "@/components/providers/LanguageProvider";
import shell from "@/config/site-shell.json";

function subscribe(listener: () => void) {
  window.addEventListener("scroll", listener, { passive: true });
  return () => window.removeEventListener("scroll", listener);
}

const pastFirstScreenOffset = () => window.scrollY >= 100;
const initiallyHidden = () => false;

export function FloatingContact() {
  const visible = useSyncExternalStore(subscribe, pastFirstScreenOffset, initiallyHidden);
  const { locale } = useLanguage();
  if (!visible) return null;

  const label = shell[locale].navigation["/contact"];
  return (
    <LocalizedLink
      href="/contact#contact-form"
      aria-label={label}
      className="dnh-contact-shortcut fixed z-40 inline-flex min-h-11 min-w-11 items-center justify-center gap-2 border border-white/20 bg-brand-secondary p-2.5 text-sm font-bold text-white shadow-md hover:bg-brand-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus sm:px-4"
    >
      <MessageCircleMore size={20} aria-hidden="true" />
      <span className="hidden sm:inline">{label}</span>
    </LocalizedLink>
  );
}
