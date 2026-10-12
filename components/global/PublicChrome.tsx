"use client";

import { usePathname } from "next/navigation";

import Footer from "@/components/global/Footer";
import { Navbar } from "@/components/global/Navbar";
import { FloatingContact } from "@/components/ui/FloatingContact";

export function PublicChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <FloatingContact
        phone="+98XXXXXXXXXX"
        phoneDisplay="Û°Û²Û± XXXX XXXX"
        whatsappNumber="+989XXXXXXXXX"
        email="info@your-domain.com"
      />
      <main>{children}</main>
      <Footer />
    </>
  );
}
