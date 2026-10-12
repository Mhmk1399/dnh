import type { Metadata, Viewport } from "next";
import "lenis/dist/lenis.css";
import "./globals.css";
import { iranSans } from "@/next-persian-fonts/IranSans";
import { PublicChrome } from "@/components/global/PublicChrome";
import SmoothScroll from "@/components/global/SmoothScroll";
import { PwaRegister } from "@/components/global/PwaRegister";

const siteDescription =
  "معماری ثروت و مشاوره مالی راهبردی برای تصمیم‌های مالی مهم.";

export const metadata: Metadata = {
  title: {
    default: "DNH",
    template: "%s | DNH",
  },
  description: siteDescription,
  applicationName: "DNH",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "DNH",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/icons/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/icons/icon-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: ["/favicon.ico"],
  },
  other: {
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#167394",
    "msapplication-config": "none",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#167394",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${iranSans.className} ${iranSans.variable}`}>
        <SmoothScroll />
        <PwaRegister />
        <PublicChrome>{children}</PublicChrome>
      </body>
    </html>
  );
}
