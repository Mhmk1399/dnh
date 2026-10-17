import type { Metadata } from "next";
import { ContactPage, type ContactContent } from "@/components/static/Contact/ContactPage";
import contactFa from "@/config/DNH_Contact_Final_FA.json";
import contactEn from "@/config/DNH_Contact_Final_EN.json";
import { normalizeSiteLocale } from "@/lib/site-language";
import { getLocalizedAlternates, localizePageMetadata } from "@/lib/site-seo";

export default async function ContactRoute({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: routeLocale } = await params;
  const locale = normalizeSiteLocale(routeLocale);
  const content = (locale === "fa" ? contactFa : contactEn) as ContactContent;
  return <ContactPage content={content} />;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: routeLocale } = await params;
  const locale = normalizeSiteLocale(routeLocale);
  const content = locale === "fa" ? contactFa : contactEn;
  return localizePageMetadata({
    title: content.seo.title,
    description: content.seo.description,
    alternates: getLocalizedAlternates("/contact", locale),
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      images: [{ url: "/assets/images/dnh-hero-desktop.png", width: 1600, height: 1000, alt: content.hero.imageAlt }],
    },
  }, "/contact", locale);
}
