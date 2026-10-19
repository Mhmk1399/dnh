"use client";

import { DnhPageHero } from "@/components/ui/DnhPageHero";

import { resolveCtaHref } from "./ServiceDetailShared";
import type { ServiceSectionViewProps } from "./types";

function getHeadingHighlight(
  heading: string,
  explicitHighlight: string | undefined,
  isRTL: boolean,
) {
  if (explicitHighlight) return explicitHighlight;
  const words = heading.trim().split(/\s+/);
  const count = Math.min(isRTL ? 4 : 3, words.length);
  return words.slice(-count).join(" ");
}

export function ServiceHeroSection({
  section,
  direction,
  isRTL,
  media,
  ctaTargets,
}: ServiceSectionViewProps) {
  if (!media?.src) return null;

  const paragraphs = [section.intro, ...section.body]
    .filter((value): value is string => Boolean(value))
    .map((text, index) => ({
      id: `${section.id}-paragraph-${index + 1}`,
      text,
    }));

  return (
    <DnhPageHero
      id={section.id}
      direction={direction}
      eyebrow={section.eyebrow}
      heading={section.heading}
      headingHighlight={getHeadingHighlight(
        section.heading,
        section.headingHighlight,
        isRTL,
      )}
      paragraphs={paragraphs}
      ctas={section.ctas.map((cta, index) => ({
        id: `${section.id}-cta-${index + 1}`,
        label: cta.label,
        type: cta.type,
        href: resolveCtaHref(cta, ctaTargets),
      }))}
      media={{
        src: media.src,
        mobileSrc: media.mobileSrc,
        alt: media.alt,
        objectPosition: media.objectPosition,
      }}
    />
  );
}
