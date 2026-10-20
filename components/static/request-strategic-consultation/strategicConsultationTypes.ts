import type { SiteDirection } from "@/lib/site-language";

export type ConsultationCta = {
  id: string;
  label: string;
  href: string;
  type: "primary" | "secondary";
};

export type ConsultationHeading = {
  eyebrow: string;
  heading: string;
  heading_highlight: string;
  intro: string;
};

export type ConsultationLink = {
  label: string;
  href: string;
};

export type ConsultationHeroContent = {
  id: string;
  eyebrow: string;
  heading: string;
  heading_highlight: string;
  paragraphs: Array<{ id: string; text: string }>;
  ctas: ConsultationCta[];
  media: {
    src: string;
    mobile_src?: string;
    alt: string;
    object_position?: string;
  };
};

export type ConsultationFitContent = ConsultationHeading & {
  id: string;
  alternative: {
    title: string;
    description: string;
    cta: ConsultationLink;
  };
  register: {
    eyebrow: string;
    title: string;
    items: Array<{
      id: string;
      number: string;
      icon: "focus" | "branch" | "conversation";
      title: string;
      description: string;
    }>;
    note: string;
  };
  next: ConsultationLink;
};

export type ConsultationPreparationContent = ConsultationHeading & {
  id: string;
  register: {
    eyebrow: string;
    title: string;
    required: {
      title: string;
      description: string;
      items: Array<{ id: string; label: string }>;
    };
    not_required: {
      title: string;
      description: string;
      items: Array<{ id: string; label: string }>;
    };
    note: string;
  };
  next: ConsultationLink;
};

export type ConsultationProcessContent = ConsultationHeading & {
  id: string;
  columns: {
    number: string;
    status: string;
    purpose: string;
  };
  stages: Array<{
    id: string;
    number: string;
    label: string;
    description: string;
    active?: boolean;
  }>;
  active_label: string;
  note: string;
  next: ConsultationLink;
};

export type ConsultationFormField = {
  id: string;
  kind: "input" | "textarea" | "select";
  name: string;
  label: string;
  placeholder?: string;
  hint?: string;
  type?: "text" | "email" | "tel";
  input_mode?: "text" | "email" | "tel";
  auto_complete?: string;
  dir?: "ltr" | "rtl";
  required?: boolean;
  min_length?: number;
  max_length?: number;
  options?: Array<{ value: string; label: string }>;
};

export type ConsultationRequestContent = ConsultationHeading & {
  id: string;
  index: { number: string; label: string };
  notes: Array<{
    id: string;
    icon: "document" | "review" | "privacy";
    title: string;
    description: string;
    accent?: boolean;
  }>;
  form: {
    eyebrow: string;
    title: string;
    code: string;
    aria_label: string;
    groups: Array<{
      id: string;
      number: string;
      title: string;
      description: string;
      fields: ConsultationFormField[];
    }>;
    pending_label: string;
    submit_label: string;
    submit_note: string;
    privacy_note: string;
    reference_label: string;
  };
};

export type ConsultationConfidentialityContent = ConsultationHeading & {
  id: string;
  steps: Array<{
    id: string;
    number: string;
    icon: "review" | "fit" | "route";
    title: string;
    description: string;
  }>;
  privacy: {
    title: string;
    description: string;
    label: string;
  };
  final: {
    title: string;
    description: string;
    ctas: ConsultationCta[];
  };
};

export type StrategicConsultationPageContent = {
  locale: "fa" | "en";
  lang: string;
  direction: SiteDirection;
  sections: {
    hero: ConsultationHeroContent;
    fit: ConsultationFitContent;
    preparation: ConsultationPreparationContent;
    process: ConsultationProcessContent;
    request: ConsultationRequestContent;
    confidentiality: ConsultationConfidentialityContent;
  };
};
