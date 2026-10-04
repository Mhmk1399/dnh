import { NextResponse } from "next/server";
import { createSession, hashPassword } from "@/lib/auth";
import connect from "@/lib/data";
import User from "@/lib/models/User";
import { cleanText, isValidPhone, normalizeIranianPhone, readJson, type FieldErrors } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await readJson(request);
  if (!body) return NextResponse.json({ message: "اطلاعات ارسالی معتبر نیست." }, { status: 400 });
  const firstName = cleanText(body.firstName, 50);
  const lastName = cleanText(body.lastName, 70);
  const phone = normalizeIranianPhone(cleanText(body.phone, 30));
  const password = typeof body.password === "string" ? body.password : "";
  const confirmPassword = typeof body.confirmPassword === "string" ? body.confirmPassword : "";
  const errors: FieldErrors = {};
  if (firstName.length < 2) errors.firstName = "نام باید دست‌کم ۲ نویسه باشد.";
  if (lastName.length < 2) errors.lastName = "نام خانوادگی را کامل وارد کنید.";
  if (!isValidPhone(phone)) errors.phone = "شماره موبایل معتبر وارد کنید.";
  if (password.length < 8 || !/[A-Za-zآ-ی]/.test(password) || !/\d/.test(password)) errors.password = "رمز عبور باید حداقل ۸ نویسه و شامل حرف و عدد باشد.";
  if (password !== confirmPassword) errors.confirmPassword = "تکرار رمز عبور یکسان نیست.";
  if (Object.keys(errors).length) return NextResponse.json({ message: "لطفاً موارد مشخص‌شده را اصلاح کنید.", errors }, { status: 422 });

  try {
    await connect();
    if (await User.exists({ phone })) return NextResponse.json({ message: "این شماره موبایل قبلاً ثبت شده است.", errors: { phone: "برای ورود از همین شماره استفاده کنید." } }, { status: 409 });
    const adminPhone = normalizeIranianPhone(process.env.ADMIN_PHONE || "");
    const user = await User.create({ firstName, lastName, phone, passwordHash: await hashPassword(password), role: adminPhone && phone === adminPhone ? "admin" : "user" });
    await createSession(String(user._id));
    return NextResponse.json({ message: "حساب شما ساخته شد." }, { status: 201 });
  } catch (error) {
    if (typeof error === "object" && error && "code" in error && error.code === 11000) return NextResponse.json({ message: "این شماره موبایل قبلاً ثبت شده است.", errors: { phone: "شماره تکراری است." } }, { status: 409 });
    return NextResponse.json({ message: "ایجاد حساب در حال حاضر ممکن نیست. لطفاً کمی بعد تلاش کنید." }, { status: 503 });
  }
}
