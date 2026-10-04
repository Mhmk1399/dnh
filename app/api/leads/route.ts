import { NextResponse } from "next/server";
import connect from "@/lib/data";
import { getCurrentUser } from "@/lib/auth";
import Lead from "@/lib/models/Lead";
import { cleanText, isValidPhone, normalizeIranianPhone, readJson, type FieldErrors } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await readJson(request);
  if (!body) return NextResponse.json({ message: "اطلاعات ارسالی معتبر نیست." }, { status: 400 });
  const name = cleanText(body.name, 100);
  const phone = normalizeIranianPhone(cleanText(body.phone, 30));
  const text = cleanText(body.text, 1200);
  const errors: FieldErrors = {};
  if (name.length < 2) errors.name = "نام خود را وارد کنید.";
  if (!isValidPhone(phone)) errors.phone = "شماره موبایل معتبر وارد کنید.";
  if (text.length < 5) errors.text = "موضوع گفت‌وگو را کمی دقیق‌تر بنویسید.";
  if (Object.keys(errors).length) return NextResponse.json({ message: "لطفاً موارد مشخص‌شده را اصلاح کنید.", errors }, { status: 422 });

  try {
    await connect();
    const user = await getCurrentUser();
    const record = await Lead.create({ name, phone, text, userId: user?.id || null });
    return NextResponse.json({ message: "درخواست بررسی ثبت شد؛ با شما تماس می‌گیریم.", reference: `LEAD-${String(record._id).slice(-6).toUpperCase()}` }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "ارتباط با سامانه ثبت برقرار نشد. لطفاً دوباره تلاش کنید." }, { status: 503 });
  }
}
