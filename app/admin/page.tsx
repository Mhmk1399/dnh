import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ContactRound, Inbox, UserRound } from "lucide-react";
import { LogoutButton } from "@/components/dashboard/LogoutButton";
import { getCurrentUser } from "@/lib/auth";
import connect from "@/lib/data";
import Contact from "@/lib/models/Contact";
import Lead from "@/lib/models/Lead";
import User from "@/lib/models/User";

export const metadata: Metadata = { title: "مدیریت | DNH" };
export const dynamic = "force-dynamic";

function date(value: Date) { return new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value)); }

type AdminUserRow = { _id: unknown; firstName: string; lastName: string; phone: string; role: string; createdAt: Date };
type AdminContactRow = { _id: unknown; name: string; phone: string; email?: string; subject?: string; message: string; createdAt: Date };
type AdminLeadRow = { _id: unknown; name: string; phone: string; text: string; createdAt: Date };

export default async function AdminPage() {
  const currentUser = await getCurrentUser(); if (!currentUser) redirect("/login"); if (currentUser.role !== "admin") redirect("/dashboard");
  let loadError = false;
  let users: Array<Omit<AdminUserRow, "_id"> & { _id: string }> = [];
  let contacts: Array<Omit<AdminContactRow, "_id"> & { _id: string }> = [];
  let leads: Array<Omit<AdminLeadRow, "_id"> & { _id: string }> = [];
  try {
    await connect();
    const [userRows, contactRows, leadRows] = await Promise.all([
      User.find({}).select("firstName lastName phone role createdAt").sort({ createdAt: -1 }).limit(100).lean(),
      Contact.find({}).select("name phone email subject message createdAt").sort({ createdAt: -1 }).limit(100).lean(),
      Lead.find({}).select("name phone text createdAt").sort({ createdAt: -1 }).limit(100).lean(),
    ]);
    users = (userRows as AdminUserRow[]).map((row) => ({ ...row, _id: String(row._id) }));
    contacts = (contactRows as AdminContactRow[]).map((row) => ({ ...row, _id: String(row._id) }));
    leads = (leadRows as AdminLeadRow[]).map((row) => ({ ...row, _id: String(row._id) }));
  } catch { loadError = true; }

  return (
    <div className="min-h-screen bg-[#f4f8f9] pt-24 sm:pt-28">
      <section className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        <header className="flex flex-col gap-6 border-b border-line pb-8 sm:flex-row sm:items-end sm:justify-between"><div><p dir="ltr" className="text-[10px] font-black tracking-[0.22em] text-brand-primary">DNH / OPERATIONS DESK</p><h1 className="mt-4 text-3xl font-black tracking-[-0.04em] text-ink sm:text-4xl">دفتر مدیریت درخواست‌ها</h1><p className="mt-3 text-sm text-ink-muted">مدیر: {currentUser.firstName} {currentUser.lastName}</p></div><LogoutButton /></header>
        {loadError && <div role="alert" className="mt-8 border border-red-300 bg-red-50 p-5 text-sm text-red-900">دریافت داده‌ها ممکن نشد. اتصال پایگاه داده را بررسی و صفحه را دوباره بارگذاری کنید.</div>}
        <div className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-3"><Metric icon={UserRound} label="کاربران ثبت‌شده" value={users.length} code="USR" /><Metric icon={Inbox} label="پیام‌های تماس" value={contacts.length} code="CNT" /><Metric icon={ContactRound} label="سرنخ‌های اولیه" value={leads.length} code="LED" /></div>
        <AdminSection title="کاربران" code="REGISTRY / USERS" empty="هنوز کاربری ثبت‌نام نکرده است.">
          {users.length > 0 && <div className="overflow-x-auto"><table className="w-full min-w-[700px] border-collapse text-right text-xs"><thead><tr className="border-b border-line text-ink-muted"><Th>نام</Th><Th>موبایل</Th><Th>نقش</Th><Th>تاریخ ثبت</Th><Th>مرجع</Th></tr></thead><tbody>{users.map((user) => <tr key={user._id} className="border-b border-line/70 last:border-0"><Td strong>{user.firstName} {user.lastName}</Td><Td dir="ltr">{user.phone}</Td><Td><span className={`border px-2 py-1 text-[10px] font-bold ${user.role === "admin" ? "border-orange-300 bg-orange-50 text-orange-800" : "border-teal-200 bg-teal-50 text-teal-800"}`}>{user.role === "admin" ? "مدیر" : "کاربر"}</span></Td><Td>{date(user.createdAt)}</Td><Td dir="ltr">USR-{user._id.slice(-6).toUpperCase()}</Td></tr>)}</tbody></table></div>}
        </AdminSection>
        <AdminSection title="پیام‌های تماس" code="INTAKE / CONTACT" empty="هنوز پیام تماسی ثبت نشده است.">
          {contacts.length > 0 && <div className="grid gap-px bg-line lg:grid-cols-2">{contacts.map((item) => <article key={item._id} className="bg-white p-5"><div className="flex items-start justify-between gap-4"><div><h3 className="text-sm font-black text-ink">{item.name}</h3><p dir="ltr" className="mt-1 text-right text-xs text-ink-muted">{item.phone}{item.email ? ` · ${item.email}` : ""}</p></div><span dir="ltr" className="text-[9px] font-bold tracking-wider text-ink-muted">CNT-{item._id.slice(-6).toUpperCase()}</span></div>{item.subject && <p className="mt-4 text-xs font-bold text-brand-primary">{item.subject}</p>}<p className="mt-3 whitespace-pre-wrap text-xs leading-7 text-ink">{item.message}</p><p className="mt-4 border-t border-dashed border-line pt-3 text-[10px] text-ink-muted">{date(item.createdAt)}</p></article>)}</div>}
        </AdminSection>
        <AdminSection title="سرنخ‌های صفحه اصلی" code="INTAKE / LEADS" empty="هنوز درخواست اولیه‌ای ثبت نشده است.">
          {leads.length > 0 && <div className="overflow-x-auto"><table className="w-full min-w-[760px] border-collapse text-right text-xs"><thead><tr className="border-b border-line text-ink-muted"><Th>نام</Th><Th>موبایل</Th><Th>یادداشت</Th><Th>تاریخ</Th><Th>مرجع</Th></tr></thead><tbody>{leads.map((lead) => <tr key={lead._id} className="border-b border-line/70 align-top last:border-0"><Td strong>{lead.name}</Td><Td dir="ltr">{lead.phone}</Td><Td><p className="max-w-xl whitespace-pre-wrap leading-7">{lead.text}</p></Td><Td>{date(lead.createdAt)}</Td><Td dir="ltr">LED-{lead._id.slice(-6).toUpperCase()}</Td></tr>)}</tbody></table></div>}
        </AdminSection>
      </section>
    </div>
  );
}

function Metric({ icon: Icon, label, value, code }: { icon: typeof UserRound; label: string; value: number; code: string }) { return <div className="flex items-center justify-between bg-white p-5 sm:p-6"><div><p className="text-xs font-bold text-ink-muted">{label}</p><p className="mt-2 text-3xl font-black text-ink">{value.toLocaleString("fa-IR")}</p></div><div className="text-left"><Icon className="mr-auto h-5 w-5 text-brand-primary" /><p dir="ltr" className="mt-3 text-[9px] font-black tracking-[0.18em] text-ink-muted">{code} / 100</p></div></div>; }
function AdminSection({ title, code, empty, children }: { title: string; code: string; empty: string; children: React.ReactNode }) { const hasContent = Boolean(children); return <section className="mt-8 border border-line bg-white"><header className="flex items-center justify-between gap-4 border-b border-line px-5 py-4"><h2 className="text-base font-black text-ink">{title}</h2><span dir="ltr" className="text-[9px] font-black tracking-[0.18em] text-ink-muted">{code}</span></header>{hasContent ? children : <div className="p-10 text-center text-sm text-ink-muted">{empty}</div>}</section>; }
function Th({ children }: { children: React.ReactNode }) { return <th className="px-5 py-4 font-bold">{children}</th>; }
function Td({ children, strong, dir }: { children: React.ReactNode; strong?: boolean; dir?: "ltr" }) { return <td dir={dir} className={`px-5 py-4 ${dir ? "text-right" : ""} ${strong ? "font-bold text-ink" : "text-ink-muted"}`}>{children}</td>; }
