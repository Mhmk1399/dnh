import "server-only";

import connect from "@/lib/data";
import type { PublicDynamicForm } from "@/lib/dynamic-forms";
import DynamicForm from "@/lib/models/DynamicForm";

export async function getPublishedDynamicForm(
  slug: string,
): Promise<PublicDynamicForm | null> {
  try {
    await connect();
    const row = await DynamicForm.findOne({ slug, status: "published" }).lean();

    if (!row) return null;

    return {
      id: String(row._id),
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
