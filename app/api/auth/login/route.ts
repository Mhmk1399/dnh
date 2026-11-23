import authCopy from "@/config/auth.json";
import { NextResponse } from "next/server";
import { createSession, verifyPassword } from "@/lib/auth";
import connect from "@/lib/data";
import User from "@/models/User";
import { cleanText, isValidPhone, normalizeIranianPhone, readJson, type FieldErrors } from "@/lib/validation";

export async function POST(request: Request) {
  const copy = authCopy[request.headers.get("accept-language")?.toLowerCase().startsWith("en") ? "en" : "fa"];
  const body = await readJson(request);
  if (!body) return NextResponse.json({ message: copy.invalid }, { status: 400 });
  const phone = normalizeIranianPhone(cleanText(body.phone, 30));
  const password = typeof body.password === "string" ? body.password : "";
  const errors: FieldErrors = {};
  if (!isValidPhone(phone)) errors.phone = copy.invalidPhone;
  if (!password) errors.password = copy.missingPassword;
  if (Object.keys(errors).length) return NextResponse.json({ message: copy.incomplete, errors }, { status: 422 });

  try {
    await connect();
    const user = await User.findOne({ phone }).select("+passwordHash");
    if (!user || !(await verifyPassword(password, user.passwordHash))) return NextResponse.json({ message: copy.badLogin }, { status: 401 });
    await createSession(String(user._id));
    return NextResponse.json({ message: copy.loginSuccess, role: user.role });
  } catch {
    return NextResponse.json({ message: copy.network }, { status: 503 });
  }
}
