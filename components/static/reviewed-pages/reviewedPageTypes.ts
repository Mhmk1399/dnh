export type ReviewedPageDirection = "rtl" | "ltr";

export type ReviewedPageCta = {
  id: string;
  label: string;
  href: string;
  type: "primary" | "secondary";
};

export type ReviewedPageMedia = {
  src: string;
  mobile_src?: string;
  alt: string;
  object_position?: string;
  mobile_object_position?: string;
};

export type ReviewedPageCard = {
  id: string;
  title: string;
  description?: string;
  number?: string;
  label?: string;
  bullets?: string[];
  href?: string;
  link_label?: string;
};

export type ReviewedPageGroup = {
  id: string;
  title: string;
  label?: string;
  description?: string;
  bullets?: string[];
};

export type ReviewedPageSectionType =
  | "hero"
  | "cards"
  | "comparison"
  | "diagram"
  | "demo"
  | "process"
  | "boundary"
  | "final_cta";

export type ReviewedPageSection = {
  order: number;
  id: string;
  type: ReviewedPageSectionType;
  eyebrow: string;
  heading: string;
  heading_highlight?: string;
  intro?: string;
  paragraphs?: string[];
  items?: ReviewedPageCard[];
  groups?: ReviewedPageGroup[];
  closing?: string;
  note?: string;
  badge?: string;
  ctas?: ReviewedPageCta[];
  media?: ReviewedPageMedia;
  theme?: "light" | "soft" | "dark";
};

export type ReviewedPageDocument = {
  page: string;
  route: string;
  brand: string;
  locale: "fa" | "en";
  direction: ReviewedPageDirection;
  title: string;
  english_title: string;
  seo: {
    title: string;
    description: string;
  };
  sections: ReviewedPageSection[];
};
