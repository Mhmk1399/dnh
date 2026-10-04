import { NextResponse } from "next/server";
import connect from "@/lib/data";
import { getCurrentUser } from "@/lib/auth";
import Contact from "@/lib/models/Contact";
import { cleanText, isValidEmail, isValidPhone, normalizeIranianPhone, readJson, type FieldErrors } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await readJson(request);
  if (!body) return NextResponse.json({ message: "اطلاعات ارسالی معتبر نیست." }, { status: 400 });

  const name = cleanText(body.name, 100);
  const phone = normalizeIranianPhone(cleanText(body.phone, 30));
  const email = cleanText(body.email, 160).toLowerCase();
  const subject = cleanText(body.subject, 140);
  const message = cleanText(body.message, 3000);
  const errors: FieldErrors = {};
  if (name.length < 2) errors.name = "نام و نام خانوادگی را وارد کنید.";
  if (!isValidPhone(phone)) errors.phone = "شماره موبایل معتبر وارد کنید.";
  if (!isValidEmail(email)) errors.email = "ایمیل واردشده معتبر نیست.";
  if (message.length < 10) errors.message = "پیام باید دست‌کم ۱۰ نویسه باشد.";
  if (Object.keys(errors).length) return NextResponse.json({ message: "لطفاً موارد مشخص‌شده را اصلاح کنید.", errors }, { status: 422 });

  try {
    await connect();
    const user = await getCurrentUser();
    const record = await Contact.create({ name, phone, email: email || undefined, subject: subject || undefined, message, userId: user?.id || null });
    return NextResponse.json({ message: "درخواست شما با موفقیت ثبت شد.", reference: `CNT-${String(record._id).slice(-6).toUpperCase()}` }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "در حال حاضر ثبت درخواست ممکن نیست. لطفاً کمی بعد دوباره تلاش کنید." }, { status: 503 });
  }
}
