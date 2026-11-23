import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Globe,
  Landmark,
  Layers,
  Presentation,
  ShieldCheck,
} from "lucide-react";

import type { HomepageContent } from "@/lib/homepage-content";
import { LocalizedLink as Link } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";

const serviceIcons = {
  wealth: Landmark,
  portfolio: Layers,
  advisory: BriefcaseBusiness,
  market: Globe,
  risk: ShieldCheck,
  briefing: Presentation,
} as const;

type ServiceIconKey = keyof typeof serviceIcons;

type ServiceItem = {
  id: string;
  title: string;
  description: string;
  cta?: string;
  href: string;
  icon: ServiceIconKey;
  media: {
    src: string;
    alt: string;
  };
};

type ServicesContent = {
  id: "services";
  type: "service_cards";
  eyebrow: string;
  heading: string;
  heading_highlight?: string;
  intro: string;
  services: ServiceItem[];
  ctas: Array<{
    id: string;
    label: string;
    type: "primary" | "secondary";
    href: string;
  }>;
};

export function HomeServices({ homepage }: { homepage: HomepageContent }) {
  const { direction, locale: languageTag } = homepage;
  const isRTL = direction === "rtl";
  const content = homepage.sections.find(
    (section) => section.id === "services" && section.type === "service_cards",
  ) as ServicesContent | undefined;

  if (!content) return null;

  const highlight = content.heading_highlight ?? "";
  const highlightIndex = highlight ? content.heading.indexOf(highlight) : -1;
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section
      id={content.id}
      dir={direction}
      lang={languageTag}
      aria-labelledby="home-services-heading"
      className="relative isolate overflow-x-clip border-t border-line bg-page py-16 text-ink sm:py-20 md:py-24 xl:py-28"
    >
      <div className="dnh-site-shell">
        <div className="min-w-0">
          <header className="mx-auto max-w-[980px] min-w-0 text-center">
            <div className="flex items-center justify-center gap-3 text-[12px] font-semibold leading-[1.8] text-brand-accent sm:text-[13px]">
              <span
                aria-hidden="true"
                className="h-px w-9 shrink-0 bg-brand-accent sm:w-9"
              />
              <p className="min-w-0">{content.eyebrow}</p>
            </div>

            <h2
              id="home-services-heading"
              className="mx-auto mt-5  max-w-[24ch] text-pretty text-center text-[clamp(1.875rem,7vw,2.25rem)] font-extrabold leading-[1.6] [overflow-wrap:break-word] sm:mt-6 md:max-w-[56ch] md:text-[clamp(2.25rem,4.7vw,2.175rem)] md:leading-[1.55] lg:text-[clamp(2.625rem,3.35vw,2.6rem)] lg:leading-[1.5]"
            >
              {highlightIndex === -1 ? (
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
              className={`mx-auto mt-4 max-w-[92ch] text-[14px] text-ink-muted sm:text-[16px] ${isRTL ? "leading-[2]" : "leading-[1.72]"}`}
            >
              {content.intro}
            </p>
          </header>

          <div className="mt-10 grid min-w-0 grid-cols-1 gap-1 border border-line bg-line sm:mt-12 md:grid-cols-2 lg:grid-cols-3">
            {content.services.map((service, index) => {
              const Icon = serviceIcons[service.icon] ?? Landmark;
              const featured = index === 0;

              return (
                <article
                  key={service.id}
                  className="group relative flex min-h-60 min-w-0 flex-col overflow-hidden bg-brand-secondary p-5 text-white sm:min-h-72 sm:p-6 xl:p-7"
                >
                  {!service.cta ? (
                    <Link
                      href={service.href}
                      aria-label={service.title}
                      className="absolute inset-0 z-20 outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-brand-primary/55"
                    >
                      <span className="sr-only">{service.title}</span>
                    </Link>
                  ) : null}
                  {service.media.src.trim() ? (
                    <Image
                      src={service.media.src.trim()}
                      alt={service.media.alt}
                      fill
                      sizes="(max-width: 767px) calc(100vw - 24px), (max-width: 1023px) calc(50vw - 24px), calc(33vw - 32px)"
                      className="object-cover object-center motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-[1.02]"
                    />
                  ) : null}

                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-black/65 to-ink/95 ${
                      featured ? "opacity-95" : "opacity-90"
                    }`}
                  />

                  <div className="relative z-10 mb-4 flex items-center justify-between gap-4 sm:mb-5">
                    <span
                      aria-hidden="true"
                      className="flex size-12 shrink-0 items-center justify-center border border-white/30 bg-brand-secondary/65 text-white sm:size-14"
                    >
                      <Icon size={24} strokeWidth={1.65} />
                    </span>
                    {!service.cta && <Arrow size={20} aria-hidden="true" />}
                  </div>

                  <h3 className="relative z-10 border-b border-white/35 pb-2 text-start text-[19px] font-bold leading-[1.55] [overflow-wrap:anywhere] sm:text-[21px]">
                    {service.title}
                  </h3>

                  <p
                    className={`relative z-10 mt-3 min-w-0 text-start text-[14px] font-normal text-white/82 sm:mt-4 sm:text-[15px] ${
                      isRTL ? "leading-[1.95]" : "leading-[1.72]"
                    }`}
                  >
                    {service.description}
                  </p>

                  {service.cta ? (
                    <div className="relative z-30 mt-auto min-w-0 pt-4">
                      <ActionButton
                        href={service.href}
                        variant="secondary"
                        shape="square"
                        size="md"
                        iconPosition="end"
                        dir={direction}
                        className="min-h-11 w-full min-w-0 whitespace-normal border-white/50 bg-brand-secondary! text-start text-sm text-white! shadow-none [overflow-wrap:anywhere] hover:border-white hover:bg-white! hover:text-ink! sm:w-auto sm:max-w-full"
                      >
                        {service.cta}
                      </ActionButton>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
          {content.ctas.length > 0 ? (
            <div className="mt-8 flex justify-center sm:mt-10">
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
                  className="w-full shadow-none hover:shadow-none sm:w-auto sm:min-w-[260px]"
                >
                  {cta.label}
                </ActionButton>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
