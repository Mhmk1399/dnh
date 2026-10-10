import type { Metadata } from "next";
import Link from "next/link";
import { Types } from "mongoose";
import { notFound, redirect } from "next/navigation";
import { ArrowRight, Inbox } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import connect from "@/lib/data";
import DynamicForm from "@/lib/models/DynamicForm";
import FormSubmission from "@/lib/models/FormSubmission";
import User from "@/lib/models/User";

export const metadata: Metadata = { title: "پاسخ‌های فرم | مدیریت DNH" };
export const dynamic = "force-dynamic";

export default async function SubmissionsPage({ params }: { params: Promise<{ id: string }> }) {
  const currentUser = await getCurrentUser(); if (!currentUser) redirect("/login"); if (currentUser.role !== "admin") redirect("/dashboard");
  const { id } = await params; if (!Types.ObjectId.isValid(id)) notFound();
  let form: { title: string; slug: string; serviceName: string; revision: number } | null = null;
  let rows: Array<{ id: string; reference: string; formRevision: number; status: string; createdAt: Date; user?: string; answers: Array<{ fieldId: string; label: string; type: string; value: string | string[] | boolean }> }> = [];
  let loadError = false;
  try {
    await connect();
    const formRow = await DynamicForm.findById(id).select("title slug serviceName revision").lean(); if (!formRow) notFound();
    form = { title: formRow.title, slug: formRow.slug, serviceName: formRow.serviceName, revision: formRow.revision };
    const submissions = await FormSubmission.find({ formId: id }).sort({ createdAt: -1 }).limit(200).lean();
    const userIds = [...new Set(submissions.map((item) => item.userId ? String(item.userId) : "").filter(Boolean))];
    const users = userIds.length ? await User.find({ _id: { $in: userIds } }).select("firstName lastName phone").lean() : [];
    const userMap = new Map(users.map((user) => [String(user._id), `${user.firstName} ${user.lastName} · ${user.phone}`]));
    rows = submissions.map((item) => ({ id: String(item._id), reference: item.reference, formRevision: item.formRevision, status: item.status, createdAt: item.createdAt, user: item.userId ? userMap.get(String(item.userId)) : undefined, answers: item.answers.map((answer) => ({ fieldId: answer.fieldId, label: answer.label, type: answer.type, value: answer.value })) }));
  } catch { loadError = true; }
  if (!form && !loadError) notFound();
  return <div className="min-h-screen bg-[#f4f8f9] pt-24 sm:pt-28"><section className="mx-auto max-w-[1200px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
    <header className="border-b border-line pb-8"><Link href={`/admin/forms/${id}/edit`} className="inline-flex items-center gap-2 text-xs font-bold text-brand-primary"><ArrowRight size={14}/>بازگشت به ویرایش فرم</Link><p dir="ltr" className="mt-6 text-[10px] font-black tracking-[.22em] text-brand-primary">SUBMISSION DOSSIER / MAX 200</p><div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><h1 className="text-3xl font-black tracking-[-.04em] text-ink">{form?.title ?? "پاسخ‌های فرم"}</h1><p className="mt-3 text-sm text-ink-muted">{form?.serviceName} · نسخه فعلی {form?.revision.toLocaleString("fa-IR")}</p></div><span className="border border-line bg-white px-4 py-2 text-xs font-black">{rows.length.toLocaleString("fa-IR")} پاسخ اخیر</span></div></header>
    {loadError ? <div role="alert" className="mt-7 border border-red-200 bg-red-50 p-5 text-sm text-red-800">دریافت پاسخ‌ها ممکن نشد. اتصال پایگاه داده را بررسی کنید.</div> : rows.length === 0 ? <div className="mt-7 border border-dashed border-line bg-white py-20 text-center"><Inbox className="mx-auto h-10 w-10 text-brand-primary/30"/><h2 className="mt-5 text-lg font-black">هنوز پاسخی ثبت نشده است</h2><p className="mt-2 text-sm text-ink-muted">پس از انتشار و تکمیل فرم، پرونده‌ها اینجا نمایش داده می‌شوند.</p></div> : <div className="mt-7 space-y-4">{rows.map((submission, index) => <details key={submission.id} className="group border border-line bg-white" open={index === 0}><summary className="cursor-pointer list-none p-5 focus:outline-none focus:ring-4 focus:ring-brand-accent/10"><div className="flex flex-wrap items-center justify-between gap-4"><div><p dir="ltr" className="text-[10px] font-black tracking-[.16em] text-brand-primary">{submission.reference}</p><p className="mt-2 text-xs text-ink-muted">{new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium", timeStyle: "short" }).format(submission.createdAt)}</p></div><div className="text-left"><span className="border border-emerald-200 bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-800">{submission.status === "new" ? "جدید" : submission.status === "read" ? "خوانده‌شده" : "بایگانی"}</span><p dir="ltr" className="mt-2 text-[11px] font-bold text-ink-muted">FORM REV / {String(submission.formRevision).padStart(2, "0")}</p></div></div>{submission.user && <p className="mt-4 border-t border-dashed border-line pt-3 text-[11px] text-ink-muted">کاربر واردشده: {submission.user}</p>}</summary><div className="grid gap-px border-t border-line bg-line sm:grid-cols-2">{submission.answers.map((answer) => <div key={answer.fieldId} className="bg-[#fbfdfd] p-5"><p className="text-[10px] font-bold text-ink-muted">{answer.label}</p><AnswerValue value={answer.value}/><p dir="ltr" className="mt-4 text-[11px] font-bold tracking-wider text-ink-muted/70">{answer.type} / {answer.fieldId.slice(-8)}</p></div>)}</div></details>)}</div>}
  </section></div>;
}
function AnswerValue({ value }: { value: string | string[] | boolean }) { const text = typeof value === "boolean" ? value ? "بله" : "خیر" : Array.isArray(value) ? value.join("، ") : value || "—"; return <p className="mt-2 whitespace-pre-wrap text-sm font-bold leading-7 text-ink">{text}</p>; }

