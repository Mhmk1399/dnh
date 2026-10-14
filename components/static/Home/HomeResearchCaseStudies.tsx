"use client";

import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BookOpenText,
  FileText,
  FolderOpen,
  Network,
  ShieldCheck,
} from "lucide-react";

import {
  LocalizedLink as Link,
  useLanguage,
} from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import homeFa from "@/config/DNH_Homepage_Final_FA.json";
import homeEn from "@/config/DNH_Homepage_Final_EN.json";

const researchIcons = {
  research: BarChart3,
  note: FileText,
  risk: ShieldCheck,
  allocation: Network,
  "case-study": FolderOpen,
} as const;

type ResearchContent = {
  id: "research-and-case-studies";
  type: "research_case_studies";
  eyebrow: string;
  english_label?: string;
  heading: string;
  heading_highlight?: string;
  intro: string;
  media: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  items: Array<{
    id: string;
    title: string;
    english_label?: string;
    description: string;
    href: string;
    icon: keyof typeof researchIcons;
    media: {
      src: string;
      alt: string;
    };
  }>;
  case_study_note: string;
  ctas: Array<{
    id: string;
    label: string;
    type: "primary" | "secondary";
    href: string;
  }>;
};

export function HomeResearchCaseStudies() {
  const { locale, direction, isRTL, languageTag } = useLanguage();
  const homepage = locale === "en" ? homeEn : homeFa;
  const content = homepage.sections.find(
    (section) =>
      section.id === "research-and-case-studies" &&
      section.type === "research_case_studies",
  ) as ResearchContent | undefined;

  if (!content) return null;

  const highlight = content.heading_highlight ?? "";
  const highlightIndex = highlight ? content.heading.indexOf(highlight) : -1;
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="home-research-heading"
      className="relative isolate overflow-hidden border-b border-line bg-page py-14 text-ink sm:py-18 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right,color-mix(in srgb,var(--dnh-primary) 8%,transparent) 1px,transparent 1px),linear-gradient(to bottom,color-mix(in srgb,var(--dnh-primary) 6%,transparent) 1px,transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "linear-gradient(90deg,black,transparent 27%,transparent 73%,black)",
        }}
      />

      <div className="dnh-site-shell relative z-10">
        <div className="grid min-w-0 gap-7 lg:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.9fr)] lg:items-stretch lg:gap-0">
          <header className="min-w-0 text-start lg:col-start-2 lg:row-start-1 lg:border-y lg:border-e lg:border-line lg:bg-page lg:p-9 xl:p-12">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] font-bold text-brand-primary sm:text-[13px]">
              <p>{content.eyebrow}</p>
              <span
                aria-hidden="true"
                className="h-[2px] w-11 bg-brand-accent"
              />
              {content.english_label &&
              content.english_label !== content.eyebrow ? (
                <bdi
                  dir="ltr"
                  className="w-full text-[10px] font-medium tracking-[0.28em] text-ink-muted"
                >
                  {content.english_label}
                </bdi>
              ) : null}
            </div>

            <h2
              id="home-research-heading"
              className={`mt-5 max-w-[23ch] text-pretty text-[clamp(2rem,7.4vw,3.1rem)] font-black tracking-[-0.035em] sm:text-[clamp(2.6rem,4.6vw,3.25rem)] ${
                isRTL ? "leading-[1.48]" : "leading-[1.14]"
              }`}
            >
              {highlightIndex < 0 ? (
                content.heading
              ) : (
                <>
                  {content.heading.slice(0, highlightIndex)}
                  <span className="text-brand-accent">
                    {content.heading.slice(
                      highlightIndex,
                      highlightIndex + highlight.length,
                    )}
                  </span>
                  {content.heading.slice(highlightIndex + highlight.length)}
                </>
              )}
            </h2>

            <p
              className={`mt-5 max-w-[70ch] border-s-2 border-brand-primary ps-4 text-[14px] text-ink-muted sm:text-[16px] ${
                isRTL ? "leading-[2]" : "leading-[1.75]"
              }`}
            >
              {content.intro}
            </p>
          </header>

          <div className="relative aspect-[16/10] min-h-[300px] overflow-hidden border border-line bg-surface-soft lg:col-start-1 lg:row-start-1 lg:aspect-auto lg:min-h-[510px]">
            <Image
              src={content.media.src}
              alt={content.media.alt}
              fill
              sizes="(max-width: 1023px) calc(100vw - 24px), 58vw"
              className="object-cover object-center"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-page/5"
            />
            <span
              aria-hidden="true"
              className="absolute end-5 top-5 size-6 bg-brand-accent"
            />
          </div>
        </div>

        <div className="mt-7 grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {content.items.map((item) => {
            const Icon = researchIcons[item.icon] ?? BookOpenText;

            return (
              <article
                key={item.id}
                className="group flex min-w-0 flex-col border border-line bg-page transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-brand-primary motion-reduce:transform-none motion-reduce:transition-none"
              >
                <div className="relative aspect-[16/7] overflow-hidden bg-brand-primary">
                  <Image
                    src={item.media.src}
                    alt={item.media.alt}
                    fill
                    sizes="(max-width: 767px) calc(100vw - 24px), (max-width: 1279px) 48vw, 20vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transition-none"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent"
                  />
              
                </div>

                <div className="relative flex flex-1 flex-col p-5 pt-8">
                

                  <h3
                    className={`text-start text-[17px] font-black sm:text-[18px] ${
                      isRTL ? "leading-[1.7]" : "leading-[1.36]"
                    }`}
                  >
                    <Link
                      href={item.href}
                      className="outline-none transition-colors hover:text-brand-primary focus-visible:text-brand-primary focus-visible:ring-2 focus-visible:ring-focus/35"
                    >
                      {item.title}
                    </Link>
                  </h3>

                

                  <p
                    className={`mt-3 text-start text-[13px] text-ink-muted ${
                      isRTL ? "leading-[1.9]" : "leading-[1.68]"
                    }`}
                  >
                    {item.description}
                  </p>

                  <Link
                    href={item.href}
                    aria-label={item.title}
                    className="mt-auto flex min-h-11 items-center justify-end pt-4 text-brand-accent outline-none transition-colors hover:text-brand-primary focus-visible:ring-2 focus-visible:ring-focus/35"
                  >
                    <Arrow size={20} strokeWidth={1.8} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <footer className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <p
            className={`border border-line bg-surface-soft p-4 text-start text-[13px] text-ink-muted sm:p-5 sm:text-[14px] ${
              isRTL ? "leading-[1.9]" : "leading-[1.7]"
            }`}
          >
            {content.case_study_note}
          </p>

          <div className="grid gap-3 sm:grid-cols-2 lg:flex">
            {content.ctas.map((cta) => (
              <ActionButton
                key={cta.id}
                href={cta.href}
                variant={cta.type}
                shape="square"
                size="md"
                icon={Arrow}
                iconPosition="end"
                dir={direction}
                className={`w-full shadow-none hover:shadow-none sm:min-w-[230px] ${
                  cta.type === "primary" ? "bg-brand-accent" : "bg-page"
                }`}
              >
                {cta.label}
              </ActionButton>
            ))}
          </div>
        </footer>
      </div>
    </section>
  );
}
