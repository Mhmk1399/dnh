import { model, models, Schema, type Model, type Types } from "mongoose";
import type { DynamicFieldType, DynamicFormStatus, DynamicFormType, DynamicStepType } from "@/lib/dynamic-forms";

export type DynamicFormRecord = {
  title: string; slug: string; description: string; formType: DynamicFormType;
  serviceKey: string; serviceName: string; serviceRoute: string; status: DynamicFormStatus;
  steps: Array<{ id: string; title: string; description?: string; stepType: DynamicStepType; fields: Array<{ id: string; type: DynamicFieldType; label: string; required: boolean; placeholder?: string; helpText?: string; options?: string[]; minLength?: number; maxLength?: number }> }>;
  submitLabel: string; successMessage: string; revision: number; createdBy: Types.ObjectId; publishedAt?: Date | null; createdAt: Date; updatedAt: Date;
};

const fieldSchema = new Schema({
  id: { type: String, required: true }, type: { type: String, required: true }, label: { type: String, required: true },
  required: { type: Boolean, default: false }, placeholder: String, helpText: String,
  options: [String], minLength: Number, maxLength: Number,
}, { _id: false });

const stepSchema = new Schema({
  id: { type: String, required: true }, title: { type: String, required: true }, description: String,
  stepType: { type: String, required: true }, fields: { type: [fieldSchema], default: [] },
}, { _id: false });

const dynamicFormSchema = new Schema<DynamicFormRecord>({
  title: { type: String, required: true, maxlength: 140 },
  slug: { type: String, required: true, unique: true, index: true, maxlength: 80 },
  description: { type: String, default: "", maxlength: 700 },
  formType: { type: String, required: true, index: true },
  serviceKey: { type: String, required: true, index: true }, serviceName: { type: String, required: true }, serviceRoute: { type: String, required: true },
  status: { type: String, required: true, default: "draft", index: true }, steps: { type: [stepSchema], required: true },
  submitLabel: { type: String, required: true }, successMessage: { type: String, required: true },
  revision: { type: Number, required: true, default: 1 }, createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  publishedAt: { type: Date, default: null },
}, { timestamps: true });
dynamicFormSchema.index({ status: 1, updatedAt: -1 });

const DynamicForm = (models.DynamicForm as Model<DynamicFormRecord> | undefined) || model<DynamicFormRecord>("DynamicForm", dynamicFormSchema);
export default DynamicForm;

