import { NextResponse } from "next/server";
import connect from "@/lib/data";
import { getCurrentUser } from "@/lib/auth";
import Contact from "@/models/Contact";
import { cleanText, isValidEmail, isValidPhone, normalizeIranianPhone, readJson, type FieldErrors } from "@/lib/validation";
import contactFa from "@/config/DNH_Contact_Final_FA.json";
import contactEn from "@/config/DNH_Contact_Final_EN.json";

export async function POST(request: Request) {
  const isEnglish = request.headers.get("accept-language")?.toLowerCase().startsWith("en") ?? false;
  const copy = isEnglish ? contactEn.api : contactFa.api;
  const body = await readJson(request);
  if (!body) return NextResponse.json({ message: copy.invalid }, { status: 400 });

  if (cleanText(body.faxNumber, 200)) {
    return NextResponse.json({ message: copy.invalid }, { status: 400 });
  }

  const name = cleanText(body.name, 100);
  const phone = normalizeIranianPhone(cleanText(body.phone, 30));
  const email = cleanText(body.email, 160).toLowerCase();
  const subject = cleanText(body.subject, 140);
  const message = cleanText(body.message, 3000);
  const errors: FieldErrors = {};
  if (name.length < 2) errors.name = copy.name;
  if (!isValidPhone(phone)) errors.phone = copy.phone;
  if (!isValidEmail(email)) errors.email = copy.email;
  if (message.length < 10) errors.message = copy.message;
  if (Object.keys(errors).length) return NextResponse.json({ message: copy.correct, errors }, { status: 422 });

  try {
    await connect();
    const user = await getCurrentUser();
    const record = await Contact.create({ name, phone, email: email || undefined, subject: subject || undefined, message, userId: user?.id || null });
    return NextResponse.json({ message: copy.success, reference: `CNT-${String(record._id).slice(-6).toUpperCase()}` }, { status: 201 });
  } catch {
    return NextResponse.json({ message: copy.unavailable }, { status: 503 });
  }
}
