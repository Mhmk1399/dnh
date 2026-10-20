import { DnhPageHero } from "@/components/ui/DnhPageHero";
import type { SiteDirection } from "@/lib/site-language";
import type { AssessmentHeroContent } from "./assessmentTypes";

export function FinancialDecisionAssessmentHero({ content, direction, lang }: { content: AssessmentHeroContent; direction: SiteDirection; lang: string }) {
  return (
    <DnhPageHero
      id={content.id}
      direction={direction}
      lang={lang}
      eyebrow={content.eyebrow}
      heading={content.heading}
      headingHighlight={content.heading_highlight}
      paragraphs={content.paragraphs}
      ctas={content.ctas}
      media={{
        src: content.media.src,
        mobileSrc: content.media.mobile_src,
        alt: content.media.alt,
        objectPosition: content.media.object_position,
      }}
    />
  );
}
