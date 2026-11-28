import { NextResponse } from "next/server";
import assessmentEn from "@/config/DNH_Financial_Decision_Assessment_Final_EN.json";
import assessmentFa from "@/config/DNH_Financial_Decision_Assessment_Final_FA.json";
import feedback from "@/config/intake-feedback.json";
import { getCurrentUser } from "@/lib/auth";
import connect from "@/lib/data";
import { intakeFields } from "@/lib/intake-fields";
import { isValidContactPhone, isValidEmail, normalizeContactPhone, readJson } from "@/lib/validation";
import FinancialDecisionAssessment from "@/models/FinancialDecisionAssessment";

export async function POST(request: Request) {
  const locale = request.headers.get("accept-language")?.toLowerCase().startsWith("en") ? "en" : "fa";
  const body = await readJson(request);
  if (!body || body.faxNumber) return NextResponse.json({ message: feedback[locale].invalid }, { status: 400 });
  const { text, choice, errors, copy } = intakeFields(body, locale);
  const form = (locale === "fa" ? assessmentFa : assessmentEn).sections.form;
  const email = text("email", 1, 160).toLowerCase();
  const contactMethod = choice("contactMethod", form.contact.methods);
  const contactDetail = contactMethod === "phone" || contactMethod === "messenger"
    ? text("contactDetail", 1, 160)
    : undefined;
  const values = {
    locale, email, contactMethod,
    contactDetail: contactMethod === "phone" && contactDetail ? normalizeContactPhone(contactDetail) : contactDetail,
    name: text("name", 2, 100),
    audience: choice("audience", form.profile.options),
    decisionTopic: choice("decisionTopic", form.decision.topics),
    currentSituation: text("currentSituation", 10, 2500),
    decisionSize: choice("decisionSize", form.decision.sizes, true) || undefined,
    horizon: choice("horizon", form.timing.horizons),
    urgency: choice("urgency", form.timing.urgencies),
    shortDescription: text("shortDescription", 10, 2500),
  };
  if (!isValidEmail(email)) errors.email = copy.email;
  if (contactMethod === "phone" && !isValidContactPhone(contactDetail ?? "")) errors.contactDetail = copy.phone;
  if (Object.keys(errors).length) return NextResponse.json({ message: copy.invalid, errors }, { status: 422 });
  try {
    await connect();
    const user = await getCurrentUser();
    const record = await FinancialDecisionAssessment.create({ ...values, userId: user?.id ?? null });
    return NextResponse.json({ message: form.success.title, reference: `FDA-${String(record._id).slice(-6).toUpperCase()}` }, { status: 201 });
  } catch {
    return NextResponse.json({ message: copy.unavailable }, { status: 503 });
  }
}
