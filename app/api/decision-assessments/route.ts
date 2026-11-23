import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import connect from "@/lib/data";
import { cleanText, isValidEmail, isValidContactPhone, normalizeContactPhone, readJson, type FieldErrors } from "@/lib/validation";
import DecisionAssessment from "@/models/DecisionAssessment";
import contentEn from "@/config/DNH_Major_Financial_Decision_Final_EN.json";
import contentFa from "@/config/DNH_Major_Financial_Decision_Final_FA.json";

function formCopy(locale: "fa" | "en") {
  const document = locale === "fa" ? contentFa : contentEn;
  return document.sections.find((section) => section.type === "assessment-form")?.form;
}

function validContact(value: string) {
  if (!value) return false;
  if (isValidEmail(value.toLowerCase())) return true;
  return isValidContactPhone(value);
}

export async function POST(request: Request) {
  const locale = request.headers.get("accept-language")?.toLowerCase().startsWith("en")
    ? "en"
    : "fa";
  const copy = formCopy(locale);
  const fallback = locale === "fa" ? "ثبت درخواست انجام نشد. لطفاً دوباره تلاش کنید." : "The request could not be submitted. Please try again.";
  const body = await readJson(request);

  if (!body || cleanText(body.faxNumber, 200)) {
    return NextResponse.json({ message: copy?.error_message ?? fallback }, { status: 400 });
  }

  const name = cleanText(body.name, 100);
  const contact = cleanText(body.contact, 160);
  const behalf = cleanText(body.behalf, 80);
  const topic = cleanText(body.topic, 160);
  const horizon = cleanText(body.horizon, 80);
  const urgency = cleanText(body.urgency, 80);
  const description = cleanText(body.description, 1600);
  const errors: FieldErrors = {};

  if (name.length < 2) errors.name = locale === "fa" ? "نام خود را وارد کنید." : "Enter your name.";
  if (!validContact(contact)) errors.contact = locale === "fa" ? "یک شماره تماس یا ایمیل معتبر وارد کنید." : "Enter a valid phone number or email address.";
  if (!behalf) errors.behalf = locale === "fa" ? "یکی از گزینه‌ها را انتخاب کنید." : "Select one option.";
  if (topic.length < 3) errors.topic = locale === "fa" ? "موضوع تصمیم را وارد کنید." : "Enter the decision subject.";
  if (!horizon) errors.horizon = locale === "fa" ? "افق زمانی را انتخاب کنید." : "Select a time horizon.";
  if (!urgency) errors.urgency = locale === "fa" ? "میزان فوریت را انتخاب کنید." : "Select the level of urgency.";
  if (description.length < 10) errors.description = locale === "fa" ? "شرح کوتاهی از مسئله بنویسید." : "Add a short description of the issue.";

  if (Object.keys(errors).length) {
    return NextResponse.json(
      { message: copy?.error_message ?? fallback, errors },
      { status: 422 },
    );
  }

  try {
    await connect();
    const user = await getCurrentUser();
    const values = {
      locale, name, contact: isValidContactPhone(contact) ? normalizeContactPhone(contact) : contact.toLowerCase(),
      behalf, topic, horizon, urgency, description, userId: user?.id ?? null,
    };
    const duplicateSince = new Date(Date.now() - 10 * 60 * 1000);
    const existing = await DecisionAssessment.findOne({
      ...values,
      createdAt: { $gte: duplicateSince },
    }).select("_id");

    if (existing) {
      return NextResponse.json({
        message: copy?.success_message,
        reference: `DAS-${String(existing._id).slice(-6).toUpperCase()}`,
      });
    }

    const record = await DecisionAssessment.create(values);

    return NextResponse.json(
      {
        message: copy?.success_message,
        reference: `DAS-${String(record._id).slice(-6).toUpperCase()}`,
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json({ message: copy?.error_message ?? fallback }, { status: 503 });
  }
}
