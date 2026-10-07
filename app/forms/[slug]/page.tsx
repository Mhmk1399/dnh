import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DynamicLeadForm } from "@/components/dynamic-forms/DynamicLeadForm";
import { getPublishedDynamicForm } from "@/lib/public-dynamic-form";

export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const form = await getPublishedDynamicForm(slug); return form ? { title: form.title, description: form.description } : { title: "فرم در دسترس نیست" }; }
export default async function PublicFormPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const form = await getPublishedDynamicForm(slug); if (!form) notFound();
  return <div className="min-h-screen bg-[linear-gradient(135deg,#f1f8f9_0%,#fff_50%,#f8fbfb_100%)] pt-28 sm:pt-32"><section className="mx-auto grid max-w-[1180px] items-start gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[.72fr_1fr] lg:px-10 lg:py-16"><header className="lg:sticky lg:top-36"><p dir="ltr" className="text-[10px] font-black tracking-[.22em] text-brand-primary">DNH / CONFIDENTIAL INTAKE</p><h1 className="mt-5 text-3xl font-black leading-[1.45] tracking-[-.04em] text-ink sm:text-4xl">{form.title}</h1><p className="mt-5 max-w-xl text-sm leading-8 text-ink-muted">{form.description}</p><div className="mt-8 border-r-2 border-brand-accent pr-4"><p className="text-xs font-black text-ink">فرایند دقیق، تصمیم بهتر</p><p className="mt-2 text-xs leading-7 text-ink-muted">پاسخ‌ها بر اساس نسخه فعلی فرم ثبت می‌شوند تا پرونده مشاوره شما قابل پیگیری و شفاف بماند.</p></div></header><DynamicLeadForm form={form}/></section></div>;
}
