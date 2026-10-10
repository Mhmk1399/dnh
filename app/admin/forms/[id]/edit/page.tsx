import type { Metadata } from "next";
import { Types } from "mongoose";
import { notFound, redirect } from "next/navigation";
import { FormBuilder } from "@/components/dynamic-forms/FormBuilder";
import { getCurrentUser } from "@/lib/auth";
import connect from "@/lib/data";
import type { DynamicFormDefinition } from "@/lib/dynamic-forms";
import DynamicForm from "@/lib/models/DynamicForm";

export const metadata: Metadata = { title: "ویرایش فرم | مدیریت DNH" };
export const dynamic = "force-dynamic";
export default async function EditFormPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser(); if (!user) redirect("/login"); if (user.role !== "admin") redirect("/dashboard");
  const { id } = await params; if (!Types.ObjectId.isValid(id)) notFound();
  let row; try { await connect(); row = await DynamicForm.findById(id).lean(); } catch { return <LoadError/>; }
  if (!row) notFound();
  const initial: DynamicFormDefinition = { title: row.title, slug: row.slug, description: row.description, formType: row.formType, serviceKey: row.serviceKey, serviceName: row.serviceName, serviceRoute: row.serviceRoute, status: row.status, steps: row.steps.map((step) => ({ id: step.id, title: step.title, description: step.description, stepType: step.stepType, fields: step.fields.map((field) => ({ id: field.id, type: field.type, label: field.label, required: field.required, placeholder: field.placeholder, helpText: field.helpText, options: field.options ? [...field.options] : undefined, minLength: field.minLength, maxLength: field.maxLength })) })), submitLabel: row.submitLabel, successMessage: row.successMessage, revision: row.revision };
  return <FormBuilder formId={id} initial={initial}/>;
}
function LoadError() { return <div role="alert" className="mx-auto max-w-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-800">بارگذاری فرم ممکن نشد. اتصال پایگاه داده را بررسی کنید.</div>; }

