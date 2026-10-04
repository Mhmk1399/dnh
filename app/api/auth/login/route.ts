import { NextResponse } from "next/server";
import { createSession, verifyPassword } from "@/lib/auth";
import connect from "@/lib/data";
import User from "@/lib/models/User";
import { cleanText, isValidPhone, normalizeIranianPhone, readJson, type FieldErrors } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await readJson(request);
  if (!body) return NextResponse.json({ message: "اطلاعات ارسالی معتبر نیست." }, { status: 400 });
  const phone = normalizeIranianPhone(cleanText(body.phone, 30));
  const password = typeof body.password === "string" ? body.password : "";
  const errors: FieldErrors = {};
  if (!isValidPhone(phone)) errors.phone = "شماره موبایل معتبر وارد کنید.";
  if (!password) errors.password = "رمز عبور را وارد کنید.";
  if (Object.keys(errors).length) return NextResponse.json({ message: "لطفاً اطلاعات ورود را کامل کنید.", errors }, { status: 422 });

  try {
    await connect();
    const user = await User.findOne({ phone }).select("+passwordHash");
    if (!user || !(await verifyPassword(password, user.passwordHash))) return NextResponse.json({ message: "شماره موبایل یا رمز عبور صحیح نیست." }, { status: 401 });
    await createSession(String(user._id));
    return NextResponse.json({ message: "ورود با موفقیت انجام شد.", role: user.role });
  } catch {
    return NextResponse.json({ message: "ورود در حال حاضر ممکن نیست. لطفاً کمی بعد تلاش کنید." }, { status: 503 });
  }
}
