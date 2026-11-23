import type { Metadata, Viewport } from "next";
import "lenis/dist/lenis.css";
import "./globals.css";
import { iranSans } from "@/next-persian-fonts/IranSans";
import SmoothScroll from "@/components/global/SmoothScroll";
import { PwaRegister } from "@/components/global/PwaRegister";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { SiteToaster } from "@/components/ui/SiteToaster";
import { SITE_LANGUAGES } from "@/lib/site-language";
import {
  DEFAULT_SOCIAL_IMAGE,
  getRequestLanguage,
  getSiteUrl,
} from "@/lib/site-seo";
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
  creator: "DNH",
  publisher: "DNH",
  category: "finance",
  referrer: "origin-when-cross-origin",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "DNH",
    statusBarStyle: "default",
  },
  formatDetection: {
    address: false,
    email: false,
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
    "msapplication-TileColor": "#14181B",
    "msapplication-config": "none",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const { locale, pathname } = await getRequestLanguage();
  const homepage = locale === "fa" ? homepageFa : homepageEn;
  const isPrivatePage =
    /^(?:\/admin|\/dashboard)(?:\/|$)/.test(pathname);
  return {
    ...siteMetadata,
    metadataBase: new URL(getSiteUrl()),
    description: homepage.seo.description,
    robots: isPrivatePage
      ? { index: false, follow: false, nocache: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type: "website",
      siteName: "DNH",
      title: homepage.seo.title,
      description: homepage.seo.description,
      images: [
        {
          url: DEFAULT_SOCIAL_IMAGE,
          width: 1200,
          height: 630,
          alt: homepage.seo.title,
        },
      ],
      locale: locale === "fa" ? "fa_IR" : "en_US",
      alternateLocale: isPrivatePage
        ? undefined
        : locale === "fa"
          ? "en_US"
          : "fa_IR",
    },
    twitter: {
      card: "summary_large_image",
      title: homepage.seo.title,
      description: homepage.seo.description,
      images: [DEFAULT_SOCIAL_IMAGE],
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#14181B",
  colorScheme: "light",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { locale, pathname } = await getRequestLanguage();
  const siteUrl = getSiteUrl();
  const isPrivatePage =
    /^(?:\/admin|\/dashboard)(?:\/|$)/.test(pathname);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "DNH",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/assets/images/LOGO.svg`,
          width: 2172,
          height: 724,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "DNH",
        url: siteUrl,
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: ["fa-IR", "en-US"],
      },
    ],
  };

  return (
    <html lang={locale} dir={SITE_LANGUAGES[locale].direction}>
      <body className={`${iranSans.className} ${iranSans.variable}`}>
        {!isPrivatePage ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
            }}
          />
        ) : null}
        <LanguageProvider initialLocale={locale}>
          <SmoothScroll />
          <PwaRegister />
          {children}
          <SiteToaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
