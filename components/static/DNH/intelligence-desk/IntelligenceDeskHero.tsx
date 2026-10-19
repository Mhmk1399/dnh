"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { DnhPageHero } from "@/components/ui/DnhPageHero";
import intelligenceEn from "@/config/DNH_Intelligence_Desk_Final_EN.json";
import intelligenceFa from "@/config/DNH_Intelligence_Desk_Final_FA.json";

type IntelligenceHeroContent = {
  id: "dnh-intelligence-desk-hero";
  type: "hero";
  eyebrow: string;
  heading: string;
  heading_highlight?: string;
  paragraphs: Array<{ id: string; text: string }>;
  ctas: Array<{ id: string; label: string; type: "primary" | "secondary"; href: string }>;
  media?: { src: string; mobile_src?: string; alt: string };
};

export function IntelligenceDeskHero() {
  const { locale, direction, languageTag } = useLanguage();
  const source = locale === "en" ? intelligenceEn : intelligenceFa;
  const content = source.sections.find(
    (section: { id?: string; type?: string }) =>
      section.id === "dnh-intelligence-desk-hero" && section.type === "hero",
  ) as IntelligenceHeroContent | undefined;

  if (!content?.media?.src) return null;

  return (
    <DnhPageHero
      id={content.id}
      direction={direction}
      lang={languageTag}
      eyebrow={content.eyebrow}
      heading={content.heading}
      headingHighlight={content.heading_highlight}
      paragraphs={content.paragraphs.filter(
        (paragraph) => paragraph.id !== "interpretation-thesis",
      )}
      ctas={content.ctas}
      media={{
        src: content.media.src,
        mobileSrc: content.media.mobile_src,
        alt: content.media.alt,
      }}
    />
  );
}
