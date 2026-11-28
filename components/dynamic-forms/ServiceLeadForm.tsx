import { connection } from "next/server";
import { DynamicLeadForm } from "@/components/dynamic-forms/DynamicLeadForm";
import { getPublishedServiceForm } from "@/lib/public-dynamic-form";
import { normalizeSiteLocale, SITE_LANGUAGES } from "@/lib/site-language";

export async function ServiceLeadForm({ serviceKey, routeLocale }: { serviceKey: string; routeLocale: string }) {
  await connection();
  const locale = normalizeSiteLocale(routeLocale);
  const form = await getPublishedServiceForm(serviceKey, locale);
  if (!form) return null;

  return (
    <section id="service-form" aria-labelledby="service-form-title" dir={SITE_LANGUAGES[locale].direction} className="scroll-mt-28 border-t border-line bg-surface-soft py-12 sm:py-16">
      <div className="dnh-site-shell">
        <div className="mx-auto max-w-4xl">
          <h2 id="service-form-title" className="mb-4 text-2xl font-black text-ink sm:text-3xl">{form.title}</h2>
          {form.description && <p className="mb-6 text-sm leading-7 text-ink-muted">{form.description}</p>}
          <DynamicLeadForm form={form} embedded />
        </div>
      </div>
    </section>
  );
}
