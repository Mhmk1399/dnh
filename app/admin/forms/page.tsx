import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, ClipboardList, Eye, FilePenLine, Plus } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import connect from "@/lib/data";
import DynamicForm from "@/lib/models/DynamicForm";
import FormSubmission from "@/lib/models/FormSubmission";

export const metadata: Metadata = { title: "فرم‌های پویا | مدیریت DNH" };
export const dynamic = "force-dynamic";

const statusLabel = { draft: "پیش‌نویس", published: "منتشرشده", archived: "بایگانی" } as const;
const typeLabel = { single_step: "تک‌مرحله‌ای", multi_step: "چندمرحله‌ای", service_assessment: "ارزیابی خدمت" } as const;

export default async function FormsPage({ searchParams }: { searchParams: Promise<{ q?: string; status?: string }> }) {
  const user = await getCurrentUser(); if (!user) redirect("/login"); if (user.role !== "admin") redirect("/dashboard");
  const query = await searchParams;
  let forms: Array<{ id: string; title: string; slug: string; status: keyof typeof statusLabel; formType: keyof typeof typeLabel; serviceName: string; revision: number; updatedAt: Date; submissions: number }> = [];
  let loadError = false;
  try {
    await connect();
    const filter: Record<string, unknown> = {};
    if (["draft", "published", "archived"].includes(query.status ?? "")) filter.status = query.status;
    if (query.q?.trim()) { const search = query.q.trim().slice(0, 80).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); filter.$or = [{ title: { $regex: search, $options: "i" } }, { slug: { $regex: search, $options: "i" } }, { serviceName: { $regex: search, $options: "i" } }]; }
    const rows = await DynamicForm.find(filter).sort({ updatedAt: -1 }).limit(150).lean();
    const counts = await FormSubmission.aggregate<{ _id: unknown; count: number }>([{ $group: { _id: "$formId", count: { $sum: 1 } } }]);
    const countMap = new Map(counts.map((item) => [String(item._id), item.count]));
    forms = rows.map((row) => ({ id: String(row._id), title: row.title, slug: row.slug, status: row.status, formType: row.formType, serviceName: row.serviceName, revision: row.revision, updatedAt: row.updatedAt, submissions: countMap.get(String(row._id)) ?? 0 }));
  } catch { loadError = true; }
  return <div className="min-h-screen bg-[#f4f8f9] pt-24 sm:pt-28"><section className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
    <header className="flex flex-col gap-6 border-b border-line pb-8 sm:flex-row sm:items-end sm:justify-between"><div><Link href="/admin" className="text-xs font-bold text-brand-primary">دفتر مدیریت / بازگشت</Link><p dir="ltr" className="mt-5 text-[10px] font-black tracking-[.22em] text-brand-primary">DNH / FORM PROTOCOLS</p><h1 className="mt-2 text-3xl font-black tracking-[-.04em] text-ink sm:text-4xl">فرم‌های دریافت سرنخ</h1><p className="mt-3 max-w-2xl text-sm leading-7 text-ink-muted">پروتکل‌های چندمرحله‌ای هر خدمت را طراحی، منتشر و پاسخ‌های نسخه‌بندی‌شده را بررسی کنید.</p></div><Link href="/admin/forms/new" className="inline-flex items-center justify-center gap-2 bg-brand-accent px-5 py-3 text-xs font-black text-white"><Plus size={16}/>ساخت فرم جدید</Link></header>
    <form className="mt-7 grid gap-3 border border-line bg-white p-4 sm:grid-cols-[1fr_220px_auto]"><label className="text-xs font-bold">جست‌وجو<input name="q" defaultValue={query.q} placeholder="عنوان، مسیر یا خدمت" className="mt-2 w-full border border-line px-3 py-2.5 outline-none focus:border-brand-accent"/></label><label className="text-xs font-bold">وضعیت<select name="status" defaultValue={query.status} className="mt-2 w-full border border-line px-3 py-2.5 outline-none focus:border-brand-accent"><option value="">همه وضعیت‌ها</option><option value="draft">پیش‌نویس</option><option value="published">منتشرشده</option><option value="archived">بایگانی</option></select></label><button className="self-end bg-brand-primary px-5 py-3 text-xs font-black text-white">اعمال فیلتر</button></form>
    {loadError ? <div role="alert" className="mt-6 border border-red-200 bg-red-50 p-5 text-sm text-red-800">دریافت فرم‌ها ممکن نشد. اتصال پایگاه داده را بررسی کنید.</div> : forms.length === 0 ? <div className="mt-6 border border-dashed border-line bg-white px-6 py-20 text-center"><ClipboardList className="mx-auto h-10 w-10 text-brand-primary/30"/><h2 className="mt-5 text-lg font-black">فرمی در این پرونده نیست</h2><p className="mt-2 text-sm text-ink-muted">یک فرم جدید بسازید یا فیلترها را تغییر دهید.</p></div> : <div className="mt-6 overflow-hidden border border-line bg-line"><div className="hidden grid-cols-[1.5fr_1fr_160px_120px_100px_180px] gap-px text-[10px] font-black text-ink-muted lg:grid"><span className="bg-[#edf5f7] p-4">فرم / مسیر عمومی</span><span className="bg-[#edf5f7] p-4">خدمت مرتبط</span><span className="bg-[#edf5f7] p-4">نوع / وضعیت</span><span className="bg-[#edf5f7] p-4">نسخه / پاسخ</span><span className="bg-[#edf5f7] p-4">آخرین تغییر</span><span className="bg-[#edf5f7] p-4">عملیات</span></div>{forms.map((form) => <article key={form.id} className="grid gap-px border-t border-line bg-line first:border-0 lg:grid-cols-[1.5fr_1fr_160px_120px_100px_180px]"><div className="bg-white p-4"><h2 className="text-sm font-black">{form.title}</h2><p dir="ltr" className="mt-2 text-left text-[10px] text-ink-muted">/forms/{form.slug}</p></div><div className="bg-white p-4 text-xs leading-6">{form.serviceName}</div><div className="bg-white p-4 text-xs"><span className={`border px-2 py-1 text-[10px] font-bold ${form.status === "published" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : form.status === "archived" ? "border-slate-200 bg-slate-100 text-slate-700" : "border-orange-200 bg-orange-50 text-orange-800"}`}>{statusLabel[form.status]}</span><p className="mt-3 text-[10px] text-ink-muted">{typeLabel[form.formType]}</p></div><div className="bg-white p-4 text-xs"><p dir="ltr" className="font-black">REV / {String(form.revision).padStart(2, "0")}</p><p className="mt-2 text-ink-muted">{form.submissions.toLocaleString("fa-IR")} پاسخ</p></div><div className="bg-white p-4 text-[10px] leading-6 text-ink-muted">{new Intl.DateTimeFormat("fa-IR", { dateStyle: "short" }).format(form.updatedAt)}</div><div className="flex items-center gap-2 bg-white p-4"><Link title="ویرایش" href={`/admin/forms/${form.id}/edit`} className="border border-line p-2 hover:border-brand-accent"><FilePenLine size={15}/></Link>{form.status === "published" && <Link title="مشاهده عمومی" href={`/forms/${form.slug}`} className="border border-line p-2 hover:border-brand-accent"><Eye size={15}/></Link>}<Link href={`/admin/forms/${form.id}/submissions`} className="mr-auto inline-flex items-center gap-1 text-[10px] font-black text-brand-primary">پاسخ‌ها<ArrowLeft size={13}/></Link></div></article>)}</div>}
  </section></div>;
}
