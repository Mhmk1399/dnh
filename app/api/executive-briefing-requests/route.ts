import { NextResponse } from "next/server";

import briefingsEn from "@/config/DNH_Executive_Briefings_Final_EN.json";
import briefingsFa from "@/config/DNH_Executive_Briefings_Final_FA.json";
import { getCurrentUser } from "@/lib/auth";
import connect from "@/lib/data";
import { cleanText, isValidEmail, isValidContactPhone, normalizeContactPhone, readJson, type FieldErrors } from "@/lib/validation";
import ExecutiveBriefingRequest from "@/models/ExecutiveBriefingRequest";

function getFormCopy(locale: "fa" | "en") {
  const content = locale === "fa" ? briefingsFa : briefingsEn;
  return content.sections.find((section) => section.type === "request-form")?.form;
}

function validContact(value: string) {
  if (!value) return false;
  if (isValidEmail(value.toLowerCase())) return true;
  return isValidContactPhone(value);
}

export async function POST(request: Request) {
  const locale = request.headers.get("accept-language")?.toLowerCase().startsWith("en") ? "en" : "fa";
  const copy = getFormCopy(locale);
  const fallback = locale === "fa" ? "ثبت درخواست انجام نشد. لطفاً دوباره تلاش کنید." : "The request could not be submitted. Please try again.";
  const body = await readJson(request);

  if (!body || cleanText(body.faxNumber, 200)) {
    return NextResponse.json({ message: copy?.error_message ?? fallback }, { status: 400 });
  }

  const contact = cleanText(body.contact, 160);
  const role = cleanText(body.role, 120);
  const urgency = cleanText(body.urgency, 80);
  const description = cleanText(body.description, 1600);
  const errors: FieldErrors = {};

  if (!validContact(contact)) errors.contact = locale === "fa" ? "یک شماره تماس یا ایمیل معتبر وارد کنید." : "Enter a valid phone number or email address.";
  if (role.length < 2) errors.role = locale === "fa" ? "نقش خود را در تصمیم‌گیری وارد کنید." : "Enter your role in the decision.";
  if (!urgency) errors.urgency = locale === "fa" ? "میزان فوریت را انتخاب کنید." : "Select the level of urgency.";
  if (description.length < 10) errors.description = locale === "fa" ? "شرح کوتاهی از مسئله بنویسید." : "Add a short description of the issue.";

  if (Object.keys(errors).length) {
    return NextResponse.json({ message: copy?.error_message ?? fallback, errors }, { status: 422 });
  }

  try {
    await connect();
    const user = await getCurrentUser();
    const values = {
      locale, contact: isValidContactPhone(contact) ? normalizeContactPhone(contact) : contact.toLowerCase(),
      role, urgency, description, userId: user?.id ?? null,
    };
    const duplicateSince = new Date(Date.now() - 10 * 60 * 1000);
    const existing = await ExecutiveBriefingRequest.findOne({
      ...values,
      createdAt: { $gte: duplicateSince },
    }).select("_id");

    if (existing) {
      return NextResponse.json({
        message: copy?.success_message,
        reference: `EBR-${String(existing._id).slice(-6).toUpperCase()}`,
      });
    }

    const record = await ExecutiveBriefingRequest.create(values);

    return NextResponse.json(
      {
        message: copy?.success_message,
        reference: `EBR-${String(record._id).slice(-6).toUpperCase()}`,
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json({ message: copy?.error_message ?? fallback }, { status: 503 });
  }
}
