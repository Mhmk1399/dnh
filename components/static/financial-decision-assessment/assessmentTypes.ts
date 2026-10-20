import type { SiteDirection } from "@/lib/site-language";

export type AssessmentLink = { label: string; href: string };
export type AssessmentCta = AssessmentLink & {
  id: string;
  type: "primary" | "secondary";
};

export type AssessmentHeading = {
  id: string;
  eyebrow: string;
  heading: string;
  heading_highlight: string;
  intro: string;
};

export type AssessmentHeroContent = Omit<AssessmentHeading, "intro"> & {
  paragraphs: Array<{ id: string; text: string }>;
  ctas: AssessmentCta[];
  media: {
    src: string;
    mobile_src?: string;
    alt: string;
    object_position?: string;
  };
};

export type WhyAssessmentContent = AssessmentHeading & {
  statement: {
    eyebrow: string;
    heading: string;
    heading_highlight: string;
    description: string;
    comparison_before: string;
    comparison_after: string;
  };
  reasons: Array<{
    id: string;
    icon: "question" | "urgency" | "route";
    eyebrow: string;
    title: string;
    description: string;
  }>;
  outcome: {
    eyebrow: string;
    title: string;
    description: string;
    cta: AssessmentLink;
  };
  privacy_note: string;
};

export type AssessmentProcessContent = AssessmentHeading & {
  start_cta: AssessmentLink;
  start_note: string;
  panel: {
    eyebrow: string;
    heading: string;
    heading_highlight: string;
    intro: string;
    phases: Array<{ id: string; label: string; code: string; tone: "gold" | "blue" }>;
    note: string;
  };
  steps: Array<{
    id: string;
    number: string;
    phase: string;
    title: string;
    description: string;
    outcome: string;
    tone: "qualification" | "review" | "decision";
  }>;
  outcome_label: string;
  footer: string;
  cta: AssessmentLink;
};

export type AssessmentFormContent = AssessmentHeading & {
  progress_label: string;
  progress_title: string;
  progress_description: string;
  privacy_title: string;
  privacy_description: string;
  more_label: string;
  privacy_link: AssessmentLink;
  after_link: AssessmentLink;
  steps: Array<{ id: string; title: string; eyebrow: string }>;
  step_counter: string;
  previous_label: string;
  next_label: string;
  submit_label: string;
  profile: {
    title: string;
    description: string;
    options: Array<{ id: string; value: string; icon: "individual" | "family" | "business" | "company"; title: string; description: string }>;
  };
  decision: {
    title: string;
    description: string;
    topics: Array<{ id: string; value: string; label: string }>;
    situation_label: string;
    situation_helper: string;
    situation_placeholder: string;
    size_label: string;
    size_helper: string;
    size_placeholder: string;
    sizes: Array<{ id: string; value: string; label: string }>;
  };
  timing: {
    title: string;
    description: string;
    horizon_label: string;
    horizon_helper: string;
    horizons: Array<{ id: string; value: string; label: string }>;
    urgency_label: string;
    urgency_helper: string;
    urgencies: Array<{ id: string; value: string; title: string; description: string }>;
  };
  contact: {
    title: string;
    description: string;
    name_label: string;
    email_label: string;
    method_label: string;
    methods: Array<{ id: string; value: string; label: string }>;
    summary_label: string;
    summary_helper: string;
    summary_placeholder: string;
    privacy_note: string;
  };
  success: {
    eyebrow: string;
    title: string;
    description: string;
    after_cta: AssessmentLink;
    privacy_cta: AssessmentLink;
  };
};

export type AssessmentPrivacyContent = AssessmentHeading & {
  principle: string;
  needed: {
    eyebrow: string;
    title: string;
    items: Array<{ id: string; icon: string; title: string; description: string }>;
  };
  not_needed: {
    eyebrow: string;
    title: string;
    items: Array<{ id: string; icon: string; title: string; description: string }>;
  };
  boundary: string;
  trust_points: Array<{ id: string; title: string; text: string }>;
  final: {
    title: string;
    cta: AssessmentLink;
    next: AssessmentLink;
  };
};

export type AfterSubmissionContent = AssessmentHeading & {
  board: {
    eyebrow: string;
    title: string;
    note: string;
    steps: Array<{ id: string; number: string; code: string; icon: "received" | "review" | "route"; title: string; description: string }>;
    paths_eyebrow: string;
    paths_title: string;
    paths: Array<{ id: string; code: string; icon: "consultation" | "briefing"; tone: "teal" | "orange"; title: string; description: string }>;
    caveat: string;
    principle_eyebrow: string;
    principle: string;
  };
  reassurance: Array<{ id: string; icon: "received" | "review" | "privacy"; title: string; text: string }>;
  return_prompt: string;
  return_link: AssessmentLink;
  question_cta: AssessmentLink;
};

export type AssessmentContactContent = AssessmentHeading & {
  code: string;
  action_eyebrow: string;
  action_title: string;
  ctas: AssessmentCta[];
  contact_link: AssessmentLink;
  closing: string;
  signature: string;
};

export type FinancialDecisionAssessmentPageContent = {
  locale: "fa" | "en";
  lang: string;
  direction: SiteDirection;
  sections: {
    hero: AssessmentHeroContent;
    why: WhyAssessmentContent;
    process: AssessmentProcessContent;
    form: AssessmentFormContent;
    privacy: AssessmentPrivacyContent;
    after_submission: AfterSubmissionContent;
    contact: AssessmentContactContent;
  };
};
