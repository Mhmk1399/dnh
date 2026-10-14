import type { Metadata, Viewport } from "next";
import "lenis/dist/lenis.css";
import "./globals.css";
import { iranSans } from "@/next-persian-fonts/IranSans";
import { PublicChrome } from "@/components/global/PublicChrome";
import SmoothScroll from "@/components/global/SmoothScroll";
import { PwaRegister } from "@/components/global/PwaRegister";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { SITE_LANGUAGES } from "@/lib/site-language";
import { getRequestLanguage, getSiteUrl } from "@/lib/site-seo";
import homepageFa from "@/config/DNH_Homepage_Final_FA.json";
import homepageEn from "@/config/DNH_Homepage_Final_EN.json";

const siteDescription =
  "معماری ثروت و مشاوره مالی راهبردی برای تصمیم‌های مالی مهم.";

const siteMetadata: Metadata = {
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

export async function generateMetadata(): Promise<Metadata> {
  const { locale, pathname } = await getRequestLanguage();
  const homepage = locale === "fa" ? homepageFa : homepageEn;
  const isPrivatePage = /^(?:\/admin|\/dashboard|\/test(?:-form)?)(?:\/|$)/.test(pathname);
  return {
    ...siteMetadata,
    metadataBase: new URL(getSiteUrl()),
    description: homepage.seo.description,
    robots: isPrivatePage
      ? { index: false, follow: false }
      : undefined,
    openGraph: {
      type: "website",
      siteName: "DNH",
      locale: locale === "fa" ? "fa_IR" : "en_US",
      alternateLocale: isPrivatePage ? undefined : locale === "fa" ? "en_US" : "fa_IR",
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#167394",
  colorScheme: "light",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { locale } = await getRequestLanguage();
  return (
    <html lang={locale} dir={SITE_LANGUAGES[locale].direction}>
      <body className={`${iranSans.className} ${iranSans.variable}`}>
        <LanguageProvider initialLocale={locale}>
          <SmoothScroll />
          <PwaRegister />
          <PublicChrome>{children}</PublicChrome>
        </LanguageProvider>
      </body>
    </html>
  );
}
