import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DynamicLeadForm } from "@/components/dynamic-forms/DynamicLeadForm";
import { getPublishedDynamicForm } from "@/lib/public-dynamic-form";
import { localizePageMetadata } from "@/lib/site-seo";
import { normalizeSiteLocale } from "@/lib/site-language";

export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { slug, locale } = await params;
  const form = await getPublishedDynamicForm(slug);
  return localizePageMetadata(
    form
      ? { title: form.title, description: form.description }
      : { title: locale === "en" ? "Form unavailable" : "فرم در دسترس نیست", robots: { index: false, follow: false } },
    `/forms/${slug}`,
    normalizeSiteLocale(locale),
  );
}
export default async function PublicFormPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const form = await getPublishedDynamicForm(slug); if (!form) notFound();
  return (
    <div dir={form.locale === "en" ? "ltr" : "rtl"} className="min-h-screen bg-surface-soft pt-24 sm:pt-32">
      <section className="dnh-site-shell grid items-start gap-6 py-8 sm:gap-10 lg:grid-cols-[minmax(0,.72fr)_minmax(0,1fr)] lg:py-16">
        <header className="min-w-0 lg:sticky lg:top-36">
          <h1 dir="auto" className="text-start text-3xl font-black leading-normal text-ink sm:text-4xl">{form.title}</h1>
          <p dir="auto" className="mt-4 max-w-prose text-start text-base leading-8 text-ink-muted">{form.description}</p>
        </header>
        <DynamicLeadForm form={form} />
      </section>
    </div>
  );
}
