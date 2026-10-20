import {
  ArrowLeft,
  ArrowRight,
  ArrowUpLeft,
  ArrowUpRight,
  CheckCircle2,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

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

function normalizePhone(value: string) {
  const ascii = value.replace(/[\u06F0-\u06F9\u0660-\u0669]/g, (digit) => {
    const code = digit.charCodeAt(0);
    return String(code >= 0x06f0 ? code - 0x06f0 : code - 0x0660);
  });
  // Keep an international leading + when present; remove spaces and separators.
  const digits = ascii.replace(/\D/g, "");
  return ascii.trim().startsWith("+") ? `+${digits}` : digits;
}

type ContactKind = "phone" | "mobile" | "email" | "address";

function getContactAction(item: ContactItem): {
  kind: ContactKind;
  href?: string;
  Icon: LucideIcon;
} {
  const value = item.value.trim();
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return { kind: "email", href: `mailto:${value}`, Icon: Mail };
  }

  const phone = normalizePhone(value);
  if (
    /^\+?[\d\s().-]+$/.test(
      value.replace(/[\u06F0-\u06F9\u0660-\u0669]/g, "0"),
    ) &&
    phone.length >= 7
  ) {
    const mobile = /mobile|cell|همراه|موبایل/i.test(item.label);
    return {
      kind: mobile ? "mobile" : "phone",
      href: `tel:${phone}`,
      Icon: mobile ? Smartphone : Phone,
    };
  }

  return { kind: "address", Icon: MapPin };
}

export function ContactPage({ content }: { content: ContactContent }) {
  const isRTL = content.direction === "rtl";
  const DirectionArrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div dir={content.direction} lang={content.locale} className="min-w-0">
      <ContactHero
        content={content.hero}
        direction={content.direction}
        locale={content.locale}
      />

      {/* CONTACT INFORMATION */}
      <section
        aria-labelledby="contact-information-title"
        className="relative isolate overflow-x-clip bg-page py-14 text-ink sm:py-20 lg:py-24"
      >
        <div className="dnh-site-shell relative z-10 min-w-0">
          <div className="grid min-w-0 gap-9 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-14 xl:gap-20">
            <header className="min-w-0 text-start">
              <p className="flex items-center gap-3 text-[12px] font-extrabold tracking-wide text-brand-primary sm:text-[13px]">
                <span
                  aria-hidden="true"
                  className="h-[2px] w-8 shrink-0 bg-brand-accent"
                />
                {content.information.eyebrow}
              </p>
              <h2
                id="contact-information-title"
                className="mt-5 max-w-[18ch] text-pretty text-[clamp(1.7rem,4vw,2.35rem)] font-black leading-[1.5] text-ink sm:mt-6"
              >
                {content.information.title}
              </h2>
              <div className="mt-7 flex gap-3   border border-brand-accent/20 bg-brand-accent/[0.055] p-4 sm:p-5">
                <CheckCircle2
                  aria-hidden="true"
                  size={19}
                  className="mt-1 shrink-0 text-brand-accent"
                />
                <p className="text-start text-[12px] font-medium leading-[2] text-ink-muted sm:text-[13px]">
                  {content.information.notice}
                </p>
              </div>
            </header>

            <div className="min-w-0">
              <dl className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                {content.information.items.map((item, index) => {
                  const { Icon, href, kind } = getContactAction(item);
                  const isLink = Boolean(href);
                  const ValueContent = (
                    <bdi
                      dir={item.direction}
                      className={`inline-block max-w-full [unicode-bidi:isolate] ${
                        kind === "email" ? "break-all" : "break-words"
                      }`}
                    >
                      {item.value}
                    </bdi>
                  );

                  return (
                    <div
                      key={`${item.number}-${item.label}-${index}`}
                      className="group relative flex min-w-0 flex-col  -[22px] border border-line bg-surface-soft/60 p-5 transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-brand-primary/30 hover:bg-page hover:shadow-[0_16px_40px_rgba(0,0,0,0.045)] motion-reduce:transform-none motion-reduce:transition-none sm:min-h-[198px] sm:p-6"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="flex size-11 shrink-0 items-center justify-center  -xl border border-brand-primary/10 bg-brand-primary/[0.075] text-brand-primary transition-colors duration-300 group-hover:bg-brand-primary group-hover:text-white">
                          <Icon
                            aria-hidden="true"
                            size={21}
                            strokeWidth={1.65}
                          />
                        </span>
                      </div>

                      <dt className="mt-5 text-start text-[12px] font-bold text-ink-muted sm:text-[13px]">
                        {item.label}
                      </dt>
                      <dd className="mt-2 min-w-0 text-start text-[15px] font-black leading-[1.8] text-ink sm:text-[16px]">
                        {isLink ? (
                          <a
                            href={href}
                            aria-label={`${item.label}: ${item.value}`}
                            className="inline-flex max-w-full min-w-0 items-center gap-2  -sm text-ink transition-colors duration-200 hover:text-brand-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary"
                          >
                            <span className="min-w-0">{ValueContent}</span>
                            {isRTL ? (
                              <ArrowUpLeft
                                aria-hidden="true"
                                size={16}
                                className="shrink-0 text-brand-accent transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
                              />
                            ) : (
                              <ArrowUpRight
                                aria-hidden="true"
                                size={16}
                                className="shrink-0 text-brand-accent transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              />
                            )}
                          </a>
                        ) : (
                          <span>{ValueContent}</span>
                        )}
                      </dd>
                    </div>
                  );
                })}
              </dl>

              <div className="mt-4 flex items-start gap-3  -2xl border border-line bg-surface-soft px-5 py-5 sm:px-6">
                <span className="flex size-10 shrink-0 items-center justify-center  -xl bg-brand-primary/[0.08] text-brand-primary">
                  <LockKeyhole aria-hidden="true" size={19} strokeWidth={1.7} />
                </span>
                <div className="min-w-0 text-start">
                  <h3 className="text-[13px] font-black text-ink sm:text-[14px]">
                    {content.information.confidentialityTitle}
                  </h3>
                  <p className="mt-1 text-[12px] leading-[1.95] text-ink-muted sm:text-[13px]">
                    {content.information.confidentiality}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT PROCESS */}
      <section
        aria-labelledby="contact-process-title"
        className="border-y border-line bg-surface-soft py-14 text-ink sm:py-20 lg:py-24"
      >
        <div className="dnh-site-shell min-w-0">
          <div className="max-w-[780px] text-start">
            <p className="flex items-center gap-3 text-[12px] font-extrabold text-brand-primary sm:text-[13px]">
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

      <ContactForm content={content.form} isRTL={isRTL} />
    </div>
  );
}
