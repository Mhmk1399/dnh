import { CircleHelp, Network, ScanSearch, UsersRound } from "lucide-react";
import { BodyCopy, SectionActions, SectionIntro } from "./PortfolioShared";
import type { PortfolioSection } from "./portfolioTypes";

export function PortfolioFoundations({
  problem,
  diversification,
  signs,
  audience,
  rtl,
}: {
  problem: PortfolioSection;
  diversification: PortfolioSection;
  signs: PortfolioSection;
  audience: PortfolioSection;
  rtl: boolean;
}) {
  return (
    <>
      <section
        id={problem.id}
        aria-labelledby={`${problem.id}-title`}
        className="border-b border-line bg-page py-16 sm:py-20 lg:py-24"
      >
        <div className="dnh-site-shell grid items-start gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <SectionIntro section={problem} />
            <div className="mt-6 space-y-3">
              {problem.paragraphs?.slice(-3).map((text) => (
                <BodyCopy key={text}>{text}</BodyCopy>
              ))}
            </div>
          </div>
          <div>
            <ol className="relative border-s border-brand-primary/45 ps-6 sm:ps-9">
              {problem.paragraphs?.slice(0, 5).map((text) => (
                <li key={text} className="relative pb-7 last:pb-0">
                  <span className="absolute -start-[31px] top-2 size-3 bg-brand-primary ring-4 ring-page sm:-start-[43px]" />

                  <p className="text-lg font-bold leading-8 text-ink">{text}</p>
                </li>
              ))}
            </ol>
            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {problem.questions?.map((question) => (
                <li
                  key={question}
                  className="group flex min-h-24 items-center gap-4 border border-line bg-surface-soft p-5 transition duration-300 hover:border-brand-primary hover:bg-brand-secondary hover:text-page"
                >
                  <CircleHelp
                    className="shrink-0 text-brand-primary"
                    size={22}
                  />
                  <span className="text-base font-black leading-7">
                    {question}
                  </span>
                </li>
              ))}
            </ul>
            {problem.closing && (
              <p className="mt-7 border-s-4 border-brand-primary ps-5 text-lg font-black leading-9 text-ink">
                {problem.closing}
              </p>
            )}
            <SectionActions section={problem} rtl={rtl} />
          </div>
        </div>
      </section>

      <section
        id={diversification.id}
        aria-labelledby={`${diversification.id}-title`}
        className="border-b border-line bg-surface-soft py-16 sm:py-20 lg:py-24"
      >
        <div className="dnh-site-shell">
          <div className="grid gap-9 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
            <SectionIntro section={diversification} />
            <div className="space-y-3">
              {diversification.paragraphs?.map((text) => (
                <BodyCopy key={text}>{text}</BodyCopy>
              ))}
            </div>
          </div>
          <div className="relative mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {diversification.items?.map((item) => (
              <article
                key={item.title}
                className="group relative overflow-hidden border border-line bg-page p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-primary hover:shadow-[0_18px_45px_color-mix(in_srgb,var(--dnh-primary)_16%,transparent)]"
              >
                <Network className="mb-6 text-brand-primary transition-transform duration-300 group-hover:scale-110" />
                <h3 className="text-xl font-black leading-8 text-ink">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="mt-3 text-[15px] leading-7 text-ink-muted">
                    {item.description}
                  </p>
                )}
              </article>
            ))}
          </div>
          <div className="mt-8 grid overflow-hidden border border-brand-secondary sm:grid-cols-2">
            {diversification.questions?.map((question, index) => (
              <p
                key={question}
                className={`p-6 text-lg font-black leading-8 ${index ? "bg-brand-secondary text-page" : "bg-page text-ink"}`}
              >
                {question}
              </p>
            ))}
          </div>
          <SectionActions section={diversification} rtl={rtl} />
        </div>
      </section>

      <section
        id={signs.id}
        aria-labelledby={`${signs.id}-title`}
        className="border-b border-line bg-brand-secondary py-16 text-page sm:py-20 lg:py-24"
      >
        <div className="dnh-site-shell">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
            <SectionIntro section={signs} dark />
            <div>
              {signs.intro && <BodyCopy dark>{signs.intro}</BodyCopy>}
              <ScanSearch
                className="mt-7 text-brand-primary"
                size={46}
                strokeWidth={1.5}
              />
            </div>
          </div>
          <ol className="mt-12 grid gap-px bg-page/12 sm:grid-cols-2 lg:grid-cols-4">
            {signs.items?.map((item) => (
              <li
                key={item.title}
                className="group min-h-64 bg-brand-secondary p-6 transition duration-300 hover:bg-page hover:text-brand-secondary"
              >
                <span
                  aria-hidden="true"
                  className="block h-1 w-10 bg-brand-primary transition-[width] duration-300 group-hover:w-16"
                />
                <h3 className="mt-7 text-lg font-black leading-8">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-page/65 group-hover:text-ink-muted">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
          {signs.closing && (
            <p className="mt-8 max-w-5xl border-s-4 border-brand-primary ps-5 text-base leading-8 text-page/75">
              {signs.closing}
            </p>
          )}
          <SectionActions section={signs} rtl={rtl} dark />
        </div>
      </section>

      <section
        id={audience.id}
        aria-labelledby={`${audience.id}-title`}
        className="border-b border-line bg-page py-16 sm:py-20 lg:py-24"
      >
        <div className="dnh-site-shell grid items-start gap-10 lg:grid-cols-[.78fr_1.22fr] lg:gap-16">
          <aside className="relative lg:self-stretch">
            <div
              data-audience-sticky-intro
              className="lg:sticky lg:top-28 lg:h-fit"
            >
              <SectionIntro section={audience} />
              <UsersRound
                className="mt-8 text-brand-primary"
                size={48}
                strokeWidth={1.5}
              />
            </div>
          </aside>
          <div>
            <ul className="divide-y divide-line border-y border-line">
              {audience.items?.map((item) => (
                <li
                  key={item.title}
                  className="group grid gap-2 border-s-2 border-transparent py-5 ps-0 transition-[border-color,padding] duration-300 hover:border-brand-primary hover:ps-4 sm:grid-cols-[.72fr_1.28fr] sm:items-start sm:gap-5"
                >
                  <h3 className="text-lg font-black leading-8 text-ink transition-colors group-hover:text-brand-primary">
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
            <SectionActions section={audience} rtl={rtl} />
          </div>
        </div>
      </section>
    </>
  );
}
