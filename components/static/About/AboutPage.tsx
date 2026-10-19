import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CircleDollarSign,
  Users,
  X,
} from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";
import type { SiteLocale } from "@/lib/site-language";

type CTA = { label: string; type: string };
type NamedDescription = {
  title: string;
  description: string;
  english_label?: string;
  paragraphs?: string[];
};
type Step = {
  order?: number;
  number?: number;
  title: string;
  english_label?: string;
  description: string;
};
type Pillar = {
  code: string;
  title: string;
  fa_title: string;
  description: string;
};

export type AboutSection = {
  order: number;
  id: string;
  type: string;
  eyebrow: string;
  english_label: string;
  heading: string;
  paragraphs?: string[];
  items?: string[];
  questions?: string[];
  closing?: string;
  closing_paragraphs?: string[];
  domains?: NamedDescription[];
  intro?: string;
  pillars?: Pillar[];
  steps?: Step[];
  audiences?: NamedDescription[];
  components?: NamedDescription[];
  statements?: string[];
  topics?: string[];
  ctas?: CTA[];
};

type AboutContent = {
  locale: string;
  direction: "rtl" | "ltr";
  title: string;
  sections: AboutSection[];
};

const imageAlt = {
  fa: {
    hero: "دکتر نسیم محمدحسنی در فضای حرفه‌ای DNH",
    architecture: "تصویری از هوشمندی مالی و ساختار یکپارچه تصمیم",
    scenario: "تصویری از تحلیل سناریو، ریسک و افق زمانی",
    portfolio: "تصویری از تحلیل ساختار پرتفوی و تصمیم مالی",
    ecosystem: "تصویری از اکوسیستم یکپارچه ثروت و سرمایه",
    founder: "دکتر نسیم محمدحسنی، بنیان‌گذار DNH",
  },
  en: {
    hero: "Dr. Nasim Mohammadhassani in the DNH professional environment",
    architecture: "Financial intelligence and integrated decision structure",
    scenario: "Scenario, risk and time-horizon analysis",
    portfolio: "Portfolio structure and financial decision analysis",
    ecosystem: "Integrated wealth and capital ecosystem",
    founder: "Dr. Nasim Mohammadhassani, founder of DNH",
  },
} as const;

const sectionRoutes: Record<string, string[]> = {
  "about-dnh-hero": ["/dnh/framework", "/services"],
  "what-is-dnh": ["/dnh/framework"],
  "why-dnh-exists": ["/dnh/framework"],
  "two-core-advisory-domains": ["/services"],
  "the-dnh-framework": ["/dnh/framework"],
  "how-dnh-thinks": ["/dnh/framework"],
  "who-dnh-is-built-for": ["/financial-decision-assessment"],
  "the-dnh-ecosystem": ["/services"],
  "from-problem-recognition-to-decision": ["/financial-decision-assessment"],
  "dr-nasim-and-dnh": ["/#about-dr-nasim"],
  "bring-structure-to-the-decision": [
    "/financial-decision-assessment",
    "/services",
  ],
};

const audienceIcons = [
  CircleDollarSign,
  Users,
  BarChart3,
  Building2,
  BriefcaseBusiness,
];

const accentTailWords: Record<string, { rtl: number; ltr: number }> = {
  "about-dnh-hero": { rtl: 2, ltr: 2 },
  "what-is-dnh": { rtl: 3, ltr: 3 },
  "why-dnh-exists": { rtl: 2, ltr: 2 },
  "what-dnh-is-not": { rtl: 3, ltr: 3 },
  "two-core-advisory-domains": { rtl: 3, ltr: 3 },
  "the-dnh-framework": { rtl: 3, ltr: 3 },
  "how-dnh-thinks": { rtl: 3, ltr: 3 },
  "who-dnh-is-built-for": { rtl: 3, ltr: 3 },
  "the-dnh-ecosystem": { rtl: 3, ltr: 3 },
  "from-problem-recognition-to-decision": { rtl: 3, ltr: 3 },
  "dr-nasim-and-dnh": { rtl: 2, ltr: 2 },
  "bring-structure-to-the-decision": { rtl: 3, ltr: 3 },
};

function HeadingAccent({ section }: { section: AboutSection }) {
  const words = section.heading.trim().split(/\s+/);
  const direction = /[\u0600-\u06ff]/.test(section.heading) ? "rtl" : "ltr";
  const count = Math.min(
    accentTailWords[section.id]?.[direction] ?? 0,
    words.length,
  );
  if (!count) return section.heading;
  const boundary = words.length - count;
  return (
    <>
      {words.slice(0, boundary).join(" ")}
      {boundary ? " " : ""}
      <span className="text-brand-accent">
        {words.slice(boundary).join(" ")}
      </span>
    </>
  );
}

function Eyebrow({
  section,
  dark = false,
}: {
  section: AboutSection;
  dark?: boolean;
}) {
  return (
    <div>
      <div
        className={`flex items-center gap-3 text-[13px] font-bold leading-7 ${dark ? "text-[#b4dae3]" : "text-brand-primary"}`}
      >
        <span aria-hidden="true" className="h-0.5 w-9 bg-brand-accent" />
        <span>{section.eyebrow}</span>
      </div>
    </div>
  );
}

function Heading({
  children,
  id,
  dark = false,
}: {
  children: React.ReactNode;
  id?: string;
  dark?: boolean;
}) {
  return (
    <h2
      id={id}
      className={`mt-4 max-w-[22ch] text-pretty text-[clamp(2rem,5vw,3.9rem)] font-black leading-[1.55] tracking-normal ${dark ? "text-white" : "text-ink"}`}
    >
      {children}
    </h2>
  );
}

function Copy({
  children,
  dark = false,
  className = "",
}: {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <p
      className={`text-[14px] font-normal leading-[2.05] sm:text-[15px] ${dark ? "text-[#bbd0d5]" : "text-ink-muted"} ${className}`}
    >
      {children}
    </p>
  );
}

function SectionActions({
  section,
  dark = false,
  isRTL,
}: {
  section: AboutSection;
  dark?: boolean;
  isRTL: boolean;
}) {
  if (!section.ctas?.length) return null;
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      {section.ctas.map((cta, index) => (
        <ActionButton
          key={`${section.id}-${index}`}
          href={sectionRoutes[section.id]?.[index] ?? "/contact"}
          variant={index === 0 ? "primary" : "secondary"}
          size="lg"
          shape="square"
          icon={Arrow}
          className={
            dark && index > 0
              ? "border-white/25 bg-transparent text-white hover:bg-white hover:text-ink"
              : ""
          }
        >
          {cta.label}
        </ActionButton>
      ))}
    </div>
  );
}

function Hero({
  section,
  locale,
  isRTL,
}: {
  section: AboutSection;
  locale: SiteLocale;
  isRTL: boolean;
}) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="isolate overflow-hidden bg-[#032f3f] text-white"
    >
      <div className="relative min-h-[940px] sm:min-h-[1020px] lg:min-h-[890px]">
        <picture className="absolute inset-x-0 top-0 h-[540px] sm:h-[610px] lg:inset-0 lg:h-auto">
          <source
            media="(max-width: 1023px)"
            srcSet="/assets/images/about-hero-mobile.png"
          />
          <Image
            src="/assets/images/about-hero-desktop.png"
            alt={imageAlt[locale].hero}
            fill
            priority
            sizes="100vw"
            className="object-cover object-top lg:object-center"
          />
        </picture>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[540px] bg-gradient-to-b from-transparent via-transparent to-[#032f3f] sm:h-[610px] lg:inset-0 lg:h-auto lg:bg-[linear-gradient(90deg,rgba(3,47,63,.03),rgba(3,47,63,.5)_44%,rgba(3,47,63,.98)_100%)]"
        />
        <div className="dnh-site-shell relative z-10 flex min-h-[940px] items-end pt-[540px] sm:min-h-[1020px] sm:pt-[610px] lg:min-h-[890px] lg:items-center lg:pt-36">
          <div className="w-full pb-14 text-start lg:ml-auto lg:mr-0 lg:w-[56%] lg:pb-16">
            <Eyebrow section={section} dark />
            <h1
              id={`${section.id}-title`}
              className="mt-5 max-w-[16ch] text-pretty text-[clamp(2.4rem,6vw,5.1rem)] font-black leading-[1.45] tracking-normal lg:text-[clamp(3rem,5vw,4.65rem)]"
            >
              <HeadingAccent section={section} />
            </h1>
            <div className="mt-6 max-w-[720px] space-y-3">
              {section.paragraphs?.slice(0, 2).map((paragraph) => (
                <Copy key={paragraph} dark>
                  {paragraph}
                </Copy>
              ))}
            </div>
            <SectionActions section={section} dark isRTL={isRTL} />
          </div>
        </div>
      </div>
      <div className="border-t border-white/15 bg-[#022936]">
        <div className="dnh-site-shell grid gap-4 py-10 sm:grid-cols-2 sm:gap-x-10 sm:py-12 lg:grid-cols-3">
          {section.paragraphs?.slice(2).map((paragraph, index) => (
            <p
              key={paragraph}
              className={`${index === 3 ? "border-s-2 border-brand-accent ps-5" : "border-t border-white/15 pt-4"} text-[13px] leading-[2.05] text-white/72`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function Definition({
  section,
  locale,
  isRTL,
}: {
  section: AboutSection;
  locale: SiteLocale;
  isRTL: boolean;
}) {
  const question = section.paragraphs?.[3];
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="overflow-hidden border-b border-line bg-page py-16 sm:py-20 lg:py-28"
    >
      <div className="dnh-site-shell grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
        <div>
          <Eyebrow section={section} />
          <Heading id={`${section.id}-title`}>
            <HeadingAccent section={section} />
          </Heading>
          <div className="mt-5 space-y-3">
            {section.paragraphs?.slice(0, 3).map((p) => (
              <Copy key={p}>{p}</Copy>
            ))}
          </div>
          {question ? (
            <blockquote className="my-7 border-s-[3px] border-brand-accent py-2 ps-5 text-[20px] font-black leading-[1.9] text-brand-primary sm:text-[23px]">
              {question}
            </blockquote>
          ) : null}
          <div className="space-y-3">
            {section.paragraphs?.slice(4, 5).map((p) => (
              <Copy key={p}>{p}</Copy>
            ))}
          </div>
          <SectionActions section={section} isRTL={isRTL} />
        </div>
        <div>
          <figure className="relative aspect-[4/5] overflow-hidden border border-line sm:aspect-[5/4] lg:aspect-[.84/1]">
            <Image
              src="/assets/images/about/wealth-architecture-overview.png"
              alt={imageAlt[locale].architecture}
              fill
              sizes="(max-width: 1024px) 100vw, 44vw"
              className="object-cover"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}

function Purpose({
  section,
  locale,
  isRTL,
}: {
  section: AboutSection;
  locale: SiteLocale;
  isRTL: boolean;
}) {
  const flow =
    locale === "fa"
      ? [
          ["DATA", "داده"],
          ["ANALYSIS", "تحلیل"],
          ["INSIGHT", "بینش"],
          ["SCENARIO", "سناریو"],
          ["DECISION", "تصمیم"],
        ]
      : [
          ["DATA", "Data"],
          ["ANALYSIS", "Analysis"],
          ["INSIGHT", "Insight"],
          ["SCENARIO", "Scenario"],
          ["DECISION", "Decision"],
        ];
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="overflow-hidden bg-[#032f3f] py-16 text-white sm:py-20 lg:py-28"
    >
      <div className="dnh-site-shell  gap-12  lg:gap-16">
        <div>
          <Eyebrow section={section} dark />
          <Heading id={`${section.id}-title`} dark>
            <HeadingAccent section={section} />
          </Heading>
          <div className="mt-5 space-y-3">
            {section.paragraphs?.map((p) => (
              <Copy key={p} dark>
                {p}
              </Copy>
            ))}
          </div>
          <div className="mt-8 grid border-s border-t border-white/15 sm:grid-cols-2">
            {section.questions?.map((question) => (
              <div
                key={question}
                className="border-b border-e border-white/15 p-5 text-[13px] font-bold leading-7"
              >
                <span
                  aria-hidden="true"
                  className="mb-3 flex size-8 items-center justify-center bg-[#55c2d9]/10 text-[#83d2e1]"
                >
                  ?
                </span>
                {question}
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-2">
            {section.closing_paragraphs?.map((p) => (
              <Copy key={p} dark>
                {p}
              </Copy>
            ))}
          </div>
          <SectionActions section={section} dark isRTL={isRTL} />
        </div>
      </div>
      <div
        className="dnh-site-shell mt-10 grid border border-white/15 sm:grid-cols-5"
        dir="ltr"
      >
        {flow.map(([en, label]) => (
          <div
            key={en}
            className="relative border-b border-white/15 p-4 text-center text-[13px] font-black last:border-b-0 sm:border-b-0 sm:border-e sm:last:border-e-0"
            dir={locale === "fa" ? "rtl" : "ltr"}
          >
            <bdi
              dir="ltr"
              className="block text-[9px] tracking-[.1em] text-[#7fb1bc]"
            >
              {en}
            </bdi>
            {label}
          </div>
        ))}
      </div>
    </section>
  );
}

function Boundaries({ section }: { section: AboutSection }) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="border-b border-line bg-surface-soft py-16 sm:py-20 lg:py-28"
    >
      <div className="dnh-site-shell grid gap-12 lg:grid-cols-[.88fr_1.12fr] lg:gap-16">
        <div>
          <Eyebrow section={section} />
          <Heading id={`${section.id}-title`}>
            <HeadingAccent section={section} />
          </Heading>
          <div className="mt-5 space-y-3">
            {[
              ...(section.paragraphs ?? []),
              ...(section.closing_paragraphs ?? []),
            ].map((p) => (
              <Copy key={p}>{p}</Copy>
            ))}
          </div>
        </div>
        <ul className="border-t border-line">
          {section.items?.map((item) => (
            <li
              key={item}
              className="grid grid-cols-[38px_1fr] gap-3 border-b border-line py-5 text-[14px] font-bold leading-7"
            >
              <X
                aria-hidden="true"
                className="mt-1 text-brand-accent"
                size={20}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Domains({
  section,
  isRTL,
}: {
  section: AboutSection;
  isRTL: boolean;
}) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="border-b border-line bg-page py-16 sm:py-20 lg:py-28"
    >
      <div className="dnh-site-shell">
        <Eyebrow section={section} />
        <Heading id={`${section.id}-title`}>
          <HeadingAccent section={section} />
        </Heading>
        <div className="mt-5 max-w-[900px] space-y-3">
          {section.closing_paragraphs?.map((p) => (
            <Copy key={p}>{p}</Copy>
          ))}
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {section.domains?.map((domain, index) => (
            <article key={domain.title} className="border border-line bg-page">
              <div className="p-6 sm:p-8">
                <h3 className="text-[24px] font-black leading-[1.7]">
                  {domain.title}
                </h3>

                <div className="mt-4 space-y-3">
                  {domain.paragraphs?.map((p) => (
                    <Copy key={p}>{p}</Copy>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        <SectionActions section={section} isRTL={isRTL} />
      </div>
    </section>
  );
}

function Framework({
  section,
  isRTL,
}: {
  section: AboutSection;
  isRTL: boolean;
}) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="border-b border-line bg-surface-soft py-16 [background-image:linear-gradient(rgba(22,115,148,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(22,115,148,.06)_1px,transparent_1px)] [background-size:72px_72px] sm:py-20 lg:py-28"
    >
      <div className="dnh-site-shell">
        <header className="mx-auto max-w-[1000px] text-center">
          <div className="inline-block text-start">
            <Eyebrow section={section} />
          </div>
          <Heading id={`${section.id}-title`}>
            <HeadingAccent section={section} />
          </Heading>
          {section.intro ? <Copy className="mt-4">{section.intro}</Copy> : null}
        </header>
        <div
          className="mt-10 grid border border-line bg-page md:grid-cols-3"
          dir="ltr"
        >
          {section.pillars?.map((pillar) => (
            <article
              key={pillar.code}
              className="border-b border-line p-6 text-start last:border-b-0 md:border-b-0 md:border-e md:last:border-e-0"
              dir={isRTL ? "rtl" : "ltr"}
            >
              <div className="border-b-4 border-brand-accent pb-4 text-[74px] font-black leading-none text-brand-primary">
                {pillar.code}
              </div>
              <h3 className="mt-5 text-[22px] font-black leading-8">
                {pillar.fa_title}
              </h3>

              <Copy className="mt-4">{pillar.description}</Copy>
            </article>
          ))}
        </div>
        {section.closing ? (
          <p className="mt-7 border border-line bg-surface-soft p-5 text-[12px] leading-7 text-ink-muted">
            {section.closing}
          </p>
        ) : null}
        <div className="flex justify-center">
          <SectionActions section={section} isRTL={isRTL} />
        </div>
      </div>
    </section>
  );
}

function Thinking({
  section,
  locale,
  isRTL,
}: {
  section: AboutSection;
  locale: SiteLocale;
  isRTL: boolean;
}) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="overflow-hidden bg-[#032f3f] py-16 text-white sm:py-20 lg:py-28"
    >
      <div className="dnh-site-shell  lg:gap-16">
        <div>
          <Eyebrow section={section} dark />
          <Heading id={`${section.id}-title`} dark>
            <HeadingAccent section={section} />
          </Heading>
          <ol className="mt-7 border-t grid grid-cols-2 border-white/15">
            {section.steps?.map((step, index) => (
              <li
                key={step.title}
                className="grid grid-cols-2 gap-3 border-b border-white/15 py-4"
              >
                <div>
                  <h3 className="text-[16px] font-bold">{step.title} </h3>
                  <Copy dark className="mt-1 text-[12px]">
                    {step.description}
                  </Copy>
                </div>
              </li>
            ))}
          </ol>

          <SectionActions section={section} dark isRTL={isRTL} />
        </div>
      </div>
    </section>
  );
}

function Audience({
  section,
  isRTL,
}: {
  section: AboutSection;
  isRTL: boolean;
}) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="border-b border-line bg-page py-16 sm:py-20 lg:py-28"
    >
      <div className="dnh-site-shell">
        <Eyebrow section={section} />
        <Heading id={`${section.id}-title`}>
          <HeadingAccent section={section} />
        </Heading>
        <div className="mt-5 max-w-[900px] space-y-3">
          {section.closing_paragraphs?.map((p) => (
            <Copy key={p}>{p}</Copy>
          ))}
        </div>
        <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {section.audiences?.map((audience, index) => {
            const Icon = audienceIcons[index] ?? Users;
            return (
              <article
                key={audience.title}
                className="relative min-h-[210px] bg-page p-6 transition-colors hover:bg-surface-soft"
              >
                <span className="mb-5 flex size-11 items-center justify-center bg-surface-soft text-brand-primary">
                  <Icon size={21} strokeWidth={1.6} />
                </span>
                <h3 className="text-[19px] font-black leading-8">
                  {audience.title}
                </h3>
                <Copy className="mt-2 text-[13px]">{audience.description}</Copy>
              </article>
            );
          })}
        </div>
        <SectionActions section={section} isRTL={isRTL} />
      </div>
    </section>
  );
}

function Ecosystem({
  section,
  locale,
  isRTL,
}: {
  section: AboutSection;
  locale: SiteLocale;
  isRTL: boolean;
}) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="border-b border-line bg-surface-soft py-16 sm:py-20 lg:py-28"
    >
      <div className="dnh-site-shell grid items-start gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
        <div>
          <Eyebrow section={section} />
          <Heading id={`${section.id}-title`}>
            <HeadingAccent section={section} />
          </Heading>
          {section.closing ? (
            <Copy className="mt-5">{section.closing}</Copy>
          ) : null}

          <SectionActions section={section} isRTL={isRTL} />
        </div>
        <div className="grid border-s border-t border-line sm:grid-cols-2">
          {section.components?.map((item) => (
            <article
              key={item.title}
              className="border-b border-e border-line bg-page p-5"
            >
              <h3
                dir="ltr"
                className="text-start text-[14px] font-black leading-7 text-brand-primary"
              >
                {item.title}
              </h3>
              <Copy className="mt-2 text-[12px]">{item.description}</Copy>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Engagement({
  section,
  isRTL,
}: {
  section: AboutSection;
  isRTL: boolean;
}) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="overflow-hidden bg-[#032f3f] py-16 text-white sm:py-20 lg:py-28"
    >
      <div className="dnh-site-shell">
        <Eyebrow section={section} dark />
        <Heading id={`${section.id}-title`} dark>
          <HeadingAccent section={section} />
        </Heading>
        <ol
          className="mt-10 grid border-s border-t border-white/15 sm:grid-cols-2 lg:grid-cols-7"
          dir="ltr"
        >
          {section.steps?.map((step, index) => (
            <li
              key={step.title}
              className="min-h-[190px] border-b border-e border-white/15 p-5 text-start"
              dir={isRTL ? "rtl" : "ltr"}
            >
              <h3 className="mt-5 text-[14px] font-black leading-7">
                {step.title}
              </h3>
              <Copy dark className="mt-2 text-[11px]">
                {step.description}
              </Copy>
            </li>
          ))}
        </ol>

        <SectionActions section={section} dark isRTL={isRTL} />
      </div>
    </section>
  );
}

function Founder({
  section,
  locale,
  isRTL,
}: {
  section: AboutSection;
  locale: SiteLocale;
  isRTL: boolean;
}) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="border-b border-line bg-page py-16 sm:py-20 lg:py-28"
    >
      <div className="dnh-site-shell grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
        <figure className="relative aspect-[4/5] overflow-hidden bg-[#032f3f]">
          <Image
            src="/assets/images/doctor.webp"
            alt={imageAlt[locale].founder}
            fill
            sizes="(max-width: 1024px) 100vw, 44vw"
            className="object-cover object-top"
          />
          <span
            aria-hidden="true"
            className="absolute start-5 top-5 size-5 bg-brand-accent"
          />
        </figure>
        <div>
          <Eyebrow section={section} />
          <Heading id={`${section.id}-title`}>
            <HeadingAccent section={section} />
          </Heading>
          <div className="mt-5 space-y-3">
            {section.paragraphs?.map((p) => (
              <Copy key={p}>{p}</Copy>
            ))}
          </div>
          <div
            className="mt-7 grid border border-line sm:grid-cols-2"
            dir="ltr"
          >
            {section.statements?.map((statement) => {
              const [name, descriptor] = statement.split(" = ");
              return (
                <div
                  key={statement}
                  className="border-b border-line p-5 text-start font-black text-brand-primary last:border-b-0 sm:border-b-0 sm:border-e sm:last:border-e-0"
                >
                  {name}
                  <small className="mt-1 block text-[10px] font-normal tracking-[.1em] text-ink-muted">
                    {descriptor}
                  </small>
                </div>
              );
            })}
          </div>
          {section.closing ? (
            <Copy className="mt-5">{section.closing}</Copy>
          ) : null}
          <SectionActions section={section} isRTL={isRTL} />
        </div>
      </div>
    </section>
  );
}

function FinalCTA({
  section,
  isRTL,
}: {
  section: AboutSection;
  isRTL: boolean;
}) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="relative isolate overflow-hidden bg-[#032f3f] py-20 text-white sm:py-24 lg:py-28"
    >
      <Image
        src="/assets/images/about/scenario-risk-horizon.png"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover opacity-[.14]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#032f3f]/30 to-[#032f3f] rtl:bg-gradient-to-l" />
      <div className="dnh-site-shell grid items-end gap-12 lg:grid-cols-[1.1fr_.55fr] lg:gap-16">
        <div>
          <Eyebrow section={section} dark />
          <Heading id={`${section.id}-title`} dark>
            <HeadingAccent section={section} />
          </Heading>
          <div className="mt-5 space-y-3">
            {section.paragraphs?.map((p) => (
              <Copy key={p} dark>
                {p}
              </Copy>
            ))}
          </div>
          <ul className="mt-5 flex flex-wrap gap-2">
            {section.topics?.map((topic) => (
              <li
                key={topic}
                className="border border-white/20 px-3 py-1.5 text-[11px] text-white/85"
              >
                {topic}
              </li>
            ))}
          </ul>
          <div className="mt-5 space-y-3">
            {section.closing_paragraphs?.map((p) => (
              <Copy key={p} dark>
                {p}
              </Copy>
            ))}
          </div>
        </div>
        <div className="border-s border-white/20 ps-0 lg:ps-8">
          <SectionActions section={section} dark isRTL={isRTL} />
        </div>
      </div>
    </section>
  );
}

export function AboutPage({
  content,
  locale,
}: {
  content: AboutContent;
  locale: SiteLocale;
}) {
  const sections = Object.fromEntries(
    content.sections.map((section) => [section.id, section]),
  );
  const isRTL = content.direction === "rtl";
  return (
    <div
      dir={content.direction}
      lang={content.locale}
      className="overflow-x-clip bg-page text-ink"
    >
      <Hero
        section={sections["about-dnh-hero"]}
        locale={locale}
        isRTL={isRTL}
      />
      <Definition
        section={sections["what-is-dnh"]}
        locale={locale}
        isRTL={isRTL}
      />
      <Purpose
        section={sections["why-dnh-exists"]}
        locale={locale}
        isRTL={isRTL}
      />
      <Boundaries section={sections["what-dnh-is-not"]} />
      <Domains section={sections["two-core-advisory-domains"]} isRTL={isRTL} />
      <Framework section={sections["the-dnh-framework"]} isRTL={isRTL} />
      <Thinking
        section={sections["how-dnh-thinks"]}
        locale={locale}
        isRTL={isRTL}
      />
      <Audience section={sections["who-dnh-is-built-for"]} isRTL={isRTL} />
      <Ecosystem
        section={sections["the-dnh-ecosystem"]}
        locale={locale}
        isRTL={isRTL}
      />
      <Engagement
        section={sections["from-problem-recognition-to-decision"]}
        isRTL={isRTL}
      />
      <Founder
        section={sections["dr-nasim-and-dnh"]}
        locale={locale}
        isRTL={isRTL}
      />
      <FinalCTA
        section={sections["bring-structure-to-the-decision"]}
        isRTL={isRTL}
      />
    </div>
  );
}
