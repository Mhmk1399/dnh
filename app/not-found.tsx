import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { ActionButton } from "@/components/ui/ActionButton";
import copy from "@/config/not-found.json";
import { getRequestLanguage } from "@/lib/site-seo";
import { getLocalizedSiteHref, stripLocalePrefix } from "@/lib/site-language";

const archive = "/knowledge/weekly-outlook";

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getRequestLanguage();
  return { title: copy[locale].title, robots: { index: false, follow: true } };
}

export default async function NotFound() {
  const { locale, pathname } = await getRequestLanguage();
  const text = copy[locale];
  const href = (path: string) => getLocalizedSiteHref(path, locale);
  const Arrow = locale === "fa" ? ArrowLeft : ArrowRight;
  const reportSlug = /^\/knowledge\/weekly-outlook\/([^/]+)\/?$/.exec(stripLocalePrefix(pathname))?.[1];
  let persianEdition: string | undefined;
  if (reportSlug && locale === "en") {
    const { getPublishedWeeklyOutlookReport } = await import("@/lib/public-weekly-outlooks");
    if (!(await getPublishedWeeklyOutlookReport(reportSlug, "en"))) {
      const report = await getPublishedWeeklyOutlookReport(reportSlug, "fa");
      if (report) persianEdition = getLocalizedSiteHref(`${archive}/${report.slug}`, "fa");
    }
  }
  const title = persianEdition ? copy.en.translationTitle : reportSlug ? text.reportTitle : text.title;
  const description = persianEdition ? copy.en.translationDescription : reportSlug ? text.reportDescription : text.description;
  const links = [
    { label: text.services, url: href("/services") },
    { label: reportSlug ? text.archive : text.knowledge, url: href(reportSlug ? archive : "/knowledge") },
    { label: text.contact, url: href("/contact") },
  ];

  return (
    <main aria-labelledby="not-found-title" className="grid min-h-svh grid-rows-[auto_1fr] bg-page text-ink min-[560px]:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] min-[560px]:grid-rows-1">
      <div className="relative isolate flex min-h-26 items-end overflow-hidden bg-brand-secondary px-6 py-4 text-white max-[559px]:h-[clamp(7rem,26svh,14rem)] min-[560px]:px-[8%] min-[560px]:py-[9%]">
        <Image src="/assets/images/financial-decision-assessment.webp" alt="" fill loading="eager" sizes="(min-width: 560px) 46vw, 100vw" className="-z-20 object-cover object-center" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-brand-secondary/90 via-brand-secondary/10 to-transparent" />
        <bdi dir="ltr" className="border-s-4 border-brand-primary ps-4 text-[clamp(3rem,8vw,8.5rem)] leading-none font-black">
          {new Intl.NumberFormat(locale, { useGrouping: false }).format(404)}
        </bdi>
      </div>
      <div className="flex min-w-0 flex-col justify-center px-[clamp(1.25rem,6vw,7rem)] py-[clamp(.75rem,3vh,3rem)] text-start">
        <div className="mx-auto w-full max-w-[34rem]">
          <Image src="/assets/images/LOGO.svg" width={150} height={50} alt="DNH" className="mb-[clamp(1rem,4vh,3rem)] w-28 sm:w-36" />
          <h1 id="not-found-title" className="text-balance text-[clamp(1.8rem,3.8vw,3.75rem)] leading-tight font-black">
            {title}
          </h1>
          <p className="mt-3 max-w-[44ch] text-sm leading-relaxed text-ink-muted sm:text-base">{description}</p>
          <div className="mt-[clamp(1rem,3vh,2rem)] flex flex-wrap gap-2">
            <ActionButton href={href("/")} variant="primary" shape="square" size="md" icon={Arrow}>{text.home}</ActionButton>
            {persianEdition && <Link href={persianEdition} hrefLang="fa" className="inline-flex min-h-11 items-center px-2 text-sm font-bold text-brand-accent underline underline-offset-4 focus-visible:outline-focus">{copy.en.persianEdition}</Link>}
          </div>
          <nav aria-label={text.linksLabel} className="mt-[clamp(1rem,4vh,3rem)] flex flex-wrap items-center gap-x-5 border-t border-line pt-1 sm:gap-x-6">
            {links.map(({ label, url }) => (
              <Link key={url} href={url} className="inline-flex min-h-11 items-center text-sm font-bold text-ink-muted underline-offset-4 hover:text-brand-accent hover:underline focus-visible:outline-focus">
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </main>
  );
}
