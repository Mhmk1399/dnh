import "server-only";

import { Types, type FilterQuery, type Model } from "mongoose";
import consultation from "@/config/DNH_Strategic_Consultation_Final_FA.json";
import assessment from "@/config/DNH_Financial_Decision_Assessment_Final_FA.json";
import Contact from "@/models/Contact";
import DecisionAssessment from "@/models/DecisionAssessment";
import ExecutiveBriefingRequest from "@/models/ExecutiveBriefingRequest";
import FinancialDecisionAssessment from "@/models/FinancialDecisionAssessment";
import Lead from "@/models/Lead";
import StrategicConsultation from "@/models/StrategicConsultation";
import { toLatinDigits } from "@/lib/localized-digits";
import type { IntakeDetailItem } from "@/components/admin/intake/IntakeTableActions";

type Submission = { createdAt: Date; updatedAt: Date; userId?: Types.ObjectId | null; locale?: string };
type Summary = { title: string; contact: string; summary: string };

function detail(label: string, value?: string | null, wide = false): IntakeDetailItem {
  return { label, value: value ?? "", wide, direction: "auto" };
}

function intakeSource<T extends Submission>(model: Model<T>, config: {
  title: string;
  description: string;
  prefix: string;
  recentFields: string;
  searchFields: readonly (keyof T & string)[];
  summarize: (record: T) => Summary;
  details: (record: T) => IntakeDetailItem[];
}) {
  function searchFilter(search: string): FilterQuery<T> {
    if (!search) return {};
    const normalized = toLatinDigits(search);
    const reference = normalized.toUpperCase().match(/^([A-Z]+)-([0-9A-F]{6})$/);
    if (reference && reference[1] === config.prefix) {
      return { $expr: { $eq: [{ $substrBytes: [{ $toString: "$_id" }, 18, 6] }, reference[2].toLowerCase()] } };
    }
    if (/^[0-9a-f]{24}$/i.test(normalized)) return { _id: new Types.ObjectId(normalized) } as FilterQuery<T>;
    const escaped = [...new Set([search, normalized])].map(value => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
    return { $or: config.searchFields.map(field => ({ [field]: { $regex: escaped, $options: "i" } })) } as FilterQuery<T>;
  }
  function summarize(row: T & { _id: Types.ObjectId }) {
    const id = String(row._id);
    return {
      id,
      code: `${config.prefix}-${id.slice(-6).toUpperCase()}`,
      source: config.title,
      createdAt: row.createdAt ?? row._id.getTimestamp(),
      ...config.summarize(row),
    };
  }
  return {
    title: config.title, description: config.description, prefix: config.prefix,
    count: (search = "") => model.countDocuments(searchFilter(search)).exec(),
    remove: (id: string) => model.deleteOne({ _id: id }).exec(),
    async recent(limit: number) {
      const rows = await model.find().select(`createdAt ${config.recentFields}`)
        .sort({ createdAt: -1, _id: -1 }).limit(limit).lean<(T & { _id: Types.ObjectId })[]>();
      return rows.map(summarize);
    },
    async list(search: string, skip: number, limit: number) {
      const rows = await model.find(searchFilter(search)).sort({ createdAt: -1, _id: -1 })
        .skip(skip).limit(limit).lean<(T & { _id: Types.ObjectId })[]>();
      return rows.map(row => {
        const summary = summarize(row);
        return {
          ...summary,
          userId: row.userId?.toString(), updatedAt: row.updatedAt,
          locale: row.locale === "en" ? "en" as const : row.locale === "fa" ? "fa" as const : undefined,
          details: [...config.details(row).filter(item => item.value.trim()), detail("شناسه پایگاه داده", summary.id, true)],
        };
      });
    },
  };
}

type ConsultationField = { name: string; kind: string; label: string; options?: Option[] };
const consultationFields = consultation.sections.request.form.groups.flatMap<ConsultationField>(group => group.fields);
const form = assessment.sections.form;
type Option = { value: string; label?: string; title?: string };
function option(options: readonly Option[], value?: string | null) {
  if (!value) return "";
  const match = options.find(entry => entry.value === value);
  return match?.label ?? match?.title ?? value ?? "";
}

export const intakeSources = {
  "strategic-consultations": intakeSource(StrategicConsultation, {
    title: "درخواست‌های مشاوره راهبردی", description: "درخواست مشاوره، مشخصات متقاضی و روش ارتباط ترجیحی.", prefix: "SCN",
    recentFields: "name phone decisionTopic",
    searchFields: ["name", "phone", "email", "decisionTopic", "currentSituation", "message", "approximateSize", "communicationMethod", "audienceType", "timeHorizon", "urgency"],
    summarize: row => ({ title: row.name, contact: row.phone, summary: row.decisionTopic }),
    details: row => consultationFields.map(field => {
      const value = row[field.name as keyof typeof row];
      const text = typeof value === "string" ? value : "";
      return detail(field.label, "options" in field && field.options ? option(field.options, text) : text, field.kind === "textarea");
    }),
  }),
  "financial-decision-assessments": intakeSource(FinancialDecisionAssessment, {
    title: "ارزیابی‌های چهارمرحله‌ای تصمیم مالی", description: "پاسخ‌های هر چهار مرحلهٔ ارزیابی اولیه و اطلاعات پیگیری.", prefix: "FDA",
    recentFields: "name contactDetail email decisionTopic",
    searchFields: ["name", "email", "contactDetail", "currentSituation", "shortDescription", "decisionTopic", "audience", "horizon", "urgency", "decisionSize", "contactMethod"],
    summarize: row => ({ title: row.name, contact: row.contactDetail || row.email, summary: option(form.decision.topics, row.decisionTopic) }),
    details: row => [
      detail(form.contact.name_label, row.name), detail(form.contact.email_label, row.email),
      detail(form.contact.method_label, option(form.contact.methods, row.contactMethod)), detail("اطلاعات تماس ترجیحی", row.contactDetail),
      detail("نوع متقاضی", option(form.profile.options, row.audience)), detail("موضوع تصمیم", option(form.decision.topics, row.decisionTopic)),
      detail(form.decision.situation_label, row.currentSituation, true), detail(form.decision.size_label, option(form.decision.sizes, row.decisionSize)),
      detail(form.timing.horizon_label, option(form.timing.horizons, row.horizon)), detail(form.timing.urgency_label, option(form.timing.urgencies, row.urgency)),
      detail(form.contact.summary_label, row.shortDescription, true),
    ],
  }),
  "decision-assessments": intakeSource(DecisionAssessment, {
    title: "درخواست‌های تصمیم مالی مهم", description: "درخواست‌های فرم کوتاه صفحهٔ «در آستانه یک تصمیم مالی مهم».", prefix: "DAS",
    recentFields: "name contact topic",
    searchFields: ["name", "contact", "behalf", "topic", "horizon", "urgency", "description"],
    summarize: row => ({ title: row.name, contact: row.contact, summary: row.topic }),
    details: row => [detail("نام", row.name), detail("اطلاعات تماس", row.contact), detail("از طرف", row.behalf), detail("موضوع تصمیم", row.topic), detail("افق زمانی", row.horizon), detail("میزان فوریت", row.urgency), detail("شرح مسئله", row.description, true)],
  }),
  "executive-briefings": intakeSource(ExecutiveBriefingRequest, {
    title: "درخواست‌های نشست مدیران", description: "نقش سازمانی، میزان فوریت و شرح درخواست نشست.", prefix: "EBR",
    recentFields: "contact role urgency",
    searchFields: ["contact", "role", "urgency", "description"],
    summarize: row => ({ title: row.contact, contact: row.contact, summary: row.role + " · " + row.urgency }),
    details: row => [detail("اطلاعات تماس", row.contact), detail("نقش سازمانی", row.role), detail("میزان فوریت", row.urgency), detail("شرح درخواست", row.description, true)],
  }),
  contacts: intakeSource(Contact, {
    title: "پیام‌های تماس", description: "اطلاعات فرستنده، موضوع و متن کامل پیام‌های صفحهٔ تماس.", prefix: "CNT",
    recentFields: "name phone email subject message",
    searchFields: ["name", "phone", "email", "subject", "message"],
    summarize: row => ({ title: row.name, contact: [row.phone, row.email].filter(Boolean).join(" · "), summary: row.subject || row.message }),
    details: row => [detail("نام", row.name), detail("شماره تماس", row.phone), detail("ایمیل", row.email), detail("موضوع", row.subject), detail("متن پیام", row.message, true)],
  }),
  leads: intakeSource(Lead, {
    title: "لیدهای سریع", description: "نام، شمارهٔ تماس و متن درخواست‌های کوتاه.", prefix: "LEAD",
    recentFields: "name phone text",
    searchFields: ["name", "phone", "text"],
    summarize: row => ({ title: row.name, contact: row.phone, summary: row.text }),
    details: row => [detail("نام", row.name), detail("شماره تماس", row.phone), detail("متن درخواست", row.text, true)],
  }),
};

export type IntakeType = keyof typeof intakeSources;
export const intakeTypes = Object.keys(intakeSources) as IntakeType[];
export function isIntakeType(type: string): type is IntakeType {
  return Object.hasOwn(intakeSources, type);
}
