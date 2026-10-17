import { ContactForm, type ContactFormContent } from "@/components/forms/ContactForm";
import { ContactHero, type ContactHeroContent } from "./ContactHero";

type ContactItem = { number: string; label: string; value: string; direction: "ltr" | "auto" };
type ProcessStep = { number: string; title: string; description: string };

export type ContactContent = {
  locale: string;
  direction: "rtl" | "ltr";
  seo: { title: string; description: string };
  hero: ContactHeroContent;
  information: { eyebrow: string; title: string; notice: string; items: ContactItem[]; confidentialityTitle: string; confidentiality: string };
  process: { eyebrow: string; title: string; stepLabel: string; steps: ProcessStep[] };
  form: ContactFormContent;
  closing: { title: string; description: string };
};

export function ContactPage({ content }: { content: ContactContent }) {
  const isRTL = content.direction === "rtl";
  return (
    <div dir={content.direction}>
      <ContactHero content={content.hero} />
      <section aria-labelledby="contact-information-title" className="bg-white py-16 sm:py-20 lg:py-28">
        <div className="dnh-site-shell mx-auto w-full max-w-[1536px] px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <header>
              <p className="flex items-center gap-3 text-[13px] font-black text-brand-primary"><span className="h-px w-9 bg-brand-accent" aria-hidden="true" />{content.information.eyebrow}</p>
              <h2 id="contact-information-title" className="mt-5 max-w-[16ch] text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.55] text-ink">{content.information.title}</h2>
              <div className="mt-7 border-s-[3px] border-brand-accent bg-[#fff8ef] px-5 py-4 text-[13px] font-bold leading-7 text-[#725226]">{content.information.notice}</div>
            </header>
            <div>
              <dl className="border-t border-line">
                {content.information.items.map((item) => (
                  <div key={item.label} className="grid gap-2 border-b border-line py-5 sm:grid-cols-[0.55fr_1.45fr] sm:items-baseline sm:gap-8">
                    <dt className="text-[12px] font-bold text-brand-primary"><bdi>{item.number}</bdi> / {item.label}</dt>
                    <dd dir={item.direction} className="text-start text-[16px] font-black leading-8 text-ink sm:text-[18px]"><bdi>{item.value}</bdi></dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 bg-[#062833] px-6 py-7 text-white sm:px-8">
                <h3 className="text-[17px] font-black">{content.information.confidentialityTitle}</h3>
                <p className="mt-3 max-w-[70ch] text-[13px] leading-7 text-[#b9d0d5]">{content.information.confidentiality}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="contact-process-title" className="border-y border-line bg-[#edf5f5] py-16 sm:py-20">
        <div className="dnh-site-shell mx-auto w-full max-w-[1536px] px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <p className="text-[12px] font-black text-brand-primary">{content.process.eyebrow}</p>
          <h2 id="contact-process-title" className="mt-3 text-[clamp(1.8rem,3vw,2.8rem)] font-black leading-[1.55] text-ink">{content.process.title}</h2>
          <ol className="mt-10 grid border-t border-brand-primary/25 md:grid-cols-3">
            {content.process.steps.map((step) => (
              <li key={step.number} className="relative border-b border-brand-primary/20 py-7 md:border-b-0 md:border-e md:px-7 first:ps-0 last:border-e-0">
                <bdi dir={isRTL ? "rtl" : "ltr"} className={`text-[11px] font-black text-brand-accent ${isRTL ? "" : "tracking-[0.2em]"}`}>{content.process.stepLabel} {step.number}</bdi>
                <h3 className="mt-3 text-[18px] font-black text-ink">{step.title}</h3>
                <p className="mt-3 max-w-[36ch] text-[13px] leading-7 text-ink-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <ContactForm content={content.form} isRTL={isRTL} />
      <section className="bg-[#062833] py-10 text-white">
        <div className="dnh-site-shell mx-auto flex w-full max-w-[1536px] flex-col gap-3 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12 xl:px-16 2xl:px-20">
          <h2 className="text-[20px] font-black sm:text-[24px]">{content.closing.title}</h2>
          <p className="max-w-[62ch] text-[13px] leading-7 text-[#b9d0d5]">{content.closing.description}</p>
        </div>
      </section>
    </div>
  );
}
