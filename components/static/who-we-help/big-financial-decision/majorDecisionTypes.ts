export type MajorDecisionCta = { label: string; type: string };

export type MajorDecisionEntry = {
  number?: number;
  title: string;
  description: string;
  english_label?: string;
};

export type MajorDecisionSection = {
  order: number;
  id: string;
  type: string;
  eyebrow: string;
  english_label: string;
  heading: string;
  paragraphs?: string[];
  intro?: string;
  items?: MajorDecisionEntry[];
  questions?: string[];
  steps?: MajorDecisionEntry[];
  routes?: MajorDecisionEntry[];
  checklist?: string[];
  closing?: string;
  closing_paragraphs?: string[];
  ctas?: MajorDecisionCta[];
};

export type MajorDecisionDocument = {
  page: string;
  brand: string;
  locale: string;
  direction: "rtl" | "ltr";
  title: string;
  english_title: string;
  section_count: number;
  sections: MajorDecisionSection[];
};
