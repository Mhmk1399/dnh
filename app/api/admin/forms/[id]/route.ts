import { Types } from "mongoose";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import connect from "@/lib/data";
import { FORM_STATUSES, type DynamicFormStatus } from "@/lib/dynamic-forms";
import { FormDefinitionError, validateFormDefinition } from "@/lib/dynamic-form-validation";
import DynamicForm from "@/lib/models/DynamicForm";
import { readJson } from "@/lib/validation";

async function authorize() { const user = await getCurrentUser(); return user?.role === "admin" ? user : null; }

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await authorize()) return NextResponse.json({ message: "دسترسی مدیر لازم است." }, { status: 403 });
  const { id } = await params;
  if (!Types.ObjectId.isValid(id)) return NextResponse.json({ message: "شناسه فرم معتبر نیست." }, { status: 400 });
  try {
    await connect();
    const form = await DynamicForm.findById(id).lean();
    if (!form) return NextResponse.json({ message: "فرم پیدا نشد." }, { status: 404 });
    return NextResponse.json({ form: { ...form, _id: String(form._id), createdBy: String(form.createdBy) } });
  } catch { return NextResponse.json({ message: "دریافت فرم انجام نشد." }, { status: 503 }); }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await authorize()) return NextResponse.json({ message: "دسترسی مدیر لازم است." }, { status: 403 });
  const { id } = await params;
  if (!Types.ObjectId.isValid(id)) return NextResponse.json({ message: "شناسه فرم معتبر نیست." }, { status: 400 });
  const body = await readJson(request);
  if (!body) return NextResponse.json({ message: "بدنه درخواست معتبر نیست." }, { status: 400 });
  const expectedRevision = Number(body.expectedRevision);
  const action = typeof body.action === "string" ? body.action : "save";
  const statusMap: Record<string, DynamicFormStatus> = { save: "draft", publish: "published", unpublish: "draft", archive: "archived" };
  const requestedStatus = statusMap[action];
  if (!requestedStatus || !FORM_STATUSES.includes(requestedStatus)) return NextResponse.json({ message: "عملیات معتبر نیست." }, { status: 400 });
  if (!Number.isInteger(expectedRevision) || expectedRevision < 1) return NextResponse.json({ message: "نسخه مورد انتظار معتبر نیست." }, { status: 400 });
  try {
    const definition = validateFormDefinition(body, requestedStatus);
    await connect();
    const update = { ...definition, status: requestedStatus, revision: expectedRevision + 1,
      ...(requestedStatus === "published" ? { publishedAt: new Date() } : requestedStatus === "draft" ? { publishedAt: null } : {}) };
    const form = await DynamicForm.findOneAndUpdate({ _id: id, revision: expectedRevision }, { $set: update }, { new: true, runValidators: true }).lean();
    if (!form) {
      const exists = await DynamicForm.exists({ _id: id });
      return NextResponse.json({ message: exists ? "این فرم در پنجره دیگری تغییر کرده است. صفحه را تازه‌سازی کنید." : "فرم پیدا نشد.", code: exists ? "REVISION_CONFLICT" : "NOT_FOUND" }, { status: exists ? 409 : 404 });
    }
    return NextResponse.json({ message: action === "publish" ? "فرم منتشر شد." : action === "archive" ? "فرم بایگانی شد." : "تغییرات ذخیره شد.", revision: form.revision, status: form.status });
  } catch (error) {
    if (error instanceof FormDefinitionError) return NextResponse.json({ message: "تعریف فرم نیاز به اصلاح دارد.", errors: error.issues }, { status: 422 });
    if (typeof error === "object" && error && "code" in error && error.code === 11000) return NextResponse.json({ message: "این شناسه مسیر قبلاً استفاده شده است.", errors: { slug: "شناسه مسیر تکراری است." } }, { status: 409 });
    return NextResponse.json({ message: "ذخیره تغییرات انجام نشد." }, { status: 503 });
  }
}
