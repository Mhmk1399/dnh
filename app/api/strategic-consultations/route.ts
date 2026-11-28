import { NextResponse } from "next/server";
import consultation from "@/config/DNH_Strategic_Consultation_Final_FA.json";
import feedback from "@/config/intake-feedback.json";
import { getCurrentUser } from "@/lib/auth";
import connect from "@/lib/data";
import { intakeFields } from "@/lib/intake-fields";
import { isValidContactPhone, isValidEmail, normalizeContactPhone, readJson } from "@/lib/validation";
import StrategicConsultation from "@/models/StrategicConsultation";

const fields = consultation.sections.request.form.groups.flatMap<{name: string; options?: { value: string }[]}>((group) => group.fields);
function options(name: string) {
  const field = fields.find((item) => item.name === name);
  return field?.options ?? [];
}

export async function POST(request: Request) {
  const locale = request.headers.get("accept-language")?.toLowerCase().startsWith("en") ? "en" : "fa";
  const body = await readJson(request);
  if (!body || body.faxNumber) return NextResponse.json({ message: feedback[locale].invalid }, { status: 400 });
  const { text, choice, errors, copy } = intakeFields(body, locale);
  const communicationMethod = choice("communicationMethod", options("communicationMethod"));
  const email = text("email", communicationMethod === "email" ? 1 : 0, 160).toLowerCase();
  const phone = normalizeContactPhone(text("phone", 1, 30));
  const values = {
    locale, communicationMethod, email: email || undefined, phone,
    name: text("name", 2, 100),
    audienceType: choice("audienceType", options("audienceType")),
    decisionTopic: text("decisionTopic", 1, 200),
    timeHorizon: choice("timeHorizon", options("timeHorizon")),
    urgency: choice("urgency", options("urgency")),
    currentSituation: text("currentSituation", 10, 1500),
    approximateSize: text("approximateSize", 0, 200) || undefined,
    message: text("message", 10, 2500),
  };
  if (phone && !isValidContactPhone(phone)) errors.phone = copy.phone;
  if (!phone) errors.phone = copy.required;
  if (!isValidEmail(email)) errors.email = copy.email;
  if (Object.keys(errors).length) return NextResponse.json({ message: copy.invalid, errors }, { status: 422 });
  try {
    await connect();
    const user = await getCurrentUser();
    const record = await StrategicConsultation.create({ ...values, userId: user?.id ?? null });
    return NextResponse.json({ message: copy.consultation, reference: `SCN-${String(record._id).slice(-6).toUpperCase()}` }, { status: 201 });
  } catch {
    return NextResponse.json({ message: copy.unavailable }, { status: 503 });
  }
}
