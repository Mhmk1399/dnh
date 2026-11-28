import "server-only";

import connect from "@/lib/data";
import type { SiteLocale } from "@/lib/site-language";
import type { PublicDynamicForm } from "@/lib/dynamic-forms";
import DynamicForm from "@/models/DynamicForm";

export async function getPublishedDynamicForm(
  slug: string,
): Promise<PublicDynamicForm | null> {
  return findPublishedForm({ slug });
}

export async function getPublishedServiceForm(serviceKey: string, locale: SiteLocale) {
  return findPublishedForm({ serviceKey, locale, showOnService: true });
}

async function findPublishedForm(filter: { slug: string } | { serviceKey: string; locale: SiteLocale; showOnService: true }): Promise<PublicDynamicForm | null> {
  try {
    await connect();
    const row = await DynamicForm.findOne({ ...filter, status: "published" }).sort({ publishedAt: -1, _id: -1 }).lean();

    if (!row) return null;

    return {
      id: String(row._id),
      locale: row.locale ?? "fa",
      title: row.title,
      slug: row.slug,
      description: row.description,
      formType: row.formType,
      serviceKey: row.serviceKey,
      serviceName: row.serviceName,
      serviceRoute: row.serviceRoute,
      steps: row.steps.map((step) => ({
        id: step.id,
        title: step.title,
        description: step.description,
        stepType: step.stepType,
        fields: step.fields.map((field) => ({
          id: field.id,
          type: field.type,
          label: field.label,
          required: field.required,
          placeholder: field.placeholder,
          helpText: field.helpText,
          options: field.options ? [...field.options] : undefined,
          minLength: field.minLength,
          maxLength: field.maxLength,
        })),
      })),
      submitLabel: row.submitLabel,
      successMessage: row.successMessage,
      revision: row.revision,
    };
  } catch (error) {
    console.error("Unable to load published dynamic form", error);
    return null;
  }
}
