"use client";

import { usePathname } from "next/navigation";

import Footer from "@/components/global/Footer";
import { Navbar } from "@/components/global/Navbar";
import { FloatingContact } from "@/components/ui/FloatingContact";
import { useLanguage } from "@/components/providers/LanguageProvider";
import shell from "@/config/site-shell.json";

export function PublicChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { locale } = useLanguage();
  const isAuthRoute = /^\/(?:fa|en)\/(?:login|register)\/?$/.test(pathname);

  if (isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <a href="#main-content" className="dnh-skip-link">{shell[locale].skipToContent}</a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>{children}</main>
      {pathname !== `/${locale}/contact` && <FloatingContact />}
      <Footer />
    </>
  );
}
