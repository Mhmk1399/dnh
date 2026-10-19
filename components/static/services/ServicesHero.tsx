"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { DnhPageHero } from "@/components/ui/DnhPageHero";
import servicesEn from "@/config/DNH_Services_Overview_Final_EN.json";
import servicesFa from "@/config/DNH_Services_Overview_Final_FA.json";

type ServicesHeroContent = {
  id: "dnh-advisory-services-hero";
  type: "hero";
  eyebrow: string;
  heading: string;
  heading_highlight?: string;
  paragraphs: string[];
  ctas: Array<{ id: string; label: string; type: "primary" | "secondary"; href: string }>;
  media?: { src: string; mobile_src?: string; alt: string };
};

export function ServicesHero() {
  const { locale, direction, languageTag } = useLanguage();
  const source = locale === "en" ? servicesEn : servicesFa;
  const content = source.sections.find(
    (section) =>
      section.id === "dnh-advisory-services-hero" && section.type === "hero",
  ) as ServicesHeroContent | undefined;

  if (!content?.media?.src) return null;

  return (
    <DnhPageHero
      id={content.id}
      direction={direction}
      lang={languageTag}
      eyebrow={content.eyebrow}
      heading={content.heading}
      headingHighlight={content.heading_highlight}
      paragraphs={content.paragraphs.map((text, index) => ({
        id: `${content.id}-paragraph-${index + 1}`,
        text,
      }))}
      ctas={content.ctas}
      media={{
        src: content.media.src,
        mobileSrc: content.media.mobile_src,
        alt: content.media.alt,
      }}
    />
  );
}
