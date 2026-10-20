import { DnhPageHero } from "@/components/ui/DnhPageHero";

export type ContactHeroContent = {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  qualification: string;
  imageAlt: string;
  formCta: string;
};

export function ContactHero({
  content,
  direction,
  locale,
}: {
  content: ContactHeroContent;
  direction: "rtl" | "ltr";
  locale: string;
}) {
  const heading = `${content.title} ${content.highlight}`.trim();

  return (
    <DnhPageHero
      id="contact-hero"
      direction={direction}  
      lang={locale === "fa" ? "fa-IR" : "en"}
      eyebrow={content.eyebrow}
      heading={heading}
      headingHighlight={content.highlight}
      paragraphs={[
        { id: "contact-description", text: content.description },
        { id: "contact-qualification", text: content.qualification },
      ]}
      ctas={[
        {
          id: "contact-form-cta",
          label: content.formCta,
          type: "primary",
          href: "#contact-form",
        },
      ]}
      media={{
        src: "/assets/images/research-and-case-studies.webp",
        mobileSrc: "/assets/images/research-and-case-studies.webp",
        alt: content.imageAlt,
        objectPosition: "29% center",
        mobileObjectPosition: "center",
      }}
    />
  );
}
