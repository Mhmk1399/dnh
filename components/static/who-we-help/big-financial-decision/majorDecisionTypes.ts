export type MajorDecisionCta = {
  id: string;
  label: string;
  type: "primary" | "secondary";
  href: string;
};

export type MajorDecisionEntry = {
  id: string;
  title: string;
  description: string;
  question?: string;
  subtitle?: string;
  number?: string;
  icon?: string;
  href?: string;
};

export type MajorDecisionGroup = {
  id: string;
  title: string;
  subtitle: string;
  items: string[];
};

export type MajorDecisionFormContent = {
  title: string;
  intro: string;
  required_label: string;
  optional_label: string;
  sensitive_note: string;
  fields: Record<
    "name" | "contact" | "behalf" | "topic" | "horizon" | "urgency" | "description",
    string
  >;
  placeholders: Record<"name" | "contact" | "topic" | "description", string>;
  behalf_options: string[];
  horizon_options: string[];
  urgency_options: string[];
  submit_label: string;
  pending_label: string;
  success_message: string;
  error_message: string;
  privacy_label: string;
  privacy_href: string;
};

export type MajorDecisionSection = {
  order: number;
  id: string;
  type: string;
  eyebrow: string;
  heading: string;
  heading_highlight?: string;
  paragraphs?: string[];
  items?: MajorDecisionEntry[];
  steps?: MajorDecisionEntry[];
  groups?: MajorDecisionGroup[];
  closing?: string;
  note?: string;
  result_label?: string;
  result?: string;
  ctas?: MajorDecisionCta[];
  form?: MajorDecisionFormContent;
  media?: { src: string; alt: string };
};

export type MajorDecisionDocument = {
  page: string;
  brand: string;
  locale: "fa" | "en";
  direction: "rtl" | "ltr";
  title: string;
  english_title: string;
  section_count: number;
  sections: MajorDecisionSection[];
};
