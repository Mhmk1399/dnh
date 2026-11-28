import authCopy from "@/config/auth.json";
import { NextResponse } from "next/server";
import { createSession, hashPassword } from "@/lib/auth";
import connect from "@/lib/data";
import User from "@/models/User";
import {
  cleanText,
  isValidEmail,
  isValidPhone,
  normalizeDigits,
  normalizeIranianPhone,
  readJson,
  type FieldErrors,
} from "@/lib/validation";

export async function POST(request: Request) {
  const copy = authCopy[request.headers.get("accept-language")?.toLowerCase().startsWith("en") ? "en" : "fa"];
  const body = await readJson(request);
  if (!body)
    return NextResponse.json(
      { message: copy.invalid },
      { status: 400 },
    );
  const firstName = cleanText(body.firstName, 50);
  const lastName = cleanText(body.lastName, 70);
  const phone = normalizeIranianPhone(cleanText(body.phone, 30));
  const email = cleanText(body.email, 254).toLowerCase();
  const emailTaken = copy === authCopy.en ? "This email is already registered." : "این ایمیل قبلاً ثبت شده است.";
  const password = typeof body.password === "string" ? body.password : "";
  const confirmPassword =
    typeof body.confirmPassword === "string" ? body.confirmPassword : "";
  const errors: FieldErrors = {};
  const passwordForValidation = normalizeDigits(password);
  if (firstName.length < 2) errors.firstName = copy.firstNameError;
  if (lastName.length < 2) errors.lastName = copy.lastNameError;
  if (email && !isValidEmail(email)) errors.email = copy === authCopy.en ? "Enter a valid email address." : "ایمیل معتبر وارد کنید.";
  if (!isValidPhone(phone)) errors.phone = copy.invalidPhone;
  if (
    password.length < 8 ||
    !/[A-Za-zآ-ی]/.test(passwordForValidation) ||
    !/\d/.test(passwordForValidation)
  )
    errors.password = copy.passwordError;
  if (password !== confirmPassword)
    errors.confirmPassword = copy.confirmationError;
  if (Object.keys(errors).length)
    return NextResponse.json(
      { message: copy.correct, errors },
      { status: 422 },
    );

  try {
    await connect();
    if (await User.exists({ phone }))
      return NextResponse.json(
        {
          message: copy.duplicate,
          errors: { phone: copy.useExisting },
        },
        { status: 409 },
      );
    if (email && await User.exists({ email })) return NextResponse.json({ message: emailTaken, errors: { email: emailTaken } }, { status: 409 });
    const adminPhone = normalizeIranianPhone(process.env.ADMIN_PHONE || "");
    const user = await User.create({
      firstName,
      lastName,
      phone,
      ...(email ? { email } : {}),
      passwordHash: await hashPassword(password),
      role: adminPhone && phone === adminPhone ? "admin" : "user",
    });
    await createSession(String(user._id));
    return NextResponse.json(
      { message: copy.created },
      { status: 201 },
    );
  } catch (error) {
    if (
      typeof error === "object" &&
      error &&
      "code" in error &&
      error.code === 11000
    ) {
      if ("keyPattern" in error && typeof error.keyPattern === "object" && error.keyPattern && "email" in error.keyPattern) {
        return NextResponse.json({ message: emailTaken, errors: { email: emailTaken } }, { status: 409 });
      }
      return NextResponse.json(
        {
          message: copy.duplicate,
          errors: { phone: copy.useExisting },
        },
        { status: 409 },
      );
    }
    return NextResponse.json(
      { message: copy.network },
      { status: 503 },
    );
  }
}
