import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Check,
  CircleDot,
  Compass,
  Layers3,
  Network,
  ShieldCheck,
} from "lucide-react";

import { LocalizedLink } from "@/components/providers/LanguageProvider";
import { ActionButton } from "@/components/ui/ActionButton";
import { DnhPageHero } from "@/components/ui/DnhPageHero";
import { PageSectionIndex } from "./PageSectionIndex";
import type { SiteLocale } from "@/lib/site-language";

import type {
  ReviewedPageCard,
  ReviewedPageDocument,
  ReviewedPageSection,
} from "./reviewedPageTypes";

const sectionIcons = [
  Layers3,
  Compass,
  BarChart3,
  ShieldCheck,
  Network,
  CircleDot,
];

function HighlightedHeading({
  heading,
  highlight,
  dark,
}: {
  heading: string;
  highlight?: string;
  dark: boolean;
}) {
  const value = highlight?.trim();
  const index = value ? heading.indexOf(value) : -1;
  if (!value || index < 0) return <>{heading}</>;

  return (
    <>
      {heading.slice(0, index)}
      <span className={dark ? "text-brand-primary" : "text-brand-accent"}>
        {heading.slice(index, index + value.length)}
      </span>
      {heading.slice(index + value.length)}
    </>
  );
}

function SectionHeader({
  section,
  dark,
}: {
  section: ReviewedPageSection;
  dark: boolean;
}) {
  return (
    <header className="max-w-[76rem] text-start">
      <p
        className={`flex items-center gap-3 text-[11px] font-black sm:text-[12px] ${dark ? "text-white/70" : "text-brand-accent"}`}
      >
        <span
          aria-hidden="true"
          className={`h-[2px] w-8 shrink-0 ${dark ? "bg-brand-primary" : "bg-brand-accent"}`}
        />
        {section.eyebrow}
      </p>
      <h2
        id={`${section.id}-heading`}
        className={`mt-4 max-w-[29ch] text-pretty text-[clamp(1.65rem,4.4vw,3.2rem)] font-black [overflow-wrap:anywhere] ${section.heading_highlight ? "" : dark ? "text-white" : "text-ink"}`}
        style={{ lineHeight: section.heading.length > 58 ? 1.42 : 1.32 }}
      >
        <HighlightedHeading
          heading={section.heading}
          highlight={section.heading_highlight}
          dark={dark}
        />
      </h2>
      {section.intro ? (
        <p
          className={`mt-5 max-w-[88ch] text-[14px] leading-[1.95] sm:text-[16px] ${dark ? "text-white/72" : "text-ink-muted"}`}
        >
          {section.intro}
        </p>
      ) : null}
      {section.paragraphs?.length ? (
        <div
          className={`mt-5 max-w-[92ch] space-y-3 border-s-2 ps-4 text-[14px] leading-[1.95] sm:text-[16px] ${dark ? "border-brand-primary/65 text-white/72" : "border-brand-accent/50 text-ink-muted"}`}
        >
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      ) : null}
    </header>
  );
}

function cardPlacement(count: number, index: number) {
  if (count === 1) return "xl:col-span-6";
  if (count === 2 || count === 4) return "xl:col-span-3";
  if (count === 5 && index === 3) return "xl:col-start-2 xl:col-span-2";
  return "xl:col-span-2";
}

function ContentCard({
  card,
  index,
  count,
  dark,
}: {
  card: ReviewedPageCard;
  index: number;
  count: number;
  dark: boolean;
}) {
  const Icon = sectionIcons[index % sectionIcons.length];
  const body = (
    <>
      <div className="flex items-center gap-3">
        <span
          className={`hidden size-10 shrink-0 items-center justify-center border sm:flex ${dark ? "border-white/15 bg-white/5 text-brand-primary" : "border-line bg-surface-soft text-brand-accent"}`}
        >
          <Icon aria-hidden="true" className="size-5" strokeWidth={1.6} />
        </span>
        {card.number ? (
          <bdi
            className={`text-[12px] font-black tracking-[.12em] [font-variant-numeric:lining-nums_tabular-nums] ${dark ? "text-brand-primary" : "text-brand-accent"}`}
          >
            {card.number}
          </bdi>
        ) : null}
      </div>
      {card.label ? (
        <p
          className={`mt-2 text-xs font-semibold ${dark ? "text-white/75" : "text-ink-muted"}`}
        >
          <bdi>{card.label}</bdi>
        </p>
      ) : null}
      <h3
        className={`mt-2 text-[17px] font-bold leading-[1.6] sm:mt-4 sm:text-[19px] ${dark ? "text-white" : "text-ink"}`}
      >
        {card.title}
      </h3>
      {card.description ? (
        <p
          className={`mt-2 max-w-prose text-sm leading-[1.85] ${dark ? "text-white/80" : "text-ink-muted"}`}
        >
          {card.description}
        </p>
      ) : null}
      {card.bullets?.length ? (
        <ul className="mt-5 space-y-3">
          {card.bullets.map((bullet) => (
            <li
              key={bullet}
              className={`flex gap-3 text-sm leading-[1.8] ${dark ? "text-white/80" : "text-ink-muted"}`}
            >
              <Check
                aria-hidden="true"
                className={`mt-1 size-4 shrink-0 ${dark ? "text-brand-primary" : "text-brand-accent"}`}
              />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {card.href && card.link_label ? (
        <span
          className={`mt-6 inline-flex min-h-11 items-center gap-2 border-b text-[12px] font-black ${dark ? "border-brand-primary/60 text-brand-primary" : "border-brand-accent/40 text-brand-accent"}`}
        >
          {card.link_label}
        </span>
      ) : null}
    </>
  );

  const className = `min-w-0 border p-4 sm:p-6 ${cardPlacement(count, index)} ${dark ? "border-white/15 bg-white/[.04]" : "border-line bg-white"}`;
  return card.href ? (
    <LocalizedLink
      href={card.href}
      className={`${className} transition-colors hover:border-brand-accent focus-visible:outline-2 focus-visible:outline-focus`}
    >
      {body}
    </LocalizedLink>
  ) : (
    <article className={className}>{body}</article>
  );
}

function Cards({
  section,
  dark,
}: {
  section: ReviewedPageSection;
  dark: boolean;
}) {
  const items = section.items ?? [];
  if (!items.length) return null;
  return (
    <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-6 xl:gap-4">
      {items.map((card, index) => (
        <ContentCard
          key={card.id}
          card={card}
          index={index}
          count={items.length}
          dark={dark}
        />
      ))}
    </div>
  );
}

function Comparison({
  section,
  dark,
}: {
  section: ReviewedPageSection;
  dark: boolean;
}) {
  if (!section.groups?.length) return null;
  return (
    <div
      className={`mt-8 grid grid-cols-1 border md:grid-cols-2 ${dark ? "border-white/15" : "border-line"}`}
    >
      {section.groups.map((group, index) => (
        <article
          key={group.id}
          className={`p-6 sm:p-8 ${index ? "border-t md:border-s md:border-t-0" : ""} ${dark ? "border-white/15 bg-white/[.035]" : "border-line bg-page"}`}
        >
          {group.label ? (
            <p
              className={`text-[10px] font-bold tracking-[.18em] ${dark ? "text-brand-primary" : "text-brand-accent"}`}
            >
              <bdi>{group.label}</bdi>
            </p>
          ) : null}
          <h3
            className={`mt-3 text-[20px] font-black ${dark ? "text-white" : "text-ink"}`}
          >
            {group.title}
          </h3>
          {group.description ? (
            <p
              className={`mt-4 text-[14px] leading-[1.9] ${dark ? "text-white/68" : "text-ink-muted"}`}
            >
              {group.description}
            </p>
          ) : null}
          {group.bullets?.length ? (
            <ul className="mt-6 space-y-3">
              {group.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className={`flex gap-3 text-[13px] leading-[1.8] ${dark ? "text-white/70" : "text-ink-muted"}`}
                >
                  <Check
                    aria-hidden="true"
                    className={`mt-1 size-4 shrink-0 ${dark ? "text-brand-primary" : "text-brand-accent"}`}
                  />
                  {bullet}
                </li>
              ))}
            </ul>
          ) : null}
        </article>
      ))}
    </div>
  );
}

function StandardSection({ section }: { section: ReviewedPageSection }) {
  const dark =
    section.theme === "dark" ||
    section.type === "demo" ||
    section.type === "boundary";
  const background = dark
    ? "bg-brand-secondary text-white"
    : section.theme === "soft"
      ? "bg-surface-soft"
      : "bg-page";
  const hasMedia = Boolean(section.media?.src);

  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-heading`}
      className={`relative overflow-hidden border-b ${dark ? "border-white/10" : "border-line"} ${background}`}
    >
      <div
        className={`dnh-site-shell py-14 sm:py-18 lg:py-24 ${hasMedia ? "lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(320px,.78fr)] lg:items-center lg:gap-10" : ""}`}
      >
        <div className="min-w-0">
          {section.badge ? (
            <p
              className={`mb-5 inline-flex min-h-9 items-center border px-3 text-[10px] font-black tracking-[.14em] ${dark ? "border-brand-primary/45 text-brand-primary" : "border-brand-accent/35 text-brand-accent"}`}
            >
              <bdi>{section.badge}</bdi>
            </p>
          ) : null}
          <SectionHeader section={section} dark={dark} />
          {section.type === "comparison" ? (
            <Comparison section={section} dark={dark} />
          ) : (
            <Cards section={section} dark={dark} />
          )}
          {section.closing ? (
            <p
              className={`mt-7 max-w-[90ch] border-s-2 ps-4 text-[13px] font-bold leading-[1.9] sm:text-[14px] ${dark ? "border-brand-primary text-white/75" : "border-brand-accent text-ink"}`}
            >
              {section.closing}
            </p>
          ) : null}
          {section.note ? (
            <p
              className={`mt-5 max-w-[90ch] text-[12px] leading-[1.9] sm:text-[13px] ${dark ? "text-white/55" : "text-ink-muted"}`}
            >
              {section.note}
            </p>
          ) : null}
          {section.ctas?.length ? (
            <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              {section.ctas.map((cta) => (
                <ActionButton
                  key={cta.id}
                  href={cta.href}
                  variant={cta.type}
                  shape="square"
                  size="md"
                  className={
                    dark && cta.type === "secondary"
                      ? "!border-white/25 !bg-white/5 !text-white hover:!border-white/50 hover:!text-white"
                      : ""
                  }
                >
                  {cta.label}
                </ActionButton>
              ))}
            </div>
          ) : null}
        </div>
        {section.media?.src ? (
          <figure className="relative mt-8 aspect-[4/3] min-h-[280px] overflow-hidden border border-line lg:mt-0 lg:min-h-[520px]">
            <Image
              src={section.media.src}
              alt={section.media.alt}
              fill
              sizes="(min-width: 1024px) 38vw, calc(100vw - 24px)"
              className="object-cover"
              style={{
                objectPosition: section.media.object_position ?? "center",
              }}
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-brand-secondary/35 via-transparent to-transparent"
            />
          </figure>
        ) : null}
      </div>
    </section>
  );
}

function FinalSection({
  section,
  direction,
}: {
  section: ReviewedPageSection;
  direction: "rtl" | "ltr";
}) {
  const Arrow = direction === "rtl" ? ArrowLeft : ArrowRight;
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-heading`}
      className="border-b border-white/10 bg-brand-secondary text-white"
    >
      <div className="dnh-site-shell py-14 sm:py-18 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12 lg:py-24">
        <div>
          <SectionHeader section={section} dark />
          {section.closing ? (
            <p className="mt-6 max-w-[82ch] text-[13px] leading-[1.9] text-white/60">
              {section.closing}
            </p>
          ) : null}
        </div>
        <div className="mt-8 flex flex-col gap-2 lg:mt-0">
          {section.ctas?.map((cta) => (
            <ActionButton
              key={cta.id}
              href={cta.href}
              variant={cta.type}
              shape="square"
              size="lg"
              icon={Arrow}
              className={
                cta.type === "secondary"
                  ? "!border-white/25 !bg-white/5 !text-white hover:!border-white/50 hover:!text-white"
                  : ""
              }
            >
              {cta.label}
            </ActionButton>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ReviewedContentPage({
  content,
  locale,
}: {
  content: ReviewedPageDocument;
  locale: SiteLocale;
}) {
  const direction = content.direction;
  const sections = [...content.sections].sort((a, b) => a.order - b.order);
  const hero = sections.find((section) => section.type === "hero");

  return (
    <div
      dir={direction}
      lang={locale === "fa" ? "fa-IR" : "en-US"}
      data-reviewed-page={content.page}
      className="[&>section[id]]:scroll-mt-24 lg:[&>section[id]]:scroll-mt-28"
    >
      {hero ? (
        <DnhPageHero
          id={hero.id}
          direction={direction}
          lang={locale === "fa" ? "fa-IR" : "en-US"}
          eyebrow={hero.eyebrow}
          heading={hero.heading}
          headingHighlight={hero.heading_highlight}
          paragraphs={(hero.paragraphs ?? []).map((text, index) => ({
            id: `${hero.id}-paragraph-${index + 1}`,
            text,
          }))}
          ctas={hero.ctas ?? []}
          media={
            hero.media
              ? {
                  src: hero.media.src,
                  mobileSrc: hero.media.mobile_src,
                  alt: hero.media.alt,
                  objectPosition: hero.media.object_position,
                  mobileObjectPosition: hero.media.mobile_object_position,
                }
              : undefined
          }
          mediaMode="background"
          expandLabel={locale === "fa" ? "مشاهده توضیحات کامل" : "Read more"}
          collapseLabel={locale === "fa" ? "نمایش خلاصه" : "Show less"}
        />
      ) : null}
      <PageSectionIndex sections={sections.filter((section) => section.type !== "hero")} locale={locale} />
      {sections.filter((section) => section.type !== "hero").map((section) =>
          section.type === "final_cta" ? (
            <FinalSection
              key={section.id}
              section={section}
              direction={direction}
            />
          ) : (
            <StandardSection key={section.id} section={section} />
          ),
        )}
    </div>
  );
}
