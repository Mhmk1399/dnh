export type ServiceSectionOrder =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12;

export type ServicePageSource = {
  page: string;
  brand?: string;
  locale?: string;
  direction?: "rtl" | "ltr" | string;
  title: string;
  english_title?: string;
  section_count?: number;
  sections: unknown[];
};

export type ServiceMedia = {
  src: string;
  mobileSrc?: string;
  alt: string;
  sizes?: string;
  objectPosition?: string;
};

export type ServiceMediaMap = Partial<Record<ServiceSectionOrder, ServiceMedia>>;

export type ServiceCta = {
  label: string;
  type: "primary" | "secondary";
  href?: string;
};

export type ServiceCtaTargets = {
  primary?: string;
  secondary?: string;
  byLabel?: Record<string, string>;
};

export type NormalizedEntry = {
  title: string;
  description?: string;
  englishLabel?: string;
  number?: number;
  code?: string;
};

export type NormalizedServiceSection = {
  order: ServiceSectionOrder;
  id: string;
  type: string;
  eyebrow: string;
  englishLabel?: string;
  heading: string;
  headingHighlight?: string;
  intro?: string;
  body: string[];
  entries: NormalizedEntry[];
  checklist: string[];
  closing: string[];
  frameworkLogic?: string;
  ctas: ServiceCta[];
};

export type ServiceSectionViewProps = {
  section: NormalizedServiceSection;
  direction: "rtl" | "ltr";
  isRTL: boolean;
  media?: ServiceMedia;
  ctaTargets?: ServiceCtaTargets;
};
