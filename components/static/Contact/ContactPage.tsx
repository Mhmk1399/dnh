import { LockKeyhole } from "lucide-react";

import {
  ContactForm,
  type ContactFormContent,
} from "@/components/forms/ContactForm";
import { ContactHero, type ContactHeroContent } from "./ContactHero";

type ContactItem = {
  number: string;
  label: string;
  value: string;
  direction: "ltr" | "auto";
};

type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export type ContactContent = {
  locale: string;
  direction: "rtl" | "ltr";
  seo: { title: string; description: string };
  hero: ContactHeroContent;
  information: {
    eyebrow: string;
    title: string;
    notice: string;
    items: ContactItem[];
    confidentialityTitle: string;
    confidentiality: string;
  };
  process: {
    eyebrow: string;
    title: string;
    stepLabel: string;
    steps: ProcessStep[];
  };
  form: ContactFormContent;
  closing: { title: string; description: string };
};

export function ContactPage({ content }: { content: ContactContent }) {
  const isRTL = content.direction === "rtl";

  return (
    <div dir={content.direction} lang={content.locale} className="min-w-0">
      <ContactHero
        content={content.hero}
        direction={content.direction}
        locale={content.locale}
      />

      <ContactForm content={content.form} isRTL={isRTL} />

    

      {/* CONTACT PROCESS */}
      <section
        aria-labelledby="contact-process-title"
        className="border-y border-line bg-surface-soft py-14 text-ink sm:py-20 lg:py-24"
      >
        <div className="dnh-site-shell min-w-0">
          <div className="max-w-[780px] text-start">
            <p className="flex items-center gap-3 text-[12px] font-extrabold text-brand-accent sm:text-[13px]">
              <span
                aria-hidden="true"
                className="h-[2px] w-8 bg-brand-accent"
              />
              {content.process.eyebrow}
            </p>
            <h2
              id="contact-process-title"
              className="mt-4 text-pretty text-[clamp(1.7rem,3.3vw,2.2rem)] font-black leading-[1.5] text-ink"
            >
              {content.process.title}
            </h2>
          </div>

          <ol className="mt-9 grid min-w-0 gap-3 md:grid-cols-3 md:gap-4 lg:mt-11">
            {content.process.steps.map((step) => (
              <li
                key={step.number}
                className="relative min-w-0  -[22px] border border-line bg-page p-5 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-brand-primary/25 motion-reduce:transform-none sm:p-7"
              >
                <div
                  aria-hidden="true"
                  className="mt-5 h-[2px] w-10 bg-brand-primary/25"
                />
                <h3 className="mt-5 text-start text-[17px] font-black leading-[1.6] text-ink sm:text-[18px]">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[40ch] text-start text-[13px] leading-[1.9] text-ink-muted">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

    </div>
  );
}
