import { ArrowLeft, ArrowRight, CornerDownLeft, CornerDownRight } from "lucide-react";

import { LocalizedLink } from "@/components/providers/LanguageProvider";
import { PrivacyPolicyIndex } from "./PrivacyPolicyIndex";

type LinkItem = { id?: string; label: string; href: string; description?: string };
type Notice = { label: string; text: string };
type DataRow = { id: string; category: string; data: string; purpose: string; detail: string };
type CookieRow = { id: string; name: string; kind: string; purpose: string; duration: string };
type PrivacySection = {
  id: string;
  label: string;
  title: string;
  lead: string;
  paragraphs?: string[];
  bullets?: string[];
  note?: Notice;
  action?: LinkItem;
  facts?: Array<{ id: string; label: string; value: string; description: string }>;
  relatedLinks?: LinkItem[];
  cookieTable?: {
    caption: string;
    columns: { name: string; kind: string; purpose: string; duration: string };
    rows: CookieRow[];
  };
};

export type PrivacyPolicyContent = {
  page: string;
  locale: "fa" | "en";
  direction: "rtl" | "ltr";
  seo: { title: string; description: string };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    lastUpdatedLabel: string;
    lastUpdated: string;
    statusLabel: string;
    status: string;
    indexLabel: string;
    indexNote: string;
  };
  publicationNote: Notice;
  summary: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{ id: string; label: string; description: string }>;
  };
  dataMap: {
    eyebrow: string;
    title: string;
    intro: string;
    caption: string;
    columns: { category: string; data: string; purpose: string; detail: string };
    rows: DataRow[];
  };
  sections: PrivacySection[];
  closing: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: LinkItem;
    secondaryCta: LinkItem;
    reviewLabel: string;
    reviewText: string;
  };
  ui: { backToContents: string; tableMobileLabel: string };
};

const shell = "dnh-site-shell";

const latinDigits = (value: string) =>
  value
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)));

export function PrivacyPolicyPage({ content }: { content: PrivacyPolicyContent }) {
  const isRtl = content.direction === "rtl";
  const Arrow = isRtl ? ArrowLeft : ArrowRight;
  const CornerArrow = isRtl ? CornerDownLeft : CornerDownRight;

  return (
    <main dir={content.direction} className="overflow-x-clip bg-page text-ink">
      <section className="bg-[#032f3f] text-white">
        <div aria-hidden="true" className="h-[116px]" />
        <div className={`${shell} py-10 sm:py-14 lg:py-16`}>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_330px] lg:items-end lg:gap-20 xl:grid-cols-[minmax(0,1fr)_380px]">
            <header>
              <p className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[.2em] text-brand-primary">
                <span aria-hidden="true" className="h-px w-9 bg-brand-accent" />
                {content.hero.eyebrow}
              </p>
              <h1 className="mt-5 max-w-[930px] text-pretty text-[35px] font-black leading-[1.5] tracking-[-.045em] text-white sm:text-[46px] lg:text-[56px] lg:leading-[1.42]">
                {content.hero.title}
              </h1>
              <p className="mt-6 max-w-[780px] text-[14px] font-medium leading-[2.05] text-white/72 sm:text-[15px]">
                {content.hero.lead}
              </p>
            </header>

            <dl className="border-t border-white/20 lg:border-s lg:border-t-0 lg:ps-7">
              <div className="grid grid-cols-[120px_1fr] gap-4 border-b border-white/15 py-4 lg:grid-cols-1 lg:gap-1 lg:pt-0">
                <dt className="text-[9px] font-black uppercase tracking-[.16em] text-brand-primary">{content.hero.lastUpdatedLabel}</dt>
                <dd className="text-[13px] font-bold leading-6 text-white">
                  <bdi
                    dir={content.locale === "en" ? "ltr" : undefined}
                    lang={content.locale === "en" ? "en" : "fa-IR"}
                    style={
                      content.locale === "en"
                        ? {
                            fontFamily: "Arial, Helvetica, sans-serif",
                            fontVariantNumeric: "tabular-nums",
                            unicodeBidi: "isolate",
                          }
                        : undefined
                    }
                  >
                    {content.locale === "en" ? latinDigits(content.hero.lastUpdated) : content.hero.lastUpdated}
                  </bdi>
                </dd>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-4 py-4 lg:grid-cols-1 lg:gap-1">
                <dt className="text-[9px] font-black uppercase tracking-[.16em] text-brand-primary">{content.hero.statusLabel}</dt>
                <dd className="text-[12px] font-medium leading-6 text-white/72">{content.hero.status}</dd>
              </div>
              <div className="border-t border-white/15 pt-4">
                <dt className="text-[9px] font-black uppercase tracking-[.16em] text-brand-primary">{content.publicationNote.label}</dt>
                <dd className="mt-1 text-[10px] font-medium leading-6 text-white/58">{content.publicationNote.text}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="border-b border-ink/15 bg-[#f7f4ef]">
        <div className={`${shell} py-14 sm:py-18 lg:py-22`}>
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
            <header>
              <p className="text-[10px] font-black uppercase tracking-[.18em] text-brand-accent">{content.summary.eyebrow}</p>
              <h2 className="mt-4 max-w-[590px] text-pretty !text-[29px] font-black !leading-[1.65] tracking-[-.035em] sm:!text-[38px]">{content.summary.title}</h2>
              <p className="mt-5 max-w-[620px] text-[13px] font-medium leading-8 text-ink-muted">{content.summary.intro}</p>
            </header>
            <div className="border-t-2 border-ink">
              {content.summary.items.map((item) => (
                <article key={item.id} className="grid gap-2 border-b border-ink/15 py-5 sm:grid-cols-[180px_1fr] sm:gap-7">
                  <h3 className="text-[12px] font-black leading-7 text-ink">{item.label}</h3>
                  <p className="text-[13px] font-medium leading-7 text-ink-muted">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="mt-12 lg:mt-16">
            <PrivacyPolicyIndex items={content.sections} label={content.hero.indexLabel} direction={content.direction} variant="mobile" />
          </div>
        </div>
      </section>

      <section aria-labelledby="privacy-data-map-title" className="border-b border-ink/15 bg-white">
        <div className={`${shell} py-14 sm:py-20 lg:py-24`}>
          <header className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end lg:gap-16">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.18em] text-brand-accent">{content.dataMap.eyebrow}</p>
              <h2 id="privacy-data-map-title" className="mt-4 max-w-[820px] text-pretty !text-[29px] font-black !leading-[1.62] tracking-[-.035em] sm:!text-[38px]">{content.dataMap.title}</h2>
            </div>
            <p className="border-s border-ink/20 ps-5 text-[12px] font-medium leading-7 text-ink-muted">{content.dataMap.intro}</p>
          </header>
          <DataMapTable content={content} />
        </div>
      </section>

      <div className={`${shell} py-14 sm:py-20 lg:py-28`}>
        <div className="grid items-start gap-12 lg:grid-cols-[310px_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[350px_minmax(0,1fr)] xl:gap-20">
          <aside className="hidden lg:sticky lg:top-28 lg:block lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pe-2 lg:[scrollbar-width:thin]">
            <div className="border-b-2 border-ink pb-5">
              <p className="text-[12px] font-black uppercase tracking-[.18em] text-brand-accent">{content.hero.indexLabel}</p>
              <p className="mt-2 max-w-[290px] text-[11px] font-medium leading-6 text-ink-muted">{content.hero.indexNote}</p>
            </div>
            <PrivacyPolicyIndex items={content.sections} label={content.hero.indexLabel} direction={content.direction} variant="rail" />
          </aside>

          <article className="min-w-0">
            {content.sections.map((section, index) => (
              <PolicyChapter
                key={section.id}
                section={section}
                index={index}
                content={content}
                CornerArrow={CornerArrow}
                Arrow={Arrow}
              />
            ))}
          </article>
        </div>
      </div>

      <section className="border-y border-white/15 bg-[#032f3f] text-white">
        <div className={`${shell} py-14 sm:py-20 lg:py-24`}>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end lg:gap-20">
            <div className="border-s-2 border-brand-accent ps-6 sm:ps-9">
              <p className="text-[10px] font-black uppercase tracking-[.18em] text-brand-primary">{content.closing.eyebrow}</p>
              <h2 className="mt-4 max-w-[800px] text-pretty !text-[29px] font-black !leading-[1.65] tracking-[-.035em] text-white sm:!text-[38px]">{content.closing.title}</h2>
              <p className="mt-5 max-w-[760px] text-[13px] font-medium leading-8 text-white/68">{content.closing.description}</p>
            </div>
            <div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <LocalizedLink href={content.closing.primaryCta.href} className="inline-flex min-h-12 items-center justify-center gap-3 bg-white px-6 py-3 text-xs font-black text-ink transition hover:bg-[#e5edf0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                  {content.closing.primaryCta.label}<Arrow aria-hidden="true" size={15} />
                </LocalizedLink>
                <LocalizedLink href={content.closing.secondaryCta.href} className="inline-flex min-h-12 items-center justify-center border border-white/30 px-6 py-3 text-xs font-black text-white transition hover:border-white hover:bg-white hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                  {content.closing.secondaryCta.label}
                </LocalizedLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function DataMapTable({ content }: { content: PrivacyPolicyContent }) {
  const { dataMap } = content;
  return (
    <div className="mt-9">
      <div className="hidden md:block">
        <table className="w-full table-fixed border-collapse text-start">
          <caption className="sr-only">{dataMap.caption}</caption>
          <thead>
            <tr className="border-y-2 border-ink text-start">
              <th scope="col" className="w-[18%] px-3 py-4 text-start text-[10px] font-black uppercase tracking-[.12em] text-brand-accent">{dataMap.columns.category}</th>
              <th scope="col" className="w-[27%] px-3 py-4 text-start text-[10px] font-black uppercase tracking-[.12em] text-brand-accent">{dataMap.columns.data}</th>
              <th scope="col" className="w-[23%] px-3 py-4 text-start text-[10px] font-black uppercase tracking-[.12em] text-brand-accent">{dataMap.columns.purpose}</th>
              <th scope="col" className="px-3 py-4 text-start text-[10px] font-black uppercase tracking-[.12em] text-brand-accent">{dataMap.columns.detail}</th>
            </tr>
          </thead>
          <tbody>
            {dataMap.rows.map((row) => (
              <tr key={row.id} className="border-b border-ink/15 align-top transition-colors hover:bg-page">
                <th scope="row" className="px-3 py-5 text-start text-[12px] font-black leading-7 text-ink">{row.category}</th>
                <td className="px-3 py-5 text-[12px] font-medium leading-7 text-ink-muted">{row.data}</td>
                <td className="px-3 py-5 text-[12px] font-medium leading-7 text-ink-muted">{row.purpose}</td>
                <td className="px-3 py-5 text-[12px] font-medium leading-7 text-ink-muted">{row.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t-2 border-ink md:hidden">
        {dataMap.rows.map((row) => (
          <article key={row.id} className="border-b border-ink/15 py-6">
            <h3 className="text-[15px] font-black leading-7 text-ink">{row.category}</h3>
            <dl className="mt-4 space-y-4">
              <MobileDefinition label={dataMap.columns.data} value={row.data} />
              <MobileDefinition label={dataMap.columns.purpose} value={row.purpose} />
              <MobileDefinition label={dataMap.columns.detail} value={row.detail} />
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}

function MobileDefinition({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 min-[390px]:grid-cols-[92px_1fr] min-[390px]:gap-4">
      <dt className="text-[9px] font-black uppercase tracking-[.12em] text-brand-accent">{label}</dt>
      <dd className="text-[12px] font-medium leading-7 text-ink-muted">{value}</dd>
    </div>
  );
}

function PolicyChapter({
  section,
  index,
  content,
  CornerArrow,
  Arrow,
}: {
  section: PrivacySection;
  index: number;
  content: PrivacyPolicyContent;
  CornerArrow: typeof CornerDownRight;
  Arrow: typeof ArrowRight;
}) {
  return (
    <section id={section.id} aria-labelledby={`${section.id}-title`} className={`scroll-mt-28 ${index === 0 ? "" : "mt-20 sm:mt-24 lg:mt-28"}`}>
      <header className="border-t-2 border-ink pt-6">
        <p className="text-[10px] font-black uppercase tracking-[.17em] text-brand-accent">{section.label}</p>
        <h2 id={`${section.id}-title`} className="mt-4 max-w-[800px] text-pretty !text-[27px] font-black !leading-[1.65] tracking-[-.03em] text-ink sm:!text-[34px]">{section.title}</h2>
        <p className="mt-5 max-w-[76ch] border-s-2 border-brand-accent ps-5 text-[14px] font-bold leading-8 text-ink sm:ps-7">{section.lead}</p>
      </header>

      {section.bullets?.length ? (
        <ul className="mt-8 grid border-s border-t border-ink/15 sm:grid-cols-2">
          {section.bullets.map((bullet, bulletIndex) => (
            <li key={`${section.id}-bullet-${bulletIndex}`} className="grid min-h-[92px] grid-cols-[24px_1fr] gap-3 border-b border-e border-ink/15 p-4 text-[12px] font-semibold leading-7 text-ink-muted sm:p-5">
              <span aria-hidden="true" className="mt-[13px] h-px bg-brand-accent" />{bullet}
            </li>
          ))}
        </ul>
      ) : null}

      {section.cookieTable ? <CookieTable section={section} /> : null}

      {section.facts?.length ? (
        <div className="mt-8 grid border-s border-t border-ink/15 sm:grid-cols-2">
          {section.facts.map((fact) => (
            <article key={fact.id} className="border-b border-e border-ink/15 p-5 sm:p-6">
              <p className="text-[9px] font-black uppercase tracking-[.15em] text-brand-accent">{fact.label}</p>
              <p className="mt-3 text-[23px] font-black leading-9 tracking-[-.03em] text-ink">{fact.value}</p>
              <p className="mt-3 text-[12px] font-medium leading-7 text-ink-muted">{fact.description}</p>
            </article>
          ))}
        </div>
      ) : null}

      {section.paragraphs?.length ? (
        <div className="mt-8 max-w-[76ch] space-y-5">
          {section.paragraphs.map((paragraph, paragraphIndex) => (
            <p key={`${section.id}-paragraph-${paragraphIndex}`} className="text-[13px] font-medium leading-[2.08] text-ink-muted sm:text-[14px]">{paragraph}</p>
          ))}
        </div>
      ) : null}

      {section.note ? (
        <aside className="mt-8 grid gap-3 border-y border-ink/20 bg-[#eee9df] px-5 py-5 sm:grid-cols-[190px_1fr] sm:gap-7 sm:px-6" aria-label={section.note.label}>
          <p className="text-[10px] font-black uppercase tracking-[.15em] text-ink">{section.note.label}</p>
          <p className="text-[12px] font-semibold leading-7 text-ink-muted">{section.note.text}</p>
        </aside>
      ) : null}

      {section.action ? (
        <LocalizedLink href={section.action.href} className="mt-8 inline-flex min-h-12 items-center gap-3 bg-ink px-6 py-3 text-xs font-black text-white transition hover:bg-brand-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus">
          {section.action.label}<Arrow aria-hidden="true" size={15} />
        </LocalizedLink>
      ) : null}

      {section.relatedLinks?.length ? (
        <div className="mt-9 border-t-2 border-ink">
          {section.relatedLinks.map((link) => (
            <LocalizedLink key={link.id} href={link.href} className="group grid min-h-[88px] grid-cols-[1fr_auto] items-center gap-5 border-b border-ink/15 py-4 transition hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus">
              <span>
                <span className="block text-[14px] font-black leading-7 text-ink transition group-hover:text-brand-accent">{link.label}</span>
                <span className="mt-1 block text-[11px] font-medium leading-6 text-ink-muted">{link.description}</span>
              </span>
              <Arrow aria-hidden="true" size={16} className="text-brand-accent" />
            </LocalizedLink>
          ))}
        </div>
      ) : null}

      <a href="#privacy-contents" className="mt-7 inline-flex min-h-11 items-center gap-2 border-b border-ink/20 py-2 text-[11px] font-black text-brand-accent transition hover:border-brand-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus lg:hidden">
        {content.ui.backToContents}<CornerArrow aria-hidden="true" size={13} />
      </a>
    </section>
  );
}

function CookieTable({ section }: { section: PrivacySection }) {
  const table = section.cookieTable;
  if (!table) return null;
  return (
    <div className="mt-9">
      <div className="hidden md:block">
        <table className="w-full table-fixed border-collapse text-start">
          <caption className="sr-only">{table.caption}</caption>
          <thead>
            <tr className="border-y-2 border-ink">
              <th scope="col" className="w-[20%] px-3 py-4 text-start text-[9px] font-black uppercase tracking-[.12em] text-brand-accent">{table.columns.name}</th>
              <th scope="col" className="w-[16%] px-3 py-4 text-start text-[9px] font-black uppercase tracking-[.12em] text-brand-accent">{table.columns.kind}</th>
              <th scope="col" className="px-3 py-4 text-start text-[9px] font-black uppercase tracking-[.12em] text-brand-accent">{table.columns.purpose}</th>
              <th scope="col" className="w-[24%] px-3 py-4 text-start text-[9px] font-black uppercase tracking-[.12em] text-brand-accent">{table.columns.duration}</th>
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row.id} className="border-b border-ink/15 align-top">
                <th scope="row" className="break-all px-3 py-5 text-start font-mono text-[11px] font-bold leading-6 text-ink">{row.name}</th>
                <td className="break-words px-3 py-5 text-[11px] font-bold leading-6 text-ink">{row.kind}</td>
                <td className="px-3 py-5 text-[12px] font-medium leading-7 text-ink-muted">{row.purpose}</td>
                <td className="px-3 py-5 text-[12px] font-medium leading-7 text-ink-muted">{row.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t-2 border-ink md:hidden">
        {table.rows.map((row) => (
          <article key={row.id} className="border-b border-ink/15 py-6">
            <h3 className="break-all font-mono text-[13px] font-bold leading-7 text-ink">{row.name}</h3>
            <p className="mt-1 break-words text-[10px] font-black uppercase tracking-[.12em] text-brand-accent">{row.kind}</p>
            <dl className="mt-4 space-y-4">
              <MobileDefinition label={table.columns.purpose} value={row.purpose} />
              <MobileDefinition label={table.columns.duration} value={row.duration} />
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}
