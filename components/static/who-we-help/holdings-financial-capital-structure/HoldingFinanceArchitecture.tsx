import Image from "next/image";
import {
  Banknote,
  CircleDollarSign,
  Droplets,
  GitFork,
  Landmark,
  Scale,
} from "lucide-react";
import type { SiteLocale } from "@/lib/site-language";
import { HoldingActions, HoldingCopy, HoldingIntro } from "./HoldingShared";
import type { HoldingSection } from "./holdingTypes";

export function HoldingFinanceArchitecture({
  whole,
  liquidity,
  financing,
  allocation,
  governance,
  locale,
  rtl,
}: {
  whole: HoldingSection;
  liquidity: HoldingSection;
  financing: HoldingSection;
  allocation: HoldingSection;
  governance: HoldingSection;
  locale: SiteLocale;
  rtl: boolean;
}) {
  return (
    <>
      <section
        id={whole.id}
        aria-labelledby={`${whole.id}-title`}
        className="border-b border-line bg-surface-soft py-16 sm:py-20 lg:py-24"
      >
        <div className="dnh-site-shell grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <HoldingIntro section={whole} />
            {whole.intro && (
              <div className="mt-6">
                <HoldingCopy>{whole.intro}</HoldingCopy>
              </div>
            )}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {whole.items?.map((item) => (
                <article
                  key={item.title}
                  className="border-s-2 border-brand-primary bg-page p-5"
                >
                  <h3 className="text-lg font-black leading-8 text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-7 text-ink-muted">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
          <figure className="relative min-h-[38rem] overflow-hidden bg-brand-secondary">
            <Image
              src="/assets/images/complex-financial-structure.webp"
              alt={
                locale === "fa"
                  ? "ساختار یکپارچه مالی گروه"
                  : "Integrated group financial structure"
              }
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover opacity-70"
            />
            <div className="absolute inset-6 border border-page/30" />
            <div className="absolute inset-x-0 bottom-0 space-y-2 bg-brand-secondary/90 p-6">
              {whole.closing_paragraphs?.map((t) => (
                <p key={t} className="text-lg font-black leading-8 text-page">
                  {t}
                </p>
              ))}
            </div>
          </figure>
        </div>
        <div className="dnh-site-shell">
          <HoldingActions section={whole} rtl={rtl} />
        </div>
      </section>
      <section
        id={liquidity.id}
        aria-labelledby={`${liquidity.id}-title`}
        className="border-b border-line bg-page py-16 sm:py-20 lg:py-24"
      >
        <div className="dnh-site-shell grid items-start gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <aside className="relative lg:self-stretch">
            <div className="lg:sticky lg:top-28 lg:h-fit">
              <HoldingIntro section={liquidity} />
              <Droplets
                className="mt-8 text-brand-primary"
                size={48}
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </div>
          </aside>
          <div>
            <div className="mb-8 space-y-3">
              {liquidity.paragraphs?.map((t) => (
                <HoldingCopy key={t}>{t}</HoldingCopy>
              ))}
            </div>
            <ul className="relative border-s border-brand-primary/50 ps-7">
              {liquidity.questions?.map((q) => (
                <li key={q} className="relative pb-7 last:pb-0">
                  <span className="absolute -start-[34px] top-2 size-3 rounded-full bg-brand-primary ring-4 ring-page" />
                  <p className="text-lg font-black leading-8 text-ink">{q}</p>
                </li>
              ))}
            </ul>
            {liquidity.closing && (
              <p className="mt-8 border-s-4 border-brand-primary ps-5 text-base leading-8 text-ink-muted">
                {liquidity.closing}
              </p>
            )}
            <HoldingActions section={liquidity} rtl={rtl} />
          </div>
        </div>
      </section>
      <section
        id={financing.id}
        aria-labelledby={`${financing.id}-title`}
        className="border-b border-line bg-brand-secondary py-16 text-page sm:py-20 lg:py-24"
      >
        <div className="dnh-site-shell">
          <div className="grid gap-9 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
            <div>
              <HoldingIntro section={financing} dark />
              <Landmark
                className="mt-8 text-brand-primary"
                size={48}
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </div>
            <div className="space-y-3">
              {financing.paragraphs?.map((t) => (
                <HoldingCopy key={t} dark>
                  {t}
                </HoldingCopy>
              ))}
            </div>
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {financing.questions?.map((q) => (
              <li key={q} className="border border-page/15 p-6">
                <p className="text-lg font-black leading-8">{q}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3 border-s-4 border-brand-primary ps-6 lg:grid-cols-2">
            {financing.closing_paragraphs?.map((t) => (
              <HoldingCopy key={t} dark>
                {t}
              </HoldingCopy>
            ))}
          </div>
          <HoldingActions section={financing} rtl={rtl} dark />
        </div>
      </section>
      <section
        id={allocation.id}
        aria-labelledby={`${allocation.id}-title`}
        className="border-b border-line bg-surface-soft py-16 sm:py-20 lg:py-24"
      >
        <div className="dnh-site-shell">
          <div className="grid gap-9 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
            <HoldingIntro section={allocation} />
            <div className="space-y-3">
              {allocation.paragraphs?.map((t) => (
                <HoldingCopy key={t}>{t}</HoldingCopy>
              ))}
            </div>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {allocation.items?.map((item, i) => {
              const Icon = [
                CircleDollarSign,
                Banknote,
                Droplets,
                Scale,
                Landmark,
                GitFork,
              ][i];
              return (
                <article
                  key={item.title}
                  className="group border-t-4 border-brand-primary bg-page p-6 shadow-[0_16px_42px_color-mix(in_srgb,var(--dnh-primary)_10%,transparent)] transition-colors duration-300 hover:bg-brand-secondary hover:text-page"
                >
                  <Icon className="text-brand-primary" aria-hidden="true" />
                  <h3 className="mt-6 text-xl font-black leading-8">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-7 text-ink-muted group-hover:text-page/70">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
          <div className="mt-8 space-y-3 border-s-4 border-brand-primary ps-6">
            {allocation.closing_paragraphs?.map((t) => (
              <HoldingCopy key={t}>{t}</HoldingCopy>
            ))}
          </div>
          <HoldingActions section={allocation} rtl={rtl} />
        </div>
      </section>
      <section
        id={governance.id}
        aria-labelledby={`${governance.id}-title`}
        className="border-b border-line bg-page py-16 sm:py-20 lg:py-24"
      >
        <div className="dnh-site-shell grid items-start gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-16">
          <aside className="relative lg:self-stretch">
            <div className="lg:sticky lg:top-28 lg:h-fit">
              <HoldingIntro section={governance} />
              <div className="mt-6 space-y-3">
                {governance.paragraphs?.map((t) => (
                  <HoldingCopy key={t}>{t}</HoldingCopy>
                ))}
              </div>
            </div>
          </aside>
          <div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {governance.questions?.map((q) => (
                <li
                  key={q}
                  className="group border border-line bg-surface-soft p-5 transition-colors hover:border-brand-primary hover:bg-brand-secondary hover:text-page"
                >
                  <p className="text-lg font-black leading-8">{q}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8 space-y-3 border-s-4 border-brand-primary ps-6">
              {governance.closing_paragraphs?.map((t) => (
                <HoldingCopy key={t}>{t}</HoldingCopy>
              ))}
            </div>
            <HoldingActions section={governance} rtl={rtl} />
          </div>
        </div>
      </section>
    </>
  );
}
