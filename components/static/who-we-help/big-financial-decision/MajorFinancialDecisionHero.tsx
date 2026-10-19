import Image from "next/image";
import type { SiteLocale } from "@/lib/site-language";
import {
  MajorDecisionActions,
  MajorDecisionEyebrow,
} from "./MajorDecisionShared";
import type { MajorDecisionSection } from "./majorDecisionTypes";

export function MajorFinancialDecisionHero({
  section,
  locale,
  rtl,
}: {
  section: MajorDecisionSection;
  locale: SiteLocale;
  rtl: boolean;
}) {
  const paragraphs = section.paragraphs ?? [];
  const introduction = paragraphs.slice(0, 2);
  const details = paragraphs.slice(2);
  const directionalScrim = rtl
    ? "bg-[linear-gradient(to_left,color-mix(in_srgb,var(--dnh-text)_98%,transparent)_0%,color-mix(in_srgb,var(--dnh-text)_90%,transparent)_38%,color-mix(in_srgb,var(--dnh-text)_25%,transparent)_100%)]"
    : "bg-[linear-gradient(to_right,color-mix(in_srgb,var(--dnh-text)_98%,transparent)_0%,color-mix(in_srgb,var(--dnh-text)_90%,transparent)_38%,color-mix(in_srgb,var(--dnh-text)_25%,transparent)_100%)]";

  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="relative isolate overflow-hidden border-b border-line bg-brand-secondary text-page"
    >
      <div className="relative min-h-svh">
        <Image
          src="/assets/images/big-financial-decision4.webp"
          alt={
            locale === "fa"
              ? "تصویر تحلیلی برای یک تصمیم مالی بزرگ"
              : "Analytical context for a major financial decision"
          }
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-brand-secondary/70 via-brand-secondary/45 to-brand-secondary lg:hidden"
        />
        <div
          aria-hidden="true"
          className={`absolute inset-0 hidden lg:block ${directionalScrim}`}
        />
        <div className="dnh-site-shell relative z-10 flex min-h-svh items-end pb-14 pt-[calc(8rem+env(safe-area-inset-top))] sm:pb-16 sm:pt-40 lg:items-center lg:py-40">
          <div className="w-full min-w-0 lg:w-[70%] lg:max-w-[62rem]">
            <MajorDecisionEyebrow section={section} dark />
            <h1
              id={`${section.id}-title`}
              className="mt-5 max-w-[24ch] text-pretty text-[clamp(2rem,8vw,3rem)] font-extrabold leading-[1.55] tracking-[-0.03em] sm:text-[3.25rem] lg:max-w-[20ch] lg:text-[clamp(3rem,4.5vw,4.5rem)] lg:leading-[1.35]"
            >
              {section.heading}
            </h1>
            <div className="mt-6 max-w-[78ch] space-y-3 border-s-2 border-page/40 ps-4 sm:ps-5">
              {introduction.map((paragraph, index) => (
                <p
                  key={`${section.id}-intro-${index}`}
                  className="text-[14px] font-normal leading-[1.95] text-page/90 sm:text-[16px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <MajorDecisionActions section={section} dark rtl={rtl} />
          </div>
        </div>
      </div>
      {details.length ? (
        <div className="relative z-10 border-t border-page/15 bg-brand-secondary">
          <div className="dnh-site-shell py-10 sm:py-12">
            <ol className="grid border-s border-t border-page/15 sm:grid-cols-2 lg:grid-cols-4">
              {details.map((paragraph, index) => (
                <li
                  key={`${section.id}-detail-${index}`}
                  className="border-b border-e border-page/15 p-5 sm:p-6"
                >
                  <bdi
                    dir="ltr"
                    className="text-[10px] font-bold tracking-[.18em] text-brand-primary"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </bdi>
                  <p className="mt-3 text-start text-[13px] leading-[1.9] text-page/78 sm:text-[14px]">
                    {paragraph}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      ) : null}
    </section>
  );
}
