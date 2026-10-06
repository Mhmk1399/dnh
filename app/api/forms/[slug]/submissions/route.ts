import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import connect from "@/lib/data";
import DynamicForm from "@/lib/models/DynamicForm";
import FormSubmission from "@/lib/models/FormSubmission";
import { SubmissionError, validateSubmission } from "@/lib/submission-validation";
import { cleanText, readJson } from "@/lib/validation";

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const body = await readJson(request);
  if (!body) return NextResponse.json({ message: "اطلاعات ارسالی معتبر نیست." }, { status: 400 });
  if (cleanText(body.company, 200)) return NextResponse.json({ message: "درخواست قابل پذیرش نیست." }, { status: 400 });
  try {
    await connect();
    const form = await DynamicForm.findOne({ slug, status: "published" }).lean();
    if (!form) return NextResponse.json({ message: "این فرم در دسترس نیست." }, { status: 404 });
    const answers = validateSubmission({ steps: form.steps }, body);
    const user = await getCurrentUser();
    const reference = `DNH-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${randomBytes(3).toString("hex").toUpperCase()}`;
    await FormSubmission.create({
      formId: form._id, formSlug: form.slug, formTitle: form.title, formRevision: form.revision,
      serviceKey: form.serviceKey, serviceName: form.serviceName, serviceRoute: form.serviceRoute,
      answers, userId: user?.id ?? null, status: "new", reference,
    });
    return NextResponse.json({ message: form.successMessage, reference }, { status: 201 });
  } catch (error) {
    if (error instanceof SubmissionError) return NextResponse.json({ message: "لطفاً موارد مشخص‌شده را اصلاح کنید.", errors: error.issues }, { status: 422 });
    return NextResponse.json({ message: "ثبت درخواست انجام نشد. لطفاً دوباره تلاش کنید." }, { status: 503 });
  }
}
