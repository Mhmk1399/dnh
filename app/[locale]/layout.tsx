import { notFound } from "next/navigation";
import { isSiteLocale } from "@/lib/site-language";
import homepageFa from "@/config/DNH_Homepage_Final_FA.json";
import homepageEn from "@/config/DNH_Homepage_Final_EN.json";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isSiteLocale(locale)) notFound();
  const homepage = locale === "fa" ? homepageFa : homepageEn;
  return {
    description: homepage.seo.description,
    openGraph: {
      type: "website" as const,
      siteName: "DNH",
      locale: locale === "fa" ? "fa_IR" : "en_US",
      alternateLocale: locale === "fa" ? "en_US" : "fa_IR",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isSiteLocale(locale)) notFound();
  return children;
}
