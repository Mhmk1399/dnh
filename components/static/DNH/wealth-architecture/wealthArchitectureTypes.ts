import type { SiteDirection, SiteLocale } from "@/lib/site-language";

export type WealthCta = {
  id: string;
  label: string;
  href: string;
  type: "primary" | "secondary";
};

export type WealthItem = {
  id: string;
  title: string;
  description: string;
  icon?: string;
  english_label?: string;
};

export type WealthParagraphBlock = {
  id: string;
  kind: "paragraph";
  text: string;
};

export type WealthItemsBlock = {
  id: string;
  kind: "items";
  items: WealthItem[];
};

export type WealthQuestionsBlock = {
  id: string;
  kind: "questions";
  items: Array<{ id: string; text: string }>;
};

export type WealthBlock =
  | WealthParagraphBlock
  | WealthItemsBlock
  | WealthQuestionsBlock;

export type WealthMedia = {
  src: string;
  mobile_src?: string;
  alt: string;
  width: number;
  height: number;
  placement?: "hero" | "side" | "strip" | string;
};

export type WealthArchitectureSection = {
  id: string;
  render_order: number;
  source_section_number: number;
  layout: string;
  eyebrow: string;
  english_label?: string;
  heading: string;
  heading_highlight?: string;
  blocks: WealthBlock[];
  ctas: WealthCta[];
  media?: WealthMedia;
  source_markdown?: string;
};

export type WealthArchitecturePageData = {
  page: string;
  route: string;
  brand: string;
  locale: string;
  direction: SiteDirection;
  title: string;
  english_title?: string;
  section_count: number;
  seo: {
    title: string;
    description: string;
  };
  sections: WealthArchitectureSection[];
};

export type WealthSectionProps = {
  section: WealthArchitectureSection;
  locale: SiteLocale;
  direction: SiteDirection;
};
