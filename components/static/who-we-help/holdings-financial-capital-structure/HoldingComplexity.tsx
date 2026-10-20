import { AlertTriangle, Building, Network, ScanSearch } from "lucide-react";
import { HoldingActions, HoldingCopy, HoldingIntro } from "./HoldingShared";
import type { HoldingSection } from "./holdingTypes";

export function HoldingComplexity({
  growth,
  group,
  signs,
  audience,
  rtl,
}: {
  growth: HoldingSection;
  group: HoldingSection;
  signs: HoldingSection;
  audience: HoldingSection;
  rtl: boolean;
}) {
  return (
    <>
      <section
        id={growth.id}
        aria-labelledby={`${growth.id}-title`}
        className="border-b border-line bg-page py-16 sm:py-20 lg:py-24"
      >
        <div className="dnh-site-shell">
          <div className="grid gap-9 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
            <HoldingIntro section={growth} />
            <div className="space-y-3">
              {growth.paragraphs?.map((t) => (
                <HoldingCopy key={t}>{t}</HoldingCopy>
              ))}
            </div>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {growth.items?.map((item) => (
              <article
                key={item.title}
                className="group relative border border-line bg-surface-soft p-6 transition-colors duration-300 hover:border-brand-primary hover:bg-brand-secondary hover:text-page"
              >
                <Network className="text-brand-primary" aria-hidden="true" />
                <h3 className="mt-6 text-xl font-black leading-8">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-ink-muted group-hover:text-page/70">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-8 grid gap-3 border-s-4 border-brand-primary ps-6 lg:grid-cols-2">
            {growth.closing_paragraphs?.map((t) => (
              <HoldingCopy key={t}>{t}</HoldingCopy>
            ))}
          </div>
          <HoldingActions section={growth} rtl={rtl} />
        </div>
      </section>
      <section
        id={group.id}
        aria-labelledby={`${group.id}-title`}
        className="border-b border-line bg-surface-soft py-16 sm:py-20 lg:py-24"
      >
        <div className="dnh-site-shell grid items-start gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-16">
          <aside className="relative lg:self-stretch">
            <div className="lg:sticky lg:top-28 lg:h-fit">
              <HoldingIntro section={group} />
              <div className="mt-6 space-y-3">
                {group.paragraphs?.map((t) => (
                  <HoldingCopy key={t}>{t}</HoldingCopy>
                ))}
              </div>
              <Building
                className="mt-8 text-brand-primary"
                size={46}
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </div>
          </aside>
          <div>
            <ul className="divide-y divide-line border-y border-line">
              {group.questions?.map((q) => (
                <li key={q} className="py-5">
                  <p className="text-lg font-black leading-8 text-ink">{q}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8 space-y-3 border-s-4 border-brand-primary ps-6">
              {group.closing_paragraphs?.map((t) => (
                <HoldingCopy key={t}>{t}</HoldingCopy>
              ))}
            </div>
            <HoldingActions section={group} rtl={rtl} />
          </div>
        </div>
      </section>
      <section
        id={signs.id}
        aria-labelledby={`${signs.id}-title`}
        className="border-b border-line bg-brand-secondary py-16 text-page sm:py-20 lg:py-24"
      >
        <div className="dnh-site-shell">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
            <HoldingIntro section={signs} dark />
            <div>
              {signs.intro && <HoldingCopy dark>{signs.intro}</HoldingCopy>}
              <ScanSearch
                className="mt-7 text-brand-primary"
                size={46}
                aria-hidden="true"
              />
            </div>
          </div>
          <ul className="mt-12 grid gap-px bg-page/12 sm:grid-cols-2 lg:grid-cols-4">
            {signs.items?.map((item) => (
              <li
                key={item.title}
                className="group min-h-64 bg-brand-secondary p-6 transition-colors duration-300 hover:bg-page hover:text-brand-secondary"
              >
                <AlertTriangle
                  className="text-brand-primary"
                  size={20}
                  aria-hidden="true"
                />
                <h3 className="mt-7 text-lg font-black leading-8">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-page/65 group-hover:text-ink-muted">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
          {signs.closing && (
            <p className="mt-8 max-w-5xl border-s-4 border-brand-primary ps-5 text-base leading-8 text-page/75">
              {signs.closing}
            </p>
          )}
          <HoldingActions section={signs} rtl={rtl} dark />
        </div>
      </section>
      <section
        id={audience.id}
        aria-labelledby={`${audience.id}-title`}
        className="border-b border-line bg-page py-16 sm:py-20 lg:py-24"
      >
        <div className="dnh-site-shell grid items-start gap-10 lg:grid-cols-[.78fr_1.22fr] lg:gap-16">
          <aside className="relative lg:self-stretch">
            <div className="lg:sticky lg:top-28 lg:h-fit">
              <HoldingIntro section={audience} />
            </div>
          </aside>
          <div>
            <ul className="divide-y divide-line border-y border-line">
              {audience.items?.map((item) => (
                <li
                  key={item.title}
                  className="grid gap-2 py-5 sm:grid-cols-[.7fr_1.3fr] sm:gap-5"
                >
                  <h3 className="text-lg font-black leading-8 text-ink">
                    {item.title}
                  </h3>
                  <p className="text-[15px] leading-7 text-ink-muted">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
            {audience.closing && (
              <p className="mt-7 text-lg font-black leading-9 text-ink">
                {audience.closing}
              </p>
            )}
            <HoldingActions section={audience} rtl={rtl} />
          </div>
        </div>
      </section>
    </>
  );
}
