import { ChevronDown, List } from "lucide-react";
import shell from "@/config/site-shell.json";
import type { SiteLocale } from "@/lib/site-language";

type SectionLink = { id: string; eyebrow: string };

export function PageSectionIndex({ sections, locale }: { sections: SectionLink[]; locale: SiteLocale }) {
  const title = shell[locale].navbar.quickAccess;
  return (
    <nav aria-label={title} className="border-y border-line bg-surface-soft text-ink">
      <details className="group/index dnh-site-shell">
        <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 py-2 text-sm font-bold focus-visible:outline-2 focus-visible:outline-focus [&::-webkit-details-marker]:hidden">
          <List size={18} aria-hidden="true" className="text-brand-accent" />
          {title}
          <ChevronDown size={16} aria-hidden="true" className="ms-auto group-open/index:rotate-180" />
        </summary>
        <ul className="mb-4 grid gap-x-6 border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {sections.map(({ id, eyebrow }) => (
            <li key={id}>
              <a href={`#${id}`} className="flex min-h-11 items-center gap-3 border-b border-line px-1 py-2 text-start text-sm leading-6 text-ink-muted hover:text-brand-accent hover:underline focus-visible:outline-2 focus-visible:outline-focus">
                {eyebrow}
              </a>
            </li>
          ))}
        </ul>
      </details>
    </nav>
  );
}
