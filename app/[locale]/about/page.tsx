import { localizePageMetadata } from "@/lib/site-seo";
import { normalizeSiteLocale } from "@/lib/site-language";
import { AboutClosingSection } from "@/components/static/About/AboutClosingSection";
import { AboutHero } from "@/components/static/About/AboutHero";
import { AboutOriginSection } from "@/components/static/About/AboutOriginSection";

const page = () => {
  return (
    <div>
      <AboutHero />
      <AboutOriginSection />
      <AboutClosingSection />
    </div>
  );
};

export default page;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return localizePageMetadata({}, "/about", normalizeSiteLocale(locale));
}
