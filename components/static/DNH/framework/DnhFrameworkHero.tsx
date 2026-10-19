"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { DnhPageHero } from "@/components/ui/DnhPageHero";
import frameworkEn from "@/config/DNH_Framework_Final_EN.json";
import frameworkFa from "@/config/DNH_Framework_Final_FA.json";

type FrameworkHeroContent = {
  id: "dnh-framework-hero";
  type: "hero";
  eyebrow: string;
  heading: string;
  heading_highlight?: string;
  paragraphs: Array<{ id: string; text: string }>;
  ctas: Array<{ id: string; label: string; type: "primary" | "secondary"; href: string }>;
  media?: { src: string; mobile_src?: string; alt: string };
};

export function FrameworkHero() {
  const { locale, direction, languageTag } = useLanguage();
  const source = locale === "en" ? frameworkEn : frameworkFa;
  const content = source.sections.find(
    (section: { id?: string; type?: string }) =>
      section.id === "dnh-framework-hero" && section.type === "hero",
  ) as FrameworkHeroContent | undefined;

  if (!content?.media?.src) return null;

  return (
    <DnhPageHero
      id={content.id}
      direction={direction}
      lang={languageTag}
      eyebrow={content.eyebrow}
      heading={content.heading}
      headingHighlight={
        content.heading_highlight ??
        (locale === "fa"
          ? "یک مسیر روشن برای تصمیم‌گیری"
          : "a clear path for decision-making")
      }
      paragraphs={content.paragraphs.slice(0, -1)}
      ctas={content.ctas}
      media={{
        src: content.media.src,
        mobileSrc: content.media.mobile_src,
        alt: content.media.alt,
      }}
    />
  );
}
