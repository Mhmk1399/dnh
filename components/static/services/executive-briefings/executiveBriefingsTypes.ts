export type ExecutiveBriefingCta = {
  id: string;
  label: string;
  type: "primary" | "secondary";
  href: string;
};

export type ExecutiveBriefingEntry = {
  id: string;
  number: string;
  title: string;
  description: string;
  subtitle?: string;
  icon?: string;
};

export type ExecutiveBriefingExample = {
  label: string;
  title: string;
  status: string;
  sections?: Array<{
    title: string;
    description?: string;
    items?: string[];
  }>;
  fields?: Array<{ label: string; value: string }>;
  closing?: string;
  note: string;
};

export type ExecutiveBriefingForm = {
  title: string;
  intro: string;
  required_label: string;
  fields: Record<"contact" | "role" | "urgency" | "description", string>;
  placeholders: Record<"contact" | "role" | "description", string>;
  urgency_options: string[];
  sensitive_note: string;
  submit_label: string;
  pending_label: string;
  success_message: string;
  error_message: string;
  privacy_label: string;
  privacy_href: string;
};

export type ExecutiveBriefingSection = {
  order: number;
  id: string;
  type: string;
  eyebrow: string;
  heading: string;
  heading_highlight?: string;
  paragraphs?: string[];
  items?: ExecutiveBriefingEntry[];
  steps?: ExecutiveBriefingEntry[];
  closing?: string;
  note?: string;
  distinction?: string;
  service_link?: { label: string; href: string };
  brief?: ExecutiveBriefingExample;
  ctas?: ExecutiveBriefingCta[];
  form?: ExecutiveBriefingForm;
  media?: { src: string; alt: string };
};

export type ExecutiveBriefingsDocument = {
  page: string;
  brand: string;
  locale: "fa" | "en";
  direction: "rtl" | "ltr";
  title: string;
  english_title: string;
  section_count: number;
  sections: ExecutiveBriefingSection[];
};
