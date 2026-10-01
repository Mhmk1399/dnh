import type { Metadata } from "next";
import "lenis/dist/lenis.css";
import "./globals.css";
import SiteHeader from "@/components/global/Navbar";
import { estedad } from "@/next-persian-fonts/estedad";
import Footer from "@/components/global/Footer";
import SmoothScroll from "@/components/global/SmoothScroll";

export const metadata: Metadata = {
  title: "DNH",
  description: "مدیریت هوشمند کسب‌وکار",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${estedad.className} ${estedad.variable}`}>
        <SmoothScroll />
        <SiteHeader />

        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
